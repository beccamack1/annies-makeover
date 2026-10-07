/* ==========================================================
   THE LOCK ON THE WEBSITE (runs in front of every page)
   - Becca, signed in to /admin: always let in.
   - <site>/view/<code>: the welcome page with "Start viewing";
     pressing it starts that link's 10 minutes on this device.
   - Anyone else: let in only while their link's time is running,
     otherwise show a friendly "private preview" page.
   The /admin page, its server pieces and the icons are not locked.
   Settings and the number of minutes: netlify/lib/viewing.mjs
   ========================================================== */
import { COOKIES, cookie, isCode, ownerToken, passState, randomCode, readCookies, viewingStore } from "../lib/viewing.mjs";

type Pass = { token: string; label: string; minutes: number; startedAt: number | null; deviceKey: string | null; revoked?: boolean };
type Ctx = { next: () => Promise<Response> };

declare const Netlify: { env: { get: (name: string) => string | undefined } };

export default async (req: Request, context: Ctx) => {
  if (Netlify.env.get("PREVIEW_LOCK") === "off") return context.next();

  const url = new URL(req.url);
  const cookies = readCookies(req.headers.get("cookie"));

  // Becca (signed in to /admin) can always see the site
  const password = Netlify.env.get("ADMIN_PASSWORD") || "";
  if (password && cookies[COOKIES.owner] && cookies[COOKIES.owner] === (await ownerToken(password))) {
    return context.next();
  }

  // A personal viewing link: /view/<code> or /view/<code>/start
  const view = url.pathname.match(/^\/view\/([A-Za-z0-9]+)(\/start)?\/?$/);
  if (view) return viewingLink(req, view[1], Boolean(view[2]), cookies);

  // Everything else needs a viewing link whose time is still running
  const code = cookies[COOKIES.pass];
  if (isCode(code)) {
    const pass = (await viewingStore().get("pass/" + code, { type: "json" })) as Pass | null;
    const mine = pass?.deviceKey && pass.deviceKey === cookies[COOKIES.device];
    if (pass && mine && passState(pass) === "viewing") return context.next();
    return blocked(url, "ended");
  }
  return blocked(url, "locked");
};

async function viewingLink(req: Request, code: string, start: boolean, cookies: Record<string, string>) {
  if (!isCode(code)) return page("notFound");
  const store = viewingStore();
  const found = await store.getWithMetadata("pass/" + code, { type: "json" });
  const pass = (found?.data ?? null) as Pass | null;
  if (!pass?.token || pass.revoked) return page("notFound");

  const state = passState(pass);
  const sameDevice = Boolean(pass.deviceKey) && pass.deviceKey === cookies[COOKIES.device];

  if (pass.startedAt) {
    if (!sameDevice) return page("used");
    if (state !== "viewing") return page("ended");
    return goToSite(pass, pass.deviceKey!); // came back to the link while time is left
  }

  // Not started yet: show the welcome page; the button starts the clock.
  // (Link previews in chat apps only look at the page, they don't press the button.)
  if (!start || req.method !== "POST") return page("welcome", pass);

  // Only the first press counts, even if two devices press at the same moment
  const started: Pass = { ...pass, startedAt: Date.now(), deviceKey: randomCode() };
  const write = found?.etag
    ? await store.setJSON("pass/" + code, started, { onlyIfMatch: found.etag })
    : await store.setJSON("pass/" + code, started);
  if (write.modified === false) return page("used");
  return goToSite(started, started.deviceKey!, true);
}

// firstTime: they just pressed "Start viewing", so the page sends Becca
// a "viewed" notice (Netlify Forms emails it to her)
function goToSite(pass: Pass, deviceKey: string, firstTime = false) {
  const until = pass.startedAt! + pass.minutes * 60_000;
  const secondsLeft = (until - Date.now()) / 1000;
  const headers = new Headers({ Location: "/", "Cache-Control": "no-store" });
  headers.append("Set-Cookie", cookie(COOKIES.pass, pass.token, secondsLeft + 60));
  headers.append("Set-Cookie", cookie(COOKIES.device, deviceKey, 60 * 60 * 24 * 365));
  headers.append("Set-Cookie", cookie(COOKIES.until, String(until), secondsLeft + 60, { httpOnly: false }));
  if (firstTime) {
    headers.append("Set-Cookie", cookie(COOKIES.started, encodeURIComponent(pass.label || "Someone"), 300, { httpOnly: false }));
  }
  return new Response(null, { status: 303, headers });
}

function blocked(url: URL, kind: "ended" | "locked") {
  if (url.pathname.startsWith("/api/")) {
    return Response.json({ error: "This private preview has ended." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  return page(kind);
}

// ---------- The small pages people see instead of the site ----------

const TEXT = {
  welcome: {
    title: "A private preview",
    body: (p?: Pass) =>
      `This is an early look at a new website for <em>Annie’s Sweets &amp; Treats</em>${p?.label ? `, made for ${escapeHtml(p.label)}` : ""}.` +
      ` When you press the button you’ll have <strong>${p?.minutes ?? 10} minutes</strong> to look around.` +
      ` The link works once, on this device only.`,
  },
  ended: {
    title: "Your preview has ended",
    body: () => "Thank you for taking a look at the new Annie’s Sweets &amp; Treats website 🧁 To see it again, please ask whoever sent you the link for a new one.",
  },
  used: {
    title: "This link has already been used",
    body: () => "Each preview link works once, on one device. Please ask whoever sent it to you for a new link.",
  },
  locked: {
    title: "A private preview",
    body: () => "The new Annie’s Sweets &amp; Treats website is a private preview for now. You’ll need a personal viewing link to see it.",
  },
  notFound: {
    title: "This link isn’t valid",
    body: () => "Please check the link, or ask whoever sent it to you for a new one.",
  },
};

// Annie's red-hood mascot in the teal bubble (same drawing as the site's tab icon)
const MASCOT = `<img class="mascot" src="/favicon.png" alt="">`;

function page(kind: keyof typeof TEXT, pass?: Pass) {
  const t = TEXT[kind];
  const button =
    kind === "welcome" && pass
      ? `<form method="post" action="/view/${pass.token}/start"><button type="submit">Start viewing</button></form>`
      : "";
  const owner = kind === "locked" ? `<p class="small"><a href="/admin">Owner sign-in</a></p>` : "";
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="color-scheme" content="light"><title>${t.title} · Annie’s Sweets &amp; Treats</title>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="icon" type="image/png" sizes="360x360" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Fredoka:wght@600&family=Nunito:wght@400;700;800&display=swap">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;background:#DDF2EC;color:#6B5F61;font:400 1.05rem/1.7 "Nunito",system-ui,sans-serif}
  main{width:min(520px,100%);padding:40px 32px;background:#FFFAF5;border:2px solid #2A2122;border-radius:24px;box-shadow:0 8px 0 #2A2122;text-align:center}
  .mascot{width:84px;height:84px;margin:0 auto 12px;display:block}
  .eyebrow{display:inline-block;margin:0 0 6px;color:#E0232A;font:700 1.6rem/1.1 "Caveat",cursive}
  h1{margin:0 0 14px;color:#2A2122;font:600 2.1rem/1.15 "Fredoka","Nunito",system-ui,sans-serif}
  p{margin:0 0 22px}
  em{font-style:normal;font-weight:800;color:#2A2122}
  strong{color:#2A2122}
  button{min-height:52px;padding:0 32px;border:2px solid #E0232A;border-radius:999px;background:#E0232A;color:#fff;font:600 1.1rem "Fredoka","Nunito",system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 0 #A3141A}
  button:hover{transform:translateY(-1px)}
  .small{margin:18px 0 0;font-size:.85rem}
  a{color:#1C6F6D;font-weight:700}
</style></head>
<body><main>
  ${MASCOT}
  <p class="eyebrow">Annie’s Sweets &amp; Treats</p>
  <h1>${t.title}</h1>
  <p>${t.body(pass)}</p>
  ${button}${owner}
</main></body></html>`;
  // Always 200: these are friendly pages, and an error status makes some
  // servers try other addresses and show the wrong page
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export const config = {
  path: "/*",
  excludedPath: [
    "/admin",
    "/admin.html",
    "/assets/*",
    "/api/admin/*",
    "/favicon.png",
    "/favicon-32.png",
    "/apple-touch-icon.png",
    "/.netlify/*",
    // only used by "npx netlify dev" on this computer (the admin page's code)
    "/src/*",
    "/@vite/*",
    "/@react-refresh",
    "/@id/*",
    "/@fs/*",
    "/node_modules/*",
  ],
};
