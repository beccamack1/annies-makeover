/* ==========================================================
   VISIT: both shops, with hours, call and directions.
   The details are in src/data/shop.ts.
   ========================================================== */
import { directionsLink, stores, telLink } from '../data/shop'
import OpenBadge from './OpenBadge'

export default function Visit() {
  return (
    <section className="section visit" id="visit">
      <div className="section-head">
        <p className="eyebrow">visit</p>
        <h2>Two shops in Frisco</h2>
      </div>
      <div className="visit-grid">
        {stores.map((store) => (
          <article key={store.id} className="visit-card">
            <p className="visit-since">{store.opened}</p>
            <h3>{store.name}</h3>
            <p className="visit-area">{store.area}</p>
            <OpenBadge store={store} />
            <dl>
              <dt>📍 Address</dt>
              <dd>{store.street}<br />{store.cityLine}</dd>
              <dt>⏰ Hours</dt>
              <dd>{store.hoursText}</dd>
              <dt>📞 Phone</dt>
              <dd><a href={telLink(store.phone)}>{store.phone}</a></dd>
              <dt>🛍️ Online orders</dt>
              <dd>{store.services.join(' · ')}</dd>
            </dl>
            <div className="visit-actions">
              <a className="btn" href={store.orderUrl} target="_blank" rel="noopener">Order</a>
              <a className="btn btn-ghost" href={directionsLink(store)} target="_blank" rel="noopener">Directions</a>
              <a className="btn btn-ghost" href={telLink(store.phone)}>Call</a>
            </div>
            <a className="visit-ig" href={store.instagram.url} target="_blank" rel="noopener">
              📸 {store.instagram.handle}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
