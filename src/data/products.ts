import { z } from 'astro/zod';

const ProductSchema = z.object({
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, 'slug must be lowercase alphanumeric with hyphens')
    .refine(s => !s.startsWith('avis-') && !s.startsWith('meilleur-'), {
      message: 'slug cannot start with reserved prefix avis- or meilleur-',
    }),
  name: z.string(),
  brand: z.string(),
  category: z.enum(['prostate', 'connectes']),
  affiliateUrl: z.string()
    .refine(u => u === '#' || u.startsWith('https://'), {
      message: 'affiliateUrl must be "#" or a https:// URL',
    })
    .default('#'),
  affiliateProgram: z.string(),
  tagline: z.string(),
  description: z.string(),
  priceRange: z.string(),
  rating: z.number().min(0).max(10),
  pros: z.array(z.string()).min(2),
  cons: z.array(z.string()).min(1),
  targetAudience: z.string(),
  features: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  ratings: z.array(z.object({ label: z.string(), score: z.number().min(0).max(10) })),
  image: z.string().optional(),
  alternatives: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

const productsRaw = [
  // ── Lovense ── Prostate
  {
    slug: 'lovense-edge-2',
    name: 'Lovense Edge 2',
    brand: 'Lovense',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'Masseur prostatique connecte avec double moteur ajustable',
    description: "Le Lovense Edge 2 est un masseur prostatique connecte haut de gamme avec un bras ajustable pour un positionnement personnalise. Son double moteur offre des vibrations puissantes controlables via l'appli Lovense Remote, a distance ou en solo. Ideal pour les debutants comme les utilisateurs experimentes grace a sa forme ergonomique.",
    priceRange: '90-110 EUR',
    rating: 8.5,
    pros: [
      'Bras ajustable pour un positionnement personnalise',
      'Double moteur puissant et silencieux',
      'Appli Lovense Remote avec controle longue distance',
      'Autonomie correcte (environ 1h)',
    ],
    cons: [
      'Temps de charge un peu long (environ 1h30)',
      'Appli necessaire pour acceder a tous les modes',
    ],
    targetAudience: 'Debutants et intermediaires cherchant un masseur prostatique connecte polyvalent',
    features: [
      { label: 'Type', value: 'Masseur prostatique vibrant' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h' },
      { label: 'Charge', value: 'USB magnetique' },
    ],
    ratings: [
      { label: 'Confort', score: 8 },
      { label: 'Puissance', score: 8.5 },
      { label: 'Connectivite', score: 9 },
      { label: 'Rapport qualite/prix', score: 8 },
    ],
    alternatives: ['we-vibe-vector', 'lelo-hugo', 'lovense-hush-2'],
  },
  {
    slug: 'lovense-hush-2',
    name: 'Lovense Hush 2',
    brand: 'Lovense',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'Plug anal connecte compact et puissant',
    description: "Le Lovense Hush 2 est un plug anal vibrant connecte, compact mais surprenant par sa puissance. Compatible avec l'appli Lovense Remote pour un controle a distance illimite. Sa taille compacte le rend portable et discret, ideal pour une utilisation prolongee.",
    priceRange: '50-70 EUR',
    rating: 7.5,
    pros: [
      'Compact et discret, ideal pour le port prolonge',
      'Vibrations puissantes malgre la taille',
      'Controle a distance via Lovense Remote',
    ],
    cons: [
      'Pas specifiquement concu pour la prostate (plug generique)',
      'Taille limitee pour les utilisateurs experimentes',
    ],
    targetAudience: 'Curieux souhaitant un plug anal connecte abordable et polyvalent',
    features: [
      { label: 'Type', value: 'Plug anal vibrant' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h30' },
      { label: 'Tailles', value: '25mm / 38mm / 44mm' },
    ],
    ratings: [
      { label: 'Confort', score: 7.5 },
      { label: 'Puissance', score: 7 },
      { label: 'Connectivite', score: 9 },
      { label: 'Rapport qualite/prix', score: 8.5 },
    ],
    alternatives: ['lovense-edge-2', 'aneros-helix-syn'],
  },
  // ── We-Vibe ── Prostate
  {
    slug: 'we-vibe-vector',
    name: 'We-Vibe Vector',
    brand: 'We-Vibe',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'We-Vibe / WOW Tech',
    tagline: 'Masseur prostatique premium a double stimulation',
    description: "Le We-Vibe Vector est un masseur prostatique haut de gamme offrant une double stimulation (prostate + perinee). Sa tete flexible s'adapte a l'anatomie, tandis que ses 2 moteurs independants proposent 10+ modes de vibration. Compatible avec l'appli We-Connect pour un controle a distance.",
    priceRange: '120-150 EUR',
    rating: 8.0,
    pros: [
      'Double stimulation prostate + perinee',
      'Tete flexible qui s\'adapte a l\'anatomie',
      'Vibrations puissantes et variees (10+ modes)',
      'Design premium et materiaux nobles',
    ],
    cons: [
      'Prix eleve par rapport a la concurrence',
      'Appli We-Connect parfois instable',
    ],
    targetAudience: 'Utilisateurs intermediaires a avances cherchant une stimulation prostatique premium',
    features: [
      { label: 'Type', value: 'Masseur prostatique vibrant' },
      { label: 'Connectivite', value: 'Bluetooth + appli We-Connect' },
      { label: 'Materiaux', value: 'Silicone medical premium' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~2h' },
      { label: 'Moteurs', value: '2 moteurs independants' },
    ],
    ratings: [
      { label: 'Confort', score: 8.5 },
      { label: 'Puissance', score: 8 },
      { label: 'Connectivite', score: 7.5 },
      { label: 'Rapport qualite/prix', score: 7 },
    ],
    alternatives: ['lovense-edge-2', 'lelo-hugo', 'lelo-billy-2'],
  },
  // ── Aneros ── Prostate
  {
    slug: 'aneros-helix-syn',
    name: 'Aneros Helix Syn',
    brand: 'Aneros',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Aneros',
    tagline: 'Le classique du massage prostatique sans vibration',
    description: "L'Aneros Helix Syn est le modele emblematique d'Aneros pour la decouverte du plaisir prostatique. Sans vibration, il fonctionne par les contractions musculaires naturelles du corps. Recouvert de silicone Velvet Touch pour un confort optimal. Un classique recommande par les experts.",
    priceRange: '50-70 EUR',
    rating: 8.0,
    pros: [
      'Approche unique sans vibration (contractions naturelles)',
      'Silicone Velvet Touch ultra-confortable',
      'Pas besoin de batterie ni de charge',
      'Excellent pour apprendre le plaisir prostatique',
    ],
    cons: [
      'Courbe d\'apprentissage : necessite patience et pratique',
      'Pas de vibration (peut decevoir les habitues)',
    ],
    targetAudience: 'Debutants motivés cherchant une approche naturelle du plaisir prostatique',
    features: [
      { label: 'Type', value: 'Masseur prostatique non-vibrant' },
      { label: 'Connectivite', value: 'Aucune (mecanique)' },
      { label: 'Materiaux', value: 'Plastique + silicone Velvet Touch' },
      { label: 'Entretien', value: 'Lavage eau + savon' },
      { label: 'Taille', value: 'Standard (ideal debutant)' },
    ],
    ratings: [
      { label: 'Confort', score: 9 },
      { label: 'Efficacite', score: 7.5 },
      { label: 'Facilite utilisation', score: 6.5 },
      { label: 'Rapport qualite/prix', score: 8.5 },
    ],
    alternatives: ['aneros-progasm', 'lovense-edge-2'],
  },
  {
    slug: 'aneros-progasm',
    name: 'Aneros Progasm',
    brand: 'Aneros',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Aneros',
    tagline: 'Masseur prostatique avance pour sensations intenses',
    description: "L'Aneros Progasm est le modele le plus volumineux de la gamme Aneros, concu pour les utilisateurs experimentes. Sa taille genereuse et sa forme optimisee exercent une pression directe sur la prostate. Comme tous les Aneros, il fonctionne sans vibration par contractions musculaires.",
    priceRange: '55-75 EUR',
    rating: 7.5,
    pros: [
      'Sensations intenses grace a la taille genereuse',
      'Pression directe et precise sur la prostate',
      'Pas besoin de batterie',
    ],
    cons: [
      'Reserve aux utilisateurs experimentes (taille importante)',
      'Courbe d\'apprentissage encore plus prononcee',
    ],
    targetAudience: 'Utilisateurs experimentes souhaitant des sensations prostatiques plus intenses',
    features: [
      { label: 'Type', value: 'Masseur prostatique non-vibrant' },
      { label: 'Connectivite', value: 'Aucune (mecanique)' },
      { label: 'Materiaux', value: 'Plastique medical poli' },
      { label: 'Taille', value: 'Large (utilisateurs experimentes)' },
    ],
    ratings: [
      { label: 'Confort', score: 6.5 },
      { label: 'Efficacite', score: 8.5 },
      { label: 'Facilite utilisation', score: 5.5 },
      { label: 'Rapport qualite/prix', score: 7.5 },
    ],
    alternatives: ['aneros-helix-syn', 'lelo-hugo'],
  },
  // ── LELO ── Prostate
  {
    slug: 'lelo-hugo',
    name: 'LELO Hugo',
    brand: 'LELO',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'LELO',
    tagline: 'Le luxe absolu en stimulation prostatique',
    description: "Le LELO Hugo est le fleuron de la gamme prostatique LELO. Avec sa telecommande sans fil SenseMotion, ses 2 moteurs puissants et son design sculptural, c'est l'un des masseurs prostatiques les plus haut de gamme du marche. Sensations intenses et finition luxueuse.",
    priceRange: '180-220 EUR',
    rating: 8.5,
    pros: [
      'Finition luxueuse et design sculptural',
      'Telecommande SenseMotion intuitive',
      'Double moteur puissant et silencieux',
      '8 modes de vibration sophistiques',
    ],
    cons: [
      'Prix tres eleve',
      'Pas de connectivite appli (telecommande uniquement)',
    ],
    targetAudience: 'Utilisateurs exigeants cherchant le haut de gamme en stimulation prostatique',
    features: [
      { label: 'Type', value: 'Masseur prostatique vibrant' },
      { label: 'Connectivite', value: 'Telecommande sans fil SenseMotion' },
      { label: 'Materiaux', value: 'Silicone medical FDA' },
      { label: 'Etanche', value: '100% etanche' },
      { label: 'Autonomie', value: '~2h' },
      { label: 'Modes', value: '8 modes de vibration' },
    ],
    ratings: [
      { label: 'Confort', score: 9 },
      { label: 'Puissance', score: 8.5 },
      { label: 'Design', score: 9.5 },
      { label: 'Rapport qualite/prix', score: 6.5 },
    ],
    alternatives: ['we-vibe-vector', 'lovense-edge-2', 'lelo-billy-2'],
  },
  {
    slug: 'lelo-billy-2',
    name: 'LELO Billy 2',
    brand: 'LELO',
    category: 'prostate' as const,
    affiliateUrl: '#',
    affiliateProgram: 'LELO',
    tagline: 'Stimulateur prostatique LELO accessible et elegant',
    description: "Le LELO Billy 2 est l'entree de gamme premium de LELO pour la stimulation prostatique. Plus compact et abordable que le Hugo, il offre neanmoins la qualite de fabrication LELO avec un design courbe ergonomique et 8 modes de vibration.",
    priceRange: '80-110 EUR',
    rating: 7.5,
    pros: [
      'Design elegant et ergonomique typique LELO',
      'Plus abordable que le Hugo',
      '8 modes de vibration',
    ],
    cons: [
      'Pas de connectivite (ni appli, ni telecommande)',
      'Puissance limitee par rapport aux concurrents',
    ],
    targetAudience: 'Debutants cherchant un premier masseur prostatique de qualite',
    features: [
      { label: 'Type', value: 'Masseur prostatique vibrant' },
      { label: 'Connectivite', value: 'Aucune (boutons)' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: '100% etanche' },
      { label: 'Autonomie', value: '~2h' },
      { label: 'Modes', value: '8 modes de vibration' },
    ],
    ratings: [
      { label: 'Confort', score: 8 },
      { label: 'Puissance', score: 7 },
      { label: 'Design', score: 8.5 },
      { label: 'Rapport qualite/prix', score: 7 },
    ],
    alternatives: ['lelo-hugo', 'aneros-helix-syn', 'lovense-edge-2'],
  },
  // ── Lovense ── Connectes
  {
    slug: 'lovense-lush-3',
    name: 'Lovense Lush 3',
    brand: 'Lovense',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'L\'oeuf vibrant connecte le plus populaire au monde',
    description: "Le Lovense Lush 3 est l'oeuf vibrant connecte le plus vendu au monde, et pour cause : moteur puissant, design discret, connexion Bluetooth longue portee, et controle a distance illimite via l'appli Lovense Remote. Ideal pour les couples a distance comme pour le jeu en public.",
    priceRange: '70-90 EUR',
    rating: 9.0,
    pros: [
      'Moteur ultra-puissant pour un oeuf vibrant',
      'Connexion Bluetooth longue portee fiable',
      'Appli Lovense Remote tres complete',
      'Design discret et silencieux',
    ],
    cons: [
      'Antenne apparente (esthetique discutable)',
      'Uniquement pour stimulation interne',
    ],
    targetAudience: 'Couples a distance ou en recherche de jeux connectes discrets',
    features: [
      { label: 'Type', value: 'Oeuf vibrant connecte' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~3-5h' },
      { label: 'Portee', value: 'Illimitee (via Internet)' },
    ],
    ratings: [
      { label: 'Puissance', score: 9 },
      { label: 'Connectivite', score: 9.5 },
      { label: 'Discretion', score: 8 },
      { label: 'Rapport qualite/prix', score: 9 },
    ],
    alternatives: ['satisfyer-love-triangle', 'we-vibe-chorus', 'lovense-nora'],
  },
  {
    slug: 'lovense-gush-2',
    name: 'Lovense Gush 2',
    brand: 'Lovense',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'Masturbateur masculin connecte avec compression ajustable',
    description: "Le Lovense Gush 2 est un masturbateur masculin connecte avec sangle de compression ajustable. Controlable a distance via l'appli Lovense Remote, il offre une experience personnalisable grace a ses niveaux de pression reglables. Design compact et discret.",
    priceRange: '80-100 EUR',
    rating: 7.5,
    pros: [
      'Compression ajustable pour personnaliser les sensations',
      'Controle a distance illimite via appli',
      'Compact et facile a nettoyer',
    ],
    cons: [
      'Sensations moins realistes qu\'un masturbateur classique',
      'Design un peu basique pour le prix',
    ],
    targetAudience: 'Hommes cherchant un masturbateur connecte pour jeux a distance',
    features: [
      { label: 'Type', value: 'Masturbateur masculin connecte' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h30' },
      { label: 'Reglage', value: 'Compression ajustable' },
    ],
    ratings: [
      { label: 'Puissance', score: 7.5 },
      { label: 'Connectivite', score: 9 },
      { label: 'Confort', score: 7 },
      { label: 'Rapport qualite/prix', score: 7 },
    ],
    alternatives: ['lovense-max-2', 'lovense-lush-3'],
  },
  {
    slug: 'lovense-max-2',
    name: 'Lovense Max 2',
    brand: 'Lovense',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'Masturbateur automatique connecte avec vibration et contraction',
    description: "Le Lovense Max 2 est un masturbateur automatique connecte proposant a la fois des vibrations et des contractions Air Pump. Synchronisable avec le Nora pour une experience de couple a distance immersive. L'un des rares masturbateurs vraiment interactifs du marche.",
    priceRange: '100-130 EUR',
    rating: 7.0,
    pros: [
      'Double sensation vibration + contraction Air Pump',
      'Synchronisation avec Nora pour couples',
      'Controle a distance illimite',
    ],
    cons: [
      'Volume sonore plus eleve que la concurrence',
      'Manchon d\'insertion un peu rigide',
      'Nettoyage fastidieux',
    ],
    targetAudience: 'Couples heterosexuels a distance cherchant une experience interactive',
    features: [
      { label: 'Type', value: 'Masturbateur automatique connecte' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'ABS + TPE' },
      { label: 'Technologie', value: 'Vibration + Air Pump' },
      { label: 'Autonomie', value: '~1h' },
      { label: 'Compatibilite', value: 'Sync avec Lovense Nora' },
    ],
    ratings: [
      { label: 'Puissance', score: 7 },
      { label: 'Connectivite', score: 9 },
      { label: 'Realisme', score: 6.5 },
      { label: 'Rapport qualite/prix', score: 6.5 },
    ],
    alternatives: ['lovense-gush-2', 'lovense-nora'],
  },
  {
    slug: 'lovense-nora',
    name: 'Lovense Nora',
    brand: 'Lovense',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Lovense',
    tagline: 'Vibromasseur rabbit connecte avec tete rotative',
    description: "Le Lovense Nora est un vibromasseur rabbit connecte avec tete rotative motorisee. Synchronisable avec le Max 2 pour une experience de couple a distance. Sa tete rotative offre une stimulation interne unique, combinee a un stimulateur clitoridien externe.",
    priceRange: '100-120 EUR',
    rating: 8.0,
    pros: [
      'Tete rotative motorisee (stimulation unique)',
      'Double stimulation interne + clitoridienne',
      'Synchronisation avec Max 2 pour couples',
      'Design elegant et discret',
    ],
    cons: [
      'Bras clitoridien un peu rigide',
      'Moins puissant que certains concurrents',
    ],
    targetAudience: 'Femmes et couples cherchant un vibromasseur connecte polyvalent',
    features: [
      { label: 'Type', value: 'Vibromasseur rabbit connecte' },
      { label: 'Connectivite', value: 'Bluetooth + appli Lovense Remote' },
      { label: 'Materiaux', value: 'Silicone medical + ABS' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~2h' },
      { label: 'Technologie', value: 'Tete rotative + vibration' },
    ],
    ratings: [
      { label: 'Puissance', score: 7.5 },
      { label: 'Connectivite', score: 9 },
      { label: 'Polyvalence', score: 8.5 },
      { label: 'Rapport qualite/prix', score: 7.5 },
    ],
    alternatives: ['lovense-lush-3', 'we-vibe-chorus', 'lovense-max-2'],
  },
  // ── We-Vibe ── Connectes
  {
    slug: 'we-vibe-melt',
    name: 'We-Vibe Melt',
    brand: 'We-Vibe',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'We-Vibe / WOW Tech',
    tagline: 'Stimulateur clitoridien a air pulse connecte',
    description: "Le We-Vibe Melt est un stimulateur clitoridien a technologie Air Pulse (ondes de pression) connecte via l'appli We-Connect. Il combine la stimulation par air pulse avec le controle a distance, une combinaison rare sur le marche. Design compact et elegant.",
    priceRange: '100-130 EUR',
    rating: 8.0,
    pros: [
      'Technologie Air Pulse + connectivite (rare combinaison)',
      'Stimulation clitoridienne intense sans contact direct',
      'Design compact et premium',
    ],
    cons: [
      'Prix eleve pour un stimulateur clitoridien',
      'Appli We-Connect parfois instable',
    ],
    targetAudience: 'Femmes et couples cherchant un stimulateur clitoridien connecte premium',
    features: [
      { label: 'Type', value: 'Stimulateur clitoridien Air Pulse' },
      { label: 'Connectivite', value: 'Bluetooth + appli We-Connect' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h30' },
      { label: 'Intensites', value: '12 niveaux' },
    ],
    ratings: [
      { label: 'Puissance', score: 8.5 },
      { label: 'Connectivite', score: 7.5 },
      { label: 'Innovation', score: 9 },
      { label: 'Rapport qualite/prix', score: 7 },
    ],
    alternatives: ['satisfyer-love-triangle', 'we-vibe-chorus'],
  },
  {
    slug: 'we-vibe-chorus',
    name: 'We-Vibe Chorus',
    brand: 'We-Vibe',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'We-Vibe / WOW Tech',
    tagline: 'Vibromasseur de couple connecte haut de gamme',
    description: "Le We-Vibe Chorus est un vibromasseur pour couple a porter pendant l'amour. Sa forme ajustable s'adapte a chaque morphologie et sa telecommande Touch-Sense reagit a la pression. Compatible We-Connect pour le controle a distance. Le haut de gamme des vibromasseurs de couple.",
    priceRange: '150-180 EUR',
    rating: 8.5,
    pros: [
      'Forme ajustable a chaque morphologie',
      'Telecommande Touch-Sense innovante',
      'Controle a distance via We-Connect',
      'Utilisable pendant les rapports',
    ],
    cons: [
      'Prix tres eleve',
      'Positionnement parfois delicat',
    ],
    targetAudience: 'Couples cherchant un vibromasseur premium utilisable pendant les rapports',
    features: [
      { label: 'Type', value: 'Vibromasseur de couple' },
      { label: 'Connectivite', value: 'Bluetooth + appli We-Connect + telecommande' },
      { label: 'Materiaux', value: 'Silicone medical' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h30' },
      { label: 'Technologie', value: 'Touch-Sense + forme ajustable' },
    ],
    ratings: [
      { label: 'Puissance', score: 8 },
      { label: 'Connectivite', score: 8 },
      { label: 'Innovation', score: 9 },
      { label: 'Rapport qualite/prix', score: 7 },
    ],
    alternatives: ['lovense-lush-3', 'we-vibe-melt', 'lovense-nora'],
  },
  // ── Satisfyer ── Connectes
  {
    slug: 'satisfyer-love-triangle',
    name: 'Satisfyer Love Triangle',
    brand: 'Satisfyer',
    category: 'connectes' as const,
    affiliateUrl: '#',
    affiliateProgram: 'Satisfyer',
    tagline: 'Stimulateur clitoridien Air Pulse connecte abordable',
    description: "Le Satisfyer Love Triangle combine la technologie Air Pulse brevetee de Satisfyer avec la connectivite via l'appli Satisfyer Connect. Le meilleur rapport qualite/prix du marche pour un stimulateur clitoridien connecte. Design triangulaire ergonomique et discret.",
    priceRange: '40-55 EUR',
    rating: 8.0,
    pros: [
      'Prix imbattable pour un stimulateur connecte',
      'Technologie Air Pulse efficace et brevetee',
      'Appli Satisfyer Connect fonctionnelle',
      'Design discret et compact',
    ],
    cons: [
      'Finition moins premium que We-Vibe ou LELO',
      'Bluetooth parfois capricieux',
    ],
    targetAudience: 'Femmes cherchant un stimulateur connecte abordable sans compromis sur l\'efficacite',
    features: [
      { label: 'Type', value: 'Stimulateur clitoridien Air Pulse' },
      { label: 'Connectivite', value: 'Bluetooth + appli Satisfyer Connect' },
      { label: 'Materiaux', value: 'Silicone + ABS' },
      { label: 'Etanche', value: 'IPX7' },
      { label: 'Autonomie', value: '~1h' },
      { label: 'Modes', value: '11 Air Pulse + vibration' },
    ],
    ratings: [
      { label: 'Puissance', score: 8 },
      { label: 'Connectivite', score: 7 },
      { label: 'Design', score: 7.5 },
      { label: 'Rapport qualite/prix', score: 9.5 },
    ],
    alternatives: ['we-vibe-melt', 'lovense-lush-3'],
  },
];

// ── Validation ──

const parsed = productsRaw.map((p, i) => {
  try {
    const result = ProductSchema.parse(p);
    // Auto-derive image from slug if not explicitly set
    if (!result.image) {
      result.image = `/images/products/${result.slug}.png`;
    }
    return result;
  } catch (e) {
    throw new Error(`Product at index ${i} ("${p.slug}") validation failed: ${e}`);
  }
});

// Duplicate slug detection
const allSlugs = new Set<string>();
for (const p of parsed) {
  if (allSlugs.has(p.slug)) throw new Error(`Duplicate product slug: "${p.slug}"`);
  allSlugs.add(p.slug);
}

// Alternatives validation
for (const p of parsed) {
  const seen = new Set<string>();
  for (const alt of p.alternatives) {
    if (!allSlugs.has(alt)) throw new Error(`Product "${p.slug}": alternative "${alt}" not found`);
    if (alt === p.slug) throw new Error(`Product "${p.slug}": self-reference in alternatives`);
    if (seen.has(alt)) throw new Error(`Product "${p.slug}": duplicate alternative "${alt}"`);
    seen.add(alt);
  }
}

// ── Exports ──

export const products: Product[] = parsed;
export const productsBySlug = new Map(products.map(p => [p.slug, p]));
export const getByCategory = (cat: Product['category']) => products.filter(p => p.category === cat);
