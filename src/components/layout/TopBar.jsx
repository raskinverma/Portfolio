import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { ModeToggle } from './ModeToggle';
import { useScrolled } from '../../hooks/useScrolled';
import { Download, Menu, X, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import confetti from 'canvas-confetti';

export const TopBar = () => {
  const { mode } = useMode();
  const isScrolled = useScrolled(30);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleResumeDownload = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1, x: 0.9 },
      colors: mode === 'software' ? ['#4ADE80', '#60A5FA', '#E8EAF0'] : ['#F59E0B', '#FBBF24', '#FFFFFF']
    });
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel shadow-lg shadow-black/30 py-3'
          : 'bg-bg/60 backdrop-blur-md py-4 border-b border-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 text-decoration-none focus:outline-none"
        >
          <div
            className={`w-2.5 h-2.5 rounded-sm transition-colors duration-300 ${
              mode === 'software' ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
          />
          <span
            className={`text-sm sm:text-base font-bold tracking-wider transition-colors duration-300 ${
              mode === 'software' ? 'font-mono text-text-primary group-hover:text-emerald-400' : 'font-display text-text-primary group-hover:text-amber-400'
            }`}
          >
            RASKIN VERMA
          </span>
          <span className="hidden md:inline-block text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-surface border border-border">
            {mode === 'software' ? 'SYS_ENG' : '3D_CGI'}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-text-muted">
          <a
            href="#projects"
            className="hover:text-text-primary transition-colors py-1"
          >
            // Projects
          </a>
          <a
            href="#certifications"
            className="hover:text-text-primary transition-colors py-1"
          >
            // Certifications
          </a>
          <a
            href="#about"
            className="hover:text-text-primary transition-colors py-1"
          >
            // About
          </a>

          <div className="h-4 w-px bg-border/80" />

          {/* Master Mode Switch */}
          <ModeToggle isScrolled={isScrolled} />

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/raskinverma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-border transition-all"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/raskin-verma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-border transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Resume Download */}
          <a
            href="/Resume_Raskin_Verma.pdf"
            download="Resume_Raskin_Verma.pdf"
            onClick={handleResumeDownload}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-all ${
              mode === 'software'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Saved!' : 'Resume'}</span>
          </a>
        </nav>

        {/* Mobile Hamburger & Mode Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ModeToggle isScrolled={isScrolled} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-surface border border-border text-text-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-border px-6 py-4 space-y-3 font-mono text-xs animate-in slide-in-from-top duration-200">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-text-primary hover:text-accent"
          >
            &gt; // Projects
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-text-primary hover:text-accent"
          >
            &gt; // Certifications
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-text-primary hover:text-accent"
          >
            &gt; // About
          </a>
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <div className="flex gap-4">
              <a
                href="https://github.com/raskinverma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/raskin-verma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
            <a
              href="/Resume_Raskin_Verma.pdf"
              download="Resume_Raskin_Verma.pdf"
              onClick={() => {
                handleResumeDownload();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded bg-accent text-black font-semibold"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
