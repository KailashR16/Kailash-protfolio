import React, { useState } from 'react';
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Terminal,
  Database,
  BarChart2,
  FileSpreadsheet,
  Coffee,
  Cpu,
  Layers,
  Server,
  HardDrive,
  CheckSquare,
  ShieldCheck,
  GitBranch,
  Figma
} from 'lucide-react';
import { 
  experienceList, 
  technicalSkills, 
  educationList, 
  certificationsList 
} from '../data/resumeData';
import { sounds } from '../utils/audio';

interface CubeResumeSectionProps {
  onOpenResume: () => void;
}

export const CubeResumeSection: React.FC<CubeResumeSectionProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education' | 'certifications'>('experience');

  const tabs = [
    { id: 'experience' as const, label: 'Experience', icon: Briefcase },
    { id: 'skills' as const, label: 'Skills', icon: Code },
    { id: 'education' as const, label: 'Education', icon: GraduationCap },
    { id: 'certifications' as const, label: 'Certifications', icon: Award },
  ];

  const handleTabClick = (tabId: typeof activeTab) => {
    sounds.playClick();
    setActiveTab(tabId);
  };

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'Python': return Terminal;
      case 'SQL': return Database;
      case 'Java': return Coffee;
      case 'Microsoft Excel': return FileSpreadsheet;
      case 'PowerBI': return BarChart2;
      case 'Data Structures & Algorithms': return Cpu;
      case 'Object-Oriented Programming': return Layers;
      case 'DBMS': return Server;
      case 'Operating Systems': return HardDrive;
      case 'Selenium (Basic)': return CheckSquare;
      case 'Automation Testing': return ShieldCheck;
      case 'Git & GitHub': return GitBranch;
      case 'Figma': return Figma;
      default: return Code;
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-start items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-36 max-w-6xl mx-auto relative z-10">
      
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Resume
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
          Professional Experience • Technical Skills • Academic Degrees
        </p>
      </div>

      {/* Tab Navigation (Matching the template's .tab-box & .tab-list) */}
      <div className="w-full flex border-b-2 border-[var(--tab-list-color)]/30 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              onMouseEnter={() => sounds.playHover()}
              className={`flex-1 min-w-[110px] pb-3 text-center transition-all duration-300 relative font-semibold text-sm sm:text-lg flex items-center justify-center gap-2 ${
                isActive 
                  ? 'text-[var(--main-color)] border-b-4 border-[var(--main-color)] -mb-[3px]' 
                  : 'text-[var(--tab-list-color)] hover:text-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="w-full">
        
        {/* 1. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            {experienceList.map((exp, idx) => (
              <div key={idx} className="card-item p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-[var(--main-color)] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/20">
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--main-color)]">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono flex flex-col sm:items-end gap-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--main-color)]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--main-color)]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 mb-5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--main-color)] mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2">Technologies & Core Learnings:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skillsGained.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2.5 py-1 rounded bg-[var(--second-bg-color)] border border-white/10 text-xs text-white font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
            {technicalSkills.map((skill, idx) => {
              const Icon = getSkillIcon(skill.name);
              return (
                <div 
                  key={idx} 
                  className="card-item p-4 flex flex-col justify-between group hover:border-[var(--main-color)] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[var(--main-color)]/10 text-[var(--main-color)] group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-[var(--main-color)] transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-neutral-400 capitalize">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[var(--main-color)]">
                      {skill.level}%
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-[var(--second-bg-color)] h-2 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-[var(--main-color)] rounded-full transition-all duration-1000 shadow-[0_0_8px_var(--main-color)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-5 animate-fadeIn">
            {educationList.map((edu, idx) => (
              <div key={idx} className="card-item p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--main-color)]">
                      {edu.institution}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono flex flex-col sm:items-end">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--main-color)]" />
                      {edu.period}
                    </span>
                    <span className="text-[var(--main-color)] font-bold text-sm mt-0.5">
                      {edu.score}
                    </span>
                  </div>
                </div>

                {edu.highlights && (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--main-color)] mt-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            {certificationsList.map((cert, idx) => (
              <div key={idx} className="card-item p-5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--main-color)]/10 text-[var(--main-color)] flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-2 py-0.5 rounded bg-[var(--main-color)]/15 border border-[var(--main-color)]/30 text-[10px] font-mono text-[var(--main-color)] font-bold uppercase mb-1">
                    {cert.type}
                  </div>
                  <h4 className="font-bold text-base text-white">
                    {cert.title}
                  </h4>
                  <div className="text-xs text-neutral-400 font-medium">
                    {cert.issuer}
                  </div>
                  {cert.highlight && (
                    <div className="text-xs text-[var(--main-color)] font-semibold mt-1">
                      ★ {cert.highlight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
