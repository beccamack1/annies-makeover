/* ==========================================================
   RATINGS and REVIEWS.
   Ratings were checked on Oct 4, 2026. Update them before the
   pitch. Quotes are short excerpts from public reviews, each
   linked to where it came from (see PITCH-NOTES.md).
   ========================================================== */

export const ratings = [
  { site: 'Google', store: 'FM423', stars: '4.4', count: '411 reviews' },
  { site: 'Google', store: '380 & Coit', stars: '4.6', count: '148 reviews' },
  { site: 'DoorDash', store: 'FM423', stars: '4.6', count: '2,000+ ratings' },
  { site: 'Uber Eats', store: 'FM423', stars: '4.6', count: '1,000+ ratings' },
]

export type Review = {
  quote: string
  name: string
  where: string
  link?: string
}

export const reviews: Review[] = [
  {
    quote: 'Their tiramisu is really awesome and very light in sweetness… This is my new go to place for tiramisu.',
    name: 'Anuj G.',
    where: 'from our website',
  },
  {
    quote: 'We cannot get enough of the Salted Caramel signature cookies!',
    name: 'Shari M.',
    where: 'DoorDash, July 2026',
    link: 'https://www.doordash.com/store/annies-sweets-&-treats-the-colony-303306/',
  },
  {
    quote: 'The macaroons and taro tea were absolutely magnificent… They even let us try the gelato after we had paid.',
    name: 'Emily E.',
    where: 'from our website',
  },
  {
    quote: 'That creme Brulee was the most delicious thing I’ve tasted!',
    name: 'Diea H.',
    where: 'Uber Eats, April 2023',
    link: 'https://www.ubereats.com/store/annies-sweets-%26-treats/CcqTkg88Q72QGqhslOiNJA',
  },
  {
    quote: 'I had the mango star green tea and it was delicious! The employees were also super kind, welcoming, and had great energy.',
    name: 'Aleah B.',
    where: 'from our website',
  },
  {
    quote: 'Everything is really the best here… especially macarons and meringue cookies, which are the best of all four of our kids.',
    name: 'Taein R.',
    where: 'from our website',
  },
]

// "Customer favorites": what reviews mention most, with a photo
export const favorites = [
  { name: 'Macarons', photo: '/images/menu/pistachio-macaron.webp', note: '“…much bigger than I thought they would be.” — Jen K., Yelp' },
  { name: 'Crème brûlée cheesecake', photo: '/images/menu/cream-brulee-cheesecake.webp', note: 'A reviewer favorite, by the slice or whole' },
  { name: 'Salted caramel cookie', photo: '/images/menu/salted-caramel-cookie.webp', note: '“We cannot get enough…” — Shari M., DoorDash' },
  { name: 'Tiramisu', photo: '/images/menu/tiramisu.webp', note: 'Less sweet, home baking style' },
]
