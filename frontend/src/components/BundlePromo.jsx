import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BundlePromo = () => {
    const countRef = useRef(null);
    const sectionRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            if (countRef.current) countRef.current.innerText = '639';
            return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
            val: 639,
            duration: 2,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
            onUpdate: () => {
                if (countRef.current) countRef.current.innerText = Math.floor(obj.val);
            }
        });

        gsap.fromTo(sectionRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: sectionRef.current }
        );
    }, []);

    return (
        <section ref={sectionRef} className="section">
            <div className="container">
                <div className="total-steps glass-card strong">
                    <div className="total-steps-pill">
                        <span>🔥 LIMITED LAUNCH OFFER</span>
                        <span className="text-muted">₹1500 → ₹499</span>
                    </div>
                    <div className="total-steps-title">
                        TOTAL <span ref={countRef}>0</span> STEPS
                    </div>
                    <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
                        Unlock step-by-step Tamil training with lifetime access and weekly drops. Same neon workflow, always premium.
                    </p>
                    <div className="total-steps-bar">
                        <div className="total-steps-segment">Easy — 194 steps</div>
                        <div className="total-steps-segment">Medium — 219 steps</div>
                        <div className="total-steps-segment">
                            Hard — 226 steps
                            <button
                                type="button"
                                className="total-steps-cta"
                                onClick={() => {
                                    if (!user) {
                                        navigate('/login', { state: { from: { pathname: '/bundle', search: '?pay=1' } } });
                                        return;
                                    }
                                    navigate('/bundle?pay=1');
                                }}
                            >
                                Get now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BundlePromo;
