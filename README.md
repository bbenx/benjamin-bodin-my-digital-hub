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

Le dépôt utilise Git LFS pour les fichiers vidéo (`.mov` source iPhone, `.mp4` H.264 servi sur le site). Dans le tableau Vercel du projet : **Settings → Git**, activer **Git Large File Storage (LFS)**, puis lancer un **Redeploy** pour que la vidéo soit bien incluse dans le build.

Pour une nouvelle prise iPhone : exporter ou transcoder en **H.264 / AAC** dans un `.mp4` (pas seulement du HEVC dans un `.mov`), sinon la lecture échoue hors Safari.
