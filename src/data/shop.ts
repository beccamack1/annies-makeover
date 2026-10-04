/* ==========================================================
   SHOP INFO: the two stores, hours, phone numbers and links.
   Addresses and phones are from anniessweetsntreats.com/locations.
   Hours are from each store's online ordering page (Oct 2026).
   Other listings disagree about hours, so check them with the
   owners before launch (see PITCH-NOTES.md).
   ========================================================== */

export const shopName = "Annie's Sweets & Treats"

// This site is a pitch, not Annie's official website yet.
// Change to false once the owners say yes (see README).
export const showConceptBanner = true

export type StoreId = 'fm423' | 'coit'

export type Store = {
  id: StoreId
  name: string        // what the shop calls itself
  area: string        // a few words to help people tell them apart
  street: string
  cityLine: string
  phone: string
  opened: string
  // Hours for each day, Sunday first. Times are 24-hour, like '21:00'.
  hours: { open: string; close: string }[]
  hoursText: string
  orderUrl: string
  services: string[]
  instagram: { handle: string; url: string }
}

const everyDay = (open: string, close: string) => Array.from({ length: 7 }, () => ({ open, close }))

export const stores: Store[] = [
  {
    id: 'fm423',
    name: 'FM423',
    area: 'The original, at FM 423 & Lebanon Rd',
    street: '5480 FM 423, Ste 200',
    cityLine: 'Frisco, TX 75034',
    phone: '(214) 494-2999',
    opened: 'since 2017',
    hours: everyDay('10:00', '21:00'),
    hoursText: '10 AM – 9 PM, every day',
    orderUrl: 'https://fm423.anniessweetsntreats.com/',
    services: ['Pickup', 'Delivery ($4.99, $15 minimum)'],
    instagram: { handle: '@annies.sweetsntreats_frisco', url: 'https://www.instagram.com/annies.sweetsntreats_frisco/' },
  },
  {
    id: 'coit',
    name: '380 & Coit',
    area: 'Our newer shop, at US-380 & Coit Rd',
    street: '12255 University Dr, Ste 250',
    cityLine: 'Frisco, TX 75035',
    phone: '(214) 618-0507',
    opened: 'since 2024',
    hours: everyDay('10:00', '21:00'),
    hoursText: '10 AM – 9 PM, every day',
    orderUrl: 'https://380coit.anniessweetsntreats.com/',
    services: ['Pickup'],
    instagram: { handle: '@annies.sweetsntreats_prosper', url: 'https://www.instagram.com/annies.sweetsntreats_prosper/' },
  },
]

export const storeById = (id: StoreId) => stores.find((s) => s.id === id)!

// "tel:" link for a phone number, so phones can tap to call
export const telLink = (phone: string) => 'tel:+1' + phone.replace(/\D/g, '')

export const directionsLink = (store: Store) =>
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`Annie's Sweets & Treats, ${store.street}, ${store.cityLine}`)

// From the Birthday Parties page on their current website
export const email = 'annies12255@gmail.com'

export const links = {
  facebook: 'https://www.facebook.com/annies.sweetsntreats',
  tiktok: 'https://www.tiktok.com/@anniessweetsntreats',
  yelpFm423: 'https://www.yelp.com/biz/annies-sweets-and-treats-frisco',
  yelpCoit: 'https://www.yelp.com/biz/annies-sweets-and-treats-frisco-2',
}

// The words in the scrolling strip under the top of the page
export const marqueeWords = [
  'Macarons',
  'Cheesecake',
  'Soft-baked cookies',
  'Croffles',
  'Gelato',
  'Bubble tea',
  'Tiramisu',
  'Lattes',
  'Gluten-free treats',
  'Baked every day',
]
