// import apiClient from "./apiClient";

// // ✅ Project APIs
// export const getProjects = async () => {
//   const res = await apiClient.get("/api/research/projects");
//   return res.data;
// };

// export const createProject = async (project) => {
//   const res = await apiClient.post("/api/research/projects", project);
//   return res.data;
// };

// // ✅ Grant APIs
// export const getGrants = async () => {
//   const res = await apiClient.get("/api/research/grants");
//   return res.data;
// };

// export const applyGrant = async (application) => {
//   const res = await apiClient.post("/api/research/grants/apply", application);
//   return res.data;
// };

// export const updateGrantStatus = async (id, status) => {
//   const res = await apiClient.put(
//     `/api/research/grants/${id}/status?status=${status}`
//   );
//   return res.data;
// };

import apiClient from "./apiClient";

// ================= PROJECT APIs =================

export const getProjects = async () => {
  const res = await apiClient.get("/api/research/projects");
  return res.data;
};

export const createProject = async (project) => {
  const res = await apiClient.post("/api/research/projects", project);
  return res.data;
};

// ================= GRANT APIs =================

export const getGrants = async () => {
  const res = await apiClient.get("/api/research/grants");
  return res.data;
};

export const applyGrant = async (application) => {
  const res = await apiClient.post("/api/research/grants/apply", application);
  return res.data;
};

// ✅ ✅ ✅ FINAL FIX HERE
export const updateGrantStatus = async (id, status) => {
  try {
    const res = await apiClient.put(
      `/api/research/grants/${id}/status?status=${status}`
    );
    return res.data;
  } catch (err) {
    console.error("API ERROR:", err.response || err);
    throw err; // ✅ important so UI catches it
  }
};