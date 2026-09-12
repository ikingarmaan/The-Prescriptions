import React, { useEffect, useState, useRef } from 'react';

export function GlowingCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Trailing smooth position using RAF
  const targetPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const currentPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-medical-item') ||
          target.closest('.cursor-pointer');
        setIsHovered(Boolean(isInteractive));
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth animation loop for the trailing glow
    const animate = () => {
      // Linear interpolation for smooth trailing physics
      const ease = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary Ambient Aura Glow (Large Soft Light) */}
      <div
        className="absolute rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.45 : 1
          })`,
          width: '90px',
          height: '90px',
          background: isHovered
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.2) 45%, rgba(59, 130, 246, 0) 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(16, 185, 129, 0.15) 45%, rgba(99, 102, 241, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Secondary Concentric Ring (Precision Scanner Reticle Ring) */}
      <div
        className="absolute rounded-full border border-teal-400/40 transition-all duration-150 ease-out will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.6 : isHovered ? 1.3 : 1
          })`,
          width: isHovered ? '46px' : '32px',
          height: isHovered ? '46px' : '32px',
          borderColor: isHovered ? 'rgba(16, 185, 129, 0.7)' : 'rgba(14, 165, 233, 0.5)',
          boxShadow: isHovered
            ? '0 0 14px rgba(16, 185, 129, 0.4), inset 0 0 8px rgba(16, 185, 129, 0.2)'
            : '0 0 10px rgba(14, 165, 233, 0.3)',
        }}
      />

      {/* Center Medical Crosshair / Glowing Core Point */}
      <div
        className="absolute rounded-full will-change-transform transition-all duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 1.6 : isHovered ? 1.2 : 1
          })`,
          width: '6px',
          height: '6px',
          backgroundColor: isHovered ? '#10b981' : '#0ea5e9',
          boxShadow: isHovered
            ? '0 0 8px 2px rgba(16, 185, 129, 0.9)'
            : '0 0 8px 2px rgba(14, 165, 233, 0.9)',
        }}
      />
    </div>
  );
}
