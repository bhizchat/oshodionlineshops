// Shared client-side search UI: live autocomplete dropdown + full results page navigation.
// Depends on window.searchIndex being built already by search-index.js (loaded just before
// this file, which itself is loaded after shops-data.js and category-products-data.js).
//
// Works on every page: hooks into the existing `.search-input` / `.search-btn` markup
// without needing any HTML changes, and injects its own dropdown styles.

(function () {
  // ---- Path resolution -----------------------------------------------------
  // This script is included as either "search.js" (site root) or "../search.js"
  // (one level down: main/, pages/, shops/). We reuse that same prefix to build
  // correct links to shops/product.html and pages/category-products.html /
  // pages/search-results.html from any page, regardless of folder depth.
  var scriptEl = document.currentScript;
  var scriptSrc = (scriptEl && scriptEl.getAttribute('src')) || 'search.js';
  var ROOT_PREFIX = scriptSrc.indexOf('../') === 0 ? '../' : '';

  function siteUrl(rootRelativePath) {
    return ROOT_PREFIX + rootRelativePath;
  }

  // ---- Small helpers (duplicated on purpose, matching existing codebase pattern) ----
  function hashString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  function formatPriceRange(priceStr, seedKey) {
    var num = parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10);
    if (!num) return priceStr;
    var seed = hashString(seedKey || priceStr);
    var variance = 0.08 + (seed % 10) / 100;
    var low = Math.round((num * (1 - variance)) / 100) * 100;
    var high = Math.round((num * (1 + variance)) / 100) * 100;
    return 'N' + low.toLocaleString() + ' - ' + high.toLocaleString();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightMatch(name, query) {
    var escaped = escapeHtml(name);
    var q = query.trim();
    if (!q) return escaped;
    var idx = escaped.toLowerCase().indexOf(escapeHtml(q).toLowerCase());
    if (idx === -1) return escaped;
    return (
      escaped.slice(0, idx) +
      '<mark>' + escaped.slice(idx, idx + q.length) + '</mark>' +
      escaped.slice(idx + q.length)
    );
  }

  // ---- Search algorithm -----------------------------------------------------
  function normalize(str) {
    return (str || '').toString().toLowerCase().trim();
  }

  function tokenize(str) {
    return normalize(str).split(/[^a-z0-9]+/).filter(Boolean);
  }

  function levenshtein(a, b) {
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp.push([i]);
    }
    for (var j = 1; j <= n; j++) {
      dp[0][j] = j;
    }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
    return dp[m][n];
  }

  function scoreItem(item, query, queryTokens) {
    var name = normalize(item.name);
    var shop = normalize(item.shop);
    var category = normalize(item.category);
    var score = 0;

    // Special case: searching "senator" surfaces every fabric material except Ankara.
    if (query === 'senator' && category === 'fabrics') {
      if (name.indexOf('ankara') !== -1) return 0;
      return name.indexOf('senator') !== -1 ? 100 : 30;
    }

    if (name === query) score += 100;
    else if (name.indexOf(query) === 0) score += 70;
    else if (name.indexOf(query) !== -1) score += 50;

    var nameTokens = tokenize(item.name);
    queryTokens.forEach(function (qt) {
      var exact = nameTokens.some(function (nt) { return nt === qt; });
      var starts = nameTokens.some(function (nt) { return nt.indexOf(qt) === 0; });
      if (exact) score += 20;
      else if (starts) score += 12;
      else {
        var close = nameTokens.some(function (nt) {
          return Math.abs(nt.length - qt.length) <= 2 && levenshtein(nt, qt) <= 2;
        });
        if (close) score += 8;
      }
    });

    if (shop.indexOf(query) !== -1) score += 6;
    if (category.indexOf(query) !== -1) score += 4;

    return score;
  }

  function searchProducts(query, limit) {
    var index = window.searchIndex || [];
    var q = normalize(query);
    if (!q) return [];
    var queryTokens = tokenize(q);

    var results = index
      .map(function (item) { return { item: item, score: scoreItem(item, q, queryTokens) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.item.name.localeCompare(b.item.name);
      })
      .map(function (r) { return r.item; });

    return typeof limit === 'number' ? results.slice(0, limit) : results;
  }

  // ---- Navigation targets -----------------------------------------------------
  function productHref(item) {
    if (item.source === 'shop') {
      return siteUrl('shops/product.html?shop=' + encodeURIComponent(item.shopKey) + '&product=' + item.productIndex);
    }
    var url = siteUrl('pages/category-products.html?cat=' + encodeURIComponent(item.catKey));
    if (item.tag) url += '&sub=' + encodeURIComponent(item.tag);
    return url;
  }

  function searchResultsHref(query) {
    return siteUrl('pages/search-results.html?q=' + encodeURIComponent(query));
  }

  // Expose the core pieces for reuse on the dedicated search-results page.
  window.OshodiSearch = {
    searchProducts: searchProducts,
    productHref: productHref,
    formatPriceRange: formatPriceRange,
    highlightMatch: highlightMatch,
    escapeHtml: escapeHtml
  };

  // ---- Dropdown styles (injected once) -----------------------------------------
  function injectStyles() {
    if (document.getElementById('oshodi-search-dropdown-styles')) return;
    var style = document.createElement('style');
    style.id = 'oshodi-search-dropdown-styles';
    style.textContent = [
      '.oshodi-search-dropdown {',
      '  position: fixed;',
      '  background: #ffffff;',
      '  border: 1px solid #e2e8f0;',
      '  border-radius: 12px;',
      '  box-shadow: 0 12px 28px rgba(20, 10, 50, 0.14);',
      '  max-height: 420px;',
      '  overflow-y: auto;',
      '  z-index: 9999;',
      '  padding: 6px;',
      '  display: none;',
      '}',
      '.oshodi-search-dropdown.open { display: block; }',
      '.oshodi-search-item {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '  padding: 8px;',
      '  border-radius: 8px;',
      '  cursor: pointer;',
      '  text-decoration: none;',
      '  color: inherit;',
      '}',
      '.oshodi-search-item:hover, .oshodi-search-item.active {',
      '  background: #f3effc;',
      '}',
      '.oshodi-search-item img {',
      '  width: 40px;',
      '  height: 40px;',
      '  object-fit: cover;',
      '  border-radius: 6px;',
      '  flex-shrink: 0;',
      '  background: #e2e8f0;',
      '}',
      '.oshodi-search-item-info {',
      '  flex: 1;',
      '  min-width: 0;',
      '}',
      '.oshodi-search-item-name {',
      '  font-size: 0.82rem;',
      '  font-weight: 700;',
      '  color: #1a1a2e;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.oshodi-search-item-name mark {',
      '  background: #ffe8a3;',
      '  color: inherit;',
      '  border-radius: 2px;',
      '}',
      '.oshodi-search-item-meta {',
      '  font-size: 0.72rem;',
      '  color: #666e7a;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.oshodi-search-item-price {',
      '  font-size: 0.75rem;',
      '  font-weight: 800;',
      '  color: #4f22b2;',
      '  flex-shrink: 0;',
      '  white-space: nowrap;',
      '}',
      '.oshodi-search-empty {',
      '  padding: 16px 10px;',
      '  text-align: center;',
      '  font-size: 0.82rem;',
      '  color: #666e7a;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ---- Debounce ---------------------------------------------------------------
  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var args = arguments;
      var ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  // ---- Wire up one search box ---------------------------------------------------
  function setupSearchBox(input) {
    var container = input.parentElement;

    var dropdown = document.createElement('div');
    dropdown.className = 'oshodi-search-dropdown';
    dropdown.setAttribute('role', 'listbox');
    document.body.appendChild(dropdown);

    function positionDropdown() {
      var rect = input.getBoundingClientRect();
      dropdown.style.left = rect.left + 'px';
      dropdown.style.top = (rect.bottom + 6) + 'px';
      dropdown.style.width = rect.width + 'px';
    }

    window.addEventListener('resize', function () {
      if (dropdown.classList.contains('open')) positionDropdown();
    });
    window.addEventListener('scroll', function () {
      if (dropdown.classList.contains('open')) positionDropdown();
    }, true);

    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');

    var currentResults = [];
    var activeIndex = -1;

    function closeDropdown() {
      dropdown.classList.remove('open');
      dropdown.innerHTML = '';
      currentResults = [];
      activeIndex = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    function setActive(index) {
      var items = dropdown.querySelectorAll('.oshodi-search-item');
      items.forEach(function (el) { el.classList.remove('active'); });
      activeIndex = index;
      if (index >= 0 && items[index]) {
        items[index].classList.add('active');
        items[index].scrollIntoView({ block: 'nearest' });
        input.setAttribute('aria-activedescendant', items[index].id);
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function renderResults(query) {
      var results = searchProducts(query, 8);
      currentResults = results;
      activeIndex = -1;

      if (!results.length) {
        dropdown.innerHTML = '<div class="oshodi-search-empty">No products found for &ldquo;' + escapeHtml(query) + '&rdquo;. Try a different keyword.</div>';
        positionDropdown();
        dropdown.classList.add('open');
        input.setAttribute('aria-expanded', 'true');
        return;
      }

      dropdown.innerHTML = results.map(function (item, i) {
        return (
          '<a href="' + productHref(item) + '" class="oshodi-search-item" role="option" id="oshodi-search-item-' + i + '">' +
            '<img src="' + item.image + '" alt="" />' +
            '<div class="oshodi-search-item-info">' +
              '<div class="oshodi-search-item-name">' + highlightMatch(item.name, query) + '</div>' +
              '<div class="oshodi-search-item-meta">' + escapeHtml(item.shop || '') + '</div>' +
            '</div>' +
            '<div class="oshodi-search-item-price">' + escapeHtml(formatPriceRange(item.price, item.name)) + '</div>' +
          '</a>'
        );
      }).join('');
      positionDropdown();
      dropdown.classList.add('open');
      input.setAttribute('aria-expanded', 'true');
    }

    var debouncedRender = debounce(function () {
      var q = input.value.trim();
      if (!q) {
        closeDropdown();
        return;
      }
      renderResults(q);
    }, 200);

    input.addEventListener('input', debouncedRender);

    input.addEventListener('focus', function () {
      var q = input.value.trim();
      if (q) renderResults(q);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!currentResults.length) return;
        setActive((activeIndex + 1) % currentResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!currentResults.length) return;
        setActive((activeIndex - 1 + currentResults.length) % currentResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && currentResults[activeIndex]) {
          window.location.href = productHref(currentResults[activeIndex]);
        } else if (input.value.trim()) {
          window.location.href = searchResultsHref(input.value.trim());
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    document.addEventListener('click', function (e) {
      if (!container.contains(e.target) && !dropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    var searchBtn = container.querySelector('.search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (input.value.trim()) {
          window.location.href = searchResultsHref(input.value.trim());
        }
      });
    }
  }

  function init() {
    injectStyles();
    var inputs = document.querySelectorAll('.search-input');
    inputs.forEach(setupSearchBox);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
