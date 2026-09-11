import React, { useState, useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

/* Typewriter — plays on mount */
const useTypewriter = (text, speed = 60) => {
  const [shown, setShown] = useState('');
  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) { setShown(text.slice(0, ++i)); }
      else clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return shown;
};

/* Split background — left half SW green, right half 3D amber,
   mouse position gently shifts the divider */
const SplitBackground = () => {
  const [mx, setMx] = useState(0.5);
  const { mode } = useMode();
  const rafRef = useRef(null);
  const targetRef = useRef(0.5);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = e.clientX / window.innerWidth;
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      setMx((prev) => {
        const t = targetRef.current;
        return prev + (t - prev) * 0.04;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pct = Math.round(mx * 100);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left half — SW green glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at ${pct * 0.6}% 40%, rgba(94,255,158,0.09) 0%, transparent 65%)`,
          transition: 'background 0.05s linear',
        }}
      />
      {/* Right half — 3D amber glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at ${40 + pct * 0.6}% 55%, rgba(255,184,77,0.08) 0%, transparent 65%)`,
          transition: 'background 0.05s linear',
        }}
      />
      {/* Subtle vertical divider line */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          bottom: '15%',
          left: `${pct}%`,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export const Hero = () => {
  const { mode, toggleMode } = useMode();
  const isSW = mode === 'software';
  const typed = useTypewriter('Raskin Verma');

  const accent = isSW ? '#5eff9e' : '#ffb84d';
  const accentDim = isSW ? 'rgba(94,255,158,0.10)' : 'rgba(255,184,77,0.10)';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
      style={{ overflow: 'hidden' }}
    >
      {/* Split ambient background */}
      <SplitBackground />

      {/* Content — always centered, same structure both modes */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto"
        style={{ paddingTop: '10vh', paddingBottom: '8vh', animation: 'fadeUp 0.7s ease both' }}
      >

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-12"
          style={{
            background: accentDim,
            border: `1px solid ${accent}30`,
            color: accent,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.04em',
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: accent,
              animation: 'pulse 2s infinite',
              display: 'inline-block',
            }}
          />
          {isSW
            ? 'CS @ IIIT Dharwad · 9.44 CGPA'
            : '3D · CGI · Hardware Prototyping'}
        </div>

        {/* Name — typewriter in both modes */}
        <h1
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
          }}
        >
          {isSW ? (
            <>
              <span style={{ color: accent, marginRight: '0.15em' }}>&gt;</span>
              {typed}
              <span
                style={{
                  display: 'inline-block',
                  width: '0.08em',
                  height: '0.8em',
                  marginLeft: '0.08em',
                  verticalAlign: '-0.02em',
                  backgroundColor: accent,
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </>
          ) : (
            'Raskin Verma'
          )}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '2.5rem',
          }}
        >
          {isSW
            ? 'Systems engineering, computer vision, and graph-native RAG — from ISRO drone competitions to national aerospace hackathons.'
            : 'Full CGI pipelines for Dubai clients, custom hardware CAD for autonomous quadcopters, physics-based procedural simulations.'}
        </p>

        {/* CTAs — centered */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="flex items-center gap-2 font-semibold rounded-full transition-opacity hover:opacity-80"
            style={{
              background: accent,
              color: '#000',
              fontSize: '0.875rem',
              padding: '0.75rem 1.75rem',
              boxShadow: `0 0 40px ${accent}30`,
            }}
          >
            {isSW ? 'View Projects' : 'See Renders'}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </a>

          <a
            href="https://github.com/raskinverma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            <GithubIcon style={{ width: 15, height: 15 }} />
            GitHub
          </a>

          <button
            onClick={toggleMode}
            className="rounded-full transition-opacity hover:opacity-80"
            style={{
              background: 'transparent',
              border: `1px solid ${accent}35`,
              color: accent,
              fontSize: '0.8rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            {isSW ? '→ 3D Mode' : '→ SW Mode'}
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="flex flex-col items-center gap-1.5"
          style={{ marginTop: '5rem', opacity: 0.25 }}
        >
          <span style={{ fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            SCROLL
          </span>
          <ArrowDown style={{ width: 14, height: 14, color: 'var(--text-muted)', animation: 'bounce 1.5s infinite' }} />
        </div>
      </div>
    </section>
  );
};
