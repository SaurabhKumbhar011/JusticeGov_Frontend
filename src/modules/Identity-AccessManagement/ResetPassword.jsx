import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
 
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    if (searchParams.get('email')) {
      setEmail(searchParams.get('email'));
    }
    if (searchParams.get('token')) {
      setToken(searchParams.get('token'));
    }
  }, [searchParams]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
 
    if (!email || !token || !password || !confirmPassword) {
      setError('Please provide email, token, and matching passwords.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
 
    try {
      await resetPassword({ email, token, password });
      setSuccess('Password has been reset successfully. You may now log in.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password. Please check your token and try again.');
    }
  };
 
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center py-4 px-3 text-white" style={{ background: '#0d6efd' }}>
          <h2 className="fw-bold mb-0">Reset Password</h2>
          <p className="small opacity-75 mb-0">Enter your token and new password below.</p>
        </div>
 
        <div className="card-body p-4 bg-white">
          {error && <div className="alert alert-danger py-2 small fw-bold text-center border-0 mb-3">{error}</div>}
          {success && <div className="alert alert-success py-2 small fw-bold text-center border-0 mb-3">{success}</div>}
 
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold small">Email Address</label>
              <input
                type="email"
                className="form-control bg-light border-0 py-2 shadow-none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
 
            <div className="mb-3">
              <label className="form-label text-dark fw-bold small">Reset Token</label>
              <input
                type="text"
                className="form-control bg-light border-0 py-2 shadow-none"
                placeholder="Enter reset token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
 
            <div className="mb-3">
              <label className="form-label text-dark fw-bold small">New Password</label>
              <input
                type="password"
                className="form-control bg-light border-0 py-2 shadow-none"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
 
            <div className="mb-4">
              <label className="form-label text-dark fw-bold small">Confirm Password</label>
              <input
                type="password"
                className="form-control bg-light border-0 py-2 shadow-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
 
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
              Reset Password
            </button>
          </form>
        </div>
 
        <div className="card-footer py-3 text-center bg-light border-0">
          <p className="small mb-1">Have not requested a token?</p>
          <Link to="/forgot-password" className="fw-bold text-decoration-none" style={{ color: '#0d6efd' }}>
            Request a reset link
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default ResetPassword;