import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";
import { judgeMenu } from "../configs/courtclerkMenu";

export default function DashboardLayout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="layout-wrapper">

      {/* ✅ Sidebar */}
      <Sidebar
        menuItems={judgeMenu}
        onLogout={handleLogout}
      />

      {/* ✅ Right Side (Topbar + Content) */}
      <div className="layout-main">

        {/* ✅ Topbar (REAL HEADER) */}
        <Topbar />

        {/* ✅ Main Content */}
        <div className="layout-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}