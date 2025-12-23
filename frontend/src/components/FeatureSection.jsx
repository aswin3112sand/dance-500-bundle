export default function FeatureSection({ onBuyClick }) {
  return (
    <section className="feature">
      <div className="container feature-grid">
        <div>
          <div className="feature-pill">500 Dance Steps Bundle</div>
          <p className="section-kicker">ZERO GRAVITY DANCE</p>
          <h2>
            A neon stage for <span>bold</span> movers
          </h2>
          <p className="section-sub">
            Learn step-by-step with premium bundles. Get lifetime access and unlock all 500 dance steps in one purchase.
          </p>
          <div className="feature-actions">
            <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Unlock all 500 steps — ₹499</button>
            <button className="btn btn-ghost" data-magnetic type="button">Preview sample</button>
          </div>
          <div className="feature-tags">
            <span>Lifetime access</span>
            <span>UPI / Razorpay secure</span>
            <span>Instant unlock</span>
          </div>
        </div>
        <div className="feature-media">
          <div className="media-card">
            <div className="media-overlay">
              <div>
                <h4>Preview</h4>
                <p>Watch a sample step</p>
              </div>
              <button className="btn btn-ghost" data-magnetic type="button">Get now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}





