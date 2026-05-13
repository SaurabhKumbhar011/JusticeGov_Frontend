import React from "react";
 
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
 
const TrendChart = ({
  title,
  data,
  color,
  dataKey,
}) => {
 
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow:
          "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{title}</h2>
 
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
 
          <XAxis dataKey="name" />
 
          <YAxis />
 
          <Tooltip />
 
          <Legend />
 
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
 
export default TrendChart;
 