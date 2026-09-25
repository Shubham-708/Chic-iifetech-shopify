# CHIC – The Botanical Beauty · Theme Setup Guide

The theme has been fully rebranded for **CHIC The Botanical Beauty** (serums, facewash, hair oil, body care & gift sets), based on the old site at chicthebotanicalbeauty.com.

## What's included

### 1. Product import files (`product-data/`)
- **`chic-products-shopify-import.csv`** — all 29 products from the old website, ready to import.
  Includes: titles, full HTML descriptions (benefits, key ingredients, how to use), vendor, type,
  tags, prices (INR), SKUs (CHIC-001…029), SEO title/description and **all 145 product images**
  (hosted image URLs — Shopify downloads them automatically during import).
- **`chic-products-full.json`** — the same data as structured JSON (for apps/APIs).

**To import:** Shopify Admin → Products → Import → upload the CSV → tick
"Publish new products to all sales channels" → Import.

### 2. New homepage (`templates/index.json`)
Hero banner → brand values strip → **New Arrival** grid → gift-edit split banner →
**Best Sellers** carousel → botanical ingredients → shop-by-category → testimonial → Instagram grid.

### 3. New custom sections (all responsive, editable in the theme editor)
- `chic-hero` — hero/promo banner (overlay or split layout) with bundled brand imagery
- `chic-values` — 100% Botanical / Cruelty Free / Ayurveda Wisdom strip
- `chic-ingredients` — Neem, Rosehip, Calendula, Evening Primrose showcase
- `chic-instagram` — scattered Instagram collage linking to @chic_the_botanical_beauty

### 4. Branding
- **Logo:** the original CHIC logo is bundled (`assets/chic-logo.png`) and shows automatically
  in the header & footer. To use Shopify's built-in logo setting instead, upload it in
  Theme settings → Logo (a copy is in this folder's assets).
- **Colors:** warm cream background `#FBF9F4`, deep botanical green text `#2F3A2F`,
  green accent `#3E5C42`, sage section backgrounds.
- **Header:** rotating announcements (free shipping over ₹2,500 / brand values), sticky on scroll-up.
- **Footer:** newsletter ("Join the Botanical Circle"), logo + Bhopal address, phone, e-mail,
  Products/Company/Support columns, real social links.

## After importing products, do these once in Shopify Admin

1. **Collections** (Products → Collections → Create, use *automated* conditions on Product type):
   - Skin Care → type equals `Skin Care`
   - Hair Care → type equals `Hair Care`
   - Body Care → type equals `Body Care`
   - Gift Sets → type equals `Gift Set` (optionally also `Kit`, `Combo`)
   - Best Sellers → tag equals `Best Seller`
2. **Menus** (Online Store → Navigation): add the collections above to **Main menu**
   (used as "Products" in the footer) and About/Contact pages to the **Footer** menu.
3. **Store currency** should be INR to match the imported prices.
4. Optionally point the homepage "New Arrival" / "Best Sellers" product lists at specific
   collections in the theme editor (they default to *All products*).
