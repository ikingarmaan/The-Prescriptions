import { createWorker } from 'tesseract.js';
import { runComprehensiveImagePreprocessing } from './imagePreprocessing';
import { ImagePreprocessingReport } from '../types';

export interface PreprocessResult {
  enhancedBase64: string;
  originalBase64: string;
  report?: ImagePreprocessingReport;
}

/**
 * Preprocesses an image with the full clinical image preprocessing suite:
 * - Noise removal: eliminates background dots, scanner grain, and paper texture
 * - Contrast enhancement: power-law ink deepening to make faint pen strokes dark and rich
 * - Deskewing: detects tilt angle via projection profile variance and straightens lines
 * - Adaptive thresholding: Bradley-Roth integral binarization for razor-sharp black-and-white
 * - Segmentation: identifies distinct lines and words instead of reading the whole page
 */
export async function enhanceHandwritingImage(
  dataUrl: string
): Promise<PreprocessResult> {
  try {
    const report = await runComprehensiveImagePreprocessing(dataUrl);
    return {
      enhancedBase64: report.enhancedImage,
      originalBase64: dataUrl,
      report,
    };
  } catch (err) {
    console.warn('Comprehensive preprocessing fallback to direct canvas:', err);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ enhancedBase64: dataUrl, originalBase64: dataUrl });
          return;
        }

        const maxDim = 1400;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const enhancedBase64 = canvas.toDataURL('image/jpeg', 0.88);
        resolve({ enhancedBase64, originalBase64: dataUrl });
      };
      img.onerror = () => resolve({ enhancedBase64: dataUrl, originalBase64: dataUrl });
      img.src = dataUrl;
    });
  }
}

// Singleton worker promise to avoid repeatedly downloading/initializing workers
let globalWorkerPromise: Promise<any> | null = null;

async function getSharedWorker() {
  if (!globalWorkerPromise) {
    globalWorkerPromise = createWorker('eng').catch((err) => {
      console.warn('Tesseract worker initialization error:', err);
      globalWorkerPromise = null;
      return null;
    });
  }
  return globalWorkerPromise;
}

/**
 * Runs client-side Tesseract OCR to extract preliminary text tokens
 * from the prescription image with a fast timeout to prevent blocking.
 */
export async function runTesseractOCR(
  imageSource: string,
  onProgress?: (progress: number, status: string) => void
): Promise<{ text: string; confidence: number }> {
  try {
    if (onProgress) onProgress(0.1, 'Extracting preliminary handwriting tokens...');

    // Wrap in a 4.5s timeout so OCR never delays the user experience
    const ocrPromise = (async () => {
      const worker = await getSharedWorker();
      if (!worker) return { text: '', confidence: 0 };

      if (onProgress) onProgress(0.5, 'Cross-referencing handwriting strokes...');
      const ret = await worker.recognize(imageSource);
      return {
        text: ret.data.text || '',
        confidence: ret.data.confidence || 0,
      };
    })();

    const timeoutPromise = new Promise<{ text: string; confidence: number }>((resolve) =>
      setTimeout(() => resolve({ text: '', confidence: 0 }), 4500)
    );

    const result = await Promise.race([ocrPromise, timeoutPromise]);
    if (onProgress) onProgress(1.0, 'Ready for clinical decryption.');
    return result;
  } catch (error) {
    console.warn('Tesseract OCR pass bypassed, using Vision API directly:', error);
    return { text: '', confidence: 0 };
  }
}
