import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OfferSection = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Reveal
            gsap.from(".offer-content", {
                scale: 0.9,
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                    once: true
                }
            });

            // Pulse Price
            gsap.to(".apply-pulse", {
                scale: 1.05,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="section py-5 position-relative z-2">
            <div className="container text-center">
                <div className="offer-content d-inline-block position-relative">
                    {/* Christmas Glow Background */}
                    <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-pill"
                        style={{
                            background: "radial-gradient(circle, rgba(255, 77, 109, 0.15) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            zIndex: -1
                        }}>
                    </div>

                    <div className="glass-card strong px-5 py-5 rounded-circle-xl border-opacity-25" style={{ borderRadius: "50px", border: "1px solid rgba(255, 77, 109, 0.3)" }}>
                        <span className="d-inline-block py-1 px-3 rounded-pill bg-danger bg-opacity-20 text-neon-red fw-bold small text-uppercase letter-spacing-2 mb-4 border border-danger border-opacity-25">
                            Christmas Special ❄️
                        </span>

                        <h3 className="h5 text-soft mb-3 text-uppercase letter-spacing-1">Premium Bundle Access</h3>

                        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                            <span className="text-decoration-line-through text-muted fs-4">₹1500</span>
                            <span className="apply-pulse display-3 fw-bold text-neon-cyan ms-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                ₹499
                            </span>
                            <span className="fs-5 text-soft align-self-end mb-3">ONLY</span>
                        </div>

                        <div className="d-flex justify-content-center gap-3 mb-5 text-soft small text-uppercase letter-spacing-1">
                            <span className="d-flex align-items-center gap-2">
                                <i className="bi bi-check-circle-fill text-neon-cyan"></i> 639 Steps
                            </span>
                            <span className="border-start border-white border-opacity-10 mx-2"></span>
                            <span className="d-flex align-items-center gap-2">
                                <i className="bi bi-infinity text-neon-cyan"></i> Lifetime Access
                            </span>
                        </div>

                        <button className="glow-btn px-5 py-3 fs-5 shadow-lg">
                            Claim Offer Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferSection;
