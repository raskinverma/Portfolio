import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { Copy, Check, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Footer = () => {
  const { mode } = useMode();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('vermaraskin@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-border/80 bg-surface/50 mt-24 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-2 h-2 rounded-sm ${
                mode === 'software' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`text-sm font-bold tracking-wider ${
                mode === 'software' ? 'font-mono' : 'font-display'
              }`}
            >
              RASKIN VERMA
            </span>
          </div>
          <p className="text-xs text-text-muted font-mono">
            CS @ IIIT Dharwad · Systems, Computer Vision & 3D Visualization
          </p>
        </div>

        {/* Channels */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-elevated border border-border hover:border-accent transition-colors text-text-primary"
            title="Click to copy email address"
          >
            <Mail className="w-3.5 h-3.5 text-accent" />
            <span>vermaraskin@gmail.com</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-3 h-3 text-text-muted ml-1" />
            )}
          </button>

          <a
            href="https://linkedin.com/in/raskin-verma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors py-1"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>linkedin.com/in/raskin-verma</span>
          </a>

          <a
            href="https://github.com/raskinverma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors py-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github.com/raskinverma</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-text-muted gap-2">
        <span>Built with React · Tailwind · Blender · too much caffeine</span>
        <span className="text-text-muted/60">
          MODE: {mode === 'software' ? '01_SOFTWARE_SYSTEMS' : '02_3D_VISUALIZATION'}
        </span>
      </div>
    </footer>
  );
};
