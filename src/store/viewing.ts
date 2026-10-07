/* ==========================================================
   The "Viewing links" tab on /admin: the list of links and
   making, cancelling or deleting them. Uses the password from
   the admin store (src/store/admin.ts).
   ========================================================== */
import { create } from 'zustand'
import { AdminError, fetchViewingLinks, viewingAction, type ViewingAction, type ViewingLink } from '../lib/api'
import { loginErrors, useAdmin } from './admin'

type ViewingState = {
  links: ViewingLink[]
  load: () => Promise<void>
  act: (body: ViewingAction) => Promise<{ url?: string }>
}

export const useViewing = create<ViewingState>()((set, get) => ({
  links: [],

  load: async () => {
    try {
      set({ links: await fetchViewingLinks(useAdmin.getState().password) })
    } catch (error) {
      // if the password stopped working (changed in Netlify), sign out
      if (error instanceof AdminError && error.kind !== 'offline') useAdmin.getState().signOut(loginErrors[error.kind])
    }
  },

  act: async (body) => {
    const result = await viewingAction(useAdmin.getState().password, body)
    await get().load()
    return result
  },
}))
