import React from 'react';
import { 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ArrowRight, 
  Database,
  BarChart3,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';
import { ProfileAvatar } from './ProfileAvatar';

interface CubeHomeSectionProps {
  onNavigate: (index: number) => void;
  onOpenResume: () => void;
}

export const CubeHomeSection: React.FC<CubeHomeSectionProps> = ({
  onNavigate,
  onOpenResume,
}) => {
  return (
    <div className="min-h-full flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-16">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Hero Text & Social Links */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90">
              Hello I'm
            </h3>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--main-color)] drop-shadow-[0_0_25px_rgba(255,119,0,0.45)]">
              Kailash R
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/95">
              Data Analyst & Software Developer
            </h3>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Specializing in <span className="text-[var(--main-color)] font-medium">Python, SQL, Excel, PowerBI</span>, and <span className="text-[var(--main-color)] font-medium">Java</span>. 
            Passionate about uncovering hidden patterns in structured datasets, building interactive business intelligence dashboards, and engineering high-impact digital systems.
          </p>

          {/* Core competency tags */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
            <span className="px-2.5 py-1 rounded-md bg-[var(--third-bg-color)] border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[var(--main-color)]" /> SQL & Data Cleaning
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[var(--third-bg-color)] border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[var(--main-color)]" /> PowerBI & Excel
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[var(--third-bg-color)] border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[var(--main-color)]" /> Python & Java Core
            </span>
          </div>

          {/* Action Buttons & Social Icons (Matching template .btn-sci) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className="btn-glow"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => {
                  sounds.playCubeRotate();
                  onNavigate(4); // Rotate to Contact
                }}
                className="btn-outline"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Icons with Glowing Circles and Tooltips */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sounds.playHover()}
                className="relative group p-2.5 rounded-full border-2 border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition-all shadow-[0_0_10px_rgba(255,119,0,0.25)] hover:shadow-[0_0_18px_var(--main-color)]"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sounds.playHover()}
                className="relative group p-2.5 rounded-full border-2 border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition-all shadow-[0_0_10px_rgba(255,119,0,0.25)] hover:shadow-[0_0_18px_var(--main-color)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  LinkedIn
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                onMouseEnter={() => sounds.playHover()}
                className="relative group p-2.5 rounded-full border-2 border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition-all shadow-[0_0_10px_rgba(255,119,0,0.25)] hover:shadow-[0_0_18px_var(--main-color)]"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  Email
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                onMouseEnter={() => sounds.playHover()}
                className="relative group p-2.5 rounded-full border-2 border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition-all shadow-[0_0_10px_rgba(255,119,0,0.25)] hover:shadow-[0_0_18px_var(--main-color)]"
                aria-label="Call Direct"
              >
                <Phone className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  Phone
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Avatar with Neon Frame (.img-box.home-img) with 3D Tilt and Exact Photo Upload */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <ProfileAvatar section="home" onNavigate={() => onNavigate(1)} />
        </div>

      </div>
    </div>
  );
};
