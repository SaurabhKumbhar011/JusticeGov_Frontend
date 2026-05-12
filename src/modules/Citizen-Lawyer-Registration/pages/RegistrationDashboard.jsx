import { Link } from "react-router-dom";

const stats = [
  { label: "Total Citizens",   value: "—", color: "#0a3d62", icon: "🧑‍💼" },
  { label: "Total Lawyers",    value: "—", color: "#1e5f8e", icon: "⚖️"  },
  { label: "Pending Approvals",value: "—", color: "#e67e22", icon: "⏳"  },
  { label: "Documents Uploaded",value: "—",color: "#27ae60", icon: "📄"  },
];

const quickActions = [
  // Removed duplicate actions as they are available in the sidebar menu
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
