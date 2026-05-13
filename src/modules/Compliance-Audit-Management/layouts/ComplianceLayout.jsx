import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { getUserEmail, getUserRole } from '../../../utils/token';

const complianceMenu = [
  { label: '📊 Dashboard',           path: '/compliance/dashboard' },
  { label: '📋 Compliance Records',  path: '/compliance/records' },
  { label: '➕ Add Record',           path: '/compliance/records/new' },
];

const auditorMenu = [
  { label: '🔍 Audits',              path: '/compliance/audits' },
  { label: '➕ New Audit',            path: '/compliance/audits/new' },
];

export default function ComplianceLayout() {
  const navigate = useNavigate();
  const email    = getUserEmail();
  const role     = getUserRole();
  const initials = email.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded-3 mb-1 fw-semibold ${isActive ? 'bg-white text-dark' : 'text-white-50'}`;

  const menuItems = role === 'AUDITOR'
    ? auditorMenu
    : role === 'COMPLIANCE_OFFICER'
      ? complianceMenu
      : [...complianceMenu, ...auditorMenu];

  return (
    <div className="d-flex vh-100 overflow-hidden" style={{ background: '#f0f4f8' }}>

      {/* Sidebar */}
      <aside className="d-flex flex-column flex-shrink-0 p-3 vh-100 sticky-top"
        style={{ width: '260px', background: 'linear-gradient(180deg, #1a1a2e, #16213e)' }}>

        {/* Brand */}
        <div className="d-flex flex-column mb-3 ps-2 pt-2">
          <span className="fs-5 fw-bold text-white">⚖️ JusticeGov</span>
          <small className="text-white-50" style={{ fontSize: '0.72rem' }}>
            Compliance & Audit Management
          </small>
        </div>

        {/* Role badge */}
        <div className="mb-3 ps-1">
          <span className="badge bg-danger px-3 py-2 rounded-pill fw-semibold">
            {role}
          </span>
        </div>

        {/* Nav */}
        <nav className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} end className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-3 px-1">
          <button onClick={handleLogout}
            className="btn btn-light btn-sm fw-semibold w-100 text-danger"
            style={{ borderRadius: '8px' }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">

        {/* Topbar */}
        <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white"
          style={{ minHeight: '64px' }}>
          <div>
            <span className="fw-bold text-dark">
              {role === 'AUDITOR' ? 'Audit Management Portal' : 'Compliance Management Portal'}
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                style={{ width: '36px', height: '36px', background: '#1a1a2e', fontSize: '14px' }}>
                {initials}
              </div>
              <div className="d-flex flex-column align-items-end">
                <span className="fw-semibold text-dark small">{email}</span>
                <span className="text-muted" style={{ fontSize: '0.72rem' }}>{role}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-danger fw-semibold"
              style={{ borderRadius: '6px' }}
              title="Sign out"
            >
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
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
