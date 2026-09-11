import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1]; // smooth expo out

/** Single element fade+slide up on scroll enter */
export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className = '',
  style = {},
}) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/** Container that staggers its direct children */
export const StaggerContainer = ({ children, stagger = 0.1, className = '', style = {} }) => (
  <motion.div
    className={className}
    style={style}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

/** Child item for StaggerContainer */
export const StaggerItem = ({ children, className = '', style = {} }) => (
  <motion.div
    className={className}
    style={style}
    variants={{
      hidden: { opacity: 0, y: 28 },
      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }}
  >
    {children}
  </motion.div>
);

/** Section label + title that slides in from left */
export const SectionHeader = ({ label, title, className = '' }) => (
  <div className={`mb-12 ${className}`}>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        fontSize: '11px',
        fontFamily: '"JetBrains Mono", monospace',
        color: 'var(--accent)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--accent)' }} />
      {label}
    </motion.div>

    <div style={{ overflow: 'hidden' }}>
      <motion.h2
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          lineHeight: 1.1,
        }}
      >
        {title}
      </motion.h2>
    </div>
  </div>
);
