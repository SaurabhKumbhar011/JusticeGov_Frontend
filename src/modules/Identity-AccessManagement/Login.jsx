import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
// NEW: Import the API calls to check if profile exists
import { getCitizenByUserId, getLawyerByUserId } from "../Citizen-Lawyer-Registration/axios/registrationApi";
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
                        const rawToken = typeof data === 'string'
                            ? data
                            : data.token ?? data.accessToken ?? data.access_token ?? data.jwt ?? data.authToken ?? data?.data?.token ?? data?.data?.accessToken;
                        if (!rawToken) {
                            throw new Error('Login response did not include an auth token.');
                        }
            const token = rawToken?.toString().trim().replace(/^\"|\"$/g, '').replace(/^\'|\'$/g, '');
            
            // 2. Decode the token to get role and currentUserId
            const encoded = token.split('.')[1] || '';
            const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            const role = payload.role;   
            const currentUserId = payload.userId || payload.id || payload.sub; 

            console.log("User Role:", role, "User ID:", currentUserId);

            // 3. Store token globally
            login(token); 

            // 🚀 THE FIX: If they are Admin, Registrar, Judge, Officer, or Auditor -> Skip DB check!
            if (role === "ADMIN" || role === "REGISTRAR") {
                navigate("/register/citizens");
            } else if (role === "JUDGE") {
                navigate("/judgements");
            } else if (role === "COMPLIANCE_OFFICER") {
                navigate("/compliance/dashboard");
            } else if (role === "AUDITOR") {
                navigate("/compliance/audits");
            } else if (role === "CITIZEN") {
                // 👤 Only Citizens do the DB check
                try {
                    await getCitizenByUserId(currentUserId);
                    navigate("/citizenregister/my-profile");
                } catch (profileError) {
                    if (profileError.response && profileError.response.status === 404) {
                        navigate("/setup-citizen-profile");
                        return;
                    } else {
                        navigate("/citizenregister/my-profile");
                    }
                }
                
            } else if (role === "LAWYER") {
                // ⚖️ Only Lawyers do the DB check
                try {
                    await getLawyerByUserId(currentUserId);
                    navigate("/lawyerregister/my-profile");
                } catch (profileError) {
                    if (profileError.response && profileError.response.status === 404) {
                        navigate("/setup-lawyer-profile");
                        return;
                    } else {
                        navigate("/lawyerregister/my-profile");
                    }
                }
                
            } else {
                // Fallback for unknown roles
                navigate("/login");
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