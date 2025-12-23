import React, { useEffect, useRef } from 'react';
import { staggerCards } from '../gsapHelpers';

const TrainingSystem = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(card => card !== null);
    if (cards.length > 0) {
      staggerCards(cards);
    }
  }, []);

  const trainingCards = [
    {
      title: "Easy Steps",
      duration: "~30 sec",
      icon: "fas fa-leaf",
      bullets: [
        "Basic rhythm patterns",
        "Simple hand movements",
        "Foundation techniques"
      ]
    },
    {
      title: "Medium Steps",
      duration: "~1-2 mins",
      icon: "fas fa-mountain",
      bullets: [
        "Intermediate combinations",
        "Coordinated movements",
        "Style variations"
      ]
    },
    {
      title: "Hard Steps",
      duration: "~3-4 mins",
      icon: "fas fa-fire-alt",
      bullets: [
        "Advanced choreography",
        "Complex sequences",
        "Professional techniques"
      ]
    },
    {
      title: "Real-Time Songs",
      duration: "Full practice",
      icon: "fas fa-music",
      bullets: [
        "Complete choreography",
        "Song-based practice",
        "Performance ready"
      ]
    }
  ];

  return (
    <section className="section-spacing" id="training">
      <div className="container-custom">
        <h2 className="section-title gsap-reveal">Training System</h2>

        <div className="row g-4">
          {trainingCards.map((card, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div
                className="glass-card d-flex flex-column h-100"
                ref={el => cardsRef.current[index] = el}
              >
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <i className={`${card.icon} fa-2x`} style={{ color: '#a78bfa' }}></i>
                    <span className="badge-duration">{card.duration}</span>
                  </div>
                  <h3 className="card-title h4 mb-0">{card.title}</h3>
                </div>

                <ul className="list-unstyled flex-grow-1 mb-0">
                  {card.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="mb-3 d-flex align-items-start text-white-50">
                      <i className="fas fa-check-circle mt-1 me-2 small" style={{ color: '#10b981' }}></i>
                      <span className="small fw-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSystem;