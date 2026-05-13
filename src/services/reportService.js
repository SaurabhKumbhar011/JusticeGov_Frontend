import apiClient from "./apiClient";

const BASE_URL = "/reports";

export const reportService = {
  // ================= ANALYTICS =================
  async getDashboardAnalytics() {
    const response = await apiClient.get("/analytics/dashboard");
    return response.data;
  },

  // ================= REPORTS =================
  async generateReport(reportData) {
    const response = await apiClient.post(`${BASE_URL}/generate`, reportData);
    return response.data;
  },

  async getAllReports() {
    const response = await apiClient.get(`${BASE_URL}/all`);
    return response.data;
  },

  async getReportById(id) {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // ================= DOWNLOAD =================
  async downloadReport(report) {
    const content = `
JUSTICE GOV REPORT

REPORT ID : ${report.id}
SCOPE : ${report.scope}
GENERATED DATE : ${report.generatedDate}
START DATE : ${report.startDate}
END DATE : ${report.endDate}

METRICS :
${report.metrics}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `REPORT_${report.id}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  },
};
