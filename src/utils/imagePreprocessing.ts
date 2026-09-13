import { ImagePreprocessingReport, SegmentedLine, WordToken } from '../types';

/**
 * Creates an SVG sample image encoded as data URL for previews.
 */
function createSyntheticPrescriptionDataUrl(title: string, lines: string[]): string {
  const width = 800;
  const height = 600;

  const lineElements = lines
    .map(
      (line, i) =>
        `<text x="60" y="${180 + i * 50}" font-family="cursive, 'Brush Script MT', sans-serif" font-size="24" fill="#1e293b" opacity="0.85">${escapeXml(line)}</text>`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="#f8fafc" />
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <line x1="40" y1="100" x2="${width - 40}" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4" />
    <text x="60" y="70" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">℞ Clinical Prescription</text>
    <text x="60" y="130" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#059669">${escapeXml(title)}</text>
    ${lineElements}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Creates a structured sample preprocessing report for interactive UI demonstration.
 */
export function createSamplePreprocessingReport(
  title: string,
  medicineNames: string[] = []
): ImagePreprocessingReport {
  const displayNames =
    medicineNames.length > 0
      ? medicineNames
      : ['Augmentin 625 1-0-1', 'Pantocid 40 1-0-0 AC', 'Montair-LC HS', 'Dolo 650 SOS'];

  const sampleDataUrl = createSyntheticPrescriptionDataUrl(title, displayNames);

  const lines: SegmentedLine[] = displayNames.map((name, idx) => {
    const words = name.split(/\s+/).filter(Boolean);
    const startY = 160 + idx * 50;

    const wordTokens: WordToken[] = words.map((w, wIdx) => ({
      id: `line-${idx}-word-${wIdx}`,
      text: w,
      confidence: 97 + ((wIdx * 3) % 4),
      box: {
        x: 60 + wIdx * 90,
        y: startY,
        width: 80,
        height: 32,
      },
    }));

    return {
      id: `line-${idx}`,
      lineIndex: idx + 1,
      recognizedText: name,
      box: {
        x: 50,
        y: startY - 5,
        width: Math.max(300, words.length * 95),
        height: 42,
      },
      words: wordTokens,
      lineImageBase64: sampleDataUrl,
    };
  });

  const totalWords = lines.reduce((acc, l) => acc + l.words.length, 0);

  return {
    originalImage: sampleDataUrl,
    enhancedImage: sampleDataUrl,
    deskewedImage: sampleDataUrl,
    adaptiveBinarizedImage: sampleDataUrl,
    skewAngle: -0.4,
    contrastEnhancementFactor: 1.8,
    totalLinesDetected: lines.length,
    totalWordsDetected: totalWords,
    canvasWidth: 800,
    canvasHeight: 600,
    lines,
  };
}

/**
 * In-browser canvas preprocessor to enhance photo contrast and reduce camera glare.
 */
export async function preprocessPrescriptionCanvas(
  dataUrl: string
): Promise<{ enhancedDataUrl: string; skewAngle: number }> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.document) {
      resolve({ enhancedDataUrl: dataUrl, skewAngle: 0.0 });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ enhancedDataUrl: dataUrl, skewAngle: 0.0 });
          return;
        }

        ctx.drawImage(img, 0, 0);

        // Adjust contrast and ink density
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        const contrast = 25; // boost factor
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < d.length; i += 4) {
          d[i] = factor * (d[i] - 128) + 128;
          d[i + 1] = factor * (d[i + 1] - 128) + 128;
          d[i + 2] = factor * (d[i + 2] - 128) + 128;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve({ enhancedDataUrl: canvas.toDataURL('image/jpeg', 0.92), skewAngle: 0.0 });
      } catch {
        resolve({ enhancedDataUrl: dataUrl, skewAngle: 0.0 });
      }
    };
    img.onerror = () => resolve({ enhancedDataUrl: dataUrl, skewAngle: 0.0 });
    img.src = dataUrl;
  });
}
