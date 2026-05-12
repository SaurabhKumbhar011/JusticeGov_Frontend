export default function CourtOrderTable({ orders, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const map = {
      DRAFT: "bg-secondary",
      ISSUED: "bg-primary",
      COMPLIED: "bg-success",
      NON_COMPLIANT: "bg-danger",
    };
    return `badge rounded-pill ${map[status] || "bg-dark"}`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="border-0 ps-4 py-3 text-uppercase small fw-bold text-muted">ID</th>
            <th className="border-0 py-3 text-uppercase small fw-bold text-muted">Case ID</th>
            <th className="border-0 py-3 text-uppercase small fw-bold text-muted">Date</th>
            <th className="border-0 py-3 text-uppercase small fw-bold text-muted" style={{ width: "35%" }}>Description</th>
            <th className="border-0 py-3 text-uppercase small fw-bold text-muted">Status</th>
            <th className="border-0 py-3 text-uppercase small fw-bold text-muted text-end pe-4">Actions</th>
          </tr>
        </thead>

        <tbody className="border-top-0">
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">
                <i className="bi bi-file-earmark-text fs-2 d-block mb-2"></i>
                No court orders found
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td className="ps-4 fw-medium text-dark">#{o.id}</td>
                <td>
                  <span className="badge bg-light text-dark border fw-normal">
                    {o.caseId}
                  </span>
                </td>
                <td className="text-muted small">
                  {new Date(o.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td>
                  <p className="mb-0 text-truncate small" style={{ maxWidth: "400px" }}>
                    {o.description}
                  </p>
                </td>
                <td>
                  <span className={getStatusBadge(o.status)}>
                    {o.status.replace("_", " ")}
                  </span>
                </td>
                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-sm btn-light border shadow-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#courtOrderModal"
                      onClick={() => onEdit(o)}
                      title="Edit Order"
                    >
                      <i className="bi bi-pencil-square text-primary"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light border shadow-sm"
                      onClick={() => {
                        if(window.confirm("Are you sure you want to delete this order?")) {
                          onDelete(o.id);
                        }
                      }}
                      title="Delete Order"
                    >
                      <i className="bi bi-trash3 text-danger"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}