export const softwareProjects = [
  {
    id: 'graphrag-timetable',
    title: 'GraphRAG Knowledge Portal & Timetable Algorithm',
    badge: 'AEROTHON 2026 · 2ND PLACE NATIONALLY',
    badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    description:
      'Frontend architecture for a graph-native RAG system built with Next.js 15 and Neo4j, deployed at Aerothon 2026 — a national aerospace hackathon. Paired with a Python constraint-satisfaction engine that automates university scheduling: room allocations, faculty conflicts, and time slot assignment with zero manual conflict.',
    tags: ['Next.js 15', 'Neo4j', 'Python', 'Graph APIs', 'Constraint Satisfaction', 'FastAPI'],
    githubUrl: 'https://github.com/raskinverma',
    liveUrl: null,
    metrics: [
      { label: 'Latency', value: '<120ms graph lookup' },
      { label: 'Conflicts', value: '0 unresolved slots' }
    ],
    codeSnippet: `def resolve_schedule_conflicts(graph, constraints):\n    solver = CSPBacktrackingSolver(\n        variables=graph.time_slots,\n        domains=graph.rooms_available,\n        hard_constraints=[faculty_overlap, room_capacity],\n        soft_constraints=[travel_distance_heuristic]\n    )\n    return solver.optimize(max_iterations=1000)`
  },
  {
    id: 'gesture-viewport',
    title: 'Hand Gesture Controlled 3D Viewport',
    badge: 'CV & REAL-TIME SOCKETS',
    badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    description:
      'Real-time computer vision pipeline translating physical hand landmarks into 3D viewport controls. A non-blocking Blender modal operator receives quaternion rotation data over UDP sockets, with moving average smoothing and dead-zone filtering for stable, responsive control with zero Blender UI lag.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'UDP Sockets', 'Quaternion Math', 'Blender bpy'],
    githubUrl: 'https://github.com/raskinverma/blender-gesture-control',
    videoUrl: '/media/gesture-control-demo.mp4',
    posterUrl: '/media/thumbnails/gesture-control.png',
    metrics: [
      { label: 'Throughput', value: '60 FPS real-time' },
      { label: 'Protocol', value: 'UDP binary packets' }
    ],
    codeSnippet: `class ViewportModalOperator(bpy.types.Operator):\n    bl_idname = "view3d.gesture_control"\n    bl_label = "Socket Gesture Listener"\n\n    def modal(self, context, event):\n        if event.type == 'TIMER':\n            packet, _ = self.sock.recvfrom(1024)\n            q = Quaternion(struct.unpack('4f', packet))\n            context.space_data.region_3d.view_rotation = q.slerp(smoothed_q, 0.2)\n        return {'PASS_THROUGH'}`
  },
  {
    id: 'project-ascend',
    title: 'Project ASCEND (ISRO IRoC-U 2026)',
    badge: 'IROC-U 2026 · 4TH PLACE NATIONALLY',
    badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    description:
      'Engineered the primary camera_stream pipeline and mathematical coordinate transformation layer (object-to-drone reference frames) for an autonomous quadcopter competing in ISRO national robotics challenge. Developed real-time 2D and 3D spatial mapping architectures with coordinated data logging to enable accurate environment tracking.',
    tags: ['C++', 'Python', 'ROS', 'Computer Vision', 'Coordinate Systems', 'Spatial Mapping'],
    githubUrl: 'https://github.com/raskinverma',
    isArchDiagram: true,
    metrics: [
      { label: 'ISRO Rank', value: '4th Nationally' },
      { label: 'Coordinate Engine', value: '6-DoF rigid transforms' }
    ]
  },
  {
    id: 'mocap-armature',
    title: 'Body Motion Capture → Blender Armature',
    badge: 'POSE ESTIMATION & RIGGING',
    badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    description:
      'Real-time markerless body motion capture system using MediaPipe Pose Landmarker to drive a Mixamo character armature in Blender via bpy. Reuses the UDP socket bridge and non-blocking modal operator pattern from gesture control. Bone rotations are computed from 3D landmark deltas and applied per-frame without freezing Blender main thread.',
    tags: ['Python', 'MediaPipe', 'Blender bpy', 'UDP Sockets', 'Armature Rigging', 'Kinematics'],
    githubUrl: 'https://github.com/raskinverma',
    videoUrl: '/media/mocap-armature-demo.mp4',
    posterUrl: '/media/thumbnails/mocap-armature.png',
    metrics: [
      { label: 'Landmarks', value: '33 3D joints' },
      { label: 'Latency', value: '<25ms frame-to-rig' }
    ],
    codeSnippet: `def compute_bone_quaternion(joint_a, joint_b, rest_vector):\n    current_vector = (joint_b - joint_a).normalized()\n    axis = rest_vector.cross(current_vector)\n    angle = math.acos(max(-1.0, min(1.0, rest_vector.dot(current_vector))))\n    return Quaternion(axis, angle)`
  }
];
