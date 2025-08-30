import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicParameters = ({ specs, onChange, errors }) => {
  const craneTypes = [
    { value: 'gantry', label: 'Gantry Crane' },
    { value: 'semi-gantry', label: 'Semi-Gantry Crane' },
    { value: 'cantilever', label: 'Cantilever Gantry Crane' },
    { value: 'double-girder', label: 'Double Girder Gantry' }
  ];

  const legCountOptions = [
    { value: 2, label: '2 legs' },
    { value: 4, label: '4 legs' },
    { value: 6, label: '6 legs' },
    { value: 8, label: '8 legs' }
  ];

  const movementTypeOptions = [
    { value: 'rail', label: 'On Rails' },
    { value: 'wheel', label: 'Wheeled' },
    { value: 'crawler', label: 'Crawler' }
  ];

  const handleInputChange = (field, value) => {
    // Convert string values to numbers for numeric fields
    const numericFields = ['capacity', 'span', 'liftingHeight', 'gantryHeight', 'legCount', 'trolleySpeed', 'gantrySpeed', 'hoistingSpeed'];
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
          max="2000"
          step="0.1"
          className={`w-full ${errors?.capacity ? 'border-error-500' : ''}`}
        />
        {errors?.capacity && (
          <p className="mt-1 text-sm text-error-600">{errors?.capacity}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Typical range: 5-2000 tonnes for gantry cranes
        </p>
      </div>
      
      {/* Span */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Gantry Span (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.span}
          onChange={(e) => handleInputChange('span', e?.target?.value)}
          placeholder="Enter span length"
          min="5"
          max="200"
          step="0.5"
          className={`w-full ${errors?.span ? 'border-error-500' : ''}`}
        />
        {errors?.span && (
          <p className="mt-1 text-sm text-error-600">{errors?.span}</p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Distance between gantry legs
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
          max="100"
          step="0.5"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Maximum hook height from ground
        </p>
      </div>
      
      {/* Gantry Height */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Gantry Height (meters) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.gantryHeight}
          onChange={(e) => handleInputChange('gantryHeight', e?.target?.value)}
          placeholder="Enter gantry height"
          min="5"
          max="150"
          step="0.5"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Height of gantry structure
        </p>
      </div>
      
      {/* Leg Count */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Number of Legs <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.legCount}
          onChange={(value) => handleInputChange('legCount', value)}
          options={legCountOptions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Support structure configuration
        </p>
      </div>
      
      {/* Movement Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Movement Type <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.movementType}
          onChange={(value) => handleInputChange('movementType', value)}
          options={movementTypeOptions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          How the gantry moves
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
          Speed of trolley along gantry
        </p>
      </div>
      
      {/* Gantry Speed */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Gantry Speed (m/min) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={specs?.gantrySpeed}
          onChange={(e) => handleInputChange('gantrySpeed', e?.target?.value)}
          placeholder="Enter gantry speed"
          min="5"
          max="100"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Speed of gantry movement
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
          <p>• Light gantry: 5-50t capacity, 10-30m span</p>
          <p>• Medium gantry: 50-200t capacity, 30-80m span</p>
          <p>• Heavy gantry: 200-2000t capacity, 80-200m span</p>
        </div>
      </div>
    </div>
  );
};

export default BasicParameters;
