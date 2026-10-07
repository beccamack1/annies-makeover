/* ==========================================================
   What Cloudflare gives the server pieces (functions/):
   - DB: the database for viewing links and quote requests
     (set up in wrangler.toml)
   - ADMIN_PASSWORD: the /admin password (a Cloudflare secret;
     on this computer it's in .dev.vars)
   - PREVIEW_LOCK: "off" switches the lock off (see README)
   ========================================================== */
export type Env = {
  DB: D1Database
  ADMIN_PASSWORD?: string
  PREVIEW_LOCK?: string
}
