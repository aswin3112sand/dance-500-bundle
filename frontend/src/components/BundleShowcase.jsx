import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import showcaseImage from '../assets/catalog-2.jpg';

gsap.registerPlugin(ScrollTrigger);

const BundleShowcase = () => {
    const sectionRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.bundle-showcase-reveal',
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' }
            );
        }, sectionRef);

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
        <section ref={sectionRef} className="section bundle-showcase">
            <div className="container">
                <div className="glass-card strong bundle-showcase-card">
                    <div>
                        <p className="hero-kicker bundle-showcase-reveal">ZERO GRAVITY DANCE BUNDLE</p>
                        <h2 className="bundle-showcase-title bundle-showcase-reveal">
                            Unlock all 500 steps for the price of one workshop.
                        </h2>
                        <p className="bundle-showcase-sub bundle-showcase-reveal">
                            One secure checkout (UPI / Razorpay), lifetime access to 500+ guided steps and weekly drops.
                        </p>
                        <div className="bundle-chip-row bundle-showcase-reveal">
                            <div className="bundle-chip">500+ dancers unlocked this bundle</div>
                            <div className="bundle-chip">Lifetime access • No monthly fee</div>
                            <div className="bundle-chip">Works on mobile & desktop</div>
                        </div>
                        <div className="bundle-chip-row bundle-showcase-reveal">
                            <div className="bundle-chip">🔥 Offer ends soon</div>
                            <div className="bundle-chip">Limited seats</div>
                        </div>
                        <ul className="bundle-list bundle-showcase-reveal">
                            <li>Song-wise breakdown: movie, chorus hook, counts, lyric cues</li>
                            <li>Custom choreography (1 min) → ₹800 • 5 songs → ₹4,000+</li>
                            <li><strong>This bundle → ₹499 (Save ₹3,500+)</strong></li>
                        </ul>
                        <div className="bundle-price bundle-showcase-reveal">
                            <span className="old">₹1500</span>
                            <span className="new">₹499</span>
                            <span className="text-muted">Limited</span>
                        </div>
                        <div className="hero-actions bundle-showcase-reveal">
                            <button className="glow-btn" onClick={handlePrimaryCta}>Get lifetime access — ₹499</button>
                            <button className="btn-outline-glow" onClick={handlePreview}>Preview 5 free hooks</button>
                        </div>
                        <p className="text-muted small mt-3 bundle-showcase-reveal">
                            Secure UPI / Razorpay • Receipt emailed instantly
                        </p>
                    </div>
                    <div className="bundle-image bundle-showcase-reveal">
                        <img src={showcaseImage} alt="Dance bundle preview" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BundleShowcase;
