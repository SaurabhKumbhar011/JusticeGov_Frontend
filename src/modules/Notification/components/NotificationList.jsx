import React from "react";
 
const NotificationList = ({
  notifications,
  handleRead,
  handleDelete,
}) => {
  return (
    <div className="card shadow-lg border-0 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">
          All Notifications
        </h2>
 
        <span className="badge bg-dark fs-6">
          {notifications.length}
        </span>
      </div>
 
      {notifications.length === 0 ? (
        <div className="alert alert-warning">
          No Notifications Available
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="border rounded-4 p-4 mb-3 shadow-sm"
          >
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="fw-bold text-primary">
                  {notification.category}
                </h5>
 
                <p className="mb-2">
                  {notification.message}
                </p>
 
                <div className="d-flex gap-3 flex-wrap">
                  <small className="text-muted">
                    User ID :
                    {notification.userId}
                  </small>
 
                  <small className="text-muted">
                    Status :
                    {notification.status}
                  </small>
                </div>
 
                <small className="text-secondary">
                  {notification.createdDate}
                </small>
              </div>
 
              <div className="d-flex flex-column gap-2">
                {notification.status !== "READ" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      handleRead(notification.id)
                    }
                  >
                    Mark Read
                  </button>
                )}
 
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(notification.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
 
export default NotificationList;
 