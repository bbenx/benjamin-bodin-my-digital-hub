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

Le dépôt utilise Git LFS pour les lourds **`.mov`** (sources iPhone). Le **`.mp4` de la bande démo** est versionné en Git classique (toujours sous la limite 100 Mo de GitHub) : Vercel ne remplace pas toujours les pointeurs LFS par le fichier réel, ce qui cassait la lecture. Un **Redeploy** suffit après un `git push` du MP4.

Pour une nouvelle prise iPhone : exporter ou transcoder en **H.264 / AAC** dans un `.mp4` (pas seulement du HEVC dans un `.mov`), sinon la lecture échoue hors Safari.
