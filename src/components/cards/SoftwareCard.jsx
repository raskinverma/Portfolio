import React, { useState } from 'react';
import { ExternalLink, Code2, Check, Copy } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { ArchDiagram } from '../ui/ArchDiagram';

export const SoftwareCard = ({ project }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <article className="relative flex flex-col bg-surface border-y border-r border-border border-l-[3px] border-l-accent p-5 sm:p-6 transition-all duration-200 hover:border-r-border/80 hover:bg-surface-elevated/70 group">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider border rounded-none ${
            project.badgeColor || 'text-accent border-accent/30 bg-accent/10'
          }`}
        >
          {project.badge}
        </span>

        <div className="flex items-center gap-2">
          {project.codeSnippet && (
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-1.5 rounded-none text-xs font-mono transition-colors flex items-center gap-1 ${
                showCode
                  ? 'bg-accent/15 text-accent border border-accent/40'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated'
              }`}
              title="Toggle Code Snippet"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">{showCode ? 'Hide Code' : 'View Code'}</span>
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
              title="View Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-mono font-bold text-text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans mb-4 flex-grow">
        {project.description}
      </p>

      {/* Interactive Visual Element */}
      {project.isArchDiagram && (
        <div className="my-2">
          <ArchDiagram />
        </div>
      )}

      {/* Code Drawer snippet */}
      {project.codeSnippet && showCode && (
        <div className="my-3 relative bg-[#090b10] border border-border p-3 font-mono text-[11px] overflow-x-auto text-emerald-300">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50 text-[10px] text-text-muted">
            <span>CORE LOGIC KERNEL</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-text-muted hover:text-text-primary"
            >
              {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-text-primary leading-relaxed font-mono whitespace-pre-wrap">
            {project.codeSnippet}
          </pre>
        </div>
      )}

      {/* Metrics Row */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 my-3 p-2 bg-[#0b0c11] border border-border/50 font-mono text-[11px]">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-text-muted text-[9px] uppercase tracking-wider">{m.label}</span>
              <span className="text-text-primary font-semibold">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-border/40 font-mono text-[11px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-[#12151f] text-[#8690a6] border border-border/60 hover:border-accent/40 hover:text-text-primary transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
