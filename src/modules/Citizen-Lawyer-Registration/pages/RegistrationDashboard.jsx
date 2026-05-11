import { Link } from "react-router-dom";

const stats = [
  { label: "Total Citizens",   value: "—", color: "#0a3d62", icon: "🧑‍💼" },
  { label: "Total Lawyers",    value: "—", color: "#1e5f8e", icon: "⚖️"  },
  { label: "Pending Approvals",value: "—", color: "#e67e22", icon: "⏳"  },
  { label: "Documents Uploaded",value: "—",color: "#27ae60", icon: "📄"  },
];

const quickActions = [
  { label: "Register a Citizen",  to: "/register/citizen",  desc: "Add a new citizen profile with identity details.",      icon: "🧑‍💼", color: "#0a3d62" },
  { label: "Register a Lawyer",   to: "/register/lawyer",   desc: "Add a new lawyer profile with Bar ID credentials.",     icon: "⚖️",  color: "#1e5f8e" },
  { label: "Upload Legal Document",to: "/register/document",desc: "Upload ID Proof or Bar Certificate for verification.", icon: "📄",  color: "#27ae60" },
];

export default function RegistrationDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Registration Dashboard</h4>
        <p className="text-muted small mb-0">
          Overview of citizen & lawyer registrations and document verification status.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-md-3 col-sm-6" key={s.label}>
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                <span
                  className="badge rounded-pill px-3 py-2 fw-semibold"
                  style={{ background: s.color, color: "#fff", fontSize: "1rem" }}
                >
                  {s.value}
                </span>
              </div>
              <p className="text-muted small fw-semibold mb-0">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-3">
        <h6 className="fw-bold text-secondary text-uppercase small mb-3">Quick Actions</h6>
        <div className="row g-3">
          {quickActions.map((a) => (
            <div className="col-md-4" key={a.to}>
              <Link to={a.to} className="text-decoration-none">
                <div
                  className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-shadow"
                  style={{ transition: "transform 0.15s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                    style={{ width: "48px", height: "48px", background: a.color + "1a", fontSize: "1.5rem" }}
                  >
                    {a.icon}
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{a.label}</h6>
                  <p className="text-muted small mb-0">{a.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
        <h6 className="fw-bold text-secondary text-uppercase small mb-3">Registration Status Flow</h6>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          {[
            { label: "PENDING",  bg: "warning",  text: "dark" },
            { label: "ACTIVE",   bg: "success",  text: "white" },
            { label: "APPROVED", bg: "primary",  text: "white" },
            { label: "REJECTED", bg: "danger",   text: "white" },
            { label: "BLOCKED",  bg: "secondary",text: "white" },
          ].map((s) => (
            <span key={s.label} className={`badge bg-${s.bg} text-${s.text} px-3 py-2 rounded-pill`}>
              {s.label}
            </span>
          ))}
          <span className="text-muted small ms-2">← All new registrations start as PENDING</span>
        </div>
      </div>
    </div>
  );
}
