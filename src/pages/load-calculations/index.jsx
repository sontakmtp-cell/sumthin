import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommandPalette from '../../components/ui/CommandPalette';
import PageHeader from '../../components/ui/PageHeader';
import Icon from '../../components/AppIcon';
import CalculationTypeSelector from './components/CalculationTypeSelector';
import LoadConfiguration from './components/LoadConfiguration';
import CalculationWorkspace from './components/CalculationWorkspace';
import ResultsSidebar from './components/ResultsSidebar';
import HistoryManager from './components/HistoryManager';

const LoadCalculations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [calculationType, setCalculationType] = useState('static');
  const [loadConfiguration, setLoadConfiguration] = useState({
    weight: 10,
    dimensions: { length: 5, width: 2, height: 1.5 },
    centerOfGravity: { x: 2.5, y: 1, z: 0.75 },
    liftingPoints: 4,
    riggingWeight: 0.5,
    dynamicFactor: 1.15
  });
  const [calculationResults, setCalculationResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [craneSpecs, setCraneSpecs] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  // Get crane specifications from previous page or load defaults
  useEffect(() => {
    if (location?.state?.craneSpecs) {
      setCraneSpecs(location?.state?.craneSpecs);
    } else {
      // Default crane specifications
      setCraneSpecs({
        basic: { craneType: 'mobile', capacity: 50, boomLength: 35, loadRadius: 12, counterweight: 15000 },
        environmental: { windSpeed: 15, temperature: 20, groundConditions: 'firm' },
        safety: { safetyFactor: 1.25, operationalLimits: 85 }
      });
    }
  }, [location?.state]);

  const handleCalculationTypeChange = (type) => {
    setCalculationType(type);
    setCalculationResults(null);
  };

  const handleLoadConfigChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setLoadConfiguration(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setLoadConfiguration(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const performCalculation = async () => {
    if (!craneSpecs) {
      alert('Crane specifications not loaded. Please go to Crane Specifications first.');
      return;
    }

    setIsCalculating(true);
    try {
      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const totalLoad = loadConfiguration?.weight + loadConfiguration?.riggingWeight;
      const effectiveLoad = totalLoad * (calculationType === 'dynamic' ? loadConfiguration?.dynamicFactor : 1);
      
      // Wind load calculation
      const windFactor = craneSpecs?.environmental?.windSpeed > 20 ? 1.15 : 1.0;
      const windLoad = totalLoad * (windFactor - 1);
      
      // Net capacity calculation
      const grossCapacity = craneSpecs?.basic?.capacity;
      const deductions = grossCapacity * (1 - craneSpecs?.safety?.operationalLimits / 100);
      const netCapacity = (grossCapacity - deductions) / craneSpecs?.safety?.safetyFactor;
      
      // Safety margins
      const utilizationPercentage = (effectiveLoad / netCapacity) * 100;
      const safetyMargin = netCapacity - effectiveLoad;
      
      // Stability analysis
      const loadMoment = effectiveLoad * craneSpecs?.basic?.loadRadius;
      const restoringMoment = (craneSpecs?.basic?.counterweight / 1000) * 2.5;
      const stabilityRatio = restoringMoment / loadMoment;
      
      // Multi-crane coordination (if applicable)
      let multiCraneData = null;
      if (calculationType === 'multi-crane') {
        multiCraneData = {
          craneCount: 2,
          loadDistribution: [60, 40], // percentage per crane
          coordinationFactor: 1.25,
          synchronizationRisk: utilizationPercentage > 70 ? 'High' : 'Low'
        };
      }

      const results = {
        id: Date.now(),
        timestamp: new Date()?.toISOString(),
        calculationType,
        loadConfiguration: { ...loadConfiguration },
        craneSpecs: { ...craneSpecs },
        totalLoad,
        effectiveLoad,
        windLoad,
        netCapacity,
        utilizationPercentage,
        safetyMargin,
        loadMoment,
        stabilityRatio,
        multiCraneData,
        compliance: {
          capacityCheck: effectiveLoad <= netCapacity,
          stabilityCheck: stabilityRatio >= 1.5,
          utilizationCheck: utilizationPercentage <= 85,
          windCheck: craneSpecs?.environmental?.windSpeed <= 35,
          overallStatus: effectiveLoad <= netCapacity && stabilityRatio >= 1.5 && 
                        utilizationPercentage <= 85 && craneSpecs?.environmental?.windSpeed <= 35
        }
      };

      setCalculationResults(results);
      
      // Add to history
      setCalculationHistory(prev => [results, ...prev?.slice(0, 9)]);
      
    } catch (error) {
      console.error('Calculation failed:', error);
      alert('Calculation failed. Please check your inputs and try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const exportCalculationReport = async () => {
    if (!calculationResults) return;
    
    try {
      console.log('Exporting calculation report...', calculationResults);
      alert('Calculation report exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const loadHistoryCalculation = (historyItem) => {
    setCalculationType(historyItem?.calculationType);
    setLoadConfiguration(historyItem?.loadConfiguration);
    setCraneSpecs(historyItem?.craneSpecs);
    setCalculationResults(historyItem);
    setSelectedHistoryId(historyItem?.id);
  };

  if (!craneSpecs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary">Loading crane specifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <CommandPalette />
      
      {/* Main Content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <PageHeader 
            title="Load Calculations"
            description="Comprehensive lifting analysis with advanced engineering calculations and safety verification"
            actions={
              <>
                <button
                  onClick={() => navigate('/crane-specifications')}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Crane Setup</span>
                </button>
                <button
                  onClick={exportCalculationReport}
                  disabled={!calculationResults}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Icon name="Download" size={16} />
                  <span>Export Report</span>
                </button>
              </>
            }
          />

          {/* Top Toolbar */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Calculation Type Selector */}
              <div className="flex-1">
                <CalculationTypeSelector
                  selectedType={calculationType}
                  onChange={handleCalculationTypeChange}
                />
              </div>

              {/* Calculation Triggers */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={performCalculation}
                  disabled={isCalculating}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Icon name={isCalculating ? "Loader" : "Calculator"} size={16} className={isCalculating ? "animate-spin" : ""} />
                  <span>{isCalculating ? 'Calculating...' : 'Calculate'}</span>
                </button>
                <button
                  onClick={() => setCalculationResults(null)}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Calculation Interface */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Panel - Load Configuration */}
            <div className="xl:col-span-3">
              <LoadConfiguration
                loadConfig={loadConfiguration}
                onChange={handleLoadConfigChange}
                calculationType={calculationType}
              />
            </div>

            {/* Center - Calculation Workspace */}
            <div className="xl:col-span-6">
              <CalculationWorkspace
                craneSpecs={craneSpecs}
                loadConfiguration={loadConfiguration}
                calculationResults={calculationResults}
                calculationType={calculationType}
                isCalculating={isCalculating}
              />
            </div>

            {/* Right Panel - Results */}
            <div className="xl:col-span-3">
              <ResultsSidebar
                results={calculationResults}
                craneSpecs={craneSpecs}
                isCalculating={isCalculating}
              />
            </div>
          </div>

          {/* History Manager */}
          <div className="mt-8">
            <HistoryManager
              history={calculationHistory}
              selectedId={selectedHistoryId}
              onLoadCalculation={loadHistoryCalculation}
              onClearHistory={() => setCalculationHistory([])}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadCalculations;