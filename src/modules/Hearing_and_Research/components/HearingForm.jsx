import { useState } from "react";
import { toast } from "react-toastify";

const HearingForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    caseId: "",
    scheduleTime: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(form);

      toast.success("Hearing Scheduled ✅");

      setForm({
        caseId: "",
        scheduleTime: ""
      });

    } catch (error) {
      toast.error("Failed to schedule hearing ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">

      <div className="col-md-3">
        <input
          className="form-control"
          type="number"
          placeholder="Case ID"
          value={form.caseId}
          onChange={(e) =>
            setForm({ ...form, caseId: e.target.value })
          }
          required
        />
      </div>

      <div className="col-md-3">
        <input
          className="form-control"
          type="datetime-local"
          value={form.scheduleTime}
          onChange={(e) =>
            setForm({ ...form, scheduleTime: e.target.value })
          }
          required
        />
      </div>

      <div className="col-md-2">
        <button className="btn btn-primary w-100">
          Schedule
        </button>
      </div>

    </form>
  );
};

export default HearingForm;