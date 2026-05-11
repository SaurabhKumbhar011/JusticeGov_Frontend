import React from "react";

export default function ReportCard({ title, value }) {
  return (
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fw-bold">{value}</p>
      </div>
    </div>
  );
}
