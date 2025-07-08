# LuxeMarket - E-commerce Premium

## 🚀 Configuration Supabase

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte et un nouveau projet
3. Notez votre **URL du projet** et votre **clé API publique**

### 2. Configurer les variables d'environnement

Remplacez les valeurs dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-publique
```

### 3. Créer la base de données

Dans votre tableau de bord Supabase :

1. Allez dans **SQL Editor**
2. Exécutez le contenu du fichier `supabase/migrations/001_initial_schema.sql`
3. Puis exécutez `supabase/migrations/002_sample_data.sql`

### 4. Créer un compte administrateur

1. Inscrivez-vous sur le site avec votre email
2. Dans Supabase, allez dans **Table Editor** > **profiles**
3. Trouvez votre profil et changez le `role` de `user` à `admin`

## 🎯 Fonctionnalités

### ✅ Complétées
- **Authentification** : Inscription/Connexion avec Supabase Auth
- **Catalogue produits** : Affichage avec filtres et recherche
- **Page catégories** : Navigation par catégories avec compteurs
- **Panier** : Ajout/suppression/modification quantités
- **Favoris** : Système de favoris persistant
- **Admin** : Tableau de bord pour gérer produits et catégories
- **Design** : Interface moderne avec animations et effets

### 🔄 Pages disponibles
- `/` - Accueil avec hero, catégories, produits vedettes
- `/products` - Catalogue complet avec filtres
- `/categories` - Navigation par catégories
- `/admin` - Tableau de bord administrateur

### 🎨 Design Features
- Dégradés animés et effets glassmorphism
- Animations fluides et micro-interactions
- Design responsive mobile-first
- Particules flottantes et effets visuels
- Interface premium avec attention aux détails

## 🛠️ Technologies

- **Frontend** : Next.js 13, React, TypeScript
- **Styling** : Tailwind CSS, shadcn/ui
- **Backend** : Supabase (Auth, Database, RLS)
- **State** : Zustand avec persistance
- **Icons** : Lucide React

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔐 Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Politiques d'accès basées sur les rôles
- Validation des données côté client et serveur
- Protection contre les injections SQL

## 📊 Structure de la base de données

- **profiles** : Profils utilisateurs avec rôles
- **categories** : Catégories de produits
- **products** : Produits avec prix, stock, ratings
- **cart_items** : Articles dans le panier
- **favorites** : Produits favoris
- **orders** : Commandes
- **order_items** : Articles des commandes

## 🎯 Prochaines étapes

Pour compléter le site e-commerce :

1. **Système de commandes** : Processus de checkout complet
2. **Paiement Stripe** : Intégration des paiements
3. **Gestion des commandes** : Suivi et historique
4. **Profil utilisateur** : Page de gestion du compte
5. **Notifications** : Système d'alertes en temps réel
6. **Recherche avancée** : Filtres et tri améliorés
7. **Reviews** : Système d'avis clients
8. **Wishlist** : Liste de souhaits avancée

Le site est maintenant fonctionnel avec toutes les bases d'un e-commerce moderne !