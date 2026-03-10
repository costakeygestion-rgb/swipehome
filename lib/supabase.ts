import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://nkmypyzstwfnoingbfxe.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rbXlweXpzdHdmbm9pbmdiZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODExNTUsImV4cCI6MjA4ODc1NzE1NX0.b2LysU1YYXh4CPSI0Wm5RXPR5GfMbQOIB2sxSXCgZZ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
