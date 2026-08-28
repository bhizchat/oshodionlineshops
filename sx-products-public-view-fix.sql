-- Fix: sx_products_public view was missing shop_location, shop_phone, and
-- shop_whatsapp columns, even though the storefront (shops/sx-product.html)
-- was already built to consume them for the WhatsApp/Call/location buttons
-- on the product detail "Sold by" card. Those buttons silently stayed
-- hidden because p.shop_location / p.shop_phone / p.shop_whatsapp were
-- always undefined on rows returned from the old view definition.
--
-- sx_shops already has phone/whatsapp/location columns (used by
-- sx_shops_public); this just also exposes them (aliased to shop_-prefixed
-- names, matching shop_name/shop_logo_url's existing convention) from
-- sx_products_public so a product detail page doesn't need a second query.
--
-- Safe to re-run: CREATE OR REPLACE VIEW preserves existing grants as long
-- as the column list is only being extended (not reordering/removing
-- existing columns), which is the case here.
--
-- Applied directly to production via `supabase db query --linked` on
-- 2026-08-28; this file exists purely so the change is tracked in version
-- control (no strategic-x/ folder in this repo anymore since that portal
-- was extracted into its own project).

create or replace view public.sx_products_public as
select
  p.id,
  p.product_name,
  p.category,
  p.description,
  p.tags,
  p.images,
  p.selling_price,
  p.compare_price,
  p.stock_quantity,
  p.condition,
  p.warranty,
  p.created_at,
  s.id as shop_id,
  s.shop_name,
  s.market_platform,
  s.logo_url as shop_logo_url,
  s.location as shop_location,
  s.phone as shop_phone,
  s.whatsapp as shop_whatsapp
from sx_products p
join sx_shops s on s.id = p.shop_id
where p.status = 'published';
