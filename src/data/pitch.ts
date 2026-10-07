/* ==========================================================
   THE QUOTE (the "Make it yours" section at the bottom of the
   preview site, only while this is a pitch)
   - Change the price, promo, terms or what's included here.
     To end the promo, set promo to null: the regular price shows.
   - "Accept this quote" saves their details for /admin (💌 Quote)
     and emails Becca through Netlify Forms.
   - Set showQuote to false to hide the section (do this once the
     owners have said yes).
   ========================================================== */

export const showQuote = true

export const quote = {
  regularPrice: '$1,500',
  // the current promo: shown instead of the regular price (null = no promo)
  promo: { price: '$750', label: 'Current promo', note: 'with all the added extras' } as
    | { price: string; label: string; note: string }
    | null,
  // how they pay: Zelle (sent from their own bank app to this name and number)
  payment: { method: 'Zelle', name: 'Rebecca Womack', phone: '(254) 833-3535' },
  // Who decides isn't confirmed yet (see PITCH-NOTES.md), so this uses the shop's name
  preparedFor: "Annie's Sweets & Treats",
  headline: 'Make it yours',
  summary: 'Everything you see on this website, ready to launch.',
  terms: '50% to start, 50% at launch',
  includes: [
    {
      title: 'This whole website',
      text: 'Both shops’ full menus with prices, photos, a search box and a gluten-free filter. Hours, “open now”, tap-to-call, directions and ordering links for each shop. Works on phones and computers.',
    },
    {
      title: 'Cakes, gift boxes & parties',
      text: 'Whole cakes, macaron and cookie boxes, how to order a cake, and your birthday party packages, all in one place.',
    },
    {
      title: 'Your reviews and photos',
      text: 'Your best reviews and real star ratings up front, and a gallery of your shops and treats.',
    },
    {
      title: 'Your web address',
      text: 'The site connected to your own domain name.',
    },
    {
      title: 'Hosting in your name',
      text: 'On your own account, so you’re never locked in.',
    },
    {
      title: 'All the files',
      text: 'Everything that makes the site, yours to keep.',
    },
  ],
  // shown under the price; its button asks for the basic options instead
  basic: {
    text: 'Cheaper basic options are available on request.',
    button: 'Ask about a basic option',
  },
  from: 'Becca',
}

// What they actually pay: the promo price if there is one
export const price = quote.promo?.price ?? quote.regularPrice

// The first payment ("50% to start"): half of the price, like "$375"
export const firstPayment = '$' + Math.round(Number(price.replace(/[^0-9.]/g, '')) / 2).toLocaleString('en-US')

// The personal message that goes with each viewing link
// (/admin → 🔒 Viewing links → "Copy message" and "Write an email")
export function previewMessage(label: string, url: string, minutes: number) {
  return (
    `Hi${label ? ' ' + label : ''}! I made a preview of a new website for Annie's Sweets & Treats 🧁\n` +
    `${url}\n` +
    `When you press "Start viewing" you'll have ${minutes} minutes to look around (it works once, on one device). ` +
    `The quote is at the bottom. Would love to hear what you think!`
  )
}
