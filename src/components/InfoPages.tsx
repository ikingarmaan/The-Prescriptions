import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  HelpCircle,
  Mail,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Stethoscope,
  Lock,
  Eye,
  HeartHandshake,
  Send,
  Building,
  Sparkles,
  Search,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Clock,
  Pill,
  PhoneCall,
  Server,
  Terminal,
  Globe,
  Award,
  HeartPulse,
} from 'lucide-react';
import { ThePrescriptionLogo } from './ThePrescriptionLogo';
import { FaqSection } from './FaqSection';

export type InfoPageType = 'about' | 'faq' | 'contact' | 'disclaimer' | 'privacy' | 'terms';

interface InfoPagesProps {
  currentPage: InfoPageType;
  onNavigate: (page: InfoPageType | 'prescription') => void;
}

export const InfoPages: React.FC<InfoPagesProps> = ({ currentPage, onNavigate }) => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Prescription Feedback',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSubmittingContact(true);
    setContactError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || 'Failed to deliver message.');
      }
      setContactSubmitted(true);
    } catch (err: any) {
      console.error('Contact form error:', err);
      setContactError(err.message || 'Unable to deliver message at this moment. You can also write directly to Theprescriptionn@gmail.com.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="w-full mx-auto py-2 sm:py-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Page Navigation Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={() => onNavigate('prescription')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors w-fit p-1 -ml-1 rounded-lg hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prescription Checker</span>
        </button>

        {/* Quick Page Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'about', label: 'About Us' },
            { id: 'disclaimer', label: 'Medical Disclaimer' },
            { id: 'faq', label: 'FAQ' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms & Conditions' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id as InfoPageType)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------- ABOUT US (1,700+ WORDS) -------------------- */}
      {currentPage === 'about' && (
        <div className="space-y-10 text-slate-800 leading-relaxed">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Healthcare Mission &amp; Health Literacy Philosophy</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Empowering Patients Through Clear Prescription Understanding and Medication Safety
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium">
                Every single day, hundreds of thousands of patients worldwide leave clinics, urgent care centers, and outpatient hospitals holding handwritten paper prescription notes they cannot read. Illegible penmanship, cryptic Latin dosage codes, and unfamiliar pharmaceutical brand names create a profound barrier between clinical advice and real-world adherence. <span className="font-bold text-white">Theprescription</span> was founded on a simple, uncompromising conviction: every human being has a fundamental right to understand the medicine they put into their body.
              </p>
            </div>
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          </div>

          {/* Section 1: The Global Crisis of Prescription Illegibility */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
                1
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">The Problem We Address</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  The True Cost of Illegible Clinical Handwriting in Modern Healthcare
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Medical errors represent one of the most pressing public health challenges of our time. According to comprehensive reports by the Institute of Medicine and the World Health Organization, more than 1.5 million preventable adverse drug events occur every year in outpatient care alone. A startling proportion of these adverse outcomes originate not in laboratory synthesis or clinical diagnosis, but in simple communication failure: ambiguous handwriting, misunderstood Latin frequency codes, and confused look-alike drug nomenclature.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When a physician jots down a hurried order, an uppercase letter can blur into continuous cursive ligatures. The antidepressant <em>Celexa</em> can easily look identical to the arthritis anti-inflammatory <em>Celebrex</em>. The cardiovascular antihypertensive <em>Hydralazine</em> can be mistaken for the sedating antihistamine <em>Hydroxyzine</em>. For a patient managing multiple chronic conditions — such as hypertension, type 2 diabetes, and high cholesterol — deciphering three or four handwritten rows on a single slip can cause immense cognitive anxiety.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              While computerized electronic prescribing has expanded across modern medical centers, billions of individuals worldwide still receive handwritten paper slips. In community outpatient clinics, rural dispensaries, and international healthcare facilities, physical paper prescriptions remain the default medium of care. Theprescription was built to serve as an intelligent, compassionate bridge between traditional paper medicine and digital health literacy.
            </p>
          </section>

          {/* Section 2: Clinical Workload and Handwriting Dynamics */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
                2
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Clinical Empathy</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Understanding Clinical Pressures: Why Doctors Write the Way They Do
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It is easy to criticize doctor handwriting as careless, but this stereotype overlooks the intense operational realities of clinical practice. Outpatient physicians frequently examine thirty to fifty patients during an intense eight-hour clinical shift. Within each eight-to-twelve-minute consultation, the practitioner must listen attentively to patient concerns, perform physical examinations, review laboratory and imaging panels, rule out life-threatening pathologies, determine an evidence-based therapeutic strategy, and manually document the entire clinical encounter.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Under this unrelenting cognitive load and physical speed, the human hand naturally adapts by connecting pen strokes. Cursive ligatures form as the pen remains pressed to the paper, turning complex pharmaceutical terms into continuous fluid waves. Furthermore, physicians inherit centuries of Latin shorthand conventions — terms like <em>OD</em> (omni die / once daily), <em>BD</em> (bis in die / twice daily), <em>AC</em> (ante cibum / before meals), and <em>PC</em> (post cibum / after meals). While these abbreviations save precious seconds for clinicians, they leave patients, elderly family members, and non-clinical caregivers confused and disempowered.
            </p>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Our Guiding Philosophy: Support, Never Replace</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Theprescription does not seek to replace doctors or pharmacists. Our goal is to empower patients with knowledge, so they can enter pharmacies and clinics as informed, confident advocates for their own health.
              </p>
            </div>
          </section>

          {/* Section 3: Technical Foundation */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
                3
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Engineering Innovation</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Our Technical Architecture: Neural Vision, Contrast Preprocessing, and Pharmacological NLP
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Building a machine learning system capable of reading rapid medical penmanship requires far more than generic Optical Character Recognition (OCR). Traditional OCR engines look for rigid typography with uniform letter spacing. When exposed to paper prescriptions featuring crumpled folds, faint ballpoint ink, colored doctor stamps, and cursive handwriting, traditional OCR fails completely.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription deploys a specialized multi-tier pipeline:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-blue-800 text-xs uppercase bg-blue-100 px-2 py-0.5 rounded-md">
                  Stage 1: Image Enhancement
                </span>
                <h4 className="font-bold text-slate-900">Adaptive Bilateral Filtering</h4>
                <p className="text-slate-600 leading-relaxed">
                  Before analysis, uploaded prescription photographs undergo adaptive binarization, perspective de-skewing, and background noise suppression. This separates ink strokes from paper textures, watermark logos, and shadows.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-blue-800 text-xs uppercase bg-blue-100 px-2 py-0.5 rounded-md">
                  Stage 2: Multimodal Neural Vision
                </span>
                <h4 className="font-bold text-slate-900">Contextual Ligature Parsing</h4>
                <p className="text-slate-600 leading-relaxed">
                  High-capacity multimodal neural encoders analyze cursive strokes within clinical sentence context. The system checks whether a written drug name aligns with standard dosage strengths and administration routes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-blue-800 text-xs uppercase bg-blue-100 px-2 py-0.5 rounded-md">
                  Stage 3: Pharmacological NLP
                </span>
                <h4 className="font-bold text-slate-900">Generic Salt Mapping</h4>
                <p className="text-slate-600 leading-relaxed">
                  Extracted text candidates are cross-referenced against a master catalog of 5,000+ active generic salts and trade brands, converting obscure brand names into their active chemical ingredients.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Privacy Architecture */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
                4
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">Patient Dignity</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Our Ephemeral Zero-Retention Privacy Promise: Protecting Patient Confidentiality
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In a digital landscape dominated by data harvesting and commercial profiling, health information demands the highest ethical protections. Medical prescriptions contain deeply personal diagnostics, revealing sensitive conditions ranging from chronic cardiovascular ailments to psychiatric therapies.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription was built from the ground up on an <strong>ephemeral, zero-data-retention architecture</strong>. When you upload a prescription image, it is processed strictly in volatile random-access memory (RAM). The image is held only for the seconds required to extract text, cross-reference generic salts, and return structured results to your browser. Immediately following transmission, the memory buffer is wiped and discarded. We do not maintain a permanent database of user medical photos, we do not store health histories, and we never sell user queries to pharmaceutical corporations or advertising networks.
            </p>
          </section>

          {/* Section 5: Human-in-the-loop and Safety */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black shrink-0">
                5
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">Safety First</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Human-in-the-Loop Safeguards: Why We Refuse to Guess
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In consumer artificial intelligence, chatbots are famous for providing confident answers even when they are unsure. In medicine, guessing is dangerous. That is why Theprescription incorporates strict safety thresholds. If handwriting is obscured by coffee stains, pen tears, or extreme cursive distortion, our system explicitly refuses to fabricate a guess.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Instead, the platform flags the line as unverified, prompts the patient with interactive confirmation choices, and advises consultation with a licensed dispensing pharmacist. By keeping the human patient and their clinical care team firmly at the center of the decision-making process, we provide decision support that respects clinical boundaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 pt-2">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-1">Zero Commercial Bias</strong>
                  We do not accept pharmaceutical advertising money, sponsored drug placement, or commercial brand incentives. All recommendations reflect objective pharmacological science.
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-1">Printable Medication Cards</strong>
                  Beyond raw transcription, we automatically organize medicines into 24-hour chronological timelines with printable pocket cards for family caregivers and patients.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Economic Empowerment & Generic Education */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
                6
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Financial Health Literacy</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  The Economic Burden of Brand Monopolies: How Generic Literacy Protects Family Budgets
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Beyond the immediate danger of transcription errors, healthcare systems worldwide impose severe financial friction on everyday citizens. Pharmaceutical marketing often promotes expensive proprietary trade brands that cost between three and twenty times more than their bioequivalent generic counterparts.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When a patient does not realize that <em>Augmentin</em> is simply <em>Amoxicillin plus Clavulanate</em>, or that <em>Glucophage</em> is identical to generic <em>Metformin</em>, they may walk away from the pharmacy counter without their life-saving treatment due to prohibitive out-of-pocket costs. By shining a spotlight on active generic chemical molecules, Theprescription equips patients to engage in productive conversations with dispensing pharmacists about affordable, government-audited generic bioequivalents. Understanding the active salt name protects both your physical wellness and your household financial resilience.
            </p>
          </section>

          {/* Section 7: Geriatric Care and Polypharmacy */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black shrink-0">
                7
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">Vulnerable Populations</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Supporting Seniors and Caregivers in Navigating Complex Polypharmacy
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              As lifespans extend globally, millions of elderly citizens live with multiple concurrent health challenges, a clinical phenomenon termed <strong>polypharmacy</strong>. It is remarkably common for an elderly individual over sixty-five years of age to take between five and twelve distinct pills every single day.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When multiple specialists — cardiologists, endocrinologists, rheumatologists, and general practitioners — write separate handwritten notes, the risk of conflicting schedules, unintended therapeutic duplication, and fatal drug-drug interactions multiplies exponentially. Adult children and professional home health aides often find themselves sorting through paper bags filled with bottles with zero clear sense of how to structure morning, midday, and bedtime routines.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription was built with these caregivers in mind. By converting fragmented prescriptions into unified chronological schedules, complete with food timing directives (AC and PC) and printable pocket cards, we relieve the burden of medication management for family caregivers caring for aging parents and vulnerable loved ones.
            </p>
          </section>

          {/* Section 8: Cross-Border Healthcare and Global Travel */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shrink-0">
                8
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700">Global Health Mobility</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Cross-Border Healthcare: Navigating Prescriptions While Traveling or Relocating
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In an increasingly interconnected world, international travel, business relocation, and immigration frequently separate individuals from their home healthcare systems. When a patient runs out of a vital medication in a foreign country, asking a local pharmacist for their standard home brand name often leads to blank stares. Pharmaceutical brand names are localized: the exact same drug molecule sold as <em>Tylenol</em> in North America is branded as <em>Panadol</em> in the United Kingdom, Australia, and the Middle East, and as <em>Calpol</em> or <em>Dolo</em> in South Asia.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              However, the chemical salt — <strong>Paracetamol</strong> (or Acetaminophen) — is universal across every continent. Theprescription functions as an international translation passport for medications. By inputting your local brand name, our platform exposes the underlying generic molecule and standard metric strength. This allows travelers, expatriates, and cross-border patients to request the precise active molecule from licensed pharmacists anywhere on earth, preventing dangerous gaps in chronic therapeutic care.
            </p>
          </section>

          {/* Section 9: The Seven Ethical Pillars of Theprescription */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
                9
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">Ethical Standards</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  The Seven Ethical Pillars of Our Platform Architecture
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">1. Patient Primacy</strong>
                Every feature, design choice, and algorithmic heuristic is measured against a single metric: Does this protect patient safety and promote understanding?
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">2. Ephemeral Data Dignity</strong>
                We refuse to monetize, archive, or broker medical documents. What happens in volatile memory stays in volatile memory.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">3. Clinical Modesty</strong>
                We acknowledge the boundaries of artificial intelligence. We assist and educate; we do not practice medicine or issue orders.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">4. Pharmacological Integrity</strong>
                Our drug database is built on peer-reviewed, open pharmacopeial evidence, uninfluenced by corporate pharmaceutical marketing.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">5. Radical Accessibility</strong>
                We ensure high contrast, responsive mobile layouts, clear typography, and open access for users across every socioeconomic background.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">6. Continuous Algorithmic Auditing</strong>
                We benchmark our computer vision models against real-world handwriting sets to prevent bias and catch edge-case ligatures.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 col-span-1 md:col-span-2">
                <strong className="text-slate-900 block font-bold mb-1">7. Unwavering Pharmacist Partnership</strong>
                We constantly encourage patients to form close, communicative relationships with their licensed community dispensing pharmacists.
              </div>
            </div>
          </section>

          {/* Section 10: Founder Note */}
          <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">Personal Commitment</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  A Personal Note from Creator Mohd Armaan
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <em>Theprescription</em> was designed and created by <strong>Mohd Armaan</strong> as an independent, open-access public health empowerment platform. Observing elderly relatives struggle to interpret rushed doctor penmanship, mistakenly purchase expensive commercial brand duplicates, and experience daily anxiety when taking their medications inspired the creation of this service.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Healthcare technology should not be confined to elite institutions. It belongs in the hands of ordinary patients, mothers, fathers, and caregivers managing illnesses in their homes. We remain dedicated to expanding our generic pharmaceutical database, refining our handwriting recognition neural networks, and supporting patients across the globe in understanding their medical treatments.
            </p>

            <div className="pt-2">
              <a
                href="https://mohdarmaan.up.railway.app/#home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Learn more about Mohd Armaan&apos;s software engineering work</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>
      )}

      {/* -------------------- MEDICAL DISCLAIMER (1,700+ WORDS) -------------------- */}
      {currentPage === 'disclaimer' && (
        <div className="space-y-8 text-slate-800 leading-relaxed">
          {/* Hero Warning Banner */}
          <div className="bg-rose-50 border-2 border-rose-300 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                  Critical Medical, Legal &amp; Regulatory Notice
                </span>
                <h1 className="text-xl sm:text-3xl font-black text-rose-950">
                  Medical Application Disclaimer &amp; Comprehensive Clinical Safety Policy
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
              <strong>Theprescription</strong> is an artificial intelligence decision-support and educational health-literacy transcription platform. It is <strong>NOT</strong> a certified medical device, does not practice clinical medicine, does not prescribe pharmaceuticals, and is <strong>NOT</strong> a substitute for professional medical diagnosis, clinical treatment validation, or personalized advice from a licensed healthcare provider.
            </p>
          </div>

          {/* Section 1: Emergency Protocols */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              1. Emergency Medical Protocol: Immediate Life-Threatening Crises
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you, a patient, or an individual under your care is experiencing an acute medical emergency, <strong>do not use this website, do not upload prescription photos, and do not wait for algorithmic transcription</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Acute medical emergencies require immediate, in-person emergency clinical resuscitation. Symptoms demanding immediate emergency intervention include, but are not limited to: sudden crushing chest pain radiating to the jaw, neck, or left arm; acute shortness of breath or inability to breathe; signs of acute anaphylaxis (sudden swelling of the tongue, lips, throat, or facial tissues, severe hives, sudden throat constriction); acute signs of neurological stroke (facial drooping, unilateral arm weakness, slurred speech); sudden loss of consciousness or severe unexplained syncope; acute severe poisoning or accidental drug overdose; or uncontrolled catastrophic hemorrhaging.
            </p>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-semibold">
              Immediately telephone your regional emergency telephone service (e.g. 911 in the United States and Canada, 112 in the European Union and India, 999 in the United Kingdom) or proceed without delay to the nearest hospital acute emergency department.
            </div>
          </section>

          {/* Section 2: Non-Medical Device */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              2. Classification of Service: Non-Medical Device &amp; Educational Nature
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription has not been evaluated, certified, or cleared as a Software as a Medical Device (SaMD) by the United States Food and Drug Administration (US FDA), the European Medicines Agency (EMA), the Medicines and Healthcare products Regulatory Agency (MHRA), the Central Drugs Standard Control Organisation (CDSCO), or any equivalent statutory regulatory body.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              All outputs generated by this platform — including optical character recognition of cursive penmanship, cross-referenced active generic salt names, Latin frequency translations (e.g. 1-0-1, BD, TDS), prandial timing directives (AC, PC), and printable medication summary cards — are provided strictly for health-literacy enhancement, educational clarification, and personal organizational convenience. Under no circumstances should algorithmic transcriptions be interpreted as authorized prescription orders, dispensing instructions, or clinical treatment mandates.
            </p>
          </section>

          {/* Section 3: No Doctor-Patient Relationship */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              3. Absence of Physician-Patient or Pharmacist-Patient Relationship
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Your use of Theprescription, access to its software tools, uploading of paper prescription imagery, or review of drug information articles does not establish a physician-patient relationship, pharmacist-patient relationship, nurse-patient relationship, or fiduciary clinical consultative relationship of any kind between you and Theprescription, its creator Mohd Armaan, or its medical advisory contributors.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Clinical decision-making requires personalized history taking, physical diagnostic examination, auscultation, laboratory serology review, and comprehensive evaluation of past medical history. Algorithmic software cannot replicate or replace the licensed clinical judgment of a certified medical practitioner. You must never initiate a new pharmacological therapy, modify existing dosages, substitute brand products, or discontinue a prescribed medication based on information displayed on this website without direct, explicit authorization from your personal physician.
            </p>
          </section>

          {/* Section 4: Machine Learning Fallibility */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              4. The Technical Reality of Computer Vision &amp; Handwriting Recognition
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              While our neural network pipeline leverages state-of-the-art vision models and specialized contrast enhancement algorithms, computer vision is inherently probabilistic. Physical prescription papers present unpredictable real-world challenges: ink bleeding, smudged pens, carbon-copy fading, wrinkled or torn paper, skewed photographic angles, shadows, low-resolution phone cameras, and doctor-specific idiosyncratic abbreviations.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Consequently, no automated system can guarantee 100% transcription accuracy across every handwritten paper document. The software may occasionally misinterpret a cursive stroke, confuse visually similar letters, or misread a numerical digit (such as mistaking a handwritten &quot;10&quot; for &quot;70&quot; or &quot;40&quot;). Relying blindly on an unverified automated transcription without comparing it against physical pharmacy labels poses significant clinical risk. You agree that you assume complete responsibility for independently verifying all transcribed data.
            </p>
          </section>

          {/* Section 5: Mandatory Pharmacist Verification */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              5. The Imperative Mandate for Professional Pharmacist Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The licensed dispensing pharmacist is the legally recognized, clinically trained guardian of the medication dispensing pipeline. When you present a paper prescription at a community pharmacy or hospital dispensary, the pharmacist performs critical clinical checks: verifying dosage appropriateness, screening for drug-drug interactions, checking patient allergy registries, confirming renal dosing adjustments, and physically labeling the medication container.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You must always treat the physical label attached to the medication carton by your licensed dispensing pharmacy as the primary, authoritative instruction. If any discrepancy appears between Theprescription&apos;s digital transcription and the physical pharmacy label, you must adhere strictly to the pharmacy label and immediately contact your dispensing pharmacist or prescribing doctor for clarification.
            </p>
          </section>

          {/* Section 6: Individual Biological Variables */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              6. Patient Idiosyncrasies, Contraindications, and Special Populations
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              General pharmacological descriptions provided in our database cannot account for individual biological variability. Factors that dramatically alter drug pharmacokinetics and clinical toxicity include:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>
                <strong>Renal Function (Kidney Clearance):</strong> Decreased glomerular filtration rate (e.g. in Chronic Kidney Disease) causes drug accumulation, necessitating substantial dose reductions for compounds like Metformin, Gabapentin, and Aminoglycosides.
              </li>
              <li>
                <strong>Hepatic Function (Liver Metabolism):</strong> Impaired cytochrome P450 enzyme synthesis alters drug bioactivation and clearance, requiring severe caution with Paracetamol, Statins, and Antifungals.
              </li>
              <li>
                <strong>Pregnancy and Lactation:</strong> Many common medications cross the placental barrier or enter breast milk, carrying severe teratogenic risks (e.g. ACE inhibitors, Statins, Retinoids).
              </li>
              <li>
                <strong>Pediatric and Geriatric Extremes:</strong> Neonates, infants, and elderly individuals display radically different drug distribution volumes, blood-brain barrier permeability, and receptor sensitivity compared to healthy young adults.
              </li>
              <li>
                <strong>Genetic Polymorphisms:</strong> Variations in genes encoding CYP2D6, CYP2C19, or HLA-B alleles determine whether a patient is a poor metabolizer, rapid metabolizer, or susceptible to life-threatening hypersensitivity (e.g. Stevens-Johnson Syndrome).
              </li>
            </ul>
          </section>

          {/* Section 7: Look-Alike Sound-Alike Hazards */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              7. Look-Alike, Sound-Alike (LASA) Pitfalls in Cursive Transcription
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Hundreds of pharmaceutical brand and generic names share close orthographic or phonetic characteristics. In rapid cursive handwriting, distinct characters like &quot;a&quot;, &quot;o&quot;, &quot;u&quot;, and &quot;e&quot; frequently collapse into identical loops. The difference between <em>Prandin</em> (repaglinide, for blood sugar control) and <em>Avandia</em> (rosiglitazone) or <em>Coumadin</em> (warfarin anticoagulation) can result in severe hypoglycemic or hemorrhagic emergencies.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription includes automated look-alike warnings, but algorithms cannot eliminate the possibility of a subtle typographical confusion. Patients must double-check the clinical indication: does this prescribed medicine match the exact medical reason you consulted your doctor? If a medicine known for epilepsy is transcribed when you sought care for an ear infection, do not ingest the medication; contact your clinic immediately.
            </p>
          </section>

          {/* Section 8: Off-Label Prescribing & Regional Differences */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              8. Off-Label Clinical Prescribing &amp; International Brand Divergence
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Physicians legally and frequently prescribe medications for &quot;off-label&quot; indications — clinical purposes that are scientifically validated in clinical trials but have not completed formal regulatory labeling approval for that specific disease. For example, low-dose Amitriptyline is frequently prescribed for neuropathic migraine prevention rather than major depression.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The informational summaries on this website describe the primary, approved therapeutic indications for active generic molecules. The fact that a clinical usage is not listed on our website does not imply that your doctor made an error. Conversely, never use off-label information as self-treatment advice. Always ask your prescribing physician: <em>&quot;What specific condition is this intended to treat for me?&quot;</em>
            </p>
          </section>

          {/* Section 9: Polypharmacy and Over-the-counter Compounding */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              9. Polypharmacy, Herbal Supplements, and Unreported Over-the-Counter Drugs
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A single prescription slip uploaded to Theprescription represents only a snapshot of your therapeutic regimen. The system cannot observe or know about over-the-counter vitamins, herbal remedies (such as Ginkgo Biloba or St. John&apos;s Wort), or prescriptions written by other doctors that are not present on the uploaded document.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Herbal supplements and common over-the-counter analgesics carry potent biochemical actions. St. John&apos;s Wort potently induces CYP3A4 enzymes, reducing circulating concentrations of oral contraceptives and cardiac medications below therapeutic levels. Taking over-the-counter Aspirin alongside a newly prescribed prescription NSAID dramatically accelerates the probability of catastrophic stomach ulcer perforation. Only your comprehensive healthcare provider and pharmacist can evaluate your total, combined medication profile.
            </p>
          </section>

          {/* Section 10: Narrow Therapeutic Index (NTI) Drugs */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              10. Narrow Therapeutic Index (NTI) Medications: Special Precautionary Class
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Certain pharmaceutical compounds possess a <strong>Narrow Therapeutic Index (NTI)</strong>, meaning that the margin between an effective therapeutic blood concentration and life-threatening clinical toxicity is exceptionally narrow. Examples include:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
              <li><strong>Warfarin:</strong> A slight change in bioavailability can cause major intracranial hemorrhage or fatal thromboembolism.</li>
              <li><strong>Lithium:</strong> Mild dehydration or small dose fluctuations can precipitate acute lithium neurotoxicity and permanent renal impairment.</li>
              <li><strong>Digoxin:</strong> Slight increases in cardiac glycoside levels cause fatal ventricular arrhythmias and heart block.</li>
              <li><strong>Levothyroxine:</strong> Minor microgram dosing shifts disrupt bone density, cardiac rhythm, and metabolic stability.</li>
              <li><strong>Theophylline &amp; Aminophylline:</strong> Serum elevations trigger severe intractable seizures and cardiac arrest.</li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For all Narrow Therapeutic Index drugs, therapeutic drug monitoring (TDM) through regular venous blood draws is clinically mandatory. Never switch between generic and brand formulations or alter dosages of NTI medications without direct oversight from your physician and regular serum lab testing.
            </p>
          </section>

          {/* Section 11: Food-Drug Spacing Disclaimers */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              11. Food-Drug Spacing &amp; Gastric Absorption Nuances
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Our automated schedules suggest standard food relationships based on general pharmacology (for example, taking NSAIDs after meals or PPIs before breakfast). However, specific patient gastrointestinal conditions — such as gastroparesis, bariatric gastric bypass, Crohn&apos;s disease, or celiac sprue — significantly alter transit times and mucosal absorption kinetics.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If your gastroenterologist or attending physician has given you specific, customized dietary timing rules that differ from our general recommendations, always prioritize your doctor&apos;s specific instructions.
            </p>
          </section>

          
          {/* Section 13: Suspected Misread Resolution */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              13. Procedural Safety Protocol: What to Do If You Suspect an Ambiguous or Misread Drug
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If at any point the transcription displayed on your screen appears unfamiliar, conflicts with what your doctor verbally communicated during your consultation, or suggests a medication you have never heard of, follow this strict four-step safety protocol:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 1: Do Not Consume the Medication</strong>
                Do not ingest any tablet, liquid, or topical preparation based on an uncertain digital transcription. Set the medicine container aside in a safe location.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 2: Compare Against the Physical Pharmacy Label</strong>
                Inspect the printed label affixed by your dispensing pharmacist to the medication package. Look for the active generic chemical name and dosage strength.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 3: Call Your Dispensing Pharmacy Directly</strong>
                Telephone the pharmacy phone number printed on your medicine carton. Ask the on-duty pharmacist to verify the physician order directly in their computer dispensary records.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 4: Contact Your Prescribing Doctor Clinic</strong>
                If the pharmacy cannot resolve the ambiguity, contact the prescribing physician clinic to request an authorized legible clarification.
              </div>
            </div>
          </section>


          {/* Section 13: Suspected Misread Resolution */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              13. Procedural Safety Protocol: What to Do If You Suspect an Ambiguous or Misread Drug
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If at any point the transcription displayed on your screen appears unfamiliar, conflicts with what your doctor verbally communicated during your consultation, or suggests a medication you have never heard of, follow this strict four-step safety protocol:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 1: Do Not Consume the Medication</strong>
                Do not ingest any tablet, liquid, or topical preparation based on an uncertain digital transcription. Set the medicine container aside in a safe location.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 2: Compare Against the Physical Pharmacy Label</strong>
                Inspect the printed label affixed by your dispensing pharmacist to the medication package. Look for the active generic chemical name and dosage strength.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 3: Call Your Dispensing Pharmacy Directly</strong>
                Telephone the pharmacy phone number printed on your medicine carton. Ask the on-duty pharmacist to verify the physician order directly in their computer dispensary records.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Step 4: Contact Your Prescribing Doctor Clinic</strong>
                If the pharmacy cannot resolve the ambiguity, contact the prescribing physician clinic to request an authorized legible clarification.
              </div>
            </div>
          </section>

          {/* Section 12: User Assumption of Risk */}
          <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              12. User Assumption of Risk &amp; Sole Legal Responsibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              By accessing, browsing, or utilizing Theprescription website and software services, you explicitly acknowledge and agree that you use the service entirely at your own voluntary discretion and risk. To the maximum extent permitted by applicable law, Theprescription, its creator Mohd Armaan, contributors, and software maintainers disclaim any and all liability for personal injury, adverse drug reactions, hospitalization, clinical complications, or financial losses arising from your use of or reliance on algorithmic transcriptions or informational content.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
              Your health and safety are paramount. Always verify every prescription with your physician and pharmacist before taking any medication.
            </div>
          </section>
        </div>
      )}

      {/* -------------------- FAQ (HANDLED BY FAQ COMPONENT) -------------------- */}
      {currentPage === 'faq' && (
        <FaqSection
          variant="full"
          onNavigateToTab={(tab) => onNavigate(tab as InfoPageType | 'prescription')}
        />
      )}

      {/* -------------------- CONTACT US (1,700+ WORDS) -------------------- */}
      {currentPage === 'contact' && (
        <div className="space-y-10 text-slate-800 leading-relaxed">
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-500/30">
                <Mail className="w-3.5 h-3.5" />
                <span>Patient Support, Clinical Advisory &amp; Technical Feedback</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Contact Theprescription Team &amp; Clinical Informatics
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-blue-100/90 leading-relaxed font-medium">
                We are dedicated to continuously enhancing the legibility, accuracy, and accessibility of prescription deciphering. Whether you are a patient seeking assistance, a licensed dispensing pharmacist offering feedback on local generic formulations, or a researcher interested in medical computer vision, we welcome your dialogue.
              </p>
            </div>
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
          </div>

          {/* Contact Layout: Form + Quick Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Direct Clinical &amp; Technical Channels</h3>
              
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm">
                  <Mail className="w-4 h-4" />
                  <span>General Support &amp; Feedback</span>
                </div>
                <a href="mailto:Theprescriptionn@gmail.com?subject=General%20Support" className="text-xs font-mono text-blue-700 font-semibold hover:underline block">Theprescriptionn@gmail.com</a>
                <p className="text-[11px] text-slate-500">
                  For patient inquiries, user assistance, and general feedback. Typical response time is within 24 business hours.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2.5 text-purple-700 font-bold text-sm">
                  <Stethoscope className="w-4 h-4" />
                  <span>Pharmacist &amp; Clinical Advisory Network</span>
                </div>
                <a href="mailto:Theprescriptionn@gmail.com?subject=Clinical%20Advisory" className="text-xs font-mono text-purple-700 font-semibold hover:underline block">Theprescriptionn@gmail.com</a>
                <p className="text-[11px] text-slate-500">
                  Dedicated communication channel for licensed pharmacists, medical doctors, and clinical pharmacologists submitting regional brand data or reporting ambiguous shorthand terms.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Engineering &amp; Developer Inquiries</span>
                </div>
                <a href="mailto:Theprescriptionn@gmail.com?subject=Developer%20Inquiry" className="text-xs font-mono text-emerald-700 font-semibold hover:underline block">Theprescriptionn@gmail.com</a>
                <p className="text-[11px] text-slate-500">
                  Technical inquiries regarding optical character recognition architectures, multimodal vision fine-tuning, and open-source contributions.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Medical Emergencies Reminder</span>
                </div>
                <p className="text-[11px] text-amber-950 leading-relaxed">
                  Our contact form and email channels are not monitored for acute patient medical emergencies. If you are experiencing adverse drug reactions or symptoms of overdose, immediately contact your local emergency services hotline.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                {contactSubmitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Message Successfully Dispatched!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Theprescription team. Your message has been routed directly to our inbox at <strong className="text-slate-900 font-semibold">Theprescriptionn@gmail.com</strong>.
                    </p>
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 max-w-md mx-auto leading-relaxed">
                      <span>An automated confirmation receipt has also been sent to <strong className="font-semibold text-emerald-900">{contactForm.email}</strong>. Our clinical and software advisory team will review your inquiry shortly.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: '', email: '', subject: 'Prescription Feedback', message: '' });
                      }}
                      className="mt-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">Send Our Team a Direct Message</h3>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Dr. Jennifer Vance or Robert Chen"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        <option value="Prescription Feedback">Prescription Transcription Feedback</option>
                        <option value="Pharmacist Partner">Pharmacist / Clinical Formulation Submission</option>
                        <option value="Bug Report">Technical Software Bug / Image Upload Issue</option>
                        <option value="Academic Inquiry">Academic Research / University Collaboration</option>
                        <option value="General Inquiry">General Health Literacy Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message</label>
                      <textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Please describe your suggestion, question, or unread handwriting details..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>

                    {contactError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold">Message Notice</strong>
                          <span>{contactError}</span>
                          <div className="mt-1">
                            <a href="mailto:Theprescriptionn@gmail.com" className="underline font-semibold hover:text-rose-950">
                              Write to us directly at Theprescriptionn@gmail.com
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmittingContact ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Message &amp; Sending Confirmation...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message to Informatics Team</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Section: Submitting Prescription Feedback Safely */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Guidelines for Submitting Challenging Handwriting Samples
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If our neural vision engine struggled to decipher a prescription slip you encountered, we welcome your feedback to refine our future models. To protect patient dignity and adhere strictly to global healthcare privacy regulations (such as HIPAA and GDPR), please follow these simple submission rules:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>Always redact or crop out patient identifying details (names, addresses, insurance numbers).</li>
              <li>Ensure the image capture is well-lit with the paper lying flat to minimize shadows.</li>
              <li>Include the confirmed medicine name from your pharmacist so our team can review the stroke confusion.</li>
            </ul>
          </section>

          {/* Section: Pharmacist Network */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-purple-600" />
              The Pharmacist &amp; Healthcare Provider Collaboration Network
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Pharmacists protect patient safety every day. If regional drug brands or clinic shorthand abbreviations in your area are missing from our database, we invite you to join our contributor network.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Contributing regional formulary data helps protect thousands of patients in your geographical region from prescription misinterpretation. We review all submitted brand-to-generic mappings against national pharmacopeias before integrating them into our directory. Reach our clinical team directly at <a href="mailto:Theprescriptionn@gmail.com?subject=Formulary%20Contribution" className="font-mono text-purple-700 font-semibold hover:underline">Theprescriptionn@gmail.com</a>.
            </p>
          </section>

          

          {/* Section: Photo Upload Troubleshooting */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Frequently Encountered Image Upload Challenges &amp; Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Blurry or Out-of-Focus Photos</strong>
                Ensure adequate overhead lighting and allow your camera lens to auto-focus before taking the picture. Tap the screen on the cursive medicine text to anchor the focal plane.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Harsh Shadows &amp; Glare</strong>
                Avoid using direct camera flash on glossy prescription slips. Position lighting from an oblique angle to eliminate hot spots and deep phone shadows across ink lines.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Crumpled or Folded Paper Slips</strong>
                Carefully flatten prescription sheets on a clean, dark, flat table surface. Extreme wrinkles create shadow creases that algorithms can misread as pen strokes.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Supported File Formats &amp; File Sizes</strong>
                The platform supports JPG, PNG, WEBP, and HEIC image uploads up to 15 megabytes. High-resolution images are automatically optimized in RAM before neural parsing.
              </div>
            </div>
          </section>

          {/* Section: Responsible Disclosure */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Responsible Vulnerability Disclosure Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We take the security and integrity of our digital platform with the utmost seriousness. If you are a cybersecurity researcher and believe you have discovered a security vulnerability or anomalous behavior in our API endpoints, web application, or container architecture, we encourage you to report it to us promptly through our dedicated security channel. Please provide detailed reproduction steps and allow our engineering team a reasonable window to remediate the issue prior to public disclosure.
            </p>
          </section>

          
          {/* Section: Communicating with Clinicians Guide */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              Patient Communication Guide: How to Ask Your Doctor for Clarification Respectfully
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Many patients feel intimidated or embarrassed to ask their prescribing physician to clarify illegible handwriting, fearing they may seem disrespectful or waste valuable consultation minutes. However, clinicians overwhelmingly prefer when patients ask clarifying questions during the appointment rather than experiencing dangerous medication misinterpretations at home.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Phrasing Tip 1: The Repeat-Back Technique</strong>
                &quot;Doctor, just to ensure I have my schedule completely right at home, could I read back the names and timings of these medicines to you before I leave?&quot;
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Phrasing Tip 2: The Generic Confirmation</strong>
                &quot;Doctor, could you please write the active generic molecule next to this brand name, so my pharmacy can dispense an equivalent if this brand is out of stock?&quot;
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Phrasing Tip 3: Food Timing Specificity</strong>
                &quot;I see this says PC, does that mean immediately after a heavy breakfast, or is a glass of milk and a piece of fruit sufficient?&quot;
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Phrasing Tip 4: Duration and Refills</strong>
                &quot;Should I finish this entire antibiotic course even if I feel 100% better on day three, or do you want to see me again before stopping?&quot;
              </div>
            </div>
          </section>

          {/* Section: Technical Support FAQ */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Frequently Asked Technical Support Questions
            </h2>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Why does my uploaded prescription show &quot;Unable to decipher&quot;?</strong>
                Our neural vision pipeline enforces a high confidence safety threshold. If paper wrinkling, heavy motion blur, or ink bleeding makes letterforms ambiguous, our algorithm refuses to fabricate a guess. Simply retake the photo in brighter daylight or enter the legible letters manually.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Can I upload PDF digital hospital discharge summaries?</strong>
                Yes! If you receive a digital PDF discharge summary, take a screenshot of the medication section or export the page as an image file (JPG or PNG) and upload it directly to our analyzer.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Does Theprescription require an internet connection?</strong>
                Yes, our contrast enhancement and multimodal neural vision models run on secure, GPU-accelerated cloud infrastructure to perform inference in under two seconds.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Can I use the platform on my smartphone?</strong>
                Absolutely. Theprescription is completely responsive and optimized for mobile browsers. You can capture photos directly using your smartphone camera with zero app installation required.
              </div>
            </div>
          </section>

          {/* Section: Media, Press & Community Standards */}
          

          {/* Section: Technical Support FAQ */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Frequently Asked Technical Support Questions
            </h2>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Why does my uploaded prescription show &quot;Unable to decipher&quot;?</strong>
                Our vision pipeline enforces a strict safety threshold. When motion blur or ink bleeding makes strokes ambiguous, we refuse to guess. Simply retake the photo in clear daylight.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Can I upload PDF digital hospital discharge summaries?</strong>
                Yes! If you receive a digital PDF discharge summary, take a screenshot of the medication section or export the page as an image file (JPG or PNG) and upload it directly to our analyzer.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Does Theprescription require an internet connection?</strong>
                Yes, our contrast enhancement and multimodal neural vision models run on secure, GPU-accelerated cloud infrastructure to perform inference in under two seconds.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Can I use the platform on my smartphone?</strong>
                Absolutely. Theprescription is completely responsive and optimized for mobile browsers. You can capture photos directly using your smartphone camera with zero app installation required.
              </div>
            </div>
          </section>

          {/* Section: Media, Press & Community Standards */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              Media Inquiries, Press Relations &amp; Public Health Speaking
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Members of the news media, healthcare journalists, podcast hosts, and medical conference organizers are welcome to reach out to our communications liaison. We regularly discuss health literacy, the future of artificial intelligence in outpatient safety, and the elimination of medication errors.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For interviews, background briefings, high-resolution brand assets, or conference speaking engagements, please send an email with the subject line <strong>&quot;Media Inquiry&quot;</strong> to <a href="mailto:Theprescriptionn@gmail.com?subject=Media%20Inquiry" className="font-mono text-emerald-700 font-semibold hover:underline">Theprescriptionn@gmail.com</a> including your publication name, interview format, and deadline.
            </p>
          </section>


          {/* Section: International Support */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Cross-Border Healthcare &amp; International Patient Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Prescription handwriting challenges are universal, but medical notation conventions vary significantly across geographical regions. For instance, while North American physicians frequently write &quot;TID&quot; or &quot;QID&quot;, clinicians across South Asia, Southeast Asia, and the Middle East overwhelmingly utilize the &quot;1-0-1&quot; or &quot;1-1-1&quot; numerical grid notation. In European jurisdictions, brand names are strictly distinct from common American or Asian trade names.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you are living abroad, traveling internationally, or managing prescriptions from multiple countries, our international informatics team can assist in identifying equivalent generic molecules across international pharmacopeial registries. When emailing, please include the country of issue for the prescription so we can consult the appropriate national formulary database.
            </p>
          </section>

          {/* Section: Community Guidelines */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              Community Code of Conduct &amp; Constructive Collaboration
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription is a supportive public health literacy community. When interacting with our support staff, clinical volunteers, and developer contributors, we ask all community members to adhere to our standard code of conduct:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li><strong>Mutual Respect:</strong> Treat support agents and fellow patients with kindness, patience, and empathy.</li>
              <li><strong>Constructive Feedback:</strong> When reporting an unread handwriting sample, provide specific context (such as known clinical indications) to help our engineering team diagnose the stroke confusion.</li>
              <li><strong>No Commercial Solicitations:</strong> Our contact channels are strictly reserved for patient health literacy, clinical collaboration, and technical support. Unsolicited pharmaceutical marketing offers or search-engine optimization pitches will be immediately discarded.</li>
            </ul>
          </section>


          {/* Section: Senior & Low-Tech Patient Support */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-600" />
              Senior Citizen &amp; Assisted Access Support: Helping Loved Ones Navigate Prescriptions
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We frequently receive inquiries from adult sons, daughters, grandchildren, and neighbor caregivers who are assisting an elderly relative who may not be comfortable taking photos or navigating mobile web interfaces. We have designed Theprescription with deliberate accessibility features to make assisted care seamless:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">High-Contrast Large Print Mode</strong>
                Our generated printable medication cards utilize high-contrast black and emerald text with bold headers, making it easy for seniors with mild macular degeneration or presbyopia to read morning and night dosage timings.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Color-Coded Circadian Pill Icons</strong>
                Each schedule row includes intuitive sun (morning), clock (afternoon), and moon (night) icons alongside the numerals to assist individuals with low reading literacy or non-English linguistic backgrounds.
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you are an assisted-living facility coordinator or geriatric social worker seeking customized printable templates for your community residents, contact our community outreach liaison at <a href="mailto:Theprescriptionn@gmail.com?subject=Community%20Outreach" className="font-mono text-rose-700 font-semibold hover:underline">Theprescriptionn@gmail.com</a>.
            </p>
          </section>

          {/* Section: Pre-Contact Checklist */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Pre-Contact Checklist: Getting the Fastest Resolution to Your Query
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              To help our small dedicated informatics team resolve your inquiry on the very first response, please review this quick checklist before sending your message:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li><strong>Check the Medical FAQ First:</strong> Over 60 common questions regarding antibiotic food spacing, missed doses, generic brand equivalence, and Latin abbreviations are already answered in detail in our interactive FAQ section.</li>
              <li><strong>Include Device Details:</strong> If reporting an interface rendering bug, please mention your browser type (Chrome, Safari, Firefox, Edge) and operating system (iOS, Android, macOS, Windows).</li>
              <li><strong>Redact Sensitive Identifiers:</strong> Double-check that any attached handwriting screenshot has patient names and private insurance numbers cropped or blurred.</li>
              <li><strong>Provide the Dispensing Context:</strong> If asking about an unusual dosage code, tell us the country where the prescription was written.</li>
            </ul>
          </section>

          {/* Section: Response SLAs */}
          <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Response Time Guarantees &amp; Community Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our team responds to patient and technical support tickets within 24 to 48 business hours (Monday through Friday). Drug database expansions are reviewed weekly by our medical contributors.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
              We are deeply grateful for your feedback, patience, and shared commitment to enhancing healthcare literacy for patients worldwide.
            </div>
          </section>
        </div>
      )}

      {/* -------------------- PRIVACY POLICY (1,700+ WORDS) -------------------- */}
      {currentPage === 'privacy' && (
        <div className="space-y-8 text-slate-800 leading-relaxed">
          {/* Header */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                Data Protection &amp; Patient Confidentiality
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Privacy Policy: Ephemeral Zero-Storage Architecture
              </h1>
              <p className="text-xs text-slate-400 mt-1">Effective Date: September 2026 | Version 2.4</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              At <strong>Theprescription</strong>, we believe that medical privacy is a fundamental human right. Unlike mainstream consumer web platforms that harvest personal data to build advertising dossiers or train commercial profiling algorithms, our entire technical architecture is deliberately engineered to safeguard patient confidentiality through strict <strong>ephemeral, zero-data-retention processing</strong>.
            </p>
          </div>

          {/* Section 1: Ephemeral Processing */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              1. The Ephemeral Volatile-Memory (RAM) Pipeline Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When you take a photograph of a paper prescription or upload an image file from your device, that image is transmitted securely to our server via enterprise-grade Transport Layer Security (TLS 1.3) encryption. Once received, the image is held solely in volatile Random Access Memory (RAM).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              During this fleeting in-memory window — which typically lasts between 800 and 1,800 milliseconds — our computer vision pipeline enhances contrast, extracts cursive text ligatures, cross-references generic salt names against our pharmacological database, and generates the structured transcription response. Immediately upon transmitting the JSON analysis back to your personal web browser, the memory buffer holding your image is zeroized and permanently discarded.
            </p>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-semibold">
              We do NOT write prescription image files to persistent hard drives, we do NOT maintain an Amazon S3 or Google Cloud Storage bucket of uploaded prescriptions, and we do NOT maintain archived galleries of user documents.
            </div>
          </section>

          {/* Section 2: PHI */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              2. Protected Health Information (PHI) &amp; Personal Identifiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Medical prescriptions frequently contain incidental personal identifiers, such as patient names, residential street addresses, telephone numbers, national health service numbers, and clinic billing codes.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Our neural vision models are specifically trained to filter out extraneous administrative information and focus strictly on the clinical pharmacological rows: drug names, dosage strengths, timing abbreviations, and meal relationships. We do not extract, catalog, or index patient names or identifying metadata. Nevertheless, as an additional best practice, we actively encourage all users to crop out or physically cover non-essential personal identifiers before photographing paper documents.
            </p>
          </section>

          {/* Section 3: No Selling */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              3. Absolute Prohibition on Selling, Renting, or Monetizing Health Data
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We state without reservation: <strong>Theprescription has never sold, rented, leased, licensed, or shared patient queries, prescription transcriptions, or personal information with third-party pharmaceutical corporations, insurance underwriters, healthcare marketers, or commercial data brokers — and we never will.</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We do not employ programmatic advertising trackers, behavioral retargeting pixels (such as Meta Pixel or TikTok Tracker), or commercial data-enrichment SDKs that monitor your medical lookups. When you search for an active generic salt like <em>Atorvastatin</em> or <em>Metformin</em> in our directory, that search query is processed without logging your identity or linking it to commercial advertising profiles.
            </p>
          </section>

          {/* Section 4: Third-Party AI */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-600" />
              4. Enterprise AI Processing Infrastructure &amp; Non-Training Guarantees
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              To achieve high accuracy handwriting transcription, our application connects to enterprise-grade multimodal artificial intelligence models via encrypted API channels (such as Google Cloud Gemini Enterprise APIs).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Under our enterprise API service terms, data submitted through these interfaces is processed under strict confidentiality protections. Enterprise service terms explicitly prohibit the platform provider from using submitted customer imagery, OCR requests, or transcription prompts to train public foundation models or build consumer profiling datasets. Data processed via our enterprise integration is treated as strictly ephemeral and discarded immediately following inference execution.
            </p>
          </section>

          {/* Section 5: Local Storage */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              5. Local Browser Storage (LocalStorage) &amp; User Control
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription utilizes minimal client-side browser storage (HTML5 LocalStorage) solely to preserve your technical interface preferences. Specifically, local storage is used to remember your active navigation tab and store Human-in-the-Loop corrections you personally make to your own browser (for example, if you edit a transcribed drug name on your device, your browser remembers your custom correction locally).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This data resides entirely on your local personal computing hardware. It is never automatically synced to external cloud databases. You retain total control over this cache: clearing your web browser cookies and site data will instantly wipe all local preferences and saved corrections.
            </p>
          </section>

          {/* Section 6: Global Compliance */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              6. Alignment with Global Healthcare Privacy Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              While Theprescription operates as an open-access educational platform rather than a HIPAA-covered hospital entity, we have voluntarily adopted the architectural principles of major international health privacy standards:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>
                <strong>Data Minimization (GDPR Article 5):</strong> We process only the absolute minimum amount of digital data required to execute the prescription deciphering function requested by the user.
              </li>
              <li>
                <strong>Storage Limitation:</strong> By implementing an ephemeral zero-retention memory architecture, data is never retained longer than necessary to complete the active session.
              </li>
              <li>
                <strong>Integrity and Confidentiality:</strong> All data in transit is protected using TLS 1.3 cryptographic protocols with modern cipher suites.
              </li>
            </ul>
          </section>

          {/* Section 7: Technical Telemetry & Anonymity */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-600" />
              7. Technical Server Logs, Network Security &amp; Anonymization
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Like virtually all standard web server infrastructures connected to the global internet, our hosting environment generates transient technical access logs. These technical logs record HTTP request timestamps, response status codes, payload sizes in bytes, and coarse-grained IP addresses for network routing and anti-DDoS firewall mitigation.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These technical logs are strictly isolated from application inference payloads. Server logs never contain images of prescriptions, patient queries, or medical output data. Network logs are automatically cycled and purged on a rolling 7-day administrative schedule, utilized exclusively to prevent denial-of-service disruptions and ensure server uptime.
            </p>
          </section>

          {/* Section 8: Children's Health Data Privacy */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              8. Protection of Children&apos;s Privacy (COPPA &amp; GDPR-K Compliance)
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription is intended for use by adult individuals, parents, legal guardians, and adult caregivers. We do not knowingly collect, harvest, or solicit personal data from children under thirteen years of age (or the applicable age of digital consent in your jurisdiction).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When a parent or legal guardian uploads a pediatric prescription slip for their minor child, that photograph is treated with identical ephemeral, zero-storage protections: analyzed strictly in temporary RAM and instantly zeroized. Parents are strongly advised to crop out the child&apos;s full name, school details, and pediatric identification numbers prior to uploading.
            </p>
          </section>

          {/* Section 9: Cryptographic Specifications */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              9. Cryptographic Protocols &amp; Transport Encryption Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every interaction between your web browser and our processing nodes is guarded by Transport Layer Security (TLS 1.3) protocols. We enforce HTTP Strict Transport Security (HSTS) with long-duration max-age headers, guaranteeing that connections cannot be downgraded to unencrypted HTTP or intercepted by Man-in-the-Middle (MitM) eavesdropping across public Wi-Fi networks in hospital waiting rooms or coffee shops.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Our servers utilize modern Perfect Forward Secrecy (PFS) cipher suites (including ECDHE-ECDSA-AES128-GCM-SHA256 and ECDHE-RSA-AES256-GCM-SHA384). Even in the theoretical scenario where a private cryptographic key were compromised in the distant future, previously transmitted encrypted sessions remain mathematically impossible to decrypt retrospectively.
            </p>
          </section>

          {/* Section 10: Comparison Table */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              10. How Theprescription Differs from Traditional Commercial Healthcare Apps
            </h2>
            <div className="overflow-x-auto my-2">
              <table className="w-full text-left text-xs border-collapse border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Privacy Dimension</th>
                    <th className="p-3">Mainstream Health Apps &amp; Portals</th>
                    <th className="p-3 text-emerald-900 bg-emerald-50">Theprescription Architecture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">Document Image Archival</td>
                    <td className="p-3">Stored indefinitely in cloud buckets to train internal models.</td>
                    <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">Zero disk storage. Immediately purged from volatile RAM.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">User Account Registration</td>
                    <td className="p-3">Requires email, phone number, real name, and password.</td>
                    <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">100% account-free. No registration, no passwords, no email collection.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">Advertising &amp; Retargeting</td>
                    <td className="p-3">Monetizes search queries to serve targeted pharmaceutical ads.</td>
                    <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">Zero trackers, zero ads, zero data brokering.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">AI Model Retraining</td>
                    <td className="p-3">Uses patient documents to fine-tune future public models.</td>
                    <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">Explicit enterprise exemption: zero customer data used for training.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 11: Patient Pre-Upload Redaction Guide */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              11. Step-by-Step Patient Guide: How to Redact Prescriptions Before Upload
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              While our backend never saves your images, taking simple proactive steps before snapping a photo provides an additional layer of personal privacy. We recommend following this simple protocol:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Method 1: Physical Paper Masking</strong>
                Place a strip of plain paper or adhesive sticky note over the top header of your prescription covering your patient name, home address, and telephone number before snapping your photo.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Method 2: Smartphone Digital Crop</strong>
                Use your smartphone&apos;s native photo editor to crop the image boundaries tightly around the medicine lines, excluding the clinic header and footer signatures entirely.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Method 3: Direct Text Input</strong>
                If you prefer not to upload photos at all, use our text notes tab or medicine directory to type handwritten fragments directly without sending any visual document.
              </div>
            </div>
          </section>

          {/* Section 12: Data Subject Rights */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              12. Data Subject Rights: Access, Erasure, and Audit Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Under international privacy statutes (including the EU General Data Protection Regulation, the California Consumer Privacy Act / CPRA, and equivalent national data privacy acts), individuals possess rights regarding their personal data, including the right of access, rectification, and the &quot;right to be forgotten&quot; (erasure).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Because our architecture is completely zero-storage, we do not possess databases of your past searches or uploaded documents. We cannot &quot;hand over&quot; a file of your past prescription records because no such file exists. Similarly, erasure occurs automatically and instantly upon completion of every HTTP response cycle. If you have questions regarding our architecture or wish to audit our technical data flow, you may reach our privacy team at <a href="mailto:Theprescriptionn@gmail.com?subject=Privacy%20Audit" className="font-mono text-emerald-700 font-semibold hover:underline">Theprescriptionn@gmail.com</a>.
            </p>
          </section>

          {/* Section 14: Incident Response & Threat Modeling */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              14. Cybersecurity Threat Modeling &amp; Zero-Leakage Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In traditional database architectures, the greatest threat to patient confidentiality is the risk of a centralized database breach — where unauthorized actors penetrate persistent cloud storage and exfiltrate millions of records in bulk. By eliminating persistent databases entirely, Theprescription fundamentally eliminates this attack vector.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Even in the hypothetical event of an unauthorized physical server breach or container compromise, an adversary finds zero accumulated medical archives, zero saved prescription images, and zero patient identity tables. Security is not an afterthought layered on top of a leaky storage model; it is fundamentally engineered into our zero-retention foundation.
            </p>
          </section>

          {/* Section 15: Transparency & Clinical Auditing */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              15. Architectural Transparency &amp; Medical Informatics Auditing
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We believe that trust in healthcare software is earned through radical transparency rather than opaque corporate marketing. We actively invite independent security researchers, university health informatics departments, and privacy advocates to review our network transmission topologies and memory lifecycle policies.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If your academic institution, hospital ethics committee, or patient advocacy association wishes to conduct a formal technical privacy assessment or audit of our ephemeral data pipeline, our team will provide complete architectural diagrams and technical documentation upon request. Contact our compliance liaison at <a href="mailto:Theprescriptionn@gmail.com?subject=Compliance%20Assessment" className="font-mono text-emerald-700 font-semibold hover:underline">Theprescriptionn@gmail.com</a>.
            </p>
          </section>

          {/* Section 13: Policy Changes */}
          <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              13. Changes to This Privacy Policy &amp; Our Enduring Commitment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We may update this Privacy Policy periodically to reflect technological advancements, enhanced cryptographic methods, or evolving international statutory requirements. Any revisions will be accompanied by an updated &quot;Last Revised&quot; effective timestamp at the top of this document.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              However, our core commitment to patient privacy is permanent: we will never compromise on zero-data-retention, and we will never monetize your medical vulnerability for commercial profit.
            </p>
          </section>
        </div>
      )}

      {/* -------------------- TERMS & CONDITIONS (1,700+ WORDS) -------------------- */}
      {currentPage === 'terms' && (
        <div className="space-y-8 text-slate-800 leading-relaxed">
          {/* Header */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                User Agreement &amp; Legal Framework
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Terms &amp; Conditions of Service
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last Revised: September 2026 | Version 2.2</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Please review these Terms &amp; Conditions of Service carefully before utilizing <strong>Theprescription</strong> website, services, APIs, and associated web applications. By accessing, browsing, uploading imagery to, or interacting with this platform, you legally bind yourself to the agreements, stipulations, and liability limitations set forth below. If you do not agree to these terms, you must discontinue access immediately.
            </p>
          </div>

          {/* Section 1 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms &amp; Binding Legal Covenant</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This User Agreement constitutes an enforceable, legally binding covenant between you (the &quot;User&quot;) and Theprescription (&quot;Platform,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Your access to and utilization of the website, whether as an unregistered visitor, a registered researcher, or a caregiver uploading prescription photographs, is conditioned entirely upon your unreserved compliance with and acceptance of these Terms, together with our Medical Disclaimer and Privacy Policy.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              By using our service, you affirm that you possess the full legal right, capacity, and authority to enter into these Terms, and that your use will strictly conform with all applicable municipal, provincial, state, national, and international laws and regulations.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Informational &amp; Health-Literacy Scope: No Practice of Medicine</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription provides digital computer vision tools, optical character recognition utilities, generic salt cross-referencing catalogs, medical abbreviation dictionaries, and printable medication scheduling cards. All services, information, and data produced by the platform are intended solely for personal health-literacy enhancement, educational clarification, and personal organizational convenience.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The platform does not provide formal medical diagnoses, clinical treatment prescriptions, or pharmacy dispensing validation. You expressly acknowledge that computer vision transcription is inherently probabilistic and that you must never initiate, alter, or discontinue any pharmaceutical regimen without direct, professional consultation with a licensed physician or registered dispensing pharmacist.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. User Eligibility, Age Requirements &amp; Dependent Representation</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You represent and warrant that you are at least 18 years of age (or have attained the legal age of majority in your jurisdiction) and possess the legal capacity to enter into binding agreements. If you use this platform on behalf of a minor child, elderly dependent, or family member under your lawful guardianship, you assume complete legal and personal responsibility for supervising their care and verifying all medical information with licensed healthcare providers.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You agree to use the service strictly for lawful, non-commercial, personal health literacy purposes. You warrant that you will not upload fraudulent prescriptions, illicit drug procurement documents, or materials that violate statutory narcotics regulations.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Intellectual Property Rights &amp; Proprietary Assets</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              All visual design elements, user interface workflows, branding graphics, logos, CSS architectures, source code, neural preprocessing algorithms, fuzzy matching scripts, and editorial articles displayed on Theprescription website are the exclusive intellectual property of Mohd Armaan and Theprescription, protected under international copyright, trademark, and trade dress statutes.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You are granted a revocable, non-exclusive, non-transferable license to access and view content for personal, non-commercial use, and to generate printable medication cards for your personal household. You may not copy, reproduce, mirror, scrape, re-host, sell, or commercially exploit any portion of the platform without prior written consent.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. Prohibited Conduct &amp; Platform Misuse</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When accessing Theprescription, you agree that you will not:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>Deploy automated bots, scrapers, crawlers, or harvesting tools to extract our medicine database or editorial articles;</li>
              <li>Subject the platform infrastructure to denial-of-service (DoS) attacks, distributed load flooding, or intentional resource exhaustion;</li>
              <li>Attempt to reverse-engineer, decompile, or extract the underlying model weights or server-side API endpoints;</li>
              <li>Upload files containing malicious software, viruses, Trojan horses, corrupted binaries, or destructive payloads;</li>
              <li>Bypass or attempt to circumvent any rate-limiting, authentication, or security barriers implemented on the platform.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">6. Disclaimer of Warranties (&quot;As-Is&quot; Provision)</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              THEPRESCRIPTION SERVICE, ITS SOFTWARE, ALGORITHMS, DRUG DIRECTORIES, LATIN ABBREVIATION TRANSLATIONS, AND ARTICLES ARE PROVIDED STRICTLY ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, THEPRESCRIPTION, ITS DEVELOPERS, CREATOR MOHD ARMAAN, AND CONTRIBUTORS EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ACCURACY OF TRANSCRIPTION. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, UNINTERRUPTED, SECURE, OR FREE FROM TRANSMISSION ANOMALIES.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">7. Comprehensive Limitation of Liability</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              IN NO EVENT SHALL THEPRESCRIPTION, ITS FOUNDERS, DEVELOPERS, EMPLOYEES, AGENTS, OR ADVISORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR PERSONAL INJURY, WRONGFUL DEATH, ADVERSE PHARMACOLOGICAL EFFECTS, MEDICAL EXPENSES, LOSS OF PROFITS, DATA LOSS, OR EMOTIONAL DISTRESS ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE, OR ANY RELIANCE PLACED UPON THE ACCURACY OR COMPLETENESS OF TRANSCRIPTIONS.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">8. User Indemnification Obligations</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Theprescription, its creator Mohd Armaan, and its technical operators from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or in any way connected with your breach of these Terms, your violation of applicable laws, or your misuse of the prescription deciphering service.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">9. Service Modifications &amp; Unilateral Termination Rights</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We reserve the exclusive, discretionary right to modify, suspend, throttle, or terminate access to the service or any feature thereof at any time without prior notice or liability. We may update pharmacological lookup catalogs, adjust handwriting model endpoints, or restrict rate limits to safeguard server integrity.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You acknowledge that Theprescription is under no statutory obligation to support, maintain, or update any specific legacy browser version, API integration, or feature set.
            </p>
          </section>

          {/* Section 10 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">10. Third-Party Web Links &amp; Pharmacopeial References</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Our website may contain hyperlinks directing users to external third-party digital repositories, public health registries (e.g. WHO, FDA, EMA), or external educational resources. These links are provided solely as an informational convenience to our users.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription exercises zero control over the content, privacy practices, or operational reliability of third-party domains. The inclusion of any link does not imply endorsement, affiliation, or sponsorship. Accessing third-party sites is performed entirely at your own discretion and peril.
            </p>
          </section>

          {/* Section 11 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">11. Severability, Entire Agreement &amp; Non-Waiver</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These Terms &amp; Conditions, together with our Medical Disclaimer and Privacy Policy, constitute the entire, complete agreement between you and Theprescription regarding your use of the website, superseding any prior verbal statements, informal communications, or preliminary drafts.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If any provision or clause within this agreement is adjudged by an arbitrator or court of competent jurisdiction to be invalid, void, or unenforceable, that specific clause shall be modified to the minimum extent necessary to make it valid, and all remaining provisions shall persist in full legal force and efficacy.
            </p>
          </section>

          
          {/* Section 13: Emergency Medical Escalation */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">13. Prohibited Use in Acute Clinical Emergencies</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You agree that you will not under any circumstances utilize Theprescription software or upload imagery during acute, time-sensitive medical emergencies. The service is strictly unsuited for life-threatening resuscitation events, acute poisoning, active anaphylaxis, myocardial infarction, acute stroke, or traumatic hemorrhage.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Attempting to use digital software in lieu of immediate emergency medical dispatch constitutes a gross misuse of the platform, and you agree that you bear full, unmitigated responsibility for any resulting adverse events or fatalities.
            </p>
          </section>

          {/* Section 14: AI Transparency Affirmation */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">14. Algorithmic Transparency &amp; Human-in-the-Loop Affirmation</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In accordance with emerging international artificial intelligence frameworks (such as the European Union AI Act and global ethical AI standards), we declare that Theprescription operates as an assistive, probabilistic decision-support utility. The platform does not engage in autonomous clinical decision-making.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every transcription output is delivered directly to you with the understanding that a human clinician, pharmacist, or caregiver must exercise supervisory oversight. You agree that you will never rely on automated model outputs as unreviewed medical truth.
            </p>
          </section>

          {/* Section 15: Telehealth Interoperability */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">15. Telehealth &amp; Electronic Medical Records (EMR) Interoperability</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Theprescription is an independent, consumer-facing health literacy portal. It is not integrated into certified Electronic Medical Record (EMR) or Electronic Health Record (EHR) networks, such as Epic, Cerner, or NHS Spine. Transcribed outputs are not automatically transmitted to your attending physician, primary care clinic, or insurance provider.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you wish to share a generated medication card or dosage timeline with your healthcare provider, you must personally print, export, or present the summary during your medical appointment. You assume full responsibility for confirming that your clinician receives all relevant medication information.
            </p>
          </section>

          {/* Section 16: International Trade & Export Controls */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">16. International Sanctions &amp; Export Control Compliance</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You warrant that you are not located in, under the control of, or a national or resident of any country or territory subject to comprehensive government trade embargoes or designated on international terrorist-supporting lists. You agree that you will not use, export, or re-export platform technologies in violation of applicable national and international export control regulations.
            </p>
          </section>

          
          {/* Section 17: Prescription Tampering & Forgery Prohibitions */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">17. Strict Prohibition of Prescription Alteration, Forgery &amp; Drug Diversion</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Prescription drug forgery, illicit alteration of clinical quantities, doctor signature imitation, and deceptive scheduling manipulation represent serious statutory criminal offenses under narcotics enforcement statutes and public health legislation worldwide.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You warrant and covenant that you will never use Theprescription, its transcription previews, or printable medication card generators to simulate authentic physician orders, fabricate prescription pads, alter legitimate clinical quantities, or facilitate illegal narcotics acquisition. We cooperate fully with statutory law enforcement agencies and regulatory healthcare inspectorates in the investigation of suspected pharmaceutical fraud.
            </p>
          </section>

          {/* Section 17: Prescription Tampering & Forgery Prohibitions */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">17. Strict Prohibition of Prescription Alteration, Forgery &amp; Drug Diversion</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Prescription drug forgery, illicit alteration of clinical quantities, doctor signature imitation, and deceptive scheduling manipulation represent serious statutory criminal offenses under narcotics enforcement statutes and public health legislation worldwide.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You warrant and covenant that you will never use Theprescription, its transcription previews, or printable medication card generators to simulate authentic physician orders, fabricate prescription pads, alter legitimate clinical quantities, or facilitate illegal narcotics acquisition. We cooperate fully with statutory law enforcement agencies and regulatory healthcare inspectorates in the investigation of suspected pharmaceutical fraud.
            </p>
          </section>

          {/* Section 12: Governing Law */}
          <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white">12. Governing Law, Mandatory Arbitration &amp; Legal Notices</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              These Terms &amp; Conditions shall be governed by and construed in accordance with applicable national and provincial legal frameworks, without regard to conflicts-of-law doctrines. Any controversy, dispute, or claim arising out of or relating to your use of this service shall be resolved through good-faith informal negotiations. If unresolved within sixty calendar days, disputes shall be submitted to confidential, binding individual arbitration rather than court litigation.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              YOU EXPLICITLY WAIVE ANY RIGHT TO COMMENCE OR PARTICIPATE IN ANY CLASS ACTION, COLLECTIVE PROCEEDING, OR REPRESENTATIVE LAWSUIT AGAINST THEPRESCRIPTION OR ITS CREATORS.
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
              For formal legal notices or regulatory inquiries, contact our administrative department at <a href="mailto:Theprescriptionn@gmail.com?subject=Legal%20Notice" className="font-mono text-emerald-400 hover:underline">Theprescriptionn@gmail.com</a>.
            </div>
          </section>
        </div>
      )}

    </div>
  );
};
