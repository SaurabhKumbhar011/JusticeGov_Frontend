// import { useState } from "react";

// const HearingTable = ({ hearings, onUpdateStatus }) => {
//   const [search, setSearch] = useState("");

//   const filtered = hearings.filter((h) =>
//     String(h.caseId).includes(search)
//   );

//   return (
//     <div>

//       {/* ✅ Search */}
//       <input
//         className="form-control mb-3"
//         placeholder="Search by Case ID..."
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Case ID</th>
//             <th>Schedule Time</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((h) => (
//             <tr key={h.id}>
//               <td>{h.id}</td>
//               <td>{h.caseId}</td>
//               <td>{h.scheduleTime}</td>
//               <td>{h.status}</td>

//               <td>
//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={() =>
//                     onUpdateStatus(h.id, "COMPLETED")
//                   }
//                 >
//                   Complete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default HearingTable;

//2nd Part Tried
// import { useState } from "react";

// const HearingTable = ({
//   hearings,
//   onSaveProceedings,
//   onUpdateStatus
// }) => {
//   const [search, setSearch] = useState("");
//   const [notes, setNotes] = useState({});

//   const filtered = hearings.filter((h) =>
//     String(h.caseId).includes(search)
//   );

//   return (
//     <div>

//       <input
//         className="form-control mb-3"
//         placeholder="Search by Case ID..."
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Case ID</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Proceedings</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((h) => (
//             <tr key={h.id}>
//               <td>{h.id}</td>
//               <td>{h.caseId}</td>
//               <td>{h.date} {h.time}</td>
//               <td>{h.status}</td>

//               <td>
//                 {h.proceedings ? (
//                   <textarea
//                     value={h.proceedings.notes}
//                     disabled
//                     className="form-control"
//                   />
//                 ) : (
//                   <>
//                     <textarea
//                       className="form-control mb-1"
//                       onChange={(e) =>
//                         setNotes({ ...notes, [h.id]: e.target.value })
//                       }
//                     />
//                     <button
//                       className="btn btn-sm btn-info"
//                       onClick={() =>
//                         onSaveProceedings(h.id, notes[h.id])
//                       }
//                     >
//                       Save Proceedings
//                     </button>
//                   </>
//                 )}
//               </td>

//               <td>
//                 {h.status === "SCHEDULED" && (
//                   <>
//                     <button
//                       className="btn btn-warning btn-sm me-2"
//                       onClick={() => onUpdateStatus(h.id, "ADJOURNED")}
//                     >
//                       Adjourn
//                     </button>

//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={() => onUpdateStatus(h.id, "COMPLETED")}
//                     >
//                       Complete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default HearingTable;

// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { useHearings } from "../../../hooks/useHearings";

// import HearingForm from "../components/HearingForm";
// import HearingTable from "../components/HearingTable";
// import DashboardStats from "../../../components/stats/DashboardStats";

// const Hearings = () => {
//   const { caseId } = useParams();

//   const {
//     hearings,
//     loadHearings,
//     scheduleHearing,
//     recordProceedings,
//     updateHearingStatus
//   } = useHearings();

//   // ✅ Load hearing history (by case)
//   useEffect(() => {
//     const id = caseId || 1; // fallback for testing
//     loadHearings(id);
//   }, [caseId]);

//   return (
//     <div className="dashboard container-fluid">

//       {/* ✅ Stats */}
//       <DashboardStats hearings={hearings} projects={[]} grants={[]} />

//       <h2 className="mb-4">
//         <i className="bi bi-calendar-event me-2"></i>
//         Hearing Management
//       </h2>

//       {/* ✅ Schedule Hearing */}
//       <div className="card-custom">
//         <h5 className="section-title">Schedule Hearing</h5>

//         <HearingForm
//           onSubmit={(data) =>
//             scheduleHearing({
//               ...data,
//               caseId: caseId ? Number(caseId) : data.caseId
//             })
//           }
//         />
//       </div>

//       {/* ✅ Hearing History */}
//       <div className="card-custom">
//         <h5 className="section-title">Hearing History</h5>

//         {hearings.length === 0 ? (
//           <p className="text-muted">No hearings found</p>
//         ) : (
//           <HearingTable
//             hearings={hearings}
//             onSaveProceedings={recordProceedings}
//             onUpdateStatus={updateHearingStatus}
//           />
//         )}
//       </div>

//     </div>
//   );
// };

// export default Hearings;

// import { useState, useMemo } from "react";

// const HearingTable = ({
//   hearings,
//   onSaveProceedings,
//   onUpdateStatus
// }) => {
//   const [search, setSearch] = useState("");
//   const [notes, setNotes] = useState({});

//   // ✅ Memoized filtering (prevents performance issues)
//   const filtered = useMemo(() => {
//     return hearings.filter((h) =>
//       String(h.caseId).includes(search)
//     );
//   }, [hearings, search]);

//   return (
//     <div>

//       {/* ✅ Search */}
//       <input
//         className="form-control mb-3"
//         placeholder="Search by Case ID..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table className="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Case ID</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Proceedings</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map((h) => (
//             <tr key={h.id}>
//               <td>{h.id}</td>
//               <td>{h.caseId}</td>
//               <td>
//                 {h.date} {h.time}
//               </td>
//               <td>{h.status}</td>

//               {/* ✅ Proceedings (Permanent after save) */}
//               <td>
//                 {h.proceedings ? (
//                   <textarea
//                     value={h.proceedings.notes}
//                     disabled
//                     className="form-control"
//                   />
//                 ) : (
//                   <>
//                     <textarea
//                       className="form-control mb-1"
//                       onChange={(e) =>
//                         setNotes({
//                           ...notes,
//                           [h.id]: e.target.value
//                         })
//                       }
//                     />
//                     <button
//                       className="btn btn-sm btn-info"
//                       onClick={() =>
//                         onSaveProceedings(h.id, notes[h.id])
//                       }
//                     >
//                       Save Proceedings
//                     </button>
//                   </>
//                 )}
//               </td>

//               {/* ✅ Status Actions */}
//               <td>
//                 {h.status === "SCHEDULED" && (
//                   <>
//                     <button
//                       className="btn btn-warning btn-sm me-2"
//                       onClick={() =>
//                         onUpdateStatus(h.id, "ADJOURNED")
//                       }
//                     >
//                       Adjourn
//                     </button>

//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={() =>
//                         onUpdateStatus(h.id, "COMPLETED")
//                       }
//                     >
//                       Complete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default HearingTable;

import { useState, useMemo, useEffect } from "react";

const HearingTable = ({
  hearings,
  onSaveProceedings,
  onUpdateStatus
}) => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState({});
  
  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this number to show more or fewer rows per page

  // ✅ Memoized filtering (prevents performance issues)
  const filtered = useMemo(() => {
    return hearings.filter((h) =>
      String(h.caseId).includes(search)
    );
  }, [hearings, search]);

  // ✅ Reset to page 1 whenever the user types in the search box
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ✅ Pagination Math: Calculate which items to show on the current page
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // We slice the array so it only shows the specific 5 items for this page
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>

      {/* ✅ Search */}
      <input
        className="form-control mb-3"
        placeholder="Search by Case ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark" style={{ backgroundColor: "#0A192F" }}>
            <tr>
              <th>ID</th>
              <th>Case ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Proceedings</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Make sure we are mapping over 'currentItems', NOT 'filtered' */}
            {currentItems.length > 0 ? (
              currentItems.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.caseId}</td>
                  <td>
                    {h.dateTime
                      ? new Date(h.dateTime).toLocaleString()
                      : `${h.date || ""} ${h.time || ""}`}
                  </td>
                  <td>
                    <span className={`badge ${h.status === 'SCHEDULED' ? 'bg-primary' : h.status === 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {h.status}
                    </span>
                  </td>

                  {/* ✅ Proceedings */}
                  <td>
                    {h.proceedings ? (
                      <textarea
                        value={h.proceedings.notes}
                        disabled
                        className="form-control"
                        rows="2"
                      />
                    ) : (
                      <>
                        <textarea
                          className="form-control mb-1"
                          rows="2"
                          onChange={(e) =>
                            setNotes({
                              ...notes,
                              [h.id]: e.target.value
                            })
                          }
                        />
                        <button
                          className="btn btn-sm btn-info w-100 mt-1"
                          onClick={() =>
                            onSaveProceedings(h.id, notes[h.id])
                          }
                        >
                          Save Notes
                        </button>
                      </>
                    )}
                  </td>

                  {/* ✅ Status Actions */}
                  <td>
                    {h.status === "SCHEDULED" && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            onUpdateStatus(h.id, "ADJOURNED")
                          }
                        >
                          Adjourn
                        </button>

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            onUpdateStatus(h.id, "COMPLETED")
                          }
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No hearings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls (Next / Prev) */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
          
          <span className="text-muted fw-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}

    </div>
  );
};

export default HearingTable;