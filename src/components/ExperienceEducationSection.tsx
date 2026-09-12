import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Languages, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { 
  educationList, 
  experienceList, 
  certificationsList, 
  languagesList 
} from '../data/resumeData';

interface ExperienceEducationSectionProps {
  isNightMode?: boolean;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationSectionProps> = ({
  isNightMode = true,
}) => {
  return (
    <section 
      id="experience" 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 border-t ${
        isNightMode 
          ? 'bg-[#000000] text-white border-neutral-800' 
          : 'bg-white text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Experience & Education Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Internship & Industrial Experience */}
          <div className="space-y-6">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <Briefcase className="w-4 h-4" />
              <span>Industry Immersion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Work Experience
            </h2>

            <div className="space-y-4">
              {experienceList.map((exp, idx) => (
                <div 
                  key={idx}
                  className={`rounded-2xl p-6 border space-y-4 ${
                    isNightMode 
                      ? 'bg-[#000000] border-neutral-800 text-white' 
                      : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
                  }`}
                >
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 ${
                    isNightMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    <div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        isNightMode 
                          ? 'bg-neutral-900 text-neutral-300 border-neutral-800' 
                          : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                      }`}>
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-bold mt-1.5 tracking-tight">
                        {exp.role}
                      </h3>
                      <p className={`text-sm font-medium ${
                        isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        {exp.company}
                      </p>
                    </div>

                    <div className={`text-xs font-mono sm:text-right space-y-1 ${
                      isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${
                        isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills acquired */}
                  <div className={`pt-3 border-t space-y-2 ${
                    isNightMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    <div className={`text-[11px] font-mono uppercase ${
                      isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      COMPETENCIES ACQUIRED:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skillsGained.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2.5 py-0.5 rounded-md border text-xs font-mono ${
                            isNightMode 
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                              : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Academic Education */}
          <div className="space-y-6">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <GraduationCap className="w-4 h-4" />
              <span>Academic Education</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Education
            </h2>

            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div 
                  key={idx}
                  className={`rounded-2xl p-6 border space-y-4 ${
                    isNightMode 
                      ? 'bg-[#000000] border-neutral-800 text-white' 
                      : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
                  }`}
                >
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 ${
                    isNightMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    <div>
                      <div className="text-base sm:text-lg font-bold tracking-tight">
                        {edu.institution}
                      </div>
                      <p className={`text-sm font-medium ${
                        isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        {edu.degree}
                      </p>
                    </div>

                    <div className={`text-xs font-mono sm:text-right space-y-1 ${
                      isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${
                    isNightMode 
                      ? 'bg-neutral-900 border-neutral-800 text-white' 
                      : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                  }`}>
                    <span>{edu.score}</span>
                  </div>

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className={`flex items-start gap-2 text-xs ${
                          isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                        }`}>
                          <span className="font-mono text-neutral-400">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications & Languages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-2">
          
          {/* Certifications (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <Award className="w-4 h-4" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Certifications & Honors
            </h2>

            <div className="space-y-2.5">
              {certificationsList.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    isNightMode 
                      ? 'bg-[#000000] border-neutral-800 text-white' 
                      : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                      isNightMode 
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                        : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold">
                        {cert.title}
                      </h4>
                      <p className={`text-xs ${
                        isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {cert.highlight && (
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold shrink-0 border ${
                      isNightMode 
                        ? 'bg-neutral-900 border-neutral-800 text-white' 
                        : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    }`}>
                      {cert.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
              isNightMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              <Languages className="w-4 h-4" />
              <span>Communication</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Languages
            </h2>

            <div className={`p-5 rounded-xl border space-y-4 ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
            }`}>
              {languagesList.map((lang) => (
                <div key={lang.language} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold">{lang.language}</span>
                    <span className={isNightMode ? 'text-neutral-400' : 'text-neutral-600'}>
                      {lang.proficiency}
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                    isNightMode ? 'bg-neutral-900' : 'bg-neutral-200'
                  }`}>
                    <div 
                      className={`h-1.5 rounded-full ${
                        isNightMode ? 'bg-white' : 'bg-neutral-900'
                      }`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
