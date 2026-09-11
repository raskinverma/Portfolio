import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { softwareProjects } from '../../data/softwareProjects';
import { visualProjects } from '../../data/visualProjects';
import { SoftwareCard } from '../cards/SoftwareCard';
import { CGICard } from '../cards/CGICard';
import { SectionHeader, StaggerContainer, StaggerItem } from '../ui/Animate';

export const Projects = () => {
  const { mode } = useMode();
  const isSW = mode === 'software';
  const projects = isSW ? softwareProjects : visualProjects;

  return (
    <section id="projects" style={{ padding: '120px 0', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: isSW ? 1100 : 1280, margin: '0 auto', padding: '0 32px' }}>
        <SectionHeader
          label={isSW ? '01 — Selected Work' : '02 — Visual Work'}
          title={isSW ? 'Systems & Vision Projects' : '3D, CGI & Hardware'}
        />

        <StaggerContainer
          style={{
            display: 'grid',
            gridTemplateColumns: isSW
              ? 'repeat(auto-fill, minmax(460px, 1fr))'
              : 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 24,
          }}
          stagger={0.12}
        >
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              {isSW
                ? <SoftwareCard project={project} />
                : <CGICard project={project} />
              }
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
