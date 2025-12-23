import React, { useEffect } from 'react';
import { heroSequence } from '../gsapHelpers';

const Hero = () => {
  useEffect(() => {
    heroSequence();
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1920"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-man-dancing-in-a-nightclub-4252-large.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Snow Effect */}
      <div className="snow-overlay"></div>

      <div className="container-custom">
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-7">
            <div className="hero-content">
              <span className="hero-subtitle gsap-reveal">#1 TAMIL DANCE PLATFORM</span>
              <h1 className="hero-title gsap-reveal">AS DANCE</h1>

              <div className="gsap-reveal">
                <h2 className="h4 mb-4 text-white-50 fw-bold">
                  639 Premium Dance Steps • Tamil Training • Lifetime Access
                </h2>
                <p className="hero-description">
                  Real-time song based training • Practical step-by-step learning.
                  Master the art of dance with our professional Tamil curriculum.
                </p>
              </div>

              <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 gsap-reveal">
                <a href="#offer" className="btn-primary-custom">
                  GET INSTANT ACCESS
                </a>
                <a href="#training" className="btn-secondary-custom">
                  <i className="fas fa-play me-2 small"></i>
                  Watch Preview
                </a>
              </div>

              {/* Trust Badges */}
              <div className="d-flex flex-wrap gap-2 mt-5 gsap-reveal">
                <div className="trust-badge">
                  <i className="fas fa-check-circle text-primary"></i>
                  <span>Lifetime Access</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-users text-primary"></i>
                  <span>10,000+ Students</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-star text-warning"></i>
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 position-relative d-none d-lg-block">
            <img
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800"
              alt="Dancer silhouette"
              className="hero-dancer img-fluid gsap-reveal"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;