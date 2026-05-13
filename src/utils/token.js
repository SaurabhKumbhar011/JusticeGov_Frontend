/* =========================
   ✅ MANUAL DEV TOKEN (PRIMARY)
   ========================= */

// 🔥 Always used if localStorage token not present
const DEV_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXJzaGFkQGdtYWlsLmNvbSIsInJvbGUiOiJSRVNFQVJDSEVSIiwiaWF0IjoxNzc4NTU5MzYwLCJleHAiOjE3Nzg1OTUzNjB9.PAtBjJEYj7ijrSk_5eqpzNYd0BkI2Tfnvs3AllH_pzU";

/* =========================
   ✅ TOKEN ACCESS
   ========================= */

export const getToken = () => {
  const storedToken = localStorage.getItem("token");

  // ✅ Priority: localStorage → else DEV token
  return storedToken || DEV_TOKEN;
};

/* =========================
   ✅ TOKEN DECODING (SAFE)
   ========================= */

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("❌ Failed to decode token:", e);
    return null;
  }
};

/* =========================
   ✅ USER HELPERS (OPTIMIZED)
   ========================= */

const getDecoded = () => decodeToken();

export const getUserEmail = () => {
  const decoded = getDecoded();
  return decoded?.sub || "Unknown";
};

export const getUserRole = () => {
  const decoded = getDecoded();
  return decoded?.role || "USER";
};

export const getUserId = () => {
  const decoded = getDecoded();
  return decoded?.userId || decoded?.judgeId || decoded?.id || null;
};

/* =========================
   ✅ TOKEN MANAGEMENT
   ========================= */

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};