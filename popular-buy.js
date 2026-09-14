// Renders the "Popular buy" product grid on the homepage using only real product
// data already defined in shops/shops-data.js (fabrics, electronics, and the
// clothing/foodstuffs/accessories demo shops). No placeholder/fabricated products
// are used. Selects 24 non-fabrics products (all of them) plus 166 fabrics products
// (evenly sampled across all fabric shops for variety) for a total of 190 products.

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderPopularBuy(options) {
  const depthPrefix = (options && options.depthPrefix) || '';
  const containerId = (options && options.containerId) || 'popular-buy-grid';
  const container = document.getElementById(containerId);

  if (!container || typeof shops === 'undefined') return;

  const TARGET_TOTAL = 190;
  const FABRICS_TARGET = 166;

  const buckets = { electronics: [], clothing: [], foodstuffs: [], accessories: [], fabrics: [] };

  Object.keys(shops).forEach((shopKey) => {
    const shop = shops[shopKey];
    if (!shop || !Array.isArray(shop.products) || !buckets[shop.category]) return;

    shop.products.forEach((product, index) => {
      if (!product || !product.image || !product.name) return;
      buckets[shop.category].push({
        name: product.name,
        price: product.price,
        image: product.image,
        shopKey: shopKey,
        productIndex: index
      });
    });
  });

  // Evenly sample the fabrics pool across all fabric shops for variety instead of
  // taking the first N items (which would over-represent a single shop).
  let fabricsSample = buckets.fabrics;
  if (fabricsSample.length > FABRICS_TARGET) {
    const step = fabricsSample.length / FABRICS_TARGET;
    const sampled = [];
    for (let i = 0; i < FABRICS_TARGET; i++) {
      sampled.push(fabricsSample[Math.floor(i * step)]);
    }
    fabricsSample = sampled;
  }

  // Round-robin across categories so the grid shows a mix of categories rather
  // than one category dumped after another.
  const queues = [
    buckets.electronics.slice(),
    buckets.clothing.slice(),
    buckets.foodstuffs.slice(),
    buckets.accessories.slice(),
    fabricsSample.slice()
  ];

  const selected = [];
  let addedThisRound = true;
  while (addedThisRound && selected.length < TARGET_TOTAL) {
    addedThisRound = false;
    for (let q = 0; q < queues.length && selected.length < TARGET_TOTAL; q++) {
      if (queues[q].length) {
        selected.push(queues[q].shift());
        addedThisRound = true;
      }
    }
  }

  function resolveImage(rawImage) {
    if (!rawImage) return '';
    return depthPrefix === '' ? rawImage.replace(/^\.\.\//, '') : rawImage;
  }

  container.innerHTML = selected.map((item) => {
    const href = depthPrefix + 'shops/product.html?shop=' + encodeURIComponent(item.shopKey) + '&product=' + item.productIndex;
    const img = escapeHtml(resolveImage(item.image));
    const name = escapeHtml(item.name);
    const price = escapeHtml(item.price);
    return (
      '<a class="popular-card" href="' + href + '">' +
        '<img class="popular-card-image" src="' + img + '" alt="' + name + '" loading="lazy" decoding="async" />' +
        '<div class="popular-card-body">' +
          '<div class="popular-card-name">' + name + '</div>' +
          '<div class="popular-card-price">' + price + '</div>' +
        '</div>' +
      '</a>'
    );
  }).join('');
}
