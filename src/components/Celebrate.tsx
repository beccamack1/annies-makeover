/* ==========================================================
   CAKES & GIFTS: whole cakes, macaron and cookie boxes.
   The words and prices are in src/data/parties.ts.
   ========================================================== */
import { cancelPolicy, celebrate } from '../data/parties'
import { stores, telLink } from '../data/shop'
import OrderButton from './OrderButton'

export default function Celebrate() {
  return (
    <section className="section celebrate scallop" id="cakes">
      <div className="section-head">
        <p className="eyebrow">cakes &amp; gifts</p>
        <h2>Celebrating something?</h2>
        <p>Whole cakes, macaron boxes and cookie boxes, ready for pickup.</p>
      </div>

      <div className="celebrate-grid">
        {celebrate.map((card) => (
          <article key={card.title} className="celebrate-card">
            <img src={card.photo} alt="" loading="lazy" width="560" height="420" />
            <div>
              <h3>{card.title}</h3>
              <p className="celebrate-price">{card.price}</p>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="how-to">
        <h3>How to order a cake</h3>
        <ol>
          <li><strong>Pick your shop</strong> and tap “Order”. Choose your cake, by the slice or whole.</li>
          <li><strong>Want writing on it?</strong> Order at least one day ahead and put a short message in the special instructions.</li>
          <li><strong>Pick it up</strong> at the time you chose. Questions? Call the shop.</li>
        </ol>
        <div className="how-to-actions">
          <OrderButton />
          {stores.map((store) => (
            <a key={store.id} className="btn btn-ghost" href={telLink(store.phone)}>
              Call {store.name}
            </a>
          ))}
        </div>
        <p className="small">{cancelPolicy}</p>
      </div>
    </section>
  )
}
