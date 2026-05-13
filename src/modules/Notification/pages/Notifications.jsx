import React, { useEffect, useState } from "react";
 
import SendNotification from "../components/SendNotification";
import NotificationList from "../components/NotificationList";
 
import NotificationService from "../../../services/notificationService";
 
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");
 
  const fetchAllNotifications = async () => {
    try {
      const response =
        await NotificationService.getAllNotifications();
 
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const fetchByUser = async () => {
    try {
      if (!userId) {
        fetchAllNotifications();
        return;
      }
 
      const response =
        await NotificationService.getNotificationsByUser(
          userId
        );
 
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    fetchAllNotifications();
  }, []);
 
  const handleRead = async (id) => {
    try {
      await NotificationService.markAsRead(id);
 
      fetchByUser();
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await NotificationService.deleteNotification(id);
 
      fetchByUser();
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="container-fluid p-4">
      <div className="mb-4 d-flex gap-3">
        <input
          type="number"
          className="form-control"
          placeholder="Filter By User ID"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
        />
 
        <button
          className="btn btn-dark"
          onClick={fetchByUser}
        >
          Search
        </button>
 
        <button
          className="btn btn-secondary"
          onClick={() => {
            setUserId("");
            fetchAllNotifications();
          }}
        >
          Reset
        </button>
      </div>
 
      <div className="row">
        <div className="col-lg-4 mb-4">
          <SendNotification
            refreshNotifications={
              fetchAllNotifications
            }
          />
        </div>
 
        <div className="col-lg-8">
          <NotificationList
            notifications={notifications}
            handleRead={handleRead}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
 
export default Notifications;
 