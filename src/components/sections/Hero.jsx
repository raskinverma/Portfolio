import React, { useState, useEffect } from 'react';
import { useMode } from '../../context/ModeContext';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

// Typewriter hook — only plays when mounted with target string
const useTypewriter = (text, speed = 65, active = true) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, active]);
  return displayed;
};

export const Hero = () => {
  const { mode, toggleMode } = useMode();
  const isSW = mode === 'software';

  const headline = useTypewriter('Raskin Verma', 70, isSW);

  const accentColor = isSW ? '#4ADE80' : '#F59E0B';
  const accentDim = isSW ? 'rgba(74,222,128,0.08)' : 'rgba(245,158,11,0.08)';
  const headingFont = isSW ? '"JetBrains Mono", monospace' : '"Syne", sans-serif';

  const metrics = [
    { label: 'Competition', value: 'Aerothon 2nd · ISRO 4th' },
    { label: 'Languages', value: 'C++ · Python · SQL' },
    { label: 'Systems & Vision', value: 'ROS · OpenCV · Sockets' },
    { label: 'CGPA', value: '9.44 / 10 (2028)' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Centered content block */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full pt-24 pb-12">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono mb-10 border"
          style={{
            backgroundColor: accentDim,
            borderColor: `${accentColor}33`,
            color: accentColor,
            transition: 'all 0.5s ease',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor, animation: 'pulse 2s infinite' }}
          />
          {isSW
            ? 'CS @ IIIT Dharwad · Systems, Vision & Web'
            : '3D · CGI · Hardware Prototyping'}
        </div>

        {/* Hero name — centered + typewriter in SW mode */}
        <h1
          style={{
            fontFamily: headingFont,
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 800,
            letterSpacing: isSW ? '-0.02em' : '-0.03em',
            color: '#F3F4F6',
            lineHeight: 1.05,
            transition: 'font-family 0.4s ease',
          }}
          className="mb-4 relative"
        >
          {isSW ? (
            <>
              <span style={{ color: accentColor, marginRight: '0.2em' }}>{'>'}</span>
              {headline}
              <span
                className="inline-block w-[0.12em] h-[0.9em] ml-1 align-middle"
                style={{
                  backgroundColor: accentColor,
                  animation: 'blink 1s step-end infinite',
                  verticalAlign: '-0.05em',
                }}
              />
            </>
          ) : (
            <span style={{ color: '#F3F4F6' }}>Raskin Verma</span>
          )}
        </h1>

        {/* Tagline */}
        <p
          className="text-base sm:text-lg mb-10 leading-relaxed max-w-xl"
          style={{
            color: 'rgba(232,234,240,0.55)',
            fontFamily: isSW ? '"JetBrains Mono", monospace' : '"Inter", sans-serif',
            fontSize: isSW ? '0.92rem' : '1.05rem',
            transition: 'all 0.4s ease',
          }}
        >
          {isSW
            ? '// Building autonomous systems, computer vision pipelines, and graph-native RAG — from ISRO drone comps to national aerospace hackathons.'
            : 'Commercial CGI pipelines for Dubai clients, custom hardware CAD for quadcopter payloads, and physics-based procedural simulations.'}
        </p>

        {/* CTA buttons — centered */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-full transition-all"
            style={{
              backgroundColor: accentColor,
              color: '#000',
              fontFamily: isSW ? '"JetBrains Mono", monospace' : '"Syne", sans-serif',
              boxShadow: `0 0 32px ${accentColor}35`,
              transition: 'all 0.4s ease',
            }}
          >
            {isSW ? 'View Projects' : 'See Renders'}
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/raskinverma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 font-mono text-sm rounded-full border transition-all text-text-muted hover:text-text-primary"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <GithubIcon className="w-4 h-4" />
            github.com/raskinverma
          </a>

          {/* Mode switch button — minimal */}
          <button
            onClick={toggleMode}
            className="px-5 py-3 font-mono text-xs rounded-full border transition-all"
            style={{
              borderColor: `${accentColor}33`,
              color: accentColor,
              background: accentDim,
            }}
          >
            {isSW ? '→ Switch to 3D Mode' : '→ Switch to SW Mode'}
          </button>
        </div>

        {/* Metrics strip — glass cards */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center justify-center p-4 rounded-xl text-center border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.07)',
                transition: 'all 0.4s ease',
              }}
            >
              <span
                className="text-[10px] font-mono uppercase tracking-widest mb-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {m.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{
                  fontFamily: isSW ? '"JetBrains Mono", monospace' : '"Syne", sans-serif',
                  color: '#E8EAF0',
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-14 flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
          <span className="text-[11px] font-mono text-text-muted">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-text-muted animate-bounce" />
        </div>
      </div>
    </section>
  );
};
