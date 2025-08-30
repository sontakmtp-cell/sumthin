import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PageHeader from '../../components/ui/PageHeader';
import SafetyIndicatorCards from './components/SafetyIndicatorCards';
import InteractiveCharts from './components/InteractiveCharts';
import CriticalAlertsPanel from './components/CriticalAlertsPanel';
import AnalysisFilters from './components/AnalysisFilters';
import RiskAssessmentMatrix from './components/RiskAssessmentMatrix';
import ExportReports from './components/ExportReports';

const SafetyAnalysisDashboard = () => {
  const [filters, setFilters] = useState({
    operationalScenario: 'standard',
    weatherCondition: 'normal',
    craneConfiguration: 'default',
    timeRange: '24h'
  });

  const [safetyData, setSafetyData] = useState({
    stabilityMargin: 2.4,
    loadFactor: 0.75,
    complianceStatus: 'compliant',
    criticalAlerts: [],
    lastUpdate: new Date()
  });

  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      setSafetyData(prev => ({
        ...prev,
        stabilityMargin: Math.max(1.5, Math.min(3.0, prev?.stabilityMargin + (Math.random() - 0.5) * 0.1)),
        loadFactor: Math.max(0.5, Math.min(1.0, prev?.loadFactor + (Math.random() - 0.5) * 0.05)),
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExportReport = (format) => {
    console.log(`Exporting safety report in ${format} format`);
    // Export functionality would be implemented here
  };

  const toggleRealTimeUpdates = () => {
    setRealTimeUpdates(!realTimeUpdates);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Safety Analysis Dashboard | Crane Design System</title>
        <meta name="description" content="Comprehensive safety analysis and compliance monitoring for crane operations" />
      </Helmet>

      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <PageHeader 
            title="Safety Analysis"
            description="Comprehensive risk assessment and compliance monitoring for crane operations"
            className="mb-6"
            actions={[]} // Add required actions prop
          />

          {/* Real-time Status Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-surface border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${realTimeUpdates ? 'bg-success animate-pulse' : 'bg-secondary-300'}`} />
              <span className="text-sm text-text-secondary">
                {realTimeUpdates ? 'Live monitoring active' : 'Real-time updates paused'}
              </span>
              <span className="text-xs text-secondary-400">
                Last update: {safetyData?.lastUpdate?.toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={toggleRealTimeUpdates}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {realTimeUpdates ? 'Pause Updates' : 'Resume Updates'}
            </button>
          </div>

          {/* Critical Alerts Panel */}
          <CriticalAlertsPanel 
            alerts={safetyData?.criticalAlerts || []}
            complianceStatus={safetyData?.complianceStatus}
            className="mb-6"
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar - Analysis Filters */}
            <div className="xl:col-span-1">
              <AnalysisFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                className="sticky top-6"
              />
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Safety Indicator Cards */}
              <SafetyIndicatorCards
                stabilityMargin={safetyData?.stabilityMargin}
                loadFactor={safetyData?.loadFactor}
                complianceStatus={safetyData?.complianceStatus}
              />

              {/* Interactive Charts */}
              <InteractiveCharts
                filters={filters}
                safetyData={safetyData}
              />

              {/* Risk Assessment Matrix */}
              <RiskAssessmentMatrix
                filters={filters}
              />

              {/* Export Reports */}
              <ExportReports
                onExport={handleExportReport}
                safetyData={safetyData}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile responsive adjustments */}
      <style jsx>{`
        @media (max-width: 1023px) {
          main {
            margin-left: 0;
            padding-top: 64px;
          }
        }
        
        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SafetyAnalysisDashboard;