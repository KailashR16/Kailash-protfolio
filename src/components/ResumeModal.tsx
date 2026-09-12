import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileDown 
} from 'lucide-react';
import { 
  personalInfo, 
  educationList, 
  experienceList, 
  certificationsList, 
  languagesList,
  projectsList 
} from '../data/resumeData';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopyText = () => {
    sounds.playClick();
    const resumeText = `
KAILASH R
Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

SUMMARY:
${personalInfo.summary}

EDUCATION:
${educationList.map(e => `${e.institution} - ${e.degree} (${e.period}) [${e.score}]`).join('\n')}

INTERNSHIP:
${experienceList.map(exp => `${exp.company} - ${exp.role} (${exp.period})\n${exp.bullets.map(b => `• ${b}`).join('\n')}`).join('\n')}

TECHNICAL SKILLS:
• Programming Languages: Java, Python, SQL, Excel, PowerBI
• Core Subjects: Data Structures Algorithms, Object-Oriented Programming, DBMS, Operating Systems
• Testing: Selenium (Basic), Automation Testing
• Tools: Git, GitHub, VS Code, Eclipse, IntelliJ IDEA, Microsoft Excel, Figma

PROJECTS:
${projectsList.map(p => `• ${p.title} (${p.tags.join(', ')})\n  ${p.description}\n  ${p.highlights.map(h => `  - ${h}`).join('\n')}`).join('\n\n')}

CERTIFICATIONS:
${certificationsList.map(c => `• ${c.title} - ${c.issuer} (${c.highlight})`).join('\n')}

LANGUAGES:
${languagesList.map(l => `• ${l.language} (${l.proficiency})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 overflow-y-auto">
      <div className="w-full max-w-4xl bg-black rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Controls Bar (Hidden on Print) */}
        <div className="p-3.5 bg-[#000000] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span>OFFICIAL RESUME • KAILASH R</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Area */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-neutral-900 font-sans space-y-6 select-text">
          
          {/* Header */}
          <div className="text-center border-b pb-4 border-neutral-300 space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-neutral-950">
              {personalInfo.name}
            </h1>
            <div className="text-xs sm:text-sm text-neutral-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 pt-1 font-mono">
              <span>{personalInfo.phone}</span>
              <span>|</span>
              <a href={`mailto:${personalInfo.email}`} className="text-neutral-900 underline">{personalInfo.email}</a>
              <span>|</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-neutral-900 underline">{personalInfo.linkedinDisplay}</a>
              <span>|</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-neutral-900 underline">{personalInfo.githubDisplay}</a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed text-justify pt-1">
              {personalInfo.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Education
            </h2>
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-neutral-950">Nandha College of Technology</div>
                  <div className="italic text-neutral-800">Bachelor of Technology in Information Technology</div>
                  <div className="font-semibold text-neutral-900">CGPA: 7.33 / 10</div>
                </div>
                <div className="text-left sm:text-right text-neutral-700 font-mono text-xs">
                  <div>Erode, Tamil Nadu</div>
                  <div>2023 – 2027</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-neutral-950">Higher Secondary Certificate (HSC)</div>
                  <div className="font-semibold text-neutral-900">Score: 79.5%</div>
                </div>
                <div className="text-left sm:text-right text-neutral-700 font-mono text-xs">
                  <div>Dharmapuri, Tamil Nadu</div>
                  <div>May 2023</div>
                </div>
              </div>
            </div>
          </div>

          {/* Internship */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Internship
            </h2>
            <div className="pt-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-neutral-950">Creascent Infotech</div>
                  <div className="italic text-neutral-800">Java Intern</div>
                </div>
                <div className="text-left sm:text-right text-neutral-700 font-mono text-xs">
                  <div>Erode, Tamil Nadu</div>
                  <div>June 2025</div>
                </div>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-neutral-800">
                {experienceList[0].bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Technical Skills
            </h2>
            <div className="text-xs text-neutral-800 space-y-1 pt-1">
              <div><strong>Programming Languages:</strong> Java, Python, SQL, Excel, PowerBI</div>
              <div><strong>Core Subjects:</strong> Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems</div>
              <div><strong>Testing:</strong> Selenium (Basic), Automation Testing</div>
              <div><strong>Tools:</strong> Git, GitHub, VS Code, Eclipse, IntelliJ IDEA, Microsoft Excel, Figma</div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Projects
            </h2>
            <div className="space-y-3 pt-1">
              
              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-neutral-950">Sentiment Analysis Using Text</span>
                  <span className="italic text-neutral-700 text-xs">Python, NLP</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-neutral-800">
                  <li>Developed an NLP-based sentiment analysis model to classify text into Positive, Negative, and Neutral categories using text preprocessing and tokenization.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-neutral-950">Smart Visitor Alert System</span>
                  <span className="italic text-neutral-700 text-xs">ESP32-CAM, IoT</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-neutral-800">
                  <li>Built an IoT-based visitor monitoring system that captures visitor images and sends instant notifications for enhanced security.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-bold text-neutral-950">Smart Education for BPL Communities</span>
                  <span className="italic text-neutral-700 text-xs">AI, UI/UX</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-neutral-800">
                  <li>Designed an AI-assisted bilingual learning platform with offline accessibility to improve education for rural and economically disadvantaged students.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 pt-1 space-y-0.5 text-xs text-neutral-800">
              {certificationsList.map((c, idx) => (
                <li key={idx}>
                  <strong>{c.title}</strong> - {c.issuer} {c.highlight && `(${c.highlight})`}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5">
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-neutral-800">
              {languagesList.map((l) => (
                <div key={l.language}>
                  <strong>{l.language}:</strong> {l.proficiency}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
