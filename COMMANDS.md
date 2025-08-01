# ⚡ Commandes et Scripts - Dating App

## 🚀 Commandes de base

### Installation et setup
```bash
# Cloner le projet
git clone <repository-url>
cd dating-app

# Installer les dépendances
npm install

# Ou avec yarn
yarn install

# Ou avec pnpm (plus rapide)
pnpm install
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev
# Accessible sur http://localhost:5173

# Démarrer avec un port spécifique
npm run dev -- --port 3000

# Démarrer avec l'ouverture automatique du navigateur
npm run dev -- --open

# Démarrer en mode debug
DEBUG=vite:* npm run dev
```

### Build et production
```bash
# Build pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Build avec analyse du bundle
npm run build -- --mode analyze

# Build avec variables d'environnement spécifiques
NODE_ENV=production npm run build
```

### Qualité du code
```bash
# Lancer ESLint
npm run lint

# Corriger automatiquement les erreurs ESLint
npm run lint -- --fix

# Formater le code avec Prettier (si configuré)
npm run format

# Vérifier les types TypeScript (si configuré)
npm run type-check
```

## 🔧 Scripts personnalisés

### Ajouter au package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist node_modules/.vite",
    "clean:all": "rm -rf dist node_modules package-lock.json && npm install",
    "analyze": "npm run build && npx vite-bundle-analyzer dist",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=dist",
    "deploy:vercel": "npm run build && vercel --prod",
    "deploy:gh-pages": "npm run build && gh-pages -d dist",
    "start:prod": "npm run build && npm run preview",
    "deps:update": "npx npm-check-updates -u && npm install",
    "deps:audit": "npm audit && npm audit fix",
    "size": "npm run build && bundlesize",
    "lighthouse": "lhci autorun"
  }
}
```

## 📦 Gestion des dépendances

### Installation de nouvelles dépendances
```bash
# Dépendances de production
npm install package-name
npm install react-icons lucide-react
npm install axios @tanstack/react-query

# Dépendances de développement
npm install --save-dev package-name
npm install --save-dev @types/node vitest

# Installation globale
npm install -g package-name
npm install -g netlify-cli vercel
```

### Mise à jour des dépendances
```bash
# Vérifier les packages obsolètes
npm outdated

# Mettre à jour tous les packages
npm update

# Mettre à jour un package spécifique
npm install package-name@latest

# Mise à jour interactive avec npm-check-updates
npx npm-check-updates
npx npm-check-updates -u
npm install

# Audit de sécurité
npm audit
npm audit fix
npm audit fix --force
```

### Nettoyage
```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache Vite
rm -rf node_modules/.vite

# Nettoyer complètement le projet
npm run clean:all
```

## 🌐 Commandes de déploiement

### Netlify
```bash
# Installation CLI
npm install -g netlify-cli

# Login
netlify login

# Déploiement de test
netlify deploy --dir=dist

# Déploiement en production
netlify deploy --prod --dir=dist

# Déploiement avec build automatique
netlify deploy --build --prod

# Ouvrir le dashboard
netlify open

# Voir les logs
netlify logs
```

### Vercel
```bash
# Installation CLI
npm install -g vercel

# Login
vercel login

# Déploiement
vercel

# Déploiement en production
vercel --prod

# Voir les déploiements
vercel ls

# Voir les logs
vercel logs

# Rollback
vercel rollback [deployment-url]
```

### GitHub Pages
```bash
# Installation gh-pages
npm install --save-dev gh-pages

# Déploiement
npm run deploy:gh-pages

# Ou manuellement
npm run build
npx gh-pages -d dist
```

### Firebase
```bash
# Installation CLI
npm install -g firebase-tools

# Login
firebase login

# Initialisation
firebase init hosting

# Déploiement
firebase deploy

# Déploiement avec preview
firebase hosting:channel:deploy preview
```

## 🔍 Commandes de debug et analyse

### Analyse du bundle
```bash
# Avec webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer dist

# Avec vite-bundle-analyzer
npm install --save-dev vite-bundle-analyzer
npm run analyze

# Analyse de la taille des fichiers
du -sh dist/*
ls -lah dist/
```

### Performance et SEO
```bash
# Lighthouse CLI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# PageSpeed Insights
npx psi https://your-site.com

# Audit avec bundlesize
npm install --save-dev bundlesize
npm run size
```

### Monitoring des erreurs
```bash
# Sentry CLI
npm install -g @sentry/cli
sentry-cli releases new 1.0.0
sentry-cli releases files 1.0.0 upload-sourcemaps dist
```

## 🧪 Commandes de test

### Configuration des tests
```bash
# Installation Vitest
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# Lancer les tests
npm run test

# Tests en mode watch
npm run test -- --watch

# Tests avec interface UI
npm run test:ui

# Coverage
npm run test:coverage

# Tests spécifiques
npm run test -- HomePage.test.jsx
```

### Tests E2E avec Playwright
```bash
# Installation
npm install --save-dev @playwright/test
npx playwright install

# Lancer les tests E2E
npx playwright test

# Tests en mode interactif
npx playwright test --ui

# Tests sur un navigateur spécifique
npx playwright test --project=chromium
```

## 🔧 Commandes Git utiles

### Workflow de développement
```bash
# Initialiser un repo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main

# Workflow quotidien
git status
git add .
git commit -m "feat: add new feature"
git push

# Branches
git checkout -b feature/new-feature
git checkout main
git merge feature/new-feature
git branch -d feature/new-feature

# Tags pour les releases
git tag v1.0.0
git push origin v1.0.0
```

### Commandes avancées
```bash
# Stash des changements
git stash
git stash pop
git stash list

# Reset et revert
git reset --hard HEAD~1
git revert HEAD

# Rebase interactif
git rebase -i HEAD~3

# Cherry-pick
git cherry-pick <commit-hash>

# Voir l'historique
git log --oneline --graph
git log --since="2 weeks ago"
```

## 🛠️ Outils de développement

### VS Code extensions recommandées
```bash
# Extensions essentielles
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vscode.vscode-json
```

### Configuration VS Code
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    "class(?:Name)?\\s*[:=]\\s*[\"']([^\"']*)[\"']"
  ]
}
```

## 📊 Monitoring et logs

### Logs de développement
```bash
# Logs Vite détaillés
DEBUG=vite:* npm run dev

# Logs réseau
DEBUG=vite:deps npm run dev

# Logs de build
VITE_LOG_LEVEL=info npm run build
```

### Monitoring en production
```bash
# Uptime monitoring avec curl
curl -I https://your-site.com

# Test de performance
curl -w "@curl-format.txt" -o /dev/null -s https://your-site.com

# Monitoring continu
watch -n 30 'curl -I https://your-site.com'
```

## 🔄 Scripts d'automatisation

### Script de setup complet
```bash
#!/bin/bash
# setup.sh

echo "🚀 Setup Dating App..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Vérifier la configuration
echo "🔍 Vérification de la configuration..."
npm run lint

# Build de test
echo "🏗️ Test de build..."
npm run build

echo "✅ Setup terminé! Lancez 'npm run dev' pour démarrer."
```

### Script de déploiement
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement en cours..."

# Tests
echo "🧪 Lancement des tests..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Tests échoués"
    exit 1
fi

# Build
echo "🏗️ Build de production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build échoué"
    exit 1
fi

# Déploiement
echo "📤 Déploiement sur Netlify..."
netlify deploy --prod --dir=dist

echo "✅ Déploiement réussi!"
```

## 🆘 Dépannage

### Problèmes courants
```bash
# Erreur de port déjà utilisé
lsof -ti:5173 | xargs kill -9

# Problème de cache
rm -rf node_modules/.vite
npm run dev

# Problème de permissions
sudo chown -R $(whoami) ~/.npm

# Erreur de mémoire
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Problème SSL en développement
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Logs de debug
```bash
# Debug complet
DEBUG=* npm run dev 2>&1 | tee debug.log

# Analyser les performances
node --inspect npm run build

# Profiling mémoire
node --inspect --inspect-brk npm run build
```

## 📚 Commandes de documentation

### Génération de documentation
```bash
# JSDoc
npm install --save-dev jsdoc
npx jsdoc src/ -d docs/

# Storybook
npx storybook@latest init
npm run storybook

# Typedoc (pour TypeScript)
npm install --save-dev typedoc
npx typedoc src/
```

Ces commandes couvrent tous les aspects du développement, du déploiement et de la maintenance de votre application Dating App.