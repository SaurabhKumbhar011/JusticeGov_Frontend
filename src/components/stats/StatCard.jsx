export default function StatCard({ title, value, icon, color = "primary" }) {
  return (
    <div className="card border-0 shadow-sm h-100 rounded-3">
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="fw-bold mb-0 text-dark">{value}</h4>
            <div className="text-muted small fw-medium mt-1">{title}</div>
          </div>
          {/* Optional: Icon placeholder if you want to use Bootstrap Icons */}
          <div className={`rounded-3 bg-${color} bg-opacity-10 p-2 text-${color}`}>
             <i className={`bi ${icon || 'bi-bar-chart'} fs-5`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}