import apiClient from "./apiClient";

export const scheduleHearing = async (hearing) => {
  const res = await apiClient.post("/api/hearings/schedule", hearing);
  return res.data;
};

export const getHearingHistory = async (caseId) => {
  const res = await apiClient.get(`/api/hearings/history/${caseId}`);
  return res.data;
};

export const updateHearingStatus = async (id, status) => {
  const res = await apiClient.patch(
    `/api/hearings/${id}/status?status=${status}`
  );
  return res.data;
};