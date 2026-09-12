import React, { useEffect, useRef } from 'react';

export const MouseGlowSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotlightX = mouseX;
    let spotlightY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let isHoveringInteractive = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;

      // Update immediate dot position
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }

      // Check if hovering over button, link, or card
      const target = e.target as HTMLElement | null;
      if (target) {
        isHoveringInteractive = !!target.closest('button, a, input, textarea, .card-item, [role="button"]');
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth Lerp loop for fluid physics
    const loop = () => {
      if (isVisible) {
        // Spotlight follows with smooth lag (lerp 0.08)
        spotlightX += (mouseX - spotlightX) * 0.08;
        spotlightY += (mouseY - spotlightY) * 0.08;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${spotlightX - 250}px, ${spotlightY - 250}px, 0)`;
          spotlightRef.current.style.opacity = '1';
        }

        // Ring follows with responsive spring lag (lerp 0.18)
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        if (cursorRingRef.current) {
          const scale = isHoveringInteractive ? 1.6 : 1;
          cursorRingRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${scale})`;
          cursorRingRef.current.style.opacity = isHoveringInteractive ? '0.85' : '0.4';
          cursorRingRef.current.style.borderColor = isHoveringInteractive ? 'rgba(255, 119, 0, 0.9)' : 'rgba(255, 150, 50, 0.45)';
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {/* 1. Fluid Ambient Spotlight Glow */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full will-change-transform opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 250px at center, rgba(255, 119, 0, 0.16), rgba(255, 80, 0, 0.05) 50%, transparent 75%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 2. Sleek Center Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="hidden md:block absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--main-color)] shadow-[0_0_8px_var(--main-color)] will-change-transform opacity-0 transition-opacity duration-200 z-30"
      />

      {/* 3. Outer Interactive Spring Follower Ring */}
      <div
        ref={cursorRingRef}
        className="hidden md:block absolute top-0 left-0 w-9 h-9 rounded-full border border-orange-400/50 will-change-transform opacity-0 transition-[transform,opacity,border-color] duration-150 ease-out z-30"
      />
    </div>
  );
};
