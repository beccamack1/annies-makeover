import { email, links, shopName, stores } from '../data/shop'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src="/images/logo.png" alt={shopName} width="180" height="150" loading="lazy" />
      <p className="footer-tag">Baked every day in Frisco, Texas.</p>
      <ul className="footer-links">
        {stores.map((store) => (
          <li key={store.id}><a href={store.instagram.url} target="_blank" rel="noopener">Instagram ({store.name})</a></li>
        ))}
        <li><a href={links.facebook} target="_blank" rel="noopener">Facebook</a></li>
        <li><a href={links.tiktok} target="_blank" rel="noopener">TikTok</a></li>
        <li><a href={links.yelpFm423} target="_blank" rel="noopener">Yelp</a></li>
        <li><a href={`mailto:${email}`}>{email}</a></li>
      </ul>
      <p className="small">© {year} {shopName}</p>
    </footer>
  )
}
