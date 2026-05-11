import React, { useState, useEffect } from "react";
import ReportTable from "../components/ReportTable";
import TrendChart from "../components/TrendChart";
import { getDashboardAnalytics, generateReport } from "../../../services/reportService";
import { decodeToken } from "../../../utils/token";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Reports() {
  const [analytics, setAnalytics] = useState(null);
  const [reports, setReports] = useState([]);
  const [scope, setScope] = useState("ALL");
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState("2024-04-24");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let role = "USER";
  try {
    const decoded = decodeToken();
    if (decoded && decoded.role) {
      role = decoded.role;
    }
  } catch {}

  // Fetch dashboard analytics on mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getDashboardAnalytics();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        // Use mock data as fallback for development
        const mockData = {
          totalCases: 12450,
          totalHearings: 1203,
          totalJudgements: 3456,
          complianceRate: 94,
          avgResolutionDays: 32,
          filedCases: 2100,
        };
        setAnalytics(mockData);
        setError("Backend not connected. Using mock data. Please configure your backend at http://localhost:8085");
        console.warn("Using mock analytics data. Backend not available.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const newReport = await generateReport(scope, startDate, endDate);
      if (!newReport || !newReport.id) {
        setError("Failed to generate report. No data returned.");
        return;
      }
      setReports((prev) => [
        ...prev,
        {
          id: newReport.id,
          scope: newReport.scope,
          date: newReport.generatedDate,
          ...newReport.metrics,
        },
      ]);
      setError(null);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
      console.error("Report error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!analytics) return [];
    // Use today's date for the single data point
    const today = new Date().toISOString().split('T')[0];
    return [{
      date: today,
      cases: analytics.totalCases,
      hearings: analytics.totalHearings,
      judgements: analytics.totalJudgements,
      compliance: analytics.complianceRate,
    }];
  };

  return (
    <div className="container-fluid py-4 px-4">
      {/* Error Alert */}
      {error && (
        <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>{error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Updated Header Card with Filters */}
      <div className="card border-0 shadow-sm rounded-3 p-4 mb-4">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h4 className="fw-bold text-dark mb-0">Reporting & Analytics Dashboard</h4>
          </div>
        </div>

        {/* Filter Row */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark small mb-2">Scope</label>
            <select 
              className="form-select border-0 bg-light rounded-2 py-2" 
              value={scope} 
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="ALL">All Scope</option>
              <option value="CASE">Cases</option>
              <option value="HEARING">Hearings</option>
              <option value="JUDGEMENT">Judgements</option>
              <option value="COMPLIANCE">Compliance</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark small mb-2">Start Date</label>
            <input 
              type="date" 
              className="form-control border-0 bg-light rounded-2 py-2" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark small mb-2">End Date</label>
            <input 
              type="date" 
              className="form-control border-0 bg-light rounded-2 py-2" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="card border-0 shadow-sm rounded-3 p-4 mb-4">
        <h5 className="fw-bold text-dark mb-3">Trend Analysis</h5>
        <div style={{ height: "350px" }} className="bg-light rounded-2 p-3">
          {loading ? (
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : analytics ? (
            <TrendChart data={getChartData(scope)} />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <p className="text-muted">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="card border-0 shadow-sm rounded-3 p-4 mb-4">
        <h5 className="fw-bold text-dark mb-3">Generate Report</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold text-dark small mb-2">Scope</label>
            <select 
              className="form-select border-0 bg-light rounded-2 py-2" 
              value={scope} 
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="CASE">Case</option>
              <option value="HEARING">Hearing</option>
              <option value="JUDGEMENT">Judgement</option>
              <option value="COMPLIANCE">Compliance</option>
              <option value="ALL">All</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold text-dark small mb-2">Start Date</label>
            <input 
              type="date" 
              className="form-control border-0 bg-light rounded-2 py-2" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold text-dark small mb-2">End Date</label>
            <input 
              type="date" 
              className="form-control border-0 bg-light rounded-2 py-2" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button 
              type="button" 
              onClick={handleGenerateReport} 
              disabled={loading}
              className="btn btn-primary w-100 fw-semibold py-2 rounded-2"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Reports Table */}
      <div className="card border-0 shadow-sm rounded-3 p-4">
        <h5 className="fw-bold text-dark mb-3">Generated Reports</h5>
        {reports.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
            <p>No reports generated yet. Click "Generate Report" to create one.</p>
          </div>
        ) : (
          <ReportTable reports={reports} role={role} />
        )}
      </div>
    </div>
  );
}
