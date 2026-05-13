// import { NavLink, useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // 1. Clear the storage
//     localStorage.removeItem("token"); 

//     // 2. Since you don't have /login, just reload the app 
//     // or navigate to the landing/dashboard.
//     // window.location.reload() is the safest way to reset the app state.
//     window.location.reload(); 
//   };

//   const linkClass = ({ isActive }) => 
//     `nav-link p-3 rounded-3 mb-1 ${isActive ? "bg-primary text-white" : "text-light-emphasis"}`;

//   return (
//     <aside 
//       className="d-flex flex-column flex-shrink-0 p-3 text-white vh-100 sticky-top" 
//       style={{ 
//         width: "260px", 
//         background: "linear-gradient(180deg, #061a2e, #02101f)",
//       }}
//     >
//       <div className="d-flex flex-column mb-4 ps-2">
//         <span className="fs-4 fw-bold">⚖️ JusticeGov</span>
//         <small className="opacity-75" style={{ fontSize: "0.75rem" }}>Judiciary System</small>
//       </div>

//       <nav className="nav nav-pills flex-column mb-auto">
//         <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
//         <NavLink to="/judgements" className={linkClass}>Judgements</NavLink>
//         <NavLink to="/court-orders" className={linkClass}>Court Orders</NavLink>
//       </nav>

//       {/* Logout Button: White text, White border */}
//       <div className="mt-auto pt-4 px-2">
//         <button 
//           onClick={handleLogout}
//           className="btn btn-outline-light w-100 py-2 d-flex align-items-center justify-content-center gap-2 border-1 fw-semibold shadow-none"
//           style={{ borderRadius: "8px", fontSize: "0.9rem" }}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//             <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
//             <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
//           </svg>
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ menuItems = [], onLogout }) {
  
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `nav-link p-3 rounded-3 mb-1 ${
      isActive ? "bg-primary text-white" : "text-light-emphasis"
    }`;

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-white vh-100 sticky-top"
      style={{
        width: "260px",
        background: "linear-gradient(180deg, #061a2e, #02101f)",
      }}
    >
      {/* Header */}
      <div className="d-flex flex-column mb-4 ps-2">
        <span className="fs-4 fw-bold">⚖️ JusticeGov</span>
        <small className="opacity-75" style={{ fontSize: "0.75rem" }}>
          Judiciary System
        </small>
      </div>

      {/* Dynamic Navigation */}
      <nav className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={linkClass}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 px-2">
        <button
          onClick={onLogout}
          className="btn btn-outline-light w-100 py-2 fw-semibold"
          style={{ borderRadius: "8px" }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}