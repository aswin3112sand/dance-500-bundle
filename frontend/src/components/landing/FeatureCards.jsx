import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Easy Steps",
        time: "~30 sec",
        bullets: ["Beginner friendly", "Clean rhythm", "Quick learning"],
        color: "#7de4ff"
    },
    {
        title: "Medium Steps",
        time: "~1–2 mins",
        bullets: ["Groove control", "Style building", "Energy balance"],
        color: "#6b8bff"
    },
    {
        title: "Hard Steps",
        time: "~3–4 mins",
        bullets: ["Power moves", "Performance ready", "Confidence boost"],
        color: "#8a6bff"
    },
    {
        title: "Real-Time Songs",
        time: "Full Song",
        bullets: ["Full song choreography", "Practical learning", "Stage feel"],
        color: "#ffc87a"
    }
];

const FeatureCards = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".feature-card-col", {
                opacity: 0,
                y: 60,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                    once: true
                }
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="section py-5 position-relative z-2">
            <div className="container">
                <div className="row g-4">
                    {features.map((item, i) => (
                        <div key={i} className="col-md-6 col-lg-3 feature-card-col">
                            <div className="glass-card h-100 p-4 transition-transform hover-scale">
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <h4 className="fw-bold mb-0 text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</h4>
                                    <span className="badge rounded-pill bg-light bg-opacity-10 text-white fw-normal border border-white border-opacity-10">
                                        {item.time}
                                    </span>
                                </div>

                                <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                                    {item.bullets.map((txt, idx) => (
                                        <li key={idx} className="d-flex align-items-center gap-2 text-soft small">
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color }}></span>
                                            {txt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: translateY(-5px); }
      `}</style>
        </div>
    );
};

export default FeatureCards;
