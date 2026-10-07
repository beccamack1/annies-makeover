/* ==========================================================
   The small pages people see instead of the site while it's
   locked (used by functions/_middleware.ts). Change the words
   in TEXT below.
   ========================================================== */
import type { Pass } from './viewing'

const TEXT = {
  welcome: {
    title: 'A private preview',
    body: (p?: Pass) =>
      `This is an early look at a new website for <em>Annie’s Sweets &amp; Treats</em>${p?.label ? `, made for ${escapeHtml(p.label)}` : ''}.` +
      ` When you press the button you’ll have <strong>${p?.minutes ?? 10} minutes</strong> to look around.` +
      ` The link works once, on this device only.`,
  },
  ended: {
    title: 'Your preview has ended',
    body: () => 'Thank you for taking a look at the new Annie’s Sweets &amp; Treats website 🧁 To see it again, please ask whoever sent you the link for a new one.',
  },
  used: {
    title: 'This link has already been used',
    body: () => 'Each preview link works once, on one device. Please ask whoever sent it to you for a new link.',
  },
  locked: {
    title: 'A private preview',
    body: () => 'The new Annie’s Sweets &amp; Treats website is a private preview for now. You’ll need a personal viewing link to see it.',
  },
  notFound: {
    title: 'This link isn’t valid',
    body: () => 'Please check the link, or ask whoever sent it to you for a new one.',
  },
}

export type PageKind = keyof typeof TEXT

// Annie's original logo (the same file as the site's tab icon)
const LOGO = `<img class="logo" src="/favicon.png" alt="">`

export function page(kind: PageKind, pass?: Pass) {
  const t = TEXT[kind]
  const button =
    kind === 'welcome' && pass
      ? `<form method="post" action="/view/${pass.token}/start"><button type="submit">Start viewing</button></form>`
      : ''
  const owner = kind === 'locked' ? `<p class="small"><a href="/admin">Owner sign-in</a></p>` : ''
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="color-scheme" content="light"><title>${t.title} · Annie’s Sweets &amp; Treats</title>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="icon" type="image/png" sizes="360x360" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Fredoka:wght@600&family=Nunito:wght@400;700;800&display=swap">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;background:#DDF2EC;color:#6B5F61;font:400 1.05rem/1.7 "Nunito",system-ui,sans-serif}
  main{width:min(520px,100%);padding:40px 32px;background:#FFFAF5;border:2px solid #2A2122;border-radius:24px;box-shadow:0 8px 0 #2A2122;text-align:center}
  .logo{width:84px;height:84px;margin:0 auto 12px;display:block}
  .eyebrow{display:inline-block;margin:0 0 6px;color:#E0232A;font:700 1.6rem/1.1 "Caveat",cursive}
  h1{margin:0 0 14px;color:#2A2122;font:600 2.1rem/1.15 "Fredoka","Nunito",system-ui,sans-serif}
  p{margin:0 0 22px}
  em{font-style:normal;font-weight:800;color:#2A2122}
  strong{color:#2A2122}
  button{min-height:52px;padding:0 32px;border:2px solid #E0232A;border-radius:999px;background:#E0232A;color:#fff;font:600 1.1rem "Fredoka","Nunito",system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 0 #A3141A}
  button:hover{transform:translateY(-1px)}
  .small{margin:18px 0 0;font-size:.85rem}
  a{color:#1C6F6D;font-weight:700}
</style></head>
<body><main>
  ${LOGO}
  <p class="eyebrow">Annie’s Sweets &amp; Treats</p>
  <h1>${t.title}</h1>
  <p>${t.body(pass)}</p>
  ${button}${owner}
</main></body></html>`
  // Always 200: these are friendly pages, and an error status makes some
  // servers try other addresses and show the wrong page
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}
