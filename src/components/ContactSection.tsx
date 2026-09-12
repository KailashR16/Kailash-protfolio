import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';

interface ContactSectionProps {
  isNightMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isNightMode = true,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Data Analyst Role / Opportunity for Kailash R',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const presets = [
    { label: 'Data Analyst Interview', subject: 'Interview Invitation: Data Analyst Position', text: `Hi Kailash,\n\nWe were impressed by your background in Python, SQL, Excel, and PowerBI. We would like to schedule an interview with you for our Data Analyst team.` },
    { label: 'Java Developer Role', subject: 'Opportunity: Java Software Engineer', text: `Hi Kailash,\n\nWe saw your NPTEL Java Elite+Gold certification and internship at Creascent Infotech. We would love to discuss a software development opportunity with you.` },
    { label: 'Project Inquiry', subject: 'Collaboration on Analytics Project', text: `Hi Kailash,\n\nI reviewed your projects and would like to connect on an upcoming technical initiative.` },
  ];

  const handleCopy = (text: string, field: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePresetSelect = (p: typeof presets[0]) => {
    sounds.playClick();
    setFormData((prev) => ({
      ...prev,
      subject: p.subject,
      message: p.text,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setSubmitted(true);

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoUrl;

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section 
      id="contact" 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 border-t ${
        isNightMode 
          ? 'bg-[#000000] text-white border-neutral-800' 
          : 'bg-white text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
            isNightMode 
              ? 'bg-[#000000] border-neutral-800 text-neutral-400' 
              : 'bg-neutral-100 border-neutral-300 text-neutral-600'
          }`}>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact & Correspondence
          </h2>
          <p className={`text-sm sm:text-base ${
            isNightMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Actively seeking Data Analyst and Software Developer opportunities. Reach out directly for interviews, roles, and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Direct Email Card */}
            <div className={`rounded-xl p-4 border flex items-center justify-between ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    DIRECT EMAIL
                  </div>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className={`p-2 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900'
                }`}
                title="Copy email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Phone Card */}
            <div className={`rounded-xl p-4 border flex items-center justify-between ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    PHONE / WHATSAPP
                  </div>
                  <a 
                    href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className={`p-2 rounded-lg border transition-colors ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900'
                }`}
                title="Copy phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Profile Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className={`rounded-xl p-4 border flex items-center justify-between transition-colors block ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-white hover:border-neutral-600' 
                  : 'bg-white border-neutral-200 text-neutral-900 hover:border-neutral-400 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    LINKEDIN NETWORK
                  </div>
                  <div className="text-sm font-semibold flex items-center gap-1">
                    <span>{personalInfo.linkedinDisplay}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>

            {/* GitHub Profile Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className={`rounded-xl p-4 border flex items-center justify-between transition-colors block ${
                isNightMode 
                  ? 'bg-[#000000] border-neutral-800 text-white hover:border-neutral-600' 
                  : 'bg-white border-neutral-200 text-neutral-900 hover:border-neutral-400 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  isNightMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${
                    isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    GITHUB REPOSITORIES
                  </div>
                  <div className="text-sm font-semibold flex items-center gap-1">
                    <span>{personalInfo.githubDisplay}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>

            {/* Location & Timezone info */}
            <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-neutral-400' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-600'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>IST (UTC +5:30)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form with Presets */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl p-6 sm:p-7 border space-y-5 ${
              isNightMode 
                ? 'bg-[#000000] border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
            }`}>
              
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Send Direct Message
                </h3>
                <p className={`text-xs font-mono mt-1 ${
                  isNightMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Select a template or compose a message:
                </p>
              </div>

              {/* Template Presets */}
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePresetSelect(p)}
                    className={`px-3 py-1 rounded-md text-xs font-mono border transition-colors ${
                      isNightMode 
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                        : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                    }`}
                  >
                    + {p.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={`text-xs font-mono ${
                      isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Talent Acquisition"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-mono focus:outline-none ${
                        isNightMode 
                          ? 'bg-[#000000] border-neutral-800 text-white focus:border-neutral-500 placeholder-neutral-600' 
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-500 placeholder-neutral-400'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs font-mono ${
                      isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-mono focus:outline-none ${
                        isNightMode 
                          ? 'bg-[#000000] border-neutral-800 text-white focus:border-neutral-500 placeholder-neutral-600' 
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-500 placeholder-neutral-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-mono ${
                    isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-mono focus:outline-none ${
                      isNightMode 
                        ? 'bg-[#000000] border-neutral-800 text-white focus:border-neutral-500' 
                        : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-500'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-mono ${
                    isNightMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about the role, technology stack, or interview schedule..."
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-mono focus:outline-none resize-none ${
                      isNightMode 
                        ? 'bg-[#000000] border-neutral-800 text-white focus:border-neutral-500 placeholder-neutral-600' 
                        : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-500 placeholder-neutral-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-colors ${
                    isNightMode 
                      ? 'bg-white text-black hover:bg-neutral-200' 
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Kailash</span>
                </button>

                {submitted && (
                  <div className={`p-3 rounded-lg border text-xs font-mono text-center ${
                    isNightMode 
                      ? 'bg-neutral-950 border-neutral-700 text-neutral-200' 
                      : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                  }`}>
                    Opening your mail client to send directly to kailashrangasamy7@gmail.com
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
