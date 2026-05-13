// import { useEffect, useState } from "react";
// import StatCard from "../../../components/stats/StatCard";

// import { getAllCases } from "../../../services/caseService";
// import { judgementService } from "../../../services/judgementService";
// import { courtOrderService } from "../../../services/courtOrderService";
// import { useNavigate } from "react-router-dom";

// export default function JudgeDashboard() {
//   const [allCases, setAllCases] = useState([]);
//   const [myCases, setMyCases] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadDashboardData() {
//       try {
//         setLoading(true);

//         // ✅ Fetch data in parallel (FAST & CLEAN)
//         const [casesRes, judgementsRes, ordersRes] = await Promise.all([
//           getAllCases(),
//           judgementService.getMyJudgements(),
//           courtOrderService.getMyCourtOrders(),
//         ]);

//         // ✅ Extract case IDs handled by the logged-in judge
//         const handledCaseIds = new Set([
//           ...judgementsRes.data.map(j => j.caseId),
//           ...ordersRes.data.map(o => o.caseId),
//         ]);

//         // ✅ Filter judge-related cases
//         const filteredCases = casesRes.filter(c =>
//           handledCaseIds.has(c.caseid)
//         );

//         setAllCases(casesRes);
//         setMyCases(filteredCases);

//       } catch (error) {
//         console.error("Failed to load judge dashboard", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadDashboardData();
//   }, []);

//   return (
//     <div className="container-fluid py-4 px-4">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="fw-bold text-dark mb-1">Judge Dashboard</h2>
//         <p className="text-muted small mb-0">
//           <i className="bi bi-info-circle me-1"></i>
//           Overview of your judicial activity
//         </p>
//       </div>

//       {/* ✅ Stats Cards (REUSING StatCard) */}
//       <div className="row g-4 mb-4">
//         <div className="col-md-3">
//           <StatCard
//             title="Total Filed Cases"
//             value={allCases.length}
//             icon="bi-folder"
//             color="primary"
//           />
//         </div>

//         <div className="col-md-3">
//           <StatCard
//             title="Cases Handled by You"
//             value={myCases.length}
//             icon="bi-person-check"
//             color="success"
//           />
//         </div>

//         <div className="col-md-3">
//           <StatCard
//             title="Judgements Issued"
//             value={myCases.length} // logical approximation for now
//             icon="bi-gavel"
//             color="warning"
//           />
//         </div>

//         <div className="col-md-3">
//           <StatCard
//             title="Court Orders Passed"
//             value={myCases.length} // logical approximation for now
//             icon="bi-file-earmark-text"
//             color="secondary"
//           />
//         </div>
//       </div>

//       {/* ✅ My Active Cases Table */}
//       <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//         <div className="card-header bg-white py-3 border-bottom border-light">
//           <h5 className="mb-0 fw-bold text-dark">My Active Cases</h5>
//         </div>

//         <div className="card-body p-0 position-relative">
//           {loading && (
//             <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-50">
//               <div className="spinner-border spinner-border-sm text-primary"></div>
//             </div>
//           )}

//           {!loading && myCases.length === 0 && (
//             <div className="p-4 text-muted text-center">
//               No cases assigned to you yet.
//             </div>
//           )}

//           {!loading && myCases.length > 0 && (
//             <table className="table mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Case ID</th>
//                   <th>Title</th>
//                   <th>Status</th>
//                   <th className="text-end">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {myCases.map(c => (
//                   <tr key={c.caseid}>
//                     <td>{c.caseid}</td>
//                     <td>{c.title}</td>
//                     <td>
//                       <span className="badge bg-info-subtle text-info">
//                         {c.status}
//                       </span>
//                     </td>
//                     <td className="text-end">
//                       <button
//                         className="btn btn-sm btn-outline-primary me-2"
//                         onClick={() =>
//                           navigate("/judgeorder/judgements", {
//                             state: { caseId: c.caseid },
//                           })
//                         }
//                       >
//                         Judgements
//                       </button>

//                       <button
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() =>
//                           navigate("/judgeorder/court-orders", {
//                             state: { caseId: c.caseid },
//                           })
//                         }
//                       >
//                         Court Orders
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import StatCard from "../../../components/stats/StatCard";

import { getAllCases } from "../../../services/caseService";
import { judgementService } from "../../../services/judgementService";
import courtOrderService from "../../../services/courtOrderService";

export default function JudgeDashboard() {
  const [cases, setCases] = useState([]);
  const [myCases, setMyCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // ✅ Fetch backend data
        const allCases = await getAllCases();                     // CaseResponseDTO[]
        const judgements = await judgementService.getMyJudgements(); // ARRAY
        const orders = await courtOrderService.getMyOrders();       // ARRAY

        console.log("All cases:", allCases);
        console.log("Judgements:", judgements);
        console.log("Court orders:", orders);

        // ✅ Collect case IDs handled by this judge
        const handledCaseIds = new Set(
          [
            ...judgements.map(j => Number(j.case_id)),
            ...orders.map(o => Number(o.case_id)),
          ].filter(id => !isNaN(id))
        );

        console.log("Handled case IDs:", [...handledCaseIds]);

        // ✅ Match with CaseResponseDTO.id
        const filtered = allCases.filter(c =>
          handledCaseIds.has(Number(c.id))
        );

        setCases(allCases);
        setMyCases(filtered);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="container-fluid py-4 px-4">
      <h2 className="fw-bold mb-3">Judge Dashboard</h2>

      {loading && <p>Loading cases...</p>}

      {!loading && (
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <StatCard
              title="Total Filed Cases"
              value={cases.length}
              color="primary"
            />
          </div>

          <div className="col-md-3">
            <StatCard
              title="Cases Handled by You"
              value={myCases.length}
              color="success"
            />
          </div>
        </div>
      )}

      {!loading && myCases.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-white">
            <h5 className="fw-bold mb-0">Case Details</h5>
          </div>

          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Filed Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myCases.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>{new Date(c.filedDate).toLocaleDateString()}</td>
                    <td>
                      <span className="badge bg-info">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}