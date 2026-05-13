import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(creds);
      loginUser(data);

      if (data.role === "ADMIN") {
        navigate("/citizenregister/dashboard");
      } else if (data.role === "JUDGE") {
        navigate("/judgeorder/judgements");
      } else if (data.role === "RESEARCHER") {
        navigate("/research"); // ✅ FIX
      } else if (data.role === "CITIZEN" || data.role === "LAWYER") {
        navigate("/citizenregister/my-profile");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Authentication failed. Please check credentials."
      );
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
            <h2 className="fw-bold text-white mb-1">JusticeGov</h2>
            <p className="text-secondary small text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>
              Identity & Access Portal
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger d-flex align-items-center small py-2 mb-4" role="alert">
              <i className="bi bi-exclamation-octagon-fill me-2"></i>
              <div>{error}</div>
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
                  name="email" // ⬅️ Added this
                  autocomplete="username"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="name@gov.in"
                  onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="form-label text-light small fw-semibold">Secure Password</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-0 text-secondary">
                  <i className="bi bi-key"></i>
                </span>
                <input
                  type="password"
                  name="password" // ⬅️ Added this
                  autocomplete="current-password"
                  className="form-control bg-dark text-white border-0 py-2 shadow-none custom-input"
                  placeholder="••••••••"
                  onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="text-end mb-4">
              <Link to="/forgot-password" className="text-decoration-none small fw-semibold" style={{ color: colors.accent }}>
                Forgot Password?
              </Link>
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
              Authorize Login
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-4">
            <p className="small text-secondary mb-3">
              Need an official account?{" "}
              <Link to="/register" className="fw-bold text-decoration-none" style={{ color: colors.accent }}>
                Register here
              </Link>
            </p>
            <hr className="bg-secondary opacity-25" />
            <Link to="/" className="text-secondary text-decoration-none small d-flex align-items-center justify-content-center">
              <i className="bi bi-arrow-left me-2"></i> Back to Homepage
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

export default Login;