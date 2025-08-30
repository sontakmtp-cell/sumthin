import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SafetyFactors = ({ specs, onChange, errors }) => {
  const loadChartOptions = [
    { value: 'manufacturer', label: 'Manufacturer Chart' },
    { value: 'calculated', label: 'Calculated Chart' },
    { value: 'tested', label: 'Tested Chart' },
    { value: 'custom', label: 'Custom Chart' }
  ];

  const handleInputChange = (field, value) => {
    const numericFields = ['safetyFactor', 'operationalLimits'];
    const processedValue = numericFields?.includes(field) ? parseFloat(value) || 0 : value;
    onChange(field, processedValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Safety Factors</h3>
      </div>
      
      {/* Safety Factor */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Safety Factor <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.safetyFactor}
          onChange={(e) => handleInputChange('safetyFactor', e?.target?.value)}
          placeholder="Enter safety factor"
          min="1.1"
          max="2.0"
          step="0.05"
          className={`w-full ${errors?.safetyFactor ? 'border-error-500' : ''}`}
        />
        {errors?.safetyFactor && (
          <p className="mt-1 text-sm text-error-600">{errors?.safetyFactor}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Recommended: 1.35 for outdoor operations, 1.5 for critical loads
        </p>
      </div>
      
      {/* Operational Limits */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Operational Limits (%) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.operationalLimits}
          onChange={(e) => handleInputChange('operationalLimits', e?.target?.value)}
          placeholder="Enter operational limits"
          min="50"
          max="100"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Maximum percentage of rated capacity for operation
        </p>
      </div>
      
      {/* Load Chart */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Load Chart Reference <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.loadChart}
          onChange={(value) => handleInputChange('loadChart', value)}
          options={loadChartOptions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Source of load capacity information
        </p>
      </div>
      
      {/* Safety Checklist */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CheckCircle" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Safety Checklist</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>• Verify safety factor meets operational requirements</p>
          <p>• Ensure load chart is current and accurate</p>
          <p>• Check operational limits before each lift</p>
          <p>• Regular inspection of safety systems</p>
          <p>• Monitor weather conditions continuously</p>
        </div>
      </div>
      
      {/* Emergency Procedures */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={16} className="text-warning-600" />
          <span className="text-sm font-medium text-warning-800">Emergency Procedures</span>
        </div>
        <div className="text-xs text-warning-700 space-y-1">
          <p>• Stop operation immediately if safety factor is compromised</p>
          <p>• Lower load safely if operational limits are exceeded</p>
          <p>• Contact supervisor for any safety concerns</p>
          <p>• Secure gantry in high wind conditions</p>
        </div>
      </div>
      
      {/* Outdoor Safety Considerations */}
      <div className="bg-info-50 border border-info-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-info-600" />
          <span className="text-sm font-medium text-info-800">Outdoor Safety Considerations</span>
        </div>
        <div className="text-xs text-info-700 space-y-1">
          <p>• Wind speed monitoring is critical for outdoor operation</p>
          <p>• Ground stability must be verified regularly</p>
          <p>• Weather protection for control systems</p>
          <p>• Emergency shutdown procedures for severe weather</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyFactors;
