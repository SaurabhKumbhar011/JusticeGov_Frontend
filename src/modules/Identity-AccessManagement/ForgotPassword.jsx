import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    forgotPassword(email)
      .then(() => {
        setSubmitted(true);
        setSuccessMessage('If the email exists, reset instructions have been sent.');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to send reset instructions. Please try again.');
      });
  };
 
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center py-4 px-3 text-white" style={{ background: '#0d6efd' }}>
          <h2 className="fw-bold mb-0">Reset Password</h2>
          <p className="small opacity-75 mb-0">Recover your access</p>
        </div>
 
        <div className="card-body p-4 bg-white text-center">
          {error && <div className="alert alert-danger py-2 small fw-bold text-center border-0 mb-3">{error}</div>}
          {successMessage && <div className="alert alert-success py-2 small fw-bold text-center border-0 mb-3">{successMessage}</div>}
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <p className="small text-muted mb-4">Enter your email address and we'll send you instructions to reset your password.</p>
              <div className="mb-4 text-start">
                <label className="form-label text-dark fw-bold small">Email Address</label>
                <input
                  type="email"
                  className="form-control bg-light border-0 py-2 shadow-none"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="py-3">
              <div className="text-success mb-3">✔ Reset link sent!</div>
              <p className="small text-muted">Check your inbox for further instructions.</p>
              <p className="small text-muted">If you already have a reset token, use the <Link to="/reset-password">Reset Password</Link> page.</p>
            </div>
          )}
        </div>
 
        <div className="card-footer py-3 text-center bg-light border-0">
          <Link to="/login" className="fw-bold text-decoration-none small" style={{ color: '#0d6efd' }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};
 
export default ForgotPassword;