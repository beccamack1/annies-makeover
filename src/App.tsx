/* ==========================================================
   THE WHOLE PAGE, top to bottom.
   Each part is its own file in src/components/.
   ========================================================== */
import Celebrate from './components/Celebrate'
import ConceptBanner from './components/ConceptBanner'
import Favorites from './components/Favorites'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Menu from './components/Menu'
import Parties from './components/Parties'
import PreviewTimer from './components/PreviewTimer'
import QuoteSection from './components/QuoteSection'
import Reviews from './components/Reviews'
import Visit from './components/Visit'

export default function App() {
  return (
    <>
      <ConceptBanner />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Favorites />
        <Menu />
        <Celebrate />
        <Parties />
        <Reviews />
        <Gallery />
        <Visit />
        <QuoteSection />
      </main>
      <Footer />
      <PreviewTimer />
    </>
  )
}
