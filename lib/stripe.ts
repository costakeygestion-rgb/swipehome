// Stripe configuration for SwipeHome
// Server-side calls go through Supabase Edge Functions

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY || 'pk_test_placeholder';

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    maxListings: 1,
    features: ['1 anuncio activo', 'Estadísticas básicas', 'Chat con interesados'],
    recommended: false,
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 19,
    maxListings: 5,
    features: [
      '5 anuncios activos',
      'Estadísticas detalladas',
      'Chat prioritario',
      '1 boost incluido/mes',
    ],
    recommended: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    maxListings: -1, // unlimited
    features: [
      'Anuncios ilimitados',
      'Analytics avanzados',
      'Chat prioritario',
      '3 boosts incluidos/mes',
      'Badge verificado',
      'Soporte dedicado',
    ],
    recommended: true,
  },
  {
    id: 'agency',
    name: 'Agencia',
    price: 99,
    maxListings: -1,
    features: [
      'Todo lo de Premium',
      'Multi-usuario (5 cuentas)',
      'API de integración',
      'Boosts ilimitados',
      'Account manager',
      'Reporting personalizado',
    ],
    recommended: false,
  },
] as const;

export const BOOST_OPTIONS = [
  { id: 'boost_24h', label: '24 horas', hours: 24, price: 4.99 },
  { id: 'boost_72h', label: '3 días', hours: 72, price: 9.99 },
  { id: 'boost_7d', label: '7 días', hours: 168, price: 19.99 },
] as const;

export type PlanId = (typeof SUBSCRIPTION_PLANS)[number]['id'];
export type BoostOptionId = (typeof BOOST_OPTIONS)[number]['id'];
