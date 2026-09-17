import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode (Ctrl/Cmd+D)' : 'Switch to Dark Mode (Ctrl/Cmd+D)'}
      className={`group relative inline-flex items-center justify-center gap-2 p-2 sm:px-2.5 sm:py-2 rounded-xl transition-all duration-200 cursor-pointer min-h-[40px] min-w-[40px] select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700/80 text-amber-300 border border-slate-700 shadow-xs active:bg-slate-700'
          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 shadow-2xs active:bg-slate-200'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode with spin animation on click) */}
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute inset-0 text-amber-400 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
        {/* Moon Icon (shown in light mode with subtle tilt) */}
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute inset-0 text-slate-700 group-hover:text-emerald-700 ${
            isDark ? 'opacity-0 rotate-90 scale-50 pointer-events-none' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold leading-none">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
