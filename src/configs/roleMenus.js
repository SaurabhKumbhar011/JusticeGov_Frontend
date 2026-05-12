// Menu for CITIZEN role
export const citizenMenu = [
  { label: "📊 My Profile",        path: "/register/my-profile" },
  { label: "📄 My Documents",      path: "/register/my-documents" },
  { label: "📝 Case Filing",       path: "/register/case-filing" },
];

// Menu for LAWYER role
export const lawyerMenu = [
  { label: "📊 My Profile",        path: "/register/my-profile" },
  { label: "📄 My Documents",      path: "/register/my-documents" },
  { label: "📝 Case Filing",       path: "/register/case-filing" },
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
