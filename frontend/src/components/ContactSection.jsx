import contactImage from '../assets/catalog-2.jpg'

export default function ContactSection({ onBuyClick }) {
  return (
    <section className="contact">
      <div className="container contact-grid">
        <div className="contact-media">
          <img src={contactImage} alt="Studio contact" loading="lazy" decoding="async" />
        </div>
        <div className="contact-panel">
          <div>
            <p className="section-kicker">CONTACT</p>
            <h2>Talk to the studio team</h2>
            <p className="section-sub">Share your goal and we will guide you to the right step bundle.</p>
            <div className="contact-tags">
              <span>WhatsApp: +91 8825602356</span>
              <span>Email: bussinessaswin@gmail.com</span>
              <span>Secure Razorpay checkout</span>
            </div>
          </div>
          <form className="glass-form">
            <label>
              <span>Name</span>
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Message</span>
              <textarea rows="4" placeholder="Tell us about your routine or event" />
            </label>
            <div className="pricing-actions">
              <button type="button" className="btn btn-cta" data-magnetic onClick={onBuyClick}>Get now</button>
              <a className="btn btn-ghost" data-magnetic href="https://wa.me/918825602356" target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="btn btn-ghost" data-magnetic href="mailto:bussinessaswin@gmail.com">Email us</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
