export const visualProjects = [
  {
    id: 'detail-empire-cgi',
    title: 'Freelance CGI: Detail Empire & Commercial Work',
    badge: 'DUBAI CLIENT · CINEMATIC 4K',
    badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    description:
      'Full CGI pipeline for a cinematic promotional advertisement for Detail Empire (Dubai), spanning concept to 4K delivery. Procedural environment generation, advanced PBR texturing, and physics-based fluid simulation for photorealistic product visuals. Also developed product visualizations and high-poly hard surface modeling for commercial clients including AL-QUWA.',
    tags: ['Blender', 'Cycles', 'Octane', 'Procedural Modeling', 'PBR Texturing', 'Fluid Sim', '4K Rendering'],
    videoUrl: '/media/detail-empire-ad.mp4',
    posterUrl: '/media/thumbnails/detail-empire.png',
    client: 'Detail Empire (Dubai) / AL-QUWA',
    aspectRatio: '16/9',
    metrics: [
      { label: 'Resolution', value: '3840x2160 4K UHD' },
      { label: 'Engine', value: 'Cycles OptiX Denoiser' }
    ]
  },
  {
    id: 'ascend-payload-hardware',
    title: 'ASCEND Payload Integration (Hardware Prototyping)',
    badge: 'CAD & 3D PRINTING · ISRO IROC-U',
    badgeColor: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    description:
      'Custom 3D hardware mounts designed in Blender for the ASCEND quadcopter camera modules and Jetson Nano edge-compute unit. Engineered for structural integrity under aggressive motor vibration, with integrated cable routing channels, heat sink clearance, and secure fastener placements for field deployment.',
    tags: ['Blender', 'Hardware CAD', '3D Printing', 'Payload Integration', 'Vibration Damping'],
    videoUrl: '/media/ascend-mount-render.mp4',
    posterUrl: '/media/thumbnails/ascend-mount.png',
    client: 'ISRO IRoC-U Team ASCEND',
    aspectRatio: '16/9',
    metrics: [
      { label: 'Tolerance', value: '0.2mm FDM precision' },
      { label: 'Payload', value: 'Jetson Nano + Dual Cam' }
    ]
  },
  {
    id: 'creative-renders-strip',
    title: 'Procedural Environments & Physics Simulations',
    badge: 'CREATIVE DIRECTION · GEOMETRY NODES',
    badgeColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    description:
      'Personal render explorations in procedural environment layout and physics-driven storytelling. The island dock scene uses geometry nodes for procedural foliage distribution and custom glass/water shaders. The abandoned subway resolves volumetric fog via Volume Scatter and overnight multi-pass GPU rendering. The rose disintegration sequence combines Cell Fracture with turbulent particle emissions and dramatic volumetric lighting.',
    tags: ['Blender', 'Geometry Nodes', 'Particles', 'Cell Fracture', 'Volume Scatter', 'Cycles'],
    isGallery: true,
    galleryItems: [
      {
        title: 'Island Dock Scene',
        subtitle: 'Geometry nodes foliage & custom water PBR shader',
        color: 'from-emerald-900/40 to-teal-950/80',
        icon: 'trees'
      },
      {
        title: 'Subway Terminal',
        subtitle: 'Volumetric scatter atmosphere & moody lighting',
        color: 'from-blue-950/50 to-slate-950/80',
        icon: 'train'
      },
      {
        title: 'Rose Disintegration',
        subtitle: 'Cell fracture physics & emission particles',
        color: 'from-rose-950/50 to-zinc-950/80',
        icon: 'sparkles'
      }
    ],
    metrics: [
      { label: 'Workflows', value: 'GeoNodes & Dynamics' },
      { label: 'Sampling', value: '2048+ Samples / Frame' }
    ]
  }
];
