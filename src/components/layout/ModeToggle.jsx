import React from 'react';
import { useMode } from '../../context/ModeContext';
import { Terminal, Box } from 'lucide-react';

export const ModeToggle = ({ compact = false }) => {
  const { mode, toggleMode } = useMode();
  const isSW = mode === 'software';
  const accent = isSW ? '#5eff9e' : '#ffb84d';

  return (
    <button
      onClick={toggleMode}
      aria-label={`Switch to ${isSW ? '3D' : 'Software'} mode`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '6px' : '8px',
        padding: compact ? '4px 10px' : '5px 12px',
        borderRadius: '999px',
        border: `1px solid rgba(255,255,255,0.10)`,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow tint behind active label */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '999px',
          background: isSW
            ? 'radial-gradient(ellipse at 20% 50%, rgba(94,255,158,0.18) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 80% 50%, rgba(255,184,77,0.18) 0%, transparent 70%)',
          transition: 'all 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* SW label */}
      <span
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: isSW ? accent : 'rgba(255,255,255,0.28)',
          display: 'flex', alignItems: 'center', gap: '4px',
          position: 'relative', zIndex: 1,
          transition: 'color 0.35s ease',
        }}
      >
        <Terminal style={{ width: 10, height: 10 }} />
        SW
      </span>

      {/* Separator */}
      <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px', position: 'relative', zIndex: 1 }}>/</span>

      {/* 3D label */}
      <span
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: !isSW ? accent : 'rgba(255,255,255,0.28)',
          display: 'flex', alignItems: 'center', gap: '4px',
          position: 'relative', zIndex: 1,
          transition: 'color 0.35s ease',
        }}
      >
        <Box style={{ width: 10, height: 10 }} />
        3D
      </span>
    </button>
  );
};
