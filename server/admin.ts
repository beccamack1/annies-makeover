/* ==========================================================
   ANNIE'S - shared helpers for the server pieces in
   functions/ (the /admin page and the quote).

   The /admin page needs the password saved in Cloudflare as
   the ADMIN_PASSWORD secret.
   ========================================================== */
import type { Env } from './env'

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
}

// ---------- Admin password ----------

export function adminIsSetUp(env: Env) {
  return (env.ADMIN_PASSWORD || '').length > 0
}

const sha256 = async (text: string) =>
  new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))

// Compares the typed password with the real one without leaking
// how many letters matched (hashing makes both the same length).
export async function isAdmin(request: Request, env: Env) {
  const real = env.ADMIN_PASSWORD || ''
  const typed = request.headers.get('x-admin-password') || ''
  if (!real || !typed) return false
  const [a, b] = await Promise.all([sha256(typed), sha256(real)])
  let difference = 0
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i]
  return difference === 0
}

// A short unique id, like "mgf3k2a1-x7k2pq"
export function newId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

export const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max)
