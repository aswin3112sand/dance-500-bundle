import { NavLink } from 'react-router-dom'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../utils/auth-context'

export default function Navbar({ onBuyClick }) {
  const { user, logout } = useAuth()
  const navRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const navInner = navRef.current?.querySelector('.nav-inner')
    if (!navInner) return

    if (prefersReducedMotion) {
      navInner.style.backgroundColor = 'rgba(10, 14, 30, 0.92)'
      navInner.style.borderColor = 'rgba(125, 228, 255, 0.2)'
      return
    }

    gsap.set(navInner, {
      backgroundColor: 'rgba(12, 16, 34, 0.55)',
      backdropFilter: 'blur(10px)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
      boxShadow: '0 10px 30px rgba(5, 8, 20, 0.35)'
    })

    const tween = gsap.to(navInner, {
      backgroundColor: 'rgba(10, 14, 30, 0.92)',
      backdropFilter: 'blur(18px)',
      borderColor: 'rgba(125, 228, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(6, 10, 24, 0.6), 0 0 30px rgba(125, 228, 255, 0.12)',
      scrollTrigger: {
        start: 0,
        end: 220,
        scrub: true
      }
    })

    return () => tween.scrollTrigger?.kill()
  }, [])

  return (
    <header className="main-nav" id="main-nav" ref={navRef}>
      <div className="container nav-inner">
        <div className="logo">AS DANCE</div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/" className="mute-link">Classes</NavLink>
          <NavLink to="/bundle" className={({ isActive }) => (isActive ? 'active' : '')}>Bundle</NavLink>
        </nav>
        <div className="nav-search">
          <input type="text" placeholder="Search styles" />
        </div>
        <div className="nav-actions">
          {user ? (
            <button className="btn btn-ghost" data-magnetic type="button" onClick={logout}>Logout</button>
          ) : (
            <NavLink className="btn btn-ghost" data-magnetic to="/login">Login</NavLink>
          )}
          <button className="btn btn-buy" data-magnetic type="button" onClick={onBuyClick}>Buy Now</button>
        </div>
      </div>
    </header>
  )
}


