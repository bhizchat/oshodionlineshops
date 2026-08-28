// Click analytics module backed by Supabase.
// Events are queued in localStorage first so quick page navigations do not lose clicks.

(function () {
  var TABLE_NAME = 'click_events';
  var QUEUE_KEY = 'oshodi_click_events_queue_v1';
  var flushing = false;

  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;
    try {
      if (typeof supabaseClient !== 'undefined') return supabaseClient;
    } catch (err) {
      return null;
    }
    return null;
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function safeReadQueue() {
    try {
      var raw = localStorage.getItem(QUEUE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function safeWriteQueue(queue) {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (err) {
      // Ignore storage failures (private mode/full storage).
    }
  }

  function enqueueEvent(payload) {
    var queue = safeReadQueue();
    queue.push(payload);
    safeWriteQueue(queue);
  }

  function getTextFrom(el, selector) {
    if (!el) return '';
    var node = el.querySelector(selector);
    return node ? (node.textContent || '').trim() : '';
  }

  function parseShopAndProductFromHref(href) {
    if (!href) return { shopKey: null, productIndex: null };
    try {
      var url = new URL(href, window.location.href);
      return {
        shopKey: url.searchParams.get('shop'),
        productIndex: url.searchParams.get('product')
      };
    } catch (err) {
      return { shopKey: null, productIndex: null };
    }
  }

  function buildPayload(eventType, details) {
    var safeDetails = details || {};
    return {
      event_type: eventType,
      event_label: safeDetails.eventLabel || null,
      source_page: window.location.pathname,
      product_name: safeDetails.productName || null,
      shop_key: safeDetails.shopKey || null,
      product_index: safeDetails.productIndex != null ? String(safeDetails.productIndex) : null,
      target_url: safeDetails.targetUrl || null,
      phone_number: safeDetails.phoneNumber || null,
      created_at: nowIso(),
      metadata: safeDetails.metadata || {}
    };
  }

  async function flushQueue() {
    if (flushing) return;
    var client = getSupabaseClient();
    if (!client) return;

    var queue = safeReadQueue();
    if (!queue.length) return;

    flushing = true;
    try {
      var response = await client.from(TABLE_NAME).insert(queue);
      if (response && response.error) {
        console.error('Failed to insert click events:', response.error.message);
        return;
      }
      safeWriteQueue([]);
    } catch (err) {
      console.error('Failed to flush click events:', err && err.message ? err.message : err);
      // Keep queued items for next page/session flush.
    } finally {
      flushing = false;
    }
  }

  function trackEvent(eventType, details) {
    var payload = buildPayload(eventType, details);
    enqueueEvent(payload);
    void flushQueue();
  }

  function trackProductClick(details) {
    trackEvent('Product clicks', details);
  }

  function trackCall(details) {
    trackEvent('Calls', details);
  }

  function trackMessage(details) {
    trackEvent('Messages', details);
  }

  function trackShopVisit(details) {
    trackEvent('Shop clicks', details);
  }

  function handleViewDetailsClick(target) {
    var viewBtn = target.closest('.view-details-btn');
    if (!viewBtn) return;

    var productCard = viewBtn.closest('.product-card');
    var href = productCard && productCard.getAttribute('href');
    var parsed = parseShopAndProductFromHref(href);

    trackProductClick({
      eventLabel: 'View Details',
      productName: getTextFrom(productCard, '.product-name, .product-title'),
      shopKey: parsed.shopKey,
      productIndex: parsed.productIndex,
      targetUrl: href,
      metadata: {
        pageTitle: document.title
      }
    });
  }

  function handleCallClick(target) {
    var telLink = target.closest('#call-product-btn a[href^="tel:"]');
    if (!telLink) return;

    var breadcrumbProduct = document.getElementById('breadcrumb-product');
    var productName = breadcrumbProduct ? breadcrumbProduct.textContent.trim() : null;

    trackCall({
      eventLabel: 'Call for this Item',
      productName: productName,
      phoneNumber: (telLink.getAttribute('href') || '').replace('tel:', ''),
      targetUrl: telLink.getAttribute('href') || null,
      metadata: {
        pageTitle: document.title
      }
    });
  }

  function handleWhatsappClick(target) {
    var button = target.closest('#whatsapp-product-btn');
    if (!button) return;

    var breadcrumbProduct = document.getElementById('breadcrumb-product');
    var productName = breadcrumbProduct ? breadcrumbProduct.textContent.trim() : null;

    trackMessage({
      eventLabel: 'WhatsApp Message',
      productName: productName,
      metadata: {
        pageTitle: document.title
      }
    });
  }

  function handleVisitShopClick(target) {
    var link = target.closest('#visit-shop-btn, #sold-by-name-link');
    if (!link) return;

    var breadcrumbProduct = document.getElementById('breadcrumb-product');
    var productName = breadcrumbProduct ? breadcrumbProduct.textContent.trim() : null;
    var href = link.getAttribute('href');

    trackShopVisit({
      eventLabel: 'Visit Shop',
      productName: productName,
      targetUrl: href,
      metadata: {
        pageTitle: document.title
      }
    });
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    handleViewDetailsClick(target);
    handleCallClick(target);
    handleWhatsappClick(target);
    handleVisitShopClick(target);
  }, true);

  window.addEventListener('pageshow', function () {
    void flushQueue();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      void flushQueue();
    }
  });

  window.OshodiAnalytics = {
    trackEvent: trackEvent,
    trackProductClick: trackProductClick,
    trackCall: trackCall,
    trackMessage: trackMessage,
    trackShopVisit: trackShopVisit,
    flushQueue: flushQueue
  };
})();
