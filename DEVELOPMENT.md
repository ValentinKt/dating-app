# 🛠️ Guide de développement - Dating App

## 📋 Prérequis détaillés

### Versions recommandées
- **Node.js**: 18.x ou 20.x LTS
- **npm**: 9.x ou supérieur
- **Git**: 2.x

### Vérification de l'environnement
```bash
# Vérifier les versions installées
node --version
npm --version
git --version
```

## 🚀 Setup complet from scratch

### 1. Création d'un nouveau projet similaire
```bash
# Créer un nouveau projet Vite + React
npm create vite@latest dating-app -- --template react
cd dating-app

# Installer les dépendances de base
npm install

# Installer les dépendances spécifiques
npm install react-router-dom@^7.7.1
npm install @tailwindcss/vite@^4.1.11 tailwind@^4.0.0
npm install @vitejs/plugin-react-swc@^3.10.2
```

### 2. Configuration Vite pour Tailwind CSS 4
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true
  }
})
```

### 3. Configuration Tailwind CSS
```css
/* src/index.css */
@import 'tailwindcss';

/* Vos styles personnalisés ici */
```

## 🏗️ Architecture du projet

### Structure des composants
```
src/
├── components/
│   ├── common/           # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── layout/           # Composants de mise en page
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── pages/            # Composants de pages
│       ├── HomePage.jsx
│       ├── FormPage.jsx
│       └── ResultPage.jsx
├── hooks/                # Hooks personnalisés
├── utils/                # Fonctions utilitaires
├── services/             # Services API
└── constants/            # Constantes de l'application
```

### Conventions de nommage
- **Composants**: PascalCase (ex: `HomePage.jsx`)
- **Hooks**: camelCase avec préfixe "use" (ex: `useAuth.js`)
- **Utilitaires**: camelCase (ex: `formatDate.js`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_ENDPOINTS.js`)

## 🔧 Scripts de développement

### Package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

### Commandes utiles
```bash
# Développement avec hot reload
npm run dev

# Build optimisée pour production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter et correction automatique
npm run lint:fix

# Formatage du code
npm run format
```

## 🌐 Intégration API

### Service API générique
```javascript
// src/services/api.js
const API_BASE_URL = 'https://randomuser.me/api';

export const apiService = {
  async fetchUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}?${queryString}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};
```

### Hook personnalisé pour les données
```javascript
// src/hooks/useProfiles.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useProfiles = (filters) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchUsers(filters);
        setProfiles(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filters]);

  return { profiles, loading, error };
};
```

## 🎨 Système de design

### Palette de couleurs
```css
/* Couleurs principales */
:root {
  --color-primary: #ec4899;     /* Pink-500 */
  --color-secondary: #8b5cf6;   /* Purple-500 */
  --color-accent: #3b82f6;      /* Blue-500 */
  --color-success: #10b981;     /* Emerald-500 */
  --color-warning: #f59e0b;     /* Amber-500 */
  --color-error: #ef4444;       /* Red-500 */
}
```

### Classes utilitaires personnalisées
```css
/* Boutons avec gradient */
.btn-gradient {
  @apply bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl;
  @apply hover:scale-105 hover:shadow-xl transition-all duration-300;
}

/* Cards avec effet hover */
.card-hover {
  @apply bg-white rounded-2xl shadow-lg p-6;
  @apply hover:shadow-xl hover:scale-105 transition-all duration-300;
}
```

## 🧪 Tests (optionnel)

### Configuration Jest + Testing Library
```bash
# Installer les dépendances de test
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

### Configuration Vitest
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

## 📦 Déploiement

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist
```

### Vercel
```bash
# Déploiement automatique via Git
npx vercel
```

### GitHub Pages
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

## 🔒 Sécurité et bonnes pratiques

### Variables d'environnement
```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Dating App
```

### Validation des données
```javascript
// Exemple de validation
const validateForm = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Le nom est requis';
  }
  
  if (!data.age || data.age < 18) {
    errors.age = 'Vous devez avoir au moins 18 ans';
  }
  
  return errors;
};
```

## 🚀 Optimisations de performance

### Lazy loading des composants
```javascript
import { lazy, Suspense } from 'react';

const ResultPage = lazy(() => import('./components/ResultPage'));

function App() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ResultPage />
    </Suspense>
  );
}
```

### Optimisation des images
```javascript
// Utiliser des formats modernes
const ImageOptimized = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};
```

## 📚 Ressources utiles

- [Documentation React](https://react.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [RandomUser API](https://randomuser.me/)

## 🐛 Debugging

### Outils de développement
- React Developer Tools
- Tailwind CSS IntelliSense (VS Code)
- ES7+ React/Redux/React-Native snippets

### Logs utiles
```javascript
// Debug des props
console.log('Props reçues:', props);

// Debug des états
console.log('État actuel:', state);

// Debug des API calls
console.log('Réponse API:', response);
```