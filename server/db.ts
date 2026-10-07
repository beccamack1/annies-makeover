/* ==========================================================
   THE DATABASE (Cloudflare D1): viewing links and quote
   requests. The tables are made automatically the first time
   the site runs, so there's nothing to set up by hand.
   ========================================================== */
import type { Pass } from './viewing'

let ready: Promise<unknown> | null = null

export function ensureTables(db: D1Database) {
  ready ??= db
    .batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS passes (
        token TEXT PRIMARY KEY,
        label TEXT NOT NULL DEFAULT '',
        minutes INTEGER NOT NULL,
        started_at INTEGER,
        device_key TEXT,
        revoked INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS quotes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        message TEXT NOT NULL DEFAULT '',
        option TEXT NOT NULL DEFAULT 'quote',
        created_at TEXT NOT NULL
      )`),
    ])
    .catch((error) => {
      ready = null // try again next time
      throw error
    })
  return ready
}

// ---------- Viewing links ----------

type PassRow = {
  token: string
  label: string
  minutes: number
  started_at: number | null
  device_key: string | null
  revoked: number
  created_at: string
}

const toPass = (row: PassRow): Pass => ({
  token: row.token,
  label: row.label,
  minutes: row.minutes,
  startedAt: row.started_at,
  deviceKey: row.device_key,
  revoked: row.revoked === 1,
  createdAt: row.created_at,
})

export async function getPass(db: D1Database, token: string) {
  await ensureTables(db)
  const row = await db.prepare('SELECT * FROM passes WHERE token = ?').bind(token).first<PassRow>()
  return row ? toPass(row) : null
}

export async function listPasses(db: D1Database) {
  await ensureTables(db)
  const { results } = await db.prepare('SELECT * FROM passes ORDER BY created_at DESC').all<PassRow>()
  return results.map(toPass)
}

export async function addPass(db: D1Database, pass: Pass) {
  await ensureTables(db)
  await db
    .prepare('INSERT INTO passes (token, label, minutes, started_at, device_key, revoked, created_at) VALUES (?, ?, ?, NULL, NULL, 0, ?)')
    .bind(pass.token, pass.label, pass.minutes, pass.createdAt)
    .run()
}

// Starts a link's minutes. Only the first press counts, even if two
// devices press at the same moment: returns false for the second one.
export async function startPass(db: D1Database, token: string, startedAt: number, deviceKey: string) {
  await ensureTables(db)
  const result = await db
    .prepare('UPDATE passes SET started_at = ?, device_key = ? WHERE token = ? AND started_at IS NULL AND revoked = 0')
    .bind(startedAt, deviceKey, token)
    .run()
  return result.meta.changes === 1
}

export async function revokePass(db: D1Database, token: string) {
  await ensureTables(db)
  await db.prepare('UPDATE passes SET revoked = 1 WHERE token = ?').bind(token).run()
}

export async function deletePass(db: D1Database, token: string) {
  await ensureTables(db)
  await db.prepare('DELETE FROM passes WHERE token = ?').bind(token).run()
}

// ---------- Quote requests ----------

export type Quote = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  option: 'quote' | 'basic'
  createdAt: string
}

type QuoteRow = Omit<Quote, 'createdAt'> & { created_at: string }

export async function addQuote(db: D1Database, quote: Quote) {
  await ensureTables(db)
  await db
    .prepare('INSERT INTO quotes (id, name, email, phone, message, option, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(quote.id, quote.name, quote.email, quote.phone, quote.message, quote.option, quote.createdAt)
    .run()
}

export async function listQuotes(db: D1Database): Promise<Quote[]> {
  await ensureTables(db)
  const { results } = await db.prepare('SELECT * FROM quotes ORDER BY created_at DESC').all<QuoteRow>()
  return results.map(({ created_at, ...rest }) => ({ ...rest, createdAt: created_at }))
}

export async function deleteQuote(db: D1Database, id: string) {
  await ensureTables(db)
  await db.prepare('DELETE FROM quotes WHERE id = ?').bind(id).run()
}
