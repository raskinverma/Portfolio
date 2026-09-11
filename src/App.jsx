import React from 'react';
import { ModeProvider, useMode } from './context/ModeContext';
import { GridBackground } from './components/ui/GridBackground';
import { TopBar } from './components/layout/TopBar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';

const PortfolioContent = () => {
  const { isTransitioning } = useMode();

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black">
      {/* Ambient Canvas Background */}
      <GridBackground />

      {/* Global Navigation Header */}
      <TopBar />

      {/* Main Content with smooth mode switch cross-fade */}
      <main
        className={`relative z-10 transition-all duration-200 ${
          isTransitioning ? 'opacity-30 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100 filter-none'
        }`}
      >
        <Hero />
        <Projects />
        <Certifications />
        <About />
      </main>

      {/* Minimal Footer */}
      <Footer />
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
