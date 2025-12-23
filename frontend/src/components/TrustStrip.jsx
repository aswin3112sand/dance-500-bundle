import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const trustItems = [
  {
    label: 'Lifetime Access',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'Secure Razorpay',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 8.6-7 10-4-1.4-7-5.5-7-10V6l7-3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'Instant Unlock',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'WhatsApp Support',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9l-5 3v-3H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }
]

export default function TrustStrip() {
  const stripRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('[data-trust="pill"]', {
        y: 24,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 85%',
          once: true
        }
      })
    }, stripRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="trust-strip" ref={stripRef}>
      <div className="container trust-grid">
        {trustItems.map((item) => (
          <div className="trust-pill" data-trust="pill" key={item.label}>
            <span className="trust-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
