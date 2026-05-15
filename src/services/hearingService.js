// import apiClient from "./apiClient";

// /* ================= HEARING APIs ================= */

// // ✅ 1. Schedule Hearing
// export const scheduleHearing = async (hearing) => {
//   const res = await apiClient.post("/api/hearings/schedule", hearing);
//   return res.data;
// };

// // ✅ 2. Get FULL Hearing List (Dashboard Load)
// export const getHearings = async () => {
//   const res = await apiClient.get("/api/hearings");
//   return res.data;
// };

// // ✅ 3. Get Hearing History (by case)
// export const getHearingHistory = async (caseId) => {
//   const res = await apiClient.get(`/api/hearings/history/${caseId}`);
//   return res.data;
// };

// // ✅ 4. Record Proceedings (IMPORTANT FEATURE YOU SAID)
// export const recordProceedings = async (id, notes) => {
//   const res = await apiClient.put(
//     `/api/hearings/${id}/proceedings`,
//     {
//       notes: notes,
//     }
//   );
//   return res.data;
// };

// // ✅ 5. Update Hearing Status (Adjourned / Completed)
// export const updateHearingStatus = async (id, status) => {
//   const res = await apiClient.patch(
//     `/api/hearings/${id}/status?status=${status}`
//   );
//   return res.data;
// };

import apiClient from "./apiClient";

/**
 * Backend expects:
 * {
 *   caseId: Long,
 *   judgeId: Long,
 *   dateTime: LocalDateTime (ISO),
 *   status: HearingStatus
 * }
 */

// ✅ Schedule Hearing (NO SPLITTING, FINAL)
export const scheduleHearing = async (payload) => {
  try {
    // ✅ Just forward payload as-is
    const res = await apiClient.post(
      "/api/hearings/schedule",
      payload
    );
    return res.data;
  } catch (err) {
    console.error("API ERROR (scheduleHearing):", err.response || err);
    throw err;
  }
};

// ✅ Get Hearing History
export const getHearingHistory = async (caseId) => {
  const res = await apiClient.get(`/api/hearings/history/${caseId}`);
  return res.data;
};

// ✅ Update Hearing Status
export const updateHearingStatus = async (id, status) => {
  const res = await apiClient.patch(
    `/api/hearings/${id}/status?status=${status}`
  );
  return res.data;
};

// ✅ Record Court Proceedings
export const recordProceedings = async (id, notes) => {
  const res = await apiClient.post(
    `/api/hearings/${id}/proceedings`,
    { notes }
  );
  return res.data;
};