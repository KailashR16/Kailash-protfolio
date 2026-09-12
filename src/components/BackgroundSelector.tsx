import React, { useState } from 'react';
import { 
  Waves, 
  Orbit, 
  Globe2, 
  FastForward, 
  Gem, 
  Sparkles, 
  Settings2, 
  ChevronUp, 
  ChevronDown,
  Gauge
} from 'lucide-react';
import { SceneMode, ThemeMode } from '../types';
import { sounds } from '../utils/audio';

interface BackgroundSelectorProps {
  currentScene: SceneMode;
  onSceneChange: (mode: SceneMode) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  currentScene,
  onSceneChange,
  speed,
  onSpeedChange,
  currentTheme,
  onThemeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const animations: {
    id: SceneMode;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
  }[] = [
    {
      id: 'cyber-wave',
      title: 'Cyber Wave Grid',
      description: '3D undulating mathematical mesh terrain & glowing particle crests',
      icon: Waves,
      badge: 'POPULAR',
    },
    {
      id: 'cosmic-vortex',
      title: 'Cosmic Vortex',
      description: 'Swirling galaxy black hole accretion disk with orbital particle streams',
      icon: Orbit,
      badge: 'ASTRO',
    },
    {
      id: 'neural-globe',
      title: 'Neural Data Globe',
      description: 'Rotating geodesic data sphere with interconnected node networks',
      icon: Globe2,
      badge: 'NETWORK',
    },
    {
      id: 'warp-tunnel',
      title: 'Warp Speed Tunnel',
      description: 'Hyperspace starfield flight stream through cylindrical wormhole',
      icon: FastForward,
      badge: 'HYPER',
    },
    {
      id: 'floating-crystals',
      title: 'Tech Polyhedra',
      description: 'Zero-gravity tumbling holographic octahedra & geometric crystals',
      icon: Gem,
      badge: 'GEOMETRIC',
    },
  ];

  const speedOptions = [
    { label: '0.5x', value: 0.5 },
    { label: '1.0x', value: 1.0 },
    { label: '1.5x', value: 1.5 },
    { label: '2.0x', value: 2.0 },
  ];

  const currentAnim = animations.find((a) => a.id === currentScene) || animations[0];
  const CurrentIcon = currentAnim.icon;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40">
      
      {/* Expanded Control Modal / Drawer */}
      {isExpanded && (
        <div 
          className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#090d16]/95 backdrop-blur-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-2xl shadow-cyan-950/60 space-y-4 animate-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Select 3D Background Engine
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setIsExpanded(false);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Animation Cards */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
            {animations.map((anim) => {
              const Icon = anim.icon;
              const isSelected = currentScene === anim.id;

              return (
                <button
                  key={anim.id}
                  onClick={() => {
                    sounds.playSuccess();
                    onSceneChange(anim.id);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400/80 shadow-lg shadow-cyan-500/20 text-white'
                      : 'bg-black/40 border-white/10 hover:border-white/20 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isSelected 
                      ? 'bg-cyan-500 text-[#07090e]' 
                      : 'bg-white/[0.05] text-cyan-400 border border-white/10'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-display">
                        {anim.title}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-cyan-400 text-[#07090e] font-bold' 
                          : 'bg-white/[0.05] text-slate-400 border border-white/10'
                      }`}>
                        {anim.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {anim.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Animation Speed Slider / Pills */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>Velocity:</span>
            </div>

            <div className="flex items-center gap-1">
              {speedOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => {
                    sounds.playClick();
                    onSpeedChange(opt.value);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-mono transition-all ${
                    speed === opt.value
                      ? 'bg-cyan-500 text-[#07090e] font-bold'
                      : 'bg-white/[0.05] text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        id="bg-animation-selector-pill"
        onClick={() => {
          sounds.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="px-3.5 py-2.5 rounded-2xl bg-[#090d16]/90 hover:bg-[#0c1322] border border-cyan-500/40 hover:border-cyan-400 text-white shadow-xl shadow-cyan-950/50 backdrop-blur-xl flex items-center gap-2.5 transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>

        <div className="text-left font-mono">
          <div className="text-[9px] text-cyan-400/80 uppercase tracking-widest leading-none">
            3D BACKGROUND
          </div>
          <div className="text-xs font-bold text-slate-100 flex items-center gap-1 mt-0.5">
            <span>{currentAnim.title}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronUp className="w-3 h-3 text-slate-400" />}
          </div>
        </div>
      </button>

    </div>
  );
};
