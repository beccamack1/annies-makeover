# Annie's Sweets & Treats

A new website for Annie's Sweets & Treats, a dessert café with two shops
in Frisco, Texas (FM423 and 380 & Coit). Made as a **pitch** to the
owners, to replace their old template site at anniessweetsntreats.com.

The big difference: their whole menu, with prices, for both shops, right
on the website (today it's hidden inside their ordering pages). Plus cakes
& gift boxes, birthday parties, reviews, photos, and "open now" for each shop.
Ordering still goes to their existing ordering pages.

It's built with **Vite + React + TypeScript + Zustand** (the standard setup
for all of Becca's projects) and hosted on **Cloudflare Pages** (free).
It moved from Netlify in October 2026, when Netlify's free monthly
publishing credits ran out.

## See it online

**SITE_URL** (a private preview: locked unless you're signed in to the
admin page or have a viewing link)

- **Admin page:** SITE_URL/admin. Sign in with the admin password (it's in
  the `.dev.vars` file in this folder, and in Cloudflare as the
  `ADMIN_PASSWORD` secret). While you're signed in, you can see the whole
  site.
- **🔒 Viewing links:** type who the link is for and press "Make a viewing
  link". Then press **Copy message** (a friendly note with the link, ready to
  paste in a text, email or DM), **Copy link only**, or **Write an email**.
  The person presses "Start viewing" and gets 10 minutes, on one device,
  once. The list shows if each link was opened; you can cancel or delete
  links. Don't open a link yourself: it would use it up.
- **💌 Quote:** at the bottom of the site there's a quote: ~~$1,500~~
  **$750** (current promo, with all the added extras), 50% to start and 50%
  at launch, paid by Zelle to Rebecca Womack, (254) 833-3535. When the
  owners press "Accept this quote" (or "Ask about a basic option"), their
  details show in this tab.

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

This project always uses port **5184** (and 8892 for `npm run cf:dev`),
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
| The logo and tab icons                        | `public/images/logo.png`, `public/favicon.png` |
| The quote: price, promo, Zelle, what's included | `src/data/pitch.ts`           |
| The message that goes with each viewing link  | `src/data/pitch.ts` (at the bottom) |
| How many minutes a viewing link lasts         | `server/viewing.ts` (`VIEW_MINUTES`) |
| The "private preview" pages people see        | `server/lockPages.ts`           |

Each file has notes at the top that explain what's in it.

## What each folder is

- `src/data/`: the words, prices, hours and links. Most changes happen here.
- `src/components/`: one file for each part of the page (menu, parties, ...).
- `src/store/`: the page's memory, using Zustand (which shop is picked,
  which menu tab is open, what's typed in the search box).
- `src/lib/`: helpers ("open now" in Texas time, menu search).
- `src/App.tsx`: puts all the parts in order, top to bottom.
- `src/admin.tsx` and `admin.html`: the /admin page.
- `functions/`: the small server pieces Cloudflare runs: the lock in front
  of the site (`_middleware.ts`), the admin page's viewing links and quote
  list (`api/admin/`), and saving quote requests (`api/quote/`).
- `server/`: helpers those pieces share, including the database
  (`db.ts`, a free Cloudflare D1 database that makes its own tables).
- `wrangler.toml`: Cloudflare's settings for this site.
- `public/`: photos, the logo and the tab icons.

## The lock (PREVIEW_LOCK)

Online, the site is locked: strangers see a friendly "private preview" page.
To switch the lock off, add a variable `PREVIEW_LOCK` = `off` in Cloudflare
(Workers & Pages → annies-sweets-preview → Settings → Variables and Secrets)
and publish again. On this computer it's off (in `.dev.vars`), so you can
always see the site here.

To try the admin page and the lock on this computer, run `npm run cf:dev`
and open http://localhost:8892 (set `PREVIEW_LOCK=on` in `.dev.vars` to try
the lock, and back to `off` after). The first time, copy
`.dev.vars.example` to `.dev.vars` and put a password in it.

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

## Putting changes online

After a change, check it (`npm run lint` and `npm run build`), then:

```bash
npm run deploy
```

It builds the site and puts it online. Cloudflare's free plan allows 500
of these a month. (The first time on a new computer, sign in to
Cloudflare with `npx wrangler login`.)

## When the owners say yes

The site is marked as a pitch so nobody mistakes it for Annie's real
website. To make it official:

1. In `src/data/shop.ts`, change `showConceptBanner` to `false`.
2. In `index.html`, delete the `<meta name="robots" ...>` line.
3. In `public/_headers`, delete the `/*` and `X-Robots-Tag` lines.
4. In `src/data/pitch.ts`, change `showQuote` to `false`.
5. In Cloudflare, add `PREVIEW_LOCK` = `off` so everyone can see the site.

## Still to do (needs the owners)

- [ ] Confirm hours for each shop (listings online disagree)
- [ ] Confirm in-store prices match the ordering page prices
- [ ] Which shop hosts birthday parties, and which email to use
- [ ] Their story and names, for an "About us" section
- [ ] A bigger logo file and new photos (especially of the 380 & Coit shop)
- [ ] Update the ratings in `src/data/reviews.ts` right before the pitch
- [ ] Quote emails: on Netlify, each accepted quote was also emailed to
      Becca. On Cloudflare it's saved and shows on /admin (💌 Quote), but
      no email yet (needs a free email service such as Resend).
