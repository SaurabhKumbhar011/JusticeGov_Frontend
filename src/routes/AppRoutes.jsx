import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../modules/Home/Home";
import About from "../modules/Home/About";
import Contact from "../modules/Home/Contact";

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
import JudgeDashboard from "../modules/judgment-order/pages/JudgeDashboard";

import ResearchDashboard from "../modules/Hearing_and_Research/pages/ResearchDashboard";

/* ✅ Role-based redirect AFTER authentication */
function RoleRedirect() {
  const role = localStorage.getItem("role");

  if (role === "JUDGE") {
    return <Navigate to="/judgeorder/dashboard" replace />;
  }

  if (role === "CITIZEN" || role === "LAWYER") {
    return <Navigate to="/citizenregister/dashboard" replace />;
  }


  if (role === "RESEARCHER") {
    return <Navigate to="/research" replace />; // ✅ FIX
  }

  return <Navigate to="/login" replace />;
}

export default function AppRoutes({ ProtectedRoute, isAuthenticated }) {
  return (
    <Routes>
      {/* ✅ PUBLIC AREA */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ✅ AUTH */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      {/* ✅ DASHBOARD ENTRY */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRedirect />
          </ProtectedRoute>
        }
      />

      {/* ✅ JUDGE MODULE */}
      <Route path="/judgeorder" element={<DashboardLayout />}>

        <Route index element={<JudgeDashboard />} />
        <Route path="dashboard" element={<JudgeDashboard />} />

        <Route path="judgements" element={<Judgements />} />
        <Route path="court-orders" element={<CourtOrders />} />
      </Route>

      {/* ✅ RESEARCHER MODULE */}
      <Route path="/research" element={<DashboardLayout />}>
        <Route index element={<ResearchDashboard />} />
      </Route>

      {/* ✅ REGISTRATION MODULE */}
      <Route path="/citizenregister" element={<RegistrationLayout />}>
        <Route index element={<RoleRedirect />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />
        <Route path="dashboard" element={<RegistrationDashboard />} />
        <Route path="citizens" element={<CitizenPanelPage />} />
        <Route path="lawyers" element={<LawyerPanelPage />} />
        <Route path="citizen" element={<CitizenRegistrationPage />} />
        <Route path="lawyer" element={<LawyerRegistrationPage />} />
        <Route path="document" element={<DocumentUploadPage />} />
      </Route>
    </Routes>
  );
}