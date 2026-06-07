import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://gvpqpraxvgbcbticquyg.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cHFwcmF4dmdiY2J0aWNxdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3ODMwNTIsImV4cCI6MjA5NjM1OTA1Mn0.Wy5vBUTWnaLK03wnufQ6zzP5toAMzb1wAhmUxLdKY7A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
