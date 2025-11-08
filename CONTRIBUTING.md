# 🤝 Guide de Contribution - ENGY LABS Platform

Merci de votre intérêt pour contribuer à ENGY LABS ! Ce document vous guidera à travers le processus de contribution.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Structure du Projet](#structure-du-projet)
- [Standards de Code](#standards-de-code)
- [Processus de Pull Request](#processus-de-pull-request)
- [Signaler un Bug](#signaler-un-bug)
- [Proposer une Fonctionnalité](#proposer-une-fonctionnalité)

## 📜 Code de Conduite

Ce projet respecte un code de conduite. En participant, vous vous engagez à maintenir un environnement respectueux et accueillant pour tous.

## 🚀 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub puis clone votre fork
git clone https://github.com/votre-username/engy-labs-platform.git
cd engy-labs-platform
```

### 2. Créer une Branche

```bash
# Créer une branche pour votre fonctionnalité ou correction
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-du-bug
```

### 3. Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer la base de données
npx prisma db push
npm run db:seed
```

### 4. Développer

Faites vos modifications en respectant les [standards de code](#standards-de-code).

### 5. Tester

```bash
# Lancer le serveur de développement
npm run dev

# Vérifier le linting
npm run lint

# TODO: Lancer les tests
npm run test
```

### 6. Commit

Utilisez des messages de commit clairs et descriptifs :

```bash
# Format recommandé
git commit -m "feat: ajout du système de notation des formations"
git commit -m "fix: correction du bug de paiement Stripe"
git commit -m "docs: mise à jour du README"
```

**Préfixes de commit :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, indentation
- `refactor:` Refactorisation du code
- `test:` Ajout ou modification de tests
- `chore:` Maintenance, dépendances

### 7. Push et Pull Request

```bash
# Push vers votre fork
git push origin feature/ma-nouvelle-fonctionnalite
```

Ensuite, créez une Pull Request sur GitHub.

## 📁 Structure du Projet

```
engy-labs-platform/
├── src/
│   ├── app/              # Pages et API routes (Next.js App Router)
│   │   ├── [locale]/    # Pages multilingues
│   │   └── api/         # Endpoints API
│   ├── components/      # Composants React réutilisables
│   │   ├── ui/         # Composants UI de base
│   │   └── layout/     # Composants de layout
│   ├── lib/            # Utilitaires et configurations
│   ├── i18n/           # Fichiers de traduction
│   └── types/          # Types TypeScript
├── prisma/             # Schéma et migrations de base de données
└── public/             # Assets statiques
```

## 💻 Standards de Code

### TypeScript

- Utilisez TypeScript pour tout nouveau code
- Définissez des types explicites
- Évitez `any`, utilisez `unknown` si nécessaire

```typescript
// ✅ Bon
interface User {
  id: string
  name: string
  email: string
}

// ❌ Éviter
const user: any = { ... }
```

### React Components

- Utilisez les composants fonctionnels avec hooks
- Préférez les Server Components quand possible (Next.js 14)
- Utilisez 'use client' uniquement si nécessaire

```tsx
// ✅ Server Component (par défaut)
export default function MyPage() {
  return <div>Content</div>
}

// ✅ Client Component (si nécessaire)
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={...}>Click</button>
}
```

### Styling

- Utilisez Tailwind CSS pour le styling
- Utilisez la fonction `cn()` pour combiner les classes
- Respectez les couleurs du design system

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)}>
```

### Nommage

- **Fichiers** : kebab-case (`user-profile.tsx`)
- **Composants** : PascalCase (`UserProfile`)
- **Fonctions** : camelCase (`getUserData`)
- **Constants** : UPPER_SNAKE_CASE (`API_URL`)

### Imports

Organisez vos imports dans cet ordre :

```typescript
// 1. Imports externes
import { useState } from 'react'
import Link from 'next/link'

// 2. Imports internes
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. Imports relatifs
import styles from './component.module.css'
```

## 🔄 Processus de Pull Request

### Checklist avant de soumettre

- [ ] Le code compile sans erreurs
- [ ] Le linting passe (`npm run lint`)
- [ ] Les tests passent (quand disponibles)
- [ ] La documentation est à jour
- [ ] Les messages de commit sont clairs
- [ ] Le code respecte les standards
- [ ] Les traductions FR/EN sont complètes (si applicable)

### Description de la PR

Incluez dans votre PR :

1. **Résumé** : Décrivez brièvement les changements
2. **Motivation** : Pourquoi ces changements sont nécessaires
3. **Tests** : Comment avez-vous testé les changements
4. **Screenshots** : Si applicable, ajoutez des captures d'écran
5. **Breaking Changes** : Listez les changements incompatibles

**Template de PR :**

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester
1. Étape 1
2. Étape 2

## Screenshots (si applicable)

## Checklist
- [ ] Le code suit les standards du projet
- [ ] J'ai testé mes modifications
- [ ] J'ai mis à jour la documentation
```

## 🐛 Signaler un Bug

Pour signaler un bug, [créez une issue](https://github.com/votre-repo/issues/new) avec :

- **Titre** : Résumé clair du bug
- **Description** : Explication détaillée
- **Étapes de reproduction** : Comment reproduire le bug
- **Comportement attendu** : Ce qui devrait se passer
- **Comportement actuel** : Ce qui se passe réellement
- **Environnement** : OS, navigateur, version de Node.js
- **Screenshots** : Si applicable

## 💡 Proposer une Fonctionnalité

Pour proposer une nouvelle fonctionnalité :

1. Vérifiez qu'elle n'existe pas déjà dans les issues
2. Créez une nouvelle issue avec le tag `enhancement`
3. Décrivez :
   - Le problème que cela résout
   - La solution proposée
   - Des alternatives considérées
   - L'impact sur les utilisateurs

## 📝 Documentation

Toute contribution doit inclure la documentation nécessaire :

- Commentaires dans le code pour les parties complexes
- Mise à jour du README si nécessaire
- Documentation API pour les nouveaux endpoints
- Mise à jour des fichiers de traduction

## 🌍 Traductions

Les contributions de traduction sont bienvenues !

- Français : `src/i18n/fr.json`
- English : `src/i18n/en.json`

Assurez-vous que :
- Les clés sont identiques dans les deux fichiers
- Les traductions sont naturelles et contextuelles
- Le ton est professionnel mais accessible

## 🎨 Design

Pour les contributions visuelles :

- Respectez l'identité visuelle sénégalaise
- Utilisez les couleurs du design system
- Assurez-vous que l'interface est responsive
- Testez sur mobile, tablette et desktop

## ❓ Questions

Si vous avez des questions :

- Consultez la [documentation](./README.md)
- Consultez les [issues existantes](https://github.com/votre-repo/issues)
- Créez une nouvelle issue avec le tag `question`
- Contactez-nous : contact@engylabs.sn

## 🙏 Merci !

Merci de contribuer à ENGY LABS ! Chaque contribution, petite ou grande, aide à renforcer l'écosystème tech sénégalais. 🇸🇳

---

**Fait avec ❤️ par la communauté ENGY LABS**
