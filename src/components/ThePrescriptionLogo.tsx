import React from 'react';

interface ThePrescriptionLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  light?: boolean;
}

export const ThePrescriptionLogo: React.FC<ThePrescriptionLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  light = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Creative Custom AI Medical Tech Emblem */}
      <div
        className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-0.5 shadow-md shadow-emerald-700/20 flex items-center justify-center shrink-0 group transition-transform hover:scale-105`}
      >
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-slate-900/90 to-emerald-950/95 flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle glowing background radar grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.35),transparent_70%)]" />
          
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-emerald-400 relative z-10 filter drop-shadow-[0_1px_4px_rgba(16,185,129,0.5)]"
          >
            {/* Precision Lens Ring Outer */}
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="url(#emblem-grad)"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeOpacity="0.7"
            />

            {/* Stylized Modern 'Rx' + Medical Cross Fusion */}
            {/* The 'R' Stem & Loop */}
            <path
              d="M14 12V34M14 13H24C27.3137 13 30 15.6863 30 19C30 22.3137 27.3137 25 24 25H14"
              stroke="url(#rx-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* The 'x' diagonal tail intersecting gracefully */}
            <path
              d="M21 24L33 36"
              stroke="url(#rx-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M23.5 35L31.5 27"
              stroke="#5eead4"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Glowing Focal Aperture / Medical Dot */}
            <circle cx="34" cy="14" r="3.5" fill="#34d399" />
            <circle cx="34" cy="14" r="1.5" fill="#ffffff" />

            <defs>
              <linearGradient id="emblem-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="0.5" stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="rx-grad" x1="14" y1="12" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#a7f3d0" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${textSize} ${
                light ? 'text-white' : 'text-slate-900'
              }`}
            >
              The<span className="text-emerald-600">prescription</span>
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 shadow-2xs">
              Rx AI
            </span>
          </div>
          <span className={`text-[11px] leading-none hidden sm:block ${light ? 'text-slate-400' : 'text-slate-500'}`}>
            Clinical Handwriting Deciphering & Safety
          </span>
        </div>
      )}
    </div>
  );
};
