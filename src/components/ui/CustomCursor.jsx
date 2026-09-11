import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Two-piece cursor: a small snappy dot + a larger soft-spring ring.
 * On hover over interactive elements: ring expands and label appears.
 */
export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with spring lag — gives the "trailing" feel
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.5 });

  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovered(true);
        setLabel(el.dataset.cursor || '');
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Small snappy dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
      />

      {/* Larger soft ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          borderColor: hovered ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
          backgroundColor: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-full border"
      >
        {label && (
          <span style={{
            fontSize: '9px',
            fontFamily: '"JetBrains Mono", monospace',
            color: 'var(--accent)',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
};
