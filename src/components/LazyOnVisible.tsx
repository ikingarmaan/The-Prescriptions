import React, { useState, useEffect, useRef } from "react";

interface LazyOnVisibleProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

/**
 * Viewport-aware container that delays mounting children until the user
 * scrolls near them (default: 350px before entering viewport).
 * This eliminates below-the-fold component bundles from the critical rendering chain.
 */
export const LazyOnVisible: React.FC<LazyOnVisibleProps> = ({
  children,
  fallback = null,
  rootMargin = "350px",
  minHeight = "120px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : fallback}
    </div>
  );
};
