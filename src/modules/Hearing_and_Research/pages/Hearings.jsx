import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHearings } from "../../../hooks/useHearings";

import HearingForm from "../components/HearingForm";
import HearingTable from "../components/HearingTable";
import DashboardStats from "../../../components/stats/DashboardStats";

const Hearings = () => {
  const { caseId } = useParams();

  const {
    hearings,
    loadHearings,
    addHearing,
    updateStatus
  } = useHearings();

  useEffect(() => {
    loadHearings(caseId || 1);
  }, [caseId]);

  return (
    <div className="dashboard container-fluid">

      {/* Stats */}
      <DashboardStats hearings={hearings} projects={[]} grants={[]} />

      <h2 className="mb-4">
        <i className="bi bi-calendar-event me-2"></i>
        Hearing Management
      </h2>

      <div className="card-custom">
        <h5 className="section-title">Schedule Hearing</h5>
        <HearingForm onSubmit={addHearing} />
      </div>

      <div className="card-custom">
        <h5 className="section-title">Hearing History</h5>

        {hearings.length === 0 ? (
          <p className="text-muted">No hearings found</p>
        ) : (
          <HearingTable
            hearings={hearings}
            onUpdateStatus={updateStatus}
          />
        )}
      </div>

    </div>
  );
};

export default Hearings;