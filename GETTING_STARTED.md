# 🚀 Guide de Démarrage Rapide - ENGY LABS Platform

Ce guide vous aidera à configurer et lancer le projet ENGY LABS en quelques minutes.

## ⚡ Installation Rapide

### 1. Prérequis

Assurez-vous d'avoir installé :
- **Node.js** >= 18.0.0 ([Télécharger](https://nodejs.org))
- **PostgreSQL** >= 14 ([Télécharger](https://www.postgresql.org/download/))
- **Git** ([Télécharger](https://git-scm.com))

### 2. Clone le projet

```bash
git clone <votre-repo-url>
cd engy-labs-platform
```

### 3. Installation des dépendances

```bash
npm install
```

### 4. Configuration de la base de données

#### A. Créer une base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE engy_labs;

# Créer un utilisateur (optionnel)
CREATE USER engy_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE engy_labs TO engy_user;

# Quitter
\q
```

#### B. Configuration des variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env
```

Modifier le fichier `.env` :

```env
# Base de données
DATABASE_URL="postgresql://postgres:votre_password@localhost:5432/engy_labs?schema=public"

# NextAuth (générer une clé secrète)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre_secret_genere"  # Générer avec: openssl rand -base64 32

# Stripe (optionnel pour le développement)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

#### C. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# Peupler avec des données de démonstration
npm run db:seed
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur ! 🎉

## 👤 Connexion Admin

Après le seed, vous pouvez vous connecter avec :

- **Email**: `admin@engylabs.sn`
- **Mot de passe**: `Admin123!`

## 📊 Prisma Studio (Interface de BDD)

Pour visualiser et modifier les données facilement :

```bash
npm run db:studio
```

Ouvre une interface web sur [http://localhost:5555](http://localhost:5555)

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev              # Lancer en mode développement
npm run build            # Build de production
npm run start            # Lancer en production

# Base de données
npm run db:push          # Synchroniser le schéma Prisma
npm run db:seed          # Peupler avec des données
npm run db:studio        # Interface graphique

# Code Quality
npm run lint             # Linter le code
```

## 🎯 Étapes Suivantes

### 1. Personnaliser les données

Modifiez le fichier `prisma/seed.ts` pour adapter les données à vos besoins.

### 2. Configurer Stripe (Paiements)

1. Créer un compte sur [Stripe](https://stripe.com)
2. Récupérer vos clés API (mode test)
3. Les ajouter dans `.env`

### 3. Configurer l'Email (optionnel)

Pour l'envoi d'emails (notifications, confirmations) :

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="votre-app-password"
```

### 4. Google Analytics (optionnel)

```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## 🐛 Résolution de Problèmes

### Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL est lancé
sudo service postgresql status  # Linux
brew services list              # macOS

# Vérifier l'URL de connexion dans .env
DATABASE_URL="postgresql://user:password@localhost:5432/engy_labs"
```

### Erreur Prisma Client

```bash
# Régénérer le client
npx prisma generate

# Nettoyer et recommencer
rm -rf node_modules
npm install
npx prisma generate
```

### Port 3000 déjà utilisé

```bash
# Changer le port
PORT=3001 npm run dev
```

## 📁 Structure du Projet

```
engy-labs-platform/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   ├── components/       # Composants React
│   ├── lib/              # Utilitaires et config
│   └── i18n/             # Traductions FR/EN
├── prisma/
│   ├── schema.prisma     # Schéma de BDD
│   └── seed.ts           # Données de test
├── public/               # Assets statiques
└── .env                  # Variables d'environnement
```

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `tailwind.config.js` :

```js
senegal: {
  green: '#00853F',
  yellow: '#FDEF42',
  red: '#E31B23',
  // ...
}
```

### Traductions

- Français : `src/i18n/fr.json`
- English : `src/i18n/en.json`

## 📚 Documentation

- [README principal](./README.md)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Stripe](https://stripe.com/docs)

## 🆘 Besoin d'aide ?

- 📧 Email : contact@engylabs.sn
- 💬 Discord : [Rejoindre](https://discord.gg/engylabs)
- 📖 Documentation : [docs.engylabs.sn](https://docs.engylabs.sn)

---

**Bon développement ! 🚀 🇸🇳**
