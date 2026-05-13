import React from "react";
 
const ReportTable = ({
  reports,
  onView,
  onDownload,
}) => {
 
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <h2>Generated Reports</h2>
 
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f3f4f6",
            }}
          >
            <th
              style={{
                padding: "15px",
              }}
            >
              Report ID
            </th>
 
            <th>Scope</th>
 
            <th>Generated Date</th>
 
            <th>Actions</th>
          </tr>
        </thead>
 
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              style={{
                textAlign: "center",
                borderBottom:
                  "1px solid #ddd",
              }}
            >
              <td
                style={{
                  padding: "15px",
                }}
              >
                {report.id}
              </td>
 
              <td>{report.scope}</td>
 
              <td>
                {report.generatedDate}
              </td>
 
              <td>
                <button
                  onClick={() =>
                    onView(report.id)
                  }
                  style={{
                    background:
                      "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding:
                      "10px 16px",
                    borderRadius:
                      "10px",
                    marginRight:
                      "10px",
                    cursor:
                      "pointer",
                    transition:
                      "0.3s",
                  }}
                >
                  View
                </button>
 
                <button
                  onClick={() =>
                    onDownload(report)
                  }
                  style={{
                    background:
                      "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding:
                      "10px 16px",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer",
                  }}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default ReportTable;
 