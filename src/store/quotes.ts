/* ==========================================================
   The "💌 Quote" tab on /admin: who pressed "Accept this quote".
   Uses the password from the admin store (src/store/admin.ts).
   ========================================================== */
import { create } from 'zustand'
import { deleteQuote, fetchQuotes, type QuoteRequest } from '../lib/api'
import { useAdmin } from './admin'

type QuotesState = {
  quotes: QuoteRequest[]
  load: () => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useQuotes = create<QuotesState>()((set, get) => ({
  quotes: [],

  load: async () => {
    try {
      set({ quotes: await fetchQuotes(useAdmin.getState().password) })
    } catch {
      // the viewing links tab already explains sign-in problems
    }
  },

  remove: async (id) => {
    await deleteQuote(useAdmin.getState().password, id)
    await get().load()
  },
}))
