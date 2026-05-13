export default function Topbar() {
  let email = "Unknown User";
  let role = "User";
  let initials = "U";

  try {
    email=localStorage.getItem('email');
    role=localStorage.getItem('role');
    initials = email.charAt(0).toUpperCase();
    
  } catch {}

  return (
    <header className="topbar-container">

      <div className="topbar-inner">

        {/* ✅ LEFT SIDE (TITLE / CONTEXT) */}
        <div className="topbar-left">
          <h5 className="topbar-page-title">
            Dashboard
          </h5>
        </div>

        {/* ✅ RIGHT SIDE (USER) */}
        <div className="dropdown">

          <div
            className="topbar-user"
            role="button"
            id="profileMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >

            {/* ✅ Avatar */}
            <div className="avatar-circle">
              {initials}
            </div>

            {/* ✅ User Info */}
            <div className="user-info d-none d-md-flex flex-column">
              <span className="user-email" title={email}>
                {email}
              </span>
              <span className="user-role">
                {role}
              </span>
            </div>

            {/* ✅ Dropdown Icon */}
            <i className="bi bi-chevron-down"></i>

          </div>

          {/* ✅ DROPDOWN MENU */}
          <ul className="dropdown-menu dropdown-menu-end topbar-dropdown">

            <li className="d-flex align-items-center gap-3">

              <div className="avatar-circle large">
                {initials}
              </div>

              <div>
                <div className="fw-bold">{email}</div>
                <div className="text-muted small">{role}</div>
              </div>

            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </header>
  );
}