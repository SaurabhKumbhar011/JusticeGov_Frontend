import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import { getUserRole } from "../utils/token";
import Home from "../modules/Home/Home";

import Judgements from "../modules/judgment-order/pages/Judgements";
import CourtOrders from "../modules/judgment-order/pages/CourtOrders";

import RegistrationDashboard from "../modules/Citizen-Lawyer-Registration/pages/RegistrationDashboard";
import CitizenRegistrationPage from "../modules/Citizen-Lawyer-Registration/pages/CitizenRegistrationPage";
import LawyerRegistrationPage from "../modules/Citizen-Lawyer-Registration/pages/LawyerRegistrationPage";
import DocumentUploadPage from "../modules/Citizen-Lawyer-Registration/pages/DocumentUploadPage";
import CitizenPanelPage from "../modules/Citizen-Lawyer-Registration/pages/CitizenPanelPage";
import LawyerPanelPage from "../modules/Citizen-Lawyer-Registration/pages/LawyerPanelPage";
import MyProfilePage from "../modules/Citizen-Lawyer-Registration/pages/MyProfilePage";
import MyDocumentsPage from "../modules/Citizen-Lawyer-Registration/pages/MyDocumentsPage";
import Login from "../modules/Identity-AccessManagement/Login";
import Register from "../modules/Identity-AccessManagement/Register";

// Redirect to the correct landing page based on role
function RoleRedirect() {
  const role = getUserRole();
  if (role === "CITIZEN" || role === "LAWYER") return <Navigate to="/register/my-profile" replace />;
  return <Navigate to="/register/dashboard" replace />;
}

export default function AppRoutes({ ProtectedRoute, isAuthenticated, user }) {
  return (
    <Routes>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={
        <ProtectedRoute>
          {user?.role === 'ADMIN' ? <AdminPanel /> : <AppRoutes />}
        </ProtectedRoute>
      } /> */}
      {/* <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <RoleRedirect />
    </ProtectedRoute>
  }
/> */}


      {/* Default redirect */}
      {/* <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} /> */}
      {/* Judge module */}
      <Route path="/judgeorder" element={<DashboardLayout />}>
        <Route path="judgements" element={<Judgements />} />
        <Route path="court-orders" element={<CourtOrders />} />
      </Route>



      Registration module — role-aware layout
      <Route path="/citizenregister" element={<RegistrationLayout />}>
        <Route index element={<RoleRedirect />} />

        {/* CITIZEN & LAWYER — own profile only */}
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />

        {/* ADMIN / REGISTRAR — full access */}
        <Route path="dashboard" element={<RegistrationDashboard />} />
        <Route path="citizens" element={<CitizenPanelPage />} />
        <Route path="lawyers" element={<LawyerPanelPage />} />
        <Route path="citizen" element={<CitizenRegistrationPage />} />
        <Route path="lawyer" element={<LawyerRegistrationPage />} />
        <Route path="document" element={<DocumentUploadPage />} />
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          isAuthenticated ? <RoleRedirect /> : <Home />
        }
      />

    </Routes>
  );
}
