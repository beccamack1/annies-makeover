/* ==========================================================
   /api/admin/quotes  (used by the "💌 Quote" tab on /admin)
   GET   every accepted quote, newest first
   POST  { action: "delete", id }
   Both need the ADMIN_PASSWORD in the x-admin-password header.
   ========================================================== */
import { adminIsSetUp, isAdmin, json } from '../../../server/admin'
import { deleteQuote, listQuotes } from '../../../server/db'
import type { Env } from '../../../server/env'

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (!adminIsSetUp(env)) return json({ error: 'not-set-up' }, 503)
  if (!(await isAdmin(request, env))) return json({ error: 'wrong-password' }, 401)

  if (request.method === 'GET') return json(await listQuotes(env.DB))

  if (request.method === 'POST') {
    let body: { action?: string; id?: unknown }
    try {
      body = await request.json()
    } catch {
      return json({ error: 'bad-request' }, 400)
    }
    if (body.action !== 'delete' || typeof body.id !== 'string') return json({ error: 'bad-request' }, 400)
    await deleteQuote(env.DB, body.id)
    return json({ ok: true })
  }

  return json({ error: 'Use GET or POST' }, 405)
}
