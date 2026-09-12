import { PrescriptionAnalysisResult } from '../types';

/**
 * Generates a clean, standalone, beautifully styled HTML document of the medication card
 * with embedded CSS and print styling that opens anywhere offline.
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
              ? `<span style="display: inline-block; background: #f1f5f9; color: #475569; font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-top: 3px;">${escapeHtml(med.strength)} (${escapeHtml(med.form)})</span>`
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <div style="font-weight: 600; color: #1e293b;">${escapeHtml(med.dosage)}</div>
          <div style="font-size: 12px; color: #64748b;">${escapeHtml(med.frequency)}</div>
          ${
            med.timingCode
              ? `<span style="font-family: monospace; font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 1px 5px; border-radius: 4px;">[${escapeHtml(med.timingCode)}]</span>`
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <span style="font-weight: 700; color: #0f172a; font-size: 12px; display: block;">${escapeHtml(med.mealRelationText)}</span>
          ${
            med.mealRelation === 'before_meal' || med.mealRelation === 'empty_stomach'
              ? '<span style="font-size: 11px; color: #b45309; font-weight: 600;">(Take 30-60 min before meals - AC)</span>'
              : med.mealRelation === 'after_meal' || med.mealRelation === 'with_meal'
              ? '<span style="font-size: 11px; color: #047857; font-weight: 600;">(Take after or with food - PC)</span>'
              : ''
          }
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155; font-size: 12px;">
          ${escapeHtml(med.duration || 'As prescribed')}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #475569; line-height: 1.4;">
          ${escapeHtml(med.purposeAndUsage)}
        </td>
      </tr>
    `
    )
    .join('');

  const labTestsSection =
    prescription.labTests && prescription.labTests.length > 0
      ? `
      <div style="margin-top: 24px; border: 1px solid #c7d2fe; background: #f5f7ff; border-radius: 12px; padding: 16px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #3730a3; text-transform: uppercase; letter-spacing: 0.5px;">
          Ordered Diagnostic & Laboratory Tests (${prescription.labTests.length})
        </h3>
        <div style="display: grid; gap: 8px;">
          ${prescription.labTests
            .map(
              (t) => `
            <div style="background: #ffffff; border: 1px solid #e0e7ff; padding: 10px 12px; border-radius: 8px;">
              <div style="font-weight: 700; color: #1e1b4b; font-size: 13px;">${escapeHtml(t.testName)} <span style="font-size: 11px; background: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(t.category)}</span></div>
              <div style="font-size: 12px; color: #475569; margin-top: 2px;">${escapeHtml(t.whyDoctorOrdered)}</div>
              ${
                t.preparationInstructions
                  ? `<div style="font-size: 11px; color: #92400e; background: #fef3c7; display: inline-block; padding: 2px 8px; border-radius: 4px; margin-top: 4px; font-weight: 600;">Prep: ${escapeHtml(t.preparationInstructions)}</div>`
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
          ⚠️ Critical Timing & Spacing Instructions
        </h3>
        <ul style="margin: 0; padding-left: 18px; color: #7c2d12; font-size: 12px; line-height: 1.6;">
          ${prescription.potentialInteractionsOrSpacingAdvice
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('')}
        </ul>
      </div>
    `
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medication Card - ${escapeHtml(clinicName)}</title>
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
      max-width: 900px;
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
  <div class="no-print" style="max-width: 900px; margin: 0 auto 16px auto; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-size: 13px; color: #64748b; font-weight: 600;">
      📄 Saved Medication Card • Ready to print or view
    </div>
    <button class="btn btn-emerald" onclick="window.print()">
      🖨️ Print This Card
    </button>
  </div>

  <div class="card-container">
    <!-- Header -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="font-size: 12px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 1px;">
          Theprescription • Clinical Patient Guide
        </div>
        <h1 style="margin: 4px 0 0 0; font-size: 24px; font-weight: 900; color: #0f172a;">
          Official Medication Schedule & Guide
        </h1>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
          Clear reference for safe dosage, administration intervals, and meal relations.
        </p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${escapeHtml(clinicName)}</div>
        <div>Generated: ${generatedDate}</div>
      </div>
    </div>

    <!-- Indication -->
    ${
      indication
        ? `
      <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;">
        <div style="font-weight: 800; color: #0f172a; font-size: 13px;">
          Indication / Treatment Goal: ${escapeHtml(indication)}
        </div>
        ${explanation ? `<div style="font-size: 12px; color: #475569; margin-top: 4px;">${escapeHtml(explanation)}</div>` : ''}
      </div>
    `
        : ''
    }

    <!-- Medicine Table -->
    <div style="margin-top: 24px;">
      <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155; margin: 0;">
        Prescribed Medicines (${prescription.medicines.length})
      </h2>
      <div style="overflow-x: auto;">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine & Salt</th>
              <th>Dose / Freq</th>
              <th>Meal Relation</th>
              <th>Duration</th>
              <th>Notes / Purpose</th>
            </tr>
          </thead>
          <tbody>
            ${medicinesRows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Diagnostic tests -->
    ${labTestsSection}

    <!-- Interactions -->
    ${interactionsSection}

    <!-- Footer Notice -->
    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; display: flex; gap: 8px; align-items: flex-start;">
      <span>ℹ️</span>
      <div>
        <strong>Important Safety Notice:</strong> This schedule is generated for patient guidance based on recognized clinical pharmacopeias. Never alter dosages or discontinue treatments without direct consultation with your prescribing physician or licensed pharmacist.
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates a clean text file summary
 */
export function generateMedicationCardText(prescription: PrescriptionAnalysisResult): string {
  const clinic = prescription.doctorSpecialtyOrClinic || 'Prescribed Regimen';
  const date = new Date().toLocaleDateString();

  let text = `==========================================================\n`;
  text += `THEPRESCRIPTION • OFFICIAL MEDICATION SCHEDULE\n`;
  text += `==========================================================\n`;
  text += `Clinic / Specialty: ${clinic}\n`;
  text += `Date Generated: ${date}\n`;

  if (prescription.suspectedCondition) {
    text += `Treatment Goal / Indication: ${prescription.suspectedCondition}\n`;
  }
  if (prescription.generalExplanation) {
    text += `Overview: ${prescription.generalExplanation}\n`;
  }

  text += `\n----------------------------------------------------------\n`;
  text += `PRESCRIBED MEDICINES (${prescription.medicines.length})\n`;
  text += `----------------------------------------------------------\n\n`;

  prescription.medicines.forEach((med, i) => {
    text += `${i + 1}. ${med.name.toUpperCase()}\n`;
    text += `   - Generic Salt: ${med.genericName}\n`;
    if (med.strength) text += `   - Strength: ${med.strength} (${med.form})\n`;
    text += `   - Dosage & Frequency: ${med.dosage} (${med.frequency})\n`;
    if (med.timingCode) text += `   - Medical Code: ${med.timingCode}\n`;
    text += `   - Meal Timing: ${med.mealRelationText} [${med.mealRelation}]\n`;
    text += `   - Duration: ${med.duration || 'As directed'}\n`;
    text += `   - Purpose: ${med.purposeAndUsage}\n\n`;
  });

  if (prescription.labTests && prescription.labTests.length > 0) {
    text += `----------------------------------------------------------\n`;
    text += `DIAGNOSTIC & LAB TESTS (${prescription.labTests.length})\n`;
    text += `----------------------------------------------------------\n\n`;
    prescription.labTests.forEach((test, i) => {
      text += `${i + 1}. ${test.testName} (${test.category})\n`;
      text += `   - Purpose: ${test.whyDoctorOrdered}\n`;
      if (test.preparationInstructions) {
        text += `   - Prep: ${test.preparationInstructions}\n`;
      }
      text += `\n`;
    });
  }

  if (prescription.potentialInteractionsOrSpacingAdvice.length > 0) {
    text += `----------------------------------------------------------\n`;
    text += `SAFETY & SPACING INSTRUCTIONS\n`;
    text += `----------------------------------------------------------\n`;
    prescription.potentialInteractionsOrSpacingAdvice.forEach((advice) => {
      text += `• ${advice}\n`;
    });
    text += `\n`;
  }

  text += `==========================================================\n`;
  text += `IMPORTANT MEDICAL NOTICE:\n`;
  text += `Always consult your prescribing doctor or dispensing pharmacist before making any changes.\n`;
  text += `==========================================================\n`;

  return text;
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
