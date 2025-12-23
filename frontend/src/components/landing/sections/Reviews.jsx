import React, { useEffect, useRef } from 'react';
import { fadeIn, revealUp } from '../gsapHelpers';

const Reviews = () => {
  const reviewsRef = useRef(null);
  const sectionContentRef = useRef(null);

  useEffect(() => {
    if (reviewsRef.current) {
      fadeIn(reviewsRef.current);
    }
    if (sectionContentRef.current) {
      revealUp(sectionContentRef.current.children);
    }
  }, []);

  const reviews = [
    {
      name: "Priya S.",
      rating: 5,
      text: "Amazing step-by-step tutorials! I learned so much in just a few weeks. The Tamil explanations make it so easy to follow.",
      location: "Chennai"
    },
    {
      name: "Rajesh K.",
      rating: 5,
      text: "639 steps for ₹499 is incredible value. My daughter loves the easy steps section. Highly recommended!",
      location: "Coimbatore"
    },
    {
      name: "Meera R.",
      rating: 5,
      text: "The real-time song practice is fantastic. I can now dance confidently at family functions. Thank you AS DANCE!",
      location: "Madurai"
    },
    {
      name: "Karthik M.",
      rating: 5,
      text: "Professional quality training at home. The hard steps section really challenged me. Worth every rupee!",
      location: "Salem"
    },
    {
      name: "Divya L.",
      rating: 5,
      text: "Lifetime access is the best part. I keep coming back to practice new steps. Great investment for dance lovers.",
      location: "Trichy"
    },
    {
      name: "Arjun P.",
      rating: 4,
      text: "Clear instructions in Tamil made learning so much easier. My whole family is now learning together!",
      location: "Erode"
    },
    {
      name: "Lakshmi V.",
      rating: 5,
      text: "From beginner to intermediate in 3 months! The progression system is perfectly designed. Loving it!",
      location: "Vellore"
    },
    {
      name: "Suresh B.",
      rating: 5,
      text: "Best dance platform I've used. The variety of steps keeps me engaged. Customer support is also excellent.",
      location: "Tirunelveli"
    },
    {
      name: "Kavitha N.",
      rating: 5,
      text: "My kids love the easy steps and I enjoy the advanced ones. Something for everyone in the family!",
      location: "Thanjavur"
    },
    {
      name: "Vikram S.",
      rating: 5,
      text: "The Christmas offer was too good to miss. Already learned 50+ steps. Quality content at unbeatable price!",
      location: "Kanchipuram"
    },
    {
      name: "Anitha R.",
      rating: 5,
      text: "WhatsApp support helped me instantly when I had questions. Very responsive team. Great experience overall!",
      location: "Karur"
    },
    {
      name: "Manoj T.",
      rating: 5,
      text: "The video quality is excellent and the step breakdown is perfect. I can pause and practice at my own pace.",
      location: "Dindigul"
    }
  ];

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star small ${i < rating ? 'text-warning' : 'text-white-10'}`}
      ></i>
    ));
  };

  return (
    <section className="section-spacing overflow-hidden" id="reviews">
      <div className="container-custom">
        <div ref={sectionContentRef} className="text-center mb-5">
          <h2 className="section-title mb-3">Happy Students</h2>
          <p className="text-white-50 lead mx-auto" style={{ maxWidth: '600px' }}>
            Join 10,000+ dancers who have mastered their moves with AS DANCE.
          </p>
        </div>

        <div className="position-relative" ref={reviewsRef}>
          <div className="review-scroll">
            {duplicatedReviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                      <span className="fw-bold text-white small">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h6 className="mb-0 text-white fw-bold">{review.name}</h6>
                      <small className="text-white-50">{review.location}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="mb-0 text-white-80 leading-relaxed small">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div
            className="position-absolute top-0 start-0 h-100 d-none d-md-block"
            style={{
              width: '150px',
              background: 'linear-gradient(90deg, #0a0e27 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          ></div>
          <div
            className="position-absolute top-0 end-0 h-100 d-none d-md-block"
            style={{
              width: '150px',
              background: 'linear-gradient(270deg, #0a0e27 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          ></div>
        </div>

        <div className="text-center mt-5 gsap-reveal">
          <a href="#offer" className="btn-primary-custom">
            Join The Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;