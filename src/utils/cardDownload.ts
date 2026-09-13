import { PrescriptionAnalysisResult } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a clean, standalone, beautifully styled HTML document of the medication card
 * with embedded CSS and print styling that opens anywhere offline, containing all clinical sections.
 */
export function generatePrintableCardHtml(prescription: PrescriptionAnalysisResult): string {
  const generatedDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const clinicName = prescription.doctorSpecialtyOrClinic || 'Prescribed Clinical Regimen';
  const indication = prescription.suspectedCondition || '';
  const explanation = prescription.generalExplanation || '';

  const medicinesRows = prescription.medicines
    .map(
      (med, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-weight: 700; color: #0f172a; font-size: 14px;">${escapeHtml(med.name)}</div>
          <div style="font-size: 12px; color: #059669; font-weight: 600;">${escapeHtml(med.genericName)}</div>
          ${
            med.strength
              ? `<span style="display: inline-block; background: #f1f5f9; color: #475569; font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-top: 3px; font-weight: 600;">${escapeHtml(med.strength)} (${escapeHtml(med.form)})</span>`
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-weight: 700; color: #1e293b;">${escapeHtml(med.dosage)}</div>
          <div style="font-size: 12px; color: #64748b;">${escapeHtml(med.frequency)}</div>
          ${
            med.timingCode
              ? `<span style="font-family: monospace; font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 1px 5px; border-radius: 4px; font-weight: 600;">[${escapeHtml(med.timingCode)}]</span>`
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <span style="font-weight: 700; color: #0f172a; font-size: 12px; display: block;">${escapeHtml(med.mealRelationText)}</span>
          ${
            med.howToTake
              ? `<span style="font-size: 11px; color: #475569; display: block; margin-top: 2px;">${escapeHtml(med.howToTake)}</span>`
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155; font-size: 12px; white-space: nowrap;">
          ${escapeHtml(med.duration || 'As directed')}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #475569; line-height: 1.4;">
          <div style="color: #1e293b; font-weight: 500;">${escapeHtml(med.purposeAndUsage)}</div>
          ${
            med.precautions && med.precautions.length > 0
              ? `<div style="font-size: 10px; color: #92400e; background: #fffbeb; padding: 3px 6px; border-radius: 4px; margin-top: 4px; border: 1px solid #fef3c7;">⚠️ ${escapeHtml(med.precautions[0])}</div>`
              : ''
          }
        </td>
      </tr>
    `
    )
    .join('');

  // Daily Schedule Slots
  const renderScheduleSlot = (title: string, subtitle: string, items: string[], color: string, bg: string, border: string) => {
    return `
      <div style="padding: 12px; border-radius: 10px; border: 1px solid ${border}; background: ${bg};">
        <div style="font-weight: 800; font-size: 12px; color: ${color}; margin-bottom: 2px;">${title}</div>
        <div style="font-size: 10px; color: #64748b; margin-bottom: 8px;">${subtitle}</div>
        <div style="display: flex; flex-direction: column; gap: 6px; min-height: 48px;">
          ${
            items.length > 0
              ? items
                  .map(
                    (it) => `
              <div style="display: flex; align-items: flex-start; gap: 6px; font-size: 11px; color: #1e293b;">
                <span style="display: inline-block; width: 14px; height: 14px; border: 1px solid #94a3b8; border-radius: 3px; background: #fff; flex-shrink: 0; margin-top: 1px;"></span>
                <span style="font-weight: 600; line-height: 1.3;">${escapeHtml(it)}</span>
              </div>
            `
                  )
                  .join('')
              : `<span style="font-size: 11px; color: #94a3b8; font-style: italic;">None</span>`
          }
        </div>
      </div>
    `;
  };

  const scheduleSection = `
    <div style="margin-top: 24px;">
      <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155; margin: 0 0 10px 0;">
        ⏰ Daily Dosage Routine & Patient Check-Off Tracker
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;">
        ${renderScheduleSlot('Morning', '7:00 AM – 9:00 AM', prescription.scheduleSummary.morning, '#b45309', '#fffbeb', '#fde68a')}
        ${renderScheduleSlot('Afternoon', '12:00 PM – 2:00 PM', prescription.scheduleSummary.afternoon, '#0369a1', '#f0f9ff', '#bae6fd')}
        ${renderScheduleSlot('Evening / Dinner', '6:00 PM – 8:00 PM', prescription.scheduleSummary.evening, '#4338ca', '#eef2ff', '#c7d2fe')}
        ${renderScheduleSlot('Bedtime', '9:30 PM – 11:00 PM', prescription.scheduleSummary.bedtime, '#7e22ce', '#faf5ff', '#e9d5ff')}
        ${renderScheduleSlot('As Needed (SOS)', 'When symptoms occur', prescription.scheduleSummary.asNeeded, '#be123c', '#fff1f2', '#fecdd3')}
      </div>
    </div>
  `;

  const labTestsSection =
    prescription.labTests && prescription.labTests.length > 0
      ? `
      <div style="margin-top: 24px; border: 1px solid #c7d2fe; background: #f5f7ff; border-radius: 12px; padding: 16px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #3730a3; text-transform: uppercase; letter-spacing: 0.5px;">
          🔬 Prescribed Diagnostic & Laboratory Tests (Adv / Inv) (${prescription.labTests.length})
        </h3>
        <div style="display: grid; gap: 8px;">
          ${prescription.labTests
            .map(
              (t) => `
            <div style="background: #ffffff; border: 1px solid #e0e7ff; padding: 10px 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <div>
                <div style="font-weight: 700; color: #1e1b4b; font-size: 13px;">
                  ${escapeHtml(t.testName)} 
                  <span style="font-size: 11px; background: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-left: 4px;">${escapeHtml(t.category)}</span>
                  ${t.fastingRequired ? `<span style="font-size: 10px; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 4px;">Fasting Required</span>` : ''}
                </div>
                <div style="font-size: 12px; color: #475569; margin-top: 2px;">${escapeHtml(t.whyDoctorOrdered)}</div>
              </div>
              ${
                t.preparationInstructions
                  ? `<div style="font-size: 11px; color: #1e293b; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: 600; border: 1px solid #e2e8f0;">Prep: ${escapeHtml(t.preparationInstructions)}</div>`
                  : ''
              }
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      : '';

  const interactionsSection =
    prescription.potentialInteractionsOrSpacingAdvice.length > 0
      ? `
      <div style="margin-top: 20px; border: 1px solid #fed7aa; background: #fffaf5; border-radius: 12px; padding: 16px;">
        <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; color: #9a3412; text-transform: uppercase; letter-spacing: 0.5px;">
          ⚠️ Critical Timing, Drug Spacing & Safety Rules
        </h3>
        <ul style="margin: 0; padding-left: 18px; color: #7c2d12; font-size: 12px; line-height: 1.6;">
          ${prescription.potentialInteractionsOrSpacingAdvice
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('')}
        </ul>
      </div>
    `
      : '';

  const dietarySection = prescription.foodAndDietaryRules
    ? `
    <div style="margin-top: 20px; border: 1px solid #a7f3d0; background: #ecfdf5; border-radius: 12px; padding: 16px;">
      <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.5px;">
        🥗 Nutritional & Dietary Guidelines During Treatment
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
        <div style="background: #ffffff; padding: 10px 12px; border-radius: 8px; border: 1px solid #d1fae5;">
          <div style="font-weight: 700; color: #047857; font-size: 11px; margin-bottom: 4px;">✓ Beneficial Foods to Consume</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #334155; line-height: 1.5;">
            ${prescription.foodAndDietaryRules.foodsToEat.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #ffffff; padding: 10px 12px; border-radius: 8px; border: 1px solid #ffe4e6;">
          <div style="font-weight: 700; color: #be123c; font-size: 11px; margin-bottom: 4px;">✕ Foods & Drinks to Avoid / Limit</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #334155; line-height: 1.5;">
            ${prescription.foodAndDietaryRules.foodsToAvoidOrLimit.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #ffffff; padding: 10px 12px; border-radius: 8px; border: 1px solid #cffafe;">
          <div style="font-weight: 700; color: #0e7490; font-size: 11px; margin-bottom: 4px;">💧 Hydration Guidance</div>
          <div style="font-size: 11px; color: #334155; line-height: 1.5;">
            ${escapeHtml(prescription.foodAndDietaryRules.hydrationAdvice)}
          </div>
        </div>
      </div>
    </div>
  `
    : '';

  const lifestyleSection =
    prescription.lifestyleAdvice && prescription.lifestyleAdvice.length > 0
      ? `
    <div style="margin-top: 20px; border: 1px solid #99f6e4; background: #f0fdfa; border-radius: 12px; padding: 16px;">
      <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #115e59; text-transform: uppercase; letter-spacing: 0.5px;">
        🏃 Supportive Lifestyle & Recovery Care Advice
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
        ${prescription.lifestyleAdvice
          .map(
            (adv) => `
          <div style="background: #ffffff; padding: 8px 10px; border-radius: 6px; border: 1px solid #ccfbf1; font-size: 11px; color: #1e293b;">
            • ${escapeHtml(adv)}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theprescription - Patient Medication Schedule - ${escapeHtml(clinicName)}</title>
  <style>
    @media print {
      .no-print { display: none !important; }
      body { background: #fff !important; padding: 0 !important; }
      .card-container { box-shadow: none !important; border: 1px solid #cbd5e1 !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 24px;
      line-height: 1.5;
    }
    .card-container {
      max-width: 980px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
    }
    th {
      background: #f1f5f9;
      color: #334155;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px;
      text-align: left;
      border-bottom: 2px solid #cbd5e1;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      text-decoration: none;
      border: none;
      transition: background 0.15s;
    }
    .btn-emerald {
      background: #059669;
      color: #ffffff;
    }
    .btn-emerald:hover {
      background: #047857;
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 980px; margin: 0 auto 16px auto; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-size: 13px; color: #64748b; font-weight: 600;">
      📄 Official Theprescription Patient Medication Schedule • Print or Save Offline
    </div>
    <button class="btn btn-emerald" onclick="window.print()">
      🖨️ Print / Save as PDF
    </button>
  </div>

  <div class="card-container">
    <!-- Header -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="font-size: 12px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 1px;">
          ℞ Theprescription • Official Patient Medication Schedule & Guide
        </div>
        <h1 style="margin: 4px 0 0 0; font-size: 24px; font-weight: 900; color: #0f172a;">
          Prescription Medicines & Daily Schedule
        </h1>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
          Complete clinical guide for dosage timing, food rules, routine timetable, and recovery.
        </p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${escapeHtml(clinicName)}</div>
        ${prescription.prescriptionDate ? `<div>Rx Date: <strong>${escapeHtml(prescription.prescriptionDate)}</strong></div>` : ''}
        <div>Issued: ${generatedDate}</div>
      </div>
    </div>

    <!-- Indication -->
    ${
      indication
        ? `
      <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;">
        <div style="font-weight: 800; color: #0f172a; font-size: 13px;">
          Primary Indication / Treatment Goal: ${escapeHtml(indication)}
        </div>
        ${explanation ? `<div style="font-size: 12px; color: #475569; margin-top: 4px; line-height: 1.5;">${escapeHtml(explanation)}</div>` : ''}
      </div>
    `
        : ''
    }

    <!-- Medicine Table -->
    <div style="margin-top: 24px;">
      <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155; margin: 0;">
        Prescribed Medicines Master Inventory (${prescription.medicines.length})
      </h2>
      <div style="overflow-x: auto;">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine & Salt</th>
              <th>Dose / Frequency</th>
              <th>Meal Relation</th>
              <th>Duration</th>
              <th>Purpose & Notes</th>
            </tr>
          </thead>
          <tbody>
            ${medicinesRows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Daily Routine Timetable -->
    ${scheduleSection}

    <!-- Diagnostic tests -->
    ${labTestsSection}

    <!-- Interactions -->
    ${interactionsSection}

    <!-- Dietary -->
    ${dietarySection}

    <!-- Lifestyle -->
    ${lifestyleSection}

    <!-- Red Flags & Storage -->
    <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
      <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 10px; padding: 12px;">
        <div style="font-weight: 800; font-size: 12px; color: #9f1239; margin-bottom: 4px;">⚠️ When to Contact Doctor (Emergency Red-Flags)</div>
        <div style="font-size: 11px; color: #881337; line-height: 1.4;">
          Report sudden chest discomfort, severe rash, breathing difficulty, persistent nausea, or unexpected high fever directly to emergency care or your prescribing physician.
        </div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
        <div style="font-weight: 800; font-size: 12px; color: #1e293b; margin-bottom: 4px;">📦 Safe Medicine Storage</div>
        <div style="font-size: 11px; color: #475569; line-height: 1.4;">
          Store medications in a cool, dry place away from heat, moisture, and direct sunlight. Keep all liquids tightly sealed and safely out of reach of children.
        </div>
      </div>
    </div>

    <!-- Signatures and Stamp Block -->
    <div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #cbd5e1;">
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px; height: 70px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-size: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Prescribing Doctor Signature</span>
          <div style="border-bottom: 1px solid #cbd5e1; width: 100%;"></div>
        </div>
        <div style="border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px; height: 70px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-size: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Dispensing Pharmacist Stamp</span>
          <div style="border-bottom: 1px solid #cbd5e1; width: 100%;"></div>
        </div>
        <div style="border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px; height: 70px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-size: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Date of Dispensation</span>
          <span style="font-size: 11px; color: #334155; text-align: right; font-weight: 600;">${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <!-- Footer Notice -->
      <div style="font-size: 10px; color: #64748b; line-height: 1.5; display: flex; gap: 8px; align-items: flex-start;">
        <span>ℹ️</span>
        <div>
          <strong>Important Safety Disclaimer:</strong> This medication schedule is generated by Theprescription AI for patient education and adherence support based on recognized clinical pharmacopeias. It is designed to complement, not replace, the professional judgment of your prescribing doctor or dispensing pharmacist. Never alter dosages or discontinue prescribed treatment without clinical consultation.
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates a clean text file summary containing all clinical sections
 */
export function generateMedicationCardText(prescription: PrescriptionAnalysisResult): string {
  const clinic = prescription.doctorSpecialtyOrClinic || 'Prescribed Regimen';
  const date = new Date().toLocaleDateString();

  let text = `==========================================================\n`;
  text += `THEPRESCRIPTION • OFFICIAL PATIENT MEDICATION SCHEDULE\n`;
  text += `==========================================================\n`;
  text += `Clinic / Specialty: ${clinic}\n`;
  if (prescription.prescriptionDate) {
    text += `Prescription Date: ${prescription.prescriptionDate}\n`;
  }
  text += `Date Generated: ${date}\n`;

  if (prescription.suspectedCondition) {
    text += `Treatment Goal / Indication: ${prescription.suspectedCondition}\n`;
  }
  if (prescription.generalExplanation) {
    text += `Clinical Overview: ${prescription.generalExplanation}\n`;
  }

  text += `\n----------------------------------------------------------\n`;
  text += `1. PRESCRIBED MEDICINES (${prescription.medicines.length})\n`;
  text += `----------------------------------------------------------\n\n`;

  prescription.medicines.forEach((med, i) => {
    text += `${i + 1}. ${med.name.toUpperCase()}\n`;
    text += `   - Generic Active Salt: ${med.genericName}\n`;
    if (med.strength) text += `   - Strength: ${med.strength} (${med.form})\n`;
    text += `   - Dosage & Frequency: ${med.dosage} (${med.frequency})\n`;
    if (med.timingCode) text += `   - Medical Code: ${med.timingCode}\n`;
    text += `   - Meal Timing: ${med.mealRelationText} [${med.mealRelation}]\n`;
    if (med.howToTake) text += `   - Administration: ${med.howToTake}\n`;
    text += `   - Duration: ${med.duration || 'As directed'}\n`;
    text += `   - Purpose: ${med.purposeAndUsage}\n`;
    if (med.precautions && med.precautions.length > 0) {
      text += `   - Precaution: ${med.precautions[0]}\n`;
    }
    text += `\n`;
  });

  text += `----------------------------------------------------------\n`;
  text += `2. DAILY DOSAGE ROUTINE & TIMETABLE\n`;
  text += `----------------------------------------------------------\n\n`;

  text += `[ ] MORNING (7:00 AM - 9:00 AM):\n`;
  if (prescription.scheduleSummary.morning.length > 0) {
    prescription.scheduleSummary.morning.forEach((it) => (text += `    • ${it}\n`));
  } else {
    text += `    • (No morning doses)\n`;
  }

  text += `\n[ ] AFTERNOON (12:00 PM - 2:00 PM):\n`;
  if (prescription.scheduleSummary.afternoon.length > 0) {
    prescription.scheduleSummary.afternoon.forEach((it) => (text += `    • ${it}\n`));
  } else {
    text += `    • (No afternoon doses)\n`;
  }

  text += `\n[ ] EVENING / DINNER (6:00 PM - 8:00 PM):\n`;
  if (prescription.scheduleSummary.evening.length > 0) {
    prescription.scheduleSummary.evening.forEach((it) => (text += `    • ${it}\n`));
  } else {
    text += `    • (No evening doses)\n`;
  }

  text += `\n[ ] BEDTIME (9:30 PM - 11:00 PM):\n`;
  if (prescription.scheduleSummary.bedtime.length > 0) {
    prescription.scheduleSummary.bedtime.forEach((it) => (text += `    • ${it}\n`));
  } else {
    text += `    • (No bedtime doses)\n`;
  }

  if (prescription.scheduleSummary.asNeeded.length > 0) {
    text += `\n[ ] AS NEEDED (SOS / PRN):\n`;
    prescription.scheduleSummary.asNeeded.forEach((it) => (text += `    • ${it}\n`));
  }

  if (prescription.potentialInteractionsOrSpacingAdvice.length > 0) {
    text += `\n----------------------------------------------------------\n`;
    text += `3. SAFETY & DRUG SPACING INSTRUCTIONS\n`;
    text += `----------------------------------------------------------\n\n`;
    prescription.potentialInteractionsOrSpacingAdvice.forEach((advice) => {
      text += `• ${advice}\n`;
    });
  }

  if (prescription.labTests && prescription.labTests.length > 0) {
    text += `\n----------------------------------------------------------\n`;
    text += `4. ORDERED DIAGNOSTIC & LAB TESTS (${prescription.labTests.length})\n`;
    text += `----------------------------------------------------------\n\n`;
    prescription.labTests.forEach((test, i) => {
      text += `${i + 1}. ${test.testName} [${test.category}]\n`;
      text += `   - Reason: ${test.whyDoctorOrdered}\n`;
      if (test.preparationInstructions) {
        text += `   - Preparation: ${test.preparationInstructions}\n`;
      }
      if (test.fastingRequired) {
        text += `   - Note: Fasting required\n`;
      }
      text += `\n`;
    });
  }

  if (prescription.foodAndDietaryRules) {
    text += `----------------------------------------------------------\n`;
    text += `5. NUTRITIONAL & DIETARY GUIDELINES\n`;
    text += `----------------------------------------------------------\n\n`;
    text += `Foods to Eat:\n`;
    prescription.foodAndDietaryRules.foodsToEat.forEach((f) => (text += `  ✓ ${f}\n`));
    text += `\nFoods to Avoid:\n`;
    prescription.foodAndDietaryRules.foodsToAvoidOrLimit.forEach((f) => (text += `  ✕ ${f}\n`));
    text += `\nHydration Advice:\n  ${prescription.foodAndDietaryRules.hydrationAdvice}\n\n`;
  }

  if (prescription.lifestyleAdvice && prescription.lifestyleAdvice.length > 0) {
    text += `----------------------------------------------------------\n`;
    text += `6. LIFESTYLE & RECOVERY GUIDANCE\n`;
    text += `----------------------------------------------------------\n\n`;
    prescription.lifestyleAdvice.forEach((adv) => (text += `• ${adv}\n`));
    text += `\n`;
  }

  text += `----------------------------------------------------------\n`;
  text += `7. EMERGENCY RED FLAGS & STORAGE\n`;
  text += `----------------------------------------------------------\n\n`;
  text += `• Red Flags: Report sudden chest discomfort, severe rash, breathing difficulty, or high fever immediately to emergency services.\n`;
  text += `• Storage: Keep in a cool, dry place away from heat and direct sunlight. Keep out of reach of children.\n\n`;

  text += `==========================================================\n`;
  text += `IMPORTANT MEDICAL NOTICE:\n`;
  text += `Always consult your prescribing doctor or dispensing pharmacist before altering doses.\n`;
  text += `==========================================================\n`;

  return text;
}

/**
 * Generates an authentic, professionally designed multi-page PDF document (.pdf)
 * of the medication card and triggers immediate browser download.
 */
export function generateAndDownloadMedicationCardPdf(prescription: PrescriptionAnalysisResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Header Banner
  doc.setFillColor(6, 78, 59); // deep emerald
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'F');

  // Rx symbol & Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Rx  Theprescription', margin + 6, currentY + 9);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL PATIENT MEDICATION SCHEDULE & CLINICAL REFERENCE GUIDE', margin + 6, currentY + 16);

  // Metadata top-right
  const issueDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.setFontSize(8);
  doc.text(`Issued: ${issueDate}`, pageWidth - margin - 6, currentY + 9, { align: 'right' });
  if (prescription.prescriptionDate && prescription.prescriptionDate !== 'Not specified') {
    doc.text(`Prescription Date: ${prescription.prescriptionDate}`, pageWidth - margin - 6, currentY + 16, { align: 'right' });
  }

  currentY += 28;

  // Clinic / Regimen & Diagnosis Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 18, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const clinicText = prescription.doctorSpecialtyOrClinic || 'Prescribed Regimen';
  doc.text(`Medical Provider / Clinic: ${clinicText}`, margin + 4, currentY + 6);

  if (prescription.suspectedCondition) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(4, 120, 87);
    doc.text(`Suspected Medical Indication: `, margin + 4, currentY + 12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const condLines = doc.splitTextToSize(prescription.suspectedCondition, contentWidth - 60);
    doc.text(condLines[0] || '', margin + 55, currentY + 12);
  }

  currentY += 22;

  // Section 1: Deciphered Medicines Table
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. DECIPHERED MEDICINES & DOSAGE INSTRUCTIONS', margin, currentY);
  currentY += 3;

  const medicineRows = prescription.medicines.map((med, index) => {
    const medNameBlock = `${med.name}\nGeneric: ${med.genericName || 'As specified'}${med.strength ? ' (' + med.strength + ', ' + med.form + ')' : ' (' + med.form + ')'}`;
    const doseBlock = `${med.dosage} | ${med.frequency}${med.timingCode ? '\n[' + med.timingCode + ']' : ''}`;
    const mealBlock = `${med.mealRelationText}${med.howToTake ? '\n' + med.howToTake : ''}`;
    const duration = med.duration || 'As directed';
    const purpose = `${med.purposeAndUsage}${med.precautions && med.precautions.length ? '\nNote: ' + med.precautions[0] : ''}`;

    return [
      (index + 1).toString(),
      medNameBlock,
      doseBlock,
      mealBlock,
      duration,
      purpose,
    ];
  });

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [['#', 'Medicine & Generic Salt', 'Dose & Frequency', 'Meal Instructions', 'Duration', 'Purpose & Precautions']],
    body: medicineRows,
    theme: 'grid',
    headStyles: {
      fillColor: [4, 120, 87],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
    },
    columnStyles: {
      0: { cellWidth: 7, halign: 'center' },
      1: { cellWidth: 42 },
      2: { cellWidth: 32 },
      3: { cellWidth: 38 },
      4: { cellWidth: 20 },
      5: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  // Get Y position after medicines table
  currentY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : currentY + 50;

  // Check if we need a page break or have enough space
  if (currentY > pageHeight - 65) {
    doc.addPage();
    currentY = margin;
  }

  // Section 2: Daily Dosage Routine Check-off Table
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. DAILY DOSAGE ROUTINE & PATIENT CHECK-OFF TRACKER', margin, currentY);
  currentY += 3;

  const scheduleSummary = prescription.scheduleSummary || {
    morning: [],
    afternoon: [],
    evening: [],
    bedtime: [],
    asNeeded: [],
  };

  const scheduleHeaders = ['Morning (7-9 AM)', 'Afternoon (12-2 PM)', 'Evening (6-8 PM)', 'Bedtime (9-11 PM)', 'As-Needed (SOS)'];
  const maxItems = Math.max(
    scheduleSummary.morning.length,
    scheduleSummary.afternoon.length,
    scheduleSummary.evening.length,
    scheduleSummary.bedtime.length,
    scheduleSummary.asNeeded.length,
    1
  );

  const scheduleRows: string[][] = [];
  for (let i = 0; i < maxItems; i++) {
    scheduleRows.push([
      scheduleSummary.morning[i] ? `[  ] ${scheduleSummary.morning[i]}` : (i === 0 ? 'None' : ''),
      scheduleSummary.afternoon[i] ? `[  ] ${scheduleSummary.afternoon[i]}` : (i === 0 ? 'None' : ''),
      scheduleSummary.evening[i] ? `[  ] ${scheduleSummary.evening[i]}` : (i === 0 ? 'None' : ''),
      scheduleSummary.bedtime[i] ? `[  ] ${scheduleSummary.bedtime[i]}` : (i === 0 ? 'None' : ''),
      scheduleSummary.asNeeded[i] ? `[  ] ${scheduleSummary.asNeeded[i]}` : (i === 0 ? 'None' : ''),
    ]);
  }

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [scheduleHeaders],
    body: scheduleRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2,
      lineColor: [226, 232, 240],
    },
  });

  currentY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : currentY + 30;

  // Section 3: Diagnostic Lab Tests (if present)
  if (prescription.labTests && prescription.labTests.length > 0) {
    if (currentY > pageHeight - 50) {
      doc.addPage();
      currentY = margin;
    }

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('3. PRESCRIBED DIAGNOSTIC & LABORATORY TESTS', margin, currentY);
    currentY += 3;

    const labRows = prescription.labTests.map((test, idx) => [
      (idx + 1).toString(),
      `${test.testName} (${test.category})`,
      test.whyDoctorOrdered,
      `${test.preparationInstructions || 'Standard procedure'}${test.fastingRequired ? ' [Fasting Required]' : ''}`,
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [['#', 'Test Name & Category', 'Clinical Purpose', 'Preparation & Fasting Instructions']],
      body: labRows,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 58, 138], // royal blue
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 2,
        lineColor: [226, 232, 240],
      },
      columnStyles: {
        0: { cellWidth: 7, halign: 'center' },
        1: { cellWidth: 55 },
        2: { cellWidth: 60 },
        3: { cellWidth: 'auto' },
      },
    });

    currentY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : currentY + 30;
  }

  // Check page height for Dietary, Lifestyle, Red Flags & Signature
  if (currentY > pageHeight - 75) {
    doc.addPage();
    currentY = margin;
  }

  // Section 4 & 5: Dietary & Lifestyle Guidelines
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('4. DIETARY, LIFESTYLE & EMERGENCY GUIDANCE', margin, currentY);
  currentY += 4;

  const dietFoods = prescription.foodAndDietaryRules?.foodsToEat?.slice(0, 3).join(', ') || 'Nutritious balanced meals';
  const avoidFoods = prescription.foodAndDietaryRules?.foodsToAvoidOrLimit?.slice(0, 3).join(', ') || 'Alcohol, excessive caffeine, greasy/spicy foods';
  const hydration = prescription.foodAndDietaryRules?.hydrationAdvice || 'Maintain 2 to 3 liters of water daily unless restricted';
  const lifestyle = (prescription.lifestyleAdvice && prescription.lifestyleAdvice.length > 0)
    ? prescription.lifestyleAdvice.slice(0, 2).join('; ')
    : 'Get adequate rest and complete all prescribed medication courses.';

  const guidanceData = [
    ['Recommended Foods', dietFoods],
    ['Foods to Limit/Avoid', avoidFoods],
    ['Hydration Advice', hydration],
    ['Lifestyle & Rest', lifestyle],
    ['Emergency Red Flags', 'Seek immediate emergency medical care if experiencing severe rash, chest pain, facial swelling, or breathing difficulty.'],
    ['Storage & Child Safety', 'Store below 25°C in a dry place away from direct sunlight. Keep strictly out of reach of children.'],
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [['Category', 'Guideline & Actionable Advice']],
    body: guidanceData,
    theme: 'grid',
    headStyles: {
      fillColor: [71, 85, 105], // slate
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2,
      lineColor: [226, 232, 240],
    },
    columnStyles: {
      0: { cellWidth: 45, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
    },
  });

  currentY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 8 : currentY + 40;

  if (currentY > pageHeight - 35) {
    doc.addPage();
    currentY = margin;
  }

  // Doctor & Pharmacist Verification Block
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Prescribing Physician / Clinic Verification:', margin + 4, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Signature / Stamp: ___________________________', margin + 4, currentY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Dispensing Pharmacist Verification:', margin + (contentWidth / 2) + 4, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Checked By / Batch Stamp: _____________________', margin + (contentWidth / 2) + 4, currentY + 14);

  // Disclaimer line
  currentY += 25;
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'IMPORTANT NOTICE: This medication card is an educational reference generated by Theprescription. Always consult your doctor or dispensing pharmacist before making any changes.',
    pageWidth / 2,
    currentY,
    { align: 'center' }
  );

  // Add Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${i} of ${totalPages}  •  Theprescription Medication Guide`, margin, pageHeight - 6);
    doc.text('https://theprescription.app', pageWidth - margin, pageHeight - 6, { align: 'right' });
  }

  const filename = `prescription-medication-schedule-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

/**
 * Triggers a browser download for a given text or html string
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

