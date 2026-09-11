import React, { useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { Terminal, Box } from 'lucide-react';

export const ModeToggle = ({ compact = false }) => {
  const { mode, toggleMode } = useMode();
  const btnRef = useRef(null);

  const isSW = mode === 'software';

  const handleClick = (e) => {
    toggleMode(e);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={`Switch to ${isSW ? '3D' : 'Software'} mode`}
      style={{
        // Glass pill
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,0.1)`,
        borderRadius: '999px',
        padding: compact ? '5px 10px' : '6px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
      className="group"
    >
      {/* Glowing background slide */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '999px',
          background: isSW
            ? 'radial-gradient(ellipse at 30% 50%, rgba(74,222,128,0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.15) 0%, transparent 70%)',
          transition: 'all 0.5s ease',
        }}
      />

      {/* SW label */}
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          fontWeight: isSW ? 700 : 400,
          color: isSW ? '#4ADE80' : 'rgba(255,255,255,0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Terminal style={{ width: '11px', height: '11px' }} />
        SW
      </span>

      {/* Divider dot */}
      <div
        style={{
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* 3D label */}
      <span
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '11px',
          fontWeight: !isSW ? 700 : 400,
          color: !isSW ? '#F59E0B' : 'rgba(255,255,255,0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box style={{ width: '11px', height: '11px' }} />
        3D
      </span>
    </button>
  );
};
