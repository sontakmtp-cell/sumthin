import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Page imports
import LoginRegister from "./pages/login-register";
import DashboardOverview from "./pages/dashboard-overview";
import KanbanBoard from "./pages/kanban-board";
import SprintPlanning from "./pages/sprint-planning";
import TaskDetail from "./pages/task-detail";
import AnalyticsDashboard from "./pages/analytics-dashboard";
import TeamManagement from "./pages/team-management";
import CraneSpecifications from "./pages/crane-specifications";
import LoadCalculations from "./pages/load-calculations";
import SafetyAnalysisDashboard from "./pages/safety-analysis-dashboard";
import BridgeCrane from "./pages/bridge-crane";
import GantryCrane from "./pages/gantry-crane";

// Product pages imports
import TechnicalBooks from "./pages/products/technical-books";
import OnlineCourses from "./pages/products/online-courses";
import TechnicalSoftware from "./pages/products/technical-software";
import Suppliers from "./pages/products/suppliers";

// Drawing Services import
import DrawingServices from "./pages/drawing-services";

// Recruitment import
import Recruitment from "./pages/recruitment";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/dashboard-overview" element={<DashboardOverview />} />
          <Route path="/kanban-board" element={<KanbanBoard />} />
          <Route path="/sprint-planning" element={<SprintPlanning />} />
          <Route path="/task-detail" element={<TaskDetail />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/crane-specifications" element={<CraneSpecifications />} />
          <Route path="/bridge-crane" element={<BridgeCrane />} />
          <Route path="/gantry-crane" element={<GantryCrane />} />
          <Route path="/load-calculations" element={<LoadCalculations />} />
          <Route path="/safety-analysis-dashboard" element={<SafetyAnalysisDashboard />} />
          
          {/* Product routes */}
          <Route path="/products/technical-books" element={<TechnicalBooks />} />
          <Route path="/products/online-courses" element={<OnlineCourses />} />
          <Route path="/products/technical-software" element={<TechnicalSoftware />} />
          <Route path="/products/suppliers" element={<Suppliers />} />
          
          {/* Drawing Services route */}
          <Route path="/drawing-services" element={<DrawingServices />} />
          
          {/* Recruitment route */}
          <Route path="/recruitment" element={<Recruitment />} />
          
          <Route path="/" element={<LoginRegister />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;