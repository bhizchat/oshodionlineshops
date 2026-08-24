// Supabase Edge Function: log-search
// Deploy with: supabase functions deploy log-search --no-verify-jwt
// Required secret: SUPABASE_SERVICE_ROLE_KEY (auto-provisioned for every function
// on this project, same as submit-review / vote-review).
//
// This function is the only allowed write path for the search_queries table.
// Direct anon/authenticated access is revoked at the database level (see
// search-queries-schema.sql). Records what a visitor searched for whenever
// they press Enter or click the search button, plus how many results matched.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface SearchLogSubmission {
  query: string;
  resultsCount?: number;
}

const MAX_QUERY_LENGTH = 200;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload: SearchLogSubmission = await req.json();

    const query = String(payload.query || "").trim().slice(0, MAX_QUERY_LENGTH);
    const resultsCount = Number.isFinite(payload.resultsCount)
      ? Math.max(0, Math.trunc(Number(payload.resultsCount)))
      : null;

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing search query." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error } = await supabaseAdmin
      .from("search_queries")
      .insert({ query, results_count: resultsCount });

    if (error) {
      console.error("Search log insert error:", error.message);
      return new Response(
        JSON.stringify({ error: "Database error recording search." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled runtime error:", err instanceof Error ? err.message : err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
