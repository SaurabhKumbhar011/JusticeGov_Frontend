import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["DRAFT", "ISSUED", "REVISED", "VACATED"];

export default function JudgementForm({
  selected,
  defaultCaseId,
  onCreate,
  onUpdate,
}) {
  const [form, setForm] = useState({
    caseId: defaultCaseId || "",
    summary: "",
    date: "",
    status: "DRAFT",
  });

  useEffect(() => {
    if (selected) {
      setForm({
        caseId: selected.caseId,
        summary: selected.summary,
        date: selected.date,
        status: selected.status,
      });
    } else {
      // Reset form if modal is opened for a new record
      setForm({
        caseId: defaultCaseId || "",
        summary: "",
        date: "",
        status: "DRAFT",
      });
    }
  }, [selected, defaultCaseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const payload = {
      caseId: Number(form.caseId),
      summary: form.summary,
      date: form.date,
      status: form.status,
    };

    if (selected) {
      onUpdate(selected.id, payload);
    } else {
      onCreate(payload);
    }
  };

  return (
    <div className="modal fade" id="judgementModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4">
          
          {/* Header */}
          <div className="modal-header border-bottom-0 pt-4 px-4 pb-2">
            <div>
              <h5 className="modal-title fw-bold fs-4 text-dark">
                {selected ? "Update Judgement" : "Create New Judgement"}
              </h5>
              <p className="text-muted small mb-0">Enter the legal details of the case outcome below.</p>
            </div>
            <button className="btn-close shadow-none" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body px-4 py-3">
            <div className="row g-4">
              
              {/* Row 1: Case ID and Status */}
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small text-uppercase">Case ID</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">#</span>
                  <input
                    type="number"
                    className="form-control border-start-0 bg-light-focus"
                    name="caseId"
                    placeholder="e.g. 1024"
                    value={form.caseId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small text-uppercase">Current Status</label>
                <select
                  className="form-select bg-light-focus"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Row 2: Date */}
              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary small text-uppercase">Judgement Date</label>
                <input
                  type="date"
                  className="form-control bg-light-focus"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Row 3: Summary (Full Width) */}
              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small text-uppercase">Judgement Summary</label>
                <textarea
                  className="form-control bg-light-focus"
                  name="summary"
                  rows={5}
                  placeholder="Describe the final ruling and sentencing details..."
                  value={form.summary}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top-0 px-4 pb-4 pt-2">
            <button
              className="btn btn-light px-4 py-2 rounded-3 fw-semibold text-secondary me-2"
              data-bs-dismiss="modal"
            >
              Discard
            </button>
            <button
              className="btn btn-primary px-5 py-2 rounded-3 fw-semibold shadow-sm"
              onClick={handleSubmit}
              data-bs-dismiss="modal"
            >
              {selected ? "Update Record" : "Save Judgement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}