# 🚀 Guide de déploiement - Dating App

## 📋 Checklist pré-déploiement

### ✅ Vérifications obligatoires
- [ ] Tests passent (`npm run lint`)
- [ ] Build réussit (`npm run build`)
- [ ] Preview fonctionne (`npm run preview`)
- [ ] Pas de console.log en production
- [ ] Variables d'environnement configurées
- [ ] Assets optimisés

## 🌐 Options de déploiement

### 1. Netlify (Recommandé)

#### Déploiement automatique via Git
```bash
# 1. Connecter votre repo GitHub à Netlify
# 2. Configurer les build settings:
Build command: npm run build
Publish directory: dist
Node version: 18
```

#### Déploiement manuel
```bash
# Build du projet
npm run build

# Installer Netlify CLI
npm install -g netlify-cli

# Login et déploiement
netlify login
netlify deploy --prod --dir=dist
```

#### Configuration Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel

#### Déploiement automatique
```bash
# Installer Vercel CLI
npm install -g vercel

# Login et déploiement
vercel login
vercel

# Suivre les instructions interactives
```

#### Configuration Vercel
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. GitHub Pages

#### Configuration automatique
```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Ajouter au package.json
"homepage": "https://username.github.io/dating-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Déployer
npm run deploy
```

#### Configuration Vite pour GitHub Pages
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/dating-app/', // Nom de votre repo
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### 4. Firebase Hosting

#### Installation et configuration
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Login Firebase
firebase login

# Initialiser le projet
firebase init hosting

# Configurer:
# Public directory: dist
# Single-page app: Yes
# Automatic builds: No
```

#### Configuration Firebase
```json
// firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### Déploiement
```bash
# Build et déploiement
npm run build
firebase deploy
```

## 🔧 Optimisations pour la production

### 1. Configuration Vite optimisée
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 2. Optimisation des assets
```bash
# Optimiser les images (optionnel)
npm install --save-dev vite-plugin-imagemin
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { ViteImageOptimize } from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] }
    })
  ]
})
```

### 3. Analyse du bundle
```bash
# Installer l'analyseur de bundle
npm install --save-dev rollup-plugin-visualizer

# Analyser le build
npm run build -- --mode analyze
```

## 🌍 Variables d'environnement

### Configuration par environnement
```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development

# .env.production
VITE_API_URL=https://api.dating-app.com
VITE_APP_ENV=production
```

### Utilisation dans le code
```javascript
// src/config/env.js
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://randomuser.me/api',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
}
```

## 📊 Monitoring et analytics

### Google Analytics 4
```bash
# Installer gtag
npm install gtag
```

```javascript
// src/utils/analytics.js
import { gtag } from 'gtag'

export const initGA = () => {
  if (typeof window !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: 'Dating App',
      page_location: window.location.href
    })
  }
}

export const trackEvent = (action, category, label) => {
  gtag('event', action, {
    event_category: category,
    event_label: label
  })
}
```

### Sentry pour le monitoring d'erreurs
```bash
# Installer Sentry
npm install @sentry/react @sentry/tracing
```

```javascript
// src/main.jsx
import * as Sentry from '@sentry/react'

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  })
}
```

## 🔒 Sécurité

### Headers de sécurité
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' https:; script-src 'self'"
```

### HTTPS et domaine personnalisé
```bash
# Netlify - Configurer domaine personnalisé
# 1. Aller dans Site settings > Domain management
# 2. Ajouter votre domaine
# 3. Configurer les DNS
# 4. Activer HTTPS automatiquement
```

## 🚀 CI/CD avec GitHub Actions

### Workflow automatique
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 Performance

### Métriques à surveiller
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Outils de mesure
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

### Optimisations recommandées
```javascript
// Lazy loading des images
const LazyImage = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

// Preload des ressources critiques
// Dans index.html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

## 🔄 Rollback et versioning

### Stratégie de versioning
```bash
# Utiliser semantic versioning
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.1 -> 1.1.0
npm version major  # 1.1.0 -> 2.0.0

# Créer un tag Git
git tag v1.0.0
git push origin v1.0.0
```

### Rollback rapide
```bash
# Netlify - Rollback via interface web
# Vercel - Rollback via CLI
vercel rollback [deployment-url]

# GitHub Pages - Rollback via Git
git revert HEAD
git push origin main
```

## 📞 Support et maintenance

### Logs et debugging
```javascript
// Configuration des logs en production
const logger = {
  error: (message, data) => {
    if (import.meta.env.PROD) {
      // Envoyer à Sentry ou service de logs
      console.error(message, data)
    }
  },
  info: (message, data) => {
    if (import.meta.env.DEV) {
      console.log(message, data)
    }
  }
}
```

### Monitoring de l'uptime
- UptimeRobot
- Pingdom
- StatusCake

## 🎯 Checklist finale

### Avant le déploiement
- [ ] Code review effectué
- [ ] Tests automatisés passent
- [ ] Performance vérifiée
- [ ] Sécurité validée
- [ ] SEO optimisé
- [ ] Responsive testé
- [ ] Cross-browser testé
- [ ] Analytics configuré
- [ ] Monitoring en place
- [ ] Documentation à jour

### Après le déploiement
- [ ] Site accessible
- [ ] Fonctionnalités testées
- [ ] Performance mesurée
- [ ] Erreurs surveillées
- [ ] Analytics fonctionnel
- [ ] Backup configuré
- [ ] Équipe notifiée