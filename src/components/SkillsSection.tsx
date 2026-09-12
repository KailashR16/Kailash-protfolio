import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Database, 
  Layers, 
  CheckSquare, 
  ShieldCheck, 
  GitBranch, 
  Code, 
  Box, 
  Figma, 
  BarChart2, 
  FileSpreadsheet, 
  Server, 
  HardDrive,
  Coffee,
  Play,
  Table
} from 'lucide-react';
import { technicalSkills } from '../data/resumeData';
import { SkillItem } from '../types';
import { sounds } from '../utils/audio';

interface SkillsSectionProps {
  isNightMode?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  isNightMode = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(technicalSkills[0]);
  const [sqlQuery, setSqlQuery] = useState<string>(
    'SELECT student_id, domain, test_score, status FROM analytics_cohort WHERE test_score >= 80 ORDER BY test_score DESC;'
  );
  const [queryExecuted, setQueryExecuted] = useState(true);

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'languages', label: 'Languages & BI' },
    { id: 'core', label: 'Core CS Subjects' },
    { id: 'testing', label: 'QA & Testing' },
    { id: 'tools', label: 'Tools & IDEs' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? technicalSkills
    : technicalSkills.filter((s) => s.category === activeCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-neutral-300" />;
      case 'Database': return <Database className="w-5 h-5 text-neutral-300" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-neutral-300" />;
      case 'Sheet': return <FileSpreadsheet className="w-5 h-5 text-neutral-300" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5 text-neutral-300" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-neutral-300" />;
      case 'Layers': return <Layers className="w-5 h-5 text-neutral-300" />;
      case 'Server': return <Server className="w-5 h-5 text-neutral-300" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-neutral-300" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-neutral-300" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-neutral-300" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-neutral-300" />;
      case 'Code': return <Code className="w-5 h-5 text-neutral-300" />;
      case 'Box': return <Box className="w-5 h-5 text-neutral-300" />;
      case 'Figma': return <Figma className="w-5 h-5 text-neutral-300" />;
      default: return <Code className="w-5 h-5 text-neutral-300" />;
    }
  };

  const sampleSQLData = [
    { student_id: 'KR-101', domain: 'Data Analytics', test_score: 96, status: 'EXCELLENT' },
    { student_id: 'KR-102', domain: 'Java Backend', test_score: 92, status: 'HONORS' },
    { student_id: 'KR-103', domain: 'IoT Automation', test_score: 88, status: 'DISTINCTION' },
    { student_id: 'KR-104', domain: 'SQL & Modeling', test_score: 94, status: 'EXCELLENT' },
  ];

  return (
    <section 
      id="skills" 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 border-t ${
        isNightMode 
          ? 'bg-[#000000] text-white border-neutral-800' 
          : 'bg-white text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${
          isNightMode ? 'border-neutral-800' : 'border-neutral-200'
        }`}>
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <Cpu className="w-4 h-4" />
              <span>Technical Competencies & Tooling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Technical Skill Matrix
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              From data analysis in Python, SQL, and Excel to object-oriented Java architecture, QA testing methodologies, and UI design in Figma.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(c.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  activeCategory === c.id
                    ? isNightMode 
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                    : isNightMode
                      ? 'bg-[#000000] text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-neutral-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name}
              onClick={() => {
                sounds.playClick();
                setSelectedSkill(skill);
              }}
              className={`rounded-xl p-5 border cursor-pointer transition-colors h-full flex flex-col justify-between ${
                selectedSkill?.name === skill.name 
                  ? isNightMode 
                    ? 'bg-neutral-950 border-white text-white' 
                    : 'bg-neutral-100 border-neutral-900 text-neutral-900'
                  : isNightMode
                    ? 'bg-[#000000] border-neutral-800 text-neutral-300 hover:border-neutral-600'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${
                    isNightMode 
                      ? 'bg-neutral-900 border-neutral-800' 
                      : 'bg-neutral-100 border-neutral-200'
                  }`}>
                    {getIcon(skill.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold">
                    {skill.level}%
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold tracking-tight">
                    {skill.name}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-4 mt-auto">
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                  isNightMode ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}>
                  <div 
                    className={`h-1.5 rounded-full ${
                      isNightMode ? 'bg-white' : 'bg-neutral-900'
                    }`} 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive SQL & Data Analytics Terminal */}
        <div className={`p-6 sm:p-7 rounded-2xl border space-y-5 ${
          isNightMode 
            ? 'bg-[#000000] border-neutral-800 text-white' 
            : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
        }`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${
            isNightMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg border ${
                isNightMode 
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                  : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">
                  Interactive SQL & Data Query Terminal
                </h3>
                <p className={`text-xs font-mono ${
                  isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Relational database query runner (MySQL & PostgreSQL dialect)
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setQueryExecuted(true);
                }}
                className={`px-4 py-2 rounded-lg font-mono font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                  isNightMode 
                    ? 'bg-white text-black hover:bg-neutral-200' 
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>

          {/* SQL Input query box */}
          <div className="space-y-2">
            <div className={`flex items-center justify-between text-xs font-mono ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <span>SQL Query Editor:</span>
              <span>Engine: PostgreSQL / SQLite Dialect</span>
            </div>
            <textarea
              rows={2}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border font-mono text-xs focus:outline-none resize-none ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-neutral-200 focus:border-neutral-500' 
                  : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-500'
              }`}
            />
          </div>

          {/* Query Output Table */}
          {queryExecuted && (
            <div className="space-y-2.5 pt-1">
              <div className={`flex items-center justify-between text-xs font-mono ${
                isNightMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                <span className="flex items-center gap-1 text-emerald-500">
                  <Table className="w-3.5 h-3.5" />
                  Execution OK: 4 rows returned (1.2ms)
                </span>
                <span>Cohort Analysis Table</span>
              </div>

              <div className={`overflow-x-auto rounded-lg border ${
                isNightMode ? 'border-neutral-800 bg-[#000000]' : 'border-neutral-200 bg-neutral-50'
              }`}>
                <table className="w-full text-left text-xs font-mono">
                  <thead className={`border-b ${
                    isNightMode ? 'bg-neutral-950 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                  }`}>
                    <tr>
                      <th className="px-4 py-2.5">student_id</th>
                      <th className="px-4 py-2.5">domain</th>
                      <th className="px-4 py-2.5">test_score</th>
                      <th className="px-4 py-2.5">status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isNightMode ? 'divide-neutral-800 text-neutral-300' : 'divide-neutral-200 text-neutral-700'
                  }`}>
                    {sampleSQLData.map((row) => (
                      <tr key={row.student_id}>
                        <td className="px-4 py-2 font-semibold text-white">{row.student_id}</td>
                        <td className="px-4 py-2">{row.domain}</td>
                        <td className="px-4 py-2 font-bold">{row.test_score}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] border ${
                            isNightMode 
                              ? 'bg-neutral-900 text-neutral-300 border-neutral-800' 
                              : 'bg-neutral-200 text-neutral-800 border-neutral-300'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
