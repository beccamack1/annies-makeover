/* ==========================================================
   ANNIE'S - quote storage (used by submit-quote.mjs and
   admin-quotes.mjs). Accepted quotes are saved in the
   "quotes" store as quote/<id>.
   ========================================================== */
import { getStore } from "@netlify/blobs";

export const quotesStore = () => getStore({ name: "quotes", consistency: "strong" });
