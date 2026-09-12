import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Palette,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface CubeTopBarProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenResume: () => void;
  theme: 'cyber' | 'obsidian' | 'emerald';
  onChangeTheme: (theme: 'cyber' | 'obsidian' | 'emerald') => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const CubeTopBar: React.FC<CubeTopBarProps> = ({
  activeIndex,
  onSelectIndex,
  onOpenResume,
  theme,
  onChangeTheme,
  isMuted,
  onToggleMute,
}) => {
  const sectionLabels = [
    { title: 'HOME', deg: '0°' },
    { title: 'ABOUT', deg: '90°' },
    { title: 'RESUME', deg: '180°' },
    { title: 'PORTFOLIO', deg: '270°' },
    { title: 'CONTACT', deg: '360°' },
  ];

  const handlePrev = () => {
    sounds.playCubeRotate();
    const nextIdx = (activeIndex - 1 + 5) % 5;
    onSelectIndex(nextIdx);
  };

  const handleNext = () => {
    sounds.playCubeRotate();
    const nextIdx = (activeIndex + 1) % 5;
    onSelectIndex(nextIdx);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#171f2b]/90 via-[#171f2b]/40 to-transparent backdrop-blur-[2px]">
      {/* Brand logo */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div 
          onClick={() => onSelectIndex(0)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg border-2 border-[var(--main-color)] flex items-center justify-center font-bold text-sm text-[var(--main-color)] shadow-[0_0_12px_rgba(255,119,0,0.35)] group-hover:shadow-[0_0_20px_var(--main-color)] transition-all bg-[var(--bg-color)]">
            KR
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              KAILASH R
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--main-color)]/20 text-[var(--main-color)] font-mono font-medium">3D</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-medium leading-none">
              Data Analyst & Software Dev
            </div>
          </div>
        </div>
      </div>

      {/* Center 3D Cube Rotation Controller & Status */}
      <div className="hidden sm:flex items-center gap-2 pointer-events-auto bg-[var(--second-bg-color)]/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg text-xs">
        <button
          onClick={handlePrev}
          className="p-1 rounded-full text-neutral-300 hover:text-[var(--main-color)] hover:bg-white/5 transition-colors"
          title="Rotate Cube Previous (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)] animate-pulse shadow-[0_0_8px_var(--main-color)]" />
          <span className="text-neutral-400">3D FACE {activeIndex + 1}/5:</span>
          <span className="text-[var(--main-color)] font-bold">
            {sectionLabels[activeIndex].title} ({sectionLabels[activeIndex].deg})
          </span>
        </div>

        <button
          onClick={handleNext}
          className="p-1 rounded-full text-neutral-300 hover:text-[var(--main-color)] hover:bg-white/5 transition-colors"
          title="Rotate Cube Next (Right Arrow)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Theme Picker */}
        <div className="relative group">
          <button
            onClick={() => {
              sounds.playClick();
              const nextTheme = theme === 'cyber' ? 'obsidian' : theme === 'obsidian' ? 'emerald' : 'cyber';
              onChangeTheme(nextTheme);
            }}
            className="p-2 rounded-lg bg-[var(--third-bg-color)]/80 hover:bg-[var(--third-bg-color)] text-neutral-300 hover:text-[var(--main-color)] border border-white/10 transition-colors text-xs flex items-center gap-1.5"
            title={`Current: ${theme.toUpperCase()} (Click to toggle theme)`}
          >
            <Palette className="w-4 h-4 text-[var(--main-color)]" />
            <span className="hidden md:inline font-mono capitalize">{theme}</span>
          </button>
        </div>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleMute();
          }}
          className="p-2 rounded-lg bg-[var(--third-bg-color)]/80 hover:bg-[var(--third-bg-color)] text-neutral-300 hover:text-[var(--main-color)] border border-white/10 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--main-color)]" />}
        </button>

        {/* Resume Modal Trigger */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenResume();
          }}
          className="btn-glow text-xs py-1.5 px-3.5 flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Resume</span>
        </button>
      </div>
    </header>
  );
};
