/* ==========================================================
   BIRTHDAY PARTIES and CAKES & GIFTS.
   Party details are copied from the Birthday Parties page on
   their current website (anniessweetsntreats.com/Birthday).
   Cake and gift prices are from the FM423 ordering page.
   ========================================================== */

export const partyRoom = {
  guests: 20,
  rent: '$50/hour',
  freeHours: 'Book a package and your first 2 hours are free.',
  // From their Birthday page. Which shop hosts parties isn't confirmed yet.
  bookingPhone: '(214) 618-0507',
}

export const partyPackages = [
  {
    name: 'Package A',
    price: '$10',
    per: 'per guest',
    gets: ['1 macaron', '1 cookie', '1 scoop of gelato'],
  },
  {
    name: 'Package B',
    price: '$15',
    per: 'per guest',
    gets: ['Everything in Package A', 'Plus a drink for every guest'],
  },
  {
    name: 'Package C',
    price: '+ Cake',
    per: 'on top of A or B',
    gets: ['Package A or B', 'Annie’s house cake', 'Free writing on the cake'],
  },
]

// "Celebrating something?" cards
export const celebrate = [
  {
    photo: '/images/menu/oreo-cheesecake.webp',
    title: 'Whole 8″ cakes',
    price: 'from $35',
    text: 'Cheesecakes, tiramisu, red velvet and double chocolate. Add writing for $5: order at least a day ahead and keep it short.',
  },
  {
    photo: '/images/menu/macaron-gift-set.webp',
    title: 'Macaron gift boxes',
    price: '6 for $16.50 · 12 for $33',
    text: 'Pick your flavors from twelve, from pistachio and salted caramel to cotton candy.',
  },
  {
    photo: '/images/menu/mini-cookie-gift-set.webp',
    title: 'Mini cookie boxes',
    price: '6 for $13.52 · 12 for $25.82',
    text: 'Chocolate chip, Oreo and birthday mini cookies, boxed and ready to share.',
  },
]

// From the homepage of their current website
export const cancelPolicy =
  'Need to cancel a custom cake or pastry? You have 24 hours from order confirmation. After that, we’ve already started creating magic!'
