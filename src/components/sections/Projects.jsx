import React from 'react';
import { useMode } from '../../context/ModeContext';
import { softwareProjects } from '../../data/softwareProjects';
import { visualProjects } from '../../data/visualProjects';
import { SoftwareCard } from '../cards/SoftwareCard';
import { CGICard } from '../cards/CGICard';
import { Code, Film, Layers } from 'lucide-react';

export const Projects = () => {
  const { mode } = useMode();

  return (
    <section id="projects" className="py-16 scroll-mt-24">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          mode === 'software' ? 'max-w-content-sw' : 'max-w-content-3d'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-border/70 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent mb-1.5">
              {mode === 'software' ? <Code className="w-4 h-4" /> : <Film className="w-4 h-4" />}
              <span>{mode === 'software' ? '// SELECTED SYSTEMS WORK' : '// COMMERCIAL & CREATIVE CGI'}</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-bold tracking-tight text-text-primary ${
                mode === 'software' ? 'font-mono' : 'font-display'
              }`}
            >
              {mode === 'software' ? 'Featured Software & Vision Projects' : '3D Art, Simulations & Hard Surface CAD'}
            </h2>
          </div>

          <span className="text-xs font-mono text-text-muted">
            {mode === 'software' ? `${softwareProjects.length} Systems Shipped` : `${visualProjects.length} Render Suites`}
          </span>
        </div>

        {/* Project Grid */}
        {mode === 'software' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softwareProjects.map((project) => (
              <SoftwareCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visualProjects.map((project) => (
              <CGICard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
