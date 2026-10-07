/* ==========================================================
   THE /admin PAGE: sign in, then two tabs
   1. 🔒 Viewing links: make 10-minute links to the locked site
      (ViewingLinks.tsx)
   2. 💌 Quote: who accepted the quote (QuoteRequests.tsx)

   The password is the ADMIN_PASSWORD environment variable in
   Netlify (Project configuration → Environment variables).
   The state lives in src/store/admin.ts.
   ========================================================== */
import { useEffect, useState, type FormEvent } from 'react'
import { shopName } from '../data/shop'
import { useAdmin } from '../store/admin'
import { useViewing } from '../store/viewing'
import QuoteRequests from './QuoteRequests'
import ViewingLinks from './ViewingLinks'

export default function AdminPage() {
  const { password, signedIn, message, signIn, signOut, check } = useAdmin()
  const [typed, setTyped] = useState('')
  const [section, setSection] = useState<'links' | 'quote'>('links')

  // sign in right away if the password was remembered
  useEffect(() => {
    if (useAdmin.getState().password) check()
  }, [check])

  // once signed in, load the viewing links. That also tells the
  // locked website this browser is the owner's, so "View website" works.
  useEffect(() => {
    if (signedIn) useViewing.getState().load()
  }, [signedIn])

  function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    signIn(typed)
    setTyped('')
  }

  // ---------- Not signed in: the password box ----------
  if (!password || !signedIn) {
    return (
      <main className="admin">
        <AdminHeader />
        <form className="admin-form admin-login" onSubmit={handleSignIn}>
          <h1>Owner sign-in</h1>
          <p>Sign in to make viewing links for the private preview and see who accepted the quote.</p>
          <div className="field">
            <label htmlFor="admin-password">Admin password</label>
            <input
              type="password"
              id="admin-password"
              autoComplete="current-password"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              required
            />
          </div>
          {message && <p className="form-error" role="alert">{message}</p>}
          <button type="submit" className="btn">{password && !message ? 'Loading…' : 'Sign in'}</button>
        </form>
      </main>
    )
  }

  // ---------- Signed in: the two tabs ----------
  return (
    <main className="admin">
      <AdminHeader onSignOut={() => signOut()} />
      <h1 className="admin-title">{shopName} admin</h1>

      <div className="admin-sections" role="tablist">
        <button type="button" role="tab" aria-selected={section === 'links'}
          className={section === 'links' ? 'section-tab active' : 'section-tab'} onClick={() => setSection('links')}>
          🔒 Viewing links
        </button>
        <button type="button" role="tab" aria-selected={section === 'quote'}
          className={section === 'quote' ? 'section-tab active' : 'section-tab'} onClick={() => setSection('quote')}>
          💌 Quote
        </button>
      </div>

      {section === 'links' ? <ViewingLinks /> : <QuoteRequests />}
    </main>
  )
}

function AdminHeader({ onSignOut }: { onSignOut?: () => void }) {
  return (
    <header className="admin-header">
      <a href="/" className="logo-text">{shopName}</a>
      <div>
        <a href="/" className="link-button">View website</a>
        {onSignOut && <button type="button" className="link-button" onClick={onSignOut}>Sign out</button>}
      </div>
    </header>
  )
}
