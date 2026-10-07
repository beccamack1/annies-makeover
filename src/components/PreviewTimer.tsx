/* The countdown someone sees while using a 10-minute viewing link,
   and the "preview has ended" screen when time is up.
   (The lock itself is in netlify/edge-functions/private-preview.ts.) */
import { useEffect, useState } from 'react'
import { shopName } from '../data/shop'

function viewUntil(): number | null {
  const match = document.cookie.match(/(?:^|;\s*)annies_view_until=(\d+)/)
  return match ? Number(match[1]) : null
}

export default function PreviewTimer() {
  const [until] = useState(viewUntil)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!until) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [until])

  if (!until) return null
  const left = Math.max(0, until - now)

  if (left === 0) {
    return (
      <div className="preview-ended" role="dialog" aria-modal="true" aria-labelledby="preview-ended-title">
        <div className="preview-ended-card">
          {/* the tab icon: it still loads after the preview has ended (the photos don't) */}
          <img className="preview-ended-logo" src="/favicon.svg" alt="" width="84" height="84" />
          <h2 id="preview-ended-title">Your preview has ended</h2>
          <p>
            Thank you for taking a look at the new {shopName} website 🧁 To see it again, please ask whoever sent you
            the link for a new one.
          </p>
        </div>
      </div>
    )
  }

  const min = Math.floor(left / 60_000)
  const sec = Math.floor((left % 60_000) / 1000)
  return (
    <p className={'preview-timer' + (left < 60_000 ? ' is-ending' : '')} role="timer" aria-live="off">
      Private preview · {min}:{String(sec).padStart(2, '0')} left
    </p>
  )
}
