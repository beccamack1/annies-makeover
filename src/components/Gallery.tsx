/* ==========================================================
   PHOTOS of the shop and treats. The list is in src/data/gallery.ts.
   ========================================================== */
import { gallery } from '../data/gallery'

export default function Gallery() {
  return (
    <section className="section gallery scallop">
      <div className="section-head">
        <p className="eyebrow">come say hi</p>
        <h2>Mint walls, pink murals <span className="hand">&amp; a lot of macarons</span></h2>
      </div>
      <div className="gallery-grid">
        {gallery.map((photo) => (
          <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
        ))}
      </div>
    </section>
  )
}
