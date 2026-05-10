/* =========================
   TOKEN ACCESS (DEV SAFE)
   ========================= */

// ⚠️ TEMPORARY DEVELOPMENT TOKEN (REMOVE LATER)
const DEV_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYWJoa3VtYmhhcjAxMUBnbWFpbC5jb20iLCJyb2xlIjoiSlVER0UiLCJpYXQiOjE3NzgzOTMxMjYsImV4cCI6MTc3ODQyOTEyNn0._D8pavLUkciSAFaDul7HETp1gGFppyLGn7gNRblXL24";

export const getToken = () =>
  localStorage.getItem("token") || DEV_TOKEN;

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