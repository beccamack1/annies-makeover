# Annie's Sweets & Treats

A new website for Annie's Sweets & Treats, a dessert café with two shops
in Frisco, Texas (FM423 and 380 & Coit). Made as a **pitch** to the
owners, to replace their old template site at anniessweetsntreats.com.

The big difference: their whole menu, with prices, for both shops, right
on the website (today it's hidden inside their ordering pages). Plus cakes
& gift boxes, birthday parties, reviews, photos, and "open now" for each shop.
Ordering still goes to their existing ordering pages.

It's built with **Vite + React + TypeScript + Zustand** (the standard setup
for all of Becca's projects) and will be hosted on Netlify.

## See it on this computer

Open Terminal in this folder and type:

```bash
npm install
```

(You only need that the first time.) Then:

```bash
npm run dev
```

Open http://localhost:5184. Leave Terminal open. When you save a change to
a file, the page updates by itself. Press `Ctrl + C` in Terminal to stop.

This project always uses port **5184** (and 8892 for `npx netlify dev`),
so it never clashes with Becca's other sites.

## Where to change things

| To change...                                  | Open this file                  |
| --------------------------------------------- | ------------------------------- |
| Menu items and prices (both shops)            | `src/data/menu.ts`              |
| Addresses, phones, hours, links, banner       | `src/data/shop.ts`              |
| Party packages, cakes & gift boxes            | `src/data/parties.ts`           |
| Star ratings, reviews, "customer favorites"   | `src/data/reviews.ts`           |
| Gallery photos                                | `src/data/gallery.ts`           |
| The words in the red scrolling strip          | `src/data/shop.ts` (at the bottom) |
| Photos                                        | `public/images/` (menu photos in `public/images/menu/`) |
| Colors and fonts                              | `src/styles.css` (at the top)   |
| The tab icon                                  | `public/favicon.svg`            |

Each file has notes at the top that explain what's in it.

## What each folder is

- `src/data/`: the words, prices, hours and links. Most changes happen here.
- `src/components/`: one file for each part of the page (menu, parties, ...).
- `src/store/`: the page's memory, using Zustand (which shop is picked,
  which menu tab is open, what's typed in the search box).
- `src/lib/`: helpers ("open now" in Texas time, menu search).
- `src/App.tsx`: puts all the parts in order, top to bottom.
- `public/`: photos, the logo and the tab icons.

## Checks before putting it online

```bash
npm run lint
```

```bash
npm run build
```

Both should finish with no errors.

## Where the information came from

- Menus and prices: each shop's own online ordering page (Oct 4, 2026),
  with spelling fixed.
- Addresses, phones, party packages, cancellation rule, testimonials,
  logo and photos: their current website, anniessweetsntreats.com.
- Hours: each shop's ordering page (other listings disagree).
- Ratings and other review quotes: Google, DoorDash, Uber Eats and Yelp.

All the research, with sources, is in `PITCH-NOTES.md`.

## When the owners say yes

The site is marked as a pitch so nobody mistakes it for Annie's real
website. To make it official:

1. In `src/data/shop.ts`, change `showConceptBanner` to `false`.
2. In `index.html`, delete the `<meta name="robots" ...>` line.
3. In `netlify.toml`, delete the `[[headers]]` part at the bottom.

## Still to do (needs the owners)

- [ ] Confirm hours for each shop (listings online disagree)
- [ ] Confirm in-store prices match the ordering page prices
- [ ] Which shop hosts birthday parties, and which email to use
- [ ] Their story and names, for an "About us" section
- [ ] A bigger logo file and new photos (especially of the 380 & Coit shop)
- [ ] Update the ratings in `src/data/reviews.ts` right before the pitch
