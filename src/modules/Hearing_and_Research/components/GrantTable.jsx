// const GrantTable = ({ grants }) => {
//   return (
//     <table className="table table-bordered table-striped">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Researcher</th>
//           <th>Project</th>
//           <th>Status</th>
//         </tr>
//       </thead>

//       <tbody>
//         {grants.map((g) => (
//           <tr key={g.id}>
//             <td>{g.id}</td>
//             <td>{g.researcherId}</td>
//             <td>{g.project?.id}</td>
//             <td>
//               <span
//                 className={`badge ${
//                   g.status === "APPROVED"
//                     ? "bg-success"
//                     : g.status === "REJECTED"
//                     ? "bg-danger"
//                     : g.status === "UNDER_REVIEW"
//                     ? "bg-info text-dark"
//                     : "bg-warning text-dark"
//                 }`}
//               >
//                 {g.status}
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default GrantTable;


//2nd Part Tried
// import * as researchService from "../../../services/researchService";

// const GrantTable = ({ grants, loadGrants }) => {

//   // ✅ MAP BACKEND → UI LABEL
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "ALLOCATED": return "SUBMITTED";
//       case "DISBURSED": return "APPROVED";
//       case "CANCELLED": return "REJECTED";
//       default: return status;
//     }
//   };

//   // ✅ MAP COLORS BASED ON BACKEND VALUES
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "DISBURSED":
//         return "bg-success"; // ✅ APPROVED
//       case "CANCELLED":
//         return "bg-danger"; // ✅ REJECTED
//       case "ALLOCATED":
//         return "bg-warning text-dark"; // ✅ SUBMITTED
//       default:
//         return "bg-secondary";
//     }
//   };

//   // ✅ APPROVE FUNCTION
//   const handleApprove = async (id) => {
//     try {
//       await researchService.updateGrantStatus(id, "DISBURSED");
//       loadGrants();
//     } catch (err) {
//       console.error("Approve error:", err);
//     }
//   };

//   // ✅ REJECT FUNCTION
//   const handleReject = async (id) => {
//     try {
//       await researchService.updateGrantStatus(id, "CANCELLED");
//       loadGrants();
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   return (
//     <table className="table table-bordered table-striped">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Researcher</th>
//           <th>Project</th>
//           <th>Status</th>
//           <th>Action</th> {/* ✅ NEW COLUMN */}
//         </tr>
//       </thead>

//       <tbody>
//         {grants.map((g) => (
//           <tr key={g.id}>
//             <td>{g.id}</td>
//             <td>{g.researcherId}</td>
//             <td>{g.project?.id}</td>

//             {/* ✅ STATUS */}
//             <td>
//               <span className={`badge ${getStatusClass(g.status)}`}>
//                 {getStatusLabel(g.status)}
//               </span>
//             </td>

//             {/* ✅ ACTION BUTTONS */}
//             <td>
//               {g.status === "ALLOCATED" && (
//                 <>
//                   <button
//                     className="btn btn-sm btn-success me-2"
//                     onClick={() => handleApprove(g.id)}
//                   >
//                     Approve
//                   </button>

//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleReject(g.id)}
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}
//             </td>

//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default GrantTable;

import * as researchService from "../../../services/researchService";

const GrantTable = ({ grants, loadGrants }) => {

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-success";
      case "REJECTED":
        return "bg-danger";
      case "SUBMITTED":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  // ✅ FIXED APPROVE
  const handleApprove = async (id) => {
    try {
      console.log("Approve:", id);

      // ✅ ✅ SEND CORRECT VALUE
      await researchService.updateGrantStatus(id, "APPROVED");

      await loadGrants();

    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  // ✅ FIXED REJECT
  const handleReject = async (id) => {
    try {
      console.log("Reject:", id);

      // ✅ ✅ SEND CORRECT VALUE
      await researchService.updateGrantStatus(id, "REJECTED");

      await loadGrants();

    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Researcher</th>
          <th>Project</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {grants.map((g) => (
          <tr key={g.id}>
            <td>{g.id}</td>
            <td>{g.researcherId}</td>
            <td>{g.project?.id}</td>

            <td>
              <span className={`badge ${getStatusClass(g.status)}`}>
                {g.status}
              </span>
            </td>

            <td>
              {g.status === "SUBMITTED" && (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(g.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(g.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GrantTable;