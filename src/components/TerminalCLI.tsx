import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { personalInfo, technicalSkills, projectsList, educationList, certificationsList } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface TerminalCLIProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalCLI: React.FC<TerminalCLIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command?: string; output: React.ReactNode }>>([
    {
      output: (
        <div className="space-y-1 text-neutral-300">
          <div className="text-white font-bold">
            KAILASH-OS // DATA ANALYST & ENGINEERING WORKSTATION
          </div>
          <div className="text-xs text-neutral-400">
            Type <span className="text-white font-semibold">help</span> to view available commands or try <span className="text-white font-semibold">nlp I love data analysis!</span>
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    sounds.playClick();
    const args = cmd.split(' ');
    const primaryCmd = args[0].toLowerCase();

    let outputNode: React.ReactNode = null;

    if (primaryCmd === 'help') {
      outputNode = (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-white font-bold mb-1">AVAILABLE COMMANDS:</div>
          <div><span className="text-white font-semibold w-24 inline-block">about</span> - Display summary & profile</div>
          <div><span className="text-white font-semibold w-24 inline-block">skills</span> - List technical skills & proficiency</div>
          <div><span className="text-white font-semibold w-24 inline-block">projects</span> - View featured engineering & NLP projects</div>
          <div><span className="text-white font-semibold w-24 inline-block">education</span> - Academic credentials and CGPA</div>
          <div><span className="text-white font-semibold w-24 inline-block">certs</span> - Verified certifications & honors</div>
          <div><span className="text-white font-semibold w-24 inline-block">nlp &lt;text&gt;</span> - Run instant sentiment classification</div>
          <div><span className="text-white font-semibold w-24 inline-block">contact</span> - Phone, Email, LinkedIn & GitHub coordinates</div>
          <div><span className="text-white font-semibold w-24 inline-block">clear</span> - Clear terminal buffer</div>
          <div><span className="text-white font-semibold w-24 inline-block">exit</span> - Close terminal CLI</div>
        </div>
      );
    } else if (primaryCmd === 'about') {
      outputNode = (
        <div className="space-y-1 text-xs text-neutral-300 font-mono">
          <div className="text-white font-bold">{personalInfo.name} - {personalInfo.title}</div>
          <div className="text-neutral-400 leading-relaxed">{personalInfo.summary}</div>
          <div className="text-neutral-300 mt-1">Status: {personalInfo.availability}</div>
        </div>
      );
    } else if (primaryCmd === 'skills') {
      outputNode = (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-white font-bold">TECHNICAL SKILLS:</div>
          <div className="grid grid-cols-2 gap-1 text-neutral-300">
            {technicalSkills.map((s) => (
              <div key={s.name} className="flex justify-between pr-4">
                <span>• {s.name}</span>
                <span className="text-neutral-400">[{s.level}%]</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (primaryCmd === 'projects') {
      outputNode = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-white font-bold">FEATURED PROJECTS:</div>
          {projectsList.map((p, i) => (
            <div key={p.id} className="p-2 rounded bg-neutral-900 border border-neutral-800">
              <div className="text-white font-bold">{i + 1}. {p.title} ({p.techStack.join(', ')})</div>
              <div className="text-neutral-400 text-[11px]">{p.description}</div>
            </div>
          ))}
        </div>
      );
    } else if (primaryCmd === 'education') {
      outputNode = (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-white font-bold">ACADEMIC CREDENTIALS:</div>
          {educationList.map((e) => (
            <div key={e.institution} className="text-neutral-300">
              <div className="text-white font-semibold">• {e.institution}</div>
              <div className="text-neutral-400">{e.degree} | {e.period}</div>
              <div className="text-neutral-200 font-bold">{e.score}</div>
            </div>
          ))}
        </div>
      );
    } else if (primaryCmd === 'certs') {
      outputNode = (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-white font-bold">VERIFIED CERTIFICATIONS:</div>
          {certificationsList.map((c) => (
            <div key={c.title} className="text-neutral-300">
              • <span className="text-white font-semibold">{c.title}</span> - {c.issuer} ({c.highlight})
            </div>
          ))}
        </div>
      );
    } else if (primaryCmd === 'nlp') {
      const sentence = args.slice(1).join(' ');
      if (!sentence) {
        outputNode = <div className="text-neutral-400 text-xs font-mono">Error: Provide text to classify, e.g.: nlp The dataset analysis is clean and accurate</div>;
      } else {
        const isPos = /great|good|clean|love|accurate|fast|best|increase|success/i.test(sentence);
        const isNeg = /bad|poor|slow|error|fail|terrible|broken/i.test(sentence);
        const sentiment = isPos ? 'POSITIVE (+0.84)' : isNeg ? 'NEGATIVE (-0.72)' : 'NEUTRAL (+0.05)';
        outputNode = (
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono">
            <div className="text-neutral-400">Input: "{sentence}"</div>
            <div className="text-neutral-300 mt-0.5">Tokens: {sentence.split(' ').length} parsed</div>
            <div className="mt-1 font-bold">
              Classification: <span className="text-white">{sentiment}</span>
            </div>
          </div>
        );
      }
    } else if (primaryCmd === 'contact') {
      outputNode = (
        <div className="space-y-1 text-xs font-mono text-neutral-300">
          <div className="text-white font-bold">CONTACT INFO:</div>
          <div>Phone: <a href={`tel:${personalInfo.phone}`} className="underline text-white">{personalInfo.phone}</a></div>
          <div>Email: <a href={`mailto:${personalInfo.email}`} className="underline text-white">{personalInfo.email}</a></div>
          <div>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline text-white">{personalInfo.linkedinDisplay}</a></div>
          <div>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline text-white">{personalInfo.githubDisplay}</a></div>
        </div>
      );
    } else if (primaryCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (primaryCmd === 'exit') {
      onClose();
      setInput('');
      return;
    } else {
      outputNode = (
        <div className="text-neutral-400 text-xs font-mono">
          Command not recognized: "{cmd}". Type <span className="text-white underline">help</span> for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-3xl h-[520px] rounded-2xl bg-[#000000] border border-neutral-800 flex flex-col overflow-hidden">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#000000] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-white" />
            <span className="font-mono text-xs font-semibold text-neutral-200">
              kailash@workstation: ~/portfolio-cli
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output buffer area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono space-y-3 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <span className="text-neutral-500">kailash-os:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              {item.output}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt line */}
        <form onSubmit={handleCommand} className="p-3 bg-[#000000] border-t border-neutral-800 flex items-center gap-2">
          <span className="font-mono text-xs text-neutral-400">kailash-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              sounds.playKeypress();
            }}
            placeholder="Type 'help', 'skills', 'projects', 'nlp <sentence>'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs flex items-center gap-1 border border-neutral-800"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
