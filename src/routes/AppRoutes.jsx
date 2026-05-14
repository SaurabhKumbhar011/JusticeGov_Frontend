// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
// import RegistrationLayout from "../layouts/RegistrationLayout";
// import PublicLayout from "../layouts/PublicLayout";

// import Home from "../modules/Home/Home";
// import About from "../modules/Home/About";
// import Contact from "../modules/Home/Contact";

// import Judgements from "../modules/judgment-order/pages/Judgements";
// import CourtOrders from "../modules/judgment-order/pages/CourtOrders";
// import JudgeDashboard from "../modules/judgment-order/pages/JudgeDashboard";

// import RegistrationDashboard from "../modules/Citizen-Lawyer-Registration/pages/RegistrationDashboard";
// import CitizenRegistrationPage from "../modules/Citizen-Lawyer-Registration/pages/CitizenRegistrationPage";
// import LawyerRegistrationPage from "../modules/Citizen-Lawyer-Registration/pages/LawyerRegistrationPage";
// import DocumentUploadPage from "../modules/Citizen-Lawyer-Registration/pages/DocumentUploadPage";
// import CitizenPanelPage from "../modules/Citizen-Lawyer-Registration/pages/CitizenPanelPage";
// import LawyerPanelPage from "../modules/Citizen-Lawyer-Registration/pages/LawyerPanelPage";
// import MyProfilePage from "../modules/Citizen-Lawyer-Registration/pages/MyProfilePage";
// import MyDocumentsPage from "../modules/Citizen-Lawyer-Registration/pages/MyDocumentsPage";

// import Login from "../modules/Identity-AccessManagement/Login";
// import Register from "../modules/Identity-AccessManagement/Register";
// import ForgotPassword from "../modules/Identity-AccessManagement/ForgotPassword";
// import ResetPassword from "../modules/Identity-AccessManagement/ResetPassword";
// import AdminDashboard from "../modules/Identity-AccessManagement/AdminDashboard";


// import ComplianceLayout from "../modules/Compliance-Audit-Management/layouts/ComplianceLayout";
// import ComplianceDashboard from "../modules/Compliance-Audit-Management/pages/ComplianceDashboard";
// import ComplianceListPage from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceListPage";
// import ComplianceNewPage from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceNewPage";
// import AuditListPage from "../modules/Compliance-Audit-Management/audit/pages/AuditListPage";
// import AuditNewPage from "../modules/Compliance-Audit-Management/audit/pages/AuditNewPage";
// import CaseFilingPage from "../modules/Case-Filling-and-Document-Management/case/pages/CaseFilingPage";
// import SetupCitizenProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupCitizenProfile";
// import SetupLawyerProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupLawyerProfile";

// /* ✅ Role-based redirect AFTER authentication */
// function RoleRedirect() {
//   const role = localStorage.getItem("role");

//   if (role === "JUDGE") {
//     return <Navigate to="/judgeorder/dashboard" replace />;
//   }

//   // if (role === "CITIZEN") {
//   //   return <Navigate to="/citizenregister/dashboard" replace />;
//   // }

//   if (role === "LAWYER" || role === "CITIZEN") {
//     return <Navigate to="/citizenregister/dashboard" replace />;
//   }

//   return <Navigate to="/login" replace />;
// }

// export default function AppRoutes({ ProtectedRoute, isAuthenticated }) {
//   return (
//     <Routes>
//       {/* ✅ PUBLIC AREA */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Route>

//       {/* ✅ AUTH */}
//       <Route
//         path="/login"
//         element={
//           isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
//         }
//       />


//       <Route
//         path="/forgot-password"
//         element={<ForgotPassword />}
//       />

//       <Route
//         path="/reset-password"
//         element={<ResetPassword />}
//       />


//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <RoleRedirect />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="/admin-dashboard"
//         element={
//           <ProtectedRoute>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 🚀 ADDED: PROFILE SETUP ROUTES (Triggered by Login.jsx if profile is missing) */}
//       <Route
//         path="/setup-citizen"
//         element={
//           <ProtectedRoute>
//             <SetupCitizenProfile />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/setup-lawyer"
//         element={
//           <ProtectedRoute>
//             <SetupLawyerProfile />
//           </ProtectedRoute>
//         }
//       />


//       {/* ✅ JUDGE MODULE */}
//       <Route path="/judgeorder" element={<DashboardLayout />}>

//         <Route index element={<JudgeDashboard />} />
//         <Route path="dashboard" element={<JudgeDashboard />} />

//         <Route path="judgements" element={<Judgements />} />
//         <Route path="court-orders" element={<CourtOrders />} />
//       </Route>

//       {/* ✅ REGISTRATION MODULE */}
//       <Route path="/citizenregister" element={<RegistrationLayout />}>
//         <Route index element={<RoleRedirect />} />
//         <Route path="my-profile" element={<MyProfilePage />} />
//         <Route path="my-documents" element={<MyDocumentsPage />} />
//         <Route path="dashboard" element={<RegistrationDashboard />} />
//         <Route path="citizens" element={<CitizenPanelPage />} />
//         <Route path="lawyers" element={<LawyerPanelPage />} />
//         <Route path="citizen" element={<CitizenRegistrationPage />} />
//         <Route path="lawyer" element={<LawyerRegistrationPage />} />
//         <Route path="document" element={<DocumentUploadPage />} />
//       </Route>

//       <Route path="/lawyerregister" element={<RegistrationLayout />}>
//         <Route index element={<Navigate to="/lawyerregister/my-profile" replace />} />
//         <Route path="my-profile" element={<MyProfilePage />} />
//         <Route path="my-documents" element={<MyDocumentsPage />} />
//         <Route path="case-filing" element={<CaseFilingPage />} />
//       </Route>

//       <Route path="/compliance" element={<ComplianceLayout />}>
//         <Route index element={<Navigate to="/compliance/dashboard" replace />} />
//         <Route path="dashboard" element={<ComplianceDashboard />} />
//         <Route path="records" element={<ComplianceListPage />} />
//         <Route path="records/new" element={<ComplianceNewPage />} />
//         <Route path="audits" element={<AuditListPage />} />
//         <Route path="audits/new" element={<AuditNewPage />} />
//       </Route>

//     </Routes>
//   );
// }

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
 
// 🚀 ADDED: Imports for the Profile Setup Pages
import SetupCitizenProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupCitizenProfile";
import SetupLawyerProfile from "../modules/Citizen-Lawyer-Registration/pages/SetupLawyerProfile";
 
import Login from "../modules/Identity-AccessManagement/Login";
import Register from "../modules/Identity-AccessManagement/Register";
//import ForgotPassword from "../modules/Identity-AccessManagement/ForgotPassword";
//import ResetPassword from "../modules/Identity-AccessManagement/ResetPassword";
import JudgeDashboard from "../modules/judgment-order/pages/JudgeDashboard";
import CaseFilingPage from "../modules/Case-Filling-and-Document-Management/case/pages/CaseFilingPage";
 
import ComplianceLayout         from "../modules/Compliance-Audit-Management/layouts/ComplianceLayout";
import ComplianceDashboard      from "../modules/Compliance-Audit-Management/pages/ComplianceDashboard";
import ComplianceListPage       from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceListPage";
import ComplianceNewPage        from "../modules/Compliance-Audit-Management/compliance/pages/ComplianceNewPage";
import AuditListPage            from "../modules/Compliance-Audit-Management/audit/pages/AuditListPage";
import AuditNewPage             from "../modules/Compliance-Audit-Management/audit/pages/AuditNewPage";
 
/* ✅ Role-based redirect AFTER authentication */
function RoleRedirect() {
  const role = localStorage.getItem("role");
 
  if (role === "JUDGE") {
    return <Navigate to="/judgeorder/dashboard" replace />;
  }
 
  if (role === "CITIZEN" || role === "LAWYER") {
    return <Navigate to="/citizenregister/dashboard" replace />;
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
 
      {/* 🚀 ADDED: PROFILE SETUP ROUTES (Triggered by Login.jsx if profile is missing) */}
      <Route
        path="/setup-citizen"
        element={
          <ProtectedRoute>
            <SetupCitizenProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup-lawyer"
        element={
          <ProtectedRoute>
            <SetupLawyerProfile />
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
 
      {/* ✅ LAWYER MODULE */}
      <Route path="/lawyerregister" element={<RegistrationLayout />}>
        <Route index element={<Navigate to="/lawyerregister/my-profile" replace />} />
        <Route path="my-profile"   element={<MyProfilePage />} />
        <Route path="my-documents" element={<MyDocumentsPage />} />
        <Route path="case-filing"  element={<CaseFilingPage />} />
      </Route>
 
      {/* ✅ COMPLIANCE MODULE */}
      <Route path="/compliance" element={<ComplianceLayout />}>
        <Route index element={<Navigate to="/compliance/dashboard" replace />} />
        <Route path="dashboard"    element={<ComplianceDashboard />} />
        <Route path="records"      element={<ComplianceListPage />} />
        <Route path="records/new"  element={<ComplianceNewPage />} />
        <Route path="audits"       element={<AuditListPage />} />
        <Route path="audits/new"   element={<AuditNewPage />} />
      </Route>
 
    </Routes>
  );
}
 