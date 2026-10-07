/* ==========================================================
   The /admin page's state: who's signed in, and the little
   sign-in message. The password is remembered until this
   browser tab is closed.
   Signing in loads the viewing links, which checks the password
   and tells the locked website this browser is the owner's.
   ========================================================== */
import { create } from 'zustand'
import { AdminError, fetchViewingLinks, forgetOwner } from '../lib/api'

const SAVED_KEY = 'annies-admin'

function loadSavedPassword(): string {
  try {
    return sessionStorage.getItem(SAVED_KEY) || ''
  } catch {
    return ''
  }
}

function savePassword(password: string) {
  try {
    if (password) sessionStorage.setItem(SAVED_KEY, password)
    else sessionStorage.removeItem(SAVED_KEY)
  } catch {
    // some browsers block this. You'll just sign in again next time.
  }
}

export const loginErrors: Record<AdminError['kind'], string> = {
  'wrong-password': "That password isn't right. Try again.",
  'not-set-up': "The admin password hasn't been set up in Cloudflare yet (ADMIN_PASSWORD).",
  offline: "Couldn't reach the website. Check your internet connection and try again.",
}

type AdminState = {
  password: string
  signedIn: boolean
  message: string
  signIn: (password: string) => Promise<void>
  signOut: (message?: string) => void
  check: () => Promise<void>
}

export const useAdmin = create<AdminState>()((set, get) => ({
  password: loadSavedPassword(),
  signedIn: false,
  message: '',

  signIn: async (password) => {
    savePassword(password)
    set({ password, message: '' })
    await get().check()
  },

  signOut: (message = '') => {
    savePassword('')
    forgetOwner()
    set({ password: '', signedIn: false, message })
  },

  // checks the password by loading the viewing links
  check: async () => {
    try {
      await fetchViewingLinks(get().password)
      set({ signedIn: true, message: '' })
    } catch (error) {
      const kind = error instanceof AdminError ? error.kind : 'offline'
      if (kind === 'offline') set({ message: loginErrors.offline })
      else get().signOut(loginErrors[kind])
    }
  },
}))
