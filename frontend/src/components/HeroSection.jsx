import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '../assets/hero-model.jpg'

gsap.registerPlugin(ScrollTrigger)

const PREVIEW_URL = 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link'

export default function HeroSection({ onBuyClick }) {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)
  const offerRef = useRef(null)
  const endTimeRef = useRef(Date.now() + (2 * 60 * 60 + 13 * 60 + 45) * 1000)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('[data-hero="fade"]', {
        y: 30,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12
      })

      if (offerRef.current) {
        gsap.to(offerRef.current, {
          y: -4,
          scale: 1.01,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let rafId = 0
    let lastSecond = -1

    const tick = () => {
      const now = Date.now()
      const remaining = Math.max(0, endTimeRef.current - now)
      const totalSeconds = Math.floor(remaining / 1000)
      if (totalSeconds !== lastSecond) {
        lastSecond = totalSeconds
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
        const seconds = String(totalSeconds % 60).padStart(2, '0')
        if (countdownRef.current) {
          countdownRef.current.textContent = `${hours}:${minutes}:${seconds}`
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scrollToPreview = () => {
    const target = document.getElementById('preview')
    if (!target) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="hero-header">
          <p className="hero-kicker" data-hero="fade">ZERO GRAVITY DANCE BUNDLE</p>
          <h1 className="hero-title" data-hero="fade">
            A premium stage for <span className="highlight">500 guided steps</span>
          </h1>
          <p className="hero-subtitle" data-hero="fade">
            Calm, studio-grade choreography training with a polished neon SaaS look. One secure checkout,
            lifetime access, and a structured learning path.
          </p>
        </div>

        <div className="hero-grid">
          <div className="hero-offer" data-hero="fade">
            <div className="offer-capsule" ref={offerRef}>
              <p className="capsule-label">LIMITED LAUNCH OFFER</p>
              <p className="capsule-sub">One-time payment. Lifetime access.</p>
              <div className="countdown-pill">
                Offer ends in <span className="countdown-time" ref={countdownRef}>02:13:45</span>
              </div>
              <div className="price-row">
                <span className="strike">&#8377;1500</span>
                <span className="arrow">&rarr;</span>
                <span className="price">&#8377;499</span>
                <span className="only">ONLY</span>
              </div>
              <div className="capsule-tags">
                <span>Lifetime access</span>
                <span>Secure Razorpay</span>
                <span>Instant unlock</span>
              </div>
              <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now</button>
            </div>
            <div className="hero-actions">
              <button className="btn btn-ghost" data-magnetic type="button" onClick={scrollToPreview}>Preview steps</button>
              <a className="btn btn-ghost" data-magnetic href={PREVIEW_URL} target="_blank" rel="noreferrer">Watch sample</a>
            </div>
            <p className="hero-note">Secure UPI / Razorpay. Instant unlock after verification.</p>
          </div>

          <div className="hero-media" data-hero="fade">
            <div className="hero-media-card">
              <img src={heroImage} alt="Studio preview" loading="eager" decoding="async" />
              <div className="hero-media-panel">
                <div>
                  <p className="media-title">Preview sample</p>
                  <p>View-only clip on Google Drive</p>
                </div>
                <a className="btn btn-ghost" data-magnetic href={PREVIEW_URL} target="_blank" rel="noreferrer">Preview</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
