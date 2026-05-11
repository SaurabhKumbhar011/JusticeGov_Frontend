import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TrendChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Guard against empty or invalid data
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("TrendChart: No valid data provided.");
      return;
    }

    const ctx = chartRef.current;
    if (!ctx) return;

    // Destroy previous chart instance to avoid duplicates
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const firstRow = data[0] || {};
    const datasets = [];

    if (firstRow.cases !== undefined) {
      datasets.push({
        label: "Cases",
        data: data.map((d) => d.cases ?? 0),
        borderColor: "#0d6efd",
        tension: 0.4,
      });
    }
    if (firstRow.hearings !== undefined) {
      datasets.push({
        label: "Hearings",
        data: data.map((d) => d.hearings ?? 0),
        borderColor: "#198754",
        tension: 0.4,
      });
    }
    if (firstRow.judgements !== undefined) {
      datasets.push({
        label: "Judgements",
        data: data.map((d) => d.judgements ?? 0),
        borderColor: "#ffc107",
        tension: 0.4,
      });
    }
    if (firstRow.compliance !== undefined) {
      datasets.push({
        label: "Compliance",
        data: data.map((d) => d.compliance ?? 0),
        borderColor: "#dc3545",
        tension: 0.4,
      });
    }

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.date),
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Values",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      {(!Array.isArray(data) || data.length === 0) ? (
        <p>No data available for the chart.</p>
      ) : (
        <canvas ref={chartRef} />
      )}
    </div>
  );
}
