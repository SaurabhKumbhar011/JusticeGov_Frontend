import React from "react";
 
const ReportModal = ({
  report,
  onClose,
}) => {
 
  if (!report) return null;
 
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          borderRadius: "20px",
          padding: "25px",
        }}
      >
        <h2>Report Details</h2>
 
        <p>
          <b>ID :</b> {report.id}
        </p>
 
        <p>
          <b>Scope :</b> {report.scope}
        </p>
 
        <p>
          <b>Generated Date :</b>{" "}
          {report.generatedDate}
        </p>
 
        <textarea
          readOnly
          value={report.metrics}
          style={{
            width: "100%",
            height: "200px",
            marginTop: "15px",
            padding: "10px",
          }}
        />
 
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            background: "red",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
 
export default ReportModal;
 