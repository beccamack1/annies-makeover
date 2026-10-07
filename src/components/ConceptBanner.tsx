/* ==========================================================
   THE "CONCEPT PREVIEW" STRIP AT THE VERY TOP
   This site is a pitch, not Annie's official website yet.
   The strip makes that clear to anyone who finds the link.
   To remove it once the owners say yes, set showConceptBanner
   to false in src/data/shop.ts.
   ========================================================== */
import { showQuote } from '../data/pitch'
import { shopName, showConceptBanner } from '../data/shop'

export default function ConceptBanner() {
  if (!showConceptBanner) return null

  return (
    <p className="concept-banner">
      Concept preview made for {shopName} · not the shop's official website
      {showQuote && <> · <a href="#quote">See the quote ↓</a></>}
    </p>
  )
}
