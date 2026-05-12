import apiClient from './apiClient';

export const uploadCaseDocument = async (caseId, file, type) => {
  const formData = new FormData();
  formData.append('caseId', caseId);
  formData.append('file', file);
  formData.append('type', type);

  const response = await apiClient.post('/api/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
