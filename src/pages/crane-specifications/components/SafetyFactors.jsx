import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SafetyFactors = ({ specs, onChange, errors }) => {
  const loadChartTypes = [
    { value: 'manufacturer', label: 'Manufacturer Standard' },
    { value: 'custom', label: 'Custom Load Chart' },
    { value: 'interpolated', label: 'Interpolated Values' },
    { value: 'conservative', label: 'Conservative Estimate' }
  ];

  const handleInputChange = (field, value) => {
    const numericFields = ['safetyFactor', 'operationalLimits'];
    const processedValue = numericFields?.includes(field) ? parseFloat(value) || 0 : value;
    onChange(field, processedValue);
  };

  const getSafetyFactorStatus = (factor) => {
    if (factor >= 1.5) return { status: 'excellent', color: 'text-success-600' };
    if (factor >= 1.25) return { status: 'good', color: 'text-primary' };
    if (factor >= 1.1) return { status: 'minimum', color: 'text-warning-600' };
    return { status: 'insufficient', color: 'text-error-600' };
  };

  const getOperationalLimitStatus = (limit) => {
    if (limit <= 75) return { status: 'conservative', color: 'text-success-600' };
    if (limit <= 85) return { status: 'standard', color: 'text-primary' };
    if (limit <= 95) return { status: 'aggressive', color: 'text-warning-600' };
    return { status: 'unsafe', color: 'text-error-600' };
  };

  const safetyStatus = getSafetyFactorStatus(specs?.safetyFactor);
  const limitStatus = getOperationalLimitStatus(specs?.operationalLimits);

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
          min="1.0"
          max="3.0"
          step="0.05"
          className={`w-full ${errors?.safetyFactor ? 'border-error-500' : ''}`}
        />
        {errors?.safetyFactor && (
          <p className="mt-1 text-sm text-error-600">{errors?.safetyFactor}</p>
        )}
        <div className="mt-2 flex items-center space-x-2">
          <Icon 
            name="Shield" 
            size={16} 
            className={safetyStatus?.color}
          />
          <span className={`text-sm ${safetyStatus?.color} capitalize`}>
            {safetyStatus?.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Minimum: 1.1 | Standard: 1.25 | Conservative: 1.5+
        </p>
      </div>
      {/* Operational Limits */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Operational Limits (% of rated capacity) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.operationalLimits}
          onChange={(e) => handleInputChange('operationalLimits', e?.target?.value)}
          placeholder="Enter operational limit"
          min="50"
          max="100"
          step="5"
          className="w-full"
        />
        <div className="mt-2 flex items-center space-x-2">
          <Icon 
            name="Gauge" 
            size={16} 
            className={limitStatus?.color}
          />
          <span className={`text-sm ${limitStatus?.color} capitalize`}>
            {limitStatus?.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Conservative: ≤75% | Standard: 85% | Maximum: 95%
        </p>
      </div>
      {/* Load Chart Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Load Chart Reference <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.loadChart}
          onChange={(value) => handleInputChange('loadChart', value)}
          options={loadChartTypes}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Source of capacity ratings for calculations
        </p>
      </div>
      {/* Load Chart Information */}
      {specs?.loadChart && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Load Chart Details</span>
          </div>
          <div className="text-sm text-primary-700">
            {specs?.loadChart === 'manufacturer' && (
              <p>Using OEM certified load charts with all standard configurations and operating conditions.</p>
            )}
            {specs?.loadChart === 'custom' && (
              <p>Custom load chart based on specific crane modifications or special attachments.</p>
            )}
            {specs?.loadChart === 'interpolated' && (
              <p>Calculated values between standard chart points using linear interpolation method.</p>
            )}
            {specs?.loadChart === 'conservative' && (
              <p>Conservative estimates with additional safety margins for uncertain conditions.</p>
            )}
          </div>
        </div>
      )}
      {/* Safety Calculation Summary */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Calculator" size={16} className="text-success-600" />
          <span className="text-sm font-medium text-success-800">Safety Calculations</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-success-700">Working Load Limit:</span>
            <div className="font-medium text-success-800">
              {Math.round((specs?.operationalLimits || 85) / (specs?.safetyFactor || 1.25))}% of rated
            </div>
          </div>
          <div>
            <span className="text-success-700">Ultimate Safety:</span>
            <div className="font-medium text-success-800">
              {Math.round(100 / (specs?.safetyFactor || 1.25) * (specs?.operationalLimits || 85) / 100)}% margin
            </div>
          </div>
          <div>
            <span className="text-success-700">Load Test Factor:</span>
            <div className="font-medium text-success-800">
              {(specs?.safetyFactor || 1.25)?.toFixed(2)}x
            </div>
          </div>
          <div>
            <span className="text-success-700">Compliance:</span>
            <div className="font-medium text-success-800">
              {specs?.safetyFactor >= 1.25 ? 'AS/NZS 1418' : 'Below Standard'}
            </div>
          </div>
        </div>
      </div>
      {/* Safety Guidelines */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Safety Guidelines</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>• Always verify load chart matches crane configuration</p>
          <p>• Consider dynamic amplification for moving loads</p>
          <p>• Account for rigging weight and wind loading</p>
          <p>• Perform pre-lift safety briefing with all personnel</p>
          <p>• Maintain clear communication between operator and signal person</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyFactors;