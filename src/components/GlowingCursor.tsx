import React, { useEffect, useState, useRef } from 'react';

export function GlowingCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOverTextInput, setIsOverTextInput] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Trailing smooth position using RAF
  const targetPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const currentPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if touch device or virtual environment where pointer media query is unsupported
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        if (window.matchMedia('(pointer: coarse)').matches) {
          setIsTouchDevice(true);
          return;
        }
      }
    } catch {
      // Safely ignore media query errors on enterprise/VDI systems
    }

    const onMouseMove = (e: MouseEvent) => {
      try {
        targetPos.current = { x: e.clientX, y: e.clientY };
        if (!isVisible) setIsVisible(true);

        // Moving the mouse restores normal cursor characteristics
        setIsTyping(false);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Check target element types safely
        const target = e.target as HTMLElement | null;
        if (target && typeof target.closest === 'function') {
          // Check if hovering over a text input or editable area
          const textInput =
            target.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"])') ||
            target.closest('textarea') ||
            target.closest('[contenteditable="true"]');
          setIsOverTextInput(Boolean(textInput));

          // Check if hovering interactive element (buttons, links, clickable items)
          const isInteractive =
            target.closest('button') ||
            target.closest('a') ||
            target.closest('select') ||
            target.closest('[role="button"]') ||
            target.closest('.interactive-medical-item') ||
            target.closest('.cursor-pointer');
          setIsHovered(Boolean(isInteractive) && !textInput);
        }
      } catch {
        // Ignore inspection errors
      }
    };

    // When the user types on the app, hide distracting cursor characteristics (reticle ring, core dot)
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore solitary modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        return;
      }

      setIsTyping(true);

      // Auto-reset typing state after 2 seconds of inactivity if mouse hasn't moved
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth animation loop for the trailing glow
    const animate = () => {
      const ease = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    try {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('keydown', onKeyDown, { passive: true });
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);

      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        requestRef.current = requestAnimationFrame(animate);
      }
    } catch {
      // Ignore listener attachment failures in restricted security sandboxes
    }

    return () => {
      try {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mouseenter', onMouseEnter);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        if (requestRef.current && typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
          cancelAnimationFrame(requestRef.current);
        }
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // When typing or hovering text inputs, hide the center dot and precision ring
  const shouldHideCharacteristics = isTyping || isOverTextInput;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary Ambient Aura Glow (Large Soft Light) */}
      <div
        className="absolute rounded-full transition-all duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.45 : shouldHideCharacteristics ? 0.6 : 1
          })`,
          width: '90px',
          height: '90px',
          opacity: isTyping ? 0 : shouldHideCharacteristics ? 0.2 : 1,
          background: isHovered
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.2) 45%, rgba(59, 130, 246, 0) 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(16, 185, 129, 0.15) 45%, rgba(99, 102, 241, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Secondary Concentric Ring (Precision Scanner Reticle Ring) - Hidden while typing or over text inputs */}
      <div
        className="absolute rounded-full border border-teal-400/40 transition-all duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            shouldHideCharacteristics ? 0.3 : isClicking ? 0.6 : isHovered ? 1.3 : 1
          })`,
          width: isHovered ? '46px' : '32px',
          height: isHovered ? '46px' : '32px',
          opacity: shouldHideCharacteristics ? 0 : 1,
          borderColor: isHovered ? 'rgba(16, 185, 129, 0.7)' : 'rgba(14, 165, 233, 0.5)',
          boxShadow: isHovered
            ? '0 0 14px rgba(16, 185, 129, 0.4), inset 0 0 8px rgba(16, 185, 129, 0.2)'
            : '0 0 10px rgba(14, 165, 233, 0.3)',
        }}
      />

      {/* Center Medical Crosshair / Glowing Core Point - Hidden while typing so I-beam text caret is unobscured */}
      <div
        className="absolute rounded-full will-change-transform transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            shouldHideCharacteristics ? 0 : isClicking ? 1.6 : isHovered ? 1.2 : 1
          })`,
          width: '6px',
          height: '6px',
          opacity: shouldHideCharacteristics ? 0 : 1,
          backgroundColor: isHovered ? '#10b981' : '#0ea5e9',
          boxShadow: isHovered
            ? '0 0 8px 2px rgba(16, 185, 129, 0.9)'
            : '0 0 8px 2px rgba(14, 165, 233, 0.9)',
        }}
      />
    </div>
  );
}
