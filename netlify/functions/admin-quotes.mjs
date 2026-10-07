/* ==========================================================
   /api/admin/quotes  (used by the "💌 Quote" tab on /admin)
   GET   every accepted quote, newest first
   POST  { action: "delete", id }
   Both need the ADMIN_PASSWORD in the x-admin-password header.
   ========================================================== */
import { adminIsSetUp, isAdmin, json } from "../lib/admin.mjs";
import { quotesStore } from "../lib/quotes.mjs";

export default async (req) => {
  if (!adminIsSetUp()) return json({ error: "not-set-up" }, 503);
  if (!isAdmin(req)) return json({ error: "wrong-password" }, 401);

  const store = quotesStore();

  if (req.method === "GET") {
    const { blobs } = await store.list({ prefix: "quote/" });
    const quotes = (await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" }))))
      .filter(Boolean)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return json(quotes);
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "bad-request" }, 400);
    }
    if (body.action !== "delete" || typeof body.id !== "string") return json({ error: "bad-request" }, 400);
    await store.delete("quote/" + body.id);
    return json({ ok: true });
  }

  return json({ error: "Use GET or POST" }, 405);
};

export const config = { path: "/api/admin/quotes" };
