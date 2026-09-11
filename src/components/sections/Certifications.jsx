import React from 'react';
import { useMode } from '../../context/ModeContext';
import { certifications } from '../../data/certifications';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Certifications = () => {
  const { mode } = useMode();

  return (
    <section id="certifications" className="py-10 scroll-mt-24">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          mode === 'software' ? 'max-w-content-sw' : 'max-w-content-3d'
        }`}
      >
        <div className="p-4 sm:p-6 bg-surface/80 border border-border/70 rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="font-semibold text-text-primary tracking-wide">// VERIFIED CREDENTIALS</span>
            </div>
            <span className="text-[10px] font-mono text-text-muted">2026 ISSUED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="flex items-start gap-3 p-3 bg-surface-elevated/50 border border-border/60 hover:border-accent/40 transition-colors"
              >
                <div className="mt-0.5 p-1.5 rounded bg-accent/10 border border-accent/20 text-accent">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-text-primary text-[11px] sm:text-xs line-clamp-2">
                    {cert.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-text-muted">
                    <span>{cert.issuer}</span>
                    <span>·</span>
                    <span className="text-accent">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
