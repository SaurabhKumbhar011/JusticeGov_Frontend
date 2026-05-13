// import { Outlet } from "react-router-dom";
// import Sidebar from "../layouts/Sidebar"; // Adjust path as needed
// import Topbar from "../layouts/Topbar";   // Adjust path as needed

// export default function DashboardLayout() {
//   return (
//     /* 1. The Parent Wrapper: d-flex makes children (Sidebar & Main) sit side-by-side */
//     <div className="d-flex vh-100 overflow-hidden bg-light">
      
//       {/* 2. Sidebar: Fixed width defined in the component */}
//       <Sidebar />

//       {/* 3. Main Content Area: Stacks Topbar and Page content vertically */}
//       <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        
//         {/* Topbar: Pins to the top */}
//         <Topbar />

//         {/* 4. Scrollable Page Content: Outlet renders your Judgements/Court Orders */}
//         <main className="flex-grow-1 overflow-auto p-4">
//           <Outlet />
//         </main>
        
//       </div>
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";
import { judgeMenu } from "../configs/judgeMenu"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    /* Parent Wrapper */
    <div className="d-flex vh-100 overflow-hidden bg-light">
      
      {/* ✅ Sidebar now RECEIVES menuItems */}
      <Sidebar 
        menuItems={judgeMenu}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Page Content */}
        <main className="flex-grow-1 overflow-auto p-4">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}