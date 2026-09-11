import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Check, Copy } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { ArchDiagram } from '../ui/ArchDiagram';

const EASE = [0.22, 1, 0.36, 1];

export const SoftwareCard = ({ project }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.article
      data-cursor="VIEW"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: 0,
        padding: '28px',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Accent glow on hover */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 0% 0%, var(--accent-glow) 0%, transparent 60%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }}
        className="card-glow"
      />

      {/* Badge + links row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, gap: 8 }}>
        <span style={{
          display: 'inline-block',
          fontSize: '10px',
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.08em',
          padding: '3px 10px',
          border: `1px solid ${project.badgeColor?.includes('amber') ? '#F59E0B44' : project.badgeColor?.includes('blue') ? '#60A5FA44' : project.badgeColor?.includes('purple') ? '#A78BFA44' : 'var(--accent)44'}`,
          color: project.badgeColor?.includes('amber') ? '#F59E0B' : project.badgeColor?.includes('blue') ? '#60A5FA' : project.badgeColor?.includes('purple') ? '#A78BFA' : 'var(--accent)',
          background: 'transparent',
          whiteSpace: 'nowrap',
        }}>
          {project.badge}
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          {project.codeSnippet && (
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowCode(!showCode)}
              style={{
                padding: '4px 10px', background: 'transparent',
                border: `1px solid ${showCode ? 'var(--accent)' : 'var(--border)'}`,
                color: showCode ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '10px', fontFamily: '"JetBrains Mono", monospace',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              <Code2 style={{ width: 11, height: 11 }} />
              {showCode ? 'Hide' : 'Code'}
            </motion.button>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              data-cursor="OPEN"
              style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <GithubIcon style={{ width: 16, height: 16 }} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700, fontSize: '1.05rem',
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.3, marginBottom: 12,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.85rem', color: 'var(--text-muted)',
        lineHeight: 1.75, marginBottom: 16, flex: 1,
      }}>
        {project.description}
      </p>

      {/* Arch diagram */}
      {project.isArchDiagram && <ArchDiagram />}

      {/* Code drawer */}
      <motion.div
        initial={false}
        animate={{ height: showCode ? 'auto' : 0, opacity: showCode ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{
          background: '#090b10', border: '1px solid var(--border)',
          padding: '12px 14px', fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px', position: 'relative', marginBottom: 12,
        }}>
          <button
            onClick={handleCopy}
            style={{
              position: 'absolute', top: 8, right: 8, background: 'transparent',
              border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 4, fontSize: '10px',
            }}
          >
            {copied ? <Check style={{ width: 12, height: 12, color: 'var(--accent)' }} /> : <Copy style={{ width: 12, height: 12 }} />}
          </button>
          <pre style={{ color: '#7dd3a8', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {project.codeSnippet}
          </pre>
        </div>
      </motion.div>

      {/* Metrics */}
      {project.metrics && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8, marginBottom: 16,
        }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              padding: '8px 10px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '9px', fontFamily: '"JetBrains Mono", monospace', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 3 }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
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
            whileHover={{ borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
            transition={{ duration: 0.15 }}
            style={{
              padding: '3px 9px',
              fontSize: '11px',
              fontFamily: '"JetBrains Mono", monospace',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
};
