import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EnvironmentalConditions = ({ specs, onChange, errors }) => {
  const groundConditions = [
    { value: 'firm', label: 'Firm Ground' },
    { value: 'soft', label: 'Soft Ground' },
    { value: 'concrete', label: 'Concrete Floor' },
    { value: 'steel', label: 'Steel Structure' }
  ];

  const visibilityOptions = [
    { value: 'clear', label: 'Clear' },
    { value: 'foggy', label: 'Foggy' },
    { value: 'rainy', label: 'Rainy' },
    { value: 'dusty', label: 'Dusty' }
  ];

  const handleInputChange = (field, value) => {
    const numericFields = ['windSpeed', 'temperature'];
    const processedValue = numericFields?.includes(field) ? parseFloat(value) || 0 : value;
    onChange(field, processedValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Cloud" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Environmental Conditions</h3>
      </div>
      
      {/* Wind Speed */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Wind Speed (km/h) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.windSpeed}
          onChange={(e) => handleInputChange('windSpeed', e?.target?.value)}
          placeholder="Enter wind speed"
          min="0"
          max="100"
          step="1"
          className={`w-full ${errors?.windSpeed ? 'border-error-500' : ''}`}
        />
        {errors?.windSpeed && (
          <p className="mt-1 text-sm text-error-600">{errors?.windSpeed}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Maximum safe operating wind speed
        </p>
      </div>
      
      {/* Temperature */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Ambient Temperature (°C) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.temperature}
          onChange={(e) => handleInputChange('temperature', e?.target?.value)}
          placeholder="Enter temperature"
          min="-40"
          max="60"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Operating temperature range
        </p>
      </div>
      
      {/* Ground Conditions */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Ground/Floor Conditions <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.groundConditions}
          onChange={(value) => handleInputChange('groundConditions', value)}
          options={groundConditions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Surface conditions for crane operation
        </p>
      </div>
      
      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Visibility Conditions <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.visibility}
          onChange={(value) => handleInputChange('visibility', value)}
          options={visibilityOptions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Environmental visibility factors
        </p>
      </div>
      
      {/* Safety Guidelines */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Safety Guidelines</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>• Stop operation if wind speed exceeds 50 km/h</p>
          <p>• Avoid operation in poor visibility conditions</p>
          <p>• Ensure stable ground conditions before operation</p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalConditions;
