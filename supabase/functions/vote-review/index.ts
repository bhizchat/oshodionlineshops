// Supabase Edge Function: vote-review
// Deploy with: supabase functions deploy vote-review --no-verify-jwt
// Required secret: SUPABASE_SERVICE_ROLE_KEY (auto-provisioned for every function
// on this project, same as submit-review).
//
// This function is the only allowed write path for the reviews.helpful_yes /
// reviews.helpful_no counters. Direct anon/authenticated UPDATE on `reviews` is
// revoked at the database level (see reviews-security-schema.sql), so votes must
// flow through here, which increments atomically via the
// public.increment_review_vote() Postgres function (see
// reviews-helpful-votes-schema.sql). Callers may pass `previousVote` when a
// visitor is switching their vote (Yes -> No or vice versa); the Postgres
// function undoes the previous choice and applies the new one atomically.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface VoteSubmission {
  reviewId: string;
  vote: string;
  previousVote?: string;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
    const payload: VoteSubmission = await req.json();

    const reviewId = String(payload.reviewId || "").trim();
    const vote = String(payload.vote || "").trim().toLowerCase();
    const previousVoteRaw = payload.previousVote ? String(payload.previousVote).trim().toLowerCase() : "";
    const previousVote = previousVoteRaw === "yes" || previousVoteRaw === "no" ? previousVoteRaw : null;

    if (
      !UUID_PATTERN.test(reviewId) ||
      (vote !== "yes" && vote !== "no") ||
      (previousVoteRaw && previousVote === null)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid vote request." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data, error } = await supabaseAdmin
      .rpc("increment_review_vote", { p_review_id: reviewId, p_vote: vote, p_previous_vote: previousVote });

    if (error) {
      console.error("Vote increment error:", error.message);
      return new Response(
        JSON.stringify({ error: "Database error recording vote." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const row = Array.isArray(data) ? data[0] : data;

    if (!row) {
      return new Response(
        JSON.stringify({ error: "Review not found." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, helpfulYes: row.helpful_yes, helpfulNo: row.helpful_no }),
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
