// Fabrique les images du site à partir de ../visuels (sans jamais y toucher).
//
//   node images.js
//
// À relancer chaque fois que visuels/profil.png ou visuels/banniere-youtube.png change.
// Il faut ffmpeg dans le PATH (déjà installé sur l'ordinateur de Pierre).

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const visuels = path.join(__dirname, '..', 'visuels');
const sortie = path.join(__dirname, 'images');
fs.mkdirSync(sortie, { recursive: true });

const profil = path.join(visuels, 'profil.png');           // carré, la maison
const banniere = path.join(visuels, 'banniere-youtube.png'); // 16:9, la maison + le nom

for (const f of [profil, banniere]) {
  if (!fs.existsSync(f)) { console.error('Introuvable : ' + f); process.exit(1); }
}

function ffmpeg(entree, filtre, fichier, extra = []) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', entree, '-vf', filtre, ...extra, fichier]);
  const ko = Math.round(fs.statSync(fichier).size / 1024);
  console.log('  ' + path.relative(__dirname, fichier) + '  (' + ko + ' Ko)');
}

const carre = n => `scale=${n}:${n}:flags=lanczos`;

console.log('Images fabriquées :');
// La maison de l'accueil (affichée à 220 px au plus, 2x pour les écrans Retina).
ffmpeg(profil, carre(480), path.join(sortie, 'maison.jpg'), ['-q:v', '3']);
// Icônes du navigateur et du téléphone.
ffmpeg(profil, carre(192), path.join(__dirname, 'icone-192.png'));
ffmpeg(profil, carre(180), path.join(__dirname, 'apple-touch-icon.png'));
ffmpeg(profil, carre(32), path.join(__dirname, 'favicon-32.png'));
ffmpeg(profil, carre(48), path.join(__dirname, 'favicon.ico'));
// Image de partage (Facebook, WhatsApp, X…) : 1200 × 630, centrée sur la bannière YouTube.
ffmpeg(banniere, 'scale=1200:675:flags=lanczos,crop=1200:630', path.join(sortie, 'partage.jpg'), ['-q:v', '3']);
