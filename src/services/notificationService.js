import axios from "axios";
 
const API = axios.create({
  baseURL: "http://localhost:9999/api/notifications",
  headers: {
    "Content-Type": "application/json",
  },
});
 
// ================= JWT TOKEN =================
 
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
// ================= GET ALL =================
 
const getAllNotifications = async () => {
  try {
    const response = await API.get("");
 
    return response;
  } catch (error) {
    console.error(
      "GET ALL NOTIFICATIONS ERROR : ",
      error
    );
 
    throw error;
  }
};
 
// ================= GET BY USER =================
 
const getNotificationsByUser = async (
  userId
) => {
  try {
    const response = await API.get(
      `/user/${userId}`
    );
 
    return response;
  } catch (error) {
    console.error(
      "GET USER NOTIFICATIONS ERROR : ",
      error
    );
 
    throw error;
  }
};
 
// ================= SEND =================
 
const sendNotification = async (data) => {
  try {
    const response = await API.post(
      "/send",
      data
    );
 
    return response;
  } catch (error) {
    console.error(
      "SEND NOTIFICATION ERROR : ",
      error
    );
 
    throw error;
  }
};
 
// ================= MARK AS READ =================
 
const markAsRead = async (id) => {
  try {
    const response = await API.put(
      `/${id}/read`
    );
 
    return response;
  } catch (error) {
    console.error(
      "MARK AS READ ERROR : ",
      error
    );
 
    throw error;
  }
};
 
// ================= DELETE =================
 
const deleteNotification = async (id) => {
  try {
    const response = await API.delete(
      `/${id}`
    );
 
    return response;
  } catch (error) {
    console.error(
      "DELETE NOTIFICATION ERROR : ",
      error
    );
 
    throw error;
  }
};
 
// ================= EXPORT =================
 
const NotificationService = {
  getAllNotifications,
  getNotificationsByUser,
  sendNotification,
  markAsRead,
  deleteNotification,
};
 
export default NotificationService;
 