// Supabase Edge Function: submit-review
// Deploy with: supabase functions deploy submit-review
// Required secret:   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
// Optional secret (enables bot verification once you set up Cloudflare Turnstile):
//                     supabase secrets set CLOUDFLARE_TURNSTILE_SECRET_KEY=...
//
// This function is the only allowed write path for the `reviews` table.
// Direct anon/authenticated INSERT is revoked at the database level by
// reviews-security-schema.sql, so all new reviews must flow through here.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReviewSubmission {
  shopKey: string;
  productIndex: number | string;
  reviewerName: string;
  rating: number;
  comment: string;
  honeypot?: string;
  turnstileToken?: string;
}

const KEY_PATTERN = /^[a-z0-9_-]+$/i;

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
    const payload: ReviewSubmission = await req.json();

    // 1. Honeypot check — silently accept but never persist bot submissions.
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Review submitted." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Optional server-side Cloudflare Turnstile verification.
    // Only enforced once CLOUDFLARE_TURNSTILE_SECRET_KEY is configured, so this
    // function keeps working immediately and can have bot verification turned on later.
    const turnstileSecret = Deno.env.get("CLOUDFLARE_TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
      const verifyBody = new FormData();
      verifyBody.append("secret", turnstileSecret);
      verifyBody.append("response", payload.turnstileToken || "");
      verifyBody.append("remoteip", clientIp);

      const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: verifyBody,
      });
      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        return new Response(
          JSON.stringify({ error: "Bot verification failed. Please refresh and try again." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // 3. Strict server-side validation and sanitization.
    const shopKey = String(payload.shopKey || "").trim();
    const productIndex = String(payload.productIndex ?? "").trim();
    const reviewerName = String(payload.reviewerName || "").trim().replace(/[<>]/g, "");
    const comment = String(payload.comment || "").trim().replace(/[<>]/g, "");
    const rating = Number(payload.rating);

    if (
      !KEY_PATTERN.test(shopKey) ||
      !/^[0-9]+$/.test(productIndex) ||
      reviewerName.length < 2 || reviewerName.length > 80 ||
      comment.length < 5 || comment.length > 600 ||
      isNaN(rating) || rating < 1 || rating > 5
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid form fields. Please check your input." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Insert as unapproved using the privileged service_role client.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert([{
        shop_key: shopKey,
        product_index: Number(productIndex),
        reviewer_name: reviewerName,
        rating,
        comment,
        is_approved: false,
      }])
      .select();

    if (error) {
      console.error("Database insert error:", error.message);
      return new Response(
        JSON.stringify({ error: "Database error persisting review." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you! Your review has been submitted for moderation.", review: data && data[0] }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled runtime error:", err instanceof Error ? err.message : err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
