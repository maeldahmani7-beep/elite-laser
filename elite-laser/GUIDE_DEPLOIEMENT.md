# 📱 Guide de déploiement — Elite Laser PWA
## Comment mettre l'app en ligne et l'installer sur iPhone

---

## 🎯 Ce que tu vas obtenir

Une **Progressive Web App (PWA)** hébergée gratuitement sur Vercel.
Tes clients pourront l'installer sur leur iPhone comme une vraie app depuis Safari.
Durée totale : **environ 20 minutes**.

---

## ÉTAPE 1 — Créer un compte GitHub (gratuit)
*GitHub est le service qui va stocker ton code*

1. Va sur **https://github.com**
2. Clique sur **"Sign up"**
3. Crée ton compte avec ton email
4. Confirme ton email

---

## ÉTAPE 2 — Mettre le projet sur GitHub

1. Une fois connecté sur GitHub, clique sur le **"+"** en haut à droite
2. Clique sur **"New repository"**
3. Nom du repository : `elite-laser`
4. Laisse tout par défaut, clique **"Create repository"**
5. Sur la page suivante, clique sur **"uploading an existing file"**
6. **Glisse-dépose TOUS les fichiers** du dossier `elite-laser` que tu as téléchargé
7. Clique sur **"Commit changes"** (bouton vert en bas)

---

## ÉTAPE 3 — Créer un compte Vercel (gratuit)
*Vercel va héberger ton app gratuitement*

1. Va sur **https://vercel.com**
2. Clique sur **"Sign Up"**
3. Choisis **"Continue with GitHub"** (plus simple !)
4. Autorise Vercel à accéder à ton GitHub

---

## ÉTAPE 4 — Déployer l'app sur Vercel

1. Sur Vercel, clique sur **"Add New Project"**
2. Tu vois ton repository `elite-laser` → clique **"Import"**
3. Laisse tous les paramètres par défaut
4. Clique sur **"Deploy"** 🚀
5. Attends 2-3 minutes... ✅ C'est en ligne !

Vercel te donne une URL du type :
**`https://elite-laser-xxxx.vercel.app`**

---

## ÉTAPE 5 — Installer l'app sur iPhone 📱

Dis à tes clients de faire ça :

1. Ouvrir l'URL dans **Safari** (important : pas Chrome !)
2. Appuyer sur l'icône **Partager** (le carré avec la flèche vers le haut)
3. Défiler et appuyer sur **"Sur l'écran d'accueil"**
4. Appuyer sur **"Ajouter"**
5. L'app apparaît sur l'écran d'accueil comme une vraie app ! 🎉

---

## ÉTAPE 6 — Avoir un vrai nom de domaine (optionnel, ~10€/an)

Si tu veux une URL comme `app.elite-laser.fr` :

1. Achète le domaine sur **OVH** ou **Namecheap**
2. Dans Vercel → Settings → Domains → ajoute ton domaine
3. Suis les instructions DNS (5 minutes)

---

## 🔧 Modifier le contenu de l'app

Pour changer les textes, numéros de téléphone, adresses des cabinets :

Ouvre le fichier : `src/components/EliteLaser.tsx`

- **Adresses des cabinets** → cherche `const CABINETS`
- **Témoignages** → cherche `const TEMOIGNAGES`
- **Créneaux horaires** → cherche `SLOTS_MATIN` et `SLOTS_APREM`
- **Nom de l'app** → cherche `Elite Laser` dans `src/app/layout.tsx`

Après chaque modification sur GitHub, Vercel redéploie automatiquement en 2 minutes.

---

## ❓ Besoin d'aide ?

Si tu bloques sur une étape, prends une capture d'écran et demande à Claude !

---

## 📋 Récapitulatif des fichiers

```
elite-laser/
├── src/
│   ├── app/
│   │   ├── layout.tsx     ← balises PWA pour iPhone
│   │   └── page.tsx       ← page principale
│   └── components/
│       └── EliteLaser.tsx ← toute l'app (modifie ici)
├── public/
│   └── manifest.json      ← config PWA (icône, couleurs)
├── package.json           ← dépendances
├── next.config.js         ← config Next.js
└── tsconfig.json          ← config TypeScript
```

---

*Application développée avec Next.js 14 + React 18 + TypeScript*
*Hébergement gratuit Vercel · PWA installable iOS & Android*
