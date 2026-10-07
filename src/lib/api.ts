/* ==========================================================
   Talking to the server pieces (netlify/functions/): the
   /admin page (viewing links, quote requests) and the quote.
   These only work on Netlify, or with "npx netlify dev".
   ========================================================== */

// Errors the /admin page knows how to explain
export class AdminError extends Error {
  kind: 'wrong-password' | 'not-set-up' | 'offline'
  constructor(kind: AdminError['kind']) {
    super(kind)
    this.kind = kind
  }
}

// ---------- Viewing links (netlify/functions/admin-viewing.mjs) ----------

export type ViewingLink = {
  id: string
  label: string
  minutes: number
  createdAt: string
  startedAt: number | null
  state: 'not-opened' | 'viewing' | 'ended' | 'revoked'
  url: string
}

export type ViewingAction =
  | { action: 'create-pass'; label: string }
  | { action: 'revoke-pass'; id: string }
  | { action: 'delete-pass'; id: string }

// Also tells the locked website that this browser is the owner's
export async function fetchViewingLinks(password: string): Promise<ViewingLink[]> {
  let response: Response
  try {
    response = await fetch('/api/admin/viewing', { headers: { 'x-admin-password': password } })
  } catch {
    throw new AdminError('offline')
  }
  if (response.status === 401) throw new AdminError('wrong-password')
  if (response.status === 503) throw new AdminError('not-set-up')
  if (!response.ok) throw new AdminError('offline')
  return response.json()
}

export async function viewingAction(password: string, body: ViewingAction): Promise<{ url?: string }> {
  const response = await fetch('/api/admin/viewing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify(body),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || "That didn't work. Please try again.")
  return result
}

// Signing out of /admin also stops the locked site recognizing this browser
export const forgetOwner = () => fetch('/api/admin/viewing', { method: 'DELETE' }).catch(() => undefined)

// ---------- The quote (netlify/functions/submit-quote.mjs, admin-quotes.mjs) ----------

export type QuoteRequest = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  option?: 'quote' | 'basic' // older requests have no option: they accepted the quote
  createdAt: string
}

export async function submitQuote(answers: FormData): Promise<void> {
  // 1. save it so Becca sees it on /admin
  const response = await fetch('/api/quote/submit', { method: 'POST', body: answers })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || "That didn't send. Please try again.")

  // 2. send a copy to Netlify Forms, which emails Becca.
  //    If only this part fails, the quote is still saved.
  fetch('/', { method: 'POST', body: new URLSearchParams(answers as unknown as Record<string, string>) }).catch(() => {})
}

export async function fetchQuotes(password: string): Promise<QuoteRequest[]> {
  const response = await fetch('/api/admin/quotes', { headers: { 'x-admin-password': password } })
  if (!response.ok) throw new Error('status ' + response.status)
  return response.json()
}

export async function deleteQuote(password: string, id: string): Promise<void> {
  const response = await fetch('/api/admin/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify({ action: 'delete', id }),
  })
  if (!response.ok) throw new Error("That didn't work. Please try again.")
}
