const GrantTable = ({ grants }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Researcher</th>
          <th>Project</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {grants.map((g) => (
          <tr key={g.id}>
            <td>{g.id}</td>
            <td>{g.researcherId}</td>
            <td>{g.project?.id}</td>
            <td>
              <span
                className={`badge ${
                  g.status === "APPROVED"
                    ? "bg-success"
                    : g.status === "REJECTED"
                    ? "bg-danger"
                    : g.status === "UNDER_REVIEW"
                    ? "bg-info text-dark"
                    : "bg-warning text-dark"
                }`}
              >
                {g.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GrantTable;