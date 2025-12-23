import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BundleHero from '../components/BundleHero';
import FloatingCTA from '../components/FloatingCTA';
import StickyIcons from '../components/StickyIcons';
import Toast from '../components/Toast';
import { Lock, Play, Clock, BarChart } from 'lucide-react';

const Bundle = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paymentTriggered = useRef(false);
    const [videos, setVideos] = useState([]);
    const [bundle, setBundle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchParams.get('pay') === '1' && user && !paymentTriggered.current) {
            paymentTriggered.current = true;
            handlePayment();
        }
    }, [searchParams, user]);

    const fetchData = async () => {
        try {
            const [vRes, bRes] = await Promise.all([
                api.get('/api/videos'),
                api.get('/api/bundles/1')
            ]);
            setVideos(vRes.data);
            setBundle(bRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/bundle', search: '?pay=1' } } });
            return;
        }

        try {
            const res = await api.post('/api/payments/create-order', { bundleId: 1 });
            const { orderId, amount, currency, keyId } = res.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "AS DANCE",
                description: "Premium 500 Step Bundle",
                order_id: orderId,
                handler: async (response) => {
                    try {
                        await api.post('/api/payments/verify', {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
                        window.location.href = '/thank-you';
                    } catch (err) {
                        setToast("Payment verification failed");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#7000ff"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setToast("Error starting payment");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="pb-5">
            <Navbar />
            <BundleHero />

            <section className="section">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                        <div>
                            <p className="hero-kicker">BUNDLE CATALOG</p>
                            <h2 className="section-title">Step bundle curriculum</h2>
                            <p className="section-subtitle">Master 500+ steps with premium training cards.</p>
                        </div>
                        {!user?.unlockedBundle && (
                            <button onClick={handlePayment} className="glow-btn">Get lifetime access — ₹499</button>
                        )}
                    </div>

                    <div className="catalog-grid">
                        {videos.map((vid) => (
                            <div key={vid.id} className="catalog-card">
                                <div className="catalog-thumb">
                                    {vid.thumbnailPath ? (
                                        <img src={vid.thumbnailPath} alt={vid.title} loading="lazy" />
                                    ) : (
                                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-dark text-muted">
                                            No Preview
                                        </div>
                                    )}

                                    {!user?.unlockedBundle && (
                                        <div className="catalog-lock">
                                            <Lock size={36} className="text-white opacity-75" />
                                        </div>
                                    )}
                                </div>
                                <div className="catalog-card-body">
                                    <span className="catalog-tag">{vid.level}</span>
                                    <h5 className="mb-2">{vid.title}</h5>
                                    <div className="d-flex gap-3 text-muted small mb-3">
                                        <span className="d-flex align-items-center gap-1"><Clock size={14} /> {vid.duration}</span>
                                        <span className="d-flex align-items-center gap-1"><BarChart size={14} /> {vid.stepsCount} steps</span>
                                    </div>
                                    {user?.unlockedBundle ? (
                                        <button className="btn btn-outline-info w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                                            <Play size={16} /> Watch Now
                                        </button>
                                    ) : (
                                        <button onClick={handlePayment} className="btn btn-secondary w-100 rounded-pill opacity-75">Locked</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FloatingCTA />
            <StickyIcons />
            <Toast message={toast} onClose={() => setToast(null)} />
        </div>
    );
};

export default Bundle;
