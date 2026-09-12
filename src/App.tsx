/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CubeTopBar } from './components/CubeTopBar';
import { CubeNavbar } from './components/CubeNavbar';
import { CubeHomeSection } from './components/CubeHomeSection';
import { CubeAboutSection } from './components/CubeAboutSection';
import { CubeResumeSection } from './components/CubeResumeSection';
import { CubePortfolioSection } from './components/CubePortfolioSection';
import { CubeContactSection } from './components/CubeContactSection';
import { ResumeModal } from './components/ResumeModal';
import { SentimentDemoModal } from './components/SentimentDemoModal';
import { IoTDemoModal } from './components/IoTDemoModal';
import { MouseGlowSpotlight } from './components/MouseGlowSpotlight';
import { sounds } from './utils/audio';

export default function App() {
  // Current active 3D face: 0: Home, 1: About, 2: Resume, 3: Portfolio, 4: Contact
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [theme, setTheme] = useState<'cyber' | 'obsidian' | 'emerald'>('cyber');
  const [isMuted, setIsMuted] = useState<boolean>(sounds.isMuted);

  // Modals
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isNlpDemoOpen, setIsNlpDemoOpen] = useState(false);
  const [isIotDemoOpen, setIsIotDemoOpen] = useState(false);

  // Touch swipe support
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Apply theme to root
  useEffect(() => {
    if (theme === 'obsidian') {
      document.documentElement.setAttribute('data-theme', 'obsidian');
    } else if (theme === 'emerald') {
      document.documentElement.setAttribute('data-theme', 'emerald');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  // Navigate with sound
  const handleNavigate = (idx: number) => {
    if (idx === activeIndex) return;
    sounds.playCubeRotate();
    setActiveIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'l') {
        e.preventDefault();
        sounds.playCubeRotate();
        setActiveIndex((prev) => (prev + 1) % 5);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'h') {
        e.preventDefault();
        sounds.playCubeRotate();
        setActiveIndex((prev) => (prev - 1 + 5) % 5);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        sounds.playCubeRotate();
        setActiveIndex(parseInt(e.key) - 1);
      } else if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsNlpDemoOpen(false);
        setIsIotDemoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    // 50px threshold for swipe
    if (diff > 60) {
      // Swipe left -> Next
      sounds.playCubeRotate();
      setActiveIndex((prev) => (prev + 1) % 5);
    } else if (diff < -60) {
      // Swipe right -> Prev
      sounds.playCubeRotate();
      setActiveIndex((prev) => (prev - 1 + 5) % 5);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-[var(--bg-color)] text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Top Bar with Controls and 3D Rotation Face Indicator */}
      <CubeTopBar
        activeIndex={activeIndex}
        onSelectIndex={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        onChangeTheme={(t) => setTheme(t)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(sounds.toggleMute())}
      />

      {/* 2. 3D Cube Viewport */}
      <div className="cube-viewport">
        <div 
          className="cube-box"
          style={{
            transform: `rotateY(${activeIndex * -90}deg)`,
          }}
        >
          {/* Face 0: HOME (rotateY 0deg) */}
          <section className={`cube-section section-home ${activeIndex === 0 ? 'is-active' : 'is-inactive'}`}>
            <CubeHomeSection
              onNavigate={handleNavigate}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </section>

          {/* Face 1: ABOUT (rotateY 90deg) */}
          <section className={`cube-section section-about ${activeIndex === 1 ? 'is-active' : 'is-inactive'}`}>
            <CubeAboutSection
              onNavigate={handleNavigate}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </section>

          {/* Face 2: RESUME (rotateY 180deg) */}
          <section className={`cube-section section-resume ${activeIndex === 2 ? 'is-active' : 'is-inactive'}`}>
            <CubeResumeSection
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </section>

          {/* Face 3: PORTFOLIO (rotateY 270deg) */}
          <section className={`cube-section section-portfolio ${activeIndex === 3 ? 'is-active' : 'is-inactive'}`}>
            <CubePortfolioSection
              onOpenNlpDemo={() => setIsNlpDemoOpen(true)}
              onOpenIotDemo={() => setIsIotDemoOpen(true)}
            />
          </section>

          {/* Face 4: CONTACT (Visible on front face when activeIndex is 4) */}
          <section 
            className={`cube-section section-contact ${
              activeIndex === 4 ? 'contact-active is-active' : 'is-inactive'
            }`}
          >
            <CubeContactSection />
          </section>
        </div>
      </div>

      {/* 3. Interactive Mouse Movement Spotlight & Cursor Aura */}
      <MouseGlowSpotlight />

      {/* 4. Bottom Floating Pill Navigation (Matching Pinterest link) */}
      <CubeNavbar
        activeIndex={activeIndex}
        onSelectIndex={handleNavigate}
      />

      {/* 4. Interactive Project Demo Dialogs */}
      <SentimentDemoModal
        isOpen={isNlpDemoOpen}
        onClose={() => setIsNlpDemoOpen(false)}
      />

      <IoTDemoModal
        isOpen={isIotDemoOpen}
        onClose={() => setIsIotDemoOpen(false)}
      />

      {/* 5. Official Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
