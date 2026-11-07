import React from "react";

export interface SocialMediaChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  category: string;
  colorHex: string;
  textColor: string;
  bgGlass: string;
  borderColor: string;
  hoverBg: string;
  hoverBorder: string;
  hoverShadow: string;
  icon: (props: { className?: string }) => React.ReactElement;
}

export const SOCIAL_CHANNELS: SocialMediaChannel[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@theprescriptionn",
    url: "https://www.instagram.com/theprescriptionn/",
    category: "Visual Guides & Infographics",
    colorHex: "#E1306C",
    textColor: "text-[#E1306C] dark:text-[#f77737]",
    bgGlass: "bg-[#E1306C]/10 dark:bg-[#E1306C]/15",
    borderColor: "border-[#E1306C]/30 dark:border-[#E1306C]/40",
    hoverBg: "hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
    hoverBorder: "hover:border-[#E1306C]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]",
    icon: ({ className = "w-4 h-4" }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "in/theprescription",
    url: "https://www.linkedin.com/in/theprescription",
    category: "Professional & Clinical",
    colorHex: "#0A66C2",
    textColor: "text-[#0A66C2] dark:text-[#388bfd]",
    bgGlass: "bg-[#0A66C2]/10 dark:bg-[#0A66C2]/15",
    borderColor: "border-[#0A66C2]/30 dark:border-[#0A66C2]/40",
    hoverBg: "hover:bg-[#0A66C2] hover:text-white",
    hoverBorder: "hover:border-[#0A66C2]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]",
    icon: ({ className = "w-4 h-4" }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    id: "substack",
    name: "Substack",
    handle: "@theprescriptionn",
    url: "https://substack.com/@theprescriptionn",
    category: "Newsletter & Research",
    colorHex: "#FF6719",
    textColor: "text-[#FF6719] dark:text-[#ff813f]",
    bgGlass: "bg-[#FF6719]/10 dark:bg-[#FF6719]/15",
    borderColor: "border-[#FF6719]/30 dark:border-[#FF6719]/40",
    hoverBg: "hover:bg-[#FF6719] hover:text-white",
    hoverBorder: "hover:border-[#FF6719]",
    hoverShadow: "hover:shadow-[0_0_15px_rgba(255,103,25,0.4)]",
    icon: ({ className = "w-4 h-4" }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    ),
  },
];

interface SocialLinksProps {
  variant?: "icons-only" | "compact-row" | "cards-grid" | "pills";
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = "icons-only",
  className = "",
  size = "md",
  showLabels = false,
}) => {
  const sizeClasses = {
    sm: {
      btn: "w-8 h-8 rounded-lg",
      icon: "w-3.5 h-3.5",
    },
    md: {
      btn: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
      icon: "w-4 h-4 sm:w-4.5 sm:h-4.5",
    },
    lg: {
      btn: "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl",
      icon: "w-5 h-5",
    },
  }[size];

  // 1. CARDS GRID VARIANT (Ideal for Contact Page & About Page)
  if (variant === "cards-grid") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {SOCIAL_CHANNELS.map((ch) => (
          <a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${ch.name} (${ch.handle})`}
            className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-md cursor-pointer flex items-center gap-3 overflow-hidden ${ch.hoverBorder}`}
          >
            {/* Subtle Glow Accent */}
            <div
              className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
              style={{ backgroundColor: ch.colorHex }}
            />

            {/* Icon Bubble */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-110 ${ch.bgGlass} ${ch.borderColor} ${ch.textColor}`}
            >
              <ch.icon className="w-5 h-5" />
            </div>

            {/* Text & Handle */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {ch.name}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {ch.category.split(" ")[0]}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                {ch.handle}
              </p>
            </div>

            {/* Arrow */}
            <div className="text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // 2. PILLS VARIANT (For Contact Page compact list)
  if (variant === "pills") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {SOCIAL_CHANNELS.map((ch) => (
          <a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Theprescription on ${ch.name} (${ch.handle})`}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-2xs ${ch.bgGlass} ${ch.borderColor} ${ch.textColor} ${ch.hoverBg} ${ch.hoverBorder} ${ch.hoverShadow}`}
          >
            <ch.icon className="w-4 h-4 shrink-0" />
            <span>{ch.name}</span>
          </a>
        ))}
      </div>
    );
  }

  // 3. ICONS ONLY & COMPACT ROW (Ideal for Footers & Mobile Nav)
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {SOCIAL_CHANNELS.map((ch) => (
        <a
          key={ch.id}
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Theprescription on ${ch.name} (${ch.handle})`}
          title={`${ch.name} • ${ch.handle}`}
          className={`group relative inline-flex items-center justify-center border backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-2xs hover:scale-110 active:scale-95 ${sizeClasses.btn} ${ch.bgGlass} ${ch.borderColor} ${ch.textColor} ${ch.hoverBg} ${ch.hoverBorder} ${ch.hoverShadow}`}
        >
          <ch.icon className={sizeClasses.icon} />

          {showLabels && (
            <span className="text-xs font-bold ml-2 hidden sm:inline">
              {ch.name}
            </span>
          )}

          {/* Simple Tooltip on Desktop */}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap shadow-lg z-50">
            {ch.name}
          </span>
        </a>
      ))}
    </div>
  );
};
