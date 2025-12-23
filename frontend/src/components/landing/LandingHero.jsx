import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingHero = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-text-item", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
            })
                .from(".hero-image", {
                    scale: 0.96,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                }, "-=0.6");

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="position-relative overflow-hidden w-100" style={{ minHeight: "100vh", paddingTop: "100px" }}>
            {/* Video Background */}
            <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                <video
                    className="w-100 h-100 object-fit-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/video-poster.png"
                    style={{ filter: "brightness(0.5)" }}
                >
                    {/* Placeholder for video */}
                    <source src="/assets/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            </div>

            {/* Snow Effect */}
            <div className="snow-container z-1">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="snow-flake"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                            width: `${Math.random() * 5 + 3}px`,
                            height: `${Math.random() * 5 + 3}px`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container position-relative z-2 h-100 d-flex align-items-center">
                <div className="row w-100 align-items-center g-5">
                    {/* Left Text */}
                    <div className="col-lg-6 hero-text-col">
                        <div style={{ maxWidth: "520px" }}>
                            <h5 className="hero-text-item text-neon-cyan fw-bold text-uppercase letter-spacing-2 mb-3">
                                Premium Bundle
                            </h5>
                            <h1 className="hero-text-item display-3 fw-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                AS DANCE <br />
                                <span className="text-light-50">639 STEPS</span>
                            </h1>
                            <p className="hero-text-item text-soft lead mb-5" style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
                                Master the art of dance with our structured, cinematic learning system.
                                From basics to pro performance.
                            </p>
                            <div className="hero-text-item d-flex gap-3">
                                <button className="glow-btn px-5 py-3 fs-5">
                                    Get Access Now
                                </button>
                                <button className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold border-opacity-25 text-white">
                                    View Trailer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6 text-center d-none d-lg-block">
                        <div className="hero-image position-relative">
                            <div className="position-absolute top-50 start-50 translate-middle w-75 h-75 bg-primary rounded-circle blur-3xl opacity-20" style={{ filter: 'blur(80px)', zIndex: -1 }}></div>
                            <img
                                src="/assets/dancer-hero.png"
                                alt="Dancer Silhouette"
                                className="img-fluid"
                                style={{ maxHeight: "80vh", objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingHero;
