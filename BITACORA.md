# SwipeHome - Bitácora de Desarrollo

## 2026-03-10 — Sesión 1: Inicio del proyecto

### Decisiones tomadas
- **Stack elegido**: React Native + Expo SDK 55, Expo Router, Supabase, Zustand, Reanimated 4, Gesture Handler 2.30
- **Repo GitHub**: https://github.com/costakeygestion-rgb/swipehome (público)
- **Template**: `blank-typescript` con TypeScript strict
- **Desarrollo**: Expo Go por simplicidad (no development build por ahora)

### Progreso
1. Proyecto Expo creado con `create-expo-app`
2. Dependencias instaladas:
   - `expo-router`, `expo-linking`, `expo-constants`, `expo-status-bar`
   - `react-native-safe-area-context`, `react-native-screens`
   - `react-native-gesture-handler`, `react-native-reanimated`
   - `expo-image`, `expo-linear-gradient`, `expo-font`, `@expo/vector-icons`
   - `@supabase/supabase-js`, `zustand`, `@react-native-async-storage/async-storage`
   - `react-native-url-polyfill`
3. Fix: React actualizado de 19.2.0 → 19.2.4 para resolver conflicto de peer dependency con react-dom
4. Estructura de carpetas creada según el diseño del prompt
5. Archivos fundacionales creados:
   - `lib/constants.ts` — Colores, configuración, rangos de filtros, zonas
   - `lib/types.ts` — Todos los tipos TypeScript del proyecto
   - `lib/supabase.ts` — Cliente Supabase con AsyncStorage para persistencia
6. `app.json` configurado: scheme, bundleIdentifier, package, background color #FAFAF8

### En progreso
- Fase 1 MVP: Creando stores, hooks, componentes y pantallas

### Estructura del proyecto
```
swipehome/
├── app/           # Expo Router (file-based routing)
│   ├── (auth)/    # Login, register, onboarding
│   ├── (tabs)/    # Tab navigator: swipe, matches, messages, profile
│   ├── property/  # Detalle de propiedad
│   ├── services/  # Servicios Costa Key
│   └── owner/     # Panel propietario
├── components/    # Componentes reutilizables
│   └── ui/        # Componentes base (Button, Input, etc.)
├── lib/           # Utilidades, cliente Supabase, tipos, constantes
├── hooks/         # Custom hooks
├── stores/        # Zustand stores
└── supabase/      # Migraciones SQL, Edge Functions, seed data
```

### Notas técnicas
- Expo SDK 55 usa React 19.2.4 y React Native 0.83.2
- Supabase requiere `react-native-url-polyfill` en React Native
- Variables de entorno: `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`
