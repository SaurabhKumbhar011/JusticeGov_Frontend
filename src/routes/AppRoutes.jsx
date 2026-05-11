import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import { getUserRole } from "../utils/token";

import Judgements from "../modules/judgment-order/pages/Judgements";
import CourtOrders from "../modules/judgment-order/pages/CourtOrders";

import RegistrationDashboard    from "../modules/Citizen-Lawyer-Registration/pages/RegistrationDashboard";
import CitizenRegistrationPage  from "../modules/Citizen-Lawyer-Registration/pages/CitizenRegistrationPage";
import LawyerRegistrationPage   from "../modules/Citizen-Lawyer-Registration/pages/LawyerRegistrationPage";
import DocumentUploadPage       from "../modules/Citizen-Lawyer-Registration/pages/DocumentUploadPage";
import CitizenPanelPage         from "../modules/Citizen-Lawyer-Registration/pages/CitizenPanelPage";
import LawyerPanelPage          from "../modules/Citizen-Lawyer-Registration/pages/LawyerPanelPage";
import MyProfilePage            from "../modules/Citizen-Lawyer-Registration/pages/MyProfilePage";
import MyDocumentsPage          from "../modules/Citizen-Lawyer-Registration/pages/MyDocumentsPage";

// Redirect to the correct landing page based on role
function RoleRedirect() {
  const role = getUserRole();
  if (role === "CITIZEN" || role === "LAWYER") return <Navigate to="/register/my-profile" replace />;
  return <Navigate to="/register/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Judge module */}
      <Route element={<DashboardLayout />}>
        <Route path="/judgements"   element={<Judgements />} />
        <Route path="/court-orders" element={<CourtOrders />} />
      </Route>

      {/* Registration module — role-aware layout */}
      <Route path="/register" element={<RegistrationLayout />}>
        <Route index element={<RoleRedirect />} />

        {/* CITIZEN & LAWYER — own profile only */}
        <Route path="my-profile"   element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />

        {/* ADMIN / REGISTRAR — full access */}
        <Route path="dashboard"    element={<RegistrationDashboard />} />
        <Route path="citizens"     element={<CitizenPanelPage />} />
        <Route path="lawyers"      element={<LawyerPanelPage />} />
        <Route path="citizen"      element={<CitizenRegistrationPage />} />
        <Route path="lawyer"       element={<LawyerRegistrationPage />} />
        <Route path="document"     element={<DocumentUploadPage />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<RoleRedirect />} />
    </Routes>
  );
}
