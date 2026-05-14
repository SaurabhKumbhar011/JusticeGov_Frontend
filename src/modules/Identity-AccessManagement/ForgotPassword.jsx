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
            <Link to="/" className="text-decoration-none">
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
            </Link>
            <h2 className="fw-bold text-white mb-1">Recover Access</h2>
            <p className="text-secondary small text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>
              Identity & Access Portal
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger d-flex align-items-center small py-2 mb-4">
              <i className="bi bi-exclamation-octagon-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success d-flex align-items-center small py-2 mb-4">
              <i className="bi bi-check-circle-fill me-2"></i>
              <div>{successMessage}</div>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <p className="small text-secondary text-center mb-4">
                Enter your government email address and we'll send you instructions to reset your password.
              </p>
              
              <div className="mb-4 text-start">
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
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center py-3">
              <div className="text-success fw-bold mb-3">
                <i className="bi bi-send-check-fill me-2"></i>
                Reset link sent!
              </div>
              <p className="small text-secondary mb-4">Check your inbox for further instructions.</p>
              <Link to="/reset-password" 
                className="btn btn-outline-info w-100 fw-bold py-2 small"
                style={{ borderColor: colors.accent, color: colors.accent }}
              >
                Go to Reset Page
              </Link>
            </div>
          )}

          {/* Footer Links */}
          <div className="text-center mt-4">
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

export default ForgotPassword;