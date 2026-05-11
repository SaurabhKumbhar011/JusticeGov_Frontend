import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar({ menuItems, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="d-flex flex-column bg-dark text-white p-3 overflow-auto"
      style={{
        width: collapsed ? "80px" : "250px",
        transition: "width 0.3s ease",
        minHeight: "100vh",
      }}
    >
      {/* Header / Logo */}
      <div className="mb-4 d-flex align-items-center justify-content-between">
        {!collapsed && <h5 className="fw-bold mb-0">JusticeGov</h5>}
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-grow-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded mb-2 ${
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-white-50 hover:text-white"
            }`}
            style={{ textDecoration: "none" }}
          >
            <i className={`bi ${item.icon}`}></i>
            {!collapsed && <span className="ms-2">{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        className="btn btn-danger w-100 mt-auto"
        onClick={onLogout}
      >
        {collapsed ? <i className="bi bi-box-arrow-right"></i> : "Logout"}
      </button>
    </nav>
  );
}