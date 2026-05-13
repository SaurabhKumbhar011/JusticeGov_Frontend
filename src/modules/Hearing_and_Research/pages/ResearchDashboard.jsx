import { useEffect } from "react";
import { useResearch } from "../../../hooks/useResearch";

import ResearchProjectForm from "../components/ResearchProjectForm";
import ResearchProjectTable from "../components/ResearchProjectTable";
import GrantApplicationForm from "../components/GrantApplicationForm";
import GrantTable from "../components/GrantTable";
import DashboardStats from "../../../components/stats/DashboardStats";

const ResearchDashboard = () => {
  const {
    projects,
    grants,
    loading,
    loadProjects,
    loadGrants,
    addProject,
    addGrant
  } = useResearch();

  useEffect(() => {
    loadProjects();
    loadGrants();
  }, []);

  return (
    <div className="dashboard container-fluid">

      {/* ✅ Loader */}
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* ✅ Stats */}
      <DashboardStats projects={projects} grants={grants} />

      <h2 className="mb-4">
        <i className="bi bi-journal-text me-2"></i>
        Research & Grants Management
      </h2>

      <div className="card-custom">
        <h5 className="section-title">Create Research Project</h5>
        <ResearchProjectForm onSubmit={addProject} />
      </div>

      <div className="card-custom">
        <h5 className="section-title">Projects</h5>
        <ResearchProjectTable projects={projects} />
      </div>

      <div className="card-custom">
        <h5 className="section-title">Apply for Grant</h5>
        <GrantApplicationForm onSubmit={addGrant} />
      </div>

      <div className="card-custom">
        <h5 className="section-title">Grant Applications</h5>
        <GrantTable grants={grants} />
      </div>

    </div>
  );
};

export default ResearchDashboard;