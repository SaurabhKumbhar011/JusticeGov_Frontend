// =======================
// ✅ CITIZEN MENU
// =======================
import { courtclerkMenu } from "./courtclerkMenu";
export const citizenMenu = [
  { label: "📊 My Profile",   path: "/citizenregister/my-profile" },
  { label: "📄 My Documents", path: "/citizenregister/my-documents" },
];

// =======================
// ✅ LAWYER MENU
// =======================
export const lawyerMenu = [
  { label: "📊 My Profile",   path: "/lawyerregister/my-profile" },
  { label: "📄 My Documents", path: "/lawyerregister/my-documents" },
];

// =======================
// ✅ REGISTRAR / ADMIN MENU
// =======================
export const registrarMenu = [
  { label: "📊 Dashboard",        path: "/register/dashboard" },
  { label: "🧑💼 Citizen Panel",   path: "/register/citizens" },
  { label: "⚖️ Lawyer Panel",     path: "/register/lawyers" },
  { label: "➕ Register Citizen",  path: "/register/citizen" },
  { label: "➕ Register Lawyer",   path: "/register/lawyer" },
  { label: "📄 Upload Document",  path: "/register/document" },
];

// =======================
// ✅ COMPLIANCE OFFICER MENU
// =======================
export const complianceOfficerMenu = [
  { label: "📊 Dashboard",          path: "/compliance/dashboard" },
  { label: "📋 Compliance Records", path: "/compliance/records" },
  { label: "➕ Add Record",          path: "/compliance/records/new" },
  { label: "🔍 Audits",             path: "/compliance/audits" },
  { label: "➕ New Audit",           path: "/compliance/audits/new" },
];

// =======================
// ✅ RESEARCHER MENU
// =======================
export const researcherMenu = [
  { label: "📊 Dashboard",         path: "/research" },

];

// =======================
// ✅ ROLE → MENU MAPPING (THIS WAS MISSING ❌)
// =======================
const roleMenus = {
  CITIZEN: citizenMenu,
  LAWYER: lawyerMenu,

  REGISTRAR: registrarMenu,
  ADMIN: registrarMenu,

  COMPLIANCE_OFFICER: complianceOfficerMenu,

  COURT_CLERK: courtclerkMenu,

  RESEARCHER: researcherMenu,
};

export default roleMenus;