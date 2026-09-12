import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { projectsList } from '../data/resumeData';
import { Project } from '../types';
import { 
  SentimentAnalysisDemo, 
  SmartVisitorAlertDemo, 
  SmartEducationDemo 
} from './ProjectDemos';
import { sounds } from '../utils/audio';

interface ProjectsSectionProps {
  isNightMode?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isNightMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedDemoId, setExpandedDemoId] = useState<string>('sentiment-analysis');

  const filteredProjects = activeTab === 'all'
    ? projectsList
    : projectsList.filter(p => p.id === activeTab || p.category.toLowerCase().includes(activeTab.toLowerCase()));

  const handleDemoToggle = (id: string) => {
    sounds.playClick();
    setExpandedDemoId(expandedDemoId === id ? '' : id);
  };

  return (
    <section 
      id="projects" 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 border-t ${
        isNightMode 
          ? 'bg-[#000000] text-white border-neutral-800' 
          : 'bg-white text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${
          isNightMode ? 'border-neutral-800' : 'border-neutral-200'
        }`}>
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <FolderGit2 className="w-4 h-4" />
              <span>Engineered Systems & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Featured Projects & Interactive Systems
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Practical applications bridging NLP sentiment classification, embedded IoT surveillance, and accessible educational learning systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'sentiment-analysis', label: 'NLP / Python' },
              { id: 'smart-visitor-alert', label: 'IoT / ESP32-CAM' },
              { id: 'smart-education-bpl', label: 'AI / UI-UX' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  activeTab === tab.id
                    ? isNightMode 
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                    : isNightMode
                      ? 'bg-[#000000] text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-6">
          {filteredProjects.map((project: Project, index: number) => {
            const isExpanded = expandedDemoId === project.id;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className={`rounded-2xl p-6 sm:p-7 border space-y-6 transition-colors ${
                  isNightMode 
                    ? 'bg-[#000000] border-neutral-800 text-white hover:border-neutral-700' 
                    : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
                }`}
              >
                
                {/* Top Row: Index, Category, Title, Github & Live Demo Button */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                        isNightMode 
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400' 
                          : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                      }`}>
                        PROJ // 0{index + 1}
                      </span>
                      <span className={`text-xs font-mono uppercase tracking-wider ${
                        isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border ${
                          isNightMode 
                            ? 'bg-neutral-900 text-neutral-300 border-neutral-800' 
                            : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                        }`}>
                          <Activity className="w-3 h-3 text-neutral-400" />
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight pt-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 self-start lg:self-center">
                    <button
                      onClick={() => handleDemoToggle(project.id)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-colors border ${
                        isExpanded
                          ? isNightMode
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                          : isNightMode
                            ? 'bg-[#000000] text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                            : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide Live Sandbox' : 'Run Interactive Sandbox'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClick()}
                      className={`p-2 rounded-lg border transition-colors ${
                        isNightMode 
                          ? 'bg-[#000000] border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' 
                          : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900'
                      }`}
                      title="View on GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Showcase Banner Image */}
                {project.imageUrl && (
                  <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 group">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Description & Key Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  <div className="lg:col-span-7 space-y-4">
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className={`text-xs font-mono uppercase ${
                        isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        KEY ACCOMPLISHMENTS:
                      </div>
                      <ul className="space-y-1.5">
                        {project.highlights.map((bullet, bIdx) => (
                          <li key={bIdx} className={`flex items-start gap-2 text-xs sm:text-sm ${
                            isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack & Tags */}
                  <div className={`lg:col-span-5 space-y-3 p-4 rounded-xl border ${
                    isNightMode 
                      ? 'bg-[#000000] border-neutral-800' 
                      : 'bg-neutral-50 border-neutral-200'
                  }`}>
                    <div className={`text-xs font-mono uppercase ${
                      isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      TECHNOLOGIES USED:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-md border text-xs font-mono ${
                            isNightMode 
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-200' 
                              : 'bg-white border-neutral-300 text-neutral-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`pt-2 border-t ${
                      isNightMode ? 'border-neutral-800' : 'border-neutral-200'
                    }`}>
                      <div className={`text-xs font-mono uppercase mb-1.5 ${
                        isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        TAGS:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              isNightMode 
                                ? 'bg-neutral-950 text-neutral-400 border-neutral-800' 
                                : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Embedded Interactive Sandbox Area */}
                {isExpanded && (
                  <div className={`pt-4 border-t ${
                    isNightMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    {project.demoType === 'nlp' && <SentimentAnalysisDemo />}
                    {project.demoType === 'iot' && <SmartVisitorAlertDemo />}
                    {project.demoType === 'edu' && <SmartEducationDemo />}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
