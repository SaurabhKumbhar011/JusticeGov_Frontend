import { useState } from "react";

const HearingTable = ({ hearings, onUpdateStatus }) => {
  const [search, setSearch] = useState("");

  const filtered = hearings.filter((h) =>
    String(h.caseId).includes(search)
  );

  return (
    <div>

      {/* ✅ Search */}
      <input
        className="form-control mb-3"
        placeholder="Search by Case ID..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Case ID</th>
            <th>Schedule Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.caseId}</td>
              <td>{h.scheduleTime}</td>
              <td>{h.status}</td>

              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    onUpdateStatus(h.id, "COMPLETED")
                  }
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default HearingTable;