import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicParameters = ({ specs, onChange, errors }) => {
  const craneTypes = [
    { value: 'overhead', label: 'Overhead Bridge Crane' },
    { value: 'gantry', label: 'Gantry Crane' },
    { value: 'jib', label: 'Jib Crane' },
    { value: 'monorail', label: 'Monorail Crane' }
  ];

  const handleInputChange = (field, value) => {
    // Convert string values to numbers for numeric fields
    const numericFields = ['capacity', 'span', 'liftingHeight', 'trolleySpeed', 'bridgeSpeed', 'hoistingSpeed'];
    const processedValue = numericFields?.includes(field) ? parseFloat(value) || 0 : value;
    onChange(field, processedValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Basic Parameters</h3>
      </div>
      
      {/* Crane Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Crane Type <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.craneType}
          onChange={(value) => handleInputChange('craneType', value)}
          options={craneTypes}
          className="w-full"
        />
      </div>
      
      {/* Capacity */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Maximum Capacity (tonnes) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.capacity}
          onChange={(e) => handleInputChange('capacity', e?.target?.value)}
          placeholder="Enter capacity"
          min="1"
          max="1000"
          step="0.1"
          className={`w-full ${errors?.capacity ? 'border-error-500' : ''}`}
        />
        {errors?.capacity && (
          <p className="mt-1 text-sm text-error-600">{errors?.capacity}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Typical range: 1-500 tonnes for bridge cranes
        </p>
      </div>
      
      {/* Span */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Bridge Span (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.span}
          onChange={(e) => handleInputChange('span', e?.target?.value)}
          placeholder="Enter span length"
          min="5"
          max="100"
          step="0.5"
          className={`w-full ${errors?.span ? 'border-error-500' : ''}`}
        />
        {errors?.span && (
          <p className="mt-1 text-sm text-error-600">{errors?.span}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Distance between bridge rails
        </p>
      </div>
      
      {/* Lifting Height */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Lifting Height (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.liftingHeight}
          onChange={(e) => handleInputChange('liftingHeight', e?.target?.value)}
          placeholder="Enter lifting height"
          min="3"
          max="50"
          step="0.5"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Maximum hook height from floor
        </p>
      </div>
      
      {/* Trolley Speed */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Trolley Speed (m/min) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.trolleySpeed}
          onChange={(e) => handleInputChange('trolleySpeed', e?.target?.value)}
          placeholder="Enter trolley speed"
          min="5"
          max="100"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Speed of trolley along bridge
        </p>
      </div>
      
      {/* Bridge Speed */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Bridge Speed (m/min) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.bridgeSpeed}
          onChange={(e) => handleInputChange('bridgeSpeed', e?.target?.value)}
          placeholder="Enter bridge speed"
          min="5"
          max="100"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-secondary-700">
          Speed of bridge along runway
        </p>
      </div>
      
      {/* Hoisting Speed */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Hoisting Speed (m/min) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.hoistingSpeed}
          onChange={(e) => handleInputChange('hoistingSpeed', e?.target?.value)}
          placeholder="Enter hoisting speed"
          min="1"
          max="50"
          step="0.5"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Speed of load lifting/lowering
        </p>
      </div>
      
      {/* Quick Reference */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Quick Reference</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>• Overhead cranes: 1-500t capacity, 5-100m span</p>
          <p>• Gantry cranes: 5-1000t capacity, 10-150m span</p>
          <p>• Jib cranes: 0.5-50t capacity, 3-30m radius</p>
        </div>
      </div>
    </div>
  );
};

export default BasicParameters;
