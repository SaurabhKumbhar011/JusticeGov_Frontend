import React, { useState } from "react";
import NotificationService from "../../../services/notificationService";
 
const SendNotification = ({ refreshNotifications }) => {
  const [formData, setFormData] = useState({
    userId: "",
    entityId: "",
    category: "",
    message: "",
  });
 
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      setLoading(true);
 
      const payload = {
        userId: Number(formData.userId),
        entityId: formData.entityId
          ? Number(formData.entityId)
          : null,
        category: formData.category,
        message: formData.message,
      };
 
      await NotificationService.sendNotification(payload);
 
      alert("Notification Sent Successfully");
 
      setFormData({
        userId: "",
        entityId: "",
        category: "",
        message: "",
      });
 
      refreshNotifications();
    } catch (error) {
      console.log(error);
 
      alert(
        error?.response?.data?.message ||
          "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="card shadow-lg border-0 rounded-4 p-4">
      <h2 className="text-primary fw-bold mb-4">
        Send Notification
      </h2>
 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="fw-semibold mb-2">
            User ID
          </label>
 
          <input
            type="number"
            className="form-control"
            placeholder="Enter User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="fw-semibold mb-2">
            Entity ID
          </label>
 
          <input
            type="number"
            className="form-control"
            placeholder="Enter Entity ID"
            name="entityId"
            value={formData.entityId}
            onChange={handleChange}
          />
        </div>
 
        <div className="mb-3">
          <label className="fw-semibold mb-2">
            Category
          </label>
 
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>
 
            <option value="CASE_CREATED">
              CASE_CREATED
            </option>
 
            <option value="HEARING_SCHEDULED">
              HEARING_SCHEDULED
            </option>
 
            <option value="JUDGEMENT_DONE">
              JUDGEMENT_DONE
            </option>
 
            <option value="ADMIN">
              ADMIN
            </option>
          </select>
        </div>
 
        <div className="mb-4">
          <label className="fw-semibold mb-2">
            Message
          </label>
 
          <textarea
            rows="5"
            className="form-control"
            placeholder="Enter Notification Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
 
        <button
          className="btn btn-primary w-100 py-2 fw-bold"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Notification"}
        </button>
      </form>
    </div>
  );
};
 
export default SendNotification;
 