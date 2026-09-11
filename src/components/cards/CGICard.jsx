import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoPlayer } from '../ui/VideoPlayer';
import { Sparkles } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export const CGICard = ({ project }) => {
  const [activeScene, setActiveScene] = useState(0);

  return (
    <motion.article
      data-cursor="VIEW"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
    >
      {/* Media area */}
      {project.isGallery ? (
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#0a0812',
          overflow: 'hidden',
        }}>
          <motion.div
            key={activeScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, ${project.galleryItems[activeScene].color.replace('from-', '').replace('to-', '')} 0%, transparent 100%)`,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />

          {/* Scene title */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 14px' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                key={activeScene + 'title'}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 4 }}
              >
                {project.galleryItems[activeScene].title}
              </motion.p>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: '"JetBrains Mono", monospace' }}>
              {project.galleryItems[activeScene].subtitle}
            </p>

            {/* Scene dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {project.galleryItems.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveScene(i)}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  style={{
                    width: i === activeScene ? 20 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === activeScene ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Badge */}
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span style={{
              fontSize: '10px', fontFamily: '"JetBrains Mono", monospace',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              padding: '4px 10px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <Sparkles style={{ width: 10, height: 10 }} />
              RENDER SERIES
            </span>
          </div>
        </div>
      ) : (
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          <VideoPlayer
            src={project.videoUrl}
            poster={project.posterUrl}
            title={project.title}
            aspectRatio={project.aspectRatio || '16/9'}
            fallbackType={project.id.includes('hardware') ? 'hardware' : 'fluid'}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{
            fontSize: '10px',
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            border: '1px solid var(--accent)33',
            padding: '3px 10px',
            borderRadius: 999,
          }}>
            {project.badge}
          </span>
          {project.client && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: '"JetBrains Mono", monospace' }}>
              {project.client}
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700, fontSize: '1.1rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.3, marginBottom: 10,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.85rem', color: 'var(--text-muted)',
          lineHeight: 1.75, marginBottom: 16, flex: 1,
        }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
            {project.metrics.map((m) => (
              <div key={m.label} style={{
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: 6,
              }}>
                <div style={{ fontSize: '9px', fontFamily: '"JetBrains Mono", monospace', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 3 }}>
                  {m.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              transition={{ duration: 0.15 }}
              style={{
                padding: '4px 10px', fontSize: '11px',
                fontFamily: '"JetBrains Mono", monospace',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                background: 'transparent',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
