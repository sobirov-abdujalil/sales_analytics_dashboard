import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SalesManagerPerformanceDashboard from './pages/sales-manager-performance-dashboard';
import RealTimeSalesOperationsDashboard from './pages/real-time-sales-operations-dashboard';
import SalesAnalyticsDeepDiveDashboard from './pages/sales-analytics-deep-dive-dashboard';
import ExecutiveSalesOverviewDashboard from './pages/executive-sales-overview-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExecutiveSalesOverviewDashboard />} />
        <Route path="/sales-manager-performance-dashboard" element={<SalesManagerPerformanceDashboard />} />
        <Route path="/real-time-sales-operations-dashboard" element={<RealTimeSalesOperationsDashboard />} />
        <Route path="/sales-analytics-deep-dive-dashboard" element={<SalesAnalyticsDeepDiveDashboard />} />
        <Route path="/executive-sales-overview-dashboard" element={<ExecutiveSalesOverviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
