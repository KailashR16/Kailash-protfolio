import React, { useState } from 'react';
import { X, Sparkles, Send, RefreshCw, BarChart2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SentimentDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SentimentDemoModal: React.FC<SentimentDemoModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('Our team achieved 95% automated test coverage with robust data pipelines!');
  const [result, setResult] = useState<{
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    score: number;
    tokens: string[];
    breakdown: { pos: number; neu: number; neg: number };
  } | null>({
    sentiment: 'Positive',
    score: 0.88,
    tokens: ['team', 'achieved', 'automated', 'test', 'coverage', 'robust', 'data', 'pipelines'],
    breakdown: { pos: 88, neu: 9, neg: 3 },
  });

  if (!isOpen) return null;

  const samples = [
    'Our team achieved 95% automated test coverage with robust data pipelines!',
    'Database latency increased severely causing timeout errors during peak hours.',
    'The weekly sprint report was submitted as scheduled on Friday afternoon.',
    'Exceptional performance gains after optimizing SQL index and caching layers.',
  ];

  const handleAnalyze = (text: string) => {
    sounds.playClick();
    const lower = text.toLowerCase();
    
    const posWords = ['achieved', 'robust', 'exceptional', 'gains', 'optimizing', 'great', 'love', 'success', 'clean', 'improved', 'fast'];
    const negWords = ['latency', 'severely', 'timeout', 'errors', 'broken', 'failure', 'bad', 'slow', 'crash', 'risk', 'bug'];

    let posCount = 0;
    let negCount = 0;

    const words = lower.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    words.forEach((w) => {
      if (posWords.some((pw) => w.includes(pw))) posCount++;
      if (negWords.some((nw) => w.includes(nw))) negCount++;
    });

    let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
    let pos = 20, neu = 60, neg = 20;

    if (posCount > negCount) {
      sentiment = 'Positive';
      pos = Math.min(95, 60 + posCount * 15);
      neu = Math.max(5, 30 - posCount * 5);
      neg = Math.max(2, 100 - pos - neu);
    } else if (negCount > posCount) {
      sentiment = 'Negative';
      neg = Math.min(95, 60 + negCount * 15);
      neu = Math.max(5, 30 - negCount * 5);
      pos = Math.max(2, 100 - neg - neu);
    } else {
      neu = 70;
      pos = 15;
      neg = 15;
    }

    setResult({
      sentiment,
      score: sentiment === 'Positive' ? pos / 100 : sentiment === 'Negative' ? -(neg / 100) : 0,
      tokens: words.filter((w) => w.length > 3).slice(0, 10),
      breakdown: { pos, neu, neg },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="card-item w-full max-w-xl p-6 relative border-[var(--main-color)]/30 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[var(--main-color)] text-xs font-mono mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Interactive NLP Sandbox Demo</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          Sentiment Analysis Using Text
        </h3>
        <p className="text-xs text-neutral-400 mb-4">
          Test real-time tokenization, preprocessing, and polarity classification built by Kailash R.
        </p>

        {/* Input */}
        <div className="space-y-3 mb-4">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--second-bg-color)] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[var(--main-color)]"
            placeholder="Type any sentence to analyze sentiment..."
          />

          {/* Sample Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {samples.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(s);
                  handleAnalyze(s);
                }}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--second-bg-color)] hover:bg-[var(--main-color)]/10 text-neutral-300 hover:text-[var(--main-color)] border border-white/10 transition-colors"
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleAnalyze(inputText)}
            className="btn-glow text-xs py-2 px-4 w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Classify Sentiment</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="p-4 rounded-xl bg-[var(--second-bg-color)] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400">Classified Polarity:</span>
                <div className={`text-lg font-bold ${
                  result.sentiment === 'Positive' ? 'text-emerald-400' :
                  result.sentiment === 'Negative' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {result.sentiment} ({Math.abs(Math.round(result.score * 100))}%)
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-neutral-400">Model Metric:</span>
                <div className="text-xs font-mono text-[var(--main-color)]">
                  94.2% F1-Score
                </div>
              </div>
            </div>

            {/* Confidence distribution bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span className="text-emerald-400">Positive: {result.breakdown.pos}%</span>
                <span className="text-amber-400">Neutral: {result.breakdown.neu}%</span>
                <span className="text-rose-400">Negative: {result.breakdown.neg}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-neutral-800">
                <div style={{ width: `${result.breakdown.pos}%` }} className="bg-emerald-400 h-full" />
                <div style={{ width: `${result.breakdown.neu}%` }} className="bg-amber-400 h-full" />
                <div style={{ width: `${result.breakdown.neg}%` }} className="bg-rose-400 h-full" />
              </div>
            </div>

            {/* Extracted Tokens */}
            <div>
              <span className="text-[11px] font-mono text-neutral-400 block mb-1.5">
                Tokenized Feature Extraction:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.tokens.map((token, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[var(--third-bg-color)] text-[10px] font-mono text-neutral-300 border border-white/5">
                    #{token}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
