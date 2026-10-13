# CAFFEINE COVE — Premium Coffee House Website

> **Your Little Escape.**  
> *Coffee · Comfort · Connection.*

A production-quality website crafted for **CAFFEINE COVE**, an upscale neighborhood specialty coffee house brand. Designed to embody European café elegance, warm cozy hospitality, cinematic coffee photography, and sophisticated editorial typography.

---

## ☕ Brand & Visual Identity

- **Brand Name**: CAFFEINE COVE
- **Tagline**: Your Little Escape.
- **Supporting Phrase**: Coffee · Comfort · Connection.
- **Personality**: Elegant, Cozy, Premium, Warm, Modern, Inviting, Artistic, Calm, Sophisticated.

### Color Palette System
- **Primary Background (Warm Ivory)**: `#F6F0E7`
- **Secondary Background (Soft Cream)**: `#FFFCF7`
- **Primary Text (Espresso Brown)**: `#302019`
- **Dark Section Background (Deep Roast)**: `#211713`
- **Dark Section Surfaces & Cards**: `#2B1E18` / `#382820`
- **Primary Accent & CTAs (Caramel)**: `#B7835A` (Hover: `#9E6E47`)
- **Secondary Section Background (Latte Beige)**: `#E6D6C3`
- **Subtle Botanical Accent (Muted Sage)**: `#85866D`
- **Text on Dark Backgrounds**: `#FFFCF7`

### Typography System
- **Headings & Serif Accents**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Google Fonts)
- **Body, Navigation, Interfaces & Prices**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)
- **Editorial Handwritten Phrases**: [Allura](https://fonts.google.com/specimen/Allura) (Google Fonts)

---

## 🌟 Key Sections & Features

1. **Header & Navigation**:
   - Semi-transparent frosted-glass bar with blur effect (`backdrop-filter: blur(14px)`).
   - Custom SVG emblem logo with coffee cup, cove wave, and steam curls.
   - Dual-currency toggle: Indian Rupee (₹ INR) & US Dollar ($ USD) with instant live recalculation across the entire website.
   - Interactive Tasting Tray quick drawer button with live item counter.
   - "Reserve a Table" call-to-action and responsive mobile drawer navigation.

2. **Cinematic Hero Section**:
   - Atmospheric coffeehouse ambience with warm golden morning sunlight.
   - Handcrafted ceramic latte art cup, golden croissant, and rustic oak tabletop.
   - Editorial typography with letterspaced uppercase eyebrow: `YOUR LITTLE ESCAPE. ———`.
   - Dual actions: `EXPLORE OUR MENU →` and `OUR STORY ▶` (opens 4K cinematic craft modal).
   - Side scroll indicator with animated mouse wheel.
   - Floating cursive flourish badge: *"Coffee Makes Life Better"*.

3. **Section 8: Our Philosophy (About Us)**:
   - Light Warm Ivory editorial composition.
   - Arched window frame showing the cozy café interior corner.
   - Floating dark circular badge: `EST. 2025` with botanical branch icon.
   - Three value propositions with custom circular badges:
     - ☕ *Premium Quality*: Finest beans, crafted with care.
     - 🍃 *Cozy Ambience*: A warm space for every mood.
     - 🤍 *A Welcoming Community*: More than a café, a gathering place.
   - Botanical eucalyptus sprig accent illustration.

4. **Section 9: Signature Coffee Menu**:
   - Rich Deep Roast background with cream typography and caramel accents.
   - Interactive category filtering: `All`, `Hot Coffee`, `Iced`, `Signature`.
   - 6 Handcrafted Drink Cards:
     1. Velvet Latte (Hot / Signature) — ₹220 / $5.50
     2. Caramel Cloud (Iced / Signature) — ₹250 / $5.75
     3. Spanish Latte (Iced / Signature) — ₹240 / $5.75
     4. Mocha Noir (Hot / Signature) — ₹260 / $6.00
     5. Vanilla Cold Brew (Iced) — ₹230 / $5.50
     6. Classic Cappuccino (Hot) — ₹210 / $5.50
   - Interactive `(+)` button triggers drink customization modal (Milk options: Whole Milk, Oat Milk, Almond Milk; Sweetness level; Ice / Warmth).
   - `View Full Menu →` button opens the complete digital café ledger.

5. **Section 10: The Dark Coffee Experience (Good Coffee. No Rush.)**:
   - Panoramic photo backdrop of barista espresso extraction.
   - Editorial focus box with glassmorphism styling.
   - Interactive `OUR PROCESS` modal highlighting Ethical Sourcing, Small-Batch Roasting, and Precision Extraction.

6. **Section 11: Coffee & Little Treats (Bakery & Pastries)**:
   - Soft Cream surface with 4 freshly baked treats:
     - Butter Croissant — ₹180 / $4.50
     - Chocolate Brownie — ₹190 / $4.75
     - Blueberry Cheesecake — ₹220 / $5.50
     - Almond Pastry — ₹190 / $4.75
   - Decorative cursive card: *"Good Things Taste Better Together"*.

7. **Section 12: Inside The Cove (Gallery)**:
   - Deep Roast 5-photo mosaic grid (Espresso extraction, cozy reading nook, latte art overhead, daily hearth bakes, single-origin beans).
   - Full interactive Lightbox modal with next/previous controls, keyboard shortcuts (`ArrowLeft`, `ArrowRight`, `Escape`), touch swipe support, and scroll lock.

8. **Section 13: Customer Reviews**:
   - Testimonial carousel with real reviewer avatars, quotes, and star ratings (illustrative demonstration).
   - Next/Previous controls, dot indicators, and autoplay with pause-on-hover.

9. **Section 14 & 15: Visit The Cove & Table Reservation**:
   - Split 3-column layout:
     - Storefront exterior photograph with warm lantern lighting and *"CAFFEINE COVE"* awning.
     - Contact & location information with semantic links (`tel:`, `mailto:`, Instagram, hours, sample address).
     - Table Reservation Card with subtle coffee ring watermark.
     - Full client-side validation: Name, date (cannot be in the past), time, valid phone number, valid email, party size, optional requests.
     - Loading simulation and confirmation voucher with reference number `#CC-XXXX` and print action.

10. **Section 16: Footer**:
    - Deep Roast background with brand logo, quick navigation links, opening hours, working social links, and cursive sign-off: *"Take a little comfort with you. ♡"*.
    - Legal modal links for Privacy Policy, Terms of Service, and Client Handover notes.

---

## 🛠 Technical Structure & Architecture

```
caffeine-cove/
├── index.html          # Semantic HTML5 with SEO meta tags & Schema.org JSON-LD
├── style.css           # Vanilla CSS with design tokens, fluid typography & responsive layout
├── script.js           # Vanilla JS: filtering, lightbox, reservation validation, currency & drawers
├── favicon.svg         # Brand coffee cup vector icon
├── images/             # High-resolution local photographic assets
│   ├── hero_coffee_latte.jpg
│   ├── cafe_interior_arch.jpg
│   ├── cafe_cozy_corner.jpg
│   ├── cafe_exterior_facade.jpg
│   ├── dark_coffee_process.jpg
│   ├── menu_velvet_latte.jpg
│   ├── menu_caramel_cloud.jpg
│   ├── menu_spanish_latte.jpg
│   ├── menu_mocha_noir.jpg
│   ├── menu_vanilla_cold_brew.jpg
│   ├── menu_classic_cappuccino.jpg
│   ├── treat_croissant.jpg
│   ├── treat_brownie.jpg
│   ├── treat_cheesecake.jpg
│   ├── treat_almond_pastry.jpg
│   ├── gallery_espresso.jpg
│   ├── gallery_cozy_nook.jpg
│   ├── gallery_latte_overhead.jpg
│   ├── gallery_pastries.jpg
│   ├── gallery_coffee_beans.jpg
│   ├── reviewer_sarah.jpg
│   ├── reviewer_marcus.jpg
│   └── reviewer_elena.jpg
└── README.md           # Documentation & Client Handover
```

---

## 🚀 How to Run Locally

You can run the website locally using any standard static server:

```powershell
# Using Python built-in server:
python -m http.server 3000

# Or using Node.js npx serve:
npx serve .
```

Then open `http://localhost:3000` in your web browser.

---

## 🔌 Client Production Integration Guide

When deploying for the live café client:

1. **Reservation System Integration**:
   - In `script.js` (lines ~380–430), replace the `setTimeout` simulation with a real API call:
     ```javascript
     const response = await fetch('/api/reservations', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ nameVal, dateVal, timeVal, phoneVal, emailVal, guestsVal, notesVal })
     });
     ```
   - Alternatively, integrate an embeddable widget such as OpenTable, Resy, or SevenRooms.

2. **Menu Pricing & Items**:
   - Update prices directly in `index.html` via the `data-price-inr` and `data-price-usd` attributes on `.menu-card` and `.treat-card` elements.
   - For automated updates, connect to a headless CMS (e.g. Sanity, Strapi, or Contentful).

3. **Analytics & Google Maps**:
   - Add your Google Analytics 4 tracking ID to the `<head>` in `index.html`.
   - Update the Google Maps URL in `index.html` (inside the Directions modal) to point to the café's actual verified Google Business profile.
