// import { useState } from "react";
// import { toast } from "react-toastify";

// const HearingForm = ({ onSubmit }) => {
//   const [form, setForm] = useState({
//     caseId: "",
//     scheduleTime: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await onSubmit(form);

//       toast.success("Hearing Scheduled ✅");

//       setForm({
//         caseId: "",
//         scheduleTime: ""
//       });

//     } catch (error) {
//       toast.error("Failed to schedule hearing ❌");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="row g-2">

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="number"
//           placeholder="Case ID"
//           value={form.caseId}
//           onChange={(e) =>
//             setForm({ ...form, caseId: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="datetime-local"
//           value={form.scheduleTime}
//           onChange={(e) =>
//             setForm({ ...form, scheduleTime: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-2">
//         <button className="btn btn-primary w-100">
//           Schedule
//         </button>
//       </div>

//     </form>
//   );
// };

// export default HearingForm;

//2nd Part Tried
// import { useState } from "react";
// import { toast } from "react-toastify";

// const HearingForm = ({ onSubmit }) => {
//   const [caseId, setCaseId] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await onSubmit({
//         caseId: Number(caseId), // ✅ Long
//         date,                  // ✅ LocalDate (yyyy-MM-dd)
//         time,                  // ✅ LocalTime (HH:mm)
//         status: "SCHEDULED"
//       });

//       setCaseId("");
//       setDate("");
//       setTime("");

//     } catch (err) {
//       console.error("Form submit error:", err.response || err);
//       toast.error("Failed to schedule hearing");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="row g-2">

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="number"
//           placeholder="Case ID"
//           value={caseId}
//           onChange={(e) => setCaseId(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-2">
//         <button className="btn btn-primary w-100">
//           Schedule
//         </button>
//       </div>

//     </form>
//   );
// };

// export default HearingForm;

//2nd Part Tried not Worked
// import { useState } from "react";
// import { toast } from "react-toastify";

// const HearingForm = ({ onSubmit }) => {
//   const [caseId, setCaseId] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Build ISO LocalDateTime
//       const dateTime = `${date}T${time}:00`;

//       await onSubmit({
//         caseId: Number(caseId),
//         judgeId: 53,               // demo-safe
//         dateTime,                  // ✅ REQUIRED BY BACKEND
//         status: "SCHEDULED"
//       });

//       toast.success("Hearing Scheduled ✅");

//       setCaseId("");
//       setDate("");
//       setTime("");

//     } catch (err) {
//       console.error("Schedule Hearing Error:", err.response || err);
//       toast.error(
//         err.response?.data?.message || "Failed to schedule hearing"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="row g-2 align-items-end">

//       <div className="col-md-3">
//         <label className="form-label">Case ID</label>
//         <input
//           className="form-control"
//           type="number"
//           value={caseId}
//           onChange={(e) => setCaseId(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <label className="form-label">Hearing Date</label>
//         <input
//           className="form-control"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <label className="form-label">Hearing Time</label>
//         <input
//           className="form-control"
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//         />
//       </div>

//       <div className="col-md-2">
//         <button className="btn btn-primary w-100">
//           Schedule
//         </button>
//       </div>

//     </form>
//   );
// };

// export default HearingForm;










// import { useState } from "react";

// const HearingForm = ({ onSubmit }) => {
//   const [form, setForm] = useState({
//     caseId: "",
//     judgeId: "",     // ✅ REQUIRED
//     date: "",
//     time: ""
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const dateTime = `${form.date}T${form.time}:00`;

//     onSubmit({
//       caseId: Number(form.caseId),
//       judgeId: Number(form.judgeId),
//       dateTime
//     });

//     setForm({
//       caseId: "",
//       judgeId: "",
//       date: "",
//       time: ""
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="row g-3">

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           placeholder="Case ID"
//           value={form.caseId}
//           onChange={(e) =>
//             setForm({ ...form, caseId: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           placeholder="Judge ID"
//           value={form.judgeId}
//           onChange={(e) =>
//             setForm({ ...form, judgeId: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           type="date"
//           className="form-control"
//           value={form.date}
//           onChange={(e) =>
//             setForm({ ...form, date: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           type="time"
//           className="form-control"
//           value={form.time}
//           onChange={(e) =>
//             setForm({ ...form, time: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="col-md-12">
//         <button className="btn btn-primary">
//           Schedule
//         </button>
//       </div>

//     </form>
//   );
// };

// export default HearingForm;


//Good Try
// import { useState } from "react";
// import { toast } from "react-toastify";

// const HearingForm = ({ onSubmit }) => {
//   const [form, setForm] = useState({
//     caseId: "",
//     judgeId: "",
//     date: "",
//     time: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Combine date and time into the exact ISO format Spring Boot expects (e.g., "2026-12-25T10:10:00")
//       const dateTime = `${form.date}T${form.time}:00`;

//       // ✅ Send exactly what worked in Postman
//       await onSubmit({
//         caseId: Number(form.caseId),
//         judgeId: Number(form.judgeId),
//         dateTime: dateTime,
//         status: "SCHEDULED" // Sent for safety, though your backend overrides it
//       });

//       toast.success("Hearing Scheduled Successfully! ✅");

//       // Clear the form after a successful submission
//       setForm({
//         caseId: "",
//         judgeId: "",
//         date: "",
//         time: ""
//       });

//     } catch (err) {
//       console.error("Schedule Hearing Error:", err.response || err);
//       toast.error(
//         err.response?.data?.message || "Failed to schedule hearing ❌"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="row g-3 align-items-center mb-4">
      
//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="number"
//           placeholder="Case ID"
//           value={form.caseId}
//           onChange={(e) => setForm({ ...form, caseId: e.target.value })}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           className="form-control"
//           type="number"
//           placeholder="Judge ID"
//           value={form.judgeId}
//           onChange={(e) => setForm({ ...form, judgeId: e.target.value })}
//           required
//         />
//       </div>

//       <div className="col-md-3">
//         <input
//           type="date"
//           className="form-control"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//       </div>

//       <div className="col-md-2">
//         <input
//           type="time"
//           className="form-control"
//           value={form.time}
//           onChange={(e) => setForm({ ...form, time: e.target.value })}
//           required
//         />
//       </div>

//       <div className="col-md-1">
//         <button 
//           type="submit" 
//           className="btn btn-primary w-100" 
//           style={{ backgroundColor: "#0A192F", borderColor: "#0A192F" }}
//         >
//           Schedule
//         </button>
//       </div>

//     </form>
//   );
// };

// export default HearingForm;

import { useState } from "react";
import { toast } from "react-toastify";

const HearingForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    caseId: "",
    judgeId: "",
    date: "",
    time: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dateTime = `${form.date}T${form.time}:00`;

      await onSubmit({
        caseId: Number(form.caseId),
        judgeId: Number(form.judgeId),
        dateTime: dateTime,
        status: "SCHEDULED" 
      });

      toast.success("Hearing Scheduled Successfully! ✅");

      setForm({
        caseId: "",
        judgeId: "",
        date: "",
        time: ""
      });

    } catch (err) {
      console.error("Schedule Hearing Error:", err.response || err);
      toast.error(
        err.response?.data?.message || "Failed to schedule hearing ❌"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      
      {/* Inputs get equal spacing (col-md-3 x 4 = 12 columns, a full row) */}
      <div className="col-md-3">
        <input
          className="form-control"
          type="number"
          placeholder="Case ID"
          value={form.caseId}
          onChange={(e) => setForm({ ...form, caseId: e.target.value })}
          required
        />
      </div>

      <div className="col-md-3">
        <input
          className="form-control"
          type="number"
          placeholder="Judge ID"
          value={form.judgeId}
          onChange={(e) => setForm({ ...form, judgeId: e.target.value })}
          required
        />
      </div>

      <div className="col-md-3">
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className="col-md-3">
        <input
          type="time"
          className="form-control"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
      </div>

      {/* Button is pushed to the next line and aligned to the right */}
      <div className="col-12 d-flex justify-content-end mt-3">
        <button 
          type="submit" 
          className="btn btn-primary px-4" 
          style={{ backgroundColor: "#0A192F", borderColor: "#0A192F" }}
        >
          Schedule Hearing
        </button>
      </div>

    </form>
  );
};

export default HearingForm;