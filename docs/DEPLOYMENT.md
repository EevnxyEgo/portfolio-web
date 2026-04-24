# DEPLOYMENT GUIDE — VPS + Docker + Nginx + GitHub Actions
> Step-by-step deployment setup untuk arsendev.net
> VPS: Ubuntu 22.04/24.04 | DNS: Biznet Neo | SSL: Let's Encrypt

---

## 📋 OVERVIEW ARSITEKTUR

```
Internet
    ↓ HTTPS (443)
Biznet Neo DNS (arsendev.net → VPS IP)
    ↓
VPS Ubuntu 22.04
  └── Nginx (reverse proxy, SSL termination, gzip, rate limiting)
        ↓ HTTP (127.0.0.1:3000)
      Docker Container: arsenius-portfolio
        └── Next.js 15 (standalone output)
              └── Reads: src/content/ (mounted volume)
              └── Reads: public/images/ (mounted volume)

CI/CD:
  GitHub (push to main)
    → GitHub Actions
      → SSH to VPS
        → git pull + docker compose rebuild + container restart
```

---

## 📦 FULL DEPENDENCY INSTALL

```bash
# Di local machine sebelum mulai ngoding:

# Create Next.js app
npx create-next-app@latest arsenius-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"

cd arsenius-portfolio

# Core dependencies
npm install framer-motion @keystatic/core @keystatic/next

# 3D
npm install three @react-three/fiber @react-three/drei

# UI
npm install lucide-react react-icons clsx tailwind-merge

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# MDX (untuk project descriptions)
npm install @next/mdx @mdx-js/loader @mdx-js/react

# Fonts
npm install @fontsource/space-grotesk @fontsource/dm-sans \
            @fontsource/jetbrains-mono @fontsource/instrument-serif

# Analytics (tetap pakai Vercel Analytics — free & works anywhere)
npm install @vercel/analytics @vercel/speed-insights

# SEO
npm install next-sitemap schema-dts

# Dev dependencies
npm install -D @types/three prettier eslint-config-prettier \
               husky lint-staged \
               @playwright/test vitest @vitejs/plugin-react jsdom \
               @next/bundle-analyzer

# Setup husky
npx husky init
echo "npm run lint && npx tsc --noEmit" > .husky/pre-commit
```

---

## 🐳 DOCKER SETUP

### Dockerfile (root project)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Dependencies ─────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Builder ───────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://arsendev.net
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Runner (production) ───────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### docker-compose.yml (root project)

```yaml
# docker-compose.yml
version: '3.8'

services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_SITE_URL: https://arsendev.net
    container_name: arsenius-portfolio
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://arsendev.net
      - RESEND_API_KEY=${RESEND_API_KEY}
      - KEYSTATIC_SECRET=${KEYSTATIC_SECRET}
    volumes:
      # PENTING: mount content & images agar persist saat container restart
      - ./src/content:/app/src/content
      - ./public/images:/app/public/images
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - portfolio-net

networks:
  portfolio-net:
    driver: bridge
```

### .dockerignore (root project)

```
.git
.github
.next
node_modules
.env*
!.env.production.example
*.md
!README.md
.husky
coverage
.playwright
__tests__
*.test.ts
*.spec.ts
Dockerfile*
docker-compose*
.dockerignore
docs/
CLAUDE.md
```

### .env.production.example (commit ini, bukan .env.production aslinya)

```bash
# .env.production.example
# Copy ke .env.production di VPS dan isi nilainya

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
KEYSTATIC_SECRET=your-super-secret-minimum-32-chars

# Auto-set via docker-compose, tapi bisa override di sini
NEXT_PUBLIC_SITE_URL=https://arsendev.net
```

---

## ⚙️ NEXT.CONFIG.TS (WAJIB output: standalone)

```typescript
// next.config.ts
import type { NextConfig } from 'next';
import { withKeyStatic } from '@keystatic/next/config';

const nextConfig: NextConfig = {
  output: 'standalone',   // ← WAJIB untuk Docker
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default withKeyStatic(nextConfig);
```

---

## 🖥️ VPS SETUP (jalankan via SSH ke VPS)

### Step 1 — Prepare VPS

```bash
# SSH ke VPS
ssh ubuntu@YOUR_VPS_IP

# Update
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
docker --version   # verify

# Install Docker Compose v2
sudo apt install docker-compose-plugin -y
docker compose version   # verify: Docker Compose version v2.x.x

# Install Nginx + Certbot
sudo apt install nginx certbot python3-certbot-nginx -y

# Install Node.js 20 (optional, untuk debugging)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Setup project directory
sudo mkdir -p /var/www/arsenius-portfolio
sudo chown $USER:$USER /var/www/arsenius-portfolio
```

### Step 2 — Setup SSH Key untuk GitHub Actions

```bash
# Di VPS — generate deploy key
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""

# Tambahkan public key ke authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Copy private key — ini yang dimasukkan ke GitHub Secret
cat ~/.ssh/github_deploy
# Copy SEMUA output (termasuk -----BEGIN dan END-----)
```

### Step 3 — Clone & Initial Setup

```bash
cd /var/www/arsenius-portfolio

# Clone repo
git clone https://github.com/EevnxyEgo/arsenius-portfolio.git .

# Create .env.production dengan secrets asli
cp .env.production.example .env.production
nano .env.production
# Isi:
# RESEND_API_KEY=re_xxxx (dari resend.com — free plan cukup)
# KEYSTATIC_SECRET=$(openssl rand -base64 32)  ← generate dengan ini

# Simpan dan build
docker compose --env-file .env.production up -d --build

# Cek status
docker compose ps
docker compose logs portfolio --tail=50
```

---

## 🌐 NGINX CONFIGURATION

```bash
# Buat config
sudo nano /etc/nginx/sites-available/arsendev.net
```

```nginx
# /etc/nginx/sites-available/arsendev.net

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=site:10m rate=60r/m;
limit_req_zone $binary_remote_addr zone=api:10m  rate=15r/m;

# ── HTTP → HTTPS redirect ────────────────────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name arsendev.net www.arsendev.net;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://arsendev.net$request_uri;
    }
}

# ── www → non-www redirect ──────────────────────────────────
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.arsendev.net;

    ssl_certificate     /etc/letsencrypt/live/arsendev.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arsendev.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://arsendev.net$request_uri;
}

# ── Main HTTPS server ────────────────────────────────────────
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name arsendev.net;

    ssl_certificate     /etc/letsencrypt/live/arsendev.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arsendev.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Logs
    access_log /var/log/nginx/arsendev.access.log;
    error_log  /var/log/nginx/arsendev.error.log warn;

    # Performance
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain text/css text/xml application/json
        application/javascript application/rss+xml
        application/atom+xml image/svg+xml font/woff2;

    # Security headers
    add_header X-Frame-Options            "DENY"                       always;
    add_header X-Content-Type-Options     "nosniff"                   always;
    add_header Referrer-Policy            "origin-when-cross-origin"  always;
    add_header Strict-Transport-Security  "max-age=63072000; includeSubDomains; preload" always;
    add_header Permissions-Policy         "camera=(), microphone=(), geolocation=()" always;

    # Static assets — long cache
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
        proxy_cache_valid 200 365d;
    }

    location /images/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=86400";
    }

    location /fonts/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Keystatic CMS admin
    # Opsional: restrict akses by IP untuk keamanan ekstra
    # location /keystatic {
    #     allow YOUR_HOME_IP/32;
    #     deny all;
    #     proxy_pass http://127.0.0.1:3000;
    # }

    # API endpoints — rate limited
    location /api/ {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Main app
    location / {
        limit_req zone=site burst=30 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        'upgrade';
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass                 $http_upgrade;
        proxy_read_timeout                 60s;
        proxy_connect_timeout              10s;
    }
}
```

```bash
# Aktifkan site
sudo ln -s /etc/nginx/sites-available/arsendev.net /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # hapus default site

# Test config
sudo nginx -t
# Output harus: "syntax is ok" dan "test is successful"

sudo systemctl reload nginx
```

---

## 🔒 SSL — LET'S ENCRYPT

```bash
# PENTING: Pastikan dulu DNS arsendev.net sudah pointing ke IP VPS
# Cek: dig arsendev.net +short → harus return IP VPS kamu

# Issue SSL certificate
sudo certbot --nginx \
  -d arsendev.net \
  -d www.arsendev.net \
  --non-interactive \
  --agree-tos \
  --email arseniuswahyu@gmail.com \
  --redirect

# Test auto-renewal
sudo certbot renew --dry-run
# Output harus: "Congratulations, all simulated renewals succeeded"

# Verifikasi cron job renewal aktif
sudo systemctl status certbot.timer
# Certbot auto-renew berjalan 2x sehari, renew jika < 30 hari sebelum expire
```

---

## 🔄 CI/CD — GITHUB ACTIONS

### .github/workflows/deploy.yml

```yaml
name: 🚀 Deploy to arsendev.net

on:
  push:
    branches: [main]
  workflow_dispatch:   # allow manual trigger dari GitHub UI

jobs:
  deploy:
    name: Deploy to VPS
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: 🔑 Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: 22
          timeout: 120s
          script: |
            set -e   # exit on any error

            echo "📦 Pulling latest code..."
            cd /var/www/arsenius-portfolio
            git pull origin main

            echo "🐳 Building Docker image..."
            docker compose --env-file .env.production build --no-cache

            echo "🔄 Restarting container..."
            docker compose --env-file .env.production up -d --force-recreate

            echo "🧹 Cleaning up old images..."
            docker image prune -f

            echo "✅ Health check..."
            sleep 10
            curl -sf http://localhost:3000 > /dev/null && echo "Site is UP!" || echo "WARNING: Health check failed"

            echo "🎉 Deploy complete: $(date '+%Y-%m-%d %H:%M:%S')"
```

### Setup GitHub Secrets

Di GitHub repo → Settings → Secrets and variables → Actions → New secret:

```
VPS_HOST    = [IP address VPS kamu]
VPS_USER    = ubuntu
VPS_SSH_KEY = [isi dengan output: cat ~/.ssh/github_deploy dari VPS]
```

---

## 📊 MONITORING & MAINTENANCE

### Daily commands yang berguna

```bash
# Cek status semua container
docker compose ps

# Real-time logs
docker compose logs -f portfolio

# Nginx access log (live)
sudo tail -f /var/log/nginx/arsendev.access.log

# Nginx error log
sudo tail -f /var/log/nginx/arsendev.error.log

# Cek SSL expiry
sudo certbot certificates

# Disk usage (penting di VPS!)
df -h
docker system df
docker image prune -f   # cleanup unused images

# Container resource usage
docker stats arsenius-portfolio

# Manual deploy tanpa GitHub Actions
cd /var/www/arsenius-portfolio
git pull && docker compose --env-file .env.production up -d --build && docker image prune -f

# Restart nginx
sudo systemctl restart nginx

# Restart container tanpa rebuild
docker compose restart portfolio
```

### Backup content (jalankan periodic dari VPS)

```bash
# Backup CMS content files (schedule ini via cron)
#!/bin/bash
BACKUP_DIR="/var/backups/arsenius-portfolio"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/content_$DATE.tar.gz" \
    /var/www/arsenius-portfolio/src/content \
    /var/www/arsenius-portfolio/public/images
# Keep last 30 backups
ls -t "$BACKUP_DIR"/*.tar.gz | tail -n +31 | xargs rm -f 2>/dev/null || true
echo "Backup complete: content_$DATE.tar.gz"
```

```bash
# Setup cron (run backup setiap malam jam 2):
crontab -e
# Tambahkan:
0 2 * * * /var/www/arsenius-portfolio/scripts/backup.sh >> /var/log/backup.log 2>&1
```

---

## ⚡ PERFORMANCE AUDIT (POST-DEPLOY)

```bash
# Install Lighthouse jika belum
npm install -g lighthouse

# Run audit
npx lighthouse https://arsendev.net \
  --output html \
  --output-path ./reports/lighthouse-$(date +%Y%m%d).html \
  --chrome-flags="--headless --no-sandbox"

# Target scores:
# Performance   ≥ 95
# Accessibility = 100
# Best Practices = 100
# SEO           = 100

# Site-wide audit (semua pages)
npx unlighthouse --site https://arsendev.net
```

---

## 🎯 DEPLOYMENT QUALITY CHECKLIST

Jangan anggap deployment selesai sampai semua ini ✅:

```
Infrastructure:
□ docker compose ps → container status: Up
□ https://arsendev.net → loads correctly
□ https://www.arsendev.net → redirects to arsendev.net
□ http://arsendev.net → redirects to https://
□ SSL certificate valid (lock icon di browser)
□ sudo certbot renew --dry-run → success

Functionality:
□ Homepage loads — semua sections visible
□ Navigation links work
□ /projects → project grid loads
□ /projects/[slug] → individual project page works
□ /certifications → filter tabs work
□ /contact → form submits successfully (test kirim email)
□ /keystatic → CMS admin accessible, bisa create/edit content
□ 3D scene loads on desktop (atau CSS fallback on mobile)
□ Custom cursor visible on desktop
□ Mobile menu opens/closes correctly

Performance:
□ Lighthouse Performance ≥ 95
□ Lighthouse Accessibility = 100
□ Lighthouse SEO = 100
□ No console errors di browser dev tools
□ Images load dengan correct format (avif/webp di Chrome)

SEO:
□ View source → meta tags present
□ og:image renders saat share ke social (test: opengraph.xyz/arsendev.net)
□ /sitemap.xml accessible
□ /robots.txt accessible

Security:
□ curl -I https://arsendev.net → response headers include:
  - Strict-Transport-Security
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
□ SSL Labs test: https://ssllabs.com/ssltest/ → grade A or A+
```

---

*Deployment guide ini berlaku untuk arsendev.net di Ubuntu VPS dengan Biznet Neo DNS.*
*Update file ini jika ada perubahan infrastruktur.*