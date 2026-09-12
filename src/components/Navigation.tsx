import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X,
  Moon,
  Sun
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavigationProps {
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onOpenResume: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  isNightMode,
  onToggleNightMode,
  onOpenResume,
  onToggleTerminal,
  isTerminalOpen,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Projects & Demos', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience & Education', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        isNightMode 
          ? 'bg-[#000000] border-neutral-800' 
          : 'bg-white border-neutral-200'
      } ${isScrolled ? 'py-3' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group"
            id="nav-brand-logo"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
              isNightMode 
                ? 'bg-neutral-900 text-white border-neutral-700' 
                : 'bg-neutral-100 text-neutral-900 border-neutral-300'
            }`}>
              KR
            </div>

            <div className="flex flex-col">
              <span className={`font-bold tracking-tight text-sm sm:text-base flex items-center gap-2 ${
                isNightMode ? 'text-white' : 'text-neutral-900'
              }`}>
                KAILASH R
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-normal border ${
                  isNightMode 
                    ? 'bg-neutral-900 text-neutral-400 border-neutral-800' 
                    : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                }`}>
                  DEV & ANALYST
                </span>
              </span>
              <span className={`text-[11px] font-mono -mt-0.5 hidden sm:block ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Data Analyst • Software Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors ${
                  isNightMode 
                    ? 'text-neutral-300 hover:text-white hover:bg-neutral-900' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Dark / Night Mode Toggle */}
            <button
              id="night-mode-toggle-button"
              onClick={() => {
                sounds.playClick();
                onToggleNightMode();
              }}
              title={isNightMode ? 'Switch to Light Mode' : 'Switch to Dark Night Mode'}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium flex items-center gap-2 transition-colors ${
                isNightMode 
                  ? 'bg-neutral-950 text-white border-neutral-800 hover:border-neutral-600' 
                  : 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {isNightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-neutral-200" />
                  <span className="hidden sm:inline text-neutral-200">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="hidden sm:inline text-neutral-700">Light Mode</span>
                </>
              )}
            </button>

            {/* Audio Toggle */}
            <button
              id="audio-toggle-button"
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
              className={`p-2 rounded-lg border transition-colors ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Terminal CLI Launcher */}
            <button
              id="cli-toggle-button"
              onClick={() => {
                sounds.playClick();
                onToggleTerminal();
              }}
              title="Open Kailash OS Terminal CLI"
              className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
                isNightMode 
                  ? isTerminalOpen
                    ? 'bg-white text-black border-white'
                    : 'bg-[#000000] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
                  : isTerminalOpen
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline">CLI</span>
            </button>

            {/* Resume Button */}
            <button
              id="nav-resume-button"
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                isNightMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 md:hidden rounded-lg border ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-neutral-400' 
                  : 'bg-white border-neutral-200 text-neutral-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-3 pb-6 border-b ${
          isNightMode 
            ? 'bg-[#000000] border-neutral-800' 
            : 'bg-white border-neutral-200'
        }`}>
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isNightMode 
                    ? 'text-neutral-300 hover:bg-neutral-900 hover:text-white' 
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-neutral-800/40 flex gap-2">
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 ${
                  isNightMode 
                    ? 'bg-neutral-900 text-white border border-neutral-700' 
                    : 'bg-neutral-100 text-neutral-900 border border-neutral-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                View Full Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
