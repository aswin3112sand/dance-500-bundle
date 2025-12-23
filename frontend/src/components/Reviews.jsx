import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Reviews = () => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    const reviews = [
        { name: "Aisha", style: "Hip Hop", text: "The neon vibe makes practice feel like a stage show. Counts are super clear." },
        { name: "Ravi", style: "Bollywood", text: "Custom 30-sec card landed in hours. Perfect for my song drop." },
        { name: "Maya", style: "Freestyle", text: "Counts + lyrics + vibe tags keep me on-beat every time." },
        { name: "Leo", style: "House", text: "Glassy UI, fast checkout, and the preview flow is slick." },
        { name: "Sara", style: "Contemporary", text: "Instant unlock and the weekly drops are always fresh." },
    ];

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const list = scrollRef.current;
        if (!list) return;
        const items = [...list.children];

        // Duplicate for infinite effect
        items.forEach(item => {
            const clone = item.cloneNode(true);
            list.appendChild(clone);
        });

        const totalWidth = items.length * (260 + 24); // card width + gap

        if (prefersReducedMotion) {
            list.style.transform = 'translateX(0)';
            return;
        }

        const tween = gsap.to(list, {
            x: -totalWidth,
            duration: 32,
            ease: 'none',
            repeat: -1,
            paused: false
        });

        const handleEnter = () => tween.pause();
        const handleLeave = () => tween.play();
        list.addEventListener('mouseenter', handleEnter);
        list.addEventListener('mouseleave', handleLeave);

        return () => {
            list.removeEventListener('mouseenter', handleEnter);
            list.removeEventListener('mouseleave', handleLeave);
            tween.kill();
        };
    }, []);

    return (
        <section className="section overflow-hidden" ref={containerRef}>
            <div className="container">
                <p className="hero-kicker">DANCER VOICES</p>
                <h2 className="section-title mb-2">What our learners say</h2>
                <p className="section-subtitle mb-4">Swipe or hover to pause. Ultra-smooth, always glowing.</p>
            </div>
            <div className="d-flex gap-4 px-4" ref={scrollRef} style={{ width: 'max-content' }}>
                {reviews.map((rev, i) => (
                    <div key={i} className="review-card">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="review-avatar">{rev.name[0]}</div>
                            <div>
                                <div className="review-name">{rev.name}</div>
                                <div className="review-meta">{rev.style}</div>
                            </div>
                        </div>
                        <p className="mb-0">"{rev.text}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
