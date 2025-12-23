import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BundleHero = () => {
    const capsuleRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.bundle-hero-reveal',
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' }
            );

            gsap.to(capsuleRef.current, {
                boxShadow: '0 0 45px rgba(255, 200, 122, 0.35)',
                repeat: -1,
                yoyo: true,
                duration: 1.8,
                ease: 'sine.inOut'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bundle-hero section">
            <div className="container">
                <h1 className="bundle-hero-title bundle-hero-reveal">AS DANCE</h1>
                <p className="bundle-hero-subtitle bundle-hero-reveal">
                    500 STEP BUNDLE • TAMIL TRAINING • LIFETIME ACCESS
                </p>

                <div ref={capsuleRef} className="offer-capsule bundle-hero-reveal">
                    <div className="label">CHRISTMAS LAUNCH OFFER</div>
                    <div className="price-row">
                        <span className="price-old">₹1500</span>
                        <span className="price-new">₹499</span>
                        <span className="price-only">ONLY</span>
                    </div>
                    <div className="hero-pills" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                        <div className="hero-pill">Lifetime access</div>
                        <div className="hero-pill">UPI / Razorpay</div>
                        <div className="hero-pill">Instant WhatsApp support</div>
                    </div>
                </div>

                <div className="bundle-hero-grid mt-4">
                    <div className="glass-card strong bundle-mini-card bundle-hero-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h4>Santa Bonus Drops</h4>
                            <span className="mini-tag">🎁 Free mini steps</span>
                        </div>
                        <p className="text-muted mb-3">Weekly Christmas specials</p>
                        <div className="progress-rail mb-2"><span style={{ width: '70%' }}></span></div>
                        <div className="d-flex justify-content-between small text-muted">
                            <span>3 new routines</span>
                            <span>70%</span>
                        </div>
                    </div>

                    <div className="glass-card strong bundle-mini-card bundle-hero-reveal">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h4>Christmas Party Pack</h4>
                            <span className="mini-tag">Trending now</span>
                        </div>
                        <p className="text-muted mb-3">Wedding + stage routines</p>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="mini-tag">Beginner</span>
                            <span className="mini-tag">1 min</span>
                            <span className="mini-tag">Stage</span>
                        </div>
                        <div className="progress-rail"><span style={{ width: '85%' }}></span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BundleHero;
