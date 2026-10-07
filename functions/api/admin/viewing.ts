/* ==========================================================
   /api/admin/viewing  (used by the "Viewing links" tab on /admin)
   GET     every viewing link, with its state
   POST    { action, ... }
           "create-pass"  { label }  a new 10-minute viewing link
           "revoke-pass"  { id }     stop a viewing link working
           "delete-pass"  { id }     remove it from the list
   DELETE  forget the owner on this browser (signing out)
   GET and POST need the ADMIN_PASSWORD in the x-admin-password
   header. Signing in also tells this browser it belongs to the
   owner, so the locked website lets Becca in (see
   server/viewing.ts).
   ========================================================== */
import { adminIsSetUp, clean, isAdmin, json } from '../../../server/admin'
import { addPass, deletePass, getPass, listPasses, revokePass } from '../../../server/db'
import type { Env } from '../../../server/env'
import { COOKIES, VIEW_MINUTES, cookie, ownerCookie, passState, randomCode } from '../../../server/viewing'

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'DELETE') {
    return json({ ok: true }, 200, { 'Set-Cookie': cookie(COOKIES.owner, '', 0) })
  }
  if (!adminIsSetUp(env)) return json({ error: 'not-set-up' }, 503)
  if (!(await isAdmin(request, env))) return json({ error: 'wrong-password' }, 401)

  const origin = new URL(request.url).origin

  if (request.method === 'GET') {
    const now = Date.now()
    const links = (await listPasses(env.DB)).map((p) => ({
      id: p.token,
      label: p.label,
      minutes: p.minutes,
      createdAt: p.createdAt,
      startedAt: p.startedAt,
      state: passState(p, now),
      url: origin + '/view/' + p.token,
    }))
    return json(links, 200, { 'Set-Cookie': await ownerCookie(env.ADMIN_PASSWORD!) })
  }

  if (request.method !== 'POST') return json({ error: 'Use GET, POST or DELETE' }, 405)

  let body: { action?: string; label?: string; id?: unknown }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad-request' }, 400)
  }

  switch (body.action) {
    case 'create-pass': {
      const token = randomCode()
      await addPass(env.DB, {
        token,
        label: clean(body.label, 60),
        minutes: VIEW_MINUTES,
        startedAt: null,
        deviceKey: null,
        revoked: false,
        createdAt: new Date().toISOString(),
      })
      return json({ ok: true, url: origin + '/view/' + token })
    }
    case 'revoke-pass':
    case 'delete-pass': {
      if (typeof body.id !== 'string') return json({ error: 'bad-request' }, 400)
      if (!(await getPass(env.DB, body.id))) return json({ error: "That link isn't here anymore." }, 404)
      if (body.action === 'delete-pass') await deletePass(env.DB, body.id)
      else await revokePass(env.DB, body.id)
      return json({ ok: true })
    }
    default:
      return json({ error: 'bad-request' }, 400)
  }
}
