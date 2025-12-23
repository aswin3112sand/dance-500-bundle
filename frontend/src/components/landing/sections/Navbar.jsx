import React from 'react';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 72; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar-custom">
      <div className="container-custom">
        <div className="d-flex justify-content-between align-items-center h-100">
          <a
            href="#"
            className="navbar-brand-custom"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            AS DANCE
          </a>

          <div className="navbar-nav-custom d-none d-md-flex">
            <a
              href="#training"
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('training');
              }}
            >
              Steps
            </a>
            <a
              href="#training"
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('training');
              }}
            >
              Training
            </a>
            <a
              href="#offer"
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('offer');
              }}
            >
              Offer
            </a>
            <a
              href="#reviews"
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('reviews');
              }}
            >
              Reviews
            </a>
            <a
              href="#offer"
              className="btn-primary-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('offer');
              }}
              style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '10px' }}
            >
              Get Access
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="btn btn-link text-white d-md-none border-0 p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
          >
            <i className="fas fa-bars fa-lg"></i>
          </button>
        </div>

        {/* Mobile menu */}
        <div className="collapse" id="mobileNav">
          <div className="d-flex flex-column gap-3 py-4 d-md-none border-top border-white border-opacity-10 mt-2">
            <a
              href="#training"
              className="nav-link-custom"
              onClick={() => scrollToSection('training')}
            >
              Steps
            </a>
            <a
              href="#training"
              className="nav-link-custom"
              onClick={() => scrollToSection('training')}
            >
              Training
            </a>
            <a
              href="#offer"
              className="nav-link-custom"
              onClick={() => scrollToSection('offer')}
            >
              Offer
            </a>
            <a
              href="#reviews"
              className="nav-link-custom"
              onClick={() => scrollToSection('reviews')}
            >
              Reviews
            </a>
            <a
              href="#offer"
              className="btn-primary-custom text-center"
              onClick={() => scrollToSection('offer')}
            >
              Get Access
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;