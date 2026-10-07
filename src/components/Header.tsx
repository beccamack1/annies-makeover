import { useState } from 'react'
import { shopName } from '../data/shop'
import OrderButton from './OrderButton'

const navLinks = [
  { href: '#menu', label: 'Menu' },
  { href: '#cakes', label: 'Cakes & gifts' },
  { href: '#parties', label: 'Parties' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

export default function Header() {
  // the phone-size menu (the ☰ button)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav" id="top">
      <a href="#top" className="nav-logo" aria-label={shopName + ' home'} onClick={close}>
        {/* their original logo, just as it is on anniessweetsntreats.com */}
        <img src="/images/logo.png" alt="" width="360" height="300" />
      </a>
      <button
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span></span><span></span>
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>{link.label}</a>
        ))}
        <OrderButton className="btn btn-small" />
      </nav>
    </header>
  )
}
