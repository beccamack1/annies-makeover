/* ==========================================================
   ANNIE'S - shared helpers for the server pieces in
   netlify/functions/ (the /admin page and the quote).

   The /admin page needs the password saved in Netlify as the
   ADMIN_PASSWORD environment variable.
   ========================================================== */
import { createHash, timingSafeEqual } from "node:crypto";

export function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

// ---------- Admin password ----------

function adminPassword() {
  return Netlify.env.get("ADMIN_PASSWORD") || "";
}

export function adminIsSetUp() {
  return adminPassword().length > 0;
}

// Compares the typed password with the real one without leaking
// how many letters matched (hashing makes both the same length).
export function isAdmin(req) {
  const real = adminPassword();
  const typed = req.headers.get("x-admin-password") || "";
  if (!real || !typed) return false;
  const a = createHash("sha256").update(typed).digest();
  const b = createHash("sha256").update(real).digest();
  return timingSafeEqual(a, b);
}

// A short unique id, like "mgf3k2a1-x7k2pq"
export function newId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
