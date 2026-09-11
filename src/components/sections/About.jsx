import React from 'react';
import { useMode } from '../../context/ModeContext';
import { User, Terminal, Cpu, Box, Wrench, Heart, Code2 } from 'lucide-react';

export const About = () => {
  const { mode } = useMode();

  const skillCategories = [
    { domain: 'Languages', skills: ['C', 'C++', 'Python', 'SQL'], icon: Code2 },
    { domain: 'Web & APIs', skills: ['React', 'Next.js 15', 'Vite', 'Tailwind CSS', 'FastAPI', 'Node.js'], icon: Terminal },
    { domain: 'AI & Vision', skills: ['OpenCV', 'MediaPipe', 'LLM Orchestration', 'RAG (GraphRAG)', 'Neo4j'], icon: Cpu },
    { domain: '3D & Design', skills: ['Blender (Geometry Nodes, Rigging, Procedural)', 'Cycles', 'KiCAD'], icon: Box },
    { domain: 'Systems & Comms', skills: ['ROS', 'UDP Sockets', 'Linux Systems', 'Git', 'Threading'], icon: Wrench },
    { domain: 'Hardware & CAD', skills: ['PCB Design basics', 'Power Electronics', '3D FDM Prototyping'], icon: Cpu },
  ];

  return (
    <section id="about" className="py-16 scroll-mt-24">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          mode === 'software' ? 'max-w-content-sw' : 'max-w-content-3d'
        }`}
      >
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-border/70">
          <div className="flex items-center gap-2 text-xs font-mono text-accent mb-1.5">
            <User className="w-4 h-4" />
            <span>// 03. PROFILE & ENGINEERING MATRIX</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight text-text-primary ${
              mode === 'software' ? 'font-mono' : 'font-display'
            }`}
          >
            About &amp; Technical Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Core Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-surface border border-border/80">
              <h3 className="text-xs font-mono text-accent tracking-wider uppercase mb-3">
                &gt; ENGINEERING IDENTITY
              </h3>
              <p className="text-sm sm:text-base text-text-primary leading-relaxed font-sans mb-4">
                I'm a Computer Science undergraduate at <strong className="text-text-primary">IIIT Dharwad</strong> (Class of 2028, <span className="text-accent font-mono font-semibold">9.44 CGPA</span>) working across software systems, computer vision, and 3D visualization.
              </p>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
                My work ranges from autonomous drone pipelines competing at the national level to commercial CGI for clients in Dubai — with the unifying thread being that I like building things where <strong className="text-text-primary">software and the physical world meet</strong>.
              </p>
            </div>

            {/* Beyond Work ("Multifaceted" section) */}
            <div className="p-6 bg-surface-elevated/40 border border-border/80 rounded-none">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-2">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-text-primary uppercase tracking-wider">// BEYOND CODE</span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                Outside of builds: fingerstyle guitar (beginner-intermediate, right-hand focus), structured gym lifting (PPL split), and badminton with an interest in biomechanics. Currently fascinated by the overlap between quaternion math and how the body actually moves.
              </p>
            </div>
          </div>

          {/* Right Column: Skills Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-surface border border-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                Technical Toolkit
              </h3>
              <span className="text-[10px] font-mono text-text-muted">DOMAIN GROUPED</span>
            </div>

            <div className="space-y-4">
              {skillCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.domain} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span className="font-semibold text-text-primary">{cat.domain}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[11px] font-mono bg-[#131620] text-[#a0a9be] border border-border/60 rounded-none hover:border-accent hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
