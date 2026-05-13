import { useEffect, useState, useCallback, useMemo } from "react";
import { judgementService } from "../services/judgementService";

export default function useJudgements(caseId) {
  const [judgements, setJudgements] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // ✅ Mutation Wrappers
  const createJudgement = async (data) => {
    await judgementService.create(data);
    await fetchJudgements();
  };

  const updateJudgement = async (id, data) => {
    await judgementService.update(id, data);
    await fetchJudgements();
  };

  const deleteJudgement = async (id) => {
    await judgementService.remove(id);
    await fetchJudgements();
  };

  // ✅ DERIVED STATS: Matches the actual statuses in your screenshot
  const stats = useMemo(() => ({
    total: judgements.length,
    issued: judgements.filter(j => j.status === "ISSUED").length,
    vacated: judgements.filter(j => j.status === "VACATED").length,
    revised: judgements.filter(j => j.status === "REVISED").length,
  }), [judgements]);

  return {
    judgements,
    loading,
    stats,
    createJudgement,
    updateJudgement,
    deleteJudgement,
  };
}