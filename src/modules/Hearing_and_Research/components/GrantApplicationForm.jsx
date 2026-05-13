import { useState } from "react";

const GrantApplicationForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    researcherId: "",
    projectId: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      researcherId: form.researcherId,
      project: { id: form.projectId }
    });

    setForm({
      researcherId: "",
      projectId: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">

      <div className="col-md-3">
        <input
          className="form-control"
          type="number"
          placeholder="Researcher ID"
          value={form.researcherId}
          onChange={(e) =>
            setForm({ ...form, researcherId: e.target.value })
          }
          required
        />
      </div>

      <div className="col-md-3">
        <input
          className="form-control"
          type="number"
          placeholder="Project ID"
          value={form.projectId}
          onChange={(e) =>
            setForm({ ...form, projectId: e.target.value })
          }
          required
        />
      </div>

      <div className="col-md-2">
        <button className="btn btn-primary w-100">
          Apply
        </button>
      </div>

    </form>
  );
};

export default GrantApplicationForm;