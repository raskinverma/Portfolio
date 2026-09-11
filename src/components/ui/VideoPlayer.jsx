import React, { useState, useRef, useEffect } from 'react';
import { Play, VolumeX, Maximize2, Film, Box } from 'lucide-react';

export const VideoPlayer = ({
  src,
  poster,
  title = '3D Visualization',
  aspectRatio = '16/9',
  fallbackType = 'fluid', // 'fluid' | 'hardware' | 'mocap'
  className = ''
}) => {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Fallback procedural animation if video file is not yet placed in /public/media/
  useEffect(() => {
    if (!videoError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const renderFallback = () => {
      time += 0.02;
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;

      // Dark studio background
      ctx.fillStyle = '#0a0910';
      ctx.fillRect(0, 0, w, h);

      // Subtle studio grid
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.06)';
      ctx.lineWidth = 1;
      const grid = 30;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2;

      if (fallbackType === 'hardware') {
        // Rotating 3D wireframe payload mount
        const size = Math.min(w, h) * 0.28;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.5);

        // Outer hexagon mount ring
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * (size * 0.65);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner payload frame
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
        ctx.strokeRect(-size * 0.45, -size * 0.35, size * 0.9, size * 0.7);

        // Center optic lens crosshairs
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
        ctx.moveTo(-size * 0.35, 0);
        ctx.lineTo(size * 0.35, 0);
        ctx.moveTo(0, -size * 0.35);
        ctx.lineTo(0, size * 0.35);
        ctx.stroke();

        ctx.restore();

      } else {
        // Dynamic fluid wave / procedural motion
        ctx.save();
        const waves = 3;
        for (let j = 0; j < waves; j++) {
          ctx.beginPath();
          ctx.moveTo(0, cy);
          for (let x = 0; x <= w; x += 10) {
            const y = cy + Math.sin(x * 0.015 + time + j * 1.5) * (24 + j * 12) * Math.cos(time * 0.4);
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = j === 0 ? 'rgba(245, 158, 11, 0.8)' : `rgba(245, 158, 11, ${0.3 / (j + 1)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(renderFallback);
    };

    renderFallback();

    return () => cancelAnimationFrame(animId);
  }, [videoError, fallbackType]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-black/60 rounded-md border border-border group ${className}`}
      style={{ aspectRatio }}
    >
      {!videoError && src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 text-center px-4 py-3 bg-black/60 backdrop-blur-md rounded border border-amber-500/20 max-w-xs">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Film className="w-3.5 h-3.5 animate-pulse" />
              <span>CGI RENDER PREVIEW</span>
            </div>
            <p className="text-xs text-text-muted">
              {title}
            </p>
          </div>
        </div>
      )}

      {/* Subtle bottom vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent pointer-events-none" />

      {/* Floating status badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>4K PRORES / CYCLES</span>
      </div>

      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 text-text-muted text-xs">
        <VolumeX className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono">MUTED</span>
      </div>
    </div>
  );
};
