/* =========================
   TOKEN ACCESS (DEV SAFE)
   ========================= */

// ⚠️ TEMPORARY DEVELOPMENT TOKEN (REMOVE LATER)
const DEV_TOKEN =
  //"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYWJoa3VtYmhhcjAxMUBnbWFpbC5jb20iLCJyb2xlIjoiSlVER0UiLCJpYXQiOjE3NzgzOTMxMjYsImV4cCI6MTc3ODQyOTEyNn0._D8pavLUkciSAFaDul7HETp1gGFppyLGn7gNRblXL24";
//"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZ2dAanVzdGljZS5nb3YiLCJyb2xlIjoiQ0lUSVpFTiIsImlhdCI6MTc3ODQ4MDU2MywiZXhwIjoxNzc4NTE2NTYzfQ.JrzYYkLSj4KUynijnwoDLBpIu4G-G_FWWzda21WW4YY";
//"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZ2dAanVzdGljZS5nb3YiLCJ1c2VySWQiOjMyLCJyb2xlIjoiQ0lUSVpFTiIsImlhdCI6MTc3ODQ5MTI3OSwiZXhwIjoxNzc4NTI3Mjc5fQ.e0RDkVewyn3P0RONs0cOD89HVwRKq5ChJbr3BXoG2jA";
"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsa2pqQGp1c3RpY2UuZ292IiwidXNlcklkIjozOCwicm9sZSI6IkxBV1lFUiIsImlhdCI6MTc3ODQ5NzkyNiwiZXhwIjoxNzc4NTMzOTI2fQ.NSngOKCW_lxgvNr8-oGfBNRH_LR4PRppIjpGiJDlaP0";
//"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc3NAanVzdGljZS5nb3YiLCJ1c2VySWQiOjM0LCJyb2xlIjoiQ09NUExJQU5DRV9PRkZJQ0VSIiwiaWF0IjoxNzc4NTAyNjQ1LCJleHAiOjE3Nzg1Mzg2NDV9.SXyYcjl-1cbixia2gA7ptRUay4whGUIu4ItZ8RpmonA";

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