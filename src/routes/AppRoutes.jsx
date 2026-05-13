import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import { getUserRole } from "../utils/token";

import Login from "../modules/Identity-AccessManagement/Login";
import Register from "../modules/Identity-AccessManagement/Register";

import Judgements from "../modules/judgment-order/pages/Judgements";
import CourtOrders from "../modules/judgment-order/pages/CourtOrders";

// ── NEW IMPORTS FOR PROFILE SETUP ──
import SetupCitizenProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupCitizenProfile";
import SetupLawyerProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupLawyerProfile";

import RegistrationDashboard    from "../modules/Citizen-Lawyer-Registration/pages/RegistrationDashboard";
import CitizenRegistrationPage  from "../modules/Citizen-Lawyer-Registration/pages/CitizenRegistrationPage";
import LawyerRegistrationPage   from "../modules/Citizen-Lawyer-Registration/pages/LawyerRegistrationPage";
import DocumentUploadPage       from "../modules/Citizen-Lawyer-Registration/pages/DocumentUploadPage";
import CitizenPanelPage         from "../modules/Citizen-Lawyer-Registration/pages/CitizenPanelPage";
import LawyerPanelPage          from "../modules/Citizen-Lawyer-Registration/pages/LawyerPanelPage";
import MyProfilePage            from "../modules/Citizen-Lawyer-Registration/pages/MyProfilePage";
import MyDocumentsPage          from "../modules/Citizen-Lawyer-Registration/pages/MyDocumentsPage";

import ComplianceLayout         from "../modules/Compliance-Audit-Management/layouts/ComplianceLayout";
import ComplianceDashboard      from "../modules/Compliance-Audit-Management/pages/ComplianceDashboard";
import ComplianceListPage       from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceListPage";
import ComplianceNewPage        from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceNewPage";
import AuditListPage            from "../modules/Compliance-Audit-Management/audit/pages/AuditListPage";
import AuditNewPage             from "../modules/Compliance-Audit-Management/audit/pages/AuditNewPage";

import CaseFilingPage           from "../modules/Case-Filling-and-Document-Management/case/pages/CaseFilingPage";

// Redirect to the correct landing page based on role
function RoleRedirect() {
  const role = getUserRole();

  if (role === "CITIZEN")            return <Navigate to="/citizenregister/my-profile" replace />;
  if (role === "LAWYER")             return <Navigate to="/lawyerregister/my-profile" replace />;
  if (role === "COMPLIANCE_OFFICER") return <Navigate to="/compliance/dashboard" replace />;
  if (role === "AUDITOR")            return <Navigate to="/compliance/audits" replace />;
  if (role === "JUDGE")              return <Navigate to="/judgements" replace />;
  if (role === "ADMIN" || role === "REGISTRAR") return <Navigate to="/register/citizens" replace />;

  return <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* ── PROFILE SETUP ROUTES (For new users after first login) ── */}
      {/* Placed outside of layouts so they render as full-page standalone forms */}
      <Route path="/setup-citizen-profile" element={<SetupCitizenProfile />} />
      <Route path="/setup-lawyer-profile" element={<SetupLawyerProfile />} />

      {/* Judge module */}
      <Route element={<DashboardLayout />}>
        <Route path="/judgements"   element={<Judgements />} />
        <Route path="/court-orders" element={<CourtOrders />} />
      </Route>

      {/* CITIZEN module — citizen-only layout */}
      <Route path="/citizenregister" element={<RegistrationLayout />}>
        <Route index element={<Navigate to="/citizenregister/my-profile" replace />} />
        <Route path="my-profile"   element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />
      </Route>

      {/* LAWYER module — lawyer-only layout */}
      <Route path="/lawyerregister" element={<RegistrationLayout />}>
        <Route index element={<Navigate to="/lawyerregister/my-profile" replace />} />
        <Route path="my-profile"   element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />
        <Route path="case-filing"  element={<CaseFilingPage />} />
      </Route>

      {/* ADMIN / REGISTRAR — full access */}
      <Route path="/register" element={<RegistrationLayout />}>
        <Route index element={<Navigate to="/register/citizens" replace />} />
        <Route path="citizens"     element={<CitizenPanelPage />} />
        <Route path="lawyers"      element={<LawyerPanelPage />} />
        <Route path="citizen"      element={<CitizenRegistrationPage />} />
        <Route path="lawyer"       element={<LawyerRegistrationPage />} />
        <Route path="document"     element={<DocumentUploadPage />} />
      </Route>

      {/* Compliance Officer & Auditor module */}
      <Route path="/compliance" element={<ComplianceLayout />}>
        <Route index element={<Navigate to="/compliance/dashboard" replace />} />
        <Route path="dashboard"    element={<ComplianceDashboard />} />
        <Route path="records"      element={<ComplianceListPage />} />
        <Route path="records/new"  element={<ComplianceNewPage />} />
        <Route path="audits"       element={<AuditListPage />} />
        <Route path="audits/new"   element={<AuditNewPage />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<RoleRedirect />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}