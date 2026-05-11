import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ReportTable({ reports, role }) {
  const downloadPDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Generated Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Report ID: ${report.id}`, 14, 32);
    doc.text(`Scope: ${report.scope}`, 14, 40);
    doc.text(`Generated Date: ${report.date}`, 14, 48);

    const body = [];
    Object.entries(report).forEach(([key, value]) => {
      if (["id", "scope", "date"].includes(key)) return;
      if (value !== undefined) body.push([key, value]);
    });

    doc.autoTable({
      startY: 60,
      head: [["Metric", "Value"]],
      body,
    });

    doc.save(`${report.id}.pdf`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Report ID</th>
            <th>Scope</th>
            <th>Generated Date</th>
            {role === "USER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.scope}</td>
              <td>{r.date}</td>
              {role === "USER" && (
                <td>
                  <button className="btn btn-success btn-sm me-2">View</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => downloadPDF(r)}
                  >
                    Download PDF
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
