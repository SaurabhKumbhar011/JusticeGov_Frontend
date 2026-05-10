// export const decodeToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch {
//     return null;
//   }
// };

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];

    // ✅ Handle Base64URL encoding
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

// ✅ ADD THIS
export const getJudgeId = () =>
  decodeToken()?.userId || decodeToken()?.judgeId;