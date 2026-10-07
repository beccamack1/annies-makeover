/* ==========================================================
   PRIVATE VIEWING LINKS (same as Minimo)
   While this is a pitch, the website is locked. Becca makes a
   personal link for each person on the /admin page:
     <site>/view/<code>
   They press "Start viewing", get VIEW_MINUTES minutes on that
   one device, and then the link never works again.
   Saved in the database's "passes" table (server/db.ts).

   To switch the lock off completely, set PREVIEW_LOCK=off in
   Cloudflare (see README).
   Used by functions/_middleware.ts and
   functions/api/admin/viewing.ts.
   ========================================================== */

// How long each viewing link lasts, in minutes
export const VIEW_MINUTES = 10

export type Pass = {
  token: string
  label: string
  minutes: number
  startedAt: number | null
  deviceKey: string | null
  revoked: boolean
  createdAt: string
}

export const COOKIES = {
  owner: 'annies_owner', // Becca, signed in to /admin
  pass: 'annies_pass', // which viewing link this browser is using
  device: 'annies_device', // ties a viewing link to the first device that opened it
  until: 'annies_view_until', // when the preview ends (the page shows a countdown)
}

const enc = new TextEncoder()

// A random code like "k3Jd9xQ2mZpL7vB1nR5tW8yA"
export function randomCode(length = 24) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

export const isCode = (s: unknown): s is string => typeof s === 'string' && /^[A-Za-z0-9]{16,40}$/.test(s)

// The owner cookie's value: a signature made from the admin password,
// so it can't be guessed and stops working if the password changes.
export async function ownerToken(password: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('annies-owner-v1'))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

export function cookie(name: string, value: string, maxAgeSeconds: number, { httpOnly = true } = {}) {
  return [
    `${name}=${value}`,
    'Path=/',
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
    'SameSite=Lax',
    'Secure',
    httpOnly ? 'HttpOnly' : '',
  ].filter(Boolean).join('; ')
}

export function readCookies(header: string | null) {
  const out: Record<string, string> = {}
  for (const part of (header || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim()
  }
  return out
}

// "not-opened", "viewing", "ended" or "revoked"
export function passState(pass: Pass, now = Date.now()) {
  if (pass.revoked) return 'revoked'
  if (!pass.startedAt) return 'not-opened'
  return now < pass.startedAt + pass.minutes * 60_000 ? 'viewing' : 'ended'
}

// Tells the browser it belongs to Becca for 30 days, so the locked site
// lets it in. Sent whenever she signs in to /admin.
export async function ownerCookie(password: string) {
  return cookie(COOKIES.owner, await ownerToken(password), 60 * 60 * 24 * 30)
}
