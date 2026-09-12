import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Check, RefreshCw } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { sounds } from '../utils/audio';

interface ProfileAvatarProps {
  section: 'home' | 'about';
  onNavigate?: () => void;
  className?: string;
}

const STORAGE_KEY = 'kailash_custom_avatar_exact';

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  section,
  onNavigate,
  className = '',
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('/developer_avatar.jpg');
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load stored avatar from localStorage or custom event
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAvatarUrl(stored);
    }

    const handleAvatarUpdate = (e: CustomEvent<string>) => {
      if (e.detail) {
        setAvatarUrl(e.detail);
      }
    };

    window.addEventListener('kailash-avatar-updated' as any, handleAvatarUpdate);
    return () => {
      window.removeEventListener('kailash-avatar-updated' as any, handleAvatarUpdate);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (.jpeg, .png, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem(STORAGE_KEY, dataUrl);
        setAvatarUrl(dataUrl);
        window.dispatchEvent(new CustomEvent('kailash-avatar-updated', { detail: dataUrl }));
        sounds.playClick();
        showToast('Exact photo loaded with 100% original face fidelity!');
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(STORAGE_KEY);
    setAvatarUrl('/developer_avatar.jpg');
    window.dispatchEvent(new CustomEvent('kailash-avatar-updated', { detail: '/developer_avatar.jpg' }));
    sounds.playClick();
    showToast('Reset to default portrait');
  };

  const isCustomPhoto = avatarUrl.startsWith('data:');

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Hidden file input for manual selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload exact photo"
      />

      {/* 3D Tilt Card wrapping circular avatar */}
      <TiltCard maxTilt={8} scale={1.03} className="rounded-full">
        <div
          className={`img-box ${section === 'home' ? 'home-img' : 'about-img'} group cursor-pointer relative ${
            isDragging ? 'ring-4 ring-[var(--main-color)] ring-offset-4 ring-offset-[var(--bg-color)]' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => {
            if (onNavigate) {
              onNavigate();
            }
          }}
          title="Click to view section or click camera icon to load your exact photo"
        >
          {/* Avatar Image with 100% Exact Ratio */}
          <img
            src={avatarUrl}
            alt="Kailash R - Professional Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick Hover Overlay with upload hint */}
          <div
            className={`absolute inset-0 rounded-full bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 pointer-events-none ${
              isHovered || isDragging ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Camera className="w-8 h-8 text-[var(--main-color)] mb-1 drop-shadow-[0_0_8px_var(--main-color)]" />
            <span className="text-[11px] font-semibold text-white tracking-wide">
              {isDragging ? 'Drop photo here' : 'Change / Upload Photo'}
            </span>
            <span className="text-[9px] text-neutral-300 mt-0.5">
              Exact face, 100% original
            </span>
          </div>

          {/* Camera Upload Button Pill on Bottom Corner */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="absolute bottom-2 right-2 p-2.5 rounded-full bg-[var(--main-color)] text-[var(--bg-color)] shadow-[0_0_15px_var(--main-color)] hover:scale-110 active:scale-95 transition-all z-30 pointer-events-auto"
            title="Upload your exact kailash off photo.jpeg"
            aria-label="Upload photo"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </TiltCard>

      {/* Helper label below avatar */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-neutral-400 hover:text-[var(--main-color)] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--main-color)]/40 text-[11px]"
        >
          <Camera className="w-3.5 h-3.5 text-[var(--main-color)]" />
          <span>Upload Exact Photo</span>
        </button>

        {isCustomPhoto && (
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-neutral-500 hover:text-neutral-300 transition-colors p-1 rounded-full hover:bg-white/5"
            title="Reset to default"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-[var(--second-bg-color)] border border-[var(--main-color)] text-white text-xs px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,119,0,0.35)] flex items-center gap-2 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-[var(--main-color)]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
