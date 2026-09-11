import React, { useState } from 'react';
import { VideoPlayer } from '../ui/VideoPlayer';
import { Box, Sparkles, Film, ExternalLink, Layers, Eye } from 'lucide-react';

export const CGICard = ({ project }) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  return (
    <article className="relative flex flex-col bg-surface border border-border/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-amber-500/5 group">
      {/* Full Bleed Media Area */}
      {project.isGallery ? (
        <div className="relative w-full aspect-video bg-black/80 flex flex-col justify-between p-4 overflow-hidden border-b border-border">
          {/* Active scene atmospheric visual representation */}
          <div
            className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
              project.galleryItems[activeGalleryIndex].color
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />

          {/* Top meta */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 border border-white/15 text-amber-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>PROCEDURAL RENDER SERIES</span>
            </span>
            <span className="text-[11px] font-mono text-text-muted bg-black/50 px-2 py-0.5 rounded">
              0{activeGalleryIndex + 1} / 0{project.galleryItems.length}
            </span>
          </div>

          {/* Center Stage Preview */}
          <div className="relative z-10 my-auto text-center px-4 py-3">
            <h4 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide mb-1">
              {project.galleryItems[activeGalleryIndex].title}
            </h4>
            <p className="text-xs text-amber-200/80 font-mono">
              {project.galleryItems[activeGalleryIndex].subtitle}
            </p>
          </div>

          {/* Scene Selector Strip */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            {project.galleryItems.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`text-left px-2.5 py-1.5 rounded text-xs transition-all ${
                  activeGalleryIndex === idx
                    ? 'bg-amber-500/20 border border-amber-400/40 text-white'
                    : 'bg-black/40 border border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400">Scene 0{idx + 1}</div>
                <div className="truncate text-[11px] font-medium">{item.title}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-full border-b border-border">
          <VideoPlayer
            src={project.videoUrl}
            poster={project.posterUrl}
            title={project.title}
            aspectRatio={project.aspectRatio || '16/9'}
            fallbackType={project.id.includes('hardware') ? 'hardware' : 'fluid'}
          />
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Top Badge & Client */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono tracking-wider rounded-full border ${
              project.badgeColor || 'text-accent border-accent/30 bg-accent/10'
            }`}
          >
            {project.badge}
          </span>
          {project.client && (
            <span className="text-[11px] font-mono text-text-muted">
              Client: <strong className="text-text-primary font-semibold">{project.client}</strong>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans mb-4 flex-grow">
          {project.description}
        </p>

        {/* Render Specs / Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-black/40 rounded-lg border border-border/60 font-mono text-xs">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-text-muted text-[10px] uppercase tracking-wider">{m.label}</span>
                <span className="text-amber-300 font-semibold">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/40 font-mono text-xs">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-surface-elevated text-text-muted border border-border hover:border-amber-400/40 hover:text-amber-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
