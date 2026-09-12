import React, { useState } from 'react';
import { 
  Camera, 
  Wifi, 
  BookOpen, 
  Globe2, 
  Database, 
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio';

// 1. LIVE NLP SENTIMENT ANALYSIS SIMULATOR
export const SentimentAnalysisDemo: React.FC = () => {
  const [inputText, setInputText] = useState(
    'This business intelligence dashboard increased our data reporting speed and delivered great analytical insights!'
  );

  // Preset example phrases for quick testing
  const presets = [
    { label: 'Positive', text: 'This business intelligence dashboard increased our data reporting speed and delivered great analytical insights!' },
    { label: 'Negative', text: 'The database query was terribly slow, and missing indexes caused severe server timeouts and failures.' },
    { label: 'Neutral', text: 'The quarterly financial dataset was preprocessed and exported into a standard CSV format.' },
  ];

  // Client-side NLP Tokenizer & Lexicon Polarity Classifier
  const runNLPAnalysis = (text: string) => {
    const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const tokens = cleanText.split(/\s+/).filter(Boolean);

    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'for', 'of', 'or', 'by', 'with', 'this', 'our', 'was', 'were', 'it']);
    const meaningfulTokens = tokens.filter(t => !stopWords.has(t));

    const posWords = new Set([
      'great', 'good', 'excellent', 'amazing', 'speed', 'fast', 'love', 'insightful', 
      'increased', 'delivered', 'boosted', 'clean', 'accurate', 'impressive', 'best', 
      'wonderful', 'efficient', 'success', 'positive', 'valuable', 'perfect'
    ]);
    const negWords = new Set([
      'slow', 'bad', 'terrible', 'terribly', 'poor', 'awful', 'timeout', 'failures', 
      'failed', 'failure', 'broken', 'error', 'buggy', 'severe', 'delay', 'loss', 
      'worst', 'useless', 'corrupt', 'crash', 'crashed'
    ]);

    let posCount = 0;
    let negCount = 0;

    meaningfulTokens.forEach(token => {
      if (posWords.has(token)) posCount++;
      if (negWords.has(token)) negCount++;
    });

    let sentiment: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';
    let polarityScore = 0; // -1 to 1

    if (posCount > negCount) {
      sentiment = 'Positive';
      polarityScore = Math.min(0.35 + (posCount - negCount) * 0.25, 0.98);
    } else if (negCount > posCount) {
      sentiment = 'Negative';
      polarityScore = Math.max(-0.35 - (negCount - posCount) * 0.25, -0.98);
    } else {
      sentiment = 'Neutral';
      polarityScore = 0.05;
    }

    const posPercent = sentiment === 'Positive' ? Math.round((polarityScore * 50) + 50) : (sentiment === 'Neutral' ? 30 : 15);
    const negPercent = sentiment === 'Negative' ? Math.round((Math.abs(polarityScore) * 50) + 50) : (sentiment === 'Neutral' ? 25 : 12);
    const neutralPercent = Math.max(10, 100 - posPercent - negPercent);

    return {
      tokens,
      meaningfulTokens,
      sentiment,
      polarityScore,
      posPercent,
      negPercent,
      neutralPercent,
      posCount,
      negCount,
    };
  };

  const results = runNLPAnalysis(inputText);

  const handleTestPreset = (text: string) => {
    setInputText(text);
    sounds.playClick();
  };

  const handleAnalyzeClick = () => {
    sounds.playClick();
  };

  return (
    <div className="space-y-4 p-5 rounded-xl bg-[#000000] border border-neutral-800 text-neutral-200">
      
      {/* Header with NLP Badge */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="text-xs font-mono font-bold text-white uppercase">
            LIVE NLP TOKENIZER & POLARITY ENGINE (PYTHON / NLP)
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          Interactive Algorithm Sandbox
        </span>
      </div>

      {/* Input area */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-neutral-300 flex items-center justify-between">
          <span>Input Sample Text or Review:</span>
          <span className="text-[11px] text-neutral-400 font-mono">
            {inputText.length} chars | {results.tokens.length} words
          </span>
        </label>
        
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            sounds.playKeypress();
          }}
          placeholder="Enter text to classify sentiment..."
          className="w-full px-3 py-2.5 rounded-lg bg-[#000000] border border-neutral-800 focus:border-neutral-500 focus:outline-none text-sm font-mono text-white placeholder-neutral-600 resize-none transition-colors"
        />

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-neutral-400">Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => handleTestPreset(p.text)}
              className="px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={handleAnalyzeClick}
            className="ml-auto px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors"
          >
            Classify Polarity
          </button>
        </div>
      </div>

      {/* Analysis Output & NLP Token Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
        
        {/* Sentiment Result Card */}
        <div className="md:col-span-4 p-4 rounded-lg bg-[#000000] border border-neutral-800 flex flex-col justify-center items-center text-center">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            PREDICTED CLASSIFICATION
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white mt-1">
            {results.sentiment.toUpperCase()}
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1">
            Polarity Score: <span className="text-white font-bold">{results.polarityScore.toFixed(2)}</span>
          </div>
        </div>

        {/* Confidence Bars */}
        <div className="md:col-span-8 p-3.5 rounded-lg bg-[#000000] border border-neutral-800 space-y-2.5">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">
            MODEL CLASS DISTRIBUTION
          </div>

          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-neutral-300">Positive Confidence</span>
                <span className="text-white font-bold">{results.posPercent}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full" 
                  style={{ width: `${results.posPercent}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-neutral-400">Neutral Confidence</span>
                <span className="text-neutral-300 font-bold">{results.neutralPercent}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-1.5">
                <div 
                  className="bg-neutral-500 h-1.5 rounded-full" 
                  style={{ width: `${results.neutralPercent}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-neutral-400">Negative Confidence</span>
                <span className="text-neutral-300 font-bold">{results.negPercent}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-1.5">
                <div 
                  className="bg-neutral-600 h-1.5 rounded-full" 
                  style={{ width: `${results.negPercent}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Preprocessing & Tokenization Pipeline Preview */}
      <div className="p-3 rounded-lg bg-[#000000] border border-neutral-800 space-y-1.5">
        <div className="text-[10px] font-mono text-neutral-400 uppercase flex items-center justify-between">
          <span>Tokenization & Stop-word Filtering:</span>
          <span>{results.meaningfulTokens.length} feature tokens parsed</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {results.meaningfulTokens.slice(0, 16).map((token, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-neutral-300"
            >
              #{token}
            </span>
          ))}
          {results.meaningfulTokens.length > 16 && (
            <span className="text-[11px] font-mono text-neutral-500 self-center">
              +{results.meaningfulTokens.length - 16} more
            </span>
          )}
        </div>
      </div>

    </div>
  );
};


// 2. LIVE SMART VISITOR ALERT SYSTEM (ESP32-CAM & IoT SIMULATOR)
export const SmartVisitorAlertDemo: React.FC = () => {
  const [isArmed, setIsArmed] = useState(true);
  const [recentEvents, setRecentEvents] = useState<
    Array<{ id: string; time: string; status: string; visitorId: string }>
  >([
    { id: '1', time: '14:23:09', status: 'Visitor Snapshot Broadcasted', visitorId: 'VISITOR-7402' },
    { id: '2', time: '11:05:42', status: 'Visitor Snapshot Broadcasted', visitorId: 'VISITOR-7401' },
  ]);

  const handleSimulateVisitor = () => {
    sounds.playAlert();

    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const newEvent = {
      id: String(Date.now()),
      time: timeString,
      status: 'Motion Detected & Frame Captured',
      visitorId: `VISITOR-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setRecentEvents((prev) => [newEvent, ...prev.slice(0, 4)]);
  };

  return (
    <div className="space-y-4 p-5 rounded-xl bg-[#000000] border border-neutral-800 text-neutral-200">
      
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-neutral-300" />
          <span className="text-xs font-mono font-bold text-white uppercase">
            ESP32-CAM IOT SURVEILLANCE NODE #01
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-neutral-300">
            <Wifi className="w-3.5 h-3.5" /> 2.4GHz Wi-Fi (OK)
          </span>
          <span className="text-neutral-500 hidden sm:inline">OV2640 Lens</span>
        </div>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative aspect-video rounded-lg bg-[#000000] border border-neutral-800 overflow-hidden flex flex-col justify-between p-3.5">
        
        {/* Viewport Overlay elements */}
        <div className="flex items-center justify-between z-10 font-mono text-[11px] text-neutral-300">
          <div className="flex items-center gap-2 bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>LIVE REC • 1080p 24FPS</span>
          </div>
          <div className="bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800 text-neutral-400">
            NODE-IP: 192.168.1.84
          </div>
        </div>

        {/* Simulated Camera Center Crosshairs */}
        <div className="relative self-center flex items-center justify-center w-36 h-36 border border-neutral-700 rounded-lg">
          <div className="text-center font-mono text-[10px] text-neutral-400">
            [PIR SENSOR]
            <br />
            ZONE READY
          </div>
        </div>

        {/* Camera Footer Telemetry */}
        <div className="flex items-center justify-between z-10 font-mono text-[11px] text-neutral-400">
          <div className="bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
            BUFFER: 512KB SRAM
          </div>
          <div className="bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800 text-white">
            TRIGGER LATENCY: 1.8s
          </div>
        </div>
      </div>

      {/* Simulator Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          onClick={handleSimulateVisitor}
          className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs flex items-center gap-2 transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Simulate Visitor Detection</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setIsArmed(!isArmed);
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
            isArmed 
              ? 'bg-[#000000] border-neutral-700 text-neutral-200' 
              : 'bg-neutral-900 border-neutral-800 text-neutral-500'
          }`}
        >
          {isArmed ? 'Status: Armed & Listening' : 'Status: Disarmed'}
        </button>
      </div>

      {/* Notification Logs */}
      <div className="space-y-1.5 pt-2">
        <div className="text-[10px] font-mono text-neutral-400 uppercase">
          LIVE DISPATCH LOGS:
        </div>
        <div className="space-y-1.5">
          {recentEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-2 rounded-lg bg-[#000000] border border-neutral-800 font-mono text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-white font-semibold">{evt.visitorId}</span>
                <span className="text-neutral-400 text-[11px] hidden sm:inline">- {evt.status}</span>
              </div>
              <span className="text-[11px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded">
                {evt.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


// 3. LIVE SMART EDUCATION PLATFORM (BILINGUAL & OFFLINE SIMULATOR)
export const SmartEducationDemo: React.FC = () => {
  const [language, setLanguage] = useState<'ta' | 'en'>('en');
  const [offlineMode, setOfflineMode] = useState(true);
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);

  const content = {
    en: {
      title: 'Smart Learning Platform for Rural Learners',
      subtitle: 'Optimized for zero-bandwidth zones with offline caching',
      moduleTitle: 'Module 1: What is a Data Structure?',
      moduleBody: 'A data structure is a specialized format for organizing, processing, retrieving, and storing data efficiently on a computer system.',
      quizQuestion: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
      options: ['Stack (LIFO)', 'Queue (FIFO)', 'Binary Tree', 'Hash Map'],
      correctIdx: 1,
      offlineBadge: 'Offline Cache Active',
      switchPrompt: 'தமிழ் (Tamil)',
    },
    ta: {
      title: 'கிராமப்புற மாணவர்களுக்கான நவீன கற்றல் தளம்',
      subtitle: 'இணைய வசதி இல்லாத இடங்களிலும் ஆஃப்லைனில் இயங்கும் கட்டமைப்பு',
      moduleTitle: 'பாடப்பிரிவு 1: தரவுக் கட்டமைப்பு (Data Structure) என்றால் என்ன?',
      moduleBody: 'தரவுக் கட்டமைப்பு என்பது கணினியில் தகவல்களை ஒழுங்குபடுத்தி, பாதுகாத்து, விரைவாகப் பயன்படுத்த உதவும் ஒரு வழிமுறையாகும்.',
      quizQuestion: 'முதலில் வருபவருக்கு முன்னுரிமை (FIFO) என்ற விதியைப் பின்பற்றும் கட்டமைப்பு எது?',
      options: ['ஸ்டேக் (Stack)', 'வரிசை (Queue - FIFO)', 'இருபடி மரம் (Binary Tree)', 'ஹாஷ் மேப் (Hash Map)'],
      correctIdx: 1,
      offlineBadge: 'ஆஃப்லைன் சேமிப்பு இயங்குகிறது',
      switchPrompt: 'English',
    },
  };

  const current = content[language];

  return (
    <div className="space-y-4 p-5 rounded-xl bg-[#000000] border border-neutral-800 text-neutral-200">
      
      {/* Top bar with language & offline switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neutral-300" />
          <span className="text-xs font-mono font-bold text-white uppercase">
            BILINGUAL ACCESSIBILITY SYSTEM (AI & UI/UX)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={() => {
              sounds.playClick();
              setLanguage(language === 'en' ? 'ta' : 'en');
            }}
            className="px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Switch to: <strong>{current.switchPrompt}</strong></span>
          </button>

          {/* Offline Mode Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setOfflineMode(!offlineMode);
            }}
            className={`px-2.5 py-1 rounded-md border text-xs font-mono flex items-center gap-1.5 ${
              offlineMode 
                ? 'bg-[#000000] border-neutral-700 text-neutral-200' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{offlineMode ? 'Offline Cache: ON' : 'Cloud Sync'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Prototype Card */}
      <div className="p-4 rounded-lg bg-[#000000] border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-white uppercase font-semibold">
            {current.moduleTitle}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
            {current.offlineBadge}
          </span>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {current.moduleBody}
        </p>

        {/* Micro Quiz */}
        <div className="pt-2 border-t border-neutral-800 space-y-2">
          <div className="text-xs font-mono text-neutral-300 font-medium">
            Question: {current.quizQuestion}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.options.map((opt, idx) => {
              const isSelected = activeQuizAnswer === idx;
              const isCorrect = idx === current.correctIdx;

              return (
                <button
                  key={opt}
                  onClick={() => {
                    setActiveQuizAnswer(idx);
                    if (isCorrect) {
                      sounds.playSuccess();
                    } else {
                      sounds.playAlert();
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-colors flex items-center justify-between ${
                    isSelected
                      ? isCorrect
                        ? 'bg-neutral-900 border-neutral-400 text-white'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                      : 'bg-[#000000] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>

          {activeQuizAnswer !== null && (
            <div className={`p-2 rounded-md text-xs font-mono border ${
              activeQuizAnswer === current.correctIdx 
                ? 'bg-neutral-950 border-neutral-700 text-neutral-200' 
                : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}>
              {activeQuizAnswer === current.correctIdx 
                ? '✓ Correct! Queue maintains FIFO order, essential for operating systems and task scheduling.'
                : '✕ Not quite! Remember, in a Queue the first element enqueued is the first one dequeued.'}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
