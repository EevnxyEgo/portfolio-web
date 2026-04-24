# DESIGN SYSTEM — Electric Brutalism
> Referensi lengkap untuk semua keputusan visual dan motion di portfolio ini.
> Dibaca Claude Code saat mengerjakan komponen UI, animasi, atau styling.

---

## 🎯 KONSEP VISUAL

**Nama:** Electric Brutalism

**Filosofi:** Portfolio ini harus terasa seperti persilangan antara **Linear.app**
(precision engineering, dark, confident) dan **sebuah majalah desain Jepang yang
dicetak di atas kertas newsprint** (bold type, expressive layout, unapologetic).
Bukan template. Bukan Bootstrap clone. Ini harus terasa *dibangun oleh seseorang
yang benar-benar tahu apa yang dia lakukan*.

**Kata kunci:** Dark. Bold. Intelligent. Intentional. Unforgettable.

**Inspirasi referensi:**
- Linear.app — precision + dark theme
- Vercel.com — confident typography + negative space
- Awwwards SOTD winners — unexpected layout, motion
- Refactoring UI principles — hierarchy tanpa dekorasi berlebihan

---

## 🎨 COLOR SYSTEM

### CSS Variables (taruh di src/app/globals.css)

```css
:root {
  /* ── Primary — Electric Vermillion ────────────────────────── */
  --color-primary:        #E8330A;   /* hot red-orange, warna brand Arsenius */
  --color-primary-glow:   #FF4D1C;   /* lighter variant untuk glow effects */
  --color-primary-dark:   #B5260A;   /* darker untuk hover states */
  --color-primary-muted:  #2A0A02;   /* dark tint untuk subtle backgrounds */
  --color-primary-alpha:  rgba(232, 51, 10, 0.15); /* transparent overlay */

  /* ── Background — Near-Black System ───────────────────────── */
  --color-bg:             #080808;   /* root background */
  --color-bg-elevated:    #111111;   /* cards, panels, modals */
  --color-bg-subtle:      #1A1A1A;   /* hover state backgrounds */
  --color-bg-overlay:     rgba(8, 8, 8, 0.85); /* overlay/backdrop */

  /* ── Border ────────────────────────────────────────────────── */
  --color-border:         #222222;   /* default borders */
  --color-border-bright:  #333333;   /* active/focus borders */
  --color-border-primary: rgba(232, 51, 10, 0.4); /* primary-tinted border */

  /* ── Text ──────────────────────────────────────────────────── */
  --color-text-primary:   #F5F5F0;   /* main text, off-white (easier on eyes than pure white) */
  --color-text-secondary: #888888;   /* supporting text, labels */
  --color-text-tertiary:  #444444;   /* disabled, placeholder */
  --color-text-inverse:   #080808;   /* text on light backgrounds */

  /* ── Accent — Electric Cyan (ML/AI identity) ───────────────── */
  --color-accent:         #00D4FF;   /* cyan untuk AI/ML context */
  --color-accent-glow:    #00AACC;   /* darker cyan untuk glow */
  --color-accent-muted:   #001A22;   /* dark cyan backgrounds */
  --color-accent-alpha:   rgba(0, 212, 255, 0.15);

  /* ── Semantic ──────────────────────────────────────────────── */
  --color-success:        #22C55E;
  --color-warning:        #F59E0B;
  --color-error:          #EF4444;

  /* ── Gradients ─────────────────────────────────────────────── */
  --gradient-hero:     radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,51,10,0.25), transparent);
  --gradient-glow-red: radial-gradient(circle at center, rgba(232,51,10,0.2), transparent 60%);
  --gradient-glow-cyan:radial-gradient(circle at center, rgba(0,212,255,0.15), transparent 60%);
  --gradient-card:     linear-gradient(135deg, #111111 0%, #0D0D0D 100%);
  --gradient-shimmer:  linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);

  /* ── Shadows ────────────────────────────────────────────────── */
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.5);
  --shadow-md:    0 4px 16px rgba(0,0,0,0.6);
  --shadow-lg:    0 8px 32px rgba(0,0,0,0.7);
  --shadow-glow:  0 0 40px rgba(232,51,10,0.25);
  --shadow-glow-sm: 0 0 20px rgba(232,51,10,0.15);
  --shadow-cyan:  0 0 30px rgba(0,212,255,0.2);

  /* ── Spacing & Radius ───────────────────────────────────────── */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    20px;
  --radius-full:  9999px;

  /* ── Z-index Scale ──────────────────────────────────────────── */
  --z-below:      -1;
  --z-base:       0;
  --z-elevated:   10;
  --z-dropdown:   100;
  --z-sticky:     200;
  --z-overlay:    300;
  --z-modal:      400;
  --z-cursor:     9999;
}
```

---

## ✍️ TYPOGRAPHY SYSTEM

### Font Stack
```
Display/Hero   : "Bebas Neue"       — bold, condensed, maximum impact
                 Gunakan untuk: nama Arsenius, hero headline, section numbers
                 Size: 6rem–10rem pada desktop, 4rem–6rem mobile

Heading        : "Space Grotesk"    — technical, modern, authoritative
                 Gunakan untuk: section titles (H2), card titles (H3), nav links
                 Size: 2rem–3.5rem (H2), 1.25rem–1.75rem (H3)

Body           : "DM Sans"          — clean, friendly, high legibility
                 Gunakan untuk: paragraf, descriptions, semua text panjang
                 Size: 1rem (16px) base, line-height 1.6–1.7

Mono/Code      : "JetBrains Mono"   — untuk code snippets, tech labels, badges
                 Size: 0.875rem–1rem

Accent/Italic  : "Instrument Serif" italic — elegan, humanist
                 Gunakan untuk: quotes, section eyebrow labels, subtle accents
                 Size: 1rem–1.25rem
```

### next/font Setup (taruh di src/app/layout.tsx)
```typescript
import { Space_Grotesk, DM_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';

const bebasNeue = localFont({
  src: '../public/fonts/BebasNeue-Regular.woff2',
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
});
```

### Typography Scale (globals.css)
```css
/* Apply font variables */
body {
  font-family: var(--font-body), sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
}

.font-display  { font-family: var(--font-display), sans-serif; }
.font-heading  { font-family: var(--font-heading), sans-serif; }
.font-mono     { font-family: var(--font-mono), monospace; }
.font-accent   { font-family: var(--font-accent), serif; font-style: italic; }

/* Type scale */
.text-hero     { font-size: clamp(4rem, 10vw, 9rem); line-height: 0.92; letter-spacing: -0.02em; }
.text-display  { font-size: clamp(3rem, 7vw, 6rem);  line-height: 0.95; letter-spacing: -0.01em; }
.text-h1       { font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.1; }
.text-h2       { font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.2; }
.text-h3       { font-size: clamp(1.25rem, 2vw, 1.75rem); line-height: 1.3; }
.text-body-lg  { font-size: 1.125rem; line-height: 1.7; }
.text-body     { font-size: 1rem; line-height: 1.65; }
.text-sm       { font-size: 0.875rem; line-height: 1.6; }
.text-xs       { font-size: 0.75rem; line-height: 1.5; letter-spacing: 0.05em; }
.text-label    { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; }
```

---

## 🎬 MOTION SYSTEM

### Prinsip Animasi
1. **Purposeful** — setiap animasi punya alasan (guide attention, signal state, provide delight)
2. **Snappy tapi smooth** — durasi pendek (150–400ms) untuk responsiveness
3. **Stagger = rhythm** — elements muncul berurutan, bukan serentak
4. **Reduced motion respected** — semua animasi punya fallback

### Shared Variants (src/lib/animations.ts)
```typescript
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Untuk char-by-char text reveal
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

// Viewport trigger helper
export const viewportConfig = {
  once: true,
  margin: '-80px',
};
```

### Reduced Motion Pattern (WAJIB di setiap animated component)
```typescript
import { useReducedMotion } from 'framer-motion';

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? {} : fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {children}
    </motion.div>
  );
}
```

### Loading Screen Sequence
```
0ms     : Loading screen muncul (bg #080808)
0-800ms : SVG path "A" draw animation (stroke-dashoffset 0 → full length)
800ms   : "A" fill fade in (#E8330A)
1200ms  : Loading screen fade out (opacity 1 → 0, pointer-events none)
1500ms  : Site content mulai reveal
1500ms  : NoiseOverlay fade in
1600ms  : Hero headline chars reveal (stagger 0.04s per char)
2000ms  : Sub-tagline fade in + slide up
2300ms  : CTA buttons bounce in
2500ms  : 3D scene / hero visual fade in
```

### Scroll-driven Animations
```typescript
// Di HeroSection — parallax
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

// Di setiap Section — trigger on viewport entry
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  variants={staggerContainer}
>
```

---

## 🧩 COMPONENT SPECIFICATIONS

### Button Component (ui/Button.tsx)
```
Variants:
  primary   → bg #E8330A, white text, glow shadow on hover
  secondary → outlined, border #E8330A, transparent bg
  ghost     → no border, subtle hover bg

Sizes: sm | md | lg

Magnetic effect: cursor tracking dengan useMousePosition hook
  - Element moves max 8px mengikuti cursor saat di-hover
  - Smooth lerp dengan requestAnimationFrame

Glow effect: box-shadow 0 0 30px rgba(232,51,10,0.4) on hover
Loading state: spinner icon replaces text (untuk contact form)
```

### Card Component (ui/Card.tsx)
```
Variants:
  default  → bg #111111, border #222222, hover border #333333
  featured → bg #111111, border #E8330A/40, subtle red glow
  glass    → backdrop-blur, semi-transparent bg

Hover state:
  - border-color → --color-border-bright
  - transform: translateY(-4px)
  - transition: 200ms ease

Project card specifically:
  - Image dengan overflow hidden, hover scale 1.05
  - Gradient overlay on image bottom untuk text legibility
  - Tech stack icons fade in on hover (max 5, +N more)
```

### Badge Component (ui/Badge.tsx)
```
Variants:
  default   → #1A1A1A bg, #888 text, #333 border
  primary   → #2A0A02 bg, #E8330A text, #E8330A/30 border
  accent    → #001A22 bg, #00D4FF text, #00D4FF/30 border
  success   → dark green bg, green text
  
Usage: tech stack labels, category tags, status indicators
Font: JetBrains Mono, 0.75rem
```

### Navbar (layout/Navbar.tsx)
```
Default state:  transparent background
Scrolled state: backdrop-blur(20px) + bg rgba(8,8,8,0.8) + border-bottom 1px #222
Scroll behavior: hide on scroll DOWN (y: -80px), show on scroll UP (y: 0)
Active link:    layoutId animated underline slides between links on hover

Content:
  Left:  Logo "A." — Bebas Neue, 1.5rem, --color-primary
  Center: Nav links — Space Grotesk, 0.9rem, letter-spacing 0.02em
  Right:  "Hire Me" button (primary variant, sm size)

Mobile (<768px):
  Hamburger icon (3 lines → X animation)
  Full-screen overlay menu
  Links staggered entry (stagger 0.08s)
  Social links at bottom
```

### Custom Cursor (shared/CustomCursor.tsx)
```
Structure:
  - Outer ring: 32px circle, border 1px #E8330A/60, mix-blend-mode: difference
  - Inner dot: 6px circle, bg #E8330A, fill

Behavior:
  - Smooth lag: outer ring follows with lerp 0.12
  - Inner dot follows exactly (no lag)
  - Hover interactive elements: outer ring scale(2), opacity 0.6
  - Hover links/buttons: outer ring becomes filled, inner dot disappears
  - Click: brief scale(0.8) flash

Hide default cursor: cursor: none on body
Show only on desktop (useMediaQuery > 768px)
```

### NoiseOverlay (shared/NoiseOverlay.tsx)
```
Implementation: SVG feTurbulence filter over full viewport
Opacity: 0.035 (very subtle)
Position: fixed, z-index: var(--z-overlay), pointer-events: none
Blend mode: overlay

SVG:
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.035"/>
</svg>
```

---

## 📐 LAYOUT & SPACING

### Breakpoints
```
Mobile  : < 640px   → stack all, 16px horizontal padding
Tablet  : 640-1024px → 2 cols where applicable, 24px padding
Desktop : 1024-1280px → full layout, 32px padding
Wide    : > 1280px   → max-width 1440px, auto margins, 48px padding
```

### Section Spacing
```
Section padding vertical: clamp(5rem, 10vw, 8rem) top dan bottom
Section inner gap: 3rem–5rem between major elements
Grid gap: 1.5rem (mobile) → 2rem (tablet) → 2.5rem (desktop)
```

### Grid System
```
Homepage sections: max-width 1200px, centered, px-6 (mobile) → px-8 (desktop)
Project bento grid:
  - 1 col (mobile < 640px)
  - 2 col (tablet)
  - 3 col (desktop) dengan featured project spanning 2 cols

Skills section: flex-wrap orbital layout atau masonry
Experience: single column timeline, max-width 700px, centered
```

---

## 🖥️ SECTION-SPECIFIC SPECS

### Hero Section
```
Layout: full-viewport-height, flex, items-center
  Desktop: split — 55% text left, 45% visual right
  Mobile: stack — visual above text, or text only with bg visual

Text column:
  [Label]     : Instrument Serif italic, 0.9rem, --color-accent, letter-spacing 0.08em
                Text: "FULLSTACK DEVELOPER × ML ENGINEER"
  [Name]      : Bebas Neue, clamp(5rem, 10vw, 9rem), line-height 0.9
                "ARSENIUS\nAUDLEY" — two lines
  [Tagline]   : DM Sans, 1.1rem, --color-text-secondary, max-width 460px
                "Building intelligent systems at the intersection of
                 web, AI, and immersive technology."
  [CTAs]      : flex gap-4
                Primary: "View My Work" → #projects
                Secondary: "Download CV" → /cv.pdf
  [Socials]   : GitHub | LinkedIn | Email — icon only, 20px, gap-5

Visual column:
  Option A: R3F scene — rotating icosahedron + torus, wireframe style,
            responsive to mouse position, #E8330A lines
  Option B: CSS art — large circle gradient (#E8330A → transparent),
            Arsenius photo with desaturate → color-on-hover,
            overlapping geometric shapes

Background:
  var(--gradient-hero) — radial glow from top
  NoiseOverlay active
  Subtle animated grid pattern (CSS, very faint)
```

### Skills Section
```
Layout: tidak boleh list biasa. Gunakan salah satu:
  Option A: Kategori cards dalam grid 2-3 kolom, tiap card berisi skill badges
  Option B: Orbital/circular layout dengan kategori di tengah
  Option C: Horizontal scrollable lanes per kategori

Animasi: skills muncul dengan scale 0→1 stagger saat masuk viewport
Hover: badge glow sesuai warna kategori
```

### Projects Section (Bento Grid)
```
Grid structure desktop:
  [BAKI — featured, col-span-2]  [FitBuddy AI — featured, col-span-1]
  [Digital Twin — col-span-1]    [Healthylicious] [41-Card Game]

Featured card height: ~360px
Regular card height: ~280px

On hover (card):
  - image scale 1.05 (transition 300ms)
  - border: --color-border-bright
  - translateY(-4px)
  - tech stack icons slide up and appear

Project detail overlay on hover (optional):
  - Quick preview modal dengan AnimatePresence
  - Full detail di /projects/[slug]
```

### Experience Timeline
```
Layout: vertical line (2px, gradient #E8330A top → #444 bottom)
        entries di kanan dari line

Per entry:
  [Dot]     : 12px circle, bg #E8330A, ring 4px #E8330A/20
  [Year]    : JetBrains Mono, --color-accent, 0.875rem
  [Title]   : Space Grotesk bold, 1.1rem
  [Org]     : DM Sans, --color-text-secondary
  [Tags]    : optional, small badges untuk tech used

Animation: line draws dari atas ke bawah saat scroll (pathLength 0→1)
```

### Contact Section
```
Layout: 2-col desktop
  Left:  Large headline + social links + direct email
  Right: Form

Headline:
  "Let's Build\nSomething\nTogether." — Bebas Neue, 4rem

Form fields:
  Name, Email, Subject, Message (textarea)
  All inputs: bg #111, border #222, focus border #E8330A, radius 8px
  Submit: primary Button dengan loading state

Success state: form replaced dengan animated checkmark + "Message sent!"
Error state: inline error messages via Zod validation
```

---

## 🎭 3D SPECIFICATIONS (React Three Fiber)

### Kondisi Loading
```typescript
// WAJIB: Three.js hanya di desktop
const { isMobile } = useMediaQuery();

if (isMobile) {
  return <CSSFallbackVisual />; // pure CSS animation sebagai pengganti
}

return (
  <Suspense fallback={null}>
    <Canvas />
  </Suspense>
);
```

### ParticleField (hero background, desktop only)
```
Particles : 80–120 points, random positions dalam sphere radius 15
Color     : #E8330A particles (60%) + #00D4FF particles (40%)
Size      : 0.02–0.06 units, random
Movement  : slow rotation seluruh field + drift
Mouse     : subtle repulsion effect dari center
Performance: dispose geometry & material on unmount
```

### FloatingGeometry (hero visual atau About section)
```
Objects:
  - Icosahedron wireframe, radius 2, #E8330A, rotation
  - Torus wireframe, radius 1.5, tube 0.3, #00D4FF/60, counter-rotation
  - Small floating spheres, scattered

Lighting: ambient + point light di atas kiri (#E8330A tint)
Camera: PerspectiveCamera, fov 60, z: 8
Controls: NO OrbitControls — camera fixed, objects rotate
```

---

## ♿ ACCESSIBILITY REQUIREMENTS

```css
/* Focus visible — custom ring */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Checklist wajib:**
- Color contrast ≥ 4.5:1 untuk body text (verify dengan tools)
- Semua icon-only buttons punya `aria-label`
- Three.js canvas punya `role="img"` + `aria-label="Decorative 3D background"`
- Keyboard navigable: semua interactive elements bisa di-Tab
- Skip navigation link: `<a href="#main-content">Skip to main content</a>`
- `lang="en"` di root `<html>`
- `alt` text descriptive untuk semua `next/image`

---

## 📱 MOBILE-SPECIFIC RULES

```
Three.js     : DISABLED (ganti dengan CSS animation)
Custom cursor: DISABLED (touch device, tidak relevan)
Parallax     : DISABLED atau dikurangi drastis (performance)
Font sizes   : gunakan clamp() untuk semua display text
Touch targets: minimum 44×44px untuk semua interactive elements
Hover states : transform ke tap states
```

---

*File ini adalah source of truth untuk semua keputusan design.*
*Update sini jika ada perubahan design direction.*