import React, { useEffect, useState } from "react";

import ReportCard from "../components/ReportCard";
import TrendChart from "../components/TrendChart";
import ReportTable from "../components/ReportTable";
import ReportModal from "../components/ReportModal";

import { reportService } from "../../../services/reportService";

const Reports = () => {
  const [dashboard, setDashboard] = useState({
    totalCases: 0,
    totalHearings: 0,
    totalJudgements: 0,
    complianceRate: 0,
    filedCases: 0,
    closedCases: 0,
    inProgressCases: 0,
    scheduledHearings: 0,
    cancelledHearings: 0,
    issuedJudgements: 0,
    draftJudgements: 0,
  });

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [scope, setScope] = useState("CASE");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchId, setSearchId] = useState("");

  const loadReports = async () => {
    try {
      const data = await reportService.getAllReports();
      console.log("REPORT RESPONSE:", data);

      if (Array.isArray(data)) {
        setReports(data);
      } else if (Array.isArray(data.data)) {
        setReports(data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.log(error);
      setReports([]);
    }
  };

  const loadDashboard = async () => {
    try {
      const data = await reportService.getDashboardAnalytics();
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
    loadReports();
  }, []);

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      alert("Select Start & End Date");
      return;
    }

    try {
      await reportService.generateReport({ scope, startDate, endDate });
      alert("Report Generated");
      loadReports();
      loadDashboard();
    } catch (error) {
      console.log(error);
      alert("Generation Failed");
    }
  };

  const handleView = async (id) => {
    try {
      const data = await reportService.getReportById(id);
      setSelectedReport(data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    { name: "Filed", value: dashboard.filedCases },
    { name: "Closed", value: dashboard.closedCases },
    { name: "Pending", value: dashboard.inProgressCases },
  ];

  const filteredReports = reports.filter((report) =>
    report.id.toString().includes(searchId)
  );

  return (
    <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "25px" }}>Reporting & Analytics</h1>

      {/* Filters */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "30px",
          display: "flex",
          gap: "15px",
        }}
      >
        <select
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          style={{ padding: "12px", borderRadius: "10px" }}
        >
          <option value="CASE">CASE</option>
          <option value="HEARING">HEARING</option>
          <option value="JUDGEMENT">JUDGEMENT</option>
        </select>

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button
          onClick={handleGenerate}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </div>

      {/* Dashboard Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
        <ReportCard title="Total Cases" value={dashboard.totalCases} color="#2563eb" icon="📁" />
        <ReportCard title="Hearings" value={dashboard.totalHearings} color="#16a34a" icon="⚖️" />
        <ReportCard title="Judgements" value={dashboard.totalJudgements} color="#f59e0b" icon="📜" />
        <ReportCard
          title="Compliance"
          value={`${dashboard.complianceRate}%`}
          color="#ef4444"
          icon="📊"
        />
      </div>

      {/* Trend Charts */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <TrendChart title="Case Trend" data={chartData} color="#2563eb" dataKey="value" />
        <TrendChart title="Hearing Trend" data={chartData} color="#16a34a" dataKey="value" />
        <TrendChart title="Judgement Trend" data={chartData} color="#f59e0b" dataKey="value" />
      </div>

      {/* Search + Table */}
      <div style={{ marginTop: "25px" }}>
        <input
          type="text"
          placeholder="Search By ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <ReportTable reports={filteredReports} onView={handleView} onDownload={reportService.downloadReport} />

      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
};

export default Reports;
