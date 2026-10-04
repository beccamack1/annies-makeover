/* ==========================================================
   "ORDER ONLINE" BUTTON
   Opens a little list so people pick which shop to order from.
   Ordering still happens on Annie's existing ordering pages
   (the links are in src/data/shop.ts).
   ========================================================== */
import { useEffect, useRef, useState } from 'react'
import { stores } from '../data/shop'

type Props = { className?: string; label?: string }

export default function OrderButton({ className = 'btn', label = 'Order online' }: Props) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // close the list when tapping anywhere else, or pressing Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="order" ref={box}>
      <button className={className} aria-expanded={open} onClick={() => setOpen(!open)}>
        {label} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="order-list">
          <p>Which shop?</p>
          {stores.map((store) => (
            <a key={store.id} href={store.orderUrl} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <strong>{store.name}</strong>
              <span>{store.services.join(' · ')}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
