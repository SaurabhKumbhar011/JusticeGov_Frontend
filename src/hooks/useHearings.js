import { useState } from "react";
import * as hearingService from "../services/hearingService";

export const useHearings = () => {
  const [hearings, setHearings] = useState([]);

  const loadHearings = async (caseId) => {
    const data = await hearingService.getHearingHistory(caseId);
    setHearings(data);
  };

  const addHearing = async (hearing) => {
    const newHearing = await hearingService.scheduleHearing(hearing);
    setHearings(prev => [...prev, newHearing]);
  };

  const updateStatus = async (id, status) => {
    const updated = await hearingService.updateHearingStatus(id, status);
    setHearings(prev =>
      prev.map(h => (h.id === id ? updated : h))
    );
  };

  return {
    hearings,
    loadHearings,
    addHearing,
    updateStatus
  };
};