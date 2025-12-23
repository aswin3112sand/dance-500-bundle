import HeroSection from '../components/HeroSection'
import TrustStrip from '../components/TrustStrip'
import BundleStats from '../components/BundleStats'
import ValueSection from '../components/ValueSection'
import VideoPreview from '../components/VideoPreview'
import FreeResourcesSection from '../components/FreeResourcesSection'
import ReviewsCarousel from '../components/ReviewsCarousel'
import FaqSection from '../components/FaqSection'
import FinalCta from '../components/FinalCta'
import ContactSection from '../components/ContactSection'

export default function HomePage({ onBuyClick }) {
  return (
    <main>
      <HeroSection onBuyClick={onBuyClick} />
      <TrustStrip />
      <BundleStats onBuyClick={onBuyClick} />
      <VideoPreview />
      <ValueSection onBuyClick={onBuyClick} />
      <FreeResourcesSection />
      <ReviewsCarousel />
      <FaqSection />
      <FinalCta onBuyClick={onBuyClick} />
      <ContactSection onBuyClick={onBuyClick} />
    </main>
  )
}
