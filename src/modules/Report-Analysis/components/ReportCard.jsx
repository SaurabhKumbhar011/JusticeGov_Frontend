import React from "react";
 
const ReportCard = ({
  title,
  value,
  color,
  icon,
}) => {
 
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow:
          "0px 2px 10px rgba(0,0,0,0.1)",
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>{title}</h3>
 
          <h1>{value}</h1>
        </div>
 
        <div
          style={{
            fontSize: "40px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
 
export default ReportCard;
 