# 🇸🇳 ENGY LABS Platform

![ENGY LABS](https://img.shields.io/badge/ENGY%20LABS-Sénégal-00853F?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748?style=for-the-badge&logo=prisma)

Plateforme 100% sénégalaise de formations, ateliers et team building en **Intelligence Artificielle**, **Gouvernance des Données** et **Cybersécurité**.

## 🎯 Fonctionnalités

### ✨ Fonctionnalités Principales

- 🏠 **Page d'accueil moderne** avec identité visuelle sénégalaise
- 📚 **Catalogue de formations** avec filtres avancés
- 🎨 **Ateliers et Team Building** personnalisés
- 📅 **Calendrier dynamique** des événements
- 💳 **Système de paiement** (Stripe, Wave, Orange Money, Free Money)
- 💰 **Abonnements** modulaires (mensuel, trimestriel, annuel)
- 📝 **Blog/Actualités** intégré
- 💬 **Témoignages** et études de cas
- ❓ **FAQ interactive** avec recherche
- 📞 **Formulaire de contact** et demande de devis
- 🌍 **Multilingue** (Français/English)

### 🔒 Sécurité & Performance

- ✅ Authentification sécurisée avec NextAuth
- ✅ Validation des données avec Zod
- ✅ Protection CSRF et XSS
- ✅ Rate limiting
- ✅ Optimisation SEO complète
- ✅ Google Analytics intégré
- ✅ Performance optimale (Next.js 14 App Router)

### 👨‍💼 Administration

- 📊 Dashboard administrateur
- 📝 Gestion des formations
- 👥 Gestion des utilisateurs
- 💳 Gestion des paiements
- 📧 Gestion des messages
- 📰 Gestion du blog

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants accessibles
- **Framer Motion** - Animations
- **Lucide React** - Icônes

### Backend
- **Next.js API Routes** - API RESTful
- **Prisma** - ORM pour PostgreSQL
- **NextAuth** - Authentification
- **Zod** - Validation des schémas

### Paiements
- **Stripe** - Paiements internationaux
- **Wave/Orange Money/Free Money** - Paiements mobiles Sénégal

### Base de données
- **PostgreSQL** - Base de données relationnelle

## 📋 Prérequis

- **Node.js** >= 18.0.0
- **npm** ou **yarn** ou **pnpm**
- **PostgreSQL** >= 14

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-repo/engy-labs-platform.git
cd engy-labs-platform
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configuration de l'environnement

Copier le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Puis configurer les variables d'environnement :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/engy_labs?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere-avec-openssl"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 4. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# (Optionnel) Seed avec des données de test
npx prisma db seed
```

### 5. Lancer en développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Build de Production

```bash
# Build
npm run build

# Lancer en production
npm run start
```

## 🚢 Déploiement

### Déploiement sur Vercel (Recommandé)

1. Pusher votre code sur GitHub/GitLab/Bitbucket
2. Importer votre projet sur [Vercel](https://vercel.com)
3. Configurer les variables d'environnement
4. Déployer !

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-repo/engy-labs-platform)

### Déploiement sur Render

1. Créer un nouveau Web Service sur [Render](https://render.com)
2. Connecter votre dépôt Git
3. Configurer :
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Ajouter une base de données PostgreSQL
5. Configurer les variables d'environnement
6. Déployer !

### Déploiement sur Railway

```bash
# Installer Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialiser
railway init

# Déployer
railway up
```

## 🗄️ Structure du Projet

```
engy-labs-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Routes multilingues
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── formations/    # Formations
│   │   │   ├── contact/       # Contact
│   │   │   ├── faq/           # FAQ
│   │   │   └── ...
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Authentication
│   │   │   ├── contact/       # Contact
│   │   │   ├── formations/    # Formations
│   │   │   └── ...
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Styles globaux
│   ├── components/            # Composants réutilisables
│   │   ├── ui/                # Composants UI de base
│   │   ├── layout/            # Header, Footer
│   │   └── ...
│   ├── lib/                   # Utilitaires
│   │   ├── db.ts             # Prisma client
│   │   ├── auth.ts           # Configuration auth
│   │   ├── stripe.ts         # Configuration Stripe
│   │   └── utils.ts          # Fonctions utilitaires
│   ├── i18n/                  # Traductions
│   │   ├── fr.json           # Français
│   │   └── en.json           # English
│   └── types/                 # Types TypeScript
├── prisma/
│   └── schema.prisma          # Schéma base de données
├── public/                    # Assets statiques
├── .env.example               # Exemple de configuration
├── next.config.js             # Configuration Next.js
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── package.json               # Dépendances
```

## 🎨 Personnalisation

### Couleurs Sénégalaises

Les couleurs principales sont définies dans `tailwind.config.js` :

```js
senegal: {
  green: '#00853F',   // Vert du drapeau
  yellow: '#FDEF42',  // Jaune du drapeau
  red: '#E31B23',     // Rouge du drapeau
  sand: '#E8D5C4',    // Sable du Sahel
  ocean: '#0077BE',   // Bleu de l'océan
  terracotta: '#C8553D' // Terre cuite
}
```

### Traductions

Ajouter ou modifier les traductions dans :
- `src/i18n/fr.json` (Français)
- `src/i18n/en.json` (English)

## 📊 Base de Données

### Modèles Principaux

- **User** - Utilisateurs
- **Formation** - Formations
- **FormationSession** - Sessions programmées
- **Enrollment** - Inscriptions
- **Subscription** - Abonnements
- **Order** - Commandes/Paiements
- **BlogPost** - Articles de blog
- **Testimonial** - Témoignages
- **FAQ** - Questions fréquentes
- **ContactMessage** - Messages de contact
- **QuoteRequest** - Demandes de devis

### Migrations

```bash
# Créer une migration
npx prisma migrate dev --name nom_migration

# Appliquer les migrations en production
npx prisma migrate deploy
```

## 🔐 Sécurité

### Bonnes Pratiques Implémentées

- ✅ Hachage des mots de passe avec bcrypt
- ✅ Validation des entrées avec Zod
- ✅ Protection CSRF
- ✅ Headers de sécurité
- ✅ Sanitization des données
- ✅ Rate limiting sur les API
- ✅ HTTPS en production

### RGPD / Protection des Données

- Consentement explicite pour la newsletter
- Droit à l'oubli (suppression des données)
- Politique de confidentialité
- Chiffrement des données sensibles

## 🧪 Tests (TODO)

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 SEO

- ✅ Métadonnées optimisées
- ✅ Sitemap.xml généré automatiquement
- ✅ Robots.txt
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Schema.org markup
- ✅ Performance optimale

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

**ENGY LABS** - Plateforme 100% sénégalaise

- Website: [https://engylabs.sn](https://engylabs.sn)
- Email: contact@engylabs.sn
- LinkedIn: [ENGY LABS](https://linkedin.com/company/engylabs)

## 🙏 Remerciements

- Communauté tech sénégalaise
- Tous nos formateurs et partenaires
- Open source contributors

---

**Fait avec ❤️ au Sénégal 🇸🇳**
