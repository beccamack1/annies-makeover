/* ==========================================================
   CUSTOMER FAVORITES: the treats reviews mention most.
   The list is in src/data/reviews.ts.
   ========================================================== */
import { favorites } from '../data/reviews'

export default function Favorites() {
  return (
    <section className="section favorites">
      <div className="section-head">
        <p className="eyebrow">customer favorites</p>
        <h2>What Frisco keeps coming back for</h2>
      </div>
      <div className="fav-grid">
        {favorites.map((fav) => (
          <figure key={fav.name} className="fav">
            <img src={fav.photo} alt={fav.name} loading="lazy" width="420" height="420" />
            <figcaption>
              <strong>{fav.name}</strong>
              <span>{fav.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
