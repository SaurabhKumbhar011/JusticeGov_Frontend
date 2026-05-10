import apiClient from './apiClient';

const BASE_URL = '/api/judgements';

export const judgementService = {

  // ✅ GET ONLY LOGGED‑IN JUDGE'S JUDGEMENTS (ALL CASES)
  getMyJudgements(caseId) {
    return caseId
      ? apiClient.get(`${BASE_URL}/me?caseId=${caseId}`)
      : apiClient.get(`${BASE_URL}/me`);
  },

  // ✅ GET SINGLE JUDGEMENT BY ID (optional – keep as is)
  getById(judgementId) {
    return apiClient.get(`${BASE_URL}/${judgementId}`);
  },

  // ✅ CREATE JUDGEMENT
  create(payload) {
    return apiClient.post(BASE_URL, payload);
  },

  // ✅ UPDATE JUDGEMENT
  update(judgementId, payload) {
    return apiClient.patch(`${BASE_URL}/${judgementId}`, payload);
  },

  // ✅ DELETE JUDGEMENT
  remove(judgementId) {
    return apiClient.delete(`${BASE_URL}/${judgementId}`);
  }
};

