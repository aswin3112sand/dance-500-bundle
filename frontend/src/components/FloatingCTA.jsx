import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const FloatingCTA = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Show after hero section (estimated 600px)
            if (window.scrollY > 600) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            if (barRef.current) {
                barRef.current.style.opacity = visible ? '1' : '0';
                barRef.current.style.transform = visible ? 'translateY(0)' : 'translateY(100px)';
            }
            return;
        }

        if (visible) {
            gsap.to(barRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' });
        } else {
            gsap.to(barRef.current, { y: 100, opacity: 0, duration: 0.4, ease: 'power2.in' });
        }
    }, [visible]);

    const handleCta = () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/bundle', search: '?pay=1' } } });
            return;
        }
        navigate('/bundle?pay=1');
    };

    return (
        <div ref={barRef} className="floating-cta" style={{ opacity: 0, transform: 'translateY(100px)' }}>
            <div className="floating-cta-card">
                <p className="mb-0 text-white fw-medium">
                    Christmas Offer — Unlock all 500 steps — ₹499
                </p>
                <button className="glow-btn btn-sm py-2 px-4" style={{ fontSize: '0.9rem' }} onClick={handleCta}>
                    Get now
                </button>
            </div>
        </div>
    );
};

export default FloatingCTA;
