import { useNavigate, useLocation } from "react-router-dom";

export default function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-primary fw-bold" : "text-light";

  return (
    <>
      {/* Official Header Strip */}
      <div
        className="py-1 px-4 text-white d-none d-md-block"
        style={{ backgroundColor: "#000", fontSize: "12px", opacity: 0.85 }}
      >
        <small>GOVERNMENT OF INDIA • SUPREME COURT DIGITAL INITIATIVE</small>
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark px-4 shadow-sm sticky-top"
        style={{ backgroundColor: "#0e273eff" }}
      >
        <div className="container-fluid">
          {/* Brand (clickable home) */}
          <span
            className="navbar-brand fw-bold d-flex align-items-center"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <i className="bi bi-bank2 me-2 text-primary"></i>
            <span style={{ letterSpacing: "1px", fontSize: "1.5rem" }}>
              JusticeGov
            </span>
          </span>

          {/* Nav links */}
          <div className="ms-auto d-flex align-items-center gap-3">
            {/* ✅ HOME LINK */}
            <button
              className={`btn btn-link text-decoration-none ${isActive("/")}`}
              onClick={() => navigate("/")}
            >
              Home
            </button>

            <button
              className={`btn btn-link text-decoration-none ${isActive("/about")}`}
              onClick={() => navigate("/about")}
            >
              About
            </button>

            <button
              className={`btn btn-link text-decoration-none ${isActive("/contact")}`}
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>

            <button
              className="btn btn-link text-light text-decoration-none d-none d-sm-inline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn px-4 fw-bold shadow-sm text-white"
              style={{ backgroundColor: "#1890ff", border: "none" }}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}