1.# Portfolio Website — Full Build Plan
**Raskin Verma** | raskinverma.dev (placeholder)
**Stack:** React + Vite + Tailwind CSS (consistent with your existing portfolio codebase)
**Last Updated:** September 2026

---

## 0. Open Questions — Confirm Before Building

Before any code is written, these need answers:

| # | Question | Why It Matters |
|---|----------|---------------|
| 1 | Do you have render exports / video clips ready for the Detail Empire CGI ad and fluid sim work? | The 3D mode's hero depends on autoplay video. Without it, that section falls flat. |
| 2 | Do you have a clean rotating render of the ASCEND drone mounts (camera + Jetson Nano hardware)? | Featured as the hero visual for Mode 2 Project 2. |
| 3 | Do you want the Motion Capture project (MediaPipe Pose → Blender armature) included? | It's a strong CV/systems piece that bridges both modes — worth a card. |
| 4 | Do you want the Armor app (Hack2Future 2.0) and ProfessorAI included, or stay lean with the resume list? | They're shipped projects but not on the resume. Inclusion adds depth; exclusion keeps focus. |
| 5 | Do you have a custom domain in mind, or use GitHub Pages for now? | Affects routing config (HashRouter vs BrowserRouter) and `base` in vite.config. |
| 6 | Do you want the terminal interface from your existing portfolio ported over, or start fresh? | Reusing the existing terminal shell saves significant time. |
| 7 | LinkedIn / GitHub icons in the top bar or footer only? | Affects nav layout. |
| 8 | Do you want a contact form, or just mailto + LinkedIn links? | A form requires a backend or third-party service (Formspree, EmailJS). |

---

## 1. Tech Stack & Architecture

```
raskin-portfolio/
├── public/
│   ├── Resume_Raskin_Verma.pdf          ← served directly for download
│   ├── media/
│   │   ├── detail-empire-ad.mp4         ← autoplay muted loop
│   │   ├── fluid-sim-loop.mp4
│   │   ├── ascend-mount-render.mp4      ← rotating 3D render
│   │   ├── gesture-control-demo.mp4
│   │   └── thumbnails/                  ← fallback stills
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── ModeToggle.jsx           ← the master SW↔3D toggle
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx                 ← mode-aware hero
│   │   │   ├── Projects.jsx             ← mode-aware project grid
│   │   │   ├── About.jsx
│   │   │   └── Certifications.jsx
│   │   ├── cards/
│   │   │   ├── SoftwareCard.jsx
│   │   │   └── CGICard.jsx
│   │   └── ui/
│   │       ├── GlassHeader.jsx
│   │       ├── VideoPlayer.jsx          ← muted autoplay with poster fallback
│   │       └── ArchDiagram.jsx          ← SVG coordinate-transform diagram
│   ├── data/
│   │   ├── softwareProjects.js          ← Mode 1 project data
│   │   └── visualProjects.js            ← Mode 2 project data
│   ├── context/
│   │   └── ModeContext.jsx              ← global SW/3D mode state
│   ├── hooks/
│   │   └── useScrolled.js               ← for top bar behavior
│   ├── styles/
│   │   ├── globals.css
│   │   ├── software.css                 ← mode-specific overrides
│   │   └── visual.css
│   └── App.jsx
├── vite.config.js
├── tailwind.config.js
└── index.html
```

**State management:** A single `ModeContext` (React Context + useState) wraps the app. `mode` is `'software' | 'visual'`. All mode-aware components consume this context. No Redux needed.

**Animations:** Use `framer-motion` for the mode transition (cross-fade + slight y-translate). Everything else is CSS transitions. No entrance animations on scroll — one clean, deliberate motion moment (the mode switch) is the memorable thing.

---

## 2. Visual Design System

### 2.1 Mode 1 — Software & Systems

**Aesthetic:** Cold terminal precision. Think compiler output meets system monitor. Not dark-mode-generic — this has specificity.

```
Palette:
  --bg:           #08090D    (near-black, blue-shifted, not the generic #0B0B0B)
  --surface:      #0F1117    (card backgrounds)
  --border:       #1E2230    (subtle panel borders)
  --accent:       #4ADE80    (terminal green — matches your existing portfolio aesthetic)
  --accent-dim:   #1A3D2B    (muted green for tag backgrounds)
  --text-primary: #E8EAF0
  --text-muted:   #5A6070
  --highlight:    #60A5FA    (blue — secondary accent for links/stack tags)

Typography:
  Display:  "JetBrains Mono" or "IBM Plex Mono" — monospace carries the terminal identity
  Body:     "Inter" — clean, legible, no personality conflict
  Scale:    hero 56px / section heads 32px / card titles 20px / body 15px

Layout:
  Max content width: 1100px, center-aligned
  Project cards: 3-column CSS grid on desktop, 1-column mobile
  Cards have a left border accent (3px solid --accent) instead of box shadows
  No border-radius on cards — sharp corners reinforce precision aesthetic
```

### 2.2 Mode 2 — 3D & Visualization

**Aesthetic:** Cinematic dark room. The kind of UI you'd see behind a VFX studio's render farm dashboard. Deep blacks, warm amber/gold accents, wide-format video treatments.

```
Palette:
  --bg:           #06050A    (deeper, warmer black)
  --surface:      #100E18    (card bg — slight purple tint)
  --border:       #2A1F3A
  --accent:       #F59E0B    (amber/gold — warmth of studio lighting)
  --accent-dim:   #3A2A10
  --text-primary: #F0EDE8    (warm white — like a color-graded monitor)
  --text-muted:   #6A5F70

Typography:
  Display:  "Syne" (geometric, futuristic — different personality from mono)
  Body:     "Inter" (consistent with Mode 1 for legibility)
  Scale:    same as Mode 1

Layout:
  Max content width: 1280px (wider — lets video breathe)
  Project cards: full-bleed video/image at top, text below — more editorial
  Subtle gradient overlays on video thumbnails (bottom-to-transparent)
  Rounded corners (8px) — softened, cinematic
```

### 2.3 Mode Transition

When the toggle is switched:
1. A 200ms opacity fade-out on the content area
2. CSS custom properties on `:root` swap via a class toggle (`.mode-visual`) on `<body>`
3. 200ms fade-in on new content
4. The top bar logo text color animates between green and amber

This is the **one deliberate motion moment** on the page. Nothing else moves on its own.

---

## 3. Global Layout & Navigation

### 3.1 Top Bar (Fixed, Glassmorphism)

```
[ RASKIN VERMA ]  ←→  Projects  About  [ SW ↔ 3D ]  [ ↓ Resume ]
```

- **Logo:** "RASKIN VERMA" in monospace (Mode 1) or Syne (Mode 2). Color-transitions on mode switch.
- **Nav links:** `Projects` and `About` — smooth-scroll anchors. No router navigation.
- **Mode Toggle:** Pill-shaped switch. Left label "SW" right label "3D". The active side fills with the mode's accent color.
  - On mobile: toggle moves into a hamburger-accessible menu.
- **Resume Button:** `↓ Resume` — downloads `public/Resume_Raskin_Verma.pdf` directly via `<a href="/Resume_Raskin_Verma.pdf" download>`.
- **Glassmorphism:** `backdrop-filter: blur(16px)` on a semi-transparent surface background. No heavy shadow — just a bottom border at `--border`.
- **Scroll behavior:** Top bar is always visible. The mode toggle gets visually emphasized (slightly larger) after the user scrolls past the hero.

---

## 4. Mode 1 — Software & Systems (Default)

### 4.1 Hero

```
[ terminal cursor blink ]
> Raskin Verma
  CS @ IIIT Dharwad  ·  Systems · Vision · Web
  [ View Projects ]  [ Github ]
```

- **Background:** Canvas particle field (port from your existing portfolio — the one you already built).
- **Hero text:** Typed-in effect on `> Raskin Verma` only — one clean moment. Nothing else animates on load.
- **No big tagline paragraph** — recruiters skim, let the projects do the talking.

### 4.2 Project Cards (Mode 1)

**Layout:** 3-column grid. Each card: sharp left border accent, monospace project title, stack tags, short description, GitHub icon link.

---

#### Card 1 — GraphRAG Knowledge Portal & Timetable Algorithm

**Header:** `AEROTHON 2026 · 2ND PLACE NATIONALLY` (small badge, top-right)

**Visual (split card):**
- Left half: screenshot/mockup of the Next.js frontend — graph traversal UI, document relation viz
- Right half: Python terminal output snippet showing the constraint-satisfaction algorithm resolving conflicts

**Description:**
> Frontend architecture for a graph-native RAG system built with Next.js 15 and Neo4j, deployed at Aerothon 2026 — a national aerospace hackathon. Paired with a Python constraint-satisfaction engine that automates university scheduling: room allocations, faculty conflicts, and time slot assignment with no manual intervention.

**Stack tags:** `Next.js 15` `Neo4j` `Python` `Graph APIs` `Algorithm Design`

**Links:** GitHub (if public) · Live demo (if hosted)

---

#### Card 2 — Hand Gesture Controlled 3D Viewport

**Visual:** Short looping video clip — hand in frame, Blender viewport rotating in sync, landmark dots overlaid. If no video: a diagram showing the pipeline (Camera → MediaPipe → UDP → Blender Modal Operator).

**Description:**
> Real-time computer vision pipeline translating physical hand landmarks into 3D viewport controls. A non-blocking Blender modal operator receives quaternion rotation data over UDP sockets, with moving average smoothing and dead-zone filtering for stable, responsive control. No Blender UI interaction required.

**Stack tags:** `Python` `OpenCV` `MediaPipe` `UDP Sockets` `Quaternion Math` `Blender bpy`

**Links:** GitHub (raskinverma/blender-gesture-control)

---

#### Card 3 — Project ASCEND (ISRO IRoC-U 2026)

**Header:** `IROC-U 2026 · 4TH PLACE NATIONALLY` badge

**Visual:** SVG architecture diagram (build this in-code) showing:
```
[Camera] → [camera_stream pipeline] → [Coordinate Transform: Object→Drone Frame]
                                                    ↓
                               [2D Spatial Map]  [3D Spatial Map]
                                                    ↓
                                           [Data Logger] → [Nav Controller]
```

**Description:**
> Engineered the primary `camera_stream` pipeline and mathematical coordinate transformation layer (object-to-drone reference frames) for an autonomous quadcopter competing in ISRO's national robotics challenge. Developed real-time 2D and 3D spatial mapping architectures with coordinated data logging to enable accurate environment tracking.

**Stack tags:** `C++` `Python` `ROS` `Computer Vision` `Coordinate Systems` `Spatial Mapping`

---

#### Card 4 (Optional — confirm) — Body Motion Capture → Blender Armature

**Visual:** Side-by-side: webcam feed with MediaPipe pose skeleton overlay ↔ Blender viewport with Mixamo character mirroring the pose.

**Description:**
> Real-time body motion capture system using MediaPipe Pose Landmarker to drive a Mixamo character armature in Blender via `bpy`. Reuses the UDP socket bridge and non-blocking modal operator pattern from the gesture control project. Bone rotations are computed from 3D landmark deltas and applied per-frame without freezing Blender's main thread.

**Stack tags:** `Python` `MediaPipe` `Blender bpy` `UDP Sockets` `Armature Rigging`

---

#### Card 5 (Optional — confirm) — Armor (Hack2Future 2.0)

**Description:**
> Multilingual financial conversation intelligence app built for Hack2Future 2.0. Whisper-based speech-to-text via Groq, LLaMA for financial Q&A, Server-Sent Events for streaming responses. Flask backend, React/Vite frontend.

**Stack tags:** `Flask` `React` `Groq Whisper` `LLaMA` `SSE` `Multilingual NLP`

---

## 5. Mode 2 — 3D & Visualization

### 5.1 Hero (Mode 2)

- **Background:** Autoplaying muted loop — the Detail Empire CGI ad or the fluid simulation. Full-width, dark gradient overlay at bottom so text is legible.
- **Hero text (over video):**
```
3D · CGI · Hardware
Raskin Verma — Visual Engineering
```
- Syne typeface, large, left-aligned, positioned bottom-left of the video.

### 5.2 Project Cards (Mode 2)

Full-bleed editorial layout. Video/render at top, text below. Rounded corners.

---

#### Card 1 — Freelance CGI: Detail Empire & Commercial Work

**Visual:** Autoplaying video — the Detail Empire promo ad (muted, looping). On hover: subtle amber vignette glow on the border.

**Description:**
> Full CGI pipeline for a cinematic promotional advertisement for Detail Empire (Dubai), spanning concept to 4K delivery. Procedural environment generation, advanced PBR texturing, and physics-based fluid simulation for photorealistic product visuals. Also developed product visualizations and high-poly hard surface modeling for commercial clients including AL-QUWA.

**Stack tags:** `Blender` `Cycles` `Octane` `Procedural Modeling` `PBR Texturing` `Fluid Sim` `4K Rendering`

---

#### Card 2 — ASCEND Payload Integration (Hardware Prototyping)

**Visual:** Clean rotating render of the custom camera module and Jetson Nano mounts — modeled in Blender, rendered on white/dark studio HDRI.

**Description:**
> Custom 3D hardware mounts designed in Blender for the ASCEND quadcopter's camera modules and Jetson Nano edge-compute unit. Engineered for structural integrity under vibration, with cable routing slots and secure fastener placements for field deployment.

**Stack tags:** `Blender` `Hardware CAD` `3D Printing` `Payload Integration`

---

#### Card 3 (Optional — confirm) — Creative Renders: Island Scene, Subway, Rose Disintegration

**Visual:** A horizontal scroll strip of three stills — island dock scene, abandoned subway, rose Cell Fracture disintegration.

**Description:**
> Personal render work exploring procedural and simulation-based storytelling. The island scene uses geometry nodes for environment layout and custom water shaders. The abandoned subway resolves volumetric fog via Volume Scatter and overnight GPU rendering. The rose disintegration uses Cell Fracture with particle emission and volumetric lighting for a slow-motion destruction sequence.

**Stack tags:** `Blender` `Geometry Nodes` `Particles` `Cell Fracture` `Volume Scatter` `Cycles`

---

## 6. About Section

**Layout:** Two-column on desktop. Left: bio + skills matrix. Right: a portrait or a subtle render (your choice — a nice Blender render of something abstract works too).

### 6.1 Bio Copy

```
I'm a Computer Science undergraduate at IIIT Dharwad (Class of 2028, 9.44 CGPA) 
working across software systems, computer vision, and 3D visualization.

My work ranges from autonomous drone pipelines competing at the national level 
to commercial CGI for clients in Dubai — with the unifying thread being that 
I like building things where software and the physical world meet.
```

### 6.2 Skills Matrix

Not a boring list — group them by domain:

| Domain | Skills |
|--------|--------|
| Languages | C, C++, Python, SQL |
| Web | React, Next.js, Vite, Tailwind, FastAPI, Node.js |
| AI & Vision | OpenCV, MediaPipe, LLM Orchestration, RAG |
| 3D & Design | Blender (Geometry Nodes, Procedural, Rigging), KiCAD |
| Systems | ROS, UDP, Linux, Git |
| Hardware | PCB Design, Power Electronics basics |

### 6.3 Beyond Work (the "Multifaceted" section)

These go at the bottom of About — brief, human, no bullet points. Just a short paragraph:

```
Outside of builds: fingerstyle guitar (beginner-intermediate, right-hand focus), 
structured gym lifting (PPL split), and badminton with an interest in biomechanics. 
Currently fascinated by the overlap between quaternion math and how the body actually moves.
```

> **Note:** The last sentence is a genuine hook — it ties your CV/motion work to a physical interest. Worth keeping.

---

## 7. Certifications Strip

A subtle horizontal strip between Projects and About. Not a big section — just logos + names:

- Oracle Cloud Infrastructure 2025 AI Foundations Associate _(May 2026)_
- Introduction to Computer Vision and Image Processing — IBM/Coursera _(Aug 2026)_
- Discover the Art of Prompting — Google/Coursera _(May 2026)_

---

## 8. Footer

```
[ RASKIN VERMA ]
vermaraskin@gmail.com  ·  linkedin.com/in/raskin-verma  ·  github.com/raskinverma
Built with React · Blender · too much caffeine
```

No copyright year (you'll forget to update it). No "Made with ❤️" — keep it dry and precise.

---

## 9. Performance & Technical Checklist

- [ ] All videos: `<video autoplay muted loop playsinline>` with a `poster` still image as fallback
- [ ] Videos served as `.mp4` (H.264, compressed) — keep each under 8MB for fast load
- [ ] `loading="lazy"` on all below-fold images
- [ ] `prefers-reduced-motion` media query respected — disable particle field and skip typing animation
- [ ] Mobile breakpoints: top bar collapses, toggle accessible in menu, single-column cards
- [ ] Resume PDF link tested with `download` attribute — correct filename in the attribute
- [ ] GitHub links open in `target="_blank" rel="noopener noreferrer"`
- [ ] Deployed to GitHub Pages or Vercel (Vercel preferred for clean routing)
- [ ] `vite.config.js`: set `base` correctly for GitHub Pages if used

---

## 10. Build Order (Suggested Sequence)

1. **Setup** — Vite + React + Tailwind scaffold, `ModeContext`, CSS variables for both modes
2. **TopBar + Toggle** — the global chrome; test mode switching early
3. **Mode 1 Hero** — port particle canvas from existing portfolio, add typed text
4. **Mode 1 Project Cards** — static data layer first, then wire up
5. **SVG Architecture Diagram** for ASCEND (build in-code, not an image)
6. **Mode 2 Hero** — video background with gradient overlay
7. **Mode 2 Project Cards**
8. **About section** — bio, skills matrix, beyond-work paragraph
9. **Certifications strip + Footer**
10. **Mode transition animation** — the cross-fade + CSS variable swap
11. **Polish pass** — spacing, mobile, reduced-motion, video compression
12. **Deploy** — Vercel or GitHub Pages

---

## 11. What's Not on the Resume but Worth Considering

These are shipped projects from your history that don't appear on the resume. Flag them if you want to include:

| Project | What it is | Mode |
|---------|------------|------|
| **ProfessorAI** | RAG-based classroom platform — LangChain, ChromaDB, ChatGroq | Mode 1 |
| **Armor** | Multilingual financial voice app — Whisper, LLaMA, SSE streaming | Mode 1 |
| **ET AI Hackathon — Urban Air Quality** | 4-agent FastAPI + Next.js platform, Wokwi ESP32 edge node | Mode 1 |
| **Motion Capture → Blender Armature** | MediaPipe Pose → Mixamo rig via UDP bpy | Both modes |
| **Island Scene / Subway / Rose Renders** | Personal Blender render work | Mode 2 |

The resume is already lean. The portfolio doesn't need to match it exactly — it can go deeper.

---

## 12. Decisions Needed From You

> These are the only things blocking a build start:

1. Which optional cards do you want (Cards 4, 5, and the creative renders strip)?
2. Do you have video/render exports ready, or do we plan the layout with placeholder stills first?
3. Port the terminal interface from your existing portfolio, or fresh start?
4. Contact form or just links?
5. Deploy target: Vercel or GitHub Pages?

