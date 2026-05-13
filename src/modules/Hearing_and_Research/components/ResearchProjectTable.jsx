import { useState } from "react";

const ResearchProjectTable = ({ projects }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filteredProjects = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || p.status === statusFilter)
    );
  });

  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  const paginated = filteredProjects.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>

      {/* ✅ Search + Filter */}
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search by title..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-control"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* ✅ Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination */}
      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ResearchProjectTable;