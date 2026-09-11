import React from 'react';
import { ModeProvider, useMode } from './context/ModeContext';
import { GridBackground } from './components/ui/GridBackground';
import { TopBar } from './components/layout/TopBar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';

/**
 * Horizontal wipe overlay — a thin full-height bar that sweeps L→R or R→L
 * Sits at z-index 9999, pointer-events: none
 */
const WipeOverlay = () => {
  const { wipeActive, wipeDir, mode } = useMode();
  const accentColor = mode === 'software' ? '#5eff9e' : '#ffb84d';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Thin leading edge line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '3px',
          background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
          opacity: wipeActive ? 0.9 : 0,
          transform: wipeActive
            ? `translateX(${wipeDir > 0 ? '100vw' : '-3px'})`
            : `translateX(${wipeDir > 0 ? '-3px' : '100vw'})`,
          transition: wipeActive
            ? 'transform 0.42s cubic-bezier(0.77, 0, 0.18, 1), opacity 0s'
            : 'opacity 0.15s ease 0s, transform 0s 0.15s',
          left: 0,
        }}
      />
      {/* Faint wash that follows the wipe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to ${wipeDir > 0 ? 'right' : 'left'}, ${accentColor}12, transparent 60%)`,
          opacity: wipeActive ? 1 : 0,
          transition: wipeActive ? 'opacity 0.15s ease' : 'opacity 0.3s ease 0.1s',
        }}
      />
    </div>
  );
};

const PortfolioContent = () => {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      <GridBackground />
      <TopBar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Certifications />
        <About />
      </main>
      <Footer />
      <WipeOverlay />
    </div>
  );
};

export default function App() {
  return (
    <ModeProvider>
      <PortfolioContent />
    </ModeProvider>
  );
}
