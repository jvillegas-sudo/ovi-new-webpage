# OVI Ventures — World-Class Digital Experience

> Industrial Biotechnology & Cleaning Technology — Built for the next 10 years.

A cinematic digital experience comparable to Apple, Tesla, Stripe and SpaceX, built for OVI Ventures using the most modern enterprise architecture available.

---

## Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework — App Router, RSC, streaming |
| **React 19** | UI library — concurrent rendering |
| **TypeScript** | Strict type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Three.js + R3F** | 3D experiences |
| **GSAP** | Scroll-triggered animations, timelines |
| **Framer Motion** | Component-level animations |
| **Lenis** | Smooth scroll |
| **Zustand** | Global state management |
| **React Hook Form + Zod** | Forms + validation |
| **CVA** | Type-safe component variants |
| **Vercel** | Deployment |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (providers, nav, footer)
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + CSS variables
│
├── components/
│   ├── ui/                # Atomic UI components (Button, Card, Modal, etc.)
│   └── layout/            # Layout organisms (Navbar, Footer)
│
├── features/              # Feature-based modules (future: hero, solutions, etc.)
├── hooks/                 # Reusable React hooks
├── providers/             # React context providers (Lenis, etc.)
├── services/              # API / data fetching layer
├── lib/                   # Utility libraries (metadata builder, etc.)
│
├── config/
│   ├── site.ts            # Site-wide configuration (nav, footer, SEO)
│   └── tokens/            # Design tokens (colors, spacing, typography, etc.)
│
├── styles/                # Additional style modules
├── types/                 # Global TypeScript types
├── utils/                 # Pure utility functions (cn, format, etc.)
├── animations/            # Framer Motion variants + GSAP utilities
│
├── three/
│   ├── components/        # R3F scene components (Canvas, PostProcessing, etc.)
│   ├── scenes/            # Full scene compositions
│   ├── shaders/           # GLSL shader files
│   └── utils/             # Three.js helpers (performance, etc.)
│
├── store/                 # Zustand stores
└── assets/                # Static assets (fonts, images, icons, 3D models)
```

---

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run type-check   # Run TypeScript compiler check
```

---

## Design System

### Colors
- **Primary**: `#00C4FF` — Electric cyan (OVI signature)
- **Secondary**: `#0047AB` — Cobalt blue (trust & technology)
- **Accent**: `#00FF85` — Bio-green (nature meets science)
- **Background**: `#050508` — Near-black (cinematic depth)

All colors available as CSS custom properties: `var(--color-brand-primary)`, etc.

### Typography
- Fluid type scale using `clamp()` — no media query jumps
- Body: System font stack (Inter in production)
- Display: SF Pro Display / system UI fallback

### Animation Language
- **Entrance**: `cinema` easing `[0.16, 1, 0.3, 1]` — smooth deceleration
- **Exit**: `sharp` easing `[0.4, 0, 0.6, 1]` — fast, decisive
- **Interactive**: Spring physics for buttons and hover states
- **Scroll**: GSAP ScrollTrigger integrated with Lenis

---

## Architecture Decisions

### Why App Router?
Server Components by default = zero client-side JS for static content. Only interactive components are client components.

### Why Zustand over Context?
Minimal re-renders. Components subscribe only to the exact state they need.

### Why CVA?
Type-safe component variants with IntelliSense. Every variant is typed, validated, and tree-shakeable.

### Why Lenis + GSAP?
Industry standard for cinematic scroll. Lenis normalises scroll across devices; GSAP ScrollTrigger handles all scroll-linked animations.

### Dark-first design
OVI operates in industrial/scientific domains where dark interfaces reduce eye strain. Dark-first also enables better Three.js integration (no white flash).

---

## Next Steps

The foundation is complete. The next phase is building the Home page with:
- Hero section (Three.js 3D scene)
- Solutions section
- Technology section
- About section
- Contact section

Wait for the next instruction before building page content.
