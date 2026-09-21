# H Breakfast to Bar

A component-based Next.js (App Router + TypeScript + Tailwind) site for H
Breakfast to Bar, built around your red / black / white palette.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (`npm run build` needs internet access once,
to fetch the Fraunces / Work Sans fonts from Google Fonts.)

## Structure

```
app/
  layout.tsx        Fonts, metadata, wraps every page in Navbar + Footer
  globals.css        Color tokens, buttons, menu-board leader, ticket shape
  page.tsx            Home
  about/page.tsx
  menu/page.tsx
  vouchers/page.tsx
  location/page.tsx

components/           One component per file — all content-driven, no
                       hardcoded copy inside the markup where avoidable

lib/data.ts           Every piece of placeholder content: nav links, the
                       full menu, all 21 vouchers, hours, address, phone,
                       email. Edit this file first for most content updates.
```

## What's a placeholder right now

- **Images** — every photo is a `placehold.co` block so the layout is easy
  to review. Swap the `image` fields in `lib/data.ts` (menu items) or the
  `src` attributes in `Hero.tsx`, `AboutTeaser.tsx` and `Gallery.tsx` for
  real photography. `next.config.mjs` is already set up for `next/image`
  if you'd rather move to that later — everything currently uses a plain
  `<img>` to keep setup simple.
- **Map** — `components/MapPlaceholder.tsx` is a styled block, not a real
  map. Drop in a Google Maps embed `<iframe>` or a map library once you
  have an address and API key.
- **Reservation form & newsletter signup** — both are functional on the
  front end (validation, a confirmation state) but don't send anywhere
  yet. See the `handleSubmit` functions in `ReservationForm.tsx` and
  `Footer.tsx` for where to wire up a real endpoint.
- **Address / phone / email / hours** — in `lib/data.ts` under `contact`
  and `hours`.
- **Vouchers** — all 21 are in `lib/data.ts`. The Vouchers page shows 9 and
  reveals the rest behind "See more"; change `INITIAL_COUNT` in
  `VoucherGrid.tsx` to show more or fewer up front.
- **Menu** — organised into five categories (Morning Menu, All-Day Plates,
  Small Bites & Shares, Handcrafted Cocktails, Coffee & Softs) in
  `lib/data.ts`. Add, remove or re-tag items there; the Menu page's tabs
  pick the categories up automatically.

## Notes on the design

- Colors are CSS variables in `globals.css` (`--red`, `--red-dark`,
  `--ink`, `--mist`, `--paper`) and mirrored in `tailwind.config.ts`, so
  `bg-red`, `text-ink`, `border-mist` etc. work anywhere.
- Headlines use **Fraunces**, body/UI text uses **Work Sans** — loaded via
  `next/font/google` in `app/layout.tsx`.
- The only animated element on the site is the marquee strip under the
  hero (`MarqueeStrip.tsx`); everything else is intentionally still.
