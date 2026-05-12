import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { decodeToken } from '../../utils/jwtUtils';
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
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
            // 1. Authenticate and get the token
            const data = await authLogin(credentials);
            const token = data?.token || data?.accessToken;
            if (!token) {
                throw new Error('Login succeeded but no token was returned.');
            }

            // Store token in localStorage and context
            login(token);

            // 2. Decode the token to determine the role
            const decoded = decodeToken();
            const role = decoded?.role?.toUpperCase();

            console.log("Login successful!", { role });

            if (role === "ADMIN" || role === "REGISTRAR") {
                navigate("/register/dashboard");
            } else if (role === "JUDGE") {
                navigate("/judgeorder/judgements");
            } else if (role === "COMPLIANCE_OFFICER") {
                navigate("/compliance/dashboard");
            } else if (role === "CITIZEN") {
                navigate("/citizenregister/my-profile");
            } else if (role === "LAWYER") {
                navigate("/lawyerregister/my-profile");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
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
                                Need an account? <a href="/signup" className="text-decoration-none">Register here</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;