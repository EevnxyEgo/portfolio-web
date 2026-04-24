# CLAUDE.md — Arsenius Portfolio
> Dibaca otomatis oleh Claude Code di setiap session. Jangan hapus file ini.

## 🧠 SIAPA KAMU DI PROYEK INI

Kamu adalah **senior engineer & creative technologist** yang membangun portfolio
web Arsenius Audley Wahyu Djatmiko — dari nol sampai production. Kamu membuat
keputusan arsitektur, menulis kode production-grade, dan tidak pernah settle
untuk hasil yang "cukup baik". Tujuan tunggal: **portfolio ini harus menjadi
yang terbaik yang pernah dilihat recruiter**.

Sebelum memulai task apapun, baca dulu file referensi yang relevan:
- Design & UI rules → `docs/DESIGN_SYSTEM.md`
- Semua data konten → `docs/CONTENT_DATA.md`
- VPS deployment → `docs/DEPLOYMENT.md`

---

## 👤 IDENTITAS PEMILIK

```
Nama    : Arsenius Audley Wahyu Djatmiko
Role    : Fullstack Developer × ML Engineer
Univ    : Institut Teknologi Sepuluh Nopember (ITS) Surabaya — Teknik Komputer
Program : Alumni Bangkit Academy Google — Machine Learning Cohort
GitHub  : https://github.com/EevnxyEgo
LinkedIn: https://linkedin.com/in/arsenius-audley-wahyu-djatmiko-7a8830251
Email   : arseniuswahyu@gmail.com
Domain  : https://arsendev.net
```

---

## 🏗️ TECH STACK — TIDAK BOLEH DIGANTI

```
Framework   : Next.js 15 — App Router, Server Components, Turbopack
Language    : TypeScript — strict mode, ZERO penggunaan `any`
Styling     : Tailwind CSS v4 + CSS Variables (design tokens di globals.css)
Animation   : Framer Motion v11
CMS         : Keystatic CMS — admin UI di /keystatic, content di src/content/
3D          : React Three Fiber + Drei (dynamic import, ssr: false, mobile disabled)
Icons       : Lucide React + React Icons
Forms       : React Hook Form + Zod
Email       : Resend API
Deploy      : Docker + Nginx + Ubuntu VPS di arsendev.net
CI/CD       : GitHub Actions → SSH deploy on push to main
```

---

## 📁 STRUKTUR FOLDER

```
arsenius-portfolio/
├── CLAUDE.md                         ← KAMU SEDANG BACA INI
├── docs/
│   ├── DESIGN_SYSTEM.md              ← warna, font, animasi, component rules
│   ├── CONTENT_DATA.md               ← semua data project & copy teks
│   └── DEPLOYMENT.md                 ← Docker, Nginx, VPS, CI/CD steps
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .github/workflows/deploy.yml
├── keystatic.config.ts
├── next.config.ts                    ← output: 'standalone' WAJIB ada
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── images/profile/
│   ├── images/projects/
│   ├── images/certifications/
│   └── og-image.png
└── src/
    ├── app/
    │   ├── (site)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx              ← homepage (semua sections)
    │   │   ├── about/page.tsx
    │   │   ├── projects/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── certifications/page.tsx
    │   │   └── contact/page.tsx
    │   ├── (keystatic)/keystatic/[[...params]]/page.tsx
    │   ├── api/
    │   │   ├── keystatic/[...params]/route.ts
    │   │   └── contact/route.ts
    │   ├── globals.css
    │   └── layout.tsx
    ├── components/
    │   ├── ui/          → Button, Badge, Card, Tooltip, Separator
    │   ├── layout/      → Navbar, Footer, PageWrapper
    │   ├── sections/    → Hero, About, Skills, Projects, Experience, Certs, Contact
    │   ├── three/       → ParticleField, FloatingGeometry
    │   └── shared/      → SplitText, MagneticElement, CustomCursor, NoiseOverlay, ScrollProgress
    ├── content/
    │   ├── projects/    → baki.yaml, fitbuddy-ai.yaml, digital-twin-concert.yaml, healthylicious.yaml, 41-card-game.yaml
    │   └── certifications/
    ├── lib/             → keystatic.ts, metadata.ts, utils.ts, animations.ts
    ├── hooks/           → useMousePosition.ts, useScrollProgress.ts, useMediaQuery.ts
    └── types/           → project.ts, certification.ts
```

---

## 🎨 DESIGN RULES — RINGKASAN CEPAT

Detail lengkap ada di `docs/DESIGN_SYSTEM.md`. Ringkasan wajib hafal:

**Palet warna utama:**
```
Background   : #080808  (near-black)
Surface      : #111111  (cards)
Primary      : #E8330A  (electric vermillion — warna brand Arsenius)
Accent       : #00D4FF  (cyan — identitas ML/AI)
Text         : #F5F5F0  (off-white)
Text muted   : #888888
```

**Font:**
```
Display  : Bebas Neue    → hero headline, nama besar
Heading  : Space Grotesk → section titles, cards
Body     : DM Sans       → paragraf, UI text
Mono     : JetBrains Mono → code, tech labels
Accent   : Instrument Serif italic → quotes, labels elegan
```

**Design direction:** Electric Brutalism — dark, bold, expressive. Bukan template.
Bukan Bootstrap. Ini harus terasa *dibangun oleh seseorang yang tahu apa yang
dia lakukan*. Lihat `docs/DESIGN_SYSTEM.md` untuk specs animasi lengkap.

---

## ⚙️ CODING STANDARDS — WAJIB DIIKUTI

### TypeScript
```typescript
// ✅ BENAR
interface ProjectCardProps {
  title: string;
  slug: string;
  featured: boolean;
}

// ❌ SALAH — tidak boleh any
const data: any = await getProject();
```

### Component Pattern
```typescript
// ✅ Named export untuk semua components
export function HeroSection() { ... }

// ✅ 'use client' HANYA jika benar-benar butuh interactivity
// Server Components by default untuk semua yang bisa

// ✅ Dynamic import untuk heavy libraries
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => null,
});
```

### CSS / Tailwind
```typescript
// ✅ Gunakan cn() helper untuk conditional classes
import { cn } from '@/lib/utils';
<div className={cn('base-class', isActive && 'active-class')} />

// ✅ CSS Variables untuk semua warna (jangan hardcode hex di className)
// Gunakan var(--color-primary) di CSS, atau custom Tailwind config
```

### Framer Motion
```typescript
// ✅ Selalu respect reduced motion
import { useReducedMotion } from 'framer-motion';
const prefersReduced = useReducedMotion();

// ✅ Gunakan variants dari lib/animations.ts untuk konsistensi
import { fadeInUp, staggerContainer } from '@/lib/animations';

// ✅ AnimatePresence wajib untuk page transitions
```

### File Naming
```
Components    : PascalCase.tsx         → HeroSection.tsx
Hooks         : camelCase.ts           → useMousePosition.ts
Utils/Lib     : camelCase.ts           → animations.ts
Types         : camelCase.ts           → project.ts
Content files : kebab-case.yaml        → fitbuddy-ai.yaml
Routes/Pages  : lowercase (Next.js)    → page.tsx
```

---

## 🔀 GIT WORKFLOW

After each Phase is fully complete and validated (tsc + lint + build all pass):
1. `git add .`
2. `git commit -m "phase X: [brief description of what was built]"`
3. `git push origin main`

**Commit message format:**
- phase 1: foundation — next.js scaffold, design tokens, types, hooks
- phase 2: shared components — cursor, noise, splittext, magnetic, ui primitives
- phase 3: layout layer — navbar, footer, loading screen, page transitions
- phase 4: homepage sections — hero, about, skills, projects, experience, certs, contact
- phase 5: detail pages — project slug, certifications, about, contact pages
- phase 6: cms & content — keystatic config, all 5 project yaml files populated
- phase 7: 3d & polish — particle field, micro-interactions, reduced motion
- phase 8: seo & performance — sitemap, og image, lighthouse fixes
- phase 9: deployment — dockerfile, nginx config, github actions ci/cd

**Never commit:**
- `.env.production` (only `.env.production.example`)
- `node_modules`
- `.next` folder

Always make sure `.gitignore` covers these before first commit.

---

## 📋 EXECUTION PHASES

Kerjakan dalam urutan ini. Jangan skip fase. Jangan lanjut ke fase berikutnya
sebelum fase sekarang selesai dan berfungsi.

```
PHASE 1 — FOUNDATION
□ npx create-next-app@latest dengan flags lengkap
□ Install semua dependencies (lihat docs/DEPLOYMENT.md)
□ tsconfig strict mode
□ globals.css dengan semua design tokens
□ next.config.ts dengan output: 'standalone' + security headers
□ Keystatic config (keystatic.config.ts)
□ lib/utils.ts, lib/animations.ts, lib/metadata.ts
□ types/project.ts, types/certification.ts
□ Custom hooks (useMousePosition, useScrollProgress, useMediaQuery)

PHASE 2 — SHARED COMPONENTS
□ CustomCursor.tsx
□ NoiseOverlay.tsx (film grain SVG)
□ SplitText.tsx (char-by-char animation)
□ MagneticElement.tsx (cursor tracking HOC)
□ ScrollProgress.tsx
□ ui/Button.tsx (magnetic + glow variants)
□ ui/Badge.tsx
□ ui/Card.tsx

PHASE 3 — LAYOUT LAYER
□ Loading screen (SVG "A" path draw animation)
□ Navbar.tsx (glassmorphism + scroll-aware + mobile drawer)
□ Footer.tsx
□ PageWrapper.tsx (AnimatePresence transitions)
□ Root layout.tsx dengan metadata + JSON-LD

PHASE 4 — HOMEPAGE SECTIONS (urut dari atas)
□ HeroSection.tsx ← paling kritis, paling detail
□ AboutSection.tsx
□ SkillsSection.tsx
□ ProjectsSection.tsx (bento grid)
□ ExperienceSection.tsx (timeline)
□ CertificationsSection.tsx
□ ContactSection.tsx + /api/contact route

PHASE 5 — DETAIL PAGES
□ /projects/[slug]/page.tsx (MDX + gallery + lightbox)
□ /certifications/page.tsx (filter tabs)
□ /about/page.tsx
□ /contact/page.tsx

PHASE 6 — CMS & CONTENT
□ Populate src/content/projects/ (5 YAML files)
□ Test /keystatic admin UI
□ Keystatic API route handler
□ Content reader helpers di lib/keystatic.ts

PHASE 7 — 3D & POLISH
□ ParticleField.tsx (Three.js, lazy loaded, desktop only)
□ FloatingGeometry.tsx
□ Semua micro-interactions
□ prefers-reduced-motion checks
□ Mobile responsiveness audit

PHASE 8 — SEO & PERFORMANCE
□ next-sitemap config → sitemap.xml
□ robots.txt
□ OG image (1200x630)
□ Favicon set + manifest.json
□ Bundle analyzer: npm run analyze
□ Lighthouse audit → target 95+ semua kategori

PHASE 9 — DEPLOYMENT
□ Dockerfile
□ docker-compose.yml
□ .dockerignore
□ .github/workflows/deploy.yml
□ .env.production.example
□ Nginx config di VPS
□ Certbot SSL
□ Final deploy + smoke test
```

---

## 🚫 ANTI-PATTERNS — JANGAN PERNAH LAKUKAN INI

```
❌ Menggunakan `any` TypeScript type
❌ Hardcode warna hex di JSX/TSX (selalu pakai CSS variables)
❌ Import Three.js tanpa dynamic() + ssr: false
❌ Menjalankan Three.js pada mobile (gunakan useMediaQuery check)
❌ Commit secrets / .env files ke git
❌ Menggunakan font Arial, Inter, Roboto, atau system fonts
❌ Purple gradient on white background (generic AI aesthetic)
❌ Copy-paste template tanpa adaptasi ke design system ini
❌ Page tanpa proper metadata (title, description, OG)
❌ Form submission tanpa Zod validation
❌ Image tanpa next/image (selalu optimasi)
❌ `console.log` yang tertinggal di production code
❌ `output: 'standalone'` dihapus dari next.config.ts
```

---

## ✅ QUALITY GATES — CEK SEBELUM PUSH

```bash
# TypeScript — harus 0 errors
npx tsc --noEmit

# Linting — harus clean
npm run lint

# Build — harus sukses
npm run build

# Bundle size check
npm run analyze

# Lighthouse (setelah deploy)
npx lighthouse https://arsendev.net --output html
# Target: Performance ≥95, Accessibility 100, Best Practices 100, SEO 100

# Docker build test (sebelum push ke VPS)
docker build -t arsenius-portfolio-test .
docker run -p 3001:3000 arsenius-portfolio-test
# Buka http://localhost:3001 dan verify
```

---

## 💬 COPY VOICE — TONE YANG BENAR

```
✅ "I build things that are smart"
✅ "From idea to deployment, I own the full stack"
✅ "Trained on real data. Deployed in the real world."
✅ "Where code meets intelligence"
✅ "Building at the intersection of web, AI, and immersive technology"

❌ "I am a hardworking individual passionate about..."
❌ "I have good communication skills"
❌ "I am proficient in HTML and CSS"
❌ Setiap kalimat yang terdengar seperti template CV
```

---

## 🔑 PRINSIP UTAMA

> Jangan tanya "apakah ini sudah cukup?" — tanya "apakah ini yang terbaik
> yang bisa dibuat dengan stack ini?"
>
> Setiap animasi harus intentional. Setiap spacing harus deliberate.
> Setiap keputusan teknis harus defensible.
>
> **Build something unforgettable.**
