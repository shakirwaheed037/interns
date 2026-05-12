import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Lock, Crown, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './Login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Role is fixed to admin for this page
            const { data } = await api.post('/auth/login', { email, password, role: 'admin' });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Admin login successful!', { duration: 2000 });
            navigate('/admin-dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Admin login failed';
            setError(errorMessage);
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#fff',
                    color: '#8b5cf6',
                    border: '1px solid #ddd6fe',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                },
            });
        }
    };

    return (
        <div className="login-page-wrapper">
            {/* Left Panel - Admin Branding */}
            <div className="login-left-panel" style={{ background: 'var(--gradient-purple)' }}>
                <div className="login-branding">
                    <div className="login-branding-icon">
                        <Crown size={40} color="white" />
                    </div>
                    <h1>Admin Portal</h1>
                    <p>Secure administrative access to the InternHub platform</p>
                    
                    <div className="login-features">
                        <div className="login-feature">
                            <div className="login-feature-icon">
                                <Lock size={20} color="white" />
                            </div>
                            <div className="login-feature-text">
                                <h3>Enhanced Security</h3>
                                <p>Multi-factor authentication</p>
                            </div>
                        </div>
                        
                        <div className="login-feature">
                            <div className="login-feature-icon">
                                <CheckCircle size={20} color="white" />
                            </div>
                            <div className="login-feature-text">
                                <h3>Full Control</h3>
                                <p>Complete platform management</p>
                            </div>
                        </div>
                        
                        <div className="login-feature">
                            <div className="login-feature-icon">
                                <AlertCircle size={20} color="white" />
                            </div>
                            <div className="login-feature-text">
                                <h3>24/7 Monitoring</h3>
                                <p>Real-time system alerts</p>
                            </div>
                        </div>
                        
                        <div className="login-feature">
                            <div className="login-feature-icon">
                                <ShieldCheck size={20} color="white" />
                            </div>
                            <div className="login-feature-text">
                                <h3>Enterprise Grade</h3>
                                <p>Advanced security protocols</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right Panel - Admin Login Form */}
            <div className="login-right-panel">
                <div className="login-card-modern admin-theme">
                    <div className="login-logo-circle" style={{ background: 'var(--gradient-purple)' }}>
                        <div className="logo-cutout">AP</div>
                    </div>
                    <h2>Admin Access</h2>
                    <p className="login-subtitle">Enter your administrative credentials</p>

                    {error && <div className="error-alert">{error}</div>}

                    <form onSubmit={submitHandler} className="login-form-modern">
                        <div className="form-group-modern">
                            <label>Admin Email</label>
                            <input 
                                type="email" 
                                placeholder="admin@internhub.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                style={{ borderColor: 'var(--primary-purple)' }}
                            />
                        </div>

                        <div className="form-group-modern">
                            <label>Admin Password</label>
                            <div className="password-input-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter admin password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    style={{ borderColor: 'var(--primary-purple)' }}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ borderColor: 'var(--primary-purple)' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn-signin-blue" 
                            style={{ background: 'var(--gradient-purple)' }}
                        >
                            Access Dashboard
                        </button>
                    </form>

                    <div className="forgot-password-link">
                        <Link to="/login" style={{ color: 'var(--primary-purple)', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>← Back to User Login</Link>
                        <Link to="#" style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>Forgot admin password?</Link>
                    </div>

                    <div className="login-footer-modern">
                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: 0 }}>
                            First time admin? <Link to="/register?role=admin" style={{ color: 'var(--primary-purple)', fontWeight: '700' }}>Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
