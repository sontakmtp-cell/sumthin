import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LoadConfiguration = ({ loadConfig, onChange, calculationType }) => {
  const handleInputChange = (field, value) => {
    const numericValue = parseFloat(value) || 0;
    onChange(field, numericValue);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Package" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Load Configuration</h3>
      </div>
      {/* Load Weight */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Load Weight (tonnes) <span className="text-error-500">*</span>
        </label>
        <Input
          type="number"
          value={loadConfig?.weight}
          onChange={(e) => handleInputChange('weight', e?.target?.value)}
          placeholder="Enter load weight"
          min="0.1"
          step="0.1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Net weight of the load excluding rigging
        </p>
      </div>
      {/* Load Dimensions */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Load Dimensions (meters)
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Input
              type="number"
              value={loadConfig?.dimensions?.length}
              onChange={(e) => handleInputChange('dimensions.length', e?.target?.value)}
              placeholder="Length"
              min="0.1"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">Length</span>
          </div>
          <div>
            <Input
              type="number"
              value={loadConfig?.dimensions?.width}
              onChange={(e) => handleInputChange('dimensions.width', e?.target?.value)}
              placeholder="Width"
              min="0.1"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">Width</span>
          </div>
          <div>
            <Input
              type="number"
              value={loadConfig?.dimensions?.height}
              onChange={(e) => handleInputChange('dimensions.height', e?.target?.value)}
              placeholder="Height"
              min="0.1"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">Height</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Overall dimensions for wind load calculation
        </p>
      </div>
      {/* Center of Gravity */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Center of Gravity (meters from origin)
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Input
              type="number"
              value={loadConfig?.centerOfGravity?.x}
              onChange={(e) => handleInputChange('centerOfGravity.x', e?.target?.value)}
              placeholder="X"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">X</span>
          </div>
          <div>
            <Input
              type="number"
              value={loadConfig?.centerOfGravity?.y}
              onChange={(e) => handleInputChange('centerOfGravity.y', e?.target?.value)}
              placeholder="Y"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">Y</span>
          </div>
          <div>
            <Input
              type="number"
              value={loadConfig?.centerOfGravity?.z}
              onChange={(e) => handleInputChange('centerOfGravity.z', e?.target?.value)}
              placeholder="Z"
              step="0.1"
              className="w-full text-sm"
            />
            <span className="text-xs text-text-secondary">Z</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Critical for stability and rigging calculations
        </p>
      </div>
      {/* Lifting Points */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Number of Lifting Points
        </label>
        <Input
          type="number"
          value={loadConfig?.liftingPoints}
          onChange={(e) => handleInputChange('liftingPoints', e?.target?.value)}
          placeholder="Number of lifting points"
          min="1"
          max="8"
          step="1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Affects load distribution and sling angles
        </p>
      </div>
      {/* Rigging Weight */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Rigging Weight (tonnes)
        </label>
        <Input
          type="number"
          value={loadConfig?.riggingWeight}
          onChange={(e) => handleInputChange('riggingWeight', e?.target?.value)}
          placeholder="Enter rigging weight"
          min="0"
          step="0.1"
          className="w-full"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Includes slings, shackles, spreader beams, etc.
        </p>
      </div>
      {/* Dynamic Factor (for dynamic calculations) */}
      {calculationType === 'dynamic' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Dynamic Amplification Factor
          </label>
          <Input
            type="number"
            value={loadConfig?.dynamicFactor}
            onChange={(e) => handleInputChange('dynamicFactor', e?.target?.value)}
            placeholder="Dynamic factor"
            min="1.0"
            max="2.0"
            step="0.05"
            className="w-full"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Typical values: 1.15 (normal), 1.25 (fast), 1.5 (impact)
          </p>
        </div>
      )}
      {/* Load Summary */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Calculator" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-secondary-800">Load Summary</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-700">Net Load:</span>
            <span className="font-medium">{loadConfig?.weight}t</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-700">Rigging:</span>
            <span className="font-medium">{loadConfig?.riggingWeight}t</span>
          </div>
          <div className="flex justify-between border-t border-secondary-300 pt-2">
            <span className="text-secondary-700 font-medium">Total Static:</span>
            <span className="font-bold">
              {(loadConfig?.weight + loadConfig?.riggingWeight)?.toFixed(1)}t
            </span>
          </div>
          {calculationType === 'dynamic' && (
            <div className="flex justify-between">
              <span className="text-secondary-700 font-medium">Total Dynamic:</span>
              <span className="font-bold text-warning-700">
                {((loadConfig?.weight + loadConfig?.riggingWeight) * loadConfig?.dynamicFactor)?.toFixed(1)}t
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-secondary-700">Load Volume:</span>
            <span className="font-medium">
              {(loadConfig?.dimensions?.length * loadConfig?.dimensions?.width * loadConfig?.dimensions?.height)?.toFixed(1)}m³
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-700">Lifting Points:</span>
            <span className="font-medium">{loadConfig?.liftingPoints} points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadConfiguration;