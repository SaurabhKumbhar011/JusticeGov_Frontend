import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";
import roleMenus from "../configs/roleMenus"; // ✅ USE THIS
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // ✅ get role
  const menuItems = roleMenus[role] || [];   // ✅ pick correct menu

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="layout-wrapper">
      <Sidebar
        menuItems={menuItems}   // ✅ dynamic now
        onLogout={handleLogout}
      />

      <div className="layout-main">
        <Topbar />
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
