/* ==========================================================
   THE LOCK ON THE WEBSITE (runs in front of every page)
   - Becca, signed in to /admin: always let in.
   - <site>/view/<code>: the welcome page with "Start viewing";
     pressing it starts that link's 10 minutes on this device.
   - Anyone else: let in only while their link's time is running,
     otherwise show a friendly "private preview" page.
   The /admin page, its server pieces and the icons are not locked.
   Settings and the number of minutes: server/viewing.ts
   The pages people see: server/lockPages.ts
   ========================================================== */
import { getPass, startPass } from '../server/db'
import type { Env } from '../server/env'
import { page } from '../server/lockPages'
import { COOKIES, cookie, isCode, ownerToken, passState, randomCode, readCookies, type Pass } from '../server/viewing'

// Never locked: the /admin page and its code, its server pieces, and the icons
const OPEN = [
  /^\/admin(\.html)?\/?$/,
  /^\/assets\//,
  /^\/api\/admin\//,
  /^\/(favicon\.png|favicon-32\.png|apple-touch-icon\.png)$/,
]

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  if (env.PREVIEW_LOCK === 'off') return next()

  const url = new URL(request.url)
  if (OPEN.some((path) => path.test(url.pathname))) return next()

  const cookies = readCookies(request.headers.get('cookie'))

  // Becca (signed in to /admin) can always see the site
  const password = env.ADMIN_PASSWORD || ''
  if (password && cookies[COOKIES.owner] && cookies[COOKIES.owner] === (await ownerToken(password))) {
    return next()
  }

  // A personal viewing link: /view/<code> or /view/<code>/start
  const view = url.pathname.match(/^\/view\/([A-Za-z0-9]+)(\/start)?\/?$/)
  if (view) return viewingLink(request, env, view[1], Boolean(view[2]), cookies)

  // Everything else needs a viewing link whose time is still running
  const code = cookies[COOKIES.pass]
  if (isCode(code)) {
    const pass = await getPass(env.DB, code)
    const mine = pass?.deviceKey && pass.deviceKey === cookies[COOKIES.device]
    if (pass && mine && passState(pass) === 'viewing') return next()
    return blocked(url, 'ended')
  }
  return blocked(url, 'locked')
}

async function viewingLink(request: Request, env: Env, code: string, start: boolean, cookies: Record<string, string>) {
  if (!isCode(code)) return page('notFound')
  const pass = await getPass(env.DB, code)
  if (!pass || pass.revoked) return page('notFound')

  const sameDevice = Boolean(pass.deviceKey) && pass.deviceKey === cookies[COOKIES.device]

  if (pass.startedAt) {
    if (!sameDevice) return page('used')
    if (passState(pass) !== 'viewing') return page('ended')
    return goToSite(pass, pass.deviceKey!) // came back to the link while time is left
  }

  // Not started yet: show the welcome page; the button starts the clock.
  // (Link previews in chat apps only look at the page, they don't press the button.)
  if (!start || request.method !== 'POST') return page('welcome', pass)

  // Only the first press counts, even if two devices press at the same moment
  const started: Pass = { ...pass, startedAt: Date.now(), deviceKey: randomCode() }
  if (!(await startPass(env.DB, code, started.startedAt!, started.deviceKey!))) return page('used')
  return goToSite(started, started.deviceKey!)
}

function goToSite(pass: Pass, deviceKey: string) {
  const until = pass.startedAt! + pass.minutes * 60_000
  const secondsLeft = (until - Date.now()) / 1000
  const headers = new Headers({ Location: '/', 'Cache-Control': 'no-store' })
  headers.append('Set-Cookie', cookie(COOKIES.pass, pass.token, secondsLeft + 60))
  headers.append('Set-Cookie', cookie(COOKIES.device, deviceKey, 60 * 60 * 24 * 365))
  headers.append('Set-Cookie', cookie(COOKIES.until, String(until), secondsLeft + 60, { httpOnly: false }))
  return new Response(null, { status: 303, headers })
}

function blocked(url: URL, kind: 'ended' | 'locked') {
  if (url.pathname.startsWith('/api/')) {
    return Response.json({ error: 'This private preview has ended.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }
  return page(kind)
}
