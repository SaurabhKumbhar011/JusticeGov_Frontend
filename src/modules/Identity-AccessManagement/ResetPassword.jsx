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
      setSuccess('Password has been reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password. Please check your token and try again.');
    }
  };

  const colors = {
    bgMain: "#0f172a",
    cardBg: "#1e293b",
    accent: "#38bdf8",
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundColor: colors.bgMain,
        backgroundImage: "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{
          backgroundColor: colors.cardBg,
          maxWidth: "420px",
          width: "100%",
        }}
      >
        {/* Top Accent Bar */}
        <div style={{ height: "4px", backgroundColor: colors.accent }}></div>

        <div className="card-body p-4 p-md-5">
          {/* Header/Branding */}
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                borderRadius: "15px",
              }}
            >
              <i className="bi bi-shield-lock-fill fs-2" style={{ color: colors.accent }}></i>
            </div>
            <h2 className="fw-bold text-white mb-1">Reset Password</h2>
            <p className="text-secondary small text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>
              Secure Credential Update
            </p>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger d-flex align-items-center small py-2 mb-4">
              <i className="bi bi-exclamation-octagon-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success d-flex align-items-center small py-2 mb-4">
              <i className="bi bi-check-circle-fill me-2"></i>
              <div>{success}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label text-light small fw-semibold">Government Email</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-0 text-secondary">
                  <i className="bi bi-envelope-at"></i>
                </span>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="name@gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Token Input */}
            <div className="mb-3">
              <label className="form-label text-light small fw-semibold">Reset Token</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-0 text-secondary">
                  <i className="bi bi-patch-check"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="Paste token from email"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label className="form-label text-light small fw-semibold">New Secure Password</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-0 text-secondary">
                  <i className="bi bi-key-fill"></i>
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label text-light small fw-semibold">Confirm New Password</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-0 text-secondary">
                  <i className="bi bi-shield-check"></i>
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold py-3 shadow text-uppercase"
              style={{
                backgroundColor: colors.accent,
                border: "none",
                color: "#000",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
              }}
            >
              Update Credentials
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-4">
            <p className="small text-secondary mb-3">
              Token expired?{" "}
              <Link to="/forgot-password" title="Request new token" className="fw-bold text-decoration-none" style={{ color: colors.accent }}>
                Request New
              </Link>
            </p>
            <hr className="bg-secondary opacity-25" />
            <Link to="/login" className="text-secondary text-decoration-none small d-flex align-items-center justify-content-center">
              <i className="bi bi-arrow-left me-2"></i> Back to Login
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .custom-input:focus {
            background-color: #000 !important;
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25) !important;
            color: #fff !important;
        }
        .input-group-text {
            border-top-left-radius: 10px !important;
            border-bottom-left-radius: 10px !important;
        }
        .custom-input {
            border-top-right-radius: 10px !important;
            border-bottom-right-radius: 10px !important;
        }
        .btn:hover {
            background-color: #7dd3fc !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;