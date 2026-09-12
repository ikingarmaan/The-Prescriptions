import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FloatingItem {
  id: string;
  type: 'syringe' | 'capsule' | 'tablet' | 'stethoscope' | 'ecg' | 'dna' | 'cross' | 'flask';
  baseX: number; // Percentage 0 - 100
  baseY: number; // Percentage 0 - 100
  size: number; // Pixels
  rotation: number; // Initial deg
  floatSpeed: number; // Seconds per cycle
  depth: number; // Parallax factor
  color: string;
  secondaryColor?: string;
}

const MEDICAL_ITEMS: FloatingItem[] = [
  // Top left region
  {
    id: 'syringe-1',
    type: 'syringe',
    baseX: 8,
    baseY: 12,
    size: 64,
    rotation: -35,
    floatSpeed: 6.2,
    depth: 0.045,
    color: '#0ea5e9',
    secondaryColor: '#38bdf8',
  },
  {
    id: 'capsule-1',
    type: 'capsule',
    baseX: 18,
    baseY: 28,
    size: 48,
    rotation: 45,
    floatSpeed: 5.4,
    depth: 0.035,
    color: '#10b981',
    secondaryColor: '#34d399',
  },
  // Top right region
  {
    id: 'tablet-1',
    type: 'tablet',
    baseX: 86,
    baseY: 14,
    size: 52,
    rotation: 20,
    floatSpeed: 7.1,
    depth: 0.04,
    color: '#6366f1',
    secondaryColor: '#818cf8',
  },
  {
    id: 'syringe-2',
    type: 'syringe',
    baseX: 92,
    baseY: 34,
    size: 68,
    rotation: 40,
    floatSpeed: 6.8,
    depth: 0.05,
    color: '#f43f5e',
    secondaryColor: '#fb7185',
  },
  // Middle flanks
  {
    id: 'dna-1',
    type: 'dna',
    baseX: 5,
    baseY: 48,
    size: 58,
    rotation: -15,
    floatSpeed: 8.0,
    depth: 0.03,
    color: '#06b6d4',
    secondaryColor: '#22d3ee',
  },
  {
    id: 'stethoscope-1',
    type: 'stethoscope',
    baseX: 90,
    baseY: 55,
    size: 62,
    rotation: -25,
    floatSpeed: 7.5,
    depth: 0.038,
    color: '#14b8a6',
    secondaryColor: '#2dd4bf',
  },
  {
    id: 'capsule-2',
    type: 'capsule',
    baseX: 14,
    baseY: 68,
    size: 50,
    rotation: -50,
    floatSpeed: 5.8,
    depth: 0.042,
    color: '#8b5cf6',
    secondaryColor: '#a78bfa',
  },
  // Bottom flanks
  {
    id: 'flask-1',
    type: 'flask',
    baseX: 84,
    baseY: 78,
    size: 56,
    rotation: 12,
    floatSpeed: 6.5,
    depth: 0.036,
    color: '#f59e0b',
    secondaryColor: '#fbbf24',
  },
  {
    id: 'cross-1',
    type: 'cross',
    baseX: 9,
    baseY: 88,
    size: 44,
    rotation: 0,
    floatSpeed: 5.2,
    depth: 0.025,
    color: '#10b981',
    secondaryColor: '#059669',
  },
  {
    id: 'ecg-1',
    type: 'ecg',
    baseX: 88,
    baseY: 92,
    size: 72,
    rotation: -5,
    floatSpeed: 6.0,
    depth: 0.03,
    color: '#3b82f6',
    secondaryColor: '#60a5fa',
  },
];

export function InteractiveMedicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [activeBounceId, setActiveBounceId] = useState<string | null>(null);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse coordinates normalized (-1 to 1 from center)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerItemReaction = useCallback((id: string) => {
    setActiveBounceId(id);
    setTimeout(() => {
      setActiveBounceId((current) => (current === id ? null : current));
    }, 700);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Medical High-Tech Background Canvas Grid */}
      <div className="absolute inset-0 bg-slate-50/70" />

      {/* Subtle Clinical Dot Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 0.85px, transparent 0.85px), radial-gradient(#cbd5e1 0.85px, #f8fafc 0.85px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
      />

      {/* 2. Soft Ambient Fluid Medical Light Orbs (Cyan, Emerald, Sapphire, Amethyst) */}
      <div
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-emerald-300/15 blur-[120px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-300/15 blur-[110px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)`,
        }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-300/15 blur-[130px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * -25}px, 0)`,
        }}
      />

      {/* 3. Floating Medical Entities (Syringes, Injections, Pills, Stethoscopes) */}
      {MEDICAL_ITEMS.map((item, index) => {
        // Calculate coordinate in pixels
        const itemPixelX = (item.baseX / 100) * windowSize.width;
        const itemPixelY = (item.baseY / 100) * windowSize.height;

        // Parallax offset relative to mouse center
        const parallaxX = mousePos.x * windowSize.width * item.depth * 0.45;
        const parallaxY = mousePos.y * windowSize.height * item.depth * 0.45;

        // Proximity repulsion: if mouse is near the item, gently push it away
        const mousePixelX = ((mousePos.x + 1) / 2) * windowSize.width;
        const mousePixelY = ((mousePos.y + 1) / 2) * windowSize.height;
        const dx = itemPixelX - mousePixelX;
        const dy = itemPixelY - mousePixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;
        let repelX = 0;
        let repelY = 0;

        if (distance < repelRadius && distance > 0) {
          const force = (1 - distance / repelRadius) * 28;
          repelX = (dx / distance) * force;
          repelY = (dy / distance) * force;
        }

        const isBouncing = activeBounceId === item.id;
        const floatAnimClass = index % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse';

        return (
          <div
            key={item.id}
            className="absolute pointer-events-auto cursor-pointer group will-change-transform transition-transform duration-300 ease-out"
            style={{
              left: `${item.baseX}%`,
              top: `${item.baseY}%`,
              transform: `translate3d(${parallaxX + repelX}px, ${parallaxY + repelY}px, 0) translate(-50%, -50%) scale(${
                isBouncing ? 1.35 : 1
              })`,
            }}
            onClick={() => triggerItemReaction(item.id)}
            onMouseEnter={() => triggerItemReaction(item.id)}
            title="Interactive Medical Item • Click or Hover"
          >
            <div
              className={`relative ${floatAnimClass} opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:scale-115 group-hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.4)]`}
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                transform: `rotate(${item.rotation + (isBouncing ? 360 : 0)}deg)`,
                transition: isBouncing ? 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.3s ease',
              }}
            >
              {renderMedicalSvg(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Render crisp, custom-crafted medical vector SVG graphics
function renderMedicalSvg(item: FloatingItem) {
  switch (item.type) {
    case 'syringe':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Syringe Needle */}
          <line x1="16" y1="84" x2="32" y2="68" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Needle Hub */}
          <rect x="29" y="65" width="8" height="6" rx="1.5" transform="rotate(-45 29 65)" fill="#64748b" />
          {/* Syringe Barrel (Transparent Glass Chamber) */}
          <rect
            x="32"
            y="26"
            width="22"
            height="46"
            rx="5"
            transform="rotate(-45 32 26)"
            fill="white"
            fillOpacity="0.82"
            stroke={item.color}
            strokeWidth="3"
          />
          {/* Medicine Liquid Fill inside Barrel */}
          <rect
            x="34"
            y="42"
            width="18"
            height="26"
            rx="3"
            transform="rotate(-45 34 42)"
            fill={item.color}
            fillOpacity="0.38"
          />
          {/* Graduation Marks (Measurement lines) */}
          <line x1="42" y1="44" x2="47" y2="40" stroke={item.color} strokeWidth="2" strokeLinecap="round" />
          <line x1="47" y1="49" x2="52" y2="45" stroke={item.color} strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="54" x2="57" y2="50" stroke={item.color} strokeWidth="2" strokeLinecap="round" />
          {/* Plunger Stopper */}
          <rect x="52" y="16" width="12" height="4" rx="1" transform="rotate(-45 52 16)" fill={item.color} />
          {/* Plunger Shaft */}
          <line x1="56" y1="20" x2="72" y2="4" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          {/* Plunger Thumb Flange Top */}
          <line x1="68" y1="0" x2="76" y2="8" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {/* Finger Grip Flange on barrel */}
          <line x1="55" y1="23" x2="63" y2="31" stroke={item.color} strokeWidth="3.5" strokeLinecap="round" />
          {/* Air Bubble Accent */}
          <circle cx="44" cy="56" r="1.5" fill="white" fillOpacity="0.9" />
        </svg>
      );

    case 'capsule':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(50,50) rotate(45) translate(-50,-50)">
            {/* Top Half of Capsule (Colored Cap) */}
            <path
              d="M34 50 L34 32 A16 16 0 0 1 66 32 L66 50 Z"
              fill={item.color}
              fillOpacity="0.85"
              stroke={item.color}
              strokeWidth="2.5"
            />
            {/* Bottom Half of Capsule (Transparent/Secondary Body) */}
            <path
              d="M34 50 L34 68 A16 16 0 0 0 66 68 L66 50 Z"
              fill={item.secondaryColor || 'white'}
              fillOpacity="0.75"
              stroke={item.color}
              strokeWidth="2.5"
            />
            {/* Dividing Seam Band */}
            <line x1="33" y1="50" x2="67" y2="50" stroke="#ffffff" strokeWidth="2.5" />
            {/* 3D Gloss Highlight Sheen */}
            <path
              d="M40 24 A10 10 0 0 1 48 20"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <line x1="40" y1="32" x2="40" y2="60" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
          </g>
        </svg>
      );

    case 'tablet':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tablet Body (Round Pill) */}
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="white"
            fillOpacity="0.85"
            stroke={item.color}
            strokeWidth="3.5"
          />
          {/* Debossed Score Line (Break Groove) */}
          <line
            x1="50"
            y1="22"
            x2="50"
            y2="78"
            stroke={item.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
          {/* Debossed Cross Score Line */}
          <line
            x1="22"
            y1="50"
            x2="78"
            y2="50"
            stroke={item.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {/* Inner Bevel Ring */}
          <circle cx="50" cy="50" r="28" stroke={item.color} strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
          {/* Top Sheen */}
          <path d="M34 26 A28 28 0 0 1 66 26" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        </svg>
      );

    case 'stethoscope':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Binaural Ear Tubes */}
          <path
            d="M32 20 L32 35 C32 46 44 54 50 54 C56 54 68 46 68 35 L68 20"
            stroke={item.color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Earpieces */}
          <circle cx="32" cy="18" r="3.5" fill={item.color} />
          <circle cx="68" cy="18" r="3.5" fill={item.color} />
          {/* Flexible Yoke / Tube down to chestpiece */}
          <path
            d="M50 54 L50 64 C50 74 62 82 72 74 C78 68 76 60 76 56"
            stroke={item.color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Chestpiece Diaphragm */}
          <circle cx="76" cy="52" r="9" fill="white" stroke={item.color} strokeWidth="3" />
          <circle cx="76" cy="52" r="4" fill={item.color} />
        </svg>
      );

    case 'dna':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DNA Strand 1 */}
          <path
            d="M30 18 C45 32 55 32 70 18 M30 42 C45 28 55 28 70 42 M30 66 C45 80 55 80 70 66 M30 90 C45 76 55 76 70 90"
            stroke={item.color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Base Pair Rungs */}
          <line x1="38" y1="28" x2="62" y2="28" stroke={item.secondaryColor || item.color} strokeWidth="2.5" />
          <line x1="42" y1="52" x2="58" y2="52" stroke={item.secondaryColor || item.color} strokeWidth="2.5" />
          <line x1="38" y1="76" x2="62" y2="76" stroke={item.secondaryColor || item.color} strokeWidth="2.5" />
          {/* Molecular Node Spheres */}
          <circle cx="38" cy="28" r="3" fill={item.color} />
          <circle cx="62" cy="28" r="3" fill={item.color} />
          <circle cx="42" cy="52" r="3" fill={item.secondaryColor || item.color} />
          <circle cx="58" cy="52" r="3" fill={item.secondaryColor || item.color} />
          <circle cx="38" cy="76" r="3" fill={item.color} />
          <circle cx="62" cy="76" r="3" fill={item.color} />
        </svg>
      );

    case 'cross':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Protective Shield / Badge */}
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="16"
            fill="white"
            fillOpacity="0.8"
            stroke={item.color}
            strokeWidth="3"
          />
          {/* Medical Plus Cross */}
          <path
            d="M44 32 H56 V44 H68 V56 H56 V68 H44 V56 H32 V44 H44 Z"
            fill={item.color}
            fillOpacity="0.85"
          />
        </svg>
      );

    case 'ecg':
      return (
        <svg
          viewBox="0 0 120 80"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cardiac Rhythm Line */}
          <path
            d="M10 40 H35 L42 24 L50 56 L58 12 L66 64 L74 34 L80 44 H110"
            stroke={item.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pulsing Light Point at Peak */}
          <circle cx="58" cy="12" r="4" fill={item.color} />
        </svg>
      );

    case 'flask':
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Conical Flask Neck */}
          <path d="M42 20 H58 V36 L76 72 A6 6 0 0 1 70 80 H30 A6 6 0 0 1 24 72 L42 36 Z" fill="white" fillOpacity="0.8" stroke={item.color} strokeWidth="3" />
          {/* Flask Rim */}
          <rect x="40" y="16" width="20" height="4" rx="2" fill={item.color} />
          {/* Liquid Fill */}
          <path d="M30 64 L36 52 H64 L70 64 A6 6 0 0 1 66 76 H34 A6 6 0 0 1 30 64 Z" fill={item.color} fillOpacity="0.4" />
          {/* Effervescent Bubbles */}
          <circle cx="48" cy="62" r="2.5" fill="white" />
          <circle cx="56" cy="68" r="2" fill="white" />
          <circle cx="42" cy="70" r="1.5" fill="white" />
        </svg>
      );

    default:
      return null;
  }
}
