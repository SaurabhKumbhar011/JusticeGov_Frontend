// import { useEffect, useState } from "react";
// import StatCard from "../../../components/stats/StatCard";

// import { getAllCases } from "../../../services/caseService";
// import { judgementService } from "../../../services/judgementService";
// import courtOrderService from "../../../services/courtOrderService";

// export default function JudgeDashboard() {
//     const [cases, setCases] = useState([]);
//     const [myCases, setMyCases] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function loadDashboard() {
//             try {
//                 // ✅ 1. Fetch all data
//                 const allCases = await getAllCases(); // returns array
//                 const judgementResponse = await judgementService.getMyJudgements();
//                 const orders = await courtOrderService.getMyOrders();

//                 // ✅ 2. Normalize judgements (VERY IMPORTANT)
//                 const judgements = Array.isArray(judgementResponse)
//                     ? judgementResponse
//                     : judgementResponse?.data || [];

//                 console.log("✅ Cases:", allCases);
//                 console.log("✅ Judgements:", judgements);
//                 console.log("✅ Orders:", orders);

//                 // ✅ 3. Build handled case IDs
//                 const handledCaseIds = new Set(
//                     [
//                         ...judgements.map(j => Number(j.caseId)),
//                         ...orders.map(o => Number(o.caseId)),
//                     ].filter(id => !isNaN(id))
//                 );

//                 console.log("✅ Handled Case IDs:", [...handledCaseIds]);

//                 // ✅ 4. Match with CaseResponseDTO.id
//                 const filteredCases = allCases.filter(c =>
//                     handledCaseIds.has(Number(c.id))
//                 );

//                 console.log("✅ Filtered Cases:", filteredCases);

//                 setCases(allCases);
//                 setMyCases(filteredCases);

//             } catch (error) {
//                 console.error("❌ Dashboard error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadDashboard();
//     }, []);

//     return (
//         <div className="container-fluid py-4 px-4">
//             <h2 className="fw-bold mb-3">Judge Dashboard</h2>

//             {loading && <p>Loading cases...</p>}

//             {/* ✅ STATS */}
//             {!loading && (
//                 <div className="row g-4 mb-4">
//                     <div className="col-md-6">
//                         <StatCard
//                             title="Total Filed Cases"
//                             value={cases.length}
//                             icon="bi-person-badge-fill" // Changed to Badge/ID
//                             color="success"
//                         />
//                     </div>

//                     <div className="col-md-6">
//                         <StatCard
//                             title="Cases Handled by You"
//                             value={myCases.length}
//                             icon="bi-clock-history" // Changed to Clock
//                             color="warning"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* ✅ TABLE */}
//             {!loading && myCases.length > 0 && (
//                 <div className="card mt-4">
//                     <div className="card-header bg-white">
//                         <h5 className="fw-bold mb-0">Case Details</h5>
//                     </div>

//                     <div className="card-body p-0">
//                         <table className="table table-hover mb-0">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th>Case ID</th>
//                                     <th>Title</th>
//                                     <th>Description</th>
//                                     <th>Filed Date</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {myCases.map(c => (
//                                     <tr key={c.id}>
//                                         <td>{c.id}</td>
//                                         <td>{c.title}</td>
//                                         <td>{c.description}</td>
//                                         <td>
//                                             {c.filedDate
//                                                 ? new Date(c.filedDate).toLocaleDateString()
//                                                 : "-"}
//                                         </td>
//                                         <td>
//                                             <span className="badge bg-info">
//                                                 {c.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import StatCard from "../../../components/stats/StatCard";
import { getAllCases } from "../../../services/caseService";
import { judgementService } from "../../../services/judgementService";
import courtOrderService from "../../../services/courtOrderService";

export default function JudgeDashboard() {
    const [cases, setCases] = useState([]);
    const [myCases, setMyCases] = useState([]);
    const [allJudgements, setAllJudgements] = useState([]); // Store all for lookup
    const [allOrders, setAllOrders] = useState([]);           // Store all for lookup
    const [loading, setLoading] = useState(true);
    
    // ✅ State for Modal
    const [selectedCaseDetails, setSelectedCaseDetails] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const allCases = await getAllCases();
                const judgementResponse = await judgementService.getMyJudgements();
                const orders = await courtOrderService.getMyOrders();

                const judgements = Array.isArray(judgementResponse) ? judgementResponse : judgementResponse?.data || [];
                
                // Build Handled IDs
                const handledCaseIds = new Set([
                    ...judgements.map(j => Number(j.caseId)),
                    ...orders.map(o => Number(o.caseId)),
                ].filter(id => !isNaN(id)));

                const filteredCases = allCases.filter(c => handledCaseIds.has(Number(c.id)));

                setCases(allCases);
                setMyCases(filteredCases);
                setAllJudgements(judgements); // ✅ Save for popup
                setAllOrders(orders);         // ✅ Save for popup
            } catch (error) {
                console.error("❌ Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    // ✅ Function to open popup
    const handleViewDetails = (caseItem) => {
        const linkedJudgement = allJudgements.find(j => Number(j.caseId) === Number(caseItem.id));
        const linkedOrder = allOrders.find(o => Number(o.caseId) === Number(caseItem.id));
        
        setSelectedCaseDetails({
            case: caseItem,
            judgement: linkedJudgement,
            order: linkedOrder
        });
    };

    return (
        <div className="container-fluid py-4 px-4">
            <h2 className="fw-bold mb-3 text-dark">Judge Dashboard</h2>

            {/* ✅ STATS */}
            {!loading && (
                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <StatCard title="Total Filed Cases" value={cases.length} icon="bi-person-badge-fill" color="success" />
                    </div>
                    <div className="col-md-6">
                        <StatCard title="Cases Handled by You" value={myCases.length} icon="bi-clock-history" color="warning" />
                    </div>
                </div>
            )}

            {/* ✅ TABLE */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3">
                    <h5 className="fw-bold mb-0">Case Details</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Case ID</th>
                                <th>Title</th>
                                <th>Filed Date</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCases.map(c => (
                                <tr key={c.id} style={{ cursor: 'pointer' }}>
                                    <td>#{c.id}</td>
                                    <td className="fw-semibold">{c.title}</td>
                                    <td>{c.filedDate ? new Date(c.filedDate).toLocaleDateString() : "-"}</td>
                                    <td><span className="badge bg-info-subtle text-info border border-info-subtle">{c.status}</span></td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-primary px-3 rounded-pill" onClick={() => handleViewDetails(c)}>
                                            View Legal Summary
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ POPUP MODAL (Basic Bootstrap) */}
            {selectedCaseDetails && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow rounded-4">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="fw-bold">Legal Overview: Case #{selectedCaseDetails.case.id}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedCaseDetails(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-4">
                                    <h6 className="text-primary fw-bold small text-uppercase">Current Judgement</h6>
                                    {selectedCaseDetails.judgement ? (
                                        <div className="p-3 bg-light rounded-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="badge bg-dark">{selectedCaseDetails.judgement.status}</span>
                                                <small className="text-muted">{selectedCaseDetails.judgement.date}</small>
                                            </div>
                                            <p className="small mb-0 text-dark">{selectedCaseDetails.judgement.summary}</p>
                                        </div>
                                    ) : <p className="text-muted small">No judgement recorded yet.</p>}
                                </div>

                                <div>
                                    <h6 className="text-warning fw-bold small text-uppercase">Court Order Status</h6>
                                    {selectedCaseDetails.order ? (
                                        <div className="p-3 border rounded-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className={`badge ${selectedCaseDetails.order.status === 'COMPLIED' ? 'bg-success' : 'bg-warning'}`}>
                                                    {selectedCaseDetails.order.status}
                                                </span>
                                            </div>
                                            <p className="small mb-0">{selectedCaseDetails.order.description}</p>
                                        </div>
                                    ) : <p className="text-muted small">No court orders issued yet.</p>}
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button className="btn btn-secondary rounded-3" onClick={() => setSelectedCaseDetails(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}