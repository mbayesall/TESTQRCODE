# 🚀 Guide de Déploiement - ENGY LABS Platform

Ce guide détaille les différentes options de déploiement pour la plateforme ENGY LABS.

## 📋 Prérequis

Avant de déployer, assurez-vous d'avoir :

- [ ] Une base de données PostgreSQL accessible
- [ ] Les clés API Stripe configurées
- [ ] Un compte d'hébergement (Vercel, Render, Railway, etc.)
- [ ] Les variables d'environnement configurées

## 🌐 Options de Déploiement

### Option 1 : Vercel (Recommandé) ⭐

Vercel est la solution la plus simple pour déployer une application Next.js.

#### Étapes

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez un compte gratuit

2. **Importer le projet**
   ```bash
   # Depuis votre terminal
   npm i -g vercel
   vercel login
   vercel
   ```

   Ou depuis l'interface Vercel :
   - Cliquez sur "New Project"
   - Importez depuis GitHub/GitLab/Bitbucket
   - Sélectionnez votre repository

3. **Configurer la base de données**

   Sur Vercel, vous pouvez utiliser :
   - **Vercel Postgres** (intégré)
   - **Supabase** (PostgreSQL gratuit)
   - **Neon** (PostgreSQL serverless)

   **Avec Vercel Postgres :**
   ```bash
   # Dans le dashboard Vercel
   Storage → Create Database → Postgres
   ```

4. **Configurer les variables d'environnement**

   Dans Settings → Environment Variables, ajoutez :

   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="https://votre-domaine.vercel.app"
   NEXTAUTH_SECRET="votre_secret_genere"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_SECRET_KEY="sk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

5. **Déployer**
   ```bash
   vercel --prod
   ```

6. **Configuration post-déploiement**

   Exécutez les migrations :
   ```bash
   # Localement, avec l'URL de production
   DATABASE_URL="postgresql://..." npx prisma db push
   DATABASE_URL="postgresql://..." npx prisma db seed
   ```

#### Webhook Stripe sur Vercel

```bash
# Configurer le webhook Stripe
stripe listen --forward-to https://votre-domaine.vercel.app/api/webhooks/stripe

# Ajouter l'URL dans le dashboard Stripe
https://votre-domaine.vercel.app/api/webhooks/stripe
```

---

### Option 2 : Render

Render offre un plan gratuit et est très simple à utiliser.

#### Étapes

1. **Créer un compte Render**
   - Allez sur [render.com](https://render.com)

2. **Créer une base de données PostgreSQL**
   - Dashboard → New → PostgreSQL
   - Choisissez le plan Free
   - Notez l'URL de connexion

3. **Créer le Web Service**
   - Dashboard → New → Web Service
   - Connectez votre repo Git
   - Configuration :
     ```
     Build Command: npm install && npx prisma generate && npm run build
     Start Command: npm start
     ```

4. **Variables d'environnement**

   Dans Environment, ajoutez :
   ```env
   DATABASE_URL=postgresql://...  # URL depuis Render Postgres
   NEXTAUTH_URL=https://votre-app.onrender.com
   NEXTAUTH_SECRET=votre_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

5. **Déployer**

   Render déploie automatiquement à chaque push.

6. **Initialiser la BDD**
   ```bash
   # Via le Shell de Render ou localement
   npm run db:push
   npm run db:seed
   ```

---

### Option 3 : Railway

Railway offre $5 de crédit gratuit par mois.

#### Étapes

1. **Installation de Railway CLI**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Initialiser le projet**
   ```bash
   railway init
   ```

3. **Ajouter PostgreSQL**
   ```bash
   railway add
   # Sélectionner PostgreSQL
   ```

4. **Configurer les variables**
   ```bash
   railway variables set NEXTAUTH_SECRET="votre_secret"
   railway variables set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   ```

5. **Déployer**
   ```bash
   railway up
   ```

6. **Migrations**
   ```bash
   railway run npm run db:push
   railway run npm run db:seed
   ```

---

### Option 4 : VPS (DigitalOcean, AWS, etc.)

Pour plus de contrôle, déployez sur un VPS.

#### Prérequis sur le serveur

```bash
# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib

# Installer PM2 (process manager)
sudo npm install -g pm2
```

#### Déploiement

1. **Cloner le projet**
   ```bash
   git clone votre-repo.git
   cd engy-labs-platform
   ```

2. **Installer et build**
   ```bash
   npm install
   npx prisma generate
   npm run build
   ```

3. **Configurer la BDD**
   ```bash
   # Créer la base de données
   sudo -u postgres psql
   CREATE DATABASE engy_labs;
   CREATE USER engy_user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE engy_labs TO engy_user;
   \q

   # Migrations
   npm run db:push
   npm run db:seed
   ```

4. **Lancer avec PM2**
   ```bash
   pm2 start npm --name "engy-labs" -- start
   pm2 save
   pm2 startup
   ```

5. **Nginx (reverse proxy)**
   ```nginx
   server {
       listen 80;
       server_name engylabs.sn;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL avec Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d engylabs.sn
   ```

---

## 🔐 Sécurité en Production

### Variables d'environnement

⚠️ **Ne commitez JAMAIS les fichiers `.env`**

Générez des secrets sécurisés :
```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# Autres secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Headers de sécurité

Les headers de sécurité sont configurés dans `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### HTTPS

Assurez-vous que votre site utilise HTTPS en production.

- Vercel/Render/Railway : HTTPS automatique
- VPS : Utilisez Let's Encrypt (voir ci-dessus)

---

## 📊 Monitoring et Logs

### Vercel

```bash
# Voir les logs en temps réel
vercel logs votre-app --follow
```

### PM2 (VPS)

```bash
# Logs
pm2 logs engy-labs

# Monitoring
pm2 monit

# Redémarrer
pm2 restart engy-labs
```

### Sentry (Recommandé)

Ajoutez Sentry pour le monitoring des erreurs :

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🔄 Mises à jour

### Déploiement automatique (CI/CD)

**GitHub Actions** (exemple) :

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Migrations de BDD

```bash
# Créer une migration
npx prisma migrate dev --name add_new_feature

# Appliquer en production
npx prisma migrate deploy
```

---

## 🧪 Tester le Déploiement

1. **Vérifier l'accès**
   ```bash
   curl https://votre-domaine.com
   ```

2. **Tester les API**
   ```bash
   curl https://votre-domaine.com/api/formations
   ```

3. **Vérifier la BDD**
   ```bash
   npx prisma studio
   ```

4. **Performance**
   - [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)

---

## 📝 Checklist de Déploiement

Avant de mettre en production :

- [ ] Variables d'environnement configurées
- [ ] Base de données migrée
- [ ] Données de seed ajoutées (optionnel)
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Webhook Stripe configuré
- [ ] Domaine personnalisé configuré
- [ ] Analytics configuré (Google Analytics)
- [ ] Monitoring configuré (Sentry)
- [ ] Backups de BDD automatisés
- [ ] Tests effectués en staging
- [ ] Documentation à jour

---

## 🆘 Résolution de Problèmes

### Build Failed

```bash
# Nettoyer et rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Error

```bash
# Vérifier l'URL
echo $DATABASE_URL

# Tester la connexion
npx prisma db push
```

### 500 Internal Server Error

```bash
# Vérifier les logs
vercel logs
# ou
pm2 logs
```

---

## 📞 Support

Besoin d'aide pour le déploiement ?

- 📧 Email : tech@engylabs.sn
- 📚 Documentation : [docs.engylabs.sn](https://docs.engylabs.sn)

---

**Bon déploiement ! 🚀 🇸🇳**
