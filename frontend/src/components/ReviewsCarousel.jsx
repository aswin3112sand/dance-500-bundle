import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  { name: 'Aisha', style: 'Hip Hop', text: 'The neon vibe makes practice feel like a stage show. Counts are super clear.' },
  { name: 'Ravi', style: 'Bollywood', text: 'Custom 30-sec card landed in hours. Perfect for my song drop.' },
  { name: 'Maya', style: 'Freestyle', text: 'Counts + lyrics + vibe tags keep me on-beat every time.' },
  { name: 'Leo', style: 'House', text: 'Glassy UI, fast checkout, and the preview flow is slick.' },
  { name: 'Nila', style: 'Stage', text: 'Everything is structured and practical. Exactly what I needed.' }
]

export default function ReviewsCarousel() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || prefersReducedMotion) return

    const totalWidth = track.scrollWidth / 2
    const loop = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 28,
      ease: 'none',
      repeat: -1,
      paused: true,
      modifiers: {
        x: (value) => {
          const current = parseFloat(value)
          const wrapped = ((current % totalWidth) + totalWidth) % totalWidth
          return `${-wrapped}px`
        }
      }
    })

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 80%',
      onEnter: () => loop.play(),
      onEnterBack: () => loop.play(),
      onLeaveBack: () => loop.pause()
    })

    let isDragging = false
    let startX = 0
    let startTranslate = 0
    let lastX = 0
    let lastTime = 0
    let velocity = 0

    const syncLoop = () => {
      const current = gsap.getProperty(track, 'x')
      const progress = Math.abs(current) / totalWidth
      loop.progress(progress)
    }

    const handlePointerDown = (event) => {
      isDragging = true
      wrap.setPointerCapture(event.pointerId)
      track.classList.add('is-dragging')
      loop.pause()
      startX = event.clientX
      startTranslate = gsap.getProperty(track, 'x')
      lastX = event.clientX
      lastTime = Date.now()
      velocity = 0
    }

    const handlePointerMove = (event) => {
      if (!isDragging) return
      const delta = event.clientX - startX
      const nextX = startTranslate + delta
      gsap.set(track, { x: nextX })
      const now = Date.now()
      const dt = now - lastTime
      if (dt > 0) {
        velocity = (event.clientX - lastX) / dt
        lastX = event.clientX
        lastTime = now
      }
    }

    const handlePointerUp = (event) => {
      if (!isDragging) return
      isDragging = false
      wrap.releasePointerCapture(event.pointerId)
      track.classList.remove('is-dragging')
      const currentX = gsap.getProperty(track, 'x')
      const inertia = velocity * 220
      gsap.to(track, {
        x: currentX + inertia,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: syncLoop,
        onComplete: () => loop.resume()
      })
    }

    const handleEnter = () => {
      if (!isDragging) loop.pause()
    }

    const handleLeave = () => {
      if (!isDragging) loop.resume()
    }

    wrap.addEventListener('pointerdown', handlePointerDown)
    wrap.addEventListener('pointermove', handlePointerMove)
    wrap.addEventListener('pointerup', handlePointerUp)
    wrap.addEventListener('pointerleave', handlePointerUp)
    wrap.addEventListener('mouseenter', handleEnter)
    wrap.addEventListener('mouseleave', handleLeave)

    return () => {
      loop.kill()
      trigger.kill()
      wrap.removeEventListener('pointerdown', handlePointerDown)
      wrap.removeEventListener('pointermove', handlePointerMove)
      wrap.removeEventListener('pointerup', handlePointerUp)
      wrap.removeEventListener('pointerleave', handlePointerUp)
      wrap.removeEventListener('mouseenter', handleEnter)
      wrap.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section className="reviews">
      <div className="container">
        <p className="section-kicker">DANCER VOICES</p>
        <h2>What learners say</h2>
        <p className="section-sub">Swipe or drag to explore. Calm, continuous motion.</p>
      </div>
      <div className="reviews-marquee" ref={wrapRef}>
        <div ref={trackRef} className="reviews-track">
          {[...reviews, ...reviews].map((review, index) => (
            <div className="review-card" key={`${review.name}-${index}`}>
              <div className="review-header">
                <div className="avatar" />
                <div>
                  <h4>{review.name}</h4>
                  <span>{review.style}</span>
                </div>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
