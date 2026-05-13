import StatCard from "./StatCard";

const DashboardStats = ({ projects = [], grants = [], hearings = [] }) => {
  return (
    <div className="stats-container">

      <StatCard
        title="Total Projects"
        value={projects.length}
        icon="bi-journal-text"
      />

      <StatCard
        title="Total Grants"
        value={grants.length}
        icon="bi-cash-stack"
      />

      <StatCard
        title="Total Hearings"
        value={hearings.length}
        icon="bi-calendar-event"
      />

    </div>
  );
};

export default DashboardStats;