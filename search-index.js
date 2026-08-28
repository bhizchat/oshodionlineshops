// Unified product search index, built client-side from the existing data files:
// - shops/shops-data.js (global `shops`) -> real products for fabrics & electronics shops
// - pages/category-products-data.js (global `categoryPageMeta`) -> static demo products
//   for clothing, foodstuffs and accessories (categories without real shop entries yet)
//
// This file must be loaded AFTER both data files and BEFORE search.js.
// It exposes a single flat array on window.searchIndex containing PRODUCTS ONLY
// (no shops as standalone results), so search results are always individual products.

(function () {
  // A product image is only considered "real" if it's a non-empty string that
  // isn't a generic picsum.photos stock-photo placeholder (those return an
  // unrelated random photo on every request, not an actual product photo).
  function hasRealImage(image) {
    return typeof image === 'string' && image.trim() !== '' && image.indexOf('picsum.photos') === -1;
  }

  function buildSearchIndex() {
    const index = [];

    // 1) Real shop products (fabrics & electronics today, extensible to any shop key)
    if (typeof shops !== 'undefined' && shops) {
      Object.keys(shops).forEach((shopKey) => {
        const shop = shops[shopKey];
        (shop.products || []).forEach((product, productIndex) => {
          if (!hasRealImage(product.image)) return;
          index.push({
            id: `shop-${shopKey}-${productIndex}`,
            name: product.name,
            shop: shop.name,
            category: shop.category,
            location: shop.location,
            price: product.price,
            image: product.image,
            score: product.score,
            count: product.count,
            shopKey: shopKey,
            productIndex: productIndex,
            source: 'shop'
          });
        });
      });
    }

    // 2) Static demo products for categories without real shop data yet
    if (typeof categoryPageMeta !== 'undefined' && categoryPageMeta) {
      Object.keys(categoryPageMeta).forEach((catKey) => {
        const meta = categoryPageMeta[catKey];
        (meta.products || []).forEach((product, productIndex) => {
          if (!hasRealImage(product.image)) return;
          index.push({
            id: `cat-${catKey}-${productIndex}`,
            name: product.name,
            shop: product.shop,
            category: catKey,
            location: product.location,
            price: product.price,
            image: product.image,
            score: product.score,
            count: product.count,
            tag: product.tag,
            catKey: catKey,
            productIndex: productIndex,
            source: 'category'
          });
        });
      });
    }

    window.searchIndex = index;
  }

  buildSearchIndex();
})();
