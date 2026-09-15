import React, { useEffect } from 'react';
import { TiltCard } from './TiltCard';

interface ProfileAvatarProps {
  section: 'home' | 'about';
  onNavigate?: () => void;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  section,
  onNavigate,
  className = '',
}) => {
  // Clear any old test cache so all visitors see the authentic portrait
  useEffect(() => {
    try {
      localStorage.removeItem('kailash_custom_avatar_exact');
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* 3D Tilt Card wrapping circular avatar */}
      <TiltCard maxTilt={8} scale={1.03} className="rounded-full">
        <div
          className={`img-box ${section === 'home' ? 'home-img' : 'about-img'} group cursor-pointer relative`}
          onClick={() => {
            if (onNavigate) {
              onNavigate();
            }
          }}
          title="Kailash R - Data Analyst & Software Developer"
        >
          {/* Exact User-Uploaded Portrait Image Centered in Circle */}
          <img
            src="/kailash off photo.jpeg"
            alt="Kailash R - Professional Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 group-hover:scale-105"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => {
              // Gracefully handle URL encoding or alternate filename
              const target = e.currentTarget;
              if (target.src.endsWith('/kailash%20off%20photo.jpeg') || target.src.endsWith('/kailash off photo.jpeg')) {
                target.src = '/kailash_off_photo.jpeg';
              }
            }}
          />
        </div>
      </TiltCard>
    </div>
  );
};

