/* ==========================================================
   💌 QUOTE (the second tab on /admin)
   Everyone who pressed "Accept this quote" on the preview site.
   The state lives in src/store/quotes.ts.
   ========================================================== */
import { useEffect, useState } from 'react'
import { firstPayment, price, quote } from '../data/pitch'
import { shopName } from '../data/shop'
import { dateAndTime } from '../lib/format'
import { useQuotes } from '../store/quotes'

export default function QuoteRequests() {
  const { quotes, load, remove } = useQuotes()
  const [error, setError] = useState('')

  useEffect(() => {
    load()
  }, [load])

  async function del(id: string, name: string) {
    if (!window.confirm(`Delete ${name}'s quote request from the list?`)) return
    setError('')
    try {
      await remove(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section className="quote-requests">
      <p className="admin-intro">
        When the owners press “Accept this quote” ({price}{quote.promo ? ' ' + quote.promo.label.toLowerCase() : ''},{' '}
        {quote.terms}) on the preview site, their details show here. They're asked to send the first half ({firstPayment})
        by {quote.payment.method} to {quote.payment.name}, {quote.payment.phone}: check your bank app, then email them to
        confirm. People who asked about the cheaper basic options show here too.
      </p>
      {error && <p className="form-error" role="alert">{error}</p>}
      {quotes.length === 0 ? (
        <p className="admin-empty">No one has accepted the quote yet.</p>
      ) : (
        <ul className="link-list">
          {quotes.map((q) => (
            <li key={q.id} className="link-item">
              <div>
                <p className="link-title">
                  {q.option === 'basic' ? `${q.name} asked about the basic options 💬` : `${q.name} accepted the quote 🎉`}
                </p>
                <p className="link-meta">
                  <a href={'mailto:' + q.email}>{q.email}</a>
                  {q.phone && <> · <a href={'tel:' + q.phone}>{q.phone}</a></>}
                  {' · '}{dateAndTime(q.createdAt)}
                </p>
                {q.message && <p className="quote-message">“{q.message}”</p>}
              </div>
              <div className="actions">
                <a className="btn btn-small" href={'mailto:' + q.email + '?subject=' + encodeURIComponent('Your new ' + shopName + ' website')}>
                  Email them
                </a>
                <button type="button" className="link-button" onClick={() => del(q.id, q.name)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
