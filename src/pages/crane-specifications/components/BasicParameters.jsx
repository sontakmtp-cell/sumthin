import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicParameters = ({ specs, onChange, errors }) => {
  const craneTypes = [
    { value: 'mobile', label: 'Mobile Crane' },
    { value: 'tower', label: 'Tower Crane' },
    { value: 'crawler', label: 'Crawler Crane' },
    { value: 'overhead', label: 'Overhead Crane' }
  ];

  const handleInputChange = (field, value) => {
    // Convert string values to numbers for numeric fields
    const numericFields = ['capacity', 'boomLength', 'counterweight', 'loadRadius'];
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
          Typical range: 5-500 tonnes for mobile cranes
        </p>
      </div>
      {/* Boom Length */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Boom Length (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.boomLength}
          onChange={(e) => handleInputChange('boomLength', e?.target?.value)}
          placeholder="Enter boom length"
          min="5"
          max="100"
          step="0.5"
          className={`w-full ${errors?.boomLength ? 'border-error-500' : ''}`}
        />
        {errors?.boomLength && (
          <p className="mt-1 text-sm text-error-600">{errors?.boomLength}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Maximum telescopic extension length
        </p>
      </div>
      {/* Counterweight */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Counterweight (kg) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.counterweight}
          onChange={(e) => handleInputChange('counterweight', e?.target?.value)}
          placeholder="Enter counterweight"
          min="1000"
          max="100000"
          step="100"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Standard counterweight configuration
        </p>
      </div>
      {/* Load Radius */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Working Radius (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.loadRadius}
          onChange={(e) => handleInputChange('loadRadius', e?.target?.value)}
          placeholder="Enter working radius"
          min="2"
          max="80"
          step="0.5"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Distance from crane centerline to load
        </p>
      </div>
      {/* Quick Reference */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Quick Reference</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>• Mobile cranes: 5-500t capacity, 10-80m boom</p>
          <p>• Tower cranes: 4-32t capacity, 30-80m jib</p>
          <p>• Crawler cranes: 40-3000t capacity, 20-150m boom</p>
        </div>
      </div>
    </div>
  );
};

export default BasicParameters;