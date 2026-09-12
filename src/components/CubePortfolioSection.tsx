import React, { useState } from 'react';
import { 
  FolderGit2, 
  Layers, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Database, 
  BarChart2, 
  Code2, 
  Bot, 
  Cpu, 
  ArrowUpRight,
  Play,
  FileSpreadsheet,
  CheckCircle2,
  ZoomIn,
  X,
  Maximize2
} from 'lucide-react';
import { projectsList } from '../data/resumeData';
import { sounds } from '../utils/audio';
import { TiltCard } from './TiltCard';

interface CubePortfolioSectionProps {
  onOpenNlpDemo: () => void;
  onOpenIotDemo: () => void;
}

export const CubePortfolioSection: React.FC<CubePortfolioSectionProps> = ({
  onOpenNlpDemo,
  onOpenIotDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'work' | 'services'>('work');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; category: string } | null>(null);

  const services = [
    {
      title: 'Data Analytics & Business Intelligence',
      icon: BarChart2,
      desc: 'Transforming raw unstructured data into high-impact statistical reports, trends, and executive dashboards using SQL, Python, Excel, and PowerBI.',
      skills: ['Exploratory Data Analysis', 'Data Cleaning', 'Statistical Modeling', 'KPI Reporting'],
    },
    {
      title: 'Natural Language Processing & ML',
      icon: Bot,
      desc: 'Building text classification, sentiment polarity engines, preprocessing pipelines, tokenization algorithms, and predictive data models.',
      skills: ['Sentiment Analysis', 'Tokenization', 'Scikit-Learn', 'NLTK Pipelines'],
    },
    {
      title: 'SQL Database Architecture & Optimization',
      icon: Database,
      desc: 'Designing robust relational schemas, writing high-performance queries with complex joins and aggregations, indexing, and data normalization.',
      skills: ['Schema Normalization', 'Complex Joins', 'Query Profiling', 'DBMS Principles'],
    },
    {
      title: 'Python Automation & Scripting',
      icon: Code2,
      desc: 'Automating repetitive data entry, scraping web data using Selenium, building ETL pipelines, and generating periodic analytical spreadsheets.',
      skills: ['Selenium Automation', 'Web Scraping', 'Automated ETL', 'Regex Extraction'],
    },
    {
      title: 'Interactive PowerBI & Excel Dashboards',
      icon: FileSpreadsheet,
      desc: 'Engineering intuitive visual decision systems with advanced DAX expressions, dynamic slicers, VLOOKUP/XLOOKUP formulas, and pivot analyses.',
      skills: ['DAX Calculations', 'Dynamic Slicers', 'Pivot Tables', 'Executive Cards'],
    },
    {
      title: 'Core Software Engineering & OOP',
      icon: Cpu,
      desc: 'Architecting maintainable, clean-code applications in Java and TypeScript leveraging Object-Oriented Principles, design patterns, and robust error handling.',
      skills: ['Core Java', 'OOP Design', 'Modular Architecture', 'Algorithmic Problem Solving'],
    },
  ];

  return (
    <div className="min-h-full flex flex-col justify-start items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-36 max-w-6xl mx-auto relative z-10">
      
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Portfolio
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
          Featured Engineering Projects & Technical Specializations
        </p>
      </div>

      {/* Tab Selector */}
      <div className="w-full flex border-b-2 border-[var(--tab-list-color)]/30 mb-8 max-w-md mx-auto">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('work');
          }}
          onMouseEnter={() => sounds.playHover()}
          className={`flex-1 pb-3 text-center transition-all font-semibold text-sm sm:text-lg flex items-center justify-center gap-2 ${
            activeTab === 'work'
              ? 'text-[var(--main-color)] border-b-4 border-[var(--main-color)] -mb-[3px]'
              : 'text-[var(--tab-list-color)] hover:text-white'
          }`}
        >
          <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Work Projects</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('services');
          }}
          onMouseEnter={() => sounds.playHover()}
          className={`flex-1 pb-3 text-center transition-all font-semibold text-sm sm:text-lg flex items-center justify-center gap-2 ${
            activeTab === 'services'
              ? 'text-[var(--main-color)] border-b-4 border-[var(--main-color)] -mb-[3px]'
              : 'text-[var(--tab-list-color)] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Services & Skills</span>
        </button>
      </div>

      {/* Work Tab: Featured Projects */}
      {activeTab === 'work' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fadeIn">
          {projectsList.map((project) => {
            const isNlp = project.id === 'sentiment-analysis';
            const isIot = project.id === 'smart-visitor-alert';

            return (
              <TiltCard
                key={project.id}
                maxTilt={6}
                scale={1.015}
                className="h-full rounded-2xl"
              >
                <div className="card-item group relative flex flex-col justify-between overflow-hidden p-0 border border-white/10 hover:border-[var(--main-color)] transition-all duration-300 h-full">
                  {/* Visual Header / Banner */}
                  <div 
                    onClick={() => {
                      sounds.playClick();
                      setPreviewImage({
                        url: project.imageUrl || (isNlp ? '/project_nlp.jpg' : isIot ? '/smart_visitor_alert.jpg' : '/smart_education_bpl.jpg'),
                        title: project.title,
                        category: project.category
                      });
                    }}
                    className="h-48 w-full relative overflow-hidden bg-[var(--second-bg-color)] cursor-pointer"
                    title="Click to view full image"
                  >
                    <img 
                      src={project.imageUrl || (isNlp ? '/project_nlp.jpg' : isIot ? '/smart_visitor_alert.jpg' : '/smart_education_bpl.jpg')} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--third-bg-color)] via-[var(--third-bg-color)]/30 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                      <ZoomIn className="w-3 h-3 text-[var(--main-color)]" />
                      <span>Enlarge</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[var(--bg-color)]/90 text-[var(--main-color)] border border-[var(--main-color)]/40 shadow-sm backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[var(--main-color)] transition-colors line-clamp-1 drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Project Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 text-xs text-neutral-400">
                      {project.highlights.slice(0, 2).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--main-color)] mt-1.5 flex-shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 rounded bg-[var(--second-bg-color)] text-[11px] font-mono text-[var(--main-color)] border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions & Metrics */}
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                      <div className="text-[11px] font-mono text-neutral-400">
                        {project.metrics}
                      </div>

                      <div className="flex items-center gap-2">
                        {isNlp && (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onOpenNlpDemo();
                            }}
                            className="btn-glow text-xs py-1.5 px-3 flex items-center gap-1 shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </button>
                        )}

                        {isIot && (
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onOpenIotDemo();
                            }}
                            className="btn-glow text-xs py-1.5 px-3 flex items-center gap-1 shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Simulator</span>
                          </button>
                        )}

                        <a
                          href={project.githubUrl || 'https://github.com/kailashr'}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[var(--second-bg-color)] text-neutral-300 hover:text-[var(--main-color)] hover:bg-white/5 transition-colors border border-white/10"
                          title="View GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}

      {/* Services Tab: 6 Services Matching Template */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full animate-fadeIn">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <TiltCard
                key={idx}
                maxTilt={7}
                scale={1.02}
                className="h-full rounded-2xl"
              >
                <div className="card-item p-5 flex flex-col justify-between group hover:border-[var(--main-color)] transition-all h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 rounded-xl bg-[var(--main-color)]/10 text-[var(--main-color)] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[var(--main-color)] transition-colors mb-2">
                      {svc.title}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {svc.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--second-bg-color)] text-neutral-300 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => {
            sounds.playClick();
            setPreviewImage(null);
          }}
        >
          <div 
            className="relative max-w-4xl w-full bg-[var(--second-bg-color)] border border-[var(--main-color)]/40 rounded-2xl overflow-hidden shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[var(--third-bg-color)]">
              <div>
                <span className="text-[10px] font-mono text-[var(--main-color)] uppercase tracking-wider">
                  {previewImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {previewImage.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setPreviewImage(null);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={previewImage.url} 
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[var(--third-bg-color)] border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>High Definition Architecture Graphic</span>
              <button
                onClick={() => {
                  sounds.playClick();
                  window.open(previewImage.url, '_blank');
                }}
                className="text-[var(--main-color)] hover:underline flex items-center gap-1"
              >
                <span>Open Full Resolution</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
