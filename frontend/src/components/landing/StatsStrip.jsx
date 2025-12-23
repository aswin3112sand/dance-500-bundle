import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsStrip = () => {
    const comp = useRef(null);
    const counterRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Counter Animation
            gsap.to(counterRef.current, {
                innerText: 639,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 80%",
                    once: true,
                },
                ease: "power2.out",
                onUpdate: function () {
                    this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText);
                }
            });

            // Bars Animation
            gsap.from(".stat-bar-fill", {
                width: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 80%",
                    once: true
                }
            });

            gsap.from(".stat-item", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 85%",
                    once: true
                }
            });

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="section py-5 position-relative z-2">
            <div className="container">
                <div className="glass-card strong p-4 p-md-5">
                    <div className="row g-5 align-items-center">
                        {/* Count Up */}
                        <div className="col-lg-4 text-center text-lg-start stat-item">
                            <h2 className="display-1 fw-bold text-white mb-0" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                                <span ref={counterRef}>0</span>
                            </h2>
                            <p className="text-neon-cyan text-uppercase letter-spacing-2 mb-0">Total Premium Steps</p>
                        </div>

                        {/* Bars */}
                        <div className="col-lg-8">
                            <div className="d-flex flex-column gap-4">
                                {/* Easy */}
                                <div className="stat-item">
                                    <div className="d-flex justify-content-between mb-2 text-soft small text-uppercase letter-spacing-1">
                                        <span>Easy</span>
                                        <span>194 Steps</span>
                                    </div>
                                    <div className="progress" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                                        <div className="progress-bar stat-bar-fill" role="progressbar" style={{ width: "30%", backgroundColor: "#7de4ff" }}></div>
                                    </div>
                                </div>

                                {/* Medium */}
                                <div className="stat-item">
                                    <div className="d-flex justify-content-between mb-2 text-soft small text-uppercase letter-spacing-1">
                                        <span>Medium</span>
                                        <span>219 Steps</span>
                                    </div>
                                    <div className="progress" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                                        <div className="progress-bar stat-bar-fill" role="progressbar" style={{ width: "34%", backgroundColor: "#6b8bff" }}></div>
                                    </div>
                                </div>

                                {/* Hard */}
                                <div className="stat-item">
                                    <div className="d-flex justify-content-between mb-2 text-soft small text-uppercase letter-spacing-1">
                                        <span>Hard</span>
                                        <span>226 Steps</span>
                                    </div>
                                    <div className="progress" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                                        <div className="progress-bar stat-bar-fill" role="progressbar" style={{ width: "36%", backgroundColor: "#8a6bff" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsStrip;
