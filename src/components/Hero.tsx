/* ==========================================================
   THE TOP OF THE PAGE: what Annie's is, at a glance.
   ========================================================== */
import { ratings } from '../data/reviews'
import { stores } from '../data/shop'
import OpenBadge from './OpenBadge'
import OrderButton from './OrderButton'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">Frisco, Texas · since 2017</p>
        <h1>
          Macarons, cheesecake <span className="amp">&amp;</span> boba,{' '}
          <span className="hand">baked fresh every day.</span>
        </h1>
        <p className="lede">
          Two dessert cafés in Frisco for soft-baked cookies, croffles, gelato,
          bubble tea, lattes and whole cakes for every celebration.
        </p>
        <div className="hero-buttons">
          <a href="#menu" className="btn">See the menu</a>
          <OrderButton className="btn btn-ghost" label="Order pickup" />
        </div>

        <ul className="hero-stores">
          {stores.map((store) => (
            <li key={store.id}>
              <a href="#visit"><strong>{store.name}</strong></a>
              <OpenBadge store={store} />
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-art">
        <img className="hero-photo main" src="/images/pastry-case.webp" alt="Annie's pastry case with macarons, cheesecakes and cake slices" width="700" height="933" />
        <img className="hero-photo small" src="/images/truffle-cake.webp" alt="Chocolate layer cake slices topped with hazelnut truffles" width="600" height="600" />
        <img className="hero-mascot" src="/images/logo.png" alt="" width="180" height="150" />
        <div className="hero-rating">
          <span className="stars" aria-hidden="true">★★★★★</span>
          <strong>{ratings[1].stars} on Google</strong>
          <span>{ratings[1].store} · {ratings[1].count}</span>
        </div>
      </div>
    </section>
  )
}
