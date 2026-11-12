# Le site rentrerchezsoi.com

Site temporaire de la chaîne « Rentrer chez soi » : une page d'accueil et les mentions légales.
Fait le 12 novembre 2026. HTML et CSS écrits à la main, sans framework, sans JavaScript, sans
cookie ni mesure d'audience (donc pas de bandeau de consentement).

**Rien n'est en ligne.** Le dossier a un dépôt git local, sans dépôt GitHub, sans push, et les DNS
de Spaceship n'ont pas été touchés. La mise en ligne se fait seulement sur ordre de Pierre.

## Ce qu'il y a dans le dossier

| Fichier | Rôle |
|---|---|
| `index.html` | la page d'accueil |
| `mentions-legales.html` | les mentions légales (obligatoires en France) |
| `style.css` | l'habillage : bleu nuit, crème, lumière ambrée, titres en Georgia |
| `images/maison.jpg` | la maison de l'accueil (480 × 480) |
| `images/partage.jpg` | l'image affichée quand on partage le lien (1200 × 630) |
| `favicon.ico`, `favicon-32.png`, `icone-192.png`, `apple-touch-icon.png` | les icônes |
| `images.js` | fabrique toutes les images ci-dessus à partir de `../visuels/` |
| `CNAME` | le domaine pour GitHub Pages : `rentrerchezsoi.com` |
| `robots.txt`, `sitemap.xml` | pour les moteurs de recherche |
| `.nojekyll` | dit à GitHub Pages de servir les fichiers tels quels |

## Remplacer les images (quand la session « Visuels » aura fini)

Les images du site sont **fabriquées** à partir de `../visuels/profil.png` (la maison, carrée) et
`../visuels/banniere-youtube.png` (2560 × 1440). Le dossier `visuels/` n'est jamais modifié.
Une fois les nouveaux visuels déposés sous les mêmes noms, une seule commande, depuis ce dossier :

    node images.js

Elle refait la maison, les icônes et l'image de partage (il faut `ffmpeg`, déjà installé).
Si les nouveaux fichiers ont d'autres noms, changer les deux noms en haut de `images.js`.
L'image de partage est le centre de la bannière YouTube : le dessin et le nom doivent y être centrés.

## Avant la mise en ligne

1. **Mentions légales** : remplir les deux champs « À compléter » de `mentions-legales.html`
   (SIRET et adresse de l'éditeur). La loi (LCEN, article 6) demande, pour un professionnel, son
   nom, son adresse et son numéro d'immatriculation. Si Pierre ne veut pas publier son adresse
   personnelle, il peut prendre une adresse de domiciliation.
2. **Adresse de contact** : vérifier que `contact@rentrerchezsoi.com` reçoit bien le courrier.

## Mettre en ligne (seulement sur ordre de Pierre)

Même méthode que scancam.app : GitHub Pages, gratuit, HTTPS fourni par GitHub.

### 1. Le dépôt GitHub

1. Sur github.com (compte `Pierre-TROCHET`), créer un dépôt **public** nommé `rentrerchezsoi-site`,
   vide (sans README, sans licence).
2. Depuis ce dossier :

       git remote add origin https://github.com/Pierre-TROCHET/rentrerchezsoi-site.git
       git push -u origin main

### 2. GitHub Pages

1. Dans le dépôt : **Settings → Pages**.
2. Source : **Deploy from a branch**, branche **main**, dossier **/ (root)**, Enregistrer.
3. **Custom domain** : `rentrerchezsoi.com` (déjà écrit dans le fichier `CNAME`), Enregistrer.
   GitHub affichera « DNS check unsuccessful » tant que l'étape 3 n'est pas faite : c'est normal.
4. Conseillé : dans les réglages du **compte** GitHub, **Settings → Pages → Add a domain**, vérifier
   `rentrerchezsoi.com` (GitHub donne un enregistrement TXT à ajouter chez Spaceship). Ça empêche
   quelqu'un d'autre de le prendre sur GitHub.

### 3. Les DNS chez Spaceship

Spaceship → Domain Manager → `rentrerchezsoi.com` → **DNS records** (« Advanced DNS »).

⚠️ **Ne pas toucher aux enregistrements MX et TXT (SPF) qui font marcher la redirection de
`contact@rentrerchezsoi.com`.** On ajoute seulement les lignes ci-dessous. S'il existe déjà un
enregistrement A, AAAA ou CNAME pour `@` ou `www` (page de parking de Spaceship, par exemple),
supprimer **seulement celui-là**.

| Type | Hôte | Valeur |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `pierre-trochet.github.io` |

TTL : la valeur par défaut convient. Les adresses sont celles de la documentation GitHub Pages
(« Managing a custom domain for your GitHub Pages site ») : les revérifier là au moment de le faire.

Après l'enregistrement, revérifier que les lignes **MX** et **TXT** sont toujours là, puis envoyer
un e-mail de test à `contact@rentrerchezsoi.com`.

### 4. HTTPS

Attendre que GitHub voie les DNS (de quelques minutes à quelques heures), puis dans
**Settings → Pages** cocher **Enforce HTTPS** (la case devient cochable quand le certificat est prêt).

### 5. Vérifier

- https://rentrerchezsoi.com/ et https://www.rentrerchezsoi.com/ (doit renvoyer vers le premier)
- https://rentrerchezsoi.com/mentions-legales.html
- Coller l'adresse dans le débogueur de partage de Facebook pour voir l'image de partage.
- Ajouter le site dans les profils YouTube et Facebook (et plus tard TikTok, Instagram).
- Optionnel : déclarer le site dans Google Search Console avec `sitemap.xml`.

Ensuite, chaque modification se publie par un `git push` sur `main` (une minute environ).

## Activer TikTok ou Instagram

Dans `index.html`, section « Retrouve « Rentrer chez soi » », les deux réseaux à venir sont des
blocs `<span class="reseau bientot">`. Pour en activer un :

1. remplacer `<span class="reseau bientot">` par
   `<a class="reseau" href="https://www.tiktok.com/@rentrerchezsoi" rel="noopener">`
   (Instagram : `https://www.instagram.com/rentrerchezsoi/`) ;
2. remplacer le `</span>` qui ferme ce bloc (juste avant `</li>`) par `</a>` ;
3. remplacer `Bientôt` par `@rentrerchezsoi` ;
4. ajouter l'adresse dans la liste `sameAs` du bloc `application/ld+json`, en haut du fichier.

## L'inscription « bientôt »

Le bloc « La lettre » n'a pas de formulaire. Le jour où une lettre existera (Brevo, Substack…),
mettre le bouton ou le lien du service dans ce bloc et le dire dans les mentions légales
(données collectées, service utilisé).
