/* =========================
   TOKEN ACCESS (DEV SAFE)
   ========================= */

const sanitizeToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  return token.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
};

// ⚠️ NO DEFAULT DEV TOKEN - only use the actual login token
const DEV_TOKEN = null;

export const getToken = () =>
  sanitizeToken(localStorage.getItem("token"));

/* =========================
   ✅ TOKEN DECODING (FIXED)
   ========================= */

export const decodeToken = () => {
  const token = getToken(); // ✅ THIS IS THE FIX
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

/* =========================
   USER HELPERS
   ========================= */

export const getUserEmail = () =>
  decodeToken()?.sub || "Unknown User";

export const getUserRole = () =>
  decodeToken()?.role || "User";

export const getJudgeId = () =>
  decodeToken()?.userId || decodeToken()?.judgeId || null;

export const setToken = (token) => {
  localStorage.setItem("token", sanitizeToken(token));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};