/* ==========================================================
   REVIEWS: star ratings and what customers say.
   The ratings and quotes are in src/data/reviews.ts.
   ========================================================== */
import { ratings, reviews } from '../data/reviews'

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="section-head">
        <p className="eyebrow">reviews</p>
        <h2>Loved by Frisco, <span className="hand">one macaron at a time</span></h2>
      </div>

      <ul className="rating-row">
        {ratings.map((r) => (
          <li key={r.site + r.store}>
            <strong>★ {r.stars}</strong>
            <span>{r.site} · {r.store}</span>
            <small>{r.count}</small>
          </li>
        ))}
      </ul>

      <div className="review-grid">
        {reviews.map((review) => (
          <blockquote key={review.name} className="review">
            <p className="stars" aria-label="5 stars">★★★★★</p>
            <p>“{review.quote}”</p>
            <footer>
              <strong>{review.name}</strong>{' · '}
              {review.link
                ? <a href={review.link} target="_blank" rel="noopener">{review.where}</a>
                : review.where}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
