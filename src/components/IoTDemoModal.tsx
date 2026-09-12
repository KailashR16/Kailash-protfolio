import React, { useState, useEffect } from 'react';
import { X, Camera, Bell, Shield, Wifi, Play, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface IoTDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IoTDemoModal: React.FC<IoTDemoModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'IDLE' | 'DETECTING' | 'CAPTURING' | 'DISPATCHED'>('IDLE');
  const [avatarUrl, setAvatarUrl] = useState<string>('/developer_avatar.jpg');
  const [logs, setLogs] = useState<string[]>([
    '[ESP32-CAM] Booted successfully. WiFi Connected: 192.168.1.42',
    '[PIR_SENSOR] Calibration complete. Armed & monitoring doorway.',
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('kailash_custom_avatar_exact');
    if (stored) {
      setAvatarUrl(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateVisitor = () => {
    sounds.playAlert();
    setStatus('DETECTING');
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] [PIR] Motion detected! Proximity trigger high.`,
      ...prev,
    ]);

    setTimeout(() => {
      setStatus('CAPTURING');
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] [CAM] OV2640 buffer locked. Snapshot captured at UXGA 1600x1200.`,
        ...prev,
      ]);

      setTimeout(() => {
        sounds.playSuccess();
        setStatus('DISPATCHED');
        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] [WEBHOOK] Push notification & image sent to homeowner in 1.42s.`,
          ...prev,
        ]);
      }, 900);
    }, 800);
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
          <Shield className="w-4 h-4" />
          <span>Hardware IoT Live Simulator</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          Smart Visitor Alert System (ESP32-CAM)
        </h3>
        <p className="text-xs text-neutral-400 mb-4">
          Simulate the PIR sensor trigger, frame buffering, and push notification alert pipeline.
        </p>

        {/* Status card */}
        <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
          <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5">
            <div className="text-[10px] font-mono text-neutral-400">PIR Sensor</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ARMED
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5">
            <div className="text-[10px] font-mono text-neutral-400">Frame State</div>
            <div className="text-xs font-bold text-[var(--main-color)] mt-1 font-mono">
              {status}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[var(--second-bg-color)] border border-white/5">
            <div className="text-[10px] font-mono text-neutral-400">Latency</div>
            <div className="text-xs font-bold text-white mt-1 font-mono">
              1.42s
            </div>
          </div>
        </div>

        {/* Camera simulation viewport */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/10 mb-4 flex items-center justify-center">
          <img 
            src={avatarUrl} 
            alt="Simulated Camera View"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover filter ${
              status === 'DETECTING' ? 'brightness-125 contrast-125' : 
              status === 'CAPTURING' ? 'brightness-150' : 'brightness-75'
            } transition-all duration-300`}
          />

          <div className="absolute inset-0 border border-[var(--main-color)]/30 pointer-events-none" />
          
          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 border border-[var(--main-color)]/60 rounded-md flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--main-color)] rounded-full animate-ping" />
            </div>
          </div>

          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-emerald-400 flex items-center gap-1 backdrop-blur-sm">
            <Wifi className="w-3 h-3" /> LIVE FEED 1080p
          </div>

          {status === 'DISPATCHED' && (
            <div className="absolute bottom-2 inset-x-2 p-2 rounded bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 justify-center backdrop-blur-md animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Snapshot dispatched to user mobile device!</span>
            </div>
          )}
        </div>

        {/* Trigger button */}
        <button
          onClick={handleSimulateVisitor}
          disabled={status === 'DETECTING' || status === 'CAPTURING'}
          className="btn-glow text-xs py-2.5 px-4 w-full flex items-center justify-center gap-2 mb-4"
        >
          <Play className="w-4 h-4" />
          <span>Simulate Visitor Approaching Door</span>
        </button>

        {/* Real-time serial logs */}
        <div className="p-3 rounded-lg bg-black/90 border border-neutral-800 font-mono text-[11px] text-neutral-300 space-y-1 h-32 overflow-y-auto">
          <div className="text-neutral-500 text-[10px] pb-1 border-b border-neutral-800">
            ESP32 Serial Monitor (115200 baud):
          </div>
          {logs.map((log, idx) => (
            <div key={idx} className="leading-tight text-neutral-300">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
