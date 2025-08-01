# 💕 Dating App

Une application de rencontres moderne construite avec React et Tailwind CSS, permettant aux utilisateurs de créer un profil et de découvrir des matches potentiels.

## 🚀 Technologies utilisées

### Frontend
- **React 19.1.0** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **JavaScript + SWC** - Compilateur ultra-rapide pour JavaScript/TypeScript
- **Tailwind CSS 4.0** - Framework CSS utility-first pour un design moderne
- **React Router DOM 7.7.1** - Gestion de la navigation et du routage
- **Vite 7.0.4** - Outil de build et serveur de développement rapide

### Outils de développement
- **ESLint 9.30.1** - Linter pour maintenir la qualité du code
- **@vitejs/plugin-react-swc** - Plugin Vite pour React avec SWC
- **@tailwindcss/vite** - Plugin Vite pour Tailwind CSS 4

## 🌐 APIs utilisées

### RandomUser API
- **URL**: `https://randomuser.me/api/`
- **Usage**: Génération de profils utilisateurs aléatoires pour les matches
- **Paramètres utilisés**:
  - `gender`: Filtre par genre (male/female)
  - `results`: Nombre de profils à récupérer (6)
  - `nat=fr`: Nationalité française
  - `inc=name,location,dob,picture`: Inclure nom, localisation, date de naissance et photo
  - `noinfo`: Exclure les informations de l'API

## 📦 Installation et configuration from scratch

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### 1. Cloner et installer les dépendances
```bash
# Cloner le projet
git clone <url-du-repo>
cd dating-app

# Installer les dépendances
npm install
```

### 2. Structure du projet
```
dating-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Page d'accueil
│   │   ├── FormPage.jsx      # Formulaire de profil
│   │   └── ResultPage.jsx    # Page des résultats/matches
│   ├── App.jsx               # Composant principal avec routage
│   ├── App.css              # Styles spécifiques à l'app
│   ├── index.css            # Styles globaux et Tailwind
│   └── main.jsx             # Point d'entrée de l'application
├── package.json
├── vite.config.js           # Configuration Vite
└── README.md
```

## 🛠️ Commandes disponibles

### Développement
```bash
# Démarrer le serveur de développement
npm run dev
# L'application sera disponible sur http://localhost:5173
```

### Production
```bash
# Construire l'application pour la production
npm run build

# Prévisualiser la build de production
npm run preview
```

### Qualité du code
```bash
# Lancer ESLint pour vérifier le code
npm run lint
```

## 🎨 Fonctionnalités

### Pages principales
1. **HomePage** (`/`) - Page d'accueil avec présentation de l'app
2. **FormPage** (`/form`) - Formulaire de création de profil
3. **ResultPage** (`/result`) - Affichage des matches potentiels

### Fonctionnalités du formulaire
- Validation en temps réel
- Champs requis : nom, prénom, âge (18+), genre
- Champ optionnel : bio
- Gestion des erreurs avec messages personnalisés

### Système de matching
- Algorithme basique de matching par genre opposé
- Intégration avec RandomUser API pour générer des profils
- Affichage de 6 profils potentiels
- Interface interactive avec boutons Like/Pass

## 🎯 Configuration Tailwind CSS 4

Le projet utilise Tailwind CSS 4 avec le plugin Vite officiel :

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Animations personnalisées
- `animate-float` - Animation flottante
- `animate-pulse-heart` - Pulsation pour les cœurs
- `animate-shake` - Animation de secousse pour les erreurs

## 🚀 Déploiement

### Netlify/Vercel
```bash
# Build de production
npm run build

# Le dossier 'dist' contient les fichiers à déployer
```

### Variables d'environnement
Aucune variable d'environnement n'est requise pour ce projet.

## 🔧 Développement avancé

### Ajouter de nouvelles fonctionnalités
1. Créer un nouveau composant dans `src/components/`
2. Ajouter la route dans `App.jsx`
3. Implémenter la logique métier
4. Styliser avec Tailwind CSS

### Intégrer une vraie API
Pour remplacer RandomUser API :
1. Modifier `ResultPage.jsx`
2. Changer l'URL de l'API dans `fetchProfiles()`
3. Adapter le format des données reçues

## 📱 Responsive Design
L'application est entièrement responsive grâce à Tailwind CSS :
- Mobile-first approach
- Breakpoints : `sm:`, `md:`, `lg:`, `xl:`
- Grilles flexibles et adaptatives

## 🎨 Thème et Design
- Palette de couleurs : Rose, Violet, Bleu
- Gradients modernes
- Ombres et effets de profondeur
- Animations fluides et micro-interactions
- Design inspiré des applications de rencontres modernes