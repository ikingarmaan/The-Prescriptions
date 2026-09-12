import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Crop,
  Sliders,
  CheckCircle2,
  Maximize2,
  Eye,
  RotateCw,
  Compass,
  FileSearch,
  Grid,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ImagePreprocessingReport } from '../types';

interface ImagePreprocessingViewerProps {
  report: ImagePreprocessingReport;
  className?: string;
}

type ViewMode = 'enhanced' | 'deskewed' | 'binary' | 'segmentation' | 'original';

export const ImagePreprocessingViewer: React.FC<ImagePreprocessingViewerProps> = ({
  report,
  className = '',
}) => {
  const [activeMode, setActiveMode] = useState<ViewMode>('segmentation');
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);
  const [showWordBoxes, setShowWordBoxes] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Determine current image source
  const getDisplayImage = () => {
    switch (activeMode) {
      case 'original':
        return report.originalImage;
      case 'binary':
        return report.adaptiveBinarizedImage;
      case 'deskewed':
        return report.deskewedImage;
      case 'enhanced':
        return report.enhancedImage;
      case 'segmentation':
      default:
        return report.deskewedImage || report.enhancedImage;
    }
  };

  return (
    <div
      id="image-preprocessing-viewer"
      className={`bg-white rounded-2xl border-2 border-indigo-200/90 shadow-sm overflow-hidden transition-all ${className}`}
    >
      {/* Top Chromatic Accent */}
      <div className="h-1.5 w-full bg-linear-to-r from-teal-500 via-indigo-500 to-purple-500" />

      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                Image Preprocessing Suite
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Deskewed: {report.skewAngle > 0 ? `+${report.skewAngle}` : report.skewAngle}°
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {report.totalLinesDetected} Lines • {report.totalWordsDetected} Words
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              Pre-OCR Image Cleaning & Segmentation
            </h3>
            <p className="text-xs text-indigo-200/80 max-w-2xl leading-relaxed">
              Messy doctor handwriting is cleaned, ink is deepened, tilted lines are deskewed,
              and individual text lines and words are isolated before character recognition.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Feature Pills */}
        {isExpanded && (
          <div className="mt-4 pt-3.5 border-t border-indigo-900/60 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2">
              <div className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Filtered
              </div>
              <div className="text-[10px] text-slate-300">Noise Removed</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2">
              <div className="text-teal-300 font-bold">
                {report.contrastEnhancementFactor}x Boost
              </div>
              <div className="text-[10px] text-slate-300">Ink Contrast</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2">
              <div className="text-indigo-300 font-bold">
                {Math.abs(report.skewAngle) < 0.2 ? '0.0° (Level)' : `${report.skewAngle}°`}
              </div>
              <div className="text-[10px] text-slate-300">Deskew Angle</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2">
              <div className="text-purple-300 font-bold">
                Adaptive B&W
              </div>
              <div className="text-[10px] text-slate-300">Bradley Integral</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2 col-span-2 sm:col-span-1">
              <div className="text-amber-300 font-bold">
                {report.totalLinesDetected} Lines / {report.totalWordsDetected} W
              </div>
              <div className="text-[10px] text-slate-300">Segmentation</div>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveMode('segmentation')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'segmentation'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Line & Word Overlay</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('enhanced')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'enhanced'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Denoised & Dark Ink</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('deskewed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'deskewed'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Deskewed ({report.skewAngle}°)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('binary')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'binary'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>Adaptive B&W</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('original')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'original'
                    ? 'bg-slate-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Original</span>
              </button>
            </div>

            {/* Toggle word boxes in segmentation mode */}
            {activeMode === 'segmentation' && (
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showWordBoxes}
                  onChange={(e) => setShowWordBoxes(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>Highlight Word Tokens</span>
              </label>
            )}
          </div>

          {/* Canvas Display Viewport */}
          <div className="relative border border-slate-300 rounded-xl overflow-hidden bg-slate-900 shadow-inner max-h-[520px] flex items-center justify-center p-2">
            <div className="relative inline-block max-w-full max-h-[500px]">
              <img
                src={getDisplayImage()}
                alt="Preprocessed prescription view"
                className="max-h-[480px] max-w-full object-contain rounded-lg block mx-auto select-none"
                referrerPolicy="no-referrer"
              />

              {/* Segmentation Bounding Boxes Overlay */}
              {activeMode === 'segmentation' && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 ${report.canvasWidth || 1000} ${report.canvasHeight || 1000}`}
                  preserveAspectRatio="none"
                >
                  {report.lines.map((line, lIdx) => {
                    const isSelected = selectedLineIndex === lIdx;
                    return (
                      <g key={line.id}>
                        {/* Line boundary rectangle */}
                        <rect
                          x={line.box.x}
                          y={line.box.y}
                          width={line.box.width}
                          height={line.box.height}
                          fill={
                            isSelected
                              ? 'rgba(99, 102, 241, 0.18)'
                              : 'rgba(59, 130, 246, 0.08)'
                          }
                          stroke={isSelected ? '#4F46E5' : '#3B82F6'}
                          strokeWidth={isSelected ? 3 : 1.5}
                          strokeDasharray={isSelected ? 'none' : '4 2'}
                          rx={4}
                        />
                        {/* Line indicator tag */}
                        <rect
                          x={line.box.x}
                          y={Math.max(0, line.box.y - 14)}
                          width={26}
                          height={14}
                          fill="#3B82F6"
                          rx={3}
                        />
                        <text
                          x={line.box.x + 4}
                          y={Math.max(10, line.box.y - 3)}
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="bold"
                        >
                          L{line.lineIndex}
                        </text>

                        {/* Word token boundaries */}
                        {showWordBoxes &&
                          line.words.map((word) => (
                            <rect
                              key={word.id}
                              x={word.box.x}
                              y={word.box.y}
                              width={word.box.width}
                              height={word.box.height}
                              fill="rgba(16, 185, 129, 0.12)"
                              stroke="#10B981"
                              strokeWidth={1}
                              rx={2}
                            />
                          ))}
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Mode badge watermark */}
            <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/20 pointer-events-none">
              Mode:{' '}
              {activeMode === 'segmentation'
                ? 'Line & Word Segmentation'
                : activeMode === 'enhanced'
                ? 'Denoised & Contrast Ink Boost'
                : activeMode === 'deskewed'
                ? `Deskewed (${report.skewAngle}° Straightened)`
                : activeMode === 'binary'
                ? 'Adaptive Sharp Black & White'
                : 'Raw Camera Original'}
            </div>
          </div>

          {/* Segmented Line Crops Carousel / Inspector */}
          {report.lines.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                <span>Segmented Handwriting Lines ({report.lines.length})</span>
                <span className="text-[11px] font-normal text-slate-400">
                  Click a line to inspect cropped pen strokes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {report.lines.map((line, idx) => {
                  const isSelected = selectedLineIndex === idx;
                  return (
                    <button
                      key={line.id}
                      type="button"
                      onClick={() =>
                        setSelectedLineIndex(isSelected ? null : idx)
                      }
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          Line #{line.lineIndex}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {line.words.length} Words
                        </span>
                      </div>

                      {/* Line thumbnail snippet */}
                      {line.lineImageBase64 ? (
                        <div className="h-10 bg-white border border-slate-200 rounded-md overflow-hidden flex items-center justify-center p-1">
                          <img
                            src={line.lineImageBase64}
                            alt={`Line ${line.lineIndex}`}
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="h-8 bg-slate-100 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-mono">
                          Y: {line.box.y}px - {line.box.y + line.box.height}px
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
