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
   netlify/lib/viewing.mjs).
   ========================================================== */
import { adminIsSetUp, isAdmin, json } from "../lib/admin.mjs";
import { COOKIES, VIEW_MINUTES, cookie, ownerCookie, passState, randomCode, viewingStore } from "../lib/viewing.mjs";

const clean = (value, max) => String(value || "").trim().slice(0, max);

export default async (req) => {
  if (req.method === "DELETE") {
    return json({ ok: true }, 200, { "Set-Cookie": cookie(COOKIES.owner, "", 0) });
  }
  if (!adminIsSetUp()) return json({ error: "not-set-up" }, 503);
  if (!isAdmin(req)) return json({ error: "wrong-password" }, 401);

  const origin = new URL(req.url).origin;
  const store = viewingStore();

  if (req.method === "GET") {
    const { blobs } = await store.list({ prefix: "pass/" });
    const passes = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    const now = Date.now();
    const links = passes
      .filter((p) => p?.token)
      .map((p) => ({
        id: p.token,
        label: p.label,
        minutes: p.minutes,
        createdAt: p.createdAt,
        startedAt: p.startedAt,
        state: passState(p, now),
        url: origin + "/view/" + p.token,
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return json(links, 200, { "Set-Cookie": await ownerCookie(Netlify.env.get("ADMIN_PASSWORD")) });
  }

  if (req.method !== "POST") return json({ error: "Use GET, POST or DELETE" }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad-request" }, 400);
  }

  switch (body.action) {
    case "create-pass": {
      const token = randomCode();
      await store.setJSON("pass/" + token, {
        token,
        label: clean(body.label, 60),
        minutes: VIEW_MINUTES,
        startedAt: null,
        deviceKey: null,
        createdAt: new Date().toISOString(),
      });
      return json({ ok: true, url: origin + "/view/" + token });
    }
    case "revoke-pass":
    case "delete-pass": {
      if (typeof body.id !== "string") return json({ error: "bad-request" }, 400);
      const pass = await store.get("pass/" + body.id, { type: "json" });
      if (!pass?.token) return json({ error: "That link isn't here anymore." }, 404);
      if (body.action === "delete-pass") await store.delete("pass/" + body.id);
      else await store.setJSON("pass/" + body.id, { ...pass, revoked: true });
      return json({ ok: true });
    }
    default:
      return json({ error: "bad-request" }, 400);
  }
};

export const config = { path: "/api/admin/viewing" };
