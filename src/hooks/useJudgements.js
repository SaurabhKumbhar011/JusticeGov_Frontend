// import { useEffect, useState } from 'react';
// import { judgementService } from '../services/judgementService';

// export default function useJudgements(caseId) {
//   const [judgements, setJudgements] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchJudgements = async () => {
//     if (!caseId) return;
//     setLoading(true);
//     try {
//       const res = await judgementService.getByCase(caseId);
//       setJudgements(res.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createJudgement = async (data) => {
//     await judgementService.create(data);
//     fetchJudgements();
//   };

//   const updateJudgement = async (id, data) => {
//     await judgementService.update(id, data);
//     fetchJudgements();
//   };

//   const deleteJudgement = async (id) => {
//     await judgementService.remove(id);
//     fetchJudgements();
//   };

//   const stats = {
//     total: judgements.length,
//     plaintiff: judgements.filter(j => j.status === 'PLAINTIFF_WIN').length,
//     defendant: judgements.filter(j => j.status === 'DEFENDANT_WIN').length,
//     settlements: judgements.filter(j => j.status === 'SETTLED').length
//   };

//   useEffect(() => {
//     fetchJudgements();
//   }, [caseId]);

//   return {
//     judgements,
//     loading,
//     stats,
//     createJudgement,
//     updateJudgement,
//     deleteJudgement
//   };
// }

import { useEffect, useState, useCallback } from "react";
import { judgementService } from "../services/judgementService";

export default function useJudgements(caseId) {
  const [judgements, setJudgements] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH ONLY LOGGED‑IN JUDGE'S JUDGEMENTS
  const fetchJudgements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await judgementService.getMyJudgements(caseId);
      setJudgements(res.data || []);
    } catch (err) {
      console.error("Failed to fetch judgements", err);
      setJudgements([]);
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchJudgements();
  }, [fetchJudgements]);

  // ✅ CREATE → AUTO REFRESH
  const createJudgement = async (data) => {
    await judgementService.create(data);
    fetchJudgements();
  };

  // ✅ UPDATE → AUTO REFRESH
  const updateJudgement = async (id, data) => {
    await judgementService.update(id, data);
    fetchJudgements();
  };

  // ✅ DELETE → AUTO REFRESH
  const deleteJudgement = async (id) => {
    await judgementService.remove(id);
    fetchJudgements();
  };

  // ✅ STATS (BASED ON FILTERED DATA)
  const stats = {
    total: judgements.length,
    plaintiff: judgements.filter(j => j.status === "PLAINTIFF_WIN").length,
    defendant: judgements.filter(j => j.status === "DEFENDANT_WIN").length,
    settlements: judgements.filter(j => j.status === "SETTLED").length,
  };

  return {
    judgements,
    loading,
    stats,
    createJudgement,
    updateJudgement,
    deleteJudgement,
  };
}