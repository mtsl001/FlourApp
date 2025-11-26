import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// IMPORTANT: REPLACE THESE WITH YOUR ACTUAL SUPABASE PROJECT DETAILS
// Get these from your Supabase Dashboard -> Project Settings -> API
// ------------------------------------------------------------------
const SUPABASE_URL = 'https://zjgwrulrxrzfxswjbagg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZ3dydWxyeHJ6Znhzd2piYWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzQxNDIsImV4cCI6MjA3OTcxMDE0Mn0.v8gHWe8233qB8J7vgsbYbRRBByukvfyhrHCkwGrGmbM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);