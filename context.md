# IntimeLab — Contexte projet

## Objectif
Site d'affiliation educatif sur le plaisir intime. Hub educatif (pas Wirecutter). 2 niches : Prostate/Masculin + Sextoys Connectes/LDD.

## Stack
- **Framework** : Astro 5.18 + TailwindCSS 4.2
- **Hebergement** : Cloudflare Pages (`wrangler pages deploy dist/ --project-name intimelab`)
- **Deploiement** : `npx astro build && wrangler pages deploy dist/ --project-name intimelab`
- **Domaine** : intimelab.fr (pas encore connecte), preview sur intimelab.pages.dev
- **Images** : generees via nano-banana-pro (Gemini), pas de photos produit reelles
- **Fonts** : system fonts only (Lighthouse 100)
- **GitHub** : https://github.com/La-Gamblure/intimelab

## Palette couleurs (adult industry standard)
- Accent : `#7B2D8E` violet profond → hover `#9B3FB0`
- Rose : `#D4507A`
- Or : `#C9A84C`
- Texte : `#1A1A2E` bleu-nuit
- Fond : `#FAFAFE` blanc perle
- Bordures : `#E4E0EE` lavande
- **IMPORTANT** : PAS de brun/terracotta (association excrements), PAS de teal medical

## Architecture
```
src/
├── pages/
│   ├── index.astro                         ← Homepage immersive
│   ├── recommandations/index.astro         ← Hub produits (all categories)
│   ├── prostate/index.astro                ← Category listing
│   ├── prostate/[...slug].astro            ← Article pages (editorial)
│   ├── prostate/meilleur-masseur-prostatique.astro ← Comparatif
│   ├── prostate/avis-[slug].astro          ← Review pages (7 products)
│   ├── connectes/index.astro
│   ├── connectes/[...slug].astro
│   ├── connectes/meilleur-sextoy-connecte.astro    ← Comparatif
│   ├── connectes/avis-[slug].astro         ← Review pages (7 products)
│   └── go/[...slug].astro                  ← Affiliate redirects (noindex)
├── layouts/
│   ├── BaseLayout.astro                    ← HTML shell
│   ├── ArticleLayout.astro                 ← Article wrapper (breadcrumbs, TOC, prose)
│   └── AffiliateLayout.astro               ← Affiliate wrapper (breadcrumbs, disclosure, jsonld)
├── components/
│   ├── Header.astro                        ← Sticky nav, mobile menu
│   ├── Footer.astro                        ← Multi-column footer
│   ├── TOC.astro                           ← Collapsible table of contents
│   ├── ArticleCard.astro                   ← Article teaser card
│   ├── AffiliateDisclosure.astro           ← Disclosure banner
│   ├── CTAButton.astro                     ← CTA button (disabled if URL=#)
│   ├── ProsConsList.astro                  ← 2-column pros/cons
│   ├── ProductRatingGrid.astro             ← Rating bars
│   ├── ProductCard.astro                   ← Hub product card
│   ├── ProductRankCard.astro               ← Ranked card (comparatifs)
│   └── ProductDetailBlock.astro            ← Detail section (comparatifs)
├── data/
│   └── products.ts                         ← Registre 14 produits (Zod-validated)
├── content/
│   ├── prostate/plaisir-prostatique-guide-debutant.md
│   └── connectes/sextoy-longue-distance-guide-couples.md
├── plugins/
│   ├── rehype-table-wrapper.mjs
│   └── rehype-table-pills.mjs
└── styles/global.css                       ← @theme tokens + prose styling
```

## Pages (36 total)
- Homepage (1) + category indexes (2) + articles (2) = 5
- Affiliate redirects /go/ (14, noindex)
- Hub /recommandations/ (1)
- Comparatifs (2): meilleur-masseur-prostatique, meilleur-sextoy-connecte
- Reviews avis-* (14): 7 prostate + 7 connectes

## Routing conventions
- `avis-*` → product review pages (reserved prefix)
- `meilleur-*` → comparatif pages (reserved prefix)
- `[...slug].astro` catch-all validates content IDs don't use reserved prefixes (build-failing)

## Systeme affiliation
- `/go/[slug]` redirects avec meta refresh + JS fallback
- Tous les liens pointent vers `#` (placeholder) — a remplacer quand programmes actifs
- Programmes cibles : Lovense, We-Vibe/WOW Tech, Satisfyer, Aneros, LELO
- noindex + exclu du sitemap
- CTAButton: rendu comme `<span>` disabled si URL=#, `<a>` sinon
- `rel="noopener sponsored"` sur tous les liens affilies

## Donnees produits (products.ts)
- 14 produits valides par Zod au top-level (build-failing)
- Champs: slug, name, brand, category, affiliateUrl, tagline, description, priceRange, rating, pros, cons, targetAudience, features, ratings, image, alternatives
- Exports: `products`, `productsBySlug` (Map), `getByCategory()`
- Validations: no duplicate slugs, no self-references in alternatives, all alternatives exist

## Decisions prises
- 1 seul site (pas 2 separes) — Lovense Hush bridge les 2 niches
- Hub educatif (pas Wirecutter) — niche avec peu de produits
- System fonts only — pas de Google Fonts CDN
- Images generees (pas de scraping produit) — copyright safe
- FAQ en HTML sans FAQPage schema — pas eligible rich results
- avis-[slug] (pas [...slug]) — Astro ne supporte pas les prefixes avec rest params
- Ranking data inline dans les comparatifs (pas dans products.ts) — separation concerns

## Prochaines etapes
- [ ] Acheter intimelab.fr + connecter DNS Cloudflare
- [ ] Pages legales (mentions, confidentialite, a-propos)
- [ ] Ecrire les 6 articles restants (briefs prets)
- [ ] S'inscrire aux programmes d'affiliation
- [ ] Remplacer les `#` par les vrais liens affilies
- [ ] Google Search Console setup
- [ ] Logo design
- [ ] Ameliorer les pages categorie index (meme style que homepage)
- [ ] Generer des images produits avec nano-banana-pro
