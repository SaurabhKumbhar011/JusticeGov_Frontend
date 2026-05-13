import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Judgements from "../modules/judgment-order/pages/Judgements";
import CourtOrders from "../modules/judgment-order/pages/CourtOrders";

import Hearings from "../modules/Hearing_and_Research/pages/Hearings";
import ResearchDashboard from "../modules/Hearing_and_Research/pages/ResearchDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Judgement Module */}
        <Route path="/judgements" element={<Judgements />} />
        <Route path="/court-orders" element={<CourtOrders />} />

        {/* Hearing & Research Module */}
        <Route path="/hearings" element={<Hearings />} />
        <Route path="/hearings/:caseId" element={<Hearings />} />
        <Route path="/research" element={<ResearchDashboard />} />
      </Route>
    </Routes>
  );
}