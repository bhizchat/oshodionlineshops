// Supabase project configuration for Oshodi Online Shops
// The anon/public key is safe to expose in client-side code; access is
// restricted by Row Level Security policies configured on the `reviews` table.
const SUPABASE_URL = 'https://dehvyonajwgiqpowpdnu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaHZ5b25handnaXFwb3dwZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNTY5MTcsImV4cCI6MjEwMjczMjkxN30.XPH2_aZ2TzpN7IAO25oKb0j-uvAPF1kLDRNKoCgI490';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// Edge Function endpoint that mediates all new review submissions (see
// supabase/functions/submit-review/index.ts). Direct anon INSERT on the
// reviews table is revoked by reviews-security-schema.sql.
const SUPABASE_SUBMIT_REVIEW_URL = `${SUPABASE_URL}/functions/v1/submit-review`;

// Edge Function endpoint that records "was this review helpful" votes (see
// supabase/functions/vote-review/index.ts). Direct anon UPDATE on the reviews
// table is revoked, same as inserts.
const SUPABASE_VOTE_REVIEW_URL = `${SUPABASE_URL}/functions/v1/vote-review`;

// Optional: set this once you create a Cloudflare Turnstile widget for the
// review form. Leave blank until then; bot verification stays off server-side
// until CLOUDFLARE_TURNSTILE_SECRET_KEY is configured as a Supabase secret.
const TURNSTILE_SITE_KEY = '';
