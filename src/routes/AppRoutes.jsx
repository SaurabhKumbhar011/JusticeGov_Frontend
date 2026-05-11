import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Judgements from "../modules/judgment-order/pages/Judgements";
import CourtOrders from "../modules/judgment-order/pages/CourtOrders";
import Reports from "../modules/Report-Analysis/pages/reports";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Wrap all protected routes inside DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/judgements" element={<Judgements />} />
        <Route path="/court-orders" element={<CourtOrders />} />
        <Route path="/reports" element={<Reports />} />
        {/* Add more routes here if needed */}
      </Route>
    </Routes>
  );
}
