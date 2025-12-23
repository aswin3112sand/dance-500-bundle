import React, { useEffect, useRef } from 'react';
import { revealUp, pricePulse, buttonGlow } from '../gsapHelpers';

const ChristmasOffer = () => {
  const sectionRef = useRef(null);
  const priceRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Section reveal animation
    if (sectionRef.current) {
      revealUp(sectionRef.current.children, { stagger: 0.15 });
    }

    // Price pulse animation
    if (priceRef.current) {
      pricePulse(priceRef.current);
    }

    // Button glow effect
    if (buttonRef.current) {
      buttonGlow(buttonRef.current);
    }
  }, []);

  return (
    <section className="section-spacing" id="offer">
      <div className="container-custom">
        <div ref={sectionRef}>
          {/* Christmas Header */}
          <div className="text-center mb-5 gsap-reveal">
            <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
              <i className="fas fa-snowflake fa-lg text-info opacity-50"></i>
              <span className="text-info fw-bold tracking-widest small">CHRISTMAS SPECIAL OFFER</span>
              <i className="fas fa-snowflake fa-lg text-info opacity-50"></i>
            </div>
            <h2 className="display-4 fw-900 text-white mb-3">Grab Lifetime Access</h2>
            <p className="lead text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Join thousands of students and start your dance journey today with our exclusive holiday pricing.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="glass-card overflow-hidden p-0 border-0">
                <div className="row g-0">
                  {/* Left Side: Content */}
                  <div className="col-md-7 p-4 p-lg-5">
                    <h3 className="h2 fw-bold text-white mb-4">AS DANCE Premium Bundle</h3>

                    <ul className="list-unstyled mb-5">
                      {[
                        "639 Professional Dance Steps",
                        "Lifetime Access to All Content",
                        "Step-by-Step Tamil Training",
                        "Instant Access After Payment",
                        "Exclusive WhatsApp Community"
                      ].map((item, i) => (
                        <li key={i} className="mb-3 d-flex align-items-center text-white-80">
                          <div className="bg-success-subtle rounded-circle p-1 me-3">
                            <i className="fas fa-check text-success small"></i>
                          </div>
                          <span className="fw-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="d-flex flex-wrap gap-3">
                      <div className="trust-badge">
                        <i className="fas fa-shield-alt text-success"></i>
                        <span className="small">Secure Payment</span>
                      </div>
                      <div className="trust-badge">
                        <i className="fab fa-whatsapp text-success"></i>
                        <span className="small">24/7 Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Pricing & CTA */}
                  <div className="col-md-5 bg-white bg-opacity-5 p-4 p-lg-5 d-flex flex-column justify-content-center text-center border-start border-white border-opacity-10">
                    <div className="mb-4">
                      <span className="price-strike d-block mb-1">₹1500</span>
                      <div className="price-current mb-0" ref={priceRef}>₹499</div>
                      <span className="text-success fw-bold small">ONE-TIME PAYMENT</span>
                    </div>

                    <a
                      href="#"
                      className="btn-primary-custom w-100 mb-4 py-4 shadow-lg"
                      ref={buttonRef}
                    >
                      BUY NOW – ₹499
                    </a>

                    <div className="p-3 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-20 urgency-box">
                      <p className="mb-0 text-danger fw-bold small">
                        <i className="fas fa-bolt me-2 pulse"></i>
                        Limited Christmas Special
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasOffer;