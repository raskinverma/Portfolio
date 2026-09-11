import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';

export const GridBackground = () => {
  const { mode } = useMode();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 3, targetX: width / 2, targetY: height / 3 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (mode === 'software') {
        // High-precision engineering subtle dot grid
        const spacing = 36;
        const radius = 1;
        const maxDist = 180;

        for (let x = spacing; x < width; x += spacing) {
          for (let y = spacing; y < height; y += spacing) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let alpha = 0.08;
            let currentRadius = radius;

            if (dist < maxDist) {
              const factor = (1 - dist / maxDist);
              alpha = 0.08 + factor * 0.45;
              currentRadius = radius + factor * 1.5;
              ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Subtle ambient cursor spotlight
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 350
        );
        gradient.addColorStop(0, 'rgba(74, 222, 128, 0.04)');
        gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

      } else {
        // Mode 2: 3D / Cinematic warm studio lighting vignette
        const amberGrad = ctx.createRadialGradient(
          mouse.x, mouse.y * 0.7, 0,
          mouse.x, mouse.y * 0.7, 450
        );
        amberGrad.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
        amberGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.02)');
        amberGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = amberGrad;
        ctx.fillRect(0, 0, width, height);

        // Subtle studio rim light from top
        const topGrad = ctx.createLinearGradient(0, 0, 0, 300);
        topGrad.addColorStop(0, 'rgba(120, 53, 15, 0.05)');
        topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, width, 300);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-70 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />
    </div>
  );
};
