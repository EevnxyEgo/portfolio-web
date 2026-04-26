# DESIGN SYSTEM — Warm Editorial
> Warm cream + Playfair italic serif + vermillion red + extreme border-radius
> Dibaca Claude Code saat mengerjakan komponen UI, animasi, atau styling.

---

## KONSEP VISUAL

**Nama:** Warm Editorial

**Filosofi:** Portfolio ini terasa seperti majalah yang dirancang oleh seseorang
yang bisa desain dan bisa koding — bold, confident, warm. Menghapus estetika
"Electric Brutalism" (cold dark, neon cyan, glow effects) dan menggantinya dengan
warm cream backgrounds, Playfair Display serif untuk editorial headings, dan
vermillion red sebagai accent tunggal.

**Kata kunci:** Warm. Editorial. Confident. Human. Rounded.

**Inspirasi referensi:**
- Bajgart — serif + sans inline mixing, enormous whitespace, minimal color
- Jackie Hu — warm cream, collage layout, handwritten personality
- Heexo — extreme border-radius, warm neutrals, paper-like texture

**Apa yang DIHAPUS:**
- ParticleField dan FloatingGeometry (no 3D in hero)
- Neon cyan (#00D4FF) sebagai accent
- Glow/bloom box-shadows
- Cold black (#080808) backgrounds
- Bebas Neue untuk semua section headings
- Ghost/echo text effects
- Electric Brutalism concept

**Apa yang DIAKTBATKAN:**
- Warm cream (#F7F3EE) sebagai base backgrounds
- Playfair Display serif untuk editorial headings + inline italic accents
- Extreme border-radius (28px–40px) pada semua cards
- Warm shadows tanpa colored glows
- Inline serif italic words dalam body text (Bajgart pattern)

---

## WARNA SISTEM

### CSS Variables (src/app/globals.css)

```css
/* Light theme */
:root, [data-theme="light"] {
  --color-bg:             #F7F3EE;  /* warm cream */
  --color-bg-elevated:    #EEE9E2;  /* card surfaces */
  --color-bg-subtle:       #E6E0D8;  /* hover states */

  --color-primary:        #E8330A;  /* vermillion — unchanged */
  --color-primary-glow:   #FF4D1C;
  --color-primary-dark:   #B5260A;
  --color-primary-muted: rgba(232, 51, 10, 0.08);

  /* Warm accents (replaces cold cyan) */
  --color-amber:        #D97706;  /* AI/ML */
  --color-amber-muted:  rgba(217, 119, 6, 0.10);
  --color-sage:         #4A7C59;  /* tools/devops */
  --color-sage-muted:  rgba(74, 124, 89, 0.10);
  --color-sky:          #2E78B5;  /* backend */
  --color-sky-muted:   rgba(46, 120, 181, 0.10);
  --color-blush:        #C2556A; /* 3D/creative */
  --color-blush-muted:  rgba(194, 85, 106, 0.10);

  --color-border:        #DDD8D0;  /* warm gray */
  --color-border-strong:  #C4BEB3;

  --color-text:           #1A1714;  /* warm near-black */
  --color-text-secondary: #6B6560;  /* warm medium */
  --color-text-tertiary:  #A8A29C;  /* warm light */

  --shadow-sm:   0 1px 3px rgba(26,23,20,0.06);
  --shadow-md:   0 4px 16px rgba(26,23,20,0.08);
  --shadow-lg:   0 8px 32px rgba(26,23,20,0.10);
  --shadow-card: 0 2px 8px rgba(26,23,20,0.07);

  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   20px;
  --radius-xl:   28px;
  --radius-2xl:  40px;
  --radius-full: 9999px;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg:             #141210;  /* warm brown-black */
  --color-bg-elevated:    #1C1917;
  --color-bg-subtle:       #242019;
  --color-text:            #F0EBE4;  /* warm off-white */
  --color-text-secondary:  #9A9390;
  --color-text-tertiary:   #5A5450;
  --color-border:          #2C2825;
  --color-border-strong:   #3C3733;
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.3);
  --shadow-md:   0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.5);
  --shadow-card: 0 2px 8px rgba(0,0,0,0.3);
}
```

---

## TYPOGRAPHY

```
Display/Hero   : Bebas Neue  — ONLY for hero name "ARSENIUS AUDLEY"
                 Size: clamp(5rem, 12vw, 10rem)

Heading        : Playfair Display — section titles, pull quotes
                 Style: mix normal + italic deliberately
                 Example: "Let's build <em>something</em> together."
                 Size: 2rem–3.5rem

Body           : DM Sans — semua text panjang, nav, UI labels
                 Weights: 400 regular, 500 medium, 600 semibold

Mono/Code      : JetBrains Mono — tech tags, labels
                 Size: 0.75rem–0.8rem
```

---

## ANIMASI

### Shared Variants (src/lib/animations.ts)

```typescript
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const viewportConfig = { once: true, margin: '-80px' };
```

---

## SECTION-SPECIFIC SPECS

### Navbar
- "A." logo — DM Sans 600, color primary
- Nav links — DM Sans 400, text-secondary, hover text-primary
- Theme toggle — sun/moon icon, rotate 180deg on toggle
- "Let's talk →" — plain text link, NOT button, primary color

### Hero
- Available indicator: JetBrains Mono + blinking sage dot
- Name: Bebas Neue clamp(5rem, 12vw, 10rem), "AUDLEY" indented
- Role: "Fullstack Developer &" + "ML Engineer" (Playfair italic, primary)
- CTA: text links with animated → arrows
- Background: warm atmosphere circle (400px, primary-muted, blur 80px)
- NO 3D, NO particles

### About
- 2-column: photo (40%) + bio (55%)
- Photo: rounded-xl, hover scale(1.02), status pill below
- Heading: Playfair Display "The human behind the code."

### Skills
- 2-column: header (sticky) + tag clouds
- Tags: pill-shaped, free-floating, NO cards
- Category accent colors on hover

### Projects
- Alternating horizontal cards
- border-radius: var(--radius-xl)
- hover: shadow-lg + translateY(-4px)
- Image: 45%, Content: 55%

### Experience
- Clean open timeline, NO cards
- Year: Bebas Neue, Dot: primary circle
- Single column, max-width 680px

### Certifications
- 3-column grid, filter tabs
- Card: border-radius var(--radius-xl)

### Contact
- 2-column: headline (45%) + form (55%)
- Headline: Playfair Display with italic word
- Submit: pill button (border-radius-full)

---

## ANTI-PATTERNS

```
❌ Hardcode hex colors — always use CSS variables
❌ Bebas Neue outside hero name
❌ Cold black (#080808) backgrounds
❌ Neon cyan (#00D4FF) accent
❌ Glow box-shadows
❌ Uppercase Bebas Neue section headings
❌ 3D in hero
❌ Magnetic button effects on warm editorial buttons
```
