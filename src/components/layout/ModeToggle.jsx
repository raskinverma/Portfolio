import React from 'react';
import { useMode } from '../../context/ModeContext';
import { Terminal, Box } from 'lucide-react';

export const ModeToggle = ({ isScrolled = false, className = '' }) => {
  const { mode, setMode } = useMode();

  return (
    <div
      className={`relative inline-flex items-center p-1 rounded-full bg-[#0d0e14] border transition-all duration-300 ${
        isScrolled ? 'border-accent/40 shadow-lg shadow-black/40 scale-105' : 'border-border'
      } ${className}`}
      role="group"
      aria-label="Portfolio Mode Toggle"
    >
      {/* SW Mode Button */}
      <button
        onClick={() => setMode('software')}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
          mode === 'software'
            ? 'text-black font-semibold shadow-sm'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>SW</span>
      </button>

      {/* 3D Mode Button */}
      <button
        onClick={() => setMode('visual')}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display tracking-wide transition-all duration-200 ${
          mode === 'visual'
            ? 'text-black font-bold shadow-sm'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        <Box className="w-3.5 h-3.5" />
        <span>3D</span>
      </button>

      {/* Animated Sliding Pill */}
      <div
        className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: mode === 'software' ? '#4ADE80' : '#F59E0B',
          left: mode === 'software' ? '4px' : 'calc(50% - 1px)',
          width: 'calc(50% - 3px)',
        }}
      />
    </div>
  );
};
