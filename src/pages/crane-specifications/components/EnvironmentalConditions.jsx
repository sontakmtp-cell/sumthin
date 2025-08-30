import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EnvironmentalConditions = ({ specs, onChange, errors }) => {
  const groundConditions = [
    { value: 'firm', label: 'Firm Ground' },
    { value: 'soft', label: 'Soft Ground' },
    { value: 'rocky', label: 'Rocky Surface' },
    { value: 'paved', label: 'Paved Surface' }
  ];

  const visibilityConditions = [
    { value: 'clear', label: 'Clear (>10km)' },
    { value: 'good', label: 'Good (5-10km)' },
    { value: 'moderate', label: 'Moderate (2-5km)' },
    { value: 'poor', label: 'Poor (<2km)' }
  ];

  const handleInputChange = (field, value) => {
    const numericFields = ['windSpeed', 'temperature'];
    const processedValue = numericFields?.includes(field) ? parseFloat(value) || 0 : value;
    onChange(field, processedValue);
  };

  const getWindSpeedStatus = (windSpeed) => {
    if (windSpeed <= 20) return { status: 'safe', color: 'text-success-600' };
    if (windSpeed <= 35) return { status: 'caution', color: 'text-warning-600' };
    return { status: 'dangerous', color: 'text-error-600' };
  };

  const windStatus = getWindSpeedStatus(specs?.windSpeed);

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
        <div className="mt-2 flex items-center space-x-2">
          <Icon name="Wind" size={16} className={windStatus?.color} />
          <span className={`text-sm ${windStatus?.color} capitalize`}>
            {windStatus?.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Safe: {'<='}20 km/h | Caution: 21-35 km/h | Stop: {'>'}35 km/h
        </p>
      </div>
      {/* Temperature */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Temperature (°C)
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
          Affects hydraulic performance and load capacity
        </p>
      </div>
      {/* Ground Conditions */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Ground Conditions <span className="text-error-500">*</span>
        </label>
        <Select
          value={specs?.groundConditions}
          onChange={(value) => handleInputChange('groundConditions', value)}
          options={groundConditions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Affects outrigger setup and stability calculations
        </p>
      </div>
      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Visibility Conditions
        </label>
        <Select
          value={specs?.visibility}
          onChange={(value) => handleInputChange('visibility', value)}
          options={visibilityConditions}
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Important for crane operator safety and coordination
        </p>
      </div>
      {/* Environmental Impact Summary */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertTriangle" size={16} className="text-warning-600" />
          <span className="text-sm font-medium text-warning-800">Environmental Impact</span>
        </div>
        <div className="text-sm text-warning-700 space-y-2">
          <div className="flex justify-between">
            <span>Wind Load Factor:</span>
            <span className="font-medium">
              {specs?.windSpeed <= 20 ? '1.0' : specs?.windSpeed <= 35 ? '1.15' : '1.3+'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Ground Bearing:</span>
            <span className="font-medium">
              {specs?.groundConditions === 'firm' ? 'Standard' :
               specs?.groundConditions === 'paved' ? 'Excellent' : 'Reduced'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Operation Status:</span>
            <span className={`font-medium ${
              specs?.windSpeed > 35 ? 'text-error-600' :
              specs?.windSpeed > 20 ? 'text-warning-600' : 'text-success-600'
            }`}>
              {specs?.windSpeed > 35 ? 'Halt Operations' :
               specs?.windSpeed > 20 ? 'Proceed with Caution' : 'Normal Operations'}
            </span>
          </div>
        </div>
      </div>
      {/* Weather Guidelines */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="BookOpen" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Weather Guidelines</span>
        </div>
        <div className="text-xs text-secondary-700 space-y-1">
          <p>- Wind: Monitor continuously, use anemometer at height</p>
          <p>- Temperature: Check hydraulic fluid specifications</p>
          <p>- Ground: Inspect bearing capacity and levelness</p>
          <p>- Visibility: Ensure clear line of sight to load and hazards</p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalConditions;

