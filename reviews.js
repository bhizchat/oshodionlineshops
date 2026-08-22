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
async function submitProductReview(shopKey, productIndex, { reviewerName, rating, comment, honeypot, turnstileToken }) {
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
        turnstileToken: turnstileToken || ''
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
