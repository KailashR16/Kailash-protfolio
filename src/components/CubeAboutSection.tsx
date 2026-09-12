import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Briefcase, 
  Code, 
  FileText, 
  FolderGit2, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';
import { ProfileAvatar } from './ProfileAvatar';

interface CubeAboutSectionProps {
  onNavigate: (index: number) => void;
  onOpenResume: () => void;
}

export const CubeAboutSection: React.FC<CubeAboutSectionProps> = ({
  onNavigate,
  onOpenResume,
}) => {
  return (
    <div className="min-h-full flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-16">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Avatar in Circular Neon Frame with 3D Tilt and Exact Photo Upload */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <ProfileAvatar section="about" onNavigate={() => onNavigate(2)} />
        </div>

        {/* Right Column: About Description & Badges */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              About Me
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--main-color)] mt-1">
              Data Analyst & Software Developer!
            </h3>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            I am a final-year Information Technology student at <span className="text-white font-medium">Nandha College of Technology</span> (CGPA 7.33) with practical software industry experience as a <span className="text-white font-medium">Java Intern at Creascent Infotech</span>. 
          </p>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            My core strength lies at the intersection of <span className="text-[var(--main-color)] font-medium">Data Analytics</span> and <span className="text-[var(--main-color)] font-medium">Software Development</span>. I bridge business questions with concrete data solutions — using Python, SQL, Excel, and PowerBI to extract, transform, and visualize actionable intelligence, and Java/React to build responsive software systems.
          </p>

          {/* Quick Metrics Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="card-item p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[var(--main-color)]">7.33</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">B.Tech IT CGPA</div>
            </div>
            <div className="card-item p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[var(--main-color)]">Elite+Gold</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">NPTEL Java Top 1%</div>
            </div>
            <div className="card-item p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[var(--main-color)]">Creascent</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Industrial Intern</div>
            </div>
            <div className="card-item p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[var(--main-color)]">3+ Major</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">End-to-End Projects</div>
            </div>
          </div>

          {/* Key Traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-1 text-left">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] flex-shrink-0" />
              <span>Structured Problem Solving & Algorithmic Design</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] flex-shrink-0" />
              <span>Complex SQL Joins, Aggregations & Schema Design</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] flex-shrink-0" />
              <span>Interactive PowerBI Dashboards & DAX KPIs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] flex-shrink-0" />
              <span>Fluent in English, Tamil, Kannada & Telugu</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={() => {
                sounds.playCubeRotate();
                onNavigate(2); // Rotate to Resume
              }}
              className="btn-glow"
            >
              <FileText className="w-4 h-4" />
              <span>Explore Resume</span>
            </button>

            <button
              onClick={() => {
                sounds.playCubeRotate();
                onNavigate(3); // Rotate to Portfolio
              }}
              className="btn-outline"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>View Projects</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
