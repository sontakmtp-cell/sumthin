import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportReports = ({ onExport, safetyData, filters, className = '' }) => {
  const [exportOptions, setExportOptions] = useState({
    format: 'pdf',
    sections: {
      overview: true,
      alerts: true,
      compliance: true,
      charts: true,
      riskMatrix: true,
      recommendations: true
    },
    includeRawData: false,
    includeCharts: true,
    regulatory: false
  });

  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Complete formatted report' },
    { value: 'excel', label: 'Excel Workbook', icon: 'Table', description: 'Data tables and charts' },
    { value: 'word', label: 'Word Document', icon: 'FileText', description: 'Editable document format' },
    { value: 'csv', label: 'CSV Data', icon: 'Database', description: 'Raw data export' },
    { value: 'json', label: 'JSON Data', icon: 'Code', description: 'Structured data format' }
  ];

  const reportSections = [
    { key: 'overview', label: 'Executive Overview', description: 'Summary of key safety metrics' },
    { key: 'alerts', label: 'Critical Alerts', description: 'Current safety alerts and violations' },
    { key: 'compliance', label: 'Regulatory Compliance', description: 'Compliance status and requirements' },
    { key: 'charts', label: 'Safety Charts', description: 'Stability curves and load diagrams' },
    { key: 'riskMatrix', label: 'Risk Assessment', description: 'Risk matrix and mitigation strategies' },
    { key: 'recommendations', label: 'Recommendations', description: 'Safety improvement suggestions' }
  ];

  const presetConfigurations = [
    {
      id: 'regulatory',
      name: 'Regulatory Submission',
      description: 'Complete report for regulatory compliance',
      config: {
        format: 'pdf',
        sections: { overview: true, alerts: true, compliance: true, charts: true, riskMatrix: true, recommendations: true },
        includeRawData: true,
        includeCharts: true,
        regulatory: true
      }
    },
    {
      id: 'management',
      name: 'Management Summary',
      description: 'Executive summary for management review',
      config: {
        format: 'pdf',
        sections: { overview: true, alerts: true, compliance: true, charts: false, riskMatrix: true, recommendations: true },
        includeRawData: false,
        includeCharts: false,
        regulatory: false
      }
    },
    {
      id: 'technical',
      name: 'Technical Analysis',
      description: 'Detailed technical data for engineers',
      config: {
        format: 'excel',
        sections: { overview: false, alerts: true, compliance: false, charts: true, riskMatrix: true, recommendations: true },
        includeRawData: true,
        includeCharts: true,
        regulatory: false
      }
    }
  ];

  const handleExport = async (format = exportOptions?.format) => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        format,
        timestamp: new Date()?.toISOString(),
        safetyData,
        filters,
        sections: exportOptions?.sections,
        options: exportOptions
      };
      
      onExport?.(exportData);
      
      // Show success notification
      console.log(`Export completed successfully in ${format} format`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  const handleSectionToggle = (sectionKey) => {
    setExportOptions(prev => ({
      ...prev,
      sections: {
        ...prev?.sections,
        [sectionKey]: !prev?.sections?.[sectionKey]
      }
    }));
  };

  const applyPreset = (presetConfig) => {
    setExportOptions(presetConfig);
  };

  const getSelectedSectionsCount = () => {
    return Object.values(exportOptions?.sections)?.filter(Boolean)?.length;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Export Safety Reports</h2>
          <p className="text-sm text-text-secondary mt-1">
            Generate comprehensive safety reports for documentation and compliance
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200"
          >
            <Icon name="Settings" size={16} />
            <span>Options</span>
          </button>
          
          <button
            onClick={() => handleExport()}
            disabled={isExporting}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isExporting ? (
              <>
                <Icon name="Loader" size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Quick Export Buttons */}
      <div className="p-6 border-b border-border">
        <h3 className="text-sm font-medium text-text-primary mb-4">Quick Export</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {formatOptions?.slice(0, 3)?.map((format) => (
            <button
              key={format?.value}
              onClick={() => handleExport(format?.value)}
              disabled={isExporting}
              className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={format?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-text-primary">{format?.label}</div>
                <div className="text-xs text-text-secondary">{format?.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Export Options */}
      {showOptions && (
        <div className="p-6 space-y-6">
          {/* Preset Configurations */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Preset Configurations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presetConfigurations?.map((preset) => (
                <button
                  key={preset?.id}
                  onClick={() => applyPreset(preset?.config)}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary-50 transition-all duration-200 text-left"
                >
                  <div className="font-medium text-text-primary text-sm">{preset?.name}</div>
                  <div className="text-xs text-text-secondary mt-1">{preset?.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Export Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formatOptions?.map((format) => (
                <label
                  key={format?.value}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="format"
                    value={format?.value}
                    checked={exportOptions?.format === format?.value}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, format: e?.target?.value }))}
                    className="text-primary focus:ring-primary-500"
                  />
                  <Icon name={format?.icon} size={16} />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{format?.label}</div>
                    <div className="text-xs text-text-secondary">{format?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section Selection */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Report Sections ({getSelectedSectionsCount()}/{reportSections?.length} selected)
            </h3>
            <div className="space-y-2">
              {reportSections?.map((section) => (
                <label
                  key={section?.key}
                  className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={exportOptions?.sections?.[section?.key]}
                    onChange={() => handleSectionToggle(section?.key)}
                    className="mt-1 text-primary focus:ring-primary-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{section?.label}</div>
                    <div className="text-xs text-text-secondary">{section?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Additional Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions?.includeRawData}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeRawData: e?.target?.checked }))}
                  className="text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary">Include raw data tables</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions?.includeCharts}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeCharts: e?.target?.checked }))}
                  className="text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary">Include high-resolution charts</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions?.regulatory}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, regulatory: e?.target?.checked }))}
                  className="text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary">Format for regulatory submission</span>
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Export Status */}
      {isExporting && (
        <div className="p-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Loader" size={20} className="animate-spin text-primary" />
            <div>
              <div className="text-sm font-medium text-text-primary">Generating Report...</div>
              <div className="text-xs text-text-secondary">This may take a few moments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportReports;