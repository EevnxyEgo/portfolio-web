# Arsenius Audley Portfolio

Fullstack Developer & ML Engineer portfolio built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Animation**: Framer Motion v11
- **3D**: React Three Fiber + Drei
- **CMS**: Keystatic (file-based YAML)
- **Deploy**: Docker + Nginx + VPS

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── (site)/          # Public pages
│   │   ├── (keystatic)/     # CMS admin
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Page sections
│   │   ├── shared/          # Reusable components
│   │   └── ui/              # UI primitives
│   ├── content/
│   │   ├── projects/        # Project YAML files
│   │   └── certifications/  # Certification YAML files
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── docs/                    # Documentation
```

## Content Management

Projects and certifications are managed via YAML files in `src/content/`. Edit these files to update portfolio content.

### Add a Project

Create a new YAML file in `src/content/projects/`:
```yaml
title: Project Name
tagline: Short description
category: ml-ai
status: active
year: 2024
techStack:
  - React
  - Next.js
summary: >
  Full description here.
# ... more fields
```

### Add a Certification

Create a new YAML file in `src/content/certifications/`.

## Deployment

### Docker (Recommended)

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual Deploy

1. Build: `npm run build`
2. Copy `.next/standalone` to server
3. Run: `node server.js`

## Environment Variables

Copy `.env.production.example` to `.env.production` and configure:
- `RESEND_API_KEY` - For contact form email

## Validation

Before committing, run:
```bash
npm run validate  # tsc + lint + build
```

## License

MIT