import React, { useEffect, useRef } from 'react';
import { countUp, fillBars, revealUp } from '../gsapHelpers';

const StatsStrip = () => {
  const statsRef = useRef(null);
  const countRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    // Count up animation for main number
    if (countRef.current) {
      countUp(countRef.current, 639);
    }

    // Progress bars animation
    const progressBars = barsRef.current.filter(bar => bar !== null);
    if (progressBars.length > 0) {
      // Calculate percentages: 
      // Easy: 194/639 = 30.3%
      // Medium: 219/639 = 34.2%
      // Hard: 226/639 = 35.5%
      const percentages = [30.3, 34.2, 35.5];
      fillBars(progressBars, percentages);
    }

    // Reveal animation for the section
    if (statsRef.current) {
      revealUp(statsRef.current.children);
    }
  }, []);

  return (
    <section className="section-spacing" id="stats">
      <div className="container-custom">
        <div ref={statsRef}>
          {/* Main Stats Number */}
          <div className="text-center mb-5 gsap-reveal">
            <div className="stats-number" ref={countRef}>0</div>
            <div className="stats-label">TOTAL PREMIUM DANCE STEPS</div>
          </div>

          {/* Breakdown Cards */}
          <div className="row g-4 justify-content-center">
            <div className="col-md-4 gsap-reveal">
              <div className="glass-card-mini">
                <span className="text-white-50 small fw-bold tracking-wider">LEVEL 01</span>
                <h4 className="mt-1 mb-2 text-white fw-bold">EASY</h4>
                <div className="stats-number h2 mb-2">194</div>
                <div className="progress-bar-custom">
                  <div
                    className="progress-fill"
                    ref={el => barsRef.current[0] = el}
                    style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }}
                  ></div>
                </div>
                <small className="text-white-50 mt-2 d-block">Foundational Movements</small>
              </div>
            </div>

            <div className="col-md-4 gsap-reveal">
              <div className="glass-card-mini">
                <span className="text-white-50 small fw-bold tracking-wider">LEVEL 02</span>
                <h4 className="mt-1 mb-2 text-white fw-bold">MEDIUM</h4>
                <div className="stats-number h2 mb-2">219</div>
                <div className="progress-bar-custom">
                  <div
                    className="progress-fill"
                    ref={el => barsRef.current[1] = el}
                    style={{ background: 'linear-gradient(90deg, #8b5cf6, #a855f7)' }}
                  ></div>
                </div>
                <small className="text-white-50 mt-2 d-block">Intermediate Techniques</small>
              </div>
            </div>

            <div className="col-md-4 gsap-reveal">
              <div className="glass-card-mini">
                <span className="text-white-50 small fw-bold tracking-wider">LEVEL 03</span>
                <h4 className="mt-1 mb-2 text-white fw-bold">HARD</h4>
                <div className="stats-number h2 mb-2">226</div>
                <div className="progress-bar-custom">
                  <div
                    className="progress-fill"
                    ref={el => barsRef.current[2] = el}
                    style={{ background: 'linear-gradient(90deg, #f43f5e, #fb7185)' }}
                  ></div>
                </div>
                <small className="text-white-50 mt-2 d-block">Advanced Choreography</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;