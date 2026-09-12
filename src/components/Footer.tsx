import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface FooterProps {
  isNightMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isNightMode = true }) => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono ${
      isNightMode 
        ? 'bg-[#000000] border-neutral-800 text-neutral-400' 
        : 'bg-white border-neutral-200 text-neutral-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold ${
            isNightMode 
              ? 'bg-neutral-900 border-neutral-800 text-white' 
              : 'bg-neutral-100 border-neutral-300 text-neutral-900'
          }`}>
            KR
          </div>
          <div>
            <div className={`text-sm font-bold ${
              isNightMode ? 'text-white' : 'text-neutral-900'
            }`}>
              {personalInfo.name}
            </div>
            <div className={`text-xs ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {personalInfo.title} • {personalInfo.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className={`transition-colors ${isNightMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>Overview</a>
          <a href="#projects" className={`transition-colors ${isNightMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>Projects</a>
          <a href="#skills" className={`transition-colors ${isNightMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>Skills</a>
          <a href="#experience" className={`transition-colors ${isNightMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>Experience</a>
          <a href="#contact" className={`transition-colors ${isNightMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
            isNightMode 
              ? 'bg-neutral-950 text-neutral-300 border-neutral-800' 
              : 'bg-neutral-100 text-neutral-700 border-neutral-300'
          }`}>
            Available for Hire • {personalInfo.availability}
          </span>

          <button
            onClick={scrollToTop}
            className={`p-2 rounded-lg border transition-colors ${
              isNightMode 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
            }`}
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
