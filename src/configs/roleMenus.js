// Menu for CITIZEN role
export const citizenMenu = [
  { label: "📊 My Profile",        path: "/citizenregister/my-profile" },
  { label: "📄 My Documents",      path: "/citizenregister/my-documents" },
];
 
// Menu for LAWYER role
export const lawyerMenu = [
  { label: "📊 My Profile",        path: "/lawyerregister/my-profile" },
  { label: "📄 My Documents",      path: "/lawyerregister/my-documents" },
  { label: "📄 Case Filing",       path: "/lawyerregister/case-filing" },
];
 
// Menu for ADMIN/REGISTRAR role (full access)
export const registrarMenu = [
  { label: "📊 Dashboard",         path: "/register/dashboard" },
  { label: "🧑💼 Citizen Panel",    path: "/register/citizens" },
  { label: "⚖️ Lawyer Panel",      path: "/register/lawyers" },
  { label: "➕ Register Citizen",   path: "/register/citizen" },
  { label: "➕ Register Lawyer",    path: "/register/lawyer" },
  { label: "📄 Upload Document",   path: "/register/document" },
];
 
// Menu for COMPLIANCE_OFFICER role
export const complianceOfficerMenu = [
  { label: "📊 Dashboard",          path: "/compliance/dashboard" },
  { label: "📋 Compliance Records", path: "/compliance/records" },
  { label: "➕ Add Record",          path: "/compliance/records/new" },
  { label: "🔍 Audits",             path: "/compliance/audits" },
  { label: "➕ New Audit",           path: "/compliance/audits/new" },
];