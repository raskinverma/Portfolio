import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

const EASE = [0.22, 1, 0.36, 1];

const useTypewriter = (text, speed = 55) => {
  const [shown, setShown] = useState('');
  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) setShown(text.slice(0, ++i));
      else clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return shown;
};

/** Floating card that parallax-shifts on mouse move */
const FloatingCard = ({ title, color, x, y, rotate, delay }) => {
  const cardX = useSpring(0, { stiffness: 60, damping: 18 });
  const cardY = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * -18;
      const ny = (e.clientY / window.innerHeight - 0.5) * -18;
      cardX.set(nx);
      cardY.set(ny);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        x: cardX,
        y: cardY,
        rotate,
        width: 120,
        height: 80,
        borderRadius: 10,
        background: color,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '10px 12px',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        userSelect: 'none',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
    >
      <span style={{
        fontSize: '10px',
        fontFamily: '"JetBrains Mono", monospace',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.3,
      }}>
        {title}
      </span>
    </motion.div>
  );
};

export const Hero = () => {
  const { mode, toggleMode } = useMode();
  const isSW = mode === 'software';
  const typed = useTypewriter('RASKIN VERMA', 60);
  const accent = isSW ? '#5eff9e' : '#ffb84d';

  const floatingCards = [
    { title: 'GraphRAG\nAerothon 2nd', color: 'rgba(94,255,158,0.08)', x: '5%',  y: '22%', rotate: -4, delay: 0.6 },
    { title: 'ASCEND\nISRO 4th',       color: 'rgba(96,165,250,0.08)', x: '72%', y: '15%', rotate: 3,  delay: 0.75 },
    { title: 'Gesture\nControl',        color: 'rgba(167,139,250,0.08)', x: '78%', y: '62%', rotate: 2, delay: 0.9 },
    { title: 'Detail Empire\nCGI / 4K', color: 'rgba(255,184,77,0.10)', x: '2%',  y: '65%', rotate: -2, delay: 0.85 },
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Floating project cards — scattered around name */}
      {floatingCards.map((c) => (
        <FloatingCard key={c.title} {...c} />
      ))}

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: 700,
        padding: '0 24px',
        paddingTop: '120px',
      }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
            fontSize: '11px',
            fontFamily: '"JetBrains Mono", monospace',
            color: accent,
            letterSpacing: '0.06em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: accent, display: 'inline-block',
              boxShadow: `0 0 8px ${accent}`,
            }} />
            {isSW ? 'CS @ IIIT Dharwad · 9.44 CGPA' : '3D · CGI · Hardware'}
          </span>
        </motion.div>

        {/* Oversized name */}
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {isSW ? (
              <>
                <span style={{ color: accent }}>&gt;&nbsp;</span>
                {typed}
                <span style={{
                  display: 'inline-block',
                  width: '0.07em', height: '0.85em',
                  background: accent, marginLeft: '0.05em',
                  verticalAlign: '-0.05em',
                  animation: 'blink 1s step-end infinite',
                }} />
              </>
            ) : 'RASKIN VERMA'}
          </motion.h1>
        </div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          {isSW
            ? 'Systems engineering, computer vision, and graph-native RAG — from ISRO drone competitions to national aerospace hackathons.'
            : 'Full CGI pipelines for Dubai clients, custom hardware CAD for autonomous quadcopters, physics-based procedural simulations.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            data-cursor="VIEW"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 999,
              background: accent, color: '#000',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700, fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: `0 0 40px ${accent}28`,
            }}
          >
            {isSW ? 'View Projects' : 'See Renders'}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </motion.a>

          <motion.a
            href="https://github.com/raskinverma"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 24px', borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'var(--text-primary)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
            }}
          >
            <GithubIcon style={{ width: 15, height: 15 }} />
            GitHub
          </motion.a>

          <motion.button
            onClick={toggleMode}
            data-cursor="SWITCH"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '13px 22px', borderRadius: 999,
              background: 'transparent',
              border: `1px solid ${accent}35`,
              color: accent,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            {isSW ? '→ 3D Mode' : '→ SW Mode'}
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ marginTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
