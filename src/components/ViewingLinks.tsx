/* ==========================================================
   VIEWING LINKS (the first tab on /admin)
   Make a personal link for each person. They get 10 minutes
   (from when they press "Start viewing"), on one device, once.
   The minutes are set in netlify/lib/viewing.mjs.
   ========================================================== */
import { useEffect, useState, type FormEvent } from 'react'
import { previewMessage } from '../data/pitch'
import { shopName } from '../data/shop'
import type { ViewingLink } from '../lib/api'
import { dateAndTime } from '../lib/format'
import { useViewing } from '../store/viewing'

function status(link: ViewingLink, now: number) {
  if (link.state === 'revoked') return 'Cancelled'
  if (link.state === 'not-opened' || !link.startedAt) return 'Not opened yet'
  const left = link.startedAt + link.minutes * 60_000 - now
  if (left > 0) return `Viewing now · ${Math.ceil(left / 60_000)} min left`
  return 'Viewed ' + dateAndTime(new Date(link.startedAt).toISOString())
}

export default function ViewingLinks() {
  const { links, load, act } = useViewing()
  const [now, setNow] = useState(() => Date.now())
  const [label, setLabel] = useState('')
  const [made, setMade] = useState<{ url: string; label: string } | null>(null)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  // keep "min left" fresh, and pick up links people just opened
  useEffect(() => {
    load()
    const timer = window.setInterval(() => {
      setNow(Date.now())
      load()
    }, 15_000)
    return () => window.clearInterval(timer)
  }, [load])

  async function create(event: FormEvent) {
    event.preventDefault()
    setError('')
    try {
      const result = await act({ action: 'create-pass', label: label.trim() })
      if (result.url) setMade({ url: result.url, label: label.trim() })
      setLabel('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  // copies the text; `key` marks which button shows "Copied!"
  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
    } catch {
      setCopied('')
    }
  }

  async function run(action: 'revoke-pass' | 'delete-pass', id: string, question: string) {
    if (!window.confirm(question)) return
    setError('')
    try {
      await act({ action, id })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const minutes = links[0]?.minutes ?? 10
  const message = (m: { url: string; label: string }) => previewMessage(m.label, m.url, minutes)
  const email = (m: { url: string; label: string }) =>
    'mailto:?subject=' + encodeURIComponent('A preview of a new ' + shopName + ' website') +
    '&body=' + encodeURIComponent(message(m))

  return (
    <section className="viewing-links">
      <p className="admin-intro">
        The website is locked. Make a personal link for each person: they get {minutes} minutes from when they press
        “Start viewing”, on one device, and then the link stops working. You can always see the site while you’re signed
        in here.
      </p>

      <form className="admin-form link-maker" onSubmit={create}>
        <div className="field">
          <label htmlFor="link-label">Who is this link for?</label>
          <input
            type="text"
            id="link-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={60}
            placeholder="e.g. the FM423 owners"
          />
        </div>
        <button type="submit" className="btn">Make a viewing link</button>
      </form>

      {made && (
        <div className="made-link" role="status">
          <p>
            Here’s the link{made.label ? ` for ${made.label}` : ''}, with a message ready to send by text, email or DM.
            Don’t open it yourself: it works once, on the first device.
          </p>
          <textarea className="link-copy link-message" readOnly rows={5} value={message(made)}
            onFocus={(e) => e.currentTarget.select()} />
          <div className="actions">
            <button type="button" className="btn btn-small" onClick={() => copy(message(made), 'msg:' + made.url)}>
              {copied === 'msg:' + made.url ? 'Copied!' : 'Copy message'}
            </button>
            <button type="button" className="btn btn-ghost btn-small" onClick={() => copy(made.url, made.url)}>
              {copied === made.url ? 'Copied!' : 'Copy link only'}
            </button>
            <a className="btn btn-ghost btn-small" href={email(made)}>Write an email</a>
          </div>
        </div>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}

      {links.length === 0 ? (
        <p className="admin-empty">No viewing links yet.</p>
      ) : (
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.id} className={link.state === 'revoked' || link.state === 'ended' ? 'link-item is-done' : 'link-item'}>
              <div>
                <p className="link-title">{link.label || 'Viewing link'}</p>
                <p className="link-meta"><strong>{status(link, now)}</strong> · made {dateAndTime(link.createdAt)}</p>
                <p className="link-meta link-text">{link.url}</p>
              </div>
              <div className="actions">
                {link.state === 'not-opened' && (
                  <>
                    <button type="button" className="btn btn-small" onClick={() => copy(message(link), 'msg:' + link.url)}>
                      {copied === 'msg:' + link.url ? 'Copied!' : 'Copy message'}
                    </button>
                    <button type="button" className="btn btn-ghost btn-small" onClick={() => copy(link.url, link.url)}>
                      {copied === link.url ? 'Copied!' : 'Copy link'}
                    </button>
                  </>
                )}
                {(link.state === 'not-opened' || link.state === 'viewing') && (
                  <button type="button" className="btn btn-ghost btn-small"
                    onClick={() => run('revoke-pass', link.id, 'Stop this link working now?')}>
                    Cancel link
                  </button>
                )}
                <button type="button" className="link-button"
                  onClick={() => run('delete-pass', link.id, 'Delete this link from the list?')}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
