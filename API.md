# 🌐 Documentation API - Dating App

## 📋 APIs actuellement utilisées

### 1. RandomUser API

#### Informations générales
- **URL de base**: `https://randomuser.me/api/`
- **Type**: API REST publique
- **Authentification**: Aucune requise
- **Limite de taux**: Aucune limite stricte
- **Documentation officielle**: [randomuser.me/documentation](https://randomuser.me/documentation)

#### Paramètres supportés
```javascript
const apiParams = {
  results: 6,                    // Nombre de profils (1-5000)
  gender: 'male',               // Genre: male, female
  nat: 'fr',                    // Nationalité: fr, us, gb, etc.
  inc: 'name,location,dob,picture', // Champs à inclure
  exc: 'login,registered,id',   // Champs à exclure
  noinfo: true,                 // Exclure les infos de l'API
  seed: 'dating-app',           // Seed pour résultats reproductibles
  page: 1,                      // Pagination
  format: 'json'                // Format de réponse
}
```

#### Exemple d'utilisation
```javascript
// Service API pour RandomUser
class RandomUserService {
  static BASE_URL = 'https://randomuser.me/api/';

  static async getProfiles(options = {}) {
    const defaultParams = {
      results: 6,
      nat: 'fr',
      inc: 'name,location,dob,picture',
      noinfo: true
    };

    const params = { ...defaultParams, ...options };
    const queryString = new URLSearchParams(params).toString();
    
    try {
      const response = await fetch(`${this.BASE_URL}?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Erreur RandomUser API:', error);
      throw error;
    }
  }

  static async getProfilesByGender(targetGender, count = 6) {
    return this.getProfiles({
      gender: targetGender,
      results: count
    });
  }
}

// Utilisation dans un composant
const useRandomProfiles = (gender, count) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await RandomUserService.getProfilesByGender(gender, count);
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [gender, count]);

  return { profiles, loading, error };
};
```

#### Structure de réponse
```javascript
// Exemple de réponse RandomUser API
{
  "results": [
    {
      "name": {
        "title": "Mr",
        "first": "Jean",
        "last": "Dupont"
      },
      "location": {
        "street": {
          "number": 123,
          "name": "Rue de la Paix"
        },
        "city": "Paris",
        "state": "Île-de-France",
        "country": "France",
        "postcode": "75001"
      },
      "dob": {
        "date": "1990-05-15T10:30:00.000Z",
        "age": 33
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/1.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/1.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/1.jpg"
      }
    }
  ],
  "info": {
    "seed": "dating-app",
    "results": 1,
    "page": 1,
    "version": "1.4"
  }
}
```

## 🔄 Intégration d'APIs alternatives

### 1. JSONPlaceholder (pour les tests)

```javascript
// Service pour JSONPlaceholder
class JSONPlaceholderService {
  static BASE_URL = 'https://jsonplaceholder.typicode.com';

  static async getUsers() {
    const response = await fetch(`${this.BASE_URL}/users`);
    return response.json();
  }

  static async getUserPhotos(userId) {
    const response = await fetch(`${this.BASE_URL}/photos?albumId=${userId}`);
    return response.json();
  }
}
```

### 2. Unsplash API (pour les photos)

```javascript
// Configuration Unsplash
const UNSPLASH_CONFIG = {
  baseUrl: 'https://api.unsplash.com',
  accessKey: process.env.VITE_UNSPLASH_ACCESS_KEY
};

class UnsplashService {
  static async getRandomPhotos(query = 'portrait', count = 6) {
    const response = await fetch(
      `${UNSPLASH_CONFIG.baseUrl}/photos/random?query=${query}&count=${count}&client_id=${UNSPLASH_CONFIG.accessKey}`
    );
    return response.json();
  }
}
```

### 3. API personnalisée (Backend custom)

```javascript
// Service pour votre API backend
class DatingAPIService {
  static BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
  static token = localStorage.getItem('authToken');

  static async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      },
      ...options
    };

    const response = await fetch(`${this.BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }

  // Authentification
  static async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  static async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // Profils
  static async createProfile(profileData) {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  }

  static async getMatches(userId) {
    return this.request(`/users/${userId}/matches`);
  }

  static async likeProfile(userId, targetUserId) {
    return this.request(`/users/${userId}/like`, {
      method: 'POST',
      body: JSON.stringify({ targetUserId })
    });
  }

  static async passProfile(userId, targetUserId) {
    return this.request(`/users/${userId}/pass`, {
      method: 'POST',
      body: JSON.stringify({ targetUserId })
    });
  }

  // Messages
  static async getConversations(userId) {
    return this.request(`/users/${userId}/conversations`);
  }

  static async sendMessage(conversationId, message) {
    return this.request(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  }
}
```

## 🔐 Gestion de l'authentification

### Hook d'authentification
```javascript
// hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Vérifier la validité du token
      DatingAPIService.verifyToken(token)
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('authToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const { user, token } = await DatingAPIService.login(credentials);
    localStorage.setItem('authToken', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## 📡 WebSocket pour le temps réel

### Configuration WebSocket
```javascript
// services/websocket.js
class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(userId) {
    const wsUrl = `${process.env.VITE_WS_URL}?userId=${userId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connecté');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket déconnecté');
      // Reconnexion automatique
      setTimeout(() => this.connect(userId), 3000);
    };
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(callback => callback(payload));
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  unsubscribe(eventType, callback) {
    const listeners = this.listeners.get(eventType) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  send(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const wsService = new WebSocketService();
```

### Hook pour WebSocket
```javascript
// hooks/useWebSocket.js
import { useEffect, useRef } from 'react';
import { wsService } from '../services/websocket';

export const useWebSocket = (eventType, callback) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (data) => callbackRef.current(data);
    wsService.subscribe(eventType, handler);

    return () => {
      wsService.unsubscribe(eventType, handler);
    };
  }, [eventType]);
};

// Utilisation dans un composant
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  useWebSocket('new_message', (message) => {
    setMessages(prev => [...prev, message]);
  });

  useWebSocket('user_online', (userId) => {
    console.log(`Utilisateur ${userId} en ligne`);
  });

  return (
    // JSX du chat
  );
};
```

## 🔄 Cache et optimisations

### React Query pour le cache
```javascript
// Installation
// npm install @tanstack/react-query

// Configuration
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});

// Hook personnalisé avec React Query
export const useProfiles = (gender, count) => {
  return useQuery({
    queryKey: ['profiles', gender, count],
    queryFn: () => RandomUserService.getProfilesByGender(gender, count),
    staleTime: 5 * 60 * 1000
  });
};

export const useMatches = (userId) => {
  return useQuery({
    queryKey: ['matches', userId],
    queryFn: () => DatingAPIService.getMatches(userId),
    enabled: !!userId
  });
};
```

### Service Worker pour le cache offline
```javascript
// public/sw.js
const CACHE_NAME = 'dating-app-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

## 📊 Analytics et tracking

### Service d'analytics
```javascript
// services/analytics.js
class AnalyticsService {
  static track(event, properties = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event, properties);
    }

    // Mixpanel
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track(event, properties);
    }

    // Analytics personnalisé
    this.sendToCustomAnalytics(event, properties);
  }

  static trackPageView(page) {
    this.track('page_view', { page });
  }

  static trackUserAction(action, userId) {
    this.track('user_action', { action, userId });
  }

  static trackMatch(userId, targetUserId, action) {
    this.track('match_action', {
      userId,
      targetUserId,
      action // 'like', 'pass', 'super_like'
    });
  }

  static async sendToCustomAnalytics(event, properties) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, properties, timestamp: Date.now() })
      });
    } catch (error) {
      console.error('Erreur analytics:', error);
    }
  }
}

export default AnalyticsService;
```

## 🚨 Gestion d'erreurs

### Service de gestion d'erreurs
```javascript
// services/errorHandler.js
class ErrorHandler {
  static handle(error, context = {}) {
    console.error('Erreur capturée:', error, context);

    // Sentry
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error, { extra: context });
    }

    // Log personnalisé
    this.logError(error, context);

    // Notification utilisateur
    this.notifyUser(error);
  }

  static async logError(error, context) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          context,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (logError) {
      console.error('Impossible de logger l\'erreur:', logError);
    }
  }

  static notifyUser(error) {
    // Toast notification ou modal d'erreur
    const message = this.getUserFriendlyMessage(error);
    // Afficher le message à l'utilisateur
  }

  static getUserFriendlyMessage(error) {
    const errorMessages = {
      'NetworkError': 'Problème de connexion. Vérifiez votre internet.',
      'ValidationError': 'Données invalides. Vérifiez vos informations.',
      'AuthenticationError': 'Session expirée. Reconnectez-vous.',
      'default': 'Une erreur inattendue s\'est produite.'
    };

    return errorMessages[error.name] || errorMessages.default;
  }
}

export default ErrorHandler;
```

## 📝 Documentation des endpoints

### Endpoints recommandés pour une API complète
```javascript
// Documentation des endpoints API
const API_ENDPOINTS = {
  // Authentification
  auth: {
    login: 'POST /auth/login',
    register: 'POST /auth/register',
    logout: 'POST /auth/logout',
    refresh: 'POST /auth/refresh',
    verify: 'GET /auth/verify'
  },

  // Profils utilisateurs
  profiles: {
    create: 'POST /profiles',
    get: 'GET /profiles/:id',
    update: 'PUT /profiles/:id',
    delete: 'DELETE /profiles/:id',
    uploadPhoto: 'POST /profiles/:id/photos'
  },

  // Matching
  matching: {
    getRecommendations: 'GET /users/:id/recommendations',
    like: 'POST /users/:id/like',
    pass: 'POST /users/:id/pass',
    superLike: 'POST /users/:id/super-like',
    getMatches: 'GET /users/:id/matches'
  },

  // Messages
  messages: {
    getConversations: 'GET /users/:id/conversations',
    getMessages: 'GET /conversations/:id/messages',
    sendMessage: 'POST /conversations/:id/messages',
    markAsRead: 'PUT /messages/:id/read'
  },

  // Notifications
  notifications: {
    get: 'GET /users/:id/notifications',
    markAsRead: 'PUT /notifications/:id/read',
    getSettings: 'GET /users/:id/notification-settings',
    updateSettings: 'PUT /users/:id/notification-settings'
  }
};
```

Cette documentation couvre tous les aspects de l'intégration API pour votre application de dating, des services de base aux fonctionnalités avancées comme le temps réel et l'analytics.