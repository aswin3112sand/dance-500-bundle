import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await api.get('/api/auth/me');
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        setUser(res.data.user);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        return res.data;
    };

    const register = async (userData) => {
        await api.post('/api/auth/register', userData);
    };

    const logout = async () => {
        await api.post('/api/auth/logout');
        setUser(null);
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
