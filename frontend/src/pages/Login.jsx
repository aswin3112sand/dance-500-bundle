import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlassWater } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            const params = new URLSearchParams(location.search);
            const returnTo = params.get('returnTo');
            const payFlag = params.get('pay');
            const queryTarget = returnTo ? `${returnTo}${payFlag ? '?pay=1' : ''}` : null;
            const target = location.state?.from || queryTarget || '/dashboard';
            navigate(target, { replace: true });
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center px-4">
            <div className="glass-card p-5 w-100" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-5">
                    <Link to="/" className="text-decoration-none text-white fs-2 fw-bold">
                        Dance<span style={{ color: 'var(--accent-primary)' }}>•</span>500
                    </Link>
                    <h3 className="mt-4 mb-2">Welcome Back</h3>
                    <p className="text-muted">Login to your premium account</p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label small text-muted">Email Address</label>
                        <input
                            type="email"
                            className="form-control bg-transparent text-white border-secondary p-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label small text-muted">Password</label>
                        <input
                            type="password"
                            className="form-control bg-transparent text-white border-secondary p-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="glow-btn w-100 py-3 mt-2">Login</button>
                </form>

                <p className="text-center mt-5 text-muted small">
                    Don't have an account? <Link to="/register" className="text-info text-decoration-none">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
