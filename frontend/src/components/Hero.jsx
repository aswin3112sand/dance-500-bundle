import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import heroImage from '../assets/hero-model.jpg';

const Hero = () => {
    const containerRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-reveal',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' }
            );
            gsap.fromTo('.hero-media-card',
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handlePrimaryCta = () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/bundle', search: '?pay=1' } } });
            return;
        }
        navigate('/bundle?pay=1');
    };

    const handlePreview = () => {
        const section = document.getElementById('catalog');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={containerRef} className="section hero-section">
            <div className="container">
                <div className="hero-grid">
                    <div>
                        <div className="glass-card strong d-inline-flex align-items-center gap-3 px-4 py-2 mb-4 hero-reveal">
                            <span>AS DANCE - 639 Steps Bundle</span>
                            <span className="text-muted">₹1500 → ₹499</span>
                            <span className="hero-pill">Limited Launch Offer</span>
                        </div>
                        <p className="hero-kicker hero-reveal">ZERO GRAVITY DANCE</p>
                        <h1 className="hero-title hero-reveal">
                            A neon stage for <span className="highlight">bold</span> <span className="cool">movers</span>
                        </h1>
                        <p className="hero-subtitle hero-reveal">
                            Learn step-by-step with premium bundles. Get lifetime access and unlock all 639 dance steps in one purchase.
                        </p>

                        <div className="hero-actions hero-reveal">
                            <button className="glow-btn" onClick={handlePrimaryCta}>
                                Unlock all 639 steps — ₹499
                            </button>
                            <button className="btn-outline-glow" onClick={handlePreview}>
                                Preview sample
                            </button>
                        </div>

                        <div className="hero-pills hero-reveal">
                            <div className="hero-pill">Lifetime access</div>
                            <div className="hero-pill">UPI / Razorpay secure</div>
                            <div className="hero-pill">Instant unlock</div>
                        </div>
                    </div>

                    <div className="hero-media hero-reveal">
                        <div className="hero-media-card">
                            <img src={heroImage} alt="AS Dance preview" loading="lazy" />
                        </div>
                        <div className="hero-media-overlay">
                            <div className="fw-semibold">Preview</div>
                            <div className="small text-muted">Watch a sample step</div>
                        </div>
                        <div className="hero-media-actions">
                            <button onClick={handlePrimaryCta}>Get now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
