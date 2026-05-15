// import { useState } from "react";
// import * as hearingService from "../services/hearingService";

// export const useHearings = () => {
//   const [hearings, setHearings] = useState([]);

//   const loadHearings = async (caseId) => {
//     const data = await hearingService.getHearingHistory(caseId);
//     setHearings(data);
//   };

//   const addHearing = async (hearing) => {
//     const newHearing = await hearingService.scheduleHearing(hearing);
//     setHearings(prev => [...prev, newHearing]);
//   };

//   const updateStatus = async (id, status) => {
//     const updated = await hearingService.updateHearingStatus(id, status);
//     setHearings(prev =>
//       prev.map(h => (h.id === id ? updated : h))
//     );
//   };

//   return {
//     hearings,
//     loadHearings,
//     addHearing,
//     updateStatus
//   };
// };

import { useState } from "react";
import { toast } from "react-toastify";
import * as hearingService from "../services/hearingService";

export const useHearings = () => {
  const [hearings, setHearings] = useState([]);
  const [currentCaseId, setCurrentCaseId] = useState(null);

  // ✅ Load hearing history
  const loadHearings = async (caseId) => {
    try {
      setCurrentCaseId(caseId);
      const data = await hearingService.getHearingHistory(caseId);
      setHearings(data);
    } catch (err) {
      console.error("API ERROR (loadHearings):", err.response || err);
      toast.error("Failed to load hearing history");
    }
  };

  // ✅ Schedule hearing (FIXED PAYLOAD)
  const scheduleHearing = async (hearing) => {
    try {
      await hearingService.scheduleHearing(hearing);
      toast.success("Hearing scheduled ✅");
      loadHearings(hearing.caseId);
    } catch (err) {
      console.error("API ERROR (scheduleHearing):", err.response || err);
      toast.error(
        err.response?.data?.message || "Failed to schedule hearing"
      );
      throw err;
    }
  };

  // ✅ Record proceedings (permanent)
  const recordProceedings = async (id, notes) => {
    try {
      await hearingService.recordProceedings(id, notes);
      toast.success("Proceedings recorded ✅");
      loadHearings(currentCaseId);
    } catch (err) {
      console.error("API ERROR (recordProceedings):", err.response || err);
      toast.error("Failed to record proceedings");
    }
  };

  // ✅ Update status (Adjourned / Completed)
  const updateHearingStatus = async (id, status) => {
    try {
      await hearingService.updateHearingStatus(id, status);
      toast.success(`Hearing ${status.toLowerCase()} ✅`);
      loadHearings(currentCaseId);
    } catch (err) {
      console.error("API ERROR (updateHearingStatus):", err.response || err);
      toast.error("Failed to update hearing status");
    }
  };

  return {
    hearings,
    loadHearings,
    scheduleHearing,
    recordProceedings,
    updateHearingStatus
  };
};