import React from 'react';

export interface ThePrescriptionLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showBadge?: boolean;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const ThePrescriptionLogo: React.FC<ThePrescriptionLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showBadge = true,
  showSubtitle = false,
  variant = 'light',
  className = '',
  onClick,
}) => {
  // Dimensions for the icon emblem based on size
  const iconSizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }[size];

  const wordmarkSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-transform active:scale-[0.99] ${className}`}
    >
      {/* Precision Rx Emblem Icon */}
      <div className={`relative shrink-0 ${iconSizeClasses} drop-shadow-xs`}>
        <svg
          viewBox="0 0 72 72"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="brand-emblem-grad"
              x1="4"
              y1="4"
              x2="68"
              y2="68"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#34d399" />
              <stop offset="0.5" stopColor="#2dd4bf" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient
              id="brand-rx-grad"
              x1="14"
              y1="12"
              x2="54"
              y2="58"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#a7f3d0" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient
              id="brand-bg-grad"
              x1="0"
              y1="0"
              x2="72"
              y2="72"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#022c22" />
            </linearGradient>
            <filter id="brand-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#10b981"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          {/* Background rounded squircle */}
          <rect width="72" height="72" rx="20" fill="url(#brand-bg-grad)" />
          <rect
            width="72"
            height="72"
            rx="20"
            fill="none"
            stroke="url(#brand-emblem-grad)"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Ambient glow accent rings */}
          <circle cx="30" cy="27" r="21" fill="#34d399" fillOpacity="0.12" />
          <circle
            cx="36"
            cy="36"
            r="27"
            stroke="url(#brand-emblem-grad)"
            strokeWidth="2.5"
            strokeDasharray="5 3"
            strokeOpacity="0.75"
          />

          {/* Stylized 'R' Stem & Loop */}
          <path
            d="M23 20V52M23 21H37C41.5 21 45 24.5 45 29C45 33.5 41.5 37 37 37H23"
            stroke="url(#brand-rx-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#brand-glow)"
          />

          {/* 'x' diagonal tail */}
          <path
            d="M33 36L49.5 52.5"
            stroke="url(#brand-rx-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#brand-glow)"
          />

          {/* 'x' cross stroke */}
          <path
            d="M36 51L47 40"
            stroke="#5eead4"
            strokeWidth="3.8"
            strokeLinecap="round"
          />

          {/* Glowing Aperture / Medical Focal Dot */}
          <circle cx="51" cy="21" r="4.8" fill="#34d399" filter="url(#brand-glow)" />
          <circle cx="51" cy="21" r="2" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${wordmarkSizeClasses}`}>
              <span className={variant === 'dark' ? 'text-white drop-shadow-sm' : 'text-slate-900 dark:text-white'}>
                The
              </span>
              <span
                className={
                  variant === 'dark'
                    ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                    : 'text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                }
              >
                prescription
              </span>
            </span>

            {showBadge && (
              <span
                className={`px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border shadow-xs ${
                  variant === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
                    : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40'
                }`}
              >
                Rx AI
              </span>
            )}
          </div>

          {showSubtitle && (
            <span
              className={`text-[10px] sm:text-xs font-medium tracking-tight mt-0.5 ${
                variant === 'dark' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Clinical Handwriting Deciphering &amp; Safety
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ThePrescriptionLogo;
