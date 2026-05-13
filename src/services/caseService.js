import apiClient from './apiClient';
 
export const fileCase = async (caseData) => {
  const response = await apiClient.post('/api/cases', caseData);
  return response.data;
};
 
export const getCaseById = async (caseId) => {
  const response = await apiClient.get(`/api/cases/${caseId}`);
  return response.data;
};
 
export const getAllCases = async () => {
  const response = await apiClient.get('/api/cases');
  return response.data;
};