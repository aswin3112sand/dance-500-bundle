import React from 'react';

const Footer = () => {
  return (
    <footer className="section-spacing" style={{ background: '#070a1d', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container-custom">
        <div className="row g-5">
          {/* Brand Section */}
          <div className="col-lg-4">
            <h3 className="mb-4 text-white fw-900 tracking-tighter">
              AS DANCE
            </h3>
            <p className="text-white-50 mb-4" style={{ maxWidth: '320px' }}>
              The definitive Tamil dance training platform. Master 639 professional steps with lifetime access and expert guidance.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4">
            <h6 className="text-white fw-bold mb-4">Platform</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#hero" className="text-white-50 text-decoration-none hover-text-primary small">Home</a>
              </li>
              <li className="mb-2">
                <a href="#training" className="text-white-50 text-decoration-none hover-text-primary small">Training</a>
              </li>
              <li className="mb-2">
                <a href="#offer" className="text-white-50 text-decoration-none hover-text-primary small">Offer</a>
              </li>
              <li className="mb-2">
                <a href="#reviews" className="text-white-50 text-decoration-none hover-text-primary small">Reviews</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-4">
            <h6 className="text-white fw-bold mb-4">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#faq" className="text-white-50 text-decoration-none hover-text-primary small">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="https://wa.me/919876543210" className="text-white-50 text-decoration-none hover-text-primary small">WhatsApp Help</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none hover-text-primary small">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none hover-text-primary small">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-4">
            <h6 className="text-white fw-bold mb-4">Get In Touch</h6>
            <div className="mb-3 d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                <i className="fas fa-envelope text-primary small"></i>
              </div>
              <span className="text-white-50 small">support@asdance.com</span>
            </div>
            <div className="mb-4 d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 p-2 rounded-3">
                <i className="fab fa-whatsapp text-success small"></i>
              </div>
              <span className="text-white-50 small">+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5 pt-4 border-top border-white border-opacity-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-white-50 small">
            © 2024 AS DANCE. Designed for world-class performers.
          </p>
          <p className="mb-0 text-white-50 small">
            Built with <i className="fas fa-heart text-danger mx-1"></i> for the Tamil Dance Community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;