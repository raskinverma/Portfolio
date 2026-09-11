import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    try { const s = localStorage.getItem('rv_mode'); return s === 'visual' ? 'visual' : 'software'; }
    catch { return 'software'; }
  });

  // Wipe state: null | 'start' | 'done'
  const [wipeActive, setWipeActive] = useState(false);
  const [wipeDir, setWipeDir] = useState(1); // 1 = left→right (to 3D), -1 = right→left (to SW)

  useEffect(() => {
    document.body.classList.toggle('mode-visual', mode === 'visual');
    try { localStorage.setItem('rv_mode', mode); } catch {}
  }, [mode]);

  const toggleMode = () => {
    const next = mode === 'software' ? 'visual' : 'software';
    setWipeDir(next === 'visual' ? 1 : -1);
    setWipeActive(true);

    // Swap mode at midpoint of wipe (200ms)
    setTimeout(() => setModeState(next), 200);
    // Remove wipe after full animation (460ms)
    setTimeout(() => setWipeActive(false), 460);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, wipeActive, wipeDir }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode outside ModeProvider');
  return ctx;
};
