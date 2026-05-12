import { useEffect, useState, useCallback, useMemo } from "react";
import courtOrderService from "../services/courtOrderService";

export default function useCourtOrders(caseId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Wrapped in useCallback to allow re-fetching after mutations
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const list = await courtOrderService.getMyOrders(caseId);
      setOrders(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to fetch court orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ✅ Mutation wrappers that trigger a refresh
  const createOrder = async (data) => {
    await courtOrderService.create(data);
    await fetchOrders();
  };

  const updateOrder = async (id, data) => {
    await courtOrderService.update(id, data);
    await fetchOrders();
  };

  const deleteOrder = async (id) => {
    await courtOrderService.remove(id);
    await fetchOrders();
  };

  // ✅ Derived State (Calculated on every render, no extra useEffect needed)
  const stats = useMemo(() => ({
    total: orders.length,
    issued: orders.filter(o => o.status === "ISSUED").length,
    complied: orders.filter(o => o.status === "COMPLIED").length,
    nonCompliant: orders.filter(o => o.status === "NON_COMPLIANT").length,
  }), [orders]);

  return {
    orders,
    loading,
    stats,
    createOrder,
    updateOrder,
    deleteOrder,
    refreshOrders: fetchOrders // Useful if you want a manual refresh button
  };
}