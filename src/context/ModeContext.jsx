import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('raskin_portfolio_mode');
      if (saved === 'software' || saved === 'visual') return saved;
    }
    return 'software';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (mode === 'visual') {
      body.classList.add('mode-visual');
      root.style.setProperty('--current-accent', '#F59E0B');
    } else {
      body.classList.remove('mode-visual');
      root.style.setProperty('--current-accent', '#4ADE80');
    }

    localStorage.setItem('raskin_portfolio_mode', mode);
  }, [mode]);

  const setMode = (newMode) => {
    if (newMode === mode) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setModeState(newMode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  };

  const toggleMode = () => {
    setMode(mode === 'software' ? 'visual' : 'software');
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode, isTransitioning }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
