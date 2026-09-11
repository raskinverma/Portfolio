import React, { useState } from 'react';
import { Layers, Activity, Cpu, Compass, HardDrive, Navigation } from 'lucide-react';

export const ArchDiagram = () => {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 'cam', label: 'Camera Sensor', sub: 'Sony IMX477 · 60FPS', x: 70, y: 55, icon: Activity },
    { id: 'stream', label: 'camera_stream Pipeline', sub: 'Zero-copy OpenCV / V4L2', x: 250, y: 55, icon: Cpu },
    { id: 'transform', label: 'Coordinate Transform', sub: 'Object → Drone 6-DoF Frame', x: 470, y: 55, icon: Compass },
    { id: 'map2d', label: '2D Occupancy Grid', sub: 'Fast Obstacle Boundary', x: 370, y: 155, icon: Layers },
    { id: 'map3d', label: '3D Point Cloud Map', sub: 'OctoMap Voxel Representation', x: 570, y: 155, icon: Layers },
    { id: 'logger', label: 'Synchronized Logger', sub: 'HDF5 / ROSbag telemetry', x: 470, y: 245, icon: HardDrive },
    { id: 'nav', label: 'Nav Controller', sub: 'PX4 Trajectory Optimizer', x: 670, y: 245, icon: Navigation },
  ];

  return (
    <div className="w-full bg-[#0b0d13] p-4 rounded border border-border/80 my-3 font-mono">
      <div className="flex items-center justify-between mb-3 text-xs text-text-muted border-b border-border/60 pb-2">
        <span className="flex items-center gap-1.5 text-accent font-semibold">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>PIPELINE ARCHITECTURE // ASCEND ISRO IRoC-U</span>
        </span>
        <span className="text-[11px] text-text-muted">Hover node for telemetry</span>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 760 300" className="w-full min-w-[640px] h-auto select-none">
          <defs>
            {/* Pulsing signal glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="splitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {/* Cam -> Stream */}
          <path d="M 140 55 L 180 55" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="140" y1="55" x2="180" y2="55" stroke="#4ADE80" strokeWidth="2" strokeOpacity="0.8" />

          {/* Stream -> Transform */}
          <path d="M 320 55 L 400 55" stroke="var(--border)" strokeWidth="2" />
          <line x1="320" y1="55" x2="400" y2="55" stroke="url(#streamGrad)" strokeWidth="2" />

          {/* Transform -> 2D Map */}
          <path d="M 470 85 L 470 115 L 370 115 L 370 135" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />

          {/* Transform -> 3D Map */}
          <path d="M 470 85 L 470 115 L 570 115 L 570 135" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />

          {/* 2D & 3D Maps -> Logger */}
          <path d="M 370 175 L 370 210 L 470 210 L 470 225" fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <path d="M 570 175 L 570 210 L 470 210 L 470 225" fill="none" stroke="var(--border)" strokeWidth="1.5" />

          {/* Logger -> Nav Controller */}
          <path d="M 540 245 L 600 245" stroke="#4ADE80" strokeWidth="2" strokeDasharray="4 2" />

          {/* Animated data pulses */}
          <circle r="3" fill="#4ADE80">
            <animateMotion path="M 140 55 L 180 55" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#60A5FA">
            <animateMotion path="M 320 55 L 400 55" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#4ADE80">
            <animateMotion path="M 470 85 L 470 115 L 370 115 L 370 135" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#60A5FA">
            <animateMotion path="M 470 85 L 470 115 L 570 115 L 570 135" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#4ADE80">
            <animateMotion path="M 540 245 L 600 245" dur="1.2s" repeatCount="indefinite" />
          </circle>

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="cursor-pointer transition-transform duration-200"
              >
                {/* Node Box */}
                <rect
                  x="-70"
                  y="-22"
                  width="140"
                  height="44"
                  rx="3"
                  fill={isHovered ? '#161922' : '#0e1118'}
                  stroke={isHovered ? '#4ADE80' : '#1E2230'}
                  strokeWidth={isHovered ? '1.5' : '1'}
                  className="transition-all duration-200"
                />

                {/* Left accent indicator */}
                <line
                  x1="-70"
                  y1="-22"
                  x2="-70"
                  y2="22"
                  stroke={isHovered ? '#4ADE80' : '#60A5FA'}
                  strokeWidth="3"
                />

                {/* Text Labels */}
                <text
                  x="-58"
                  y="-4"
                  fill={isHovered ? '#ffffff' : '#E8EAF0'}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
                <text
                  x="-58"
                  y="12"
                  fill="#7E8597"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {node.sub.length > 20 ? node.sub.substring(0, 18) + '…' : node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Telemetry Inspector Box */}
      <div className="mt-2 pt-2 border-t border-border/40 text-[11px] text-text-muted flex items-center justify-between">
        <div>
          <span className="text-accent font-semibold mr-2">&gt; INSPECT:</span>
          {activeNode ? (
            <span className="text-text-primary">
              {nodes.find(n => n.id === activeNode)?.label} — {nodes.find(n => n.id === activeNode)?.sub}
            </span>
          ) : (
            <span className="text-text-muted">Hover or tap any module to view pipeline specs</span>
          )}
        </div>
        <span className="text-[10px] text-text-muted font-mono">60Hz Real-Time EKF</span>
      </div>
    </div>
  );
};
