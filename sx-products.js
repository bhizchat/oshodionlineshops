// Shared helpers for rendering Strategic X vendor products (the
// `sx_products_public` read-only view) across category listing pages,
// individual shop pages, and the product detail page. Kept as one shared
// file (instead of duplicating per page) since the exact same
// formatting/escaping/fallback rules must apply everywhere this data is shown.
//
// IMPORTANT: `sx_products_public` is a read-only view (base `sx_products`
// table is owner-restricted via RLS) — only ever `.select()` from it, never
// insert/update/delete.

// Inline SVG data URI so a missing/empty `images` array never renders a
// broken <img> tag and never depends on an extra network request or asset file.
var SX_PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
  '<rect width="400" height="400" fill="#f1f3f7"/>' +
  '<g fill="#9aa3af" font-family="sans-serif" font-size="20" text-anchor="middle">' +
  '<text x="200" y="204">No image</text>' +
  '<text x="200" y="228">available</text>' +
  '</g></svg>'
);

// Formats a numeric price as Naira with thousands separators, e.g. 125000 -> "₦125,000".
function formatNaira(amount) {
  var num = Number(amount);
  if (!isFinite(num)) return '₦0';
  return '₦' + Math.round(num).toLocaleString('en-NG');
}

// Returns the first image URL from a Strategic X product's `images` array,
// or the shared placeholder if the array is missing/empty.
function sxProductThumb(images) {
  return (Array.isArray(images) && images.length > 0 && images[0]) ? images[0] : SX_PLACEHOLDER_IMAGE;
}

// Escapes text before it's inserted via innerHTML template strings. Vendor-
// supplied fields (product_name, description, tags, shop_name) are
// user-controlled input from the Strategic X portal, so they must never be
// interpolated into innerHTML unescaped (stored XSS risk).
function escapeHtml(str) {
  return String(str === null || str === undefined ? '' : str).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

// Fetches aggregated review stats (count + average rating) for a batch of
// Strategic X product ids from the shared `reviews` table (see reviews.js
// and shops/sx-product.html). Reviews for these products are keyed by
// shop_key = lowercased product uuid, product_index = 0 — there is no
// separate reviews table/view for Strategic X products. Only approved
// reviews are readable by anon (enforced by RLS in
// reviews-security-schema.sql), so no extra is_approved filter is required
// here. Returns a plain object keyed by lowercased product id -> { count,
// avg }; products with zero reviews are simply absent from the result
// (never fabricated), so callers should treat a missing key as "no reviews
// yet" rather than defaulting to any score.
async function fetchSxReviewStats(client, productIds) {
  var stats = {};
  var ids = Array.from(new Set((productIds || []).map(function (id) { return String(id).toLowerCase(); }))).filter(Boolean);
  if (!ids.length) return stats;
  try {
    var result = await client
      .from('reviews')
      .select('shop_key, rating')
      .eq('product_index', 0)
      .in('shop_key', ids);
    if (result.error || !result.data) return stats;
    result.data.forEach(function (row) {
      var key = row.shop_key;
      if (!stats[key]) stats[key] = { count: 0, total: 0 };
      stats[key].count += 1;
      stats[key].total += Number(row.rating) || 0;
    });
    Object.keys(stats).forEach(function (key) {
      stats[key].avg = stats[key].total / stats[key].count;
    });
  } catch (err) {
    console.warn('Could not load Strategic X product review stats:', err);
  }
  return stats;
}
