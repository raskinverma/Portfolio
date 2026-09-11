import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('raskin_portfolio_mode');
      if (saved === 'software' || saved === 'visual') return saved;
    }
    return 'software';
  });

  // Transition overlay state
  const [transitioning, setTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: '50%', y: '50%' });
  const [nextMode, setNextMode] = useState(null);
  const pendingRef = useRef(null);

  useEffect(() => {
    const body = document.body;
    if (mode === 'visual') {
      body.classList.add('mode-visual');
    } else {
      body.classList.remove('mode-visual');
    }
    localStorage.setItem('raskin_portfolio_mode', mode);
  }, [mode]);

  const setMode = (newMode, originX, originY) => {
    if (newMode === mode || transitioning) return;

    // Capture click origin for radial wipe
    const ox = originX ?? '50%';
    const oy = originY ?? '50%';

    setTransitionOrigin({ x: ox, y: oy });
    setNextMode(newMode);
    setTransitioning(true);

    // After overlay covers screen, swap mode
    pendingRef.current = setTimeout(() => {
      setModeState(newMode);
      // After mode applied, let overlay recede
      setTimeout(() => {
        setTransitioning(false);
        setNextMode(null);
      }, 350);
    }, 300);
  };

  const toggleMode = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const x = rect ? `${rect.left + rect.width / 2}px` : '50%';
    const y = rect ? `${rect.top + rect.height / 2}px` : '50%';
    setMode(mode === 'software' ? 'visual' : 'software', x, y);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode, transitioning, transitionOrigin, nextMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('useMode must be used within a ModeProvider');
  return context;
};
