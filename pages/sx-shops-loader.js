// Strategic X shops: fetches real shop owners (from sx_shops_public) who
// completed onboarding and selected "Oshodi Market Online" as their market
// platform, and appends them to the shop directory (.shops-grid) below the
// static demo shops on each category's shop-listing page.
//
// Shared across fabrics.html, clothing-fashion.html, electronics-gadgets.html,
// foodstuffs-oils.html and accessories.html so each page only shows shops
// whose onboarding category actually matches that page — a shop created
// under "Clothing & Fashion" appears on clothing-fashion.html, not
// fabrics.html, etc. Category values must match the <option value="..."> in
// strategic-x/onboarding-step2.html's category select.
(function () {
  var CATEGORY_BY_PAGE = {
    'fabrics.html': 'fabrics',
    'clothing-fashion.html': 'fashion',
    'electronics-gadgets.html': 'electronics',
    'foodstuffs-oils.html': 'foodstuff',
    'accessories.html': 'accessories'
  };

  var pageFile = window.location.pathname.split('/').pop();
  var category = CATEGORY_BY_PAGE[pageFile];
  if (!category) return;

  (async function loadStrategicXShops() {
    try {
      var result = await supabaseClient
        .from('sx_shops_public')
        .select('*')
        .eq('category', category)
        .eq('market_platform', 'oshodi-market-online')
        .order('created_at', { ascending: false });
      if (result.error || !result.data || !result.data.length) return;

      var grid = document.querySelector('.shops-grid');
      if (!grid) return;

      result.data.forEach(function (shop) {
        var card = document.createElement('article');
        card.className = 'shop-card';

        var img = shop.banner_url || 'https://picsum.photos/300/180?random=' + Math.floor(Math.random() * 100);
        var avatar = shop.logo_url || '../assets(shops)/ETI(logo).png';
        var name = shop.shop_name || 'New Shop';
        var location = shop.location || '';
        var tagline = shop.tagline || '';

        card.innerHTML =
          '<div class="card-img-wrap">' +
            '<img src="' + img + '" alt="' + name + '" loading="lazy" decoding="async" />' +
            '<div class="fav-badge">\u2661</div>' +
          '</div>' +
          '<div class="card-content">' +
            '<div class="shop-title-row">' +
              '<img src="' + avatar + '" alt="Owner Avatar" class="shop-avatar" loading="lazy" decoding="async" />' +
              '<h2 class="shop-title">' + name + '</h2>' +
            '</div>' +
            '<div class="shop-address">\uD83D\uDCCD ' + location + '</div>' +
            (tagline ? '<div class="card-tags"><span class="mini-tag">' + tagline + '</span></div>' : '') +
            '<div class="meta-line">New shop on Oshodi Market Online</div>' +
            '<a href="../shops/shops.html?sxshop=' + shop.id + '" class="view-shop-btn">View Shop</a>' +
          '</div>';

        grid.appendChild(card);
      });
    } catch (err) {
      console.warn('Could not load Strategic X shops:', err);
    }
  })();
})();
