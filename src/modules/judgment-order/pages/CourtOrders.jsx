import { useState } from "react";
import useCourtOrders from "../../../hooks/useCourtOrders";
import CourtOrderTable from "../components/CourtOrderTable";
import CourtOrderForm from "../components/CourtOrderForm";
import StatCard from "../../../components/stats/StatCard";

export default function CourtOrders() {
  const [searchCaseId, setSearchCaseId] = useState("");
  const [selected, setSelected] = useState(null);

  // ✅ Using the optimized hook from earlier
  const {
    orders,
    stats,
    loading,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useCourtOrders(searchCaseId || null);

  return (
    <div className="container-fluid py-4 px-4">
      {/* Header Section */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="fw-bold text-dark mb-1">Court Orders</h2>
          <p className="text-muted small mb-0">
            <i className="bi bi-info-circle me-1"></i>
            Manage and track compliance of judicial directives
          </p>
        </div>
        
        {/* Search Bar Container */}
        <div className="col-auto">
          <div className="input-group shadow-sm" style={{ width: "350px" }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="number"
              className="form-control border-start-0 ps-0"
              placeholder="Filter by Case ID..."
              value={searchCaseId}
              onChange={(e) => setSearchCaseId(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3 rounded-3 bg-white">
            <StatCard title="Total Orders" value={stats.total} color="primary" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3 rounded-3 bg-white">
            <StatCard title="Issued" value={stats.issued} color="warning" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3 rounded-3 bg-white">
            <StatCard title="Complied" value={stats.complied} color="success" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3 rounded-3 bg-white">
            <StatCard title="Non-Compliant" value={stats.nonCompliant} color="danger" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom border-light">
          <div className="row align-items-center">
            <div className="col">
              <h5 className="mb-0 fw-bold text-dark">Order Registry</h5>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary px-4 fw-semibold shadow-sm d-flex align-items-center gap-2"
                data-bs-toggle="modal"
                data-bs-target="#courtOrderModal"
                onClick={() => setSelected(null)}
              >
                <i className="bi bi-plus-lg"></i>
                New Order
              </button>
            </div>
          </div>
        </div>
        
        <div className="card-body p-0 position-relative">
          {/* Optional: Add a subtle loading overlay */}
          {loading && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-50" style={{ zIndex: 10 }}>
              <div className="spinner-border spinner-border-sm text-primary"></div>
            </div>
          )}
          
          <CourtOrderTable
            orders={orders}
            onEdit={setSelected}
            onDelete={deleteOrder}
          />
        </div>
      </div>

      {/* Modal - Ensure names and IDs match the table triggers */}
      <CourtOrderForm
        selected={selected}
        defaultCaseId={searchCaseId || ""}
        onCreate={createOrder}
        onUpdate={updateOrder}
      />
    </div>
  );
}