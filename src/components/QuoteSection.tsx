/* ==========================================================
   MAKE IT YOURS: the quote for the owners, with an
   "Accept this quote" button. Only shows while this is a pitch.
   The price and what's included are in src/data/pitch.ts.

   Pressing "Send" saves their details (functions/api/quote/
   submit.ts) for /admin → 💌 Quote.
   ========================================================== */
import { useState, type FormEvent } from 'react'
import { firstPayment, price, quote, showQuote } from '../data/pitch'
import { shopName } from '../data/shop'
import { submitQuote } from '../lib/api'

type Status = 'closed' | 'open' | 'sending' | 'sent'
type Choice = 'quote' | 'basic' // accept the quote, or ask about the basic options

export default function QuoteSection() {
  const [status, setStatus] = useState<Status>('closed')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [choice, setChoice] = useState<Choice>('quote')
  const [copied, setCopied] = useState(false)

  if (!showQuote) return null

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(quote.payment.phone.replace(/\D/g, ''))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const zelle = (
    <div className="quote-zelle">
      <p className="quote-zelle-title">💸 Pay by {quote.payment.method}</p>
      <p>
        to <strong>{quote.payment.name}</strong> · <strong>{quote.payment.phone}</strong>
      </p>
      <button type="button" className="btn btn-ghost btn-small" onClick={copyNumber}>
        {copied ? 'Copied!' : 'Copy number'}
      </button>
    </div>
  )

  function open(next: Choice) {
    setChoice(next)
    setStatus('open')
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const answers = new FormData(event.currentTarget)
    setError('')
    setStatus('sending')
    try {
      await submitQuote(answers)
      setName(String(answers.get('name')).trim())
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't send. Please try again.")
      setStatus('open')
    }
  }

  return (
    <section className="section quote" id="quote">
      <div className="section-head">
        <p className="eyebrow">a quote for {quote.preparedFor}</p>
        <h2>{quote.headline}</h2>
        <p className="sub">{quote.summary}</p>
      </div>

      <div className="quote-card">
        <div className="quote-price">
          <img className="quote-logo" src="/images/logo.png" alt="" width="180" height="150" loading="lazy" />
          <p className="quote-label">The {shopName} website</p>
          {quote.promo && (
            <p className="quote-promo">
              <span className="quote-promo-badge">{quote.promo.label}</span> {quote.promo.note}
            </p>
          )}
          <p className="quote-amount">
            {quote.promo && <s className="quote-was" aria-label={'was ' + quote.regularPrice}>{quote.regularPrice}</s>}
            {price}
          </p>
          <p className="quote-terms">{quote.terms} · paid by {quote.payment.method}</p>
        </div>

        <ul className="quote-includes">
          {quote.includes.map((item) => (
            <li key={item.title}>
              <span className="quote-check" aria-hidden="true">✓</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {status === 'sent' ? (
          <div className="quote-thanks" role="status">
            <h3>Thank you, {name}! 🧁</h3>
            {choice === 'basic' ? (
              <p>{quote.from} has your details and will email you the basic options.</p>
            ) : (
              <>
                <p>
                  To get started, send the first half (<strong>{firstPayment}</strong>) by {quote.payment.method}.{' '}
                  {quote.from} will email you to confirm.
                </p>
                {zelle}
              </>
            )}
          </div>
        ) : status === 'closed' ? (
          <div className="quote-cta">
            <button type="button" className="btn quote-button" onClick={() => open('quote')}>
              Accept this quote · {price}
            </button>
            <p className="hint">
              Accept first, then send the first half ({firstPayment}) by {quote.payment.method} to {quote.payment.name},{' '}
              {quote.payment.phone}.
            </p>
            <p className="quote-basic">
              {quote.basic.text}{' '}
              <button type="button" className="link-button" onClick={() => open('basic')}>{quote.basic.button}</button>
            </p>
          </div>
        ) : (
          <form className="quote-form" name="quote" method="POST" onSubmit={send}>
            <input type="hidden" name="option" value={choice} />
            {/* a trap for spam robots. People never see it. */}
            <p className="sr-only" aria-hidden="true">
              <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <h3>{choice === 'basic' ? 'Ask about a basic option' : 'Accept the quote'}</h3>
            <div className="field">
              <label htmlFor="quote-name">Your name <span className="required">*</span></label>
              <input type="text" id="quote-name" name="name" maxLength={80} autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="quote-email">Email <span className="required">*</span></label>
              <input type="email" id="quote-email" name="email" maxLength={120} autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="quote-phone">Phone <span className="optional">(optional)</span></label>
              <input type="tel" id="quote-phone" name="phone" maxLength={40} autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="quote-message">
                {choice === 'basic' ? 'What would you like your website to do?' : "Anything you'd like to change?"}{' '}
                <span className="optional">(optional)</span>
              </label>
              <textarea id="quote-message" name="message" rows={3} maxLength={1000}></textarea>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="quote-form-actions">
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              <button type="button" className="link-button" onClick={() => setStatus('closed')}>Cancel</button>
            </div>
            <p className="hint">
              {choice === 'basic'
                ? `No payment: ${quote.from} will email you the cheaper basic options.`
                : `Next you'll send the first half (${firstPayment}) by ${quote.payment.method} to ${quote.payment.name}, ${quote.payment.phone}.`}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
