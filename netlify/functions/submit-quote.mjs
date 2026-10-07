/* ==========================================================
   POST /api/quote/submit
   The owners pressed "Accept this quote" on the preview site.
   Saves their details in the "quotes" store, so Becca sees them
   on /admin (💌 Quote). A copy also goes to Netlify Forms, which
   emails Becca (sent by the page, see QuoteSection.tsx).
   ========================================================== */
import { quotesStore } from "../lib/quotes.mjs";
import { json, newId } from "../lib/admin.mjs";

const clean = (value, max) => String(value || "").trim().slice(0, max);

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  let form;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "That didn't look right." }, 400);
  }

  // The hidden spam-trap field. People leave it empty; robots fill it in.
  if (form.get("bot-field")) return json({ ok: true }, 201);

  const name = clean(form.get("name"), 80);
  const email = clean(form.get("email"), 120);
  const phone = clean(form.get("phone"), 40);
  const message = clean(form.get("message"), 1000);
  // "quote" = accepted the quote, "basic" = asked about the cheaper basic options
  const option = form.get("option") === "basic" ? "basic" : "quote";

  if (!name) return json({ error: "Please add your name." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please check your email address." }, 400);

  const id = newId();
  await quotesStore().setJSON("quote/" + id, {
    id,
    name,
    email,
    phone,
    message,
    option,
    createdAt: new Date().toISOString(),
  });
  return json({ ok: true }, 201);
};

export const config = { path: "/api/quote/submit" };
