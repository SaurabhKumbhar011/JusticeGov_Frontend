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
    <header className="navbar navbar-expand bg-white border-bottom px-4 py-3 sticky-top">
      {/* Changed "justify-content-between" to "justify-content-end" */}
      <div className="container-fluid d-flex justify-content-end align-items-center">
        
        {/* Profile Dropdown */}
        <div className="dropdown">
          <div 
            className="d-flex align-items-center gap-3 border-0 bg-transparent p-0"
            role="button"
            id="profileMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer" }}
          >
            {/* Avatar Circle */}
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" 
              style={{ 
                width: "38px", 
                height: "38px", 
                backgroundColor: "#0f2a47",
                fontSize: "14px" 
              }}
            >
              {initials}
            </div>

            {/* Role Text */}
            <div className="d-flex flex-column align-items-end d-none d-md-flex">
              <span className="fw-bold text-dark text-uppercase mb-0" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                {role}
              </span>
            </div>
          </div>

          {/* Dropdown Menu (The Hover/Click Card) */}
          <ul 
            className="dropdown-menu dropdown-menu-end shadow border-0 p-3 mt-2 rounded-4" 
            aria-labelledby="profileMenu"
            style={{ minWidth: "240px" }}
          >
            <li className="d-flex align-items-center gap-3">
              {/* Larger Avatar inside dropdown */}
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white fs-5" 
                style={{ width: "48px", height: "48px", backgroundColor: "#0f2a47", flexShrink: 0 }}
              >
                {initials}
              </div>
              
              {/* User Info */}
              <div className="overflow-hidden">
                <div 
                  className="fw-bold text-dark text-truncate" 
                  style={{ fontSize: "0.95rem" }}
                  title={email}
                >
                  {email}
                </div>
                <div className="text-muted small text-capitalize">
                  {role}
                </div>
              </div>
            </li>
            
            {/* Optional: Add a divider and logout if needed later */}
            {/* <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item text-danger small rounded-2">Logout</button></li> */}
          </ul>
        </div>

      </div>
    </header>
  );
}