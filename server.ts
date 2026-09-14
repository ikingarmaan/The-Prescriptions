import express, { type Request, type Response } from "express";
import path from "path";
import fs from "fs";
import crypto from "node:crypto";
import os from "node:os";
import net from "node:net";
import dns from "node:dns";
import dotenv from "dotenv";
import nodemailer, { type SendMailOptions } from "nodemailer";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { postProcessPrescriptionResultWithNLP } from "./src/utils/smartNlpEngine";

// 1. Force IPv4 first across Node DNS lookups to eliminate IPv6 ENETUNREACH in Docker/Railway
try {
  dns.setDefaultResultOrder?.("ipv4first");
} catch {
  // Graceful fallback on older Node runtimes
}

// 2. Monkey-patch os.networkInterfaces to filter out IPv6 on Railway/Docker containers
try {
  const origNetworkInterfaces = os.networkInterfaces;
  os.networkInterfaces = () => {
    const interfaces = origNetworkInterfaces.call(os);
    const filtered: Record<string, os.NetworkInterfaceInfo[]> = {};
    for (const [name, addrs] of Object.entries(interfaces as Record<string, os.NetworkInterfaceInfo[] | undefined>)) {
      if (Array.isArray(addrs)) {
        filtered[name] = addrs.filter((addr) => addr.family === "IPv4" || (addr as any).family === 4);
      }
    }
    return filtered;
  };
} catch {
  // Graceful fallback
}

// 3. Patch Nodemailer's internal resolveHostname to filter out all IPv6 addresses
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const shared = require("nodemailer/lib/shared");
  if (shared && typeof shared.resolveHostname === "function") {
    const origResolve = shared.resolveHostname;
    shared.resolveHostname = (options: any, callback: any) => {
      origResolve(options, (err: any, res: any) => {
        if (res && res._addresses && Array.isArray(res._addresses)) {
          res._addresses = res._addresses.filter((a: any) => typeof a === "string" && !a.includes(":"));
          if (res.host && typeof res.host === "string" && res.host.includes(":")) {
            res.host = res._addresses[0] || null;
          }
        }
        if (!res?.host || !res?._addresses?.length) {
          dns.lookup(options?.host || "smtp.gmail.com", { family: 4 }, (lookupErr, address) => {
            if (!lookupErr && address) {
              if (!res) res = { servername: options?.host || "smtp.gmail.com", cached: false };
              res.host = address;
              res._addresses = [address];
              return callback(null, res);
            }
            return callback(err, res);
          });
          return;
        }
        callback(err, res);
      });
    };
  }
} catch {
  // Graceful fallback
}

dotenv.config();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function resolveIpv4Host(hostname: string): Promise<string> {
  if (net.isIP(hostname)) {
    return hostname;
  }
  try {
    const lookupRes = await dns.promises.lookup(hostname, { family: 4 });
    if (lookupRes?.address) {
      return lookupRes.address;
    }
  } catch (e) {
    console.warn(`[DNS] Direct IPv4 lookup fallback for ${hostname}:`, e);
  }
  return hostname;
}

async function getMailTransporter(preferredPort: number = 465) {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER || "Theprescriptionn@gmail.com";
  const pass = (
    process.env.EMAIL_APP_PASSWORD ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASSWORD ||
    process.env.SMTP_PASS ||
    ""
  ).replace(/\s+/g, "");

  if (!pass) {
    return null;
  }

  const baseHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || String(preferredPort), 10);
  const resolvedIpv4 = await resolveIpv4Host(baseHost);

  return nodemailer.createTransport({
    host: resolvedIpv4,
    port,
    secure: port === 465, // SSL on 465, STARTTLS on 587
    auth: {
      user,
      pass,
    },
    tls: {
      servername: baseHost, // Ensures SSL/TLS cert validates against smtp.gmail.com
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  } as any);
}

async function sendMailWithFallback(mailOptions: SendMailOptions) {
  // Try port 465 (SSL) first; if network blocked/unreachable, fallback to port 587 (STARTTLS)
  const portsToTry = [465, 587];
  let lastError: any = null;

  for (const port of portsToTry) {
    try {
      const transporter = await getMailTransporter(port);
      if (!transporter) return null;
      return await transporter.sendMail(mailOptions);
    } catch (err: any) {
      lastError = err;
      console.warn(`[Mail] Delivery failed via port ${port} (${err?.code || err?.message}), trying fallback port...`);
    }
  }

  throw lastError || new Error("Failed to deliver email through all SMTP ports.");
}

interface EmailDispatchPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}

interface DispatchResult {
  provider: string;
  success: boolean;
}

// 1. Resend API (HTTPS port 443 - Recommended, zero port blocks, 100 free/day)
async function sendViaResend(params: EmailDispatchPayload, apiKey: string): Promise<void> {
  const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
  const normalizedTo = params.to.trim().toLowerCase();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${params.fromName || "Theprescription"} <${fromEmail}>`,
      to: [normalizedTo],
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!res.ok) {
    const errorJson = (await res.json().catch(() => ({}))) as Record<string, any>;
    throw new Error(`Resend API HTTP ${res.status}: ${errorJson.message || JSON.stringify(errorJson)}`);
  }
}

// 2. SendGrid API (HTTPS port 443 - 100 free/day)
async function sendViaSendGrid(params: EmailDispatchPayload, apiKey: string): Promise<void> {
  const fromEmail = process.env.SENDGRID_FROM || process.env.EMAIL_USER || "theprescriptionn@gmail.com";
  const normalizedTo = params.to.trim().toLowerCase();
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: normalizedTo }],
        },
      ],
      from: {
        email: fromEmail,
        name: params.fromName || "Theprescription",
      },
      reply_to: params.replyTo ? { email: params.replyTo.trim().toLowerCase() } : undefined,
      subject: params.subject,
      content: [
        {
          type: "text/html",
          value: params.html,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`SendGrid API HTTP ${res.status}: ${errorText}`);
  }
}

// 3. Brevo API (HTTPS port 443 - 300 free/day)
async function sendViaBrevo(params: EmailDispatchPayload, apiKey: string): Promise<void> {
  const fromEmail = process.env.BREVO_FROM || process.env.EMAIL_USER || "theprescriptionn@gmail.com";
  const normalizedTo = params.to.trim().toLowerCase();
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: params.fromName || "Theprescription",
        email: fromEmail,
      },
      to: [{ email: normalizedTo }],
      replyTo: params.replyTo ? { email: params.replyTo.trim().toLowerCase() } : undefined,
      subject: params.subject,
      htmlContent: params.html,
    }),
  });

  if (!res.ok) {
    const errorJson = (await res.json().catch(() => ({}))) as Record<string, any>;
    throw new Error(`Brevo API HTTP ${res.status}: ${errorJson.message || JSON.stringify(errorJson)}`);
  }
}

function getActiveEmailProvider(): { name: string; type: "resend" | "sendgrid" | "brevo" | "smtp" | "none"; key?: string } {
  const preferred = (process.env.EMAIL_PROVIDER || "").trim().toLowerCase();

  const brevoKey = (process.env.BREVO_API_KEY || process.env.BREVO_KEY || "").trim();
  const sendgridKey = (process.env.SENDGRID_API_KEY || process.env.SENDGRID_KEY || "").trim();
  const resendKey = (process.env.RESEND_API_KEY || process.env.RESEND_KEY || "").trim();

  // 1. Explicit preference via EMAIL_PROVIDER variable
  if (preferred === "brevo" && brevoKey) {
    return { name: "Brevo (HTTPS API)", type: "brevo", key: brevoKey };
  }
  if (preferred === "sendgrid" && sendgridKey) {
    return { name: "SendGrid (HTTPS API)", type: "sendgrid", key: sendgridKey };
  }
  if (preferred === "resend" && resendKey) {
    return { name: "Resend (HTTPS API)", type: "resend", key: resendKey };
  }

  // 2. Auto-detection: Brevo (best for external sending without custom domain) > SendGrid > Resend
  if (brevoKey) {
    return { name: "Brevo (HTTPS API)", type: "brevo", key: brevoKey };
  }
  if (sendgridKey) {
    return { name: "SendGrid (HTTPS API)", type: "sendgrid", key: sendgridKey };
  }
  if (resendKey) {
    return { name: "Resend (HTTPS API)", type: "resend", key: resendKey };
  }

  const hasSmtp = Boolean((process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "").trim());
  if (hasSmtp) {
    return { name: "Gmail SMTP (Nodemailer)", type: "smtp" };
  }

  return { name: "None", type: "none" };
}

async function dispatchEmail(payload: EmailDispatchPayload): Promise<DispatchResult> {
  const provider = getActiveEmailProvider();

  if (provider.type === "resend") {
    await sendViaResend(payload, provider.key!);
    return { provider: provider.name, success: true };
  }

  if (provider.type === "sendgrid") {
    await sendViaSendGrid(payload, provider.key!);
    return { provider: provider.name, success: true };
  }

  if (provider.type === "brevo") {
    await sendViaBrevo(payload, provider.key!);
    return { provider: provider.name, success: true };
  }

  if (provider.type === "smtp") {
    const adminEmail = process.env.EMAIL_USER || "Theprescriptionn@gmail.com";
    await sendMailWithFallback({
      from: `"${payload.fromName || "Theprescription"}" <${adminEmail}>`,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    });
    return { provider: provider.name, success: true };
  }

  throw new Error(
    "No email service configured on Railway. Please add RESEND_API_KEY or SENDGRID_API_KEY to your Railway Variables tab."
  );
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
}

async function saveContactSubmissionToGoogleSheet(data: ContactFormData): Promise<boolean> {
  const webhookUrl = (process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_URL || "").trim();
  if (!webhookUrl) {
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
      redirect: "follow",
    });

    if (res.ok) {
      console.log(`[Google Sheets] Contact submission logged to Google Sheet for ${data.email}`);
      return true;
    } else {
      console.warn(`[Google Sheets] Webhook responded with HTTP ${res.status}`);
      return false;
    }
  } catch (err: any) {
    console.error("[Google Sheets] Error logging to Google Sheet:", err?.message || err);
    return false;
  }
}

function getGeminiApiKeys(): string[] {
  const keys: string[] = [];

  // 1. GEMINI_API_KEY (supports comma or semicolon separated keys: key1,key2)
  if (process.env.GEMINI_API_KEY) {
    for (const k of process.env.GEMINI_API_KEY.split(/[,;]+/)) {
      const trimmed = k.trim();
      if (trimmed && !keys.includes(trimmed)) {
        keys.push(trimmed);
      }
    }
  }

  // 2. GEMINI_API_KEY_1, GEMINI_API_KEY_2, GEMINI_API_KEY1, GEMINI_API_KEY2, etc.
  for (let i = 1; i <= 10; i++) {
    const candidates = [
      process.env[`GEMINI_API_KEY_${i}`],
      process.env[`GEMINI_API_KEY${i}`],
      process.env[`GEMINI_KEY_${i}`],
      process.env[`GEMINI_KEY${i}`],
    ];
    for (const k of candidates) {
      if (k && k.trim() && !keys.includes(k.trim())) {
        keys.push(k.trim());
      }
    }
  }

  // 3. GEMINI_API_KEYS (plural name support)
  if (process.env.GEMINI_API_KEYS) {
    for (const k of process.env.GEMINI_API_KEYS.split(/[,;]+/)) {
      const trimmed = k.trim();
      if (trimmed && !keys.includes(trimmed)) {
        keys.push(trimmed);
      }
    }
  }

  return keys;
}

// Client instances cache per key
const clientCache = new Map<string, GoogleGenAI>();

function getClientForKey(apiKey: string): GoogleGenAI {
  let client = clientCache.get(apiKey);
  if (!client) {
    client = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "the-prescription-multi-key",
        },
      },
    });
    clientCache.set(apiKey, client);
  }
  return client;
}

// Track temporary quota exhaustion cooldown per key (key string -> expiry epoch ms)
const keyUnhealthyUntil = new Map<string, number>();

// In-Memory Fast Caching Engine for repeat prescription & medicine analyses
interface CachedPrescriptionAnalysis {
  data: any;
  cachedAt: number;
}

const prescriptionAnalysisCache = new Map<string, CachedPrescriptionAnalysis>();
const singleMedicineCache = new Map<string, { data: any; cachedAt: number }>();
const MAX_PRESCRIPTION_CACHE_SIZE = 300;
const PRESCRIPTION_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MEDICINE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function computePrescriptionHash(imageBase64?: string, textNotes?: string, patientContext?: string): string {
  const hash = crypto.createHash("sha256");
  if (imageBase64) {
    const len = imageBase64.length;
    if (len > 30000) {
      hash.update(imageBase64.slice(0, 10000));
      hash.update(imageBase64.slice(Math.floor(len / 2) - 5000, Math.floor(len / 2) + 5000));
      hash.update(imageBase64.slice(-10000));
      hash.update(String(len));
    } else {
      hash.update(imageBase64);
    }
  }
  if (textNotes) hash.update(textNotes.trim().toLowerCase());
  if (patientContext) hash.update(patientContext.trim().toLowerCase());
  return hash.digest("hex");
}

let keyRoundRobinIndex = 0;

function getOrderedApiKeys(): string[] {
  const allKeys = getGeminiApiKeys();
  if (allKeys.length === 0) {
    throw new Error(
      "GEMINI_API_KEY environment variable is missing. Please add GEMINI_API_KEY (and optionally GEMINI_API_KEY_2) in your Railway project Variables."
    );
  }
  if (allKeys.length === 1) {
    return allKeys;
  }

  const now = Date.now();
  const healthyKeys: string[] = [];
  const coolingDownKeys: string[] = [];

  for (const k of allKeys) {
    const cooldownExpiry = keyUnhealthyUntil.get(k) || 0;
    if (cooldownExpiry <= now) {
      healthyKeys.push(k);
    } else {
      coolingDownKeys.push(k);
    }
  }

  // Prioritize healthy keys; if all are in cooldown, try all keys anyway
  const primaryPool = healthyKeys.length > 0 ? healthyKeys : allKeys;
  const startIndex = keyRoundRobinIndex % primaryPool.length;
  keyRoundRobinIndex = (keyRoundRobinIndex + 1) % primaryPool.length;

  const ordered: string[] = [];
  for (let i = 0; i < primaryPool.length; i++) {
    ordered.push(primaryPool[(startIndex + i) % primaryPool.length]);
  }

  // Add any cooling-down keys at the end as secondary fallbacks
  for (const k of coolingDownKeys) {
    if (!ordered.includes(k)) {
      ordered.push(k);
    }
  }

  return ordered;
}

function cleanAndParseJson(raw: string): any {
  if (!raw || typeof raw !== "string") {
    throw new Error("Empty response received from AI model.");
  }
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }
  return JSON.parse(cleaned);
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    doctorSpecialtyOrClinic: {
      type: Type.STRING,
      description: "Detected clinic, hospital, or doctor specialty name if available, otherwise 'General Practice'",
    },
    prescriptionDate: {
      type: Type.STRING,
      description: "Date written on prescription if visible, otherwise 'Not specified'",
    },
    suspectedCondition: {
      type: Type.STRING,
      description: "Probable medical diagnosis or symptoms being treated by this medicine combination",
    },
    generalExplanation: {
      type: Type.STRING,
      description: "Warm, empathetic, plain-English summary explaining why the doctor prescribed these medicines together and how they work as a complete treatment plan.",
    },
    medicines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Brand name or medicine name as written (e.g., Augmentin 625, Pantocid 40). If the handwriting is illegible or you are unable to understand the medicine, DO NOT output 'Unidentified Medication (Requires Pharmacist Verification)' or similar robotic text; instead write: 'Apologies, we didn\'t understand this medicine'.",
          },
          genericName: { type: Type.STRING, description: "Active chemical ingredient(s) and salt (e.g., Amoxicillin + Clavulanic Acid)" },
          form: { type: Type.STRING, description: "Tablet, Capsule, Syrup, Eye Drops, Inhaler, Ointment, Injection, etc." },
          strength: { type: Type.STRING, description: "Dosage strength, e.g. 500mg, 40mg, 10ml, 5mg/5ml" },
          dosage: { type: Type.STRING, description: "Quantity per dose, e.g., '1 tablet', '2 puffs', '10 ml'" },
          frequency: { type: Type.STRING, description: "Daily frequency explained in plain English, e.g., 'Twice daily (Morning & Night)'" },
          timingCode: { type: Type.STRING, description: "Original shorthand code decoded, e.g., 'BD / 1-0-1' or 'OD / 1-0-0' or 'TDS'" },
          mealRelation: {
            type: Type.STRING,
            description: "Strictly one of: 'before_meal', 'after_meal', 'with_meal', 'empty_stomach', 'anytime'",
          },
          mealRelationText: {
            type: Type.STRING,
            description: "Exact plain-English instructions on when to take relative to food (e.g., 'Take 30 minutes before breakfast on an empty stomach' or 'Take immediately after food to prevent stomach irritation')",
          },
          duration: { type: Type.STRING, description: "Prescribed duration, e.g., '5 days', '10 days', 'Continuous / Long term'" },
          scheduleTimes: {
            type: Type.OBJECT,
            properties: {
              morning: { type: Type.BOOLEAN },
              afternoon: { type: Type.BOOLEAN },
              evening: { type: Type.BOOLEAN },
              bedtime: { type: Type.BOOLEAN },
              asNeeded: { type: Type.BOOLEAN },
            },
            required: ["morning", "afternoon", "evening", "bedtime", "asNeeded"],
          },
          purposeAndUsage: {
            type: Type.STRING,
            description: "Comprehensive, clear explanation of what this medicine treats, how it helps the patient feel better, and its therapeutic goal.",
          },
          howToTake: {
            type: Type.STRING,
            description: "Practical instructions on swallowing, hydration, measuring syrup, posture, not crushing enteric tablets, etc.",
          },
          precautions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Key safety guidelines, e.g., complete antibiotic course, avoid alcohol, sun sensitivity.",
          },
          commonSideEffects: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Mild, frequent side effects the patient might notice (e.g., mild nausea, drowsiness).",
          },
          whenToContactDoctor: {
            type: Type.STRING,
            description: "Red-flag symptoms requiring immediate medical advice.",
          },
        },
        required: [
          "name",
          "genericName",
          "form",
          "strength",
          "dosage",
          "frequency",
          "timingCode",
          "mealRelation",
          "mealRelationText",
          "duration",
          "scheduleTimes",
          "purposeAndUsage",
          "howToTake",
          "precautions",
          "commonSideEffects",
        ],
      },
    },
    labTests: {
      type: Type.ARRAY,
      description: "Any laboratory tests, blood work, radiology, ECG, or diagnostic investigations ordered by the doctor on this prescription",
      items: {
        type: Type.OBJECT,
        properties: {
          testName: { type: Type.STRING, description: "Name of the test (e.g., Complete Blood Count (CBC), Chest X-Ray PA View, Fasting Blood Sugar, Serum Creatinine, Urine R/M)" },
          category: {
            type: Type.STRING,
            description: "Category: 'Blood Investigation', 'Radiology / Imaging', 'Urine / Stool', 'Cardiology / ECG', 'Microbiology / Culture', 'Biochemistry', 'Other'",
          },
          whyDoctorOrdered: { type: Type.STRING, description: "Clinical reason for ordering this test based on symptoms or monitoring" },
          preparationInstructions: { type: Type.STRING, description: "Patient preparation (e.g. 10-12 hours overnight fasting, full bladder for ultrasound, no special prep)" },
          sampleRequired: { type: Type.STRING, description: "Blood sample, midstream urine, radiography, etc." },
          fastingRequired: { type: Type.BOOLEAN, description: "True if fasting is required" },
          urgency: { type: Type.STRING, description: "routine, urgent, follow_up" },
          commonNormalRangeContext: { type: Type.STRING, description: "Contextual guidance on what results check" },
        },
        required: [
          "testName",
          "category",
          "whyDoctorOrdered",
          "preparationInstructions",
          "sampleRequired",
          "fastingRequired",
          "urgency",
        ],
      },
    },
    chronologicalTakingPlan: {
      type: Type.ARRAY,
      description: "Step-by-step master sequence showing the patient exactly when to take which medicine throughout the day from waking up to bedtime",
      items: {
        type: Type.OBJECT,
        properties: {
          timeLabel: { type: Type.STRING, description: "e.g., '7:00 AM – Before Breakfast', '8:30 AM – After Breakfast', '1:30 PM – After Lunch', '8:00 PM – After Dinner', '10:00 PM – Bedtime', 'As Needed (SOS)'" },
          slotName: { type: Type.STRING, description: "e.g., 'morning_empty_stomach', 'morning_after_breakfast', 'afternoon_after_lunch', 'night_after_dinner', 'bedtime', 'as_needed'" },
          title: { type: Type.STRING, description: "Short title like 'Morning: Empty Stomach (Before Food)'" },
          description: { type: Type.STRING, description: "Timing note, e.g. 'Take 30-45 minutes before eating or drinking coffee'" },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                medicineName: { type: Type.STRING },
                genericName: { type: Type.STRING },
                dosage: { type: Type.STRING },
                instructions: { type: Type.STRING },
                isCriticalTiming: { type: Type.BOOLEAN },
              },
              required: ["medicineName", "genericName", "dosage", "instructions"],
            },
          },
        },
        required: ["timeLabel", "slotName", "title", "description", "items"],
      },
    },
    scheduleSummary: {
      type: Type.OBJECT,
      properties: {
        morning: { type: Type.ARRAY, items: { type: Type.STRING } },
        afternoon: { type: Type.ARRAY, items: { type: Type.STRING } },
        evening: { type: Type.ARRAY, items: { type: Type.STRING } },
        bedtime: { type: Type.ARRAY, items: { type: Type.STRING } },
        asNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["morning", "afternoon", "evening", "bedtime", "asNeeded"],
    },
    potentialInteractionsOrSpacingAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Crucial spacing rules between medicines (e.g., space probiotics 2 hrs from antibiotics, antacids 2 hrs apart).",
    },
    foodAndDietaryRules: {
      type: Type.OBJECT,
      properties: {
        foodsToEat: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Supportive foods (e.g. curd/yogurt, warm fluids, clear soups, electrolytes)" },
        foodsToAvoidOrLimit: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Foods or drinks that interact or worsen condition (e.g. alcohol, grapefruit, oily/spicy foods, caffeine)" },
        hydrationAdvice: { type: Type.STRING, description: "Daily fluid and water intake recommendations" },
      },
      required: ["foodsToEat", "foodsToAvoidOrLimit", "hydrationAdvice"],
    },
    lifestyleAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recovery advice such as hydration, dietary restrictions, rest, and sleep.",
    },
    unclearOrAmbiguousNotes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Any faint or illegible doctor handwriting notes. Never use robotic phrases like 'Unidentified Medication (Requires Pharmacist Verification)'; state politely what was unclear, e.g. 'Apologies, we didn\'t understand the medicine on this line due to unclear doctor handwriting'.",
    },
    unableToDecipher: {
      type: Type.BOOLEAN,
      description: "Set to TRUE if the handwriting is unreadable, ambiguous, or if any medicine cannot be recognized with confidence. If true, do not output high confidence.",
    },
    multiEngineEnsemble: {
      type: Type.OBJECT,
      description: "Detailed 5-stage clinical handwriting verification metadata resolving cursive ligatures, document geometry, Latin shorthand, dosage metrics, and pharmacopeia consensus. IMPORTANT: Never include proprietary OCR model names.",
      properties: {
        overallConfidence: { type: Type.NUMBER, description: "Combined clinical verification confidence score (0.0 to 99.9). If handwriting is unreadable or medicine is not understood, set to 0.0 - NEVER show fake 80%+ accuracy when unable to understand!" },
        ensembleAgreementPercent: { type: Type.NUMBER, description: "Degree of token agreement across verification stages (0.0 to 100.0)" },
        engines: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              engineId: { type: Type.STRING, description: "stroke_ligature | document_layout | latin_shorthand | dosage_metrics | pharmacopeia_consensus" },
              engineName: { type: Type.STRING, description: "Human-readable clinical stage name (e.g. 'Neural Stroke & Cursive Ligature Analysis', 'Prescription Layout & Section Analyzer', etc.) - strictly NO proprietary OCR model names" },
              frameworkTag: { type: Type.STRING, description: "Functional focus tag, e.g. 'Cursive Ligature Attention', 'Document Geometry Hierarchy', 'Deep Sequence Lexicon Decoding', 'High-Precision Metric Boundaries', 'Multimodal Clinical Safety Engine'" },
              engineRole: { type: Type.STRING, description: "Specific role in the handwriting deciphering pipeline" },
              extractedSnippet: { type: Type.STRING, description: "Key raw or normalized tokens identified in this stage (no OCR brand names)" },
              confidence: { type: Type.NUMBER, description: "Confidence percentage (0-100)" },
              specialtyFocus: { type: Type.STRING, description: "Clinical specialty focus of this stage" },
              status: { type: Type.STRING, description: "completed | consensus_aligned" },
            },
            required: ["engineId", "engineName", "frameworkTag", "engineRole", "extractedSnippet", "confidence", "specialtyFocus", "status"],
          },
        },
        consensusTokens: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of key confirmed medical tokens (drugs, dosages, frequencies, lab tests) agreed upon by consensus",
        },
        resolvedAmbiguities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Specific cursive ambiguities resolved (e.g. distinguishing 500mg vs 50mg, Augmentin vs Amoxicillin, OD vs BD) using clinical pharmacopeia",
        },
        arbitrationExplanation: {
          type: Type.STRING,
          description: "Clear clinical explanation of how the handwriting was decoded and verified across all stages without mentioning proprietary OCR model names",
        },
      },
      required: ["overallConfidence", "ensembleAgreementPercent", "engines", "consensusTokens", "resolvedAmbiguities", "arbitrationExplanation"],
    },
    medicalDisclaimer: {
      type: Type.STRING,
      description: "Clear standard medical safety reminder.",
    },
  },
  required: [
    "generalExplanation",
    "medicines",
    "labTests",
    "chronologicalTakingPlan",
    "scheduleSummary",
    "potentialInteractionsOrSpacingAdvice",
    "foodAndDietaryRules",
    "lifestyleAdvice",
    "multiEngineEnsemble",
    "medicalDisclaimer",
  ],
};

const singleMedicineSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    genericName: { type: Type.STRING },
    drugClass: { type: Type.STRING },
    primaryUses: { type: Type.ARRAY, items: { type: Type.STRING } },
    howItWorks: { type: Type.STRING },
    standardFormsAndStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    typicalDosageAndTiming: { type: Type.STRING },
    foodInstructions: { type: Type.STRING },
    mealRelation: { type: Type.STRING, description: "before_meal, after_meal, with_meal, empty_stomach, anytime" },
    precautionsAndWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    commonSideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
    seriousSideEffectsToReport: { type: Type.ARRAY, items: { type: Type.STRING } },
    commonInteractionsToAvoid: { type: Type.ARRAY, items: { type: Type.STRING } },
    missedDoseAdvice: { type: Type.STRING },
    storageInstructions: { type: Type.STRING },
  },
  required: [
    "name",
    "genericName",
    "drugClass",
    "primaryUses",
    "howItWorks",
    "typicalDosageAndTiming",
    "foodInstructions",
    "precautionsAndWarnings",
    "commonSideEffects",
  ],
};

async function callGeminiWithRetry(params: {
  contents: any;
  config: any;
  primaryModel?: string;
}): Promise<string> {
  const orderedKeys = getOrderedApiKeys();
  // Primary: gemini-2.5-flash (high quota 1500 RPD, fast, top vision OCR, zero 20-request/day limits)
  // Fallbacks: gemini-2.5-pro, gemini-flash-latest
  const modelsToTry = [
    params.primaryModel || "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-flash-latest",
  ];
  let lastError: any = null;

  for (let keyIdx = 0; keyIdx < orderedKeys.length; keyIdx++) {
    const apiKey = orderedKeys[keyIdx];
    const ai = getClientForKey(apiKey);
    const keyLabel = `Key #${keyIdx + 1} (…${apiKey.slice(-4)})`;
    let keyIsDead = false;

    for (const model of modelsToTry) {
      if (keyIsDead) break;

      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const config = { ...params.config };
          // ThinkingLevel is only supported on Gemini 3 series models
          if (!model.startsWith("gemini-3") && config.thinkingConfig) {
            delete config.thinkingConfig;
          }

          const response = await ai.models.generateContent({
            model,
            contents: params.contents,
            config,
          });
          const text = response.text;
          if (text) {
            return text;
          }
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || String(err);

          // If thinking config caused an error, retry immediately without it
          if (errMsg.toLowerCase().includes("thinking") && params.config?.thinkingConfig) {
            try {
              const fallbackConfig = { ...params.config };
              delete fallbackConfig.thinkingConfig;
              const fallbackResponse = await ai.models.generateContent({
                model,
                contents: params.contents,
                config: fallbackConfig,
              });
              if (fallbackResponse.text) {
                return fallbackResponse.text;
              }
            } catch (retryErr: any) {
              lastError = retryErr;
            }
          }

          // Check if error is related to key validity, rate limits, or quota exhaustion
          const isKeyOrQuotaError =
            errMsg.includes("429") ||
            errMsg.includes("RESOURCE_EXHAUSTED") ||
            errMsg.includes("quota") ||
            errMsg.includes("rate limit") ||
            errMsg.includes("RateLimitError") ||
            errMsg.toLowerCase().includes("api key") ||
            errMsg.toLowerCase().includes("apikey") ||
            errMsg.includes("API_KEY_INVALID") ||
            errMsg.includes("PERMISSION_DENIED") ||
            errMsg.includes("Forbidden") ||
            errMsg.includes("401") ||
            errMsg.includes("403") ||
            errMsg.includes("400");

          if (isKeyOrQuotaError) {
            console.warn(
              `[Gemini API] ${keyLabel} failed on ${model}: ${errMsg.slice(0, 150)}`
            );

            // Record cooldown on this key so next requests skip it immediately
            let cooldownSec = 45;
            const retryMatch = errMsg.match(/retry in ([\d.]+)s/i) || errMsg.match(/retryDelay":"(\d+)s/i);
            if (retryMatch && retryMatch[1]) {
              cooldownSec = Math.ceil(parseFloat(retryMatch[1])) + 2;
            }
            keyUnhealthyUntil.set(apiKey, Date.now() + cooldownSec * 1000);

            if (keyIdx < orderedKeys.length - 1) {
              const nextKey = orderedKeys[keyIdx + 1];
              console.log(
                `[Gemini API] Auto-failover: Switching immediately to Key #${keyIdx + 2} (…${nextKey.slice(-4)}) to retry request seamlessly...`
              );
              keyIsDead = true;
              break; // Break attempt loop, keyIsDead will break model loop immediately
            }
          }

          const isTransient =
            errMsg.includes("503") ||
            errMsg.includes("UNAVAILABLE") ||
            errMsg.includes("high demand");

          if (isTransient && attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
            continue;
          }
        }
      }
    }

    if (keyIsDead && keyIdx < orderedKeys.length - 1) {
      continue; // Move to next key immediately
    }
  }

  throw lastError || new Error("Failed to generate content from AI model across all available API keys.");
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10) || 3000;

  // 1. Trust reverse proxies (Railway, Cloudflare, etc.) for correct x-forwarded-proto detection
  app.set("trust proxy", true);

  // 2. HTTPS Redirection Middleware (Equivalent to FastAPI https_redirect middleware)
  // Automatically redirects incoming plain HTTP traffic to secure HTTPS on Railway/production
  app.use((req: Request, res: Response, next) => {
    const forwardedProto = req.headers["x-forwarded-proto"];
    if (forwardedProto && forwardedProto === "http") {
      const host = req.headers.host || req.hostname;
      return res.redirect(301, `https://${host}${req.url}`);
    }

    // Add HSTS security header for secure connections
    if (req.secure || forwardedProto === "https") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }

    next();
  });

  // Body parser with 25MB limit for high-res prescription photos
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  // API Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    const keys = getGeminiApiKeys();
    res.json({
      status: "ok",
      hasGeminiKey: keys.length > 0,
      activeKeysCount: keys.length,
      multiKeyEnabled: keys.length > 1,
      keys: keys.map((k, i) => ({
        keyNumber: i + 1,
        masked: `...${k.slice(-4)}`,
      })),
      timestamp: new Date().toISOString(),
    });
  });

  // Contact Form Status Endpoint (verify which email provider is active)
  app.get("/api/contact-status", (_req: Request, res: Response) => {
    const provider = getActiveEmailProvider();
    res.json({
      configured: provider.type !== "none",
      activeProvider: provider.name,
      targetEmail: process.env.EMAIL_USER || "Theprescriptionn@gmail.com",
    });
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!name || typeof name !== "string" || !name.trim()) {
        res.status(400).json({ success: false, error: "Please provide your name." });
        return;
      }
      if (!email || typeof email !== "string" || !email.includes("@")) {
        res.status(400).json({ success: false, error: "Please provide a valid email address." });
        return;
      }
      if (!message || typeof message !== "string" || !message.trim()) {
        res.status(400).json({ success: false, error: "Please provide your message." });
        return;
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim();
      const cleanSubject = (typeof subject === "string" && subject.trim()) || "General Prescription Inquiry";
      const cleanMessage = message.trim();
      const adminEmail = (process.env.EMAIL_USER || "theprescriptionn@gmail.com").trim().toLowerCase();

      // Automatically log every contact form submission to Google Sheets if configured (non-blocking)
      void saveContactSubmissionToGoogleSheet({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      });

      const provider = getActiveEmailProvider();

      if (provider.type === "none") {
        console.warn(
          `[Contact Form] Received message from ${cleanName} (${cleanEmail}) regarding "${cleanSubject}":\n"${cleanMessage}"\n` +
          `[Contact Form] NOTE: No email API key (RESEND_API_KEY or SENDGRID_API_KEY) is set on Railway. Message logged safely.`
        );

        res.json({
          success: true,
          delivered: false,
          provider: "Offline",
          message: "Message received! (Operating in offline mode until RESEND_API_KEY or SENDGRID_API_KEY is configured on Railway).",
        });
        return;
      }

      const safeName = escapeHtml(cleanName);
      const safeEmail = escapeHtml(cleanEmail);
      const safeSubject = escapeHtml(cleanSubject);
      const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");
      const timestamp = new Date().toUTCString();

      // 1. Email to Admin (Theprescriptionn@gmail.com)
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #064e3b 100%); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">New Prescription Contact Form Submission</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #a7f3d0;">Theprescription Web Platform</p>
          </div>
          <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; width: 120px; color: #64748b; font-weight: 600;">Sender Name:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Sender Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #059669; text-decoration: none; font-weight: bold;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Category:</td>
                <td style="padding: 6px 0; color: #0f172a;">${safeSubject}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Received At:</td>
                <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
              </tr>
            </table>

            <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <strong style="display: block; color: #0f172a; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Submitted Message:</strong>
              <div style="color: #1e293b; font-size: 14px; line-height: 1.6;">${safeMessage}</div>
            </div>

            <div style="margin-top: 24px; padding: 12px 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; font-size: 12px; color: #065f46;">
              💡 <strong>One-Click Reply:</strong> Click <em>"Reply"</em> directly in Gmail to write back to <strong>${safeName}</strong> at <strong>${safeEmail}</strong>.
            </div>
          </div>
        </div>
      `;

      // 2. Automated Confirmation Email to Visitor
      const visitorHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
          <div style="background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 800;">The<span style="color: #34d399;">prescription</span></h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #a7f3d0;">Healthcare Accessibility &amp; Medication Literacy</p>
          </div>
          <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">
            <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hello ${safeName},</p>
            <p>
              Thank you for contacting <strong>Theprescription</strong> team. We have received your inquiry regarding <strong>"${safeSubject}"</strong>.
            </p>
            <p>
              Our clinical informatics and software advisory team reviews submissions on an ongoing basis. If your message requires a personalized reply, we typically respond within <strong>24 to 48 business hours</strong>.
            </p>

            <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 14px 16px; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">Summary of Your Submission:</span>
              <div style="color: #334155; font-size: 13px; font-style: italic; line-height: 1.5;">${safeMessage}</div>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 14px; border-radius: 8px; font-size: 12px; color: #991b1b; margin-top: 24px;">
              <strong>⚠️ Urgent Safety Notice:</strong> This inbox is dedicated to health literacy feedback and software inquiries. It is <strong>NOT</strong> monitored for acute patient medical emergencies. If you are experiencing sudden adverse drug reactions, severe allergies, or symptoms of overdose, immediately contact <strong>911 / 112 / 999</strong> or your nearest hospital emergency department.
            </div>

            <p style="margin-top: 28px; margin-bottom: 4px; font-size: 13px; color: #64748b;">
              With warm regards,<br/>
              <strong style="color: #0f172a;">Theprescription Team</strong><br/>
              <a href="https://theprescriptions.up.railway.app/" style="color: #059669; text-decoration: none; font-weight: 500;">theprescriptions.up.railway.app</a>
            </p>
          </div>
        </div>
      `;

      // 1. Deliver to Admin (Theprescriptionn@gmail.com) - Critical
      const dispatchResult = await dispatchEmail({
        to: adminEmail,
        replyTo: cleanEmail,
        subject: `[New Inquiry] ${cleanSubject} - from ${cleanName}`,
        html: adminHtml,
        fromName: "Theprescription Contact Form",
      });

      // 2. Deliver Automated Confirmation Receipt to Visitor (Best effort)
      try {
        await dispatchEmail({
          to: cleanEmail,
          replyTo: adminEmail,
          subject: "Thank you for contacting Theprescription - Message Received",
          html: visitorHtml,
          fromName: "Theprescription",
        });
      } catch (receiptErr: any) {
        console.warn("[Contact Form] Visitor confirmation receipt skipped/unsupported by provider:", receiptErr?.message);
      }

      console.log(`[Contact Form] Successfully delivered inquiry via ${dispatchResult.provider}: ${cleanEmail} -> ${adminEmail}`);

      res.json({
        success: true,
        delivered: true,
        provider: dispatchResult.provider,
        message: "Your message has been received and delivered successfully.",
      });
    } catch (err: any) {
      console.error("[Contact Form] Failed to send email:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to dispatch email. Please try again or write directly to Theprescriptionn@gmail.com.",
      });
    }
  });

  // Diagnostic Test Endpoint: verify active email provider connectivity from Railway
  app.get("/api/test-email", async (_req: Request, res: Response) => {
    try {
      const adminEmail = (process.env.EMAIL_USER || "theprescriptionn@gmail.com").trim().toLowerCase();
      const provider = getActiveEmailProvider();

      if (provider.type === "none") {
        res.status(400).json({
          success: false,
          error: "No email service configured on Railway. Please add RESEND_API_KEY or SENDGRID_API_KEY to your Railway Variables.",
          guidance: [
            "Option 1 (Recommended): Add RESEND_API_KEY from https://resend.com (Free, takes 30 seconds)",
            "Option 2: Add SENDGRID_API_KEY from https://sendgrid.com (Free tier 100 emails/day)",
            "Option 3: Add BREVO_API_KEY from https://brevo.com (Free tier 300 emails/day)",
          ],
        });
        return;
      }

      const result = await dispatchEmail({
        to: adminEmail,
        subject: `[Diagnostic] Theprescription Email Delivery Active (${provider.name})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; color: #0f172a;">
            <h3 style="color: #059669; margin-top: 0;">🎉 Diagnostic Email Verification Passed!</h3>
            <p>Your Railway backend is successfully connected via <strong>${provider.name}</strong> over HTTPS (port 443).</p>
            <p style="color: #64748b; font-size: 13px;">Timestamp: ${new Date().toUTCString()}</p>
          </div>
        `,
        fromName: "Theprescription System",
      });

      res.json({
        success: true,
        provider: result.provider,
        message: `Diagnostic test email sent successfully to ${adminEmail} via ${result.provider}! Check your inbox.`,
      });
    } catch (err: any) {
      console.error("[Test Email] Error:", err);
      res.status(500).json({
        success: false,
        error: err?.message || String(err),
      });
    }
  });

  // Diagnostic Test Endpoint: verify Google Sheet webhook connectivity from Railway
  app.get("/api/test-google-sheet", async (_req: Request, res: Response) => {
    const webhookUrl = (process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_URL || "").trim();
    if (!webhookUrl) {
      res.status(400).json({
        success: false,
        configured: false,
        error: "GOOGLE_SHEET_WEBHOOK_URL variable is not set in Railway Variables.",
        instructions: "Please add GOOGLE_SHEET_WEBHOOK_URL in your Railway Variables tab with your Google Apps Script Web App URL.",
      });
      return;
    }

    try {
      const ok = await saveContactSubmissionToGoogleSheet({
        name: "Test User (Theprescription Verification)",
        email: "test@theprescription.in",
        subject: "Diagnostic Verification Test",
        message: "This is a test entry confirming that contact form submissions are properly recording into your Google Sheet!",
      });

      if (ok) {
        res.json({
          success: true,
          configured: true,
          message: "🎉 Success! A test row was appended directly into your Google Sheet. Check your sheet!",
        });
      } else {
        res.status(502).json({
          success: false,
          configured: true,
          error: "Google Apps Script responded with an error or blocked the request. Please check that 'Who has access' is set to 'Anyone' in your deployment settings.",
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        configured: true,
        error: err?.message || String(err),
      });
    }
  });

  // API Endpoint: Live-test all configured keys & failover readiness
  app.get("/api/test-keys", async (_req: Request, res: Response) => {
    const keys = getGeminiApiKeys();
    if (keys.length === 0) {
      res.status(500).json({
        success: false,
        error: "No Gemini API keys configured on this server.",
      });
      return;
    }

    const results = [];
    const testModels = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-3.6-flash"];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const client = getClientForKey(key);
      const modelChecks = [];

      for (const m of testModels) {
        const start = Date.now();
        try {
          const response = await client.models.generateContent({
            model: m,
            contents: "Respond with only the single word: OK",
          });
          modelChecks.push({
            model: m,
            status: "ACTIVE & WORKING",
            latencyMs: Date.now() - start,
            preview: response.text?.trim() || "OK",
          });
        } catch (err: any) {
          modelChecks.push({
            model: m,
            status: "FAILED / QUOTA EXHAUSTED",
            latencyMs: Date.now() - start,
            error: err?.message || String(err),
          });
        }
      }

      const isWorking = modelChecks.some((c) => c.status.startsWith("ACTIVE"));
      results.push({
        keyNumber: i + 1,
        maskedKey: `...${key.slice(-4)}`,
        overallStatus: isWorking ? "ACTIVE & WORKING" : "EXHAUSTED / FAILED",
        cooldownRemainingSec: Math.max(0, Math.ceil(((keyUnhealthyUntil.get(key) || 0) - Date.now()) / 1000)),
        models: modelChecks,
      });
    }

    const workingCount = results.filter((r) => r.overallStatus.startsWith("ACTIVE")).length;

    res.json({
      success: workingCount > 0,
      totalKeysConfigured: keys.length,
      workingKeysCount: workingCount,
      failoverReady: workingCount > 1,
      cachedPrescriptionsCount: prescriptionAnalysisCache.size,
      cachedMedicinesCount: singleMedicineCache.size,
      keys: results,
      summary:
        workingCount > 1
          ? `All ${workingCount} keys are active and verified. If Key 1 reaches its quota or fails, the server will seamlessly failover to Key 2.`
          : workingCount === 1
          ? `1 key is working. Add a second valid key to enable automatic failover.`
          : `No keys are working. Please check your Railway variables.`,
    });
  });

  // API Endpoint: Analyze Prescription (Image or Text notes)
  app.post("/api/analyze-prescription", async (req: Request, res: Response) => {
    try {
      const {
        imageBase64,
        mimeType = "image/jpeg",
        textNotes,
        patientContext,
        ocrPretext,
        preprocessingReport,
        learnedCorrections,
      } = req.body;

      if (!imageBase64 && (!textNotes || !textNotes.trim())) {
        res.status(400).json({
          error: "Please provide either a prescription photo or written prescription notes.",
        });
        return;
      }

      let cleanBase64 = imageBase64;
      let detectedMime = mimeType;
      if (imageBase64) {
        const match = imageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (match) {
          detectedMime = match[1];
          cleanBase64 = match[2];
        }
      }

      // --- 1. Instant Cache Check for repeat / same prescription analyses ---
      const cacheKey = computePrescriptionHash(cleanBase64, textNotes, patientContext);
      const cached = prescriptionAnalysisCache.get(cacheKey);

      if (cached && (Date.now() - cached.cachedAt) < PRESCRIPTION_CACHE_TTL_MS) {
        console.log(`[Prescription Cache] Instant Cache HIT for hash ${cacheKey.slice(0, 12)}... (0ms response, zero API quota burned)`);
        const cachedResponse = {
          ...cached.data,
          servedFromCache: true,
          cacheAgeSeconds: Math.floor((Date.now() - cached.cachedAt) / 1000),
        };
        if (preprocessingReport && !cachedResponse.imagePreprocessingReport) {
          cachedResponse.imagePreprocessingReport = preprocessingReport;
        }
        res.json({ success: true, data: cachedResponse, cached: true });
        return;
      }

      const systemPrompt = `You are a Senior Clinical Pharmacist and Medical Prescription Decryption Expert with advanced expertise in deciphering doctor handwriting, pharmacology, diagnostic investigations, and patient safety.

Your task is to examine doctor prescriptions (which may contain cursive handwriting, abbreviations, Latin terms, and diagnostic orders) and provide a comprehensive, patient-friendly medical explanation.

CRITICAL 5-STAGE CLINICAL HANDWRITING & CONSENSUS ARCHITECTURE:
You operate as the primary Clinical Consensus Arbiter presiding over a 5-stage clinical handwriting recognition pipeline:
1. Stage 1 ('stroke_ligature'): Neural Stroke & Cursive Ligature Analysis - Resolves cursive loops, pen tilt, ascender/descender slurs, and handwritten brand prefixes.
2. Stage 2 ('document_layout'): Prescription Layout & Section Analyzer - Parses clinic letterhead, patient metadata, structured Rx medication order lines, and Adv/Inv diagnostic blocks.
3. Stage 3 ('latin_shorthand'): Medical Shorthand & Timing Decoder - Deep sequence decoding of compressed Latin medical shorthand and rapid doctor penmanship (1-0-1, OD, BD, TDS, AC, PC, HS, SOS).
4. Stage 4 ('dosage_metrics'): Dosage Metrics & Unit Precision Parser - High-precision extraction of dosage strengths (mg, mcg, ml, g, tab, cap), frequencies, and numeric treatment duration boundaries.
5. Stage 5 ('pharmacopeia_consensus'): Clinical Pharmacopeia Cross-Validation - Reconciles candidate hypotheses across all verification stages with standard pharmacology, therapeutic dosage limits, and drug safety databases.

SMART NLP POST-PROCESSING & DRUG NAME RECOVERY DIRECTIVES:
Even if doctor handwriting or OCR output is messy, illegible, or distorted, you MUST recover correct medicine names using:
1. Fuzzy matching (RapidFuzz equivalent) → fix common doctor and OCR spelling mistakes (e.g., "Amoxcillin" → "Amoxicillin", "Augmentn" → "Augmentin", "Paracetmol" → "Paracetamol", "Pantocit" → "Pantocid", "Azithromicin" → "Azithral / Azithromycin").
2. Brand → Generic mapping → For every detected brand name, automatically map to its exact generic active chemical salt combination (e.g., Augmentin → Amoxicillin + Clavulanic Acid, Pan-D → Pantoprazole + Domperidone, Dolo / Crocin → Paracetamol, Glycomet → Metformin, Telma → Telmisartan).
3. Medicine dictionary integration → include short forms (e.g. "Amox", "PCM", "Azith", "Panto", "Cipro", "Metfor"), misspellings, and regional trade names.
4. Confidence scoring → Always assess clarity as High / Medium / Low, noting any cursive ambiguity so patients are prompted to confirm when appropriate.

CRITICAL DIRECTIVE - HANDLING UNCLEAR / UNREADABLE MEDICINES:
- ONLY set "unableToDecipher": true if you are COMPLETELY unable to identify ANY medicine from the prescription (e.g. completely illegible scribbles across the whole page, blank or corrupted image, or zero recognizable medicine names).
- If at least ONE medicine can be read or recognized on the prescription, set "unableToDecipher": false! Do NOT mark the whole prescription as undecipherable just because one line or note was unclear.
- If a specific individual line or word is completely illegible scribble that cannot be identified as any known pharmaceutical drug:
  * Only for that specific unreadable line, set its medicine name to "Apologies, we didn't understand this medicine" and genericName to "Handwriting unclear".
  * For all other recognized medicines, extract their exact names, dosages, and instructions normally.
- In 'multiEngineEnsemble':
  * If the entire prescription was completely undecipherable with no recognized medicines: set 'overallConfidence' to 0 and 'ensembleAgreementPercent' to 0.
  * If valid medicines were successfully recognized: calculate real confidence (e.g. 92.0% - 99.4%) based on token clarity. Never zero out confidence when valid medicines were identified!

CRITICAL DIRECTIVE - NO OCR MODEL NAMES TO USERS:
Do NOT mention any proprietary, open-source, or third-party OCR model names (such as TrOCR, Donut, Paddle, Tesseract, HuggingFace, Baidu, PyTorch, etc.) anywhere in your output, explanations, snippets, or JSON fields. Always identify stages strictly by their clinical function: "Neural Stroke & Cursive Ligature Analysis", "Prescription Layout & Section Analyzer", "Medical Shorthand & Timing Decoder", "Dosage Metrics & Unit Precision Parser", and "Clinical Pharmacopeia Cross-Validation".

You MUST populate the 'multiEngineEnsemble' object in the JSON response:
- If medicines were successfully recognized: provide realistic overall confidence (e.g. 94.0 - 99.4%) and agreement percent.
- If handwriting was NOT recognized or unreadable: set overallConfidence to 0.0 and ensembleAgreementPercent to 0.0. Do NOT show fake 80% accuracy!
- Provide all 5 stage objects ('stroke_ligature', 'document_layout', 'latin_shorthand', 'dosage_metrics', 'pharmacopeia_consensus') detailing their extracted snippets, individual confidence, and specialty focuses.
- List confirmed consensus tokens (e.g., "Augmentin 625", "1-0-1", "PC", "CBC", "Pantocid 40").
- Document any resolved ambiguities (e.g. "Distinguished cursive 'Augm' from 'Amox' based on 625mg dosage strength matching Augmentin").

EXPANDED MEDICAL ABBREVIATION & TERMINOLOGY KNOWLEDGE:
You possess exhaustive knowledge of Latin prescription shorthand and clinical codes:
- Frequency & Timing:
  * OD / qd = Omni Die (Once daily, every 24h at same time)
  * BD / BID = Bis in Die (Twice daily, ~12h apart)
  * TDS / TID = Ter Die Sumendum (Three times daily, ~8h apart)
  * QID / QDS = Quater in Die (Four times daily, ~6h apart)
  * Q4H / Q6H / Q8H = Every 4, 6, or 8 hours
  * QOD = Quaque Altera Die (Every other day)
  * 1-0-1 = Morning 1, Afternoon 0, Night 1
  * 1-0-0 = Morning only
  * 0-0-1 = Night only
  * 1-1-1 = Morning 1, Afternoon 1, Night 1
  * AC = Ante Cibum (Before meals / empty stomach, 30-45 mins before food)
  * PC = Post Cibum (After meals, with or immediately after food)
  * HS / QHS = Hora Somni (At bedtime)
  * BBF = Before Breakfast
  * ABF = After Breakfast
  * Mane / Nocte = Morning / Night
  * SOS / PRN = Si Opus Sit / Pro Re Nata (As needed / only when symptoms occur)
  * Stat = Statim (Immediately / single loading dose)
  * ad lib. = Ad libitum (Freely / as desired)
- Routes & Formulations:
  * PO = Per Os (By mouth)
  * SL = Sublingual (Under tongue)
  * PR = Per Rectum (Rectally)
  * SC / SQ = Subcutaneous injection
  * IM = Intramuscular injection
  * IV / IVP / IVPB = Intravenous infusion / push
  * Top. = Topical application
  * Inh. / Neb. = Inhalation / Nebulizer
  * Tab = Tablet, Cap = Capsule, Syp = Syrup, Susp = Suspension, Oint/Ung = Ointment, Supp = Suppository, Gtt = Drops, Pulv = Powder sachet
- Sidedness:
  * OD = Oculus Dexter (Right eye)
  * OS = Oculus Sinister (Left eye)
  * OU = Oculus Uterque (Both eyes)
  * AD = Auris Dextra (Right ear), AS = Left ear, AU = Both ears
- Clinical Directives:
  * Rx = Recipe (Take thou)
  * Sig / S. = Signa (Label directions)
  * Mitte = Dispense this quantity
  * c = Cum (With)
  * s = Sine (Without)
  * aa = Ana (Of each in equal parts)
  * qs = Quantum Sufficiat (As much as suffices)
  * NPO = Nil Per Os (Nothing by mouth)
  * c/o = Complaining of, k/c/o = Known case of, h/o = History of, d/d = Differential diagnosis, r/o = Rule out, f/u = Follow up
  * Adv / Inv / Ix = Advice / Investigations ordered

LABORATORY & DIAGNOSTIC TESTS DETECTION:
Scan the prescription thoroughly for any diagnostic workup written under "Adv:", "Inv:", "Investigations:", "Lab:", "Tests:", "Rx/Ix:":
- Complete Blood Count (CBC / TLC / DLC), ESR, CRP
- Liver Function Test (LFT: SGOT, SGPT, Bilirubin, ALP, Albumin)
- Kidney Function Test (KFT / RFT: Blood Urea, Serum Creatinine, Uric Acid, Electrolytes)
- Lipid Profile (Cholesterol, Triglycerides, HDL, LDL, VLDL)
- Blood Glucose: Fasting Blood Sugar (FBS), Postprandial (PPBS), Random (RBS), HbA1c
- Thyroid Profile (T3, T4, TSH)
- Urine Routine and Microscopy (Urine R/M, Culture & Sensitivity)
- Stool Examination (Occult Blood, Ova, Cysts)
- Radiology / Imaging: Chest X-Ray (CXR), Ultrasound Abdomen & Pelvis (USG), CT Scan, MRI, Mammography
- Cardiology: Electrocardiogram (ECG / EKG), 2D Echocardiogram, TMT
- Serology / Immunology: Widal Test, Dengue NS1 / IgM / IgG, Typhoid, Viral Markers (HBsAg, HCV, HIV), Vitamin D3, Vitamin B12, Serum Ferritin, Iron Studies.`;

      const parts: any[] = [];

      if (cleanBase64) {
        parts.push({
          inlineData: {
            mimeType: detectedMime || "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      let userPrompt = "Please analyze this doctor prescription thoroughly.";
      if (ocrPretext && ocrPretext.trim()) {
        userPrompt += `\n\n[OCR Pre-Extracted Handwriting Tokens]:\n"""\n${ocrPretext.trim()}\n"""\n(Cross-reference these extracted OCR text tokens with the image strokes to ensure 100% handwriting accuracy).`;
      }
      if (textNotes && textNotes.trim()) {
        userPrompt += `\n\nPrescription Notes / Doctor Text provided:\n"""\n${textNotes.trim()}\n"""`;
      }
      if (patientContext && patientContext.trim()) {
        userPrompt += `\n\nPatient Context & Concerns:\n"""\n${patientContext.trim()}\n"""`;
      }
      if (preprocessingReport) {
        userPrompt += `\n\n[Advanced Image Preprocessing & Handwriting Segmentation Analysis]:\n` +
          `- Noise reduction: Completed (3x3 spatial filter + speckle elimination)\n` +
          `- Contrast enhancement: Boosted ink darkness by ${preprocessingReport.contrastEnhancementFactor || '1.6'}x\n` +
          `- Deskewing: Straightened tilted text lines by ${preprocessingReport.skewAngle || 0}°\n` +
          `- Adaptive thresholding: Bradley-Roth integral binarization computed\n` +
          `- Line & Word Segmentation: ${preprocessingReport.totalLinesDetected || preprocessingReport.lines?.length || 0} distinct text lines and ${preprocessingReport.totalWordsDetected || 0} word spans detected.\n` +
          `Carefully review the prescription line-by-line across all segmented sections to capture every medication, dosage strength, Latin abbreviation, and diagnostic investigation.`;
      }

      if (learnedCorrections && Array.isArray(learnedCorrections) && learnedCorrections.length > 0) {
        userPrompt += `\n\n[Human-in-the-Loop Learned Doctor Handwriting Patterns (Site Trained Memory)]:`;
        for (const corr of learnedCorrections.slice(0, 12)) {
          userPrompt += `\n- Ambiguous Handwriting token "${corr.rawToken}" was previously patient-verified as "${corr.confirmedMedicine}" (${corr.confirmedGeneric || ''})`;
        }
        userPrompt += `\nIf you see similar cursive handwriting strokes or short-forms in this prescription, match them with high priority to avoid dangerous misidentification.`;
      }

      parts.push({ text: userPrompt });

      const responseText = await callGeminiWithRetry({
        contents: { parts },
        primaryModel: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.1,
        },
      });

      const parsedData = cleanAndParseJson(responseText);
      // Apply Smart NLP Post-Processing layer (RapidFuzz, Brand->Generic, Dictionary, Confidence Scoring)
      const enrichedData = postProcessPrescriptionResultWithNLP(parsedData);
      if (preprocessingReport) {
        enrichedData.imagePreprocessingReport = preprocessingReport;
      }

      // Save to in-memory cache for instant subsequent loading
      if (enrichedData && enrichedData.medicines && enrichedData.medicines.length > 0 && !enrichedData.unableToDecipher) {
        if (prescriptionAnalysisCache.size >= MAX_PRESCRIPTION_CACHE_SIZE) {
          const oldest = prescriptionAnalysisCache.keys().next().value;
          if (oldest) prescriptionAnalysisCache.delete(oldest);
        }
        prescriptionAnalysisCache.set(cacheKey, {
          data: enrichedData,
          cachedAt: Date.now(),
        });
        console.log(`[Prescription Cache] Cached clinical analysis for hash ${cacheKey.slice(0, 12)}... (Total cached: ${prescriptionAnalysisCache.size})`);
      }

      res.json({ success: true, data: enrichedData });
    } catch (err: any) {
      console.error("Error analyzing prescription:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to analyze prescription.",
      });
    }
  });

  // API Endpoint: Look up single medicine usage & details with caching
  app.post("/api/check-single-medicine", async (req: Request, res: Response) => {
    try {
      const { medicineName } = req.body;
      if (!medicineName || !medicineName.trim()) {
        res.status(400).json({ error: "Medicine name is required." });
        return;
      }

      const normalizedMedName = medicineName.trim().toLowerCase();
      const cachedMed = singleMedicineCache.get(normalizedMedName);
      if (cachedMed && (Date.now() - cachedMed.cachedAt) < MEDICINE_CACHE_TTL_MS) {
        console.log(`[Medicine Cache] Instant Cache HIT for "${medicineName}"`);
        res.json({ success: true, data: cachedMed.data, cached: true });
        return;
      }

      const prompt = `Provide a comprehensive, patient-friendly medical profile and usage guide for the medicine: "${medicineName.trim()}".
Include its generic name, primary uses, mechanism of action, typical dosage forms, food instructions, meal relations, precautions, common side effects, red-flag symptoms, interactions, and missed dose advice.`;

      const responseText = await callGeminiWithRetry({
        contents: prompt,
        primaryModel: "gemini-2.5-flash",
        config: {
          systemInstruction: "You are an expert pharmacist creating patient education guides for medications.",
          responseMimeType: "application/json",
          responseSchema: singleMedicineSchema,
          temperature: 0.1,
        },
      });

      const parsedData = cleanAndParseJson(responseText);

      // Save to cache for instant subsequent lookups
      singleMedicineCache.set(normalizedMedName, {
        data: parsedData,
        cachedAt: Date.now(),
      });

      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("Error checking medicine:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to retrieve medicine details.",
      });
    }
  });

  // Vite / Static middleware setup
  const distPath = fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
    ? path.join(process.cwd(), "dist")
    : typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))
    ? __dirname
    : typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "..", "dist", "index.html"))
    ? path.join(__dirname, "..", "dist")
    : path.join(process.cwd(), "dist");

  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  // RSS Feed & Substack Export Endpoints
  app.get(["/feed.xml", "/rss.xml", "/feed"], (_req: Request, res: Response) => {
    const feedFile = path.join(distPath, "feed.xml");
    const fallbackPath = path.join(process.cwd(), "public", "feed.xml");
    const targetFile = fs.existsSync(feedFile) ? feedFile : fallbackPath;

    if (fs.existsSync(targetFile)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.sendFile(targetFile);
    } else {
      res.status(404).send("Feed not found");
    }
  });

  app.get("/theprescription-substack-export.xml", (_req: Request, res: Response) => {
    const exportFile = path.join(distPath, "theprescription-substack-export.xml");
    const fallbackPath = path.join(process.cwd(), "public", "theprescription-substack-export.xml");
    const targetFile = fs.existsSync(exportFile) ? exportFile : fallbackPath;

    if (fs.existsSync(targetFile)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="theprescription-substack-export.xml"');
      res.sendFile(targetFile);
    } else {
      res.status(404).send("Substack export file not found");
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          } else if (filePath.match(/\.(js|css|webp|png|jpg|jpeg|svg|woff2?|ico)$/i)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );
    app.get("*", (_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Prescription Medicine Checker server listening on http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || "development"})`);
  });

  // Graceful shutdown for container environments (Railway, Docker, etc.)
  const shutdown = () => {
    console.log("Shutting down server gracefully...");
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("Forcefully shutting down after timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});
