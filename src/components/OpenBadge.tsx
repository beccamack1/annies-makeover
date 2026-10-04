// The little "Open now · until 9 PM" pill for a shop
import type { Store } from '../data/shop'
import { openStatus } from '../lib/hours'

export default function OpenBadge({ store }: { store: Store }) {
  const status = openStatus(store)
  return (
    <span className={status.open ? 'open-badge is-open' : 'open-badge'}>
      <span className="dot" aria-hidden="true"></span>
      {status.text}
    </span>
  )
}
