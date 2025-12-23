import Navbar from "../components/Navbar";
import LandingHero from "../components/landing/LandingHero";
import StatsStrip from "../components/landing/StatsStrip";
import FeatureCards from "../components/landing/FeatureCards";
import OfferSection from "../components/landing/OfferSection";
import Reviews from "../components/Reviews";
import StickyIcons from "../components/StickyIcons";

const Home = () => {
    return (
        <div className="home-page pb-0" style={{ backgroundColor: "var(--bg-0)", overflowX: "hidden" }}>
            <Navbar />

            <LandingHero />

            <div className="position-relative">
                {/* Background decorative blob */}
                <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden z-0 pointer-events-none">
                    <div className="position-absolute top-25 start-0 w-50 h-50 bg-primary opacity-10 rounded-circle blur-3xl"
                        style={{ filter: "blur(120px)", transform: "translate(-30%, -20%)" }}></div>
                    <div className="position-absolute bottom-25 end-0 w-50 h-50 bg-secondary opacity-10 rounded-circle blur-3xl"
                        style={{ filter: "blur(120px)", transform: "translate(30%, 20%)" }}></div>
                </div>

                <StatsStrip />
                <FeatureCards />
                <OfferSection />
                <Reviews />
            </div>

            {/* Simple FAQ Placeholder (as requested in flow) */}
            <div className="container py-5 z-2 position-relative">
                <div className="text-center mb-5">
                    <h3 className="h2 fw-bold text-white title-font">Common Questions</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="accordion accordion-flush" id="faqAccordion">
                            <div className="accordion-item bg-transparent border-bottom border-light border-opacity-10">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-white shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                        Do I need previous dance experience?
                                    </button>
                                </h2>
                                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-soft">
                                        Not at all! Our "Easy Steps" module is designed specifically for complete beginners to build rhythm and confidence from scratch.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item bg-transparent border-bottom border-light border-opacity-10">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-white shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                        Is this a monthly subscription?
                                    </button>
                                </h2>
                                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-soft">
                                        No, the ₹499 offer provides Lifetime Access. You pay once and own the course content forever, including future updates.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item bg-transparent border-bottom border-light border-opacity-10">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-transparent text-white shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                        Can I download the videos?
                                    </button>
                                </h2>
                                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body text-soft">
                                        Currently, videos are streamed to ensure you always have the highest quality and latest versions. You can access them from any device, anywhere.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StickyIcons />

            <footer className="text-center py-5 border-top border-light border-opacity-10 mt-5 position-relative z-2">
                <div className="container">
                    <h5 className="mb-3 fw-bold letter-spacing-2">AS DANCE</h5>
                    <div className="d-flex justify-content-center gap-4 mb-4 text-soft">
                        <a href="#" className="hover-white transition-colors">Instagram</a>
                        <a href="#" className="hover-white transition-colors">YouTube</a>
                        <a href="#" className="hover-white transition-colors">Support</a>
                    </div>
                    <p className="text-dim small mb-0">© 2024 AS DANCE Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
