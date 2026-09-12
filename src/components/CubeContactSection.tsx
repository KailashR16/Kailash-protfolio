import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  CheckCircle2, 
  Linkedin, 
  Github,
  MessageSquare
} from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { sounds } from '../utils/audio';

export const CubeContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presets = [
    { label: 'Data Analyst Role', subject: 'Interview Opportunity: Data Analyst', msg: 'Hi Kailash, we reviewed your analytics projects and would love to connect regarding our Data Analyst opening.' },
    { label: 'Software Engineer', subject: 'Inquiry: Software Engineering Role', msg: 'Hi Kailash, your Java, Python, and SQL expertise align well with our development stack. Let’s talk.' },
    { label: 'Analytics Consultation', subject: 'Data Dashboard Project', msg: 'Hi Kailash, I have a data pipeline and PowerBI dashboard requirement that I’d like to discuss with you.' },
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    sounds.playClick();
    setFormData((prev) => ({
      ...prev,
      subject: preset.subject,
      message: preset.msg,
    }));
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-full flex flex-col justify-start items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-20 max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Contact
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--main-color)] mt-1">
          Let's Work Together!
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
          Have an open position, project inquiry, or data problem? Reach out directly.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Coordinates */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-item p-6 space-y-5">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--main-color)]" />
              <span>Direct Coordinates</span>
            </h4>

            {/* Email Card */}
            <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-[var(--main-color)]/15 text-[var(--main-color)] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-neutral-400">Email Address</div>
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                    {personalInfo.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="p-2 text-neutral-400 hover:text-[var(--main-color)] transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-[var(--main-color)]/15 text-[var(--main-color)] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-neutral-400">Mobile Phone</div>
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                    {personalInfo.phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="p-2 text-neutral-400 hover:text-[var(--main-color)] transition-colors"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location */}
            <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--main-color)]/15 text-[var(--main-color)] flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-neutral-400">Location</div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Social Channels</span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[var(--second-bg-color)] text-neutral-300 hover:text-[var(--main-color)] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[var(--second-bg-color)] text-neutral-300 hover:text-[var(--main-color)] transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="card-item p-6">
            {/* Quick Templates */}
            <div className="mb-4">
              <span className="text-xs font-mono text-neutral-400 block mb-2">
                Quick Template Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="px-2.5 py-1 rounded bg-[var(--second-bg-color)] hover:bg-[var(--main-color)]/10 text-[11px] font-mono text-neutral-300 hover:text-[var(--main-color)] border border-white/10 transition-colors"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-[var(--second-bg-color)] rounded-xl border border-[var(--main-color)]/30 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[var(--main-color)]/20 text-[var(--main-color)] flex items-center justify-center mx-auto shadow-[0_0_20px_var(--main-color)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto">
                  Thank you for reaching out, <span className="text-[var(--main-color)]">{formData.fullName || 'Recruiter'}</span>. I will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline text-xs mt-3"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[var(--main-color)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[var(--main-color)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[var(--main-color)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Data Analyst Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[var(--main-color)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your role, project, or question..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[var(--main-color)] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    className="btn-glow w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
