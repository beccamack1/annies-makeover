// The scrolling strip of treats. The words are in src/data/shop.ts.
import { marqueeWords } from '../data/shop'

export default function Marquee() {
  // two copies, so the strip loops without a gap
  const words = [...marqueeWords, ...marqueeWords]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {words.map((word, i) => (
          <span key={i}>{word} <b>✿</b></span>
        ))}
      </div>
    </div>
  )
}
