import React from 'react';
import { ModeProvider } from './context/ModeContext';
import { GridBackground } from './components/ui/GridBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { TopBar } from './components/layout/TopBar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';

const PortfolioContent = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <GridBackground />
      <CustomCursor />
      <TopBar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Projects />
        <Certifications />
        <About />
      </main>
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
