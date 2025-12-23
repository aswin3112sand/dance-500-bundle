import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BundleStats({ onBuyClick }) {
  const sectionRef = useRef(null)
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        { textContent: 0 },
        {
          textContent: 639,
          duration: 1.6,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          }
        }
      )

      gsap.fromTo(
        '.bundle-total span',
        { textShadow: '0 0 0 rgba(125, 228, 255, 0)' },
        {
          textShadow: '0 0 36px rgba(125, 228, 255, 0.55)',
          duration: 0.8,
          repeat: 1,
          yoyo: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          }
        }
      )

      gsap.from('[data-step="pill"]', {
        y: 30,
        opacity: 0,
        scale: 0.98,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bundle-stats" ref={sectionRef}>
      <div className="container">
        <div className="bundle-pill">LIMITED LAUNCH OFFER</div>
        <div className="bundle-total">
          TOTAL <span ref={numberRef}>639</span> STEPS
        </div>
        <div className="bundle-steps">
          <div className="step-pill" data-step="pill">
            <span className="dot easy" /> EASY — 194 STEPS
          </div>
          <div className="step-pill" data-step="pill">
            <span className="dot medium" /> MEDIUM — 219 STEPS
          </div>
          <div className="step-pill" data-step="pill">
            <span className="dot hard" /> HARD — 226 STEPS
          </div>
          <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now</button>
        </div>
      </div>
    </section>
  )
}

