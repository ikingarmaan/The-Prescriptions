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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-in fade-in duration-200">
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

      {/* -------------------- ABOUT US -------------------- */}
      {currentPage === 'about' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Healthcare Mission</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Making doctor prescriptions clear, legible, and safe for everyone.
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Over 1.5 million preventable medication mistakes happen every year due to ambiguous clinical handwriting, misunderstood Latin frequency codes, and confusing dosage schedules. <span className="font-bold text-white">Theprescription</span> was founded to bridge the gap between doctor pen strokes and patient peace of mind.
              </p>
            </div>
            {/* Background Decorative Gradient Circle */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cursive Ligature Extraction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized neural stroke parsing engineered to read rapid clinical calligraphy, doctor signatures, and metric dosage units without confusing look-alike drug pairs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Latin Shorthand Decoding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translating centuries-old doctor abbreviations like 1-0-1, OD, BD, TDS, SOS, AC, and PC into intuitive plain-English morning, afternoon, evening, and bedtime timelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Safety First Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a medicine name is truly illegible, our engine refuses to guess blindly. It prompts verification and suggests pharmacist consultation rather than risking a misread.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Our Guiding Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-1">Human-in-the-Loop Safeguards</strong>
                  Patients and caregivers are always presented with verified active generic ingredients and encouraged to double-check with pharmacy labels.
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-1">Zero Advertising Conflicts</strong>
                  We never promote sponsored pharmaceuticals or alter search results based on commercial drug incentives.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- MEDICAL DISCLAIMER -------------------- */}
      {currentPage === 'disclaimer' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border-2 border-rose-300 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700">
                  Critical Medical & Legal Notice
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-rose-950">
                  Medical Application Disclaimer
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
              <strong>Theprescription</strong> is an artificial intelligence decision-support and educational transcription tool. It is <strong>NOT</strong> a certified medical device, does not practice medicine, and is <strong>NOT</strong> a substitute for professional medical diagnosis, treatment, prescription validation, or advice from a qualified healthcare provider.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                1. Emergency Medical Notice
              </h2>
              <p>
                If you or someone you are caring for is experiencing a medical emergency, severe allergic reaction (such as swelling of face or throat, difficulty breathing), chest pain, or sudden acute symptoms, <strong>immediately call your local emergency number (such as 911, 112, or 999) or visit the nearest hospital emergency room.</strong> Never rely on this application during urgent medical crises.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                2. Imperative Pharmacist & Physician Verification
              </h2>
              <p>
                Always verify the medicine name, strength (e.g. 250mg vs 500mg), form (tablets, drops, inhaler), and dosage schedule with your licensed dispensing pharmacist or prescribing doctor before consuming any medication. Even with advanced computer vision, handwritten symbols, ink smudges, and abbreviations can occasionally be ambiguous.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                3. No Doctor-Patient Relationship
              </h2>
              <p>
                Using Theprescription, uploading images, or reading transcription outputs does not establish a doctor-patient relationship, pharmacist-patient relationship, or clinical consultative relationship of any kind.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                4. Drug Interactions & Specific Allergies
              </h2>
              <p>
                Individual patient factors — including pregnancy, breastfeeding, kidney/liver impairment, pediatric age, and personal allergic histories — require personalized clinical review. The information presented here does not represent an exhaustive pharmacological monograph.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* -------------------- FAQ -------------------- */}
      {currentPage === 'faq' && (
        <FaqSection
          variant="full"
          onNavigateToTab={(tab) => onNavigate(tab as InfoPageType | 'prescription')}
        />
      )}

      {/* -------------------- CONTACT US -------------------- */}
      {currentPage === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                Get in Touch
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                We're Here to Help
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Have questions about our transcription algorithms, feedback on an unread prescription, or interested in institutional clinical integration? Reach out anytime.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email Support</div>
                  <div className="text-emerald-700 font-mono text-xs">support@theprescription.ai</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Response typically within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Medical Advisory Board</div>
                  <div className="text-slate-600 text-xs">Pharmacology & Digital Health Informatics</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Continuous clinical review of Latin abbreviations</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-emerald-950">Pharmacist Community Feedback</div>
                  <div className="text-emerald-900 text-xs leading-relaxed">
                    Licensed pharmacists can submit uncommon local brand variations to continuously improve regional handwriting recognition.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting Theprescription team. Our medical informatics specialists will review your query and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', email: '', subject: 'Prescription Feedback', message: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Send Us a Direct Message</h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Dr. Sarah Jenkins or David Smith"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value="Prescription Feedback">Prescription Decryption Feedback</option>
                      <option value="Pharmacist Partner">Pharmacist / Clinical Partnership</option>
                      <option value="Bug Report">Technical Issue / Bug Report</option>
                      <option value="General Inquiry">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your inquiry, medicine question, or feature suggestion in detail..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- PRIVACY POLICY -------------------- */}
      {currentPage === 'privacy' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
              Legal & Data Protection
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Effective Date: September 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              1. Ephemeral Image Processing
            </h2>
            <p>
              When you upload a prescription image to Theprescription, the file is analyzed strictly in encrypted volatile memory to extract medication names, frequencies, and instructions. We do not maintain an archived database of your personal medical papers or use images for marketing profiling.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              2. Protected Health Information (PHI)
            </h2>
            <p>
              We recommend masking or cropping out non-essential personal identifiers (such as national insurance ID numbers or residential home addresses) prior to uploading. Theprescription focuses strictly on clinical medicine rows, dosage units, and doctor usage directions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              3. No Selling of Personal Data
            </h2>
            <p>
              Theprescription strictly adheres to ethical healthcare standards: we never sell, rent, monetize, or broker patient health queries or uploaded prescriptions to pharmaceutical marketers, data brokers, or advertising networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              4. Cookies & Local Browser Storage
            </h2>
            <p>
              We only utilize local browser storage for technical user preferences (such as remembering your active tab or custom corrected medication names in Human-in-the-loop memory). You can clear this cache at any time in your browser settings.
            </p>
          </section>
        </div>
      )}

      {/* -------------------- TERMS & CONDITIONS -------------------- */}
      {currentPage === 'terms' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
              User Agreement
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Terms & Conditions of Service
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing Theprescription website and applications, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms & Conditions and our Medical Disclaimer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Informational & Educational Use Only</h2>
            <p>
              All materials, OCR analyses, Latin translation schedules, drug safety notes, and generated medication cards are provided strictly for educational and health-literacy enhancement. They do not constitute formal medical diagnoses or authorized dispensing orders.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. User Responsibility & Verification</h2>
            <p>
              You agree that you are solely responsible for reviewing all transcribed outputs with a licensed healthcare practitioner or certified dispensing pharmacist. Do not start, discontinue, or alter dosages of any medication based on software interpretations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Theprescription, its creators, developers, and medical advisors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use this service, or any reliance on extracted medicine information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Intellectual Property</h2>
            <p>
              All software design, logos, handwriting classification architectures, UI layouts, and domain branding are protected by copyright and intellectual property laws. Unauthorized duplication or commercial re-hosting is prohibited.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
