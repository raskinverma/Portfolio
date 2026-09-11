import React, { useState, useEffect } from 'react';
import { useMode } from '../../context/ModeContext';
import { Terminal, ArrowRight, Box, Sparkles, Activity, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export const Hero = () => {
  const { mode, toggleMode } = useMode();

  // Clean typewriter effect for Mode 1
  const [typedText, setTypedText] = useState('');
  const fullText = 'Raskin Verma';

  useEffect(() => {
    if (mode === 'software') {
      let current = '';
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          current += fullText.charAt(index);
          setTypedText(current);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    } else {
      setTypedText(fullText);
    }
  }, [mode]);

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          mode === 'software' ? 'max-w-content-sw' : 'max-w-content-3d'
        }`}
      >
        {mode === 'software' ? (
          /* Mode 1: Software & Systems Hero */
          <div className="space-y-6">
            {/* Terminal Status Prompt Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border text-xs font-mono text-text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYS_KERNEL // HOST: IIIT_DHARWAD.LOCAL</span>
              <span className="text-border">|</span>
              <span className="text-emerald-400">STATUS: ONLINE</span>
            </div>

            {/* Main Terminal Heading */}
            <div className="space-y-3">
              <div className="flex items-center text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-text-primary">
                <span className="text-emerald-400 mr-2 sm:mr-3">&gt;</span>
                <span>{typedText}</span>
                <span className="inline-block w-3 sm:w-4 h-8 sm:h-12 bg-emerald-400 ml-1 animate-blink" />
              </div>

              <p className="text-base sm:text-xl font-mono text-text-muted max-w-2xl">
                CS @ IIIT Dharwad (9.44 CGPA) &nbsp;·&nbsp; Systems &nbsp;·&nbsp; Vision &nbsp;·&nbsp; Web
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-2xl font-mono text-xs">
              <div className="p-2.5 bg-surface border-l-2 border-l-emerald-400 border-y border-r border-border">
                <div className="text-text-muted text-[10px]">COMPETITION</div>
                <div className="text-text-primary font-semibold">Aerothon 2nd / ISRO 4th</div>
              </div>
              <div className="p-2.5 bg-surface border-l-2 border-l-blue-400 border-y border-r border-border">
                <div className="text-text-muted text-[10px]">CORE LANGUAGES</div>
                <div className="text-text-primary font-semibold">C++ · Python · SQL</div>
              </div>
              <div className="p-2.5 bg-surface border-l-2 border-l-purple-400 border-y border-r border-border">
                <div className="text-text-muted text-[10px]">SYSTEMS & VISION</div>
                <div className="text-text-primary font-semibold">ROS · OpenCV · Sockets</div>
              </div>
              <div className="p-2.5 bg-surface border-l-2 border-l-emerald-400 border-y border-r border-border">
                <div className="text-text-muted text-[10px]">ACADEMIC RECORD</div>
                <div className="text-text-primary font-semibold">9.44 CGPA (Class 2028)</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
              >
                <span>[ View Systems Projects ]</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/raskinverma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border hover:border-text-muted text-text-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>github.com/raskinverma</span>
              </a>

              <button
                onClick={toggleMode}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors ml-auto sm:ml-0"
              >
                <Box className="w-4 h-4" />
                <span>Switch to 3D & CGI Mode &rarr;</span>
              </button>
            </div>
          </div>
        ) : (
          /* Mode 2: 3D & Visualization Hero */
          <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#120f1c] via-[#090710] to-bg p-8 sm:p-14">
            {/* Ambient amber glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Studio badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CINEMATIC CGI & HARDWARE PROTOTYPING</span>
              </div>

              {/* Editorial Title */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-mono tracking-widest text-amber-400/80 uppercase">
                  3D · CGI · Hardware
                </p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-text-primary leading-[1.05]">
                  Raskin Verma
                  <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-amber-300/90 mt-2 font-display">
                    Visual Engineering &amp; Render Pipeline
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans max-w-xl">
                Full-pipeline commercial CGI advertisements for international clients in Dubai, custom 3D hardware engineering for autonomous quadcopters, and procedural simulations powered by Blender Geometry Nodes.
              </p>

              {/* Toolchain / Render Stack badges */}
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {['Blender Cycles', 'Octane Render', 'PBR Fluid Sims', 'Geometry Nodes', 'CAD 3D Printing'].map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-full bg-surface-elevated border border-border text-amber-200/80"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 text-black font-display font-bold hover:bg-amber-300 transition-all shadow-xl shadow-amber-500/10"
                >
                  <span>Explore 3D Renders</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={toggleMode}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  <Terminal className="w-4 h-4" />
                  <span>&larr; Switch to Software Mode</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
