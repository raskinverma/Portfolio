import React, { useEffect, useState } from 'react';
import { useMode } from './context/ModeContext';
import { ModeProvider } from './context/ModeContext';
import { GridBackground } from './components/ui/GridBackground';
import { TopBar } from './components/layout/TopBar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';

// Full-screen radial wipe transition overlay
const ModeTransitionOverlay = () => {
  const { transitioning, transitionOrigin, nextMode, mode } = useMode();

  const color = nextMode === 'visual' || (!nextMode && mode === 'visual')
    ? '#F59E0B'
    : '#4ADE80';

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {/* Radial reveal ripple */}
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: color,
          opacity: transitioning ? 1 : 0,
          transformOrigin: `${transitionOrigin.x} ${transitionOrigin.y}`,
          transform: transitioning ? 'scale(80)' : 'scale(0)',
          transition: transitioning
            ? 'transform 0.55s cubic-bezier(0.77,0,0.18,1), opacity 0s'
            : 'opacity 0.3s ease, transform 0s 0.3s',
          width: '40px',
          height: '40px',
          left: `calc(${transitionOrigin.x} - 20px)`,
          top: `calc(${transitionOrigin.y} - 20px)`,
        }}
      />
    </div>
  );
};

const PortfolioContent = () => {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black">
      <GridBackground />
      <TopBar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Certifications />
        <About />
      </main>
      <Footer />
      <ModeTransitionOverlay />
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
