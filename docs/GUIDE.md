# EduPass+ Guide d'Utilisation

## Mission du Projet

EduPass+ est une solution innovante de gestion scolaire tout-en-un qui vise à simplifier et moderniser l'administration scolaire. Le projet offre une plateforme centralisée pour gérer les différents aspects de la vie scolaire, du transport à la restauration, en passant par la gestion administrative et financière.

## Principales Fonctionnalités

### 1. Gestion des Accès
- Système de badge unique pour tous les services
- QR Code pour l'identification rapide
- Gestion des droits d'accès par rôle

### 2. Modules Principaux
- **Cantine** : Gestion des menus, réservations et paiements
- **Transport** : Suivi des bus en temps réel
- **Administration** : Gestion des élèves et du personnel
- **Finance** : Gestion des paiements et comptabilité
- **Parent** : Suivi des activités et paiements
- **Élève** : Accès aux services et informations personnelles

### 3. Sécurité
- Authentification sécurisée
- Gestion des rôles et permissions
- Protection des données personnelles

## Technologies Utilisées

### Frontend
- Next.js 14
- React 18
- TailwindCSS
- Shadcn/ui
- Framer Motion

### Backend
- Supabase (Base de données et Authentication)
- Edge Functions
- Storage pour les fichiers

### Outils de Développement
- TypeScript
- ESLint
- Prettier

## Guide de Contribution

### Prérequis
1. Node.js (version 18 ou supérieure)
2. npm ou yarn
3. Compte Supabase

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/edupass-plus.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Structure du Projet

```
edupass-plus/
├── app/                  # Pages et routes Next.js
├── components/          # Composants React réutilisables
├── lib/                 # Utilitaires et configurations
├── public/             # Assets statiques
├── styles/             # Styles globaux
└── types/              # Types TypeScript
```

### Conventions de Code

1. **Nommage**
   - Components: PascalCase
   - Fonctions: camelCase
   - Variables: camelCase
   - Types/Interfaces: PascalCase

2. **Organisation des Imports**
   - React imports en premier
   - Imports externes
   - Imports internes
   - Styles

3. **Composants**
   - Un composant par fichier
   - Utiliser des types TypeScript
   - Documenter les props

### Tests

```bash
# Lancer les tests unitaires
npm run test

# Lancer les tests e2e
npm run test:e2e
```

### Déploiement

Le déploiement est automatisé via Vercel. Chaque push sur la branche main déclenche un déploiement.

## Support

Pour toute question ou problème :
1. Consulter la documentation
2. Ouvrir une issue sur GitHub
3. Contacter l'équipe de développement

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.