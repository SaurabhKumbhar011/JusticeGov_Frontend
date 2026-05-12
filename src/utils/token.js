export const getToken = () =>
  localStorage.getItem("token");

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
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};