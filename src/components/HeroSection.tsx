import React from 'react';
import { 
  Award, 
  Terminal, 
  FileDown, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  BarChart3,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  isNightMode?: boolean;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isNightMode = true,
  onOpenResume,
  onOpenTerminal,
}) => {
  return (
    <section 
      id="hero" 
      className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${
        isNightMode ? 'bg-[#000000] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Availability Badge */}
        <div className="flex items-center justify-start mb-6">
          <div 
            id="hero-status-pill"
            className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-mono border ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-neutral-300' 
                : 'bg-neutral-100 border-neutral-300 text-neutral-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>AVAILABLE FOR HIRE • DATA ANALYST & SOFTWARE DEVELOPER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Headlines, Summary, Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                <Code2 className="w-3.5 h-3.5" />
                <span>Analytics • Software Engineering</span>
              </div>
              
              <h1 className={`text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none ${
                isNightMode ? 'text-white' : 'text-neutral-900'
              }`}>
                Hi, I'm {personalInfo.name}
              </h1>
              
              <p className={`text-xl sm:text-2xl font-medium pt-1 ${
                isNightMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Aspiring Data Analyst & Software Developer
              </p>
            </div>

            {/* Resume Summary Quote */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl border-l-2 pl-4 py-1 ${
              isNightMode 
                ? 'text-neutral-300 border-neutral-700 bg-neutral-950/40' 
                : 'text-neutral-600 border-neutral-300 bg-neutral-50'
            }`}>
              {personalInfo.summary}
            </p>

            {/* Direct Contact Chips */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              <a 
                href={`mailto:${personalInfo.email}`}
                onClick={() => sounds.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.email}</span>
              </a>

              <a 
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                onClick={() => sounds.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.phone}</span>
              </a>

              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.linkedinDisplay}</span>
              </a>

              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Github className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.githubDisplay}</span>
              </a>

              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-neutral-400' 
                  : 'bg-neutral-100 border-neutral-200 text-neutral-600'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors ${
                  isNightMode 
                    ? 'bg-white text-black hover:bg-neutral-200' 
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <span>View Projects & Demos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenTerminal();
                }}
                className={`px-4 py-2.5 rounded-lg border font-mono text-xs sm:text-sm flex items-center gap-2 transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white' 
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Terminal className="w-4 h-4 text-neutral-400" />
                <span>kailash-os:~$</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className={`px-4 py-2.5 rounded-lg border text-xs sm:text-sm flex items-center gap-2 transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white' 
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <FileDown className="w-4 h-4 text-neutral-400" />
                <span>View / Print Resume</span>
              </button>
            </div>

            {/* Core Tech Stack Arsenal */}
            <div className="pt-2">
              <div className={`text-xs font-mono mb-2 ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                CORE TECHNICAL COMPETENCIES:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Python', role: 'Data Analysis & NLP' },
                  { name: 'SQL', role: 'Database Queries & Joins' },
                  { name: 'Excel', role: 'Formulas & Data Cleaning' },
                  { name: 'PowerBI', role: 'Dashboards & Reports' },
                  { name: 'Java (Elite+Gold)', role: 'OOP & Architecture' },
                  { name: 'IoT / ESP32', role: 'Embedded Systems' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`px-3 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
                      isNightMode 
                        ? 'bg-[#000000] border-neutral-800 text-neutral-300' 
                        : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className={`text-[10px] hidden sm:inline ${
                      isNightMode ? 'text-neutral-500' : 'text-neutral-500'
                    }`}>
                      [{item.role}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Candidate Profile & Credentials Card */}
          <div className="lg:col-span-5">
            <div className={`rounded-2xl p-6 border space-y-6 ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
            }`}>
              
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className={`text-[11px] font-mono tracking-wider uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    CANDIDATE ID: KR-2027
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    KAILASH R
                  </h2>
                  <p className={`text-xs font-mono ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    B.Tech IT • Nandha College of Technology
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-300' 
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                }`}>
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              {/* 4 Core Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    B.Tech IT CGPA
                  </div>
                  <div className="text-2xl font-bold font-mono mt-1">
                    7.33<span className={`text-xs font-normal ${
                      isNightMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>/10</span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${
                    isNightMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>
                    2023 – 2027 Batch
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    NPTEL Java
                  </div>
                  <div className="text-xl font-bold font-mono mt-1">
                    Elite + Gold
                  </div>
                  <div className={`text-[10px] mt-0.5 ${
                    isNightMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>
                    Top Tier Distinction
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    HSC Class XII
                  </div>
                  <div className="text-2xl font-bold font-mono mt-1">
                    79.5%
                  </div>
                  <div className={`text-[10px] mt-0.5 ${
                    isNightMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>
                    State Board, TN
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    Internship
                  </div>
                  <div className="text-lg font-bold font-mono mt-1">
                    Creascent
                  </div>
                  <div className={`text-[10px] mt-0.5 ${
                    isNightMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>
                    Java Developer Intern
                  </div>
                </div>
              </div>

              {/* Data Analytics Competency Breakdown */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800' 
                  : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isNightMode ? 'text-neutral-300' : 'text-neutral-700'}>
                    Data Analytics Readiness Score
                  </span>
                  <span className="font-bold">96%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                  isNightMode ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}>
                  <div className={`h-1.5 rounded-full ${
                    isNightMode ? 'bg-white' : 'bg-neutral-900'
                  } w-[96%]`} />
                </div>
                <div className={`flex justify-between text-[10px] font-mono ${
                  isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>SQL & ETL</span>
                  <span>Python & NLP</span>
                  <span>PowerBI Dashboards</span>
                </div>
              </div>

              {/* Verified Credential Tag */}
              <div className={`flex items-center justify-between pt-3 border-t text-xs ${
                isNightMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <span className={`flex items-center gap-1.5 text-[11px] font-mono ${
                  isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  <Award className="w-3.5 h-3.5" />
                  IIT Madras ML Certified
                </span>
                <span className={`text-[10px] font-mono ${
                  isNightMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  Erode, Tamil Nadu
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
