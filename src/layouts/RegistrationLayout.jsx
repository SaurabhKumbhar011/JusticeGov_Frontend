import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getUserRole, getUserEmail } from "../utils/token";
import { citizenMenu, lawyerMenu, registrarMenu } from "../configs/roleMenus";

function getMenuByRole(role) {
  if (role === "CITIZEN") return citizenMenu;
  if (role === "LAWYER")  return lawyerMenu;
  return registrarMenu; // ADMIN, REGISTRAR, or any other role
}

function getRoleLabel(role) {
  if (role === "CITIZEN") return "Citizen Portal";
  if (role === "LAWYER")  return "Lawyer Portal";
  return "Registration & Profile Management";
}

export default function RegistrationLayout() {
  const navigate  = useNavigate();
  const role      = getUserRole();
  const email     = getUserEmail();
  const initials  = email.charAt(0).toUpperCase();
  const menuItems = getMenuByRole(role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (role === "CITIZEN") navigate("/citizenregister");
    else if (role === "LAWYER") navigate("/lawyerregister");
    else navigate("/register");
  };

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded-3 mb-1 fw-semibold ${
      isActive ? "bg-white text-dark" : "text-white-50"
    }`;

  return (
    <div className="d-flex vh-100 overflow-hidden" style={{ background: "#f0f4f8" }}>

      {/* Sidebar */}
      <aside
        className="d-flex flex-column flex-shrink-0 p-3 vh-100 sticky-top"
        style={{ width: "260px", background: "linear-gradient(180deg, #0a3d62, #1e5f8e)" }}
      >
        {/* Brand */}
        <div className="d-flex flex-column mb-4 ps-2 pt-2">
          <span className="fs-5 fw-bold text-white">👥 JusticeGov</span>
          <small className="text-white-50" style={{ fontSize: "0.72rem" }}>
            {getRoleLabel(role)}
          </small>
        </div>

        {/* Role badge */}
        <div className="mb-3 ps-1">
          <span className={`badge px-3 py-2 rounded-pill fw-semibold ${
            role === "CITIZEN" ? "bg-info text-dark" :
            role === "LAWYER"  ? "bg-primary"        : "bg-warning text-dark"
          }`}>
            {role}
          </span>
        </div>

        {/* Nav — role-filtered */}
        <nav className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-3 px-1">
          <button
            onClick={handleLogout}
            className="btn btn-light btn-sm fw-semibold w-100 text-danger"
            style={{ borderRadius: "8px" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">

        {/* Topbar */}
        <header
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white"
          style={{ minHeight: "64px" }}
        >
          <div>
            <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>
              Citizen & Lawyer Registration Portal
            </span>
            <span className="ms-3 badge bg-warning text-dark small">Module 4.2</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
              style={{ width: "36px", height: "36px", background: "#0a3d62", fontSize: "14px" }}
            >
              {initials}
            </div>
            <div className="d-flex flex-column align-items-end">
              <span className="fw-semibold text-dark small">{email}</span>
              <span className="text-muted" style={{ fontSize: "0.72rem" }}>{role}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
