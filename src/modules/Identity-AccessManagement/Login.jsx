import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    // ✅ Updated state keys to match your backend JSON exactly
    const [credentials, setCredentials] = useState({ 
        email: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ 
            ...credentials, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // This sends { "email": "...", "password": "..." }
            const data = await authLogin(credentials);
            console.log("Login successful!", data);
            login(data.token); // Store token globally via context

            const payload = JSON.parse(atob(data.token.split('.')[1]));
                
                const role = payload.role;   // ✅ IMPORTANT
 
                console.log("User Role:", role);
 
                // ✅ redirect based on role
                if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (role === "JUDGE") {
                    navigate("/judgeorder/judgements");
                } else if (role === "MANAGER") {
                    navigate("/programmanager/dashboard");
                } else if (role === "COMPLIANCE") {
                    navigate("/compliance-audit/dashboard");
                } else if (role === "AUDITOR") {
                    navigate("/auditor/dashboard");
                } else {
                    navigate("/citizen/dashboard");  // default
                }
            
        } catch (err) {
            // Displays specific error from your IdentityService (e.g., "PENDING")
            setError(err.response?.data?.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h3 className="mb-0">
                                <i className="bi bi-shield-lock me-2"></i>
                                JusticeGov Login
                            </h3>
                            <p className="mb-0 small">Secure Access Portal</p>
                        </div>
                        <div className="card-body p-4">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        <i className="bi bi-envelope me-1"></i>
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        value={credentials.email} 
                                        onChange={handleChange} 
                                        placeholder="Enter your email"
                                        required 
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        <i className="bi bi-key me-1"></i>
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        value={credentials.password} 
                                        onChange={handleChange} 
                                        placeholder="Enter your password"
                                        required 
                                    />
                                </div>
                                
                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center py-3 bg-light">
                            <small className="text-muted">
                                Need an account? <a href="/register" className="text-decoration-none">Register here</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;