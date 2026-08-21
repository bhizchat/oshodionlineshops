// Supabase project configuration for Oshodi Online Shops
// The anon/public key is safe to expose in client-side code; access is
// restricted by Row Level Security policies configured on the `reviews` table.
const SUPABASE_URL = 'https://dehvyonajwgiqpowpdnu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaHZ5b25handnaXFwb3dwZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNTY5MTcsImV4cCI6MjEwMjczMjkxN30.XPH2_aZ2TzpN7IAO25oKb0j-uvAPF1kLDRNKoCgI490';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
