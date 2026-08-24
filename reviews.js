// Reviews module backed by Supabase (see supabase-config.js for client setup).
// Reviews are keyed by shopKey + productIndex, matching product.html's URL params.

async function fetchProductReviews(shopKey, productIndex) {
  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .eq('shop_key', shopKey)
    .eq('product_index', productIndex)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch reviews:', error.message);
    return [];
  }
  return data;
}

// New reviews are written through the submit-review Edge Function rather than
// a direct table insert, since anon INSERT on `reviews` is revoked at the
// database level (see reviews-security-schema.sql). The function validates
// input, checks a honeypot field, optionally verifies Cloudflare Turnstile,
// and stores the review as unapproved (is_approved = false) for moderation.
async function submitProductReview(shopKey, productIndex, { reviewerName, rating, comment, honeypot, turnstileToken, imageUrls }) {
  try {
    const response = await fetch(SUPABASE_SUBMIT_REVIEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        shopKey,
        productIndex,
        reviewerName,
        rating,
        comment,
        honeypot: honeypot || '',
        turnstileToken: turnstileToken || '',
        imageUrls: Array.isArray(imageUrls) ? imageUrls : []
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Failed to submit review:', result.error || response.statusText);
      return null;
    }

    return result.review || { reviewer_name: reviewerName, rating, comment, created_at: new Date().toISOString() };
  } catch (error) {
    console.error('Failed to submit review:', error.message);
    return null;
  }
}

// Records a "was this review helpful" vote via the vote-review Edge Function,
// which atomically increments helpful_yes/helpful_no using the service_role
// client (anon UPDATE on `reviews` is revoked, same as inserts). Pass
// `previousVote` when the visitor is switching their vote (yes<->no) so the
// prior choice is undone atomically server-side. Returns the updated counts
// on success or null on failure.
async function voteReviewHelpful(reviewId, vote, previousVote) {
  try {
    const response = await fetch(SUPABASE_VOTE_REVIEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ reviewId, vote, previousVote: previousVote || '' })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Failed to record vote:', result.error || response.statusText);
      return null;
    }

    return { helpfulYes: result.helpfulYes, helpfulNo: result.helpfulNo };
  } catch (error) {
    console.error('Failed to record vote:', error.message);
    return null;
  }
}
