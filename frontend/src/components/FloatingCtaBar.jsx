import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingCtaBar({ onBuyClick }) {
  const barRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      barRef.current?.classList.add('is-visible')
      return
    }

    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { y: 30, opacity: 0 })
    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top',
      onEnter: () => {
        gsap.to(bar, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      },
      onLeaveBack: () => {
        gsap.to(bar, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.inOut' })
      }
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="floating-cta" ref={barRef}>
      <div>
        <p className="cta-title">Limited launch pricing - Unlock all steps - &#8377;499</p>
        <p className="cta-sub">Lifetime access - Secure Razorpay</p>
      </div>
      <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now</button>
    </div>
  )
}
