import React from 'react';
import { Home, User, FileText, Briefcase, Mail } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CubeNavbarProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export const CubeNavbar: React.FC<CubeNavbarProps> = ({ activeIndex, onSelectIndex }) => {
  const navItems = [
    { id: 0, label: 'Home', icon: Home },
    { id: 1, label: 'About', icon: User },
    { id: 2, label: 'Resume', icon: FileText },
    { id: 3, label: 'Portfolio', icon: Briefcase },
    { id: 4, label: 'Contact', icon: Mail },
  ];

  const handleClick = (idx: number) => {
    sounds.playCubeRotate();
    onSelectIndex(idx);
  };

  return (
    <nav className="bottom-nav" aria-label="3D Portfolio Navigation">
      <ul>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeIndex === item.id;
          return (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => sounds.playHover()}
              className={`nav-item ${isActive ? 'active text-[var(--main-color)]' : ''}`}
              title={item.label}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(item.id);
                }
              }}
            >
              <span className="tooltip">{item.label}</span>
              <Icon className="w-6 h-6 transition-transform duration-200" />
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--main-color)] shadow-[0_0_8px_var(--main-color)]" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
