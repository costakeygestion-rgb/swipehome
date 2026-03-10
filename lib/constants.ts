export const Colors = {
  background: '#FAFAF8',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#888888',
  textMuted: '#BBBBBB',
  border: '#F0F0EC',

  // Verticales
  vacation: '#FF6B35',
  rent: '#4ECDC4',
  buy: '#7B68EE',

  // Acciones
  like: '#10B981',
  pass: '#FF3B5C',

  // CTA
  cta: '#1A1A2E',
  ctaText: '#FFFFFF',

  // Premium
  premium: '#F5A623',

  // Chat
  chatBubbleUser: '#1A1A2E',
  chatBubbleOther: '#F0F0EC',
} as const;

export const PropertyTypeLabels: Record<string, string> = {
  vacation: 'Vacacional',
  rent: 'Alquiler',
  buy: 'Compra',
};

export const PropertyTypeColors: Record<string, string> = {
  vacation: Colors.vacation,
  rent: Colors.rent,
  buy: Colors.buy,
};

export const PriceUnitLabels: Record<string, string> = {
  night: '/noche',
  month: '/mes',
  sale: '',
};

export const AmenityIcons: Record<string, string> = {
  wifi: 'wifi',
  pool: 'water',
  ac: 'snowflake',
  parking: 'car',
  terrace: 'sun',
  garden: 'flower',
  gym: 'dumbbell',
  pets: 'paw',
  washer: 'washing-machine',
  kitchen: 'utensils',
  tv: 'tv',
  beach: 'umbrella-beach',
  elevator: 'arrow-up',
  furnished: 'couch',
  storage: 'archive',
  security: 'shield-check',
};

export const SWIPE_THRESHOLD = 120;
export const ROTATION_FACTOR = 0.06;

export const FILTER_PRICE_RANGES = {
  vacation: [
    { label: 'Todas', min: 0, max: Infinity },
    { label: '<100€', min: 0, max: 100 },
    { label: '100-200€', min: 100, max: 200 },
    { label: '200-350€', min: 200, max: 350 },
    { label: '>350€', min: 350, max: Infinity },
  ],
  rent: [
    { label: 'Todas', min: 0, max: Infinity },
    { label: '<600€', min: 0, max: 600 },
    { label: '600-1000€', min: 600, max: 1000 },
    { label: '1000-1500€', min: 1000, max: 1500 },
    { label: '>1500€', min: 1500, max: Infinity },
  ],
  buy: [
    { label: 'Todas', min: 0, max: Infinity },
    { label: '<150K', min: 0, max: 150000 },
    { label: '150-300K', min: 150000, max: 300000 },
    { label: '300-500K', min: 300000, max: 500000 },
    { label: '>500K', min: 500000, max: Infinity },
  ],
} as const;

export const ZONES = [
  'Todas',
  'Alicante',
  'Valencia',
  'Cádiz',
  'Tarragona',
  'Murcia',
  'Málaga',
] as const;
