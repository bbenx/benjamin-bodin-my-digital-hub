# benjaminbodin.fr

Site Vite + React.

## Prérequis

- Node 22 (voir `package.json`)
- [Git LFS](https://git-lfs.com/) : après un clone, exécuter `git lfs install` puis `git lfs pull` si les fichiers dans `public/videos/` sont des pointeurs (fichiers très petits).

## Développement

```bash
npm ci
npm run dev
```

## Déploiement (Vercel)

Le dépôt utilise Git LFS pour la vidéo de démo (`.mov`). Dans le tableau Vercel du projet : **Settings → Git**, activer **Git Large File Storage (LFS)**, puis lancer un **Redeploy** pour que la vidéo soit bien incluse dans le build.
