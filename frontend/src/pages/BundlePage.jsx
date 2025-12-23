import { useEffect } from 'react'
import BundleStats from '../components/BundleStats'
import ValueSection from '../components/ValueSection'
import ReviewsCarousel from '../components/ReviewsCarousel'
import ContactSection from '../components/ContactSection'

export default function BundlePage({ onBuyClick }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('pay') === '1') {
      onBuyClick?.()
    }
  }, [onBuyClick])

  return (
    <main>
      <section className="bundle-hero">
        <div className="container">
          <div className="bundle-header">
            <h1>AS DANCE Bundle</h1>
            <p>Premium step-by-step Tamil training with lifetime access.</p>
            <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now - &#8377;499</button>
          </div>
        </div>
      </section>
      <BundleStats onBuyClick={onBuyClick} />
      <ValueSection onBuyClick={onBuyClick} />
      <ReviewsCarousel />
      <ContactSection onBuyClick={onBuyClick} />
    </main>
  )
}
