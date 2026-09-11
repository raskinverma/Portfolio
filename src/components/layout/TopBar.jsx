import React, { useState, useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { ModeToggle } from './ModeToggle';
import { Download, Menu, X, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import confetti from 'canvas-confetti';

const useScrollDirection = () => {
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Compact when scrolled past 80px
      setCompact(y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return compact;
};

export const TopBar = () => {
  const { mode } = useMode();
  const compact = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const accentColor = mode === 'software' ? '#4ADE80' : '#F59E0B';

  const handleResume = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.05, x: 0.9 },
      colors: mode === 'software' ? ['#4ADE80', '#60A5FA'] : ['#F59E0B', '#FBBF24'],
    });
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <header
      style={{
        // Custom CSS transition for height/padding
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 ${
        compact
          ? 'py-2 bg-bg/90 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          {/* Accent dot */}
          <div
            style={{
              width: compact ? '8px' : '10px',
              height: compact ? '8px' : '10px',
              backgroundColor: accentColor,
              transition: 'all 0.4s ease',
            }}
            className="rounded-sm"
          />
          <span
            style={{
              fontFamily: mode === 'software' ? '"JetBrains Mono", monospace' : '"Syne", sans-serif',
              fontSize: compact ? '13px' : '15px',
              color: '#E8EAF0',
              transition: 'all 0.4s ease',
            }}
            className="font-bold tracking-widest uppercase group-hover:opacity-70"
          >
            Raskin Verma
          </span>
          {!compact && (
            <span className="hidden md:inline text-[10px] font-mono text-text-muted border border-border px-1.5 py-0.5 opacity-70">
              {mode === 'software' ? 'SYS_ENG' : '3D_CGI'}
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {['Projects', 'Certifications', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              {item}
            </a>
          ))}

          <div className="w-px h-4 bg-border/80" />

          {/* Glass mode toggle */}
          <ModeToggle compact={compact} />

          {/* Socials */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/raskinverma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/raskin-verma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Resume */}
          <a
            href="/Resume_Raskin_Verma.pdf"
            download="Resume_Raskin_Verma.pdf"
            onClick={handleResume}
            style={{ borderColor: `${accentColor}55`, color: accentColor }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-full bg-transparent hover:opacity-80 transition-opacity"
          >
            <Download className="w-3 h-3" />
            {downloaded ? 'Saved!' : '↓ Resume'}
          </a>
        </nav>

        {/* Mobile: mode toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ModeToggle compact />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-text-muted"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-border px-6 py-5 space-y-4 font-mono text-sm">
          {['Projects', 'Certifications', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block text-text-muted hover:text-text-primary transition-colors"
            >
              &gt; {item}
            </a>
          ))}
          <div className="pt-3 border-t border-border flex justify-between items-center">
            <div className="flex gap-4">
              <a href="https://github.com/raskinverma" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/raskin-verma" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
            <a
              href="/Resume_Raskin_Verma.pdf"
              download
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: accentColor, color: '#000' }}
            >
              ↓ Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
