/**
 * OCR Helper Service for optical character extraction.
 */

export interface OcrExtractionResult {
  text: string;
  confidence: number;
}

export async function extractOcrTextSimple(imageBase64: string): Promise<OcrExtractionResult> {
  // Placeholder service returning ready state for multimodal Gemini processing
  return {
    text: imageBase64 ? 'Prescription image prepared for clinical OCR analysis.' : '',
    confidence: 95.0,
  };
}
