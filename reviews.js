// Reviews module backed by Supabase (see supabase-config.js for client setup).
// Reviews are keyed by shopKey + productIndex, matching product.html's URL params.

async function fetchProductReviews(shopKey, productIndex) {
  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .eq('shop_key', shopKey)
    .eq('product_index', productIndex)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch reviews:', error.message);
    return [];
  }
  return data;
}

async function submitProductReview(shopKey, productIndex, { reviewerName, rating, comment }) {
  const { data, error } = await supabaseClient
    .from('reviews')
    .insert([{
      shop_key: shopKey,
      product_index: productIndex,
      reviewer_name: reviewerName,
      rating,
      comment
    }])
    .select();

  if (error) {
    console.error('Failed to submit review:', error.message);
    return null;
  }
  return data && data[0];
}
