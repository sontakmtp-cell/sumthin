import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommandPalette from '../../components/ui/CommandPalette';
import PageHeader from '../../components/ui/PageHeader';
import Icon from '../../components/AppIcon';
import BasicParameters from './components/BasicParameters';
import EnvironmentalConditions from './components/EnvironmentalConditions';
import SafetyFactors from './components/SafetyFactors';
import GantryDiagram from './components/GantryDiagram';
import PresetTemplates from './components/PresetTemplates';

const GantryCrane = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [gantrySpecs, setGantrySpecs] = useState({
    basic: {
      craneType: 'gantry',
      capacity: 50,
      span: 30,
      liftingHeight: 20,
      gantryHeight: 25,
      legCount: 4,
      movementType: 'rail',
      trolleySpeed: 20,
      gantrySpeed: 25,
      hoistingSpeed: 15
    },
    environmental: {
      windSpeed: 20,
      temperature: 25,
      groundConditions: 'firm',
      visibility: 'clear'
    },
    safety: {
      safetyFactor: 1.35,
      operationalLimits: 85,
      loadChart: 'manufacturer'
    }
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { id: 'basic', label: 'Basic Parameters', icon: 'Settings' },
    { id: 'environmental', label: 'Environmental Conditions', icon: 'Cloud' },
    { id: 'safety', label: 'Safety Factors', icon: 'Shield' }
  ];

  // Real-time validation
  const validateSpecs = () => {
    const errors = {};
    
    // Basic parameters validation
    if (gantrySpecs?.basic?.capacity < 1 || gantrySpecs?.basic?.capacity > 2000) {
      errors.capacity = 'Capacity must be between 1 and 2000 tonnes';
    }
    
    if (gantrySpecs?.basic?.span < 5 || gantrySpecs?.basic?.span > 200) {
      errors.span = 'Span must be between 5 and 200 meters';
    }
    
    // Environmental validation
    if (gantrySpecs?.environmental?.windSpeed > 60) {
      errors.windSpeed = 'Operation not recommended above 60 km/h wind speed';
    }
    
    // Safety factors validation
    if (gantrySpecs?.safety?.safetyFactor < 1.1) {
      errors.safetyFactor = 'Safety factor must be at least 1.1';
    }

    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  useEffect(() => {
    validateSpecs();
  }, [gantrySpecs]);

  const handleSpecChange = (category, field, value) => {
    setGantrySpecs(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: value
      }
    }));
  };

  const handleExportReport = async () => {
    if (!validateSpecs()) {
      alert('Please fix validation errors before exporting');
      return;
    }
    
    setIsExporting(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Exporting gantry crane specification report...', gantrySpecs);
      alert('Gantry crane specification report exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const loadPreset = (presetData) => {
    setGantrySpecs(presetData);
  };

  const proceedToCalculations = () => {
    if (validateSpecs()) {
      navigate('/load-calculations', { state: { gantrySpecs } });
    } else {
      alert('Please fix all validation errors before proceeding to calculations');
    }
  };

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
            title="Cổng trục"
            description="Định nghĩa thông số và ràng buộc vận hành cổng trục cho tính toán kỹ thuật"
            actions={
              <>
                <button
                  onClick={handleExportReport}
                  disabled={isExporting || Object.keys(validationErrors)?.length > 0}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Icon name={isExporting ? "Loader" : "Download"} size={16} className={isExporting ? "animate-spin" : ""} />
                  <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
                </button>
                <button
                  onClick={proceedToCalculations}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Icon name="Calculator" size={16} />
                  <span>Calculate Loads</span>
                </button>
              </>
            }
          />

          {/* Preset Templates Section */}
          <div className="mb-6">
            <PresetTemplates onLoadPreset={loadPreset} />
          </div>

          {/* Main Layout - Desktop Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Specifications Input (40%) */}
            <div className="lg:col-span-5">
              <div className="bg-surface border border-border rounded-lg">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab?.id
                            ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span className="hidden sm:inline">{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'basic' && (
                    <BasicParameters
                      specs={gantrySpecs?.basic}
                      onChange={(field, value) => handleSpecChange('basic', field, value)}
                      errors={validationErrors}
                    />
                  )}
                  {activeTab === 'environmental' && (
                    <EnvironmentalConditions
                      specs={gantrySpecs?.environmental}
                      onChange={(field, value) => handleSpecChange('environmental', field, value)}
                      errors={validationErrors}
                    />
                  )}
                  {activeTab === 'safety' && (
                    <SafetyFactors
                      specs={gantrySpecs?.safety}
                      onChange={(field, value) => handleSpecChange('safety', field, value)}
                      errors={validationErrors}
                    />
                  )}
                </div>
              </div>

              {/* Validation Summary */}
              {Object.keys(validationErrors)?.length > 0 && (
                <div className="mt-4 bg-error-50 border border-error-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-error-600" />
                    <h3 className="text-sm font-medium text-error-800">Validation Errors</h3>
                  </div>
                  <ul className="text-sm text-error-700 space-y-1">
                    {Object.values(validationErrors)?.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Panel - Gantry Diagram and Load Chart (60%) */}
            <div className="lg:col-span-7">
              <GantryDiagram
                specs={gantrySpecs}
                validationErrors={validationErrors}
              />
            </div>
          </div>

          {/* Mobile View - Stacked Layout */}
          <div className="lg:hidden mt-6">
            <GantryDiagram
              specs={gantrySpecs}
              validationErrors={validationErrors}
              isMobile={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GantryCrane;
