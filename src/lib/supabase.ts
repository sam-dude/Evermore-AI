import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oketcasrvkqeylrsrbsd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZXRjYXNydmtxZXlscnNyYnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyOTM0MTYsImV4cCI6MjEwMzg2OTQxNn0.Z0gwcYvHQycNsnKP4pY0VRkcJufEjP9kaj__ct8B0Z4';

export const isSupabaseConfigured = () => {
  return (
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('your-project.supabase.co') &&
    SUPABASE_ANON_KEY.length > 30
  );
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
