import apiClient from "./apiClient";

const BASE_URL = "/api/court-orders";

const getMyOrders = (caseId) => {
  if (caseId) {
    return apiClient
      .get(`${BASE_URL}/me`, { params: { caseId } })
      .then((res) => res.data);
  }

  return apiClient
    .get(`${BASE_URL}/me`)
    .then((res) => res.data);
};

const create = (payload) =>
  apiClient
    .post(BASE_URL, payload)
    .then((res) => res.data);

const update = (orderId, payload) =>
  apiClient
    .patch(`${BASE_URL}/${orderId}`, payload)
    .then((res) => res.data);

const remove = (orderId) =>
  apiClient
    .delete(`${BASE_URL}/${orderId}`)
    .then((res) => res.data);

export default {
  getMyOrders,
  create,
  update,
  remove,
};