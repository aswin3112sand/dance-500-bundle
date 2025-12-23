import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="contact-grid">
                    <div>
                        <p className="hero-kicker">STAY IN RHYTHM</p>
                        <h2 className="section-title">Tell us your next routine</h2>
                        <p className="section-subtitle">
                            Drop your email and message; we’ll craft the perfect choreography pack for you.
                        </p>

                        <div className="d-flex flex-column gap-4 mt-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="glass-card p-3 rounded-circle"><Mail size={20} className="text-info" /></div>
                                <div>
                                    <h6 className="mb-0">Email us</h6>
                                    <p className="text-muted mb-0">support@asdance.com</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="glass-card p-3 rounded-circle"><Phone size={20} className="text-success" /></div>
                                <div>
                                    <h6 className="mb-0">WhatsApp</h6>
                                    <p className="text-muted mb-0">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="glass-card p-3 rounded-circle"><MapPin size={20} className="text-warning" /></div>
                                <div>
                                    <h6 className="mb-0">Studio</h6>
                                    <p className="text-muted mb-0">Chennai, Tamil Nadu, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card strong p-4 p-lg-5 contact-form">
                        <h3 className="mb-4">Start a request</h3>
                        <form>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Name</label>
                                <input type="text" className="form-control p-3" placeholder="Your name" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Email</label>
                                <input type="email" className="form-control p-3" placeholder="you@example.com" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-muted">WhatsApp number</label>
                                <input type="text" className="form-control p-3" placeholder="+91 98765 43210" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Message</label>
                                <textarea className="form-control p-3" rows="4" placeholder="Tell us about your song, duration, and vibe"></textarea>
                            </div>
                            <button type="submit" className="glow-btn w-100 py-3 mt-2">Send Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
