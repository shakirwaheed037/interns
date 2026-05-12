import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { UserPlus, Mail, Phone , RefreshCw,Crown, Lock, Check,  Shield, Info as InfoIcon, SquarePlus, GraduationCap, Building2 , IdCard, Info, ShieldCheck ,ArrowRight,ArrowLeft, Landmark ,UploadCloud, Monitor, Calendar, Eye, EyeOff, Smartphone } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    // Student Steps: 0: Role, 1: Personal, 2: OTP, 3: Academic, 4: Success
    // Company Steps: 0: Role, 1: Company Form, 4: Success
    // Admin Steps: 0: Role, 1: Admin Form, 4: Success
    const [step, setStep] = useState(0);
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
        university: '', program: '', semester: '', enrollmentNumber: '',
        companyName: '', industry: 'Technology', type: 'Software House', location: '', website: '', description: '', document: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlRole = params.get('role');
        if (urlRole === 'admin') {
            setRole('admin');
            setStep(1);
        }
    }, [location]);

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let documentUrl = '';
            if (role === 'company' && formData.document) {
                const uploadData = new FormData();
                uploadData.append('document', formData.document);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                documentUrl = uploadRes.data.url;
            }

            const payload = role === 'student' ? {
                name: formData.name, email: formData.email, phone: formData.phone,
                password: formData.password, role: 'student', university: formData.university,
                program: formData.program, semester: formData.semester, enrollmentNumber: formData.enrollmentNumber
            } : (role === 'company' ? {
                name: formData.companyName, email: formData.email,
                password: formData.password, role: 'company', companyName: formData.companyName,
                industry: formData.industry, type: formData.type, location: formData.location, website: formData.website, description: formData.description, registrationDocument: documentUrl
            } : {
                name: formData.name, email: formData.email,
                password: formData.password, role: 'admin'
            });
            const { data } = await api.post('/auth/register', payload);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success(`Welcome! ${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully.`);
            navigate(`/${role}-dashboard`);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#fff',
                    color: '#ef4444',
                    border: '1px solid #fee2e2',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                },
            });
        } finally {
            setLoading(false);
        }
    };


    const renderRoleSelection = () => (
        <div className="v3-card v3-card-role text-center">
            <div className="v3-shield-header" style={{ width: '64px', height: '64px', background: '#fff5f0', borderRadius: '1rem', margin: '0 auto 1.5rem' }}>
                <UserPlus size={28} color="#f26522" />
            </div>
            <h1 className="v3-form-title">Create Account</h1>
            <p className="v3-form-subtitle">Choose your account type to get started</p>
            <div className="role-options-list">
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>I want to register as:</p>
                {['student', 'company'].map((r) => (
                    <div key={r} className={`role-option-row ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>
                        <div className={`row-icon-box ${role === r ? 'active' : ''}`}>
                            {r === 'student' && <GraduationCap size={22} />}
                            {r === 'company' && <Building2 size={22} />}
                        </div>
                        <div className="row-text-box">
                            <h3 style={{ textTransform: 'capitalize' }}>{r}</h3>
                            <p>{r === 'student' ? 'Looking for internships and opportunities' : 'Hiring interns for projects and roles'}</p>
                        </div>
                        <div className={`radio-circle ${role === r ? 'selected' : ''}`}></div>
                    </div>
                ))}
            </div>
            <button className="v3-btn-std" style={{ width: '100%', padding: '1rem' }} onClick={() => setStep(1)}>
                Continue <ArrowRight size={18} />
            </button>
            <p className="role-signin-text">Already have an account? <Link to="/login" style={{ color: '#f26522', fontWeight: 700 }}>Sign in</Link></p>
            <div className="admin-login-link-container" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <span>Are you an Admin? </span>
                <Link to="/admin-login" className="admin-link">Login here</Link>
            </div>
        </div>
    );

    const renderAdminForm = () => (
        <div className="v3-card v3-card-compact admin-theme-card">
            <div className="v3-form-header text-center mb-8">
                <div className="admin-logo-header">
                    <div className="admin-logo-icon">
                        <Crown size={32} color="var(--primary-purple)" />
                    </div>
                </div>
                <h2 className="v3-form-title" style={{ fontSize: '2.4rem', background: 'var(--gradient-purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Create Admin Account</h2>
                <p className="v3-form-subtitle">Enter your details to register as a platform administrator</p>
            </div>
            <form className="v3-grid text-left" onSubmit={handleRegister}>
                {error && <div className="error-alert">{error}</div>}
                
                <div className="v3-input-group">
                    <label>Full Name</label>
                    <div className="v3-field-no-icon">
                        <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            required 
                            value={formData.name} 
                            onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            style={{ borderColor: 'var(--primary-purple)' }}
                        />
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Admin Email</label>
                    <div className="v3-field-no-icon">
                        <input 
                            type="email" 
                            placeholder="admin@internhub.com" 
                            required 
                            value={formData.email} 
                            onChange={e => setFormData({ ...formData, email: e.target.value })} 
                            style={{ borderColor: 'var(--primary-purple)' }}
                        />
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Password</label>
                    <div className="v3-field-no-icon" style={{ position: 'relative' }}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a secure admin password" 
                            required 
                            value={formData.password} 
                            onChange={e => setFormData({ ...formData, password: e.target.value })} 
                            style={{ paddingRight: '3rem', borderColor: 'var(--primary-purple)' }} 
                        />
                        <button 
                            type="button" 
                            className="password-eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ borderColor: 'var(--primary-purple)' }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Confirm Password</label>
                    <div className="v3-field-no-icon" style={{ position: 'relative' }}>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your admin password" 
                            required 
                            value={formData.confirmPassword} 
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                            style={{ paddingRight: '3rem', borderColor: 'var(--primary-purple)' }} 
                        />
                        <button 
                            type="button" 
                            className="password-eye-btn" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ borderColor: 'var(--primary-purple)' }}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        type="submit" 
                        className="v3-btn-comp admin-btn" 
                        disabled={loading} 
                        style={{ 
                            padding: '1.2rem', 
                            fontSize: '1.1rem', 
                            background: 'var(--gradient-purple)',
                            boxShadow: 'var(--shadow-md), var(--shadow-glow-purple)'
                        }}
                    >
                        {loading ? 'Processing...' : 'Register as Admin'}
                    </button>
                </div>
                
                <div className="admin-security-info">
                    <div className="security-icon">
                        <ShieldCheck size={20} color="var(--primary-purple)" />
                    </div>
                    <div className="security-text">
                        <strong>Enhanced Security:</strong> Admin accounts require additional verification and have elevated privileges for platform management.
                    </div>
                </div>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '2rem' }}>
                    Already have an admin account? <Link to="/admin-login" style={{ color: 'var(--primary-purple)', fontWeight: 700 }}>Sign In</Link>
                </p>
            </form>
        </div>
    );



    const renderStudentFlow = () => {
        const getProgress = () => step === 1 ? 33 : (step === 2 ? 66 : 100);
        return (
            <div className="v3-card v3-card-compact">
                <div className="v3-step-header">
                    <div className="v3-step-info">
                        <span className="v3-step-label">Step {step} of 3</span>
                        <span className="v3-step-percent">{getProgress()}% Complete</span>
                    </div>
                    <div className="v3-progress-bar">
                        <div className="v3-progress-fill" style={{ width: `${getProgress()}%` }}></div>
                    </div>
                </div>
                <div className="v3-tabs-nav">
                    <div className={`v3-tab-item ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>Personal Info</div>
                    <div className={`v3-tab-item ${step === 2 ? 'active' : ''}`}>Verify Phone</div>
                    <div className={`v3-tab-item ${step === 3 ? 'active' : ''}`}>Academic Details</div>
                </div>
                {step === 1 && (
                    <form className="v3-grid text-left" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                        {error && <div className="error-alert">{error}</div>}
                        <div className="mb-6">
                            <h2 className="v3-form-title">Create Student Account</h2>
                            <p className="v3-form-subtitle">Join our community to start your internship journey</p>
                        </div>
                        <div className="v3-grid-2 v3-grid">
                            <div className="v3-input-group">
                                <label>Full Name</label>
                                <div className="v3-field-with-icon">
                                    <UserPlus size={18} className="v3-field-icon" />
                                    <input 
                                        type="text" 
                                        placeholder="Enter your full name" 
                                        required 
                                        value={formData.name} 
                                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                                    />
                                </div>
                            </div>
                            <div className="v3-input-group">
                                <label>Email Address</label>
                                <div className="v3-field-with-icon">
                                    <Mail size={18} className="v3-field-icon" />
                                    <input 
                                        type="email" 
                                        placeholder="your.email@example.com" 
                                        required 
                                        value={formData.email} 
                                        onChange={e => setFormData({ ...formData, email: e.target.value })} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="v3-input-group">
                            <label>Phone Number</label>
                            <div className="v3-field-with-icon">
                                <Phone size={18} className="v3-field-icon" />
                                <input 
                                    type="tel" 
                                    placeholder="+92 300 1234567" 
                                    required 
                                    value={formData.phone} 
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                                />
                            </div>
                        </div>
                        <div className="v3-grid-2 v3-grid">
                            <div className="v3-input-group">
                                <label>Password</label>
                                <div className="v3-field-with-icon">
                                    <Lock size={18} className="v3-field-icon" />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Create a strong password" 
                                        required 
                                        value={formData.password} 
                                        onChange={e => setFormData({ ...formData, password: e.target.value })} 
                                        style={{ paddingRight: '3rem' }} 
                                    />
                                    <button 
                                        type="button" 
                                        className="password-eye-btn" 
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="v3-input-group">
                                <label>Confirm Password</label>
                                <div className="v3-field-with-icon">
                                    <RefreshCw size={18} className="v3-field-icon" />
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Confirm your password" 
                                        required 
                                        value={formData.confirmPassword} 
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                                        style={{ paddingRight: '3rem' }} 
                                    />
                                    <button 
                                        type="button" 
                                        className="password-eye-btn" 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="v3-footer-actions mt-8">
                            <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--primary-orange)', fontWeight: 700 }}>Log in</Link></p>
                            <button type="submit" className="v3-btn-std">
                                Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <div className="v3-otp-container">
                        <div className="v3-shield-header">
                            <div className="v3-shield-icon-bg">
                                <Smartphone size={40} color="var(--primary-orange)" />
                            </div>
                            <div className="v3-shield-check">
                                <Check size={20} color="white" />
                            </div>
                        </div>
                        <h2 className="v3-form-title">Verify Your Phone</h2>
                        <p className="v3-form-subtitle">
                            We've sent a 6-digit verification code to <strong style={{ color: 'var(--gray-800)' }}>{formData.phone || '+92 ••• ••• 4290'}</strong>
                        </p>
                        <div className="v3-otp-inputs">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <input 
                                    key={i} 
                                    type="text" 
                                    maxLength={1}
                                    className="v3-otp-box"
                                    placeholder="•"
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                />
                            ))}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '2.5rem' }}>
                            Didn't receive the code? 
                            <Link to="#" style={{ color: 'var(--primary-orange)', fontWeight: 700, marginLeft: '0.5rem' }}>Resend OTP</Link>
                        </p>
                        <div className="v3-footer-actions" style={{ width: '100%' }}>
                            <button className="v3-btn-back" onClick={() => setStep(1)}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button className="v3-btn-std" onClick={() => setStep(3)}>
                                Verify & Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <form className="v3-grid text-left" onSubmit={handleRegister}>
                        {error && <div className="error-alert">{error}</div>}
                        <div className="mb-6">
                            <h2 className="v3-form-title">Academic Information</h2>
                            <p className="v3-form-subtitle">Help us tailor your experience with your academic details</p>
                        </div>
                        <div className="v3-grid-2 v3-grid">
                            <div className="v3-input-group">
                                <label>University Name</label>
                                <div className="v3-field-with-icon">
                                    <Landmark size={18} className="v3-field-icon" />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Stanford University" 
                                        required 
                                        value={formData.university} 
                                        onChange={e => setFormData({ ...formData, university: e.target.value })} 
                                    />
                                </div>
                            </div>
                            <div className="v3-input-group">
                                <label>Program/Major</label>
                                <div className="v3-field-with-icon">
                                    <IdCard size={18} className="v3-field-icon" />
                                    <select 
                                        value={formData.program} 
                                        onChange={e => setFormData({ ...formData, program: e.target.value })} 
                                        required
                                    >
                                        <option value="">Select Program</option>
                                        <option>Software Engineering</option>
                                        <option>Artificial Intelligence</option>
                                        <option>Data Science</option>
                                        <option>Cyber Security</option>
                                        <option>Information Technology</option>
                                        <option>Computer Science</option>
                                        <option>Business Administration</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="v3-grid-2 v3-grid">
                            <div className="v3-input-group">
                                <label>Current Semester</label>
                                <div className="v3-field-with-icon">
                                    <Calendar size={18} className="v3-field-icon" />
                                    <select 
                                        value={formData.semester} 
                                        onChange={e => setFormData({ ...formData, semester: e.target.value })} 
                                        required
                                    >
                                        <option value="">Select Semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                            <option key={s} value={s}>Semester {s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="v3-input-group">
                                <label>Enrollment Number</label>
                                <div className="v3-field-with-icon">
                                    <Info size={18} className="v3-field-icon" />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. STU-2024-001" 
                                        required 
                                        value={formData.enrollmentNumber} 
                                        onChange={e => setFormData({ ...formData, enrollmentNumber: e.target.value })} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="v3-info-box">
                            <div style={{ color: 'var(--primary-orange)' }}>
                                <InfoIcon size={20} />
                            </div>
                            <p>
                                <strong>Why this information?</strong> 
                                We use your academic details to verify your student status and provide personalized internship recommendations that match your field of study and academic level.
                            </p>
                        </div>
                        <div className="v3-footer-actions mt-4">
                            <button type="button" className="v3-btn-back" onClick={() => setStep(2)}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button type="submit" className="v3-btn-std" disabled={loading}>
                                {loading ? 'Processing...' : 'Complete Registration'} <Check size={18} className="ml-1" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        );
    };

    const renderCompanyForm = () => (
        <div className="v3-card v3-card-wide">
            <div className="v3-form-header text-left mb-8">
                <h2 className="v3-form-title">Create Company Account</h2>
                <p className="v3-form-subtitle">Join our network of top employers and find talented interns</p>
            </div>
            <form className="v3-grid v3-grid-2" onSubmit={handleRegister}>
                {error && <div className="error-alert">{error}</div>}
                
                <div className="v3-input-group">
                    <label>Company Name</label>
                    <div className="v3-field-no-icon">
                        <input 
                            type="text" 
                            placeholder="e.g. Acme Corporation" 
                            required 
                            value={formData.companyName} 
                            onChange={e => setFormData({ ...formData, companyName: e.target.value })} 
                        />
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Official Email</label>
                    <div className="v3-field-no-icon">
                        <input 
                            type="email" 
                            placeholder="contact@company.com" 
                            required 
                            value={formData.email} 
                            onChange={e => setFormData({ ...formData, email: e.target.value })} 
                        />
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Password</label>
                    <div className="v3-field-no-icon" style={{ position: 'relative' }}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a strong password" 
                            required 
                            value={formData.password} 
                            onChange={e => setFormData({ ...formData, password: e.target.value })} 
                            style={{ paddingRight: '3rem' }} 
                        />
                        <button 
                            type="button" 
                            className="password-eye-btn" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Confirm Password</label>
                    <div className="v3-field-no-icon" style={{ position: 'relative' }}>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            required 
                            value={formData.confirmPassword} 
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                            style={{ paddingRight: '3rem' }} 
                        />
                        <button 
                            type="button" 
                            className="password-eye-btn" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Industry</label>
                    <div className="v3-field-no-icon">
                        <select 
                            value={formData.industry} 
                            onChange={e => setFormData({ ...formData, industry: e.target.value })}
                        >
                            <option>Technology</option>
                            <option>Finance</option>
                            <option>Healthcare</option>
                            <option>Education</option>
                            <option>Media & Entertainment</option>
                            <option>Retail</option>
                            <option>Manufacturing</option>
                            <option>Consulting</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Company Type</label>
                    <div className="v3-field-no-icon">
                        <select 
                            value={formData.type} 
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option>Software House</option>
                            <option>Startup</option>
                            <option>Enterprise</option>
                            <option>University</option>
                            <option>Government</option>
                            <option>Non-Profit</option>
                        </select>
                    </div>
                </div>
                
                <div className="v3-input-group">
                    <label>Location</label>
                    <div className="v3-field-no-icon">
                        <input 
                            type="text" 
                            placeholder="City, Country" 
                            required 
                            value={formData.location} 
                            onChange={e => setFormData({ ...formData, location: e.target.value })} 
                        />
                    </div>
                </div>
                
                <div className="v3-input-group full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="m-0">Company Website</label>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontStyle: 'italic' }}>(Optional)</span>
                    </div>
                    <div className="v3-field-no-icon">
                        <input 
                            type="url" 
                            placeholder="https://www.company.com" 
                            value={formData.website} 
                            onChange={e => setFormData({ ...formData, website: e.target.value })} 
                        />
                    </div>
                </div>
                
                <div className="v3-input-group full-width">
                    <label>Company Description</label>
                    <div className="v3-field-no-icon">
                        <textarea 
                            placeholder="Tell us about your company culture, mission, and what kind of interns you're looking for..." 
                            value={formData.description} 
                            onChange={e => setFormData({ ...formData, description: e.target.value })} 
                            style={{ minHeight: '120px' }}
                        ></textarea>
                    </div>
                </div>
                
                <div className="full-width mt-4">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--gray-700)' }}>Registration Document</label>
                    <label className="upload-box-v3" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <input 
                            type="file" 
                            style={{ display: 'none' }} 
                            accept=".pdf,.png,.jpg,.jpeg" 
                            onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })} 
                        />
                        <UploadCloud 
                            size={40} 
                            color={formData.document ? "var(--success)" : "var(--primary-blue)"} 
                        />
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>
                            {formData.document ? (
                                <span style={{ color: 'var(--success)', fontWeight: 700 }}>{formData.document.name}</span>
                            ) : (
                                <>
                                    <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>Click to upload</span> or drag and drop
                                </>
                            )}
                        </p>
                        {!formData.document && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.25rem' }}>
                                PDF, PNG, JPG up to 10MB
                            </span>
                        )}
                    </label>
                </div>
                
                <div className="full-width mt-8">
                    <button type="submit" className="v3-btn-comp" disabled={loading}>
                        {loading ? 'Processing...' : 'Create Company Account'}
                    </button>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '1.5rem' }}>
                        By registering, you agree to our <Link to="#" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>Privacy Policy</Link>.
                    </p>
                </div>
            </form>
        </div>
    );

    return (
        <div className="reg-page-v3 role-page-bg">
            <main className="reg-main-v3">
                {step === 0 && renderRoleSelection()}
                {step > 0 && step < 4 && (
                    role === 'company' ? renderCompanyForm() : (role === 'admin' ? renderAdminForm() : renderStudentFlow())
                )}
                {step === 4 && (
                    <div className="v3-card v3-card-compact text-center">
                        <div className="v3-shield-header" style={{ background: '#ecfdf5' }}><Check size={50} color="#10b981" /></div>
                        <h1 className="v3-form-title">You are registered!</h1>
                        <p className="v3-form-subtitle">Welcome to your new account. You can now log in and access your dashboard.</p>
                        <button className="v3-btn-std" style={{ width: '100%', marginTop: '2rem' }} onClick={() => navigate('/login')}>Go to Login</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Register;
