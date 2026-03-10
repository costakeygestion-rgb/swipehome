# SwipeHome - Bitácora de Desarrollo

## 2026-03-10 — Sesión 1: Fase 1 MVP completa

### Decisiones tomadas
- **Stack**: React Native + Expo SDK 55, Expo Router, Supabase, Zustand, Reanimated 4, Gesture Handler 2.30
- **Repo GitHub**: https://github.com/costakeygestion-rgb/swipehome (público)
- **Supabase project**: `nkmypyzstwfnoingbfxe` (West EU - Ireland)
- **Template**: `blank-typescript` con TypeScript strict
- **Desarrollo**: Expo Go por simplicidad

### Lo que se ha construido (Fase 1 completa)

#### Infraestructura
1. Proyecto Expo creado y configurado para Expo Router
2. Supabase proyecto creado, linkeado y migraciones aplicadas
3. Base de datos con 9 tablas: profiles, properties, swipes, matches, messages, subscriptions, boosts, service_requests, reviews
4. RLS completo en todas las tablas + trigger auto-creación de perfil en signup
5. Repo GitHub con CI ready

#### Dependencias instaladas
- `expo-router`, `expo-linking`, `expo-constants`, `expo-status-bar`
- `react-native-safe-area-context`, `react-native-screens`
- `react-native-gesture-handler`, `react-native-reanimated`
- `expo-image`, `expo-linear-gradient`, `expo-font`, `expo-blur`, `@expo/vector-icons`
- `@supabase/supabase-js`, `zustand`, `@react-native-async-storage/async-storage`
- `react-native-url-polyfill`, `react-native-web`

#### Archivos creados (42 archivos, 4207 líneas)

**Lib (`lib/`)**
- `constants.ts` — Colores, rangos de filtros, zonas, config de swipe
- `types.ts` — Todos los tipos TypeScript (Property, Match, Profile, Filters, etc.)
- `supabase.ts` — Cliente Supabase con AsyncStorage para persistencia
- `seedData.ts` — 12 propiedades ficticias en zonas de Costa Key

**Stores (`stores/`)**
- `authStore.ts` — Estado de sesión y perfil (Zustand)
- `filterStore.ts` — Filtros activos: tipo, zona, precio, habitaciones
- `propertyStore.ts` — Stack de propiedades, índice actual, IDs swipeados
- `matchStore.ts` — Lista de matches, popup state

**Hooks (`hooks/`)**
- `useAuth.ts` — Login, registro, logout, auto-fetch de perfil
- `useProperties.ts` — Carga y filtrado de propiedades, ordenación boosted>featured>reciente
- `useMatches.ts` — Swipe right/left handlers, gestión de matches

**Componentes (`components/`)**
- `SwipeCard.tsx` — Card principal con PanGesture, rotación, labels ME GUSTA/PASO, galería por tap, gradiente, badges
- `FilterPanel.tsx` — Bottom sheet con filtros tipo/zona/precio/habitaciones
- `MatchPopup.tsx` — Overlay animado con spring scale
- `ui/Button.tsx` — Botón con variantes primary/outline/ghost y sizes
- `ui/Badge.tsx` — Pill de tipo con color
- `ui/Input.tsx` — Input con label y error

**Pantallas (`app/`)**
- `_layout.tsx` — Root layout con GestureHandlerRootView + Stack navigator
- `(tabs)/_layout.tsx` — Tab bar: Descubrir, Matches, Mensajes, Perfil (iconos Ionicons)
- `(tabs)/index.tsx` — **Pantalla SWIPE**: header con zona + filtros, stack de cards, botones acción
- `(tabs)/matches.tsx` — Lista de matches con imagen, precio, specs
- `(tabs)/messages.tsx` — Placeholder con empty state
- `(tabs)/profile.tsx` — Perfil tipo Settings iOS con secciones agrupadas
- `property/[id].tsx` — Detalle modal: galería, specs, amenities, gestor, CTA contactar
- `(auth)/login.tsx` — Login con email/password
- `(auth)/register.tsx` — Registro con nombre/email/password

**Base de datos (`supabase/`)**
- `migrations/00001_initial_schema.sql` — Schema completo con RLS y triggers

### Fixes aplicados
- React 19.2.0 → 19.2.4 (conflicto peer dep con react-dom)
- `react-native-url-polyfill/dist/polyfill` → `/auto` (v3 cambió exports)
- Eliminado `App.tsx`, entry point cambiado a `expo-router/entry`

### Estado actual
- **TypeScript**: Compila sin errores (`tsc --noEmit`)
- **Web export**: Build exitoso (1380 módulos, 2.9MB bundle)
- **Git**: Todo pusheado a `main` en GitHub

### Próximos pasos (Fases pendientes)
- **Fase 2**: Stripe para suscripciones + sistema de boost
- **Fase 3**: Chat en tiempo real (Supabase Realtime) + push notifications
- **Fase 4**: Servicios Costa Key + calculadora hipoteca

### Notas técnicas
- Expo SDK 55 = React 19.2.4 + React Native 0.83.2
- El import de url-polyfill en v3 es `react-native-url-polyfill/auto`
- Variables de entorno: `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Supabase DB password: `SwipeHome2026!`
- Los datos seed están en `lib/seedData.ts` (local), no en Supabase (aún)
