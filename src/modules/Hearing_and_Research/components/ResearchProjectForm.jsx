import { useState } from "react";
import { toast } from "react-toastify";

const ResearchProjectForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    researcherId: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ CORRECT PAYLOAD (matches your backend)
      await onSubmit({
        title: form.title,
        description: form.description,
        researcherId: Number(form.researcherId),
        startDate: form.startDate,
        endDate: form.endDate
      });

      // ✅ SUCCESS TOAST
      toast.success("Project Created Successfully ✅");

      // ✅ RESET FORM
      setForm({
        title: "",
        description: "",
        researcherId: "",
        startDate: "",
        endDate: ""
      });

    } catch (error) {
      console.error("Create Project Error:", error);

      // ✅ ERROR TOAST
      toast.error("Failed to create project ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">

      {/* ✅ TITLE */}
      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
      </div>

      {/* ✅ DESCRIPTION */}
      <div className="col-md-3">
        <textarea
          className="form-control"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </div>

      {/* ✅ RESEARCHER ID */}
      <div className="col-md-2">
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

      {/* ✅ START DATE */}
      <div className="col-md-2">
        <input
          className="form-control"
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />
      </div>

      {/* ✅ END DATE */}
      <div className="col-md-2">
        <input
          className="form-control"
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />
      </div>

      {/* ✅ SUBMIT BUTTON */}
      <div className="col-md-2">
        <button className="btn btn-primary w-100">
          Create Project
        </button>
      </div>

    </form>
  );
};

export default ResearchProjectForm;