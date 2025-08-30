import React from 'react';
import Icon from '../../../components/AppIcon';

const GantryDiagram = ({ specs, validationErrors, isMobile = false }) => {
  const hasErrors = Object.keys(validationErrors)?.length > 0;
  
  return (
    <div className="space-y-6">
      {/* Gantry Crane Diagram */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Image" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Gantry Crane Diagram</h3>
        </div>
        
        {/* Simple ASCII Diagram */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-4 font-mono text-xs">
          <div className="text-center">
            <div className="mb-2">    ┌─────────────────────────────────────┐</div>
            <div className="mb-2">    │           GANTRY CRANE             │</div>
            <div className="mb-2">    ├─────────────────────────────────────┤</div>
            <div className="mb-2">    │  ┌─────┐    ┌─────┐    ┌─────┐    │</div>
            <div className="mb-2">    │  │ Trolley │    │ Hook  │    │ Load  │    │</div>
            <div className="mb-2">    │  └─────┘    └─────┘    └─────┘    │</div>
            <div className="mb-2">    ├─────────────────────────────────────┤</div>
            <div className="mb-2">    │           Gantry Span              │</div>
            <div className="mb-2">    └─────────────────────────────────────┘</div>
            <div className="mt-2">         │                    │</div>
            <div className="mt-1">         │                    │</div>
            <div className="mt-1">      ┌──┴──┐              ┌──┴──┐</div>
            <div className="mt-1">      │ Leg │              │ Leg │</div>
            <div className="mt-1">      └─────┘              └─────┘</div>
            <div className="mt-2">         ↑                    ↑</div>
            <div className="mt-1">    Ground Support        Ground Support</div>
          </div>
        </div>
        
        {/* Key Dimensions */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-primary-50 p-3 rounded-lg">
            <div className="font-medium text-primary-800">Span</div>
            <div className="text-2xl font-bold text-primary-900">{specs?.basic?.span || 0}m</div>
          </div>
          <div className="bg-secondary-50 p-3 rounded-lg">
            <div className="font-medium text-secondary-800">Capacity</div>
            <div className="text-2xl font-bold text-secondary-900">{specs?.basic?.capacity || 0}t</div>
          </div>
        </div>
        
        {/* Additional Dimensions */}
        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div className="bg-info-50 p-3 rounded-lg">
            <div className="font-medium text-info-800">Height</div>
            <div className="text-xl font-bold text-info-900">{specs?.basic?.gantryHeight || 0}m</div>
          </div>
          <div className="bg-warning-50 p-3 rounded-lg">
            <div className="font-medium text-warning-800">Legs</div>
            <div className="text-xl font-bold text-warning-900">{specs?.basic?.legCount || 0}</div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Technical Specifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Crane Type:</span>
              <span className="font-medium">{specs?.basic?.craneType || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Lifting Height:</span>
              <span className="font-medium">{specs?.basic?.liftingHeight || 0}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Movement Type:</span>
              <span className="font-medium">{specs?.basic?.movementType || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Trolley Speed:</span>
              <span className="font-medium">{specs?.basic?.trolleySpeed || 0} m/min</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Gantry Speed:</span>
              <span className="font-medium">{specs?.basic?.gantrySpeed || 0} m/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Hoisting Speed:</span>
              <span className="font-medium">{specs?.basic?.hoistingSpeed || 0} m/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Safety Factor:</span>
              <span className="font-medium">{specs?.safety?.safetyFactor || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Leg Count:</span>
              <span className="font-medium">{specs?.basic?.legCount || 0} legs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Load Chart Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Load Chart & Safety</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <span className="text-text-secondary">Load Chart Reference:</span>
            <span className="font-medium">{specs?.safety?.loadChart || 'Not specified'}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <span className="text-text-secondary">Operational Limits:</span>
            <span className="font-medium">{specs?.safety?.operationalLimits || 0}%</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <span className="text-text-secondary">Environmental Conditions:</span>
            <span className="font-medium">{specs?.environmental?.windSpeed || 0} km/h wind</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <span className="text-text-secondary">Temperature Range:</span>
            <span className="font-medium">{specs?.environmental?.temperature || 0}°C</span>
          </div>
        </div>
      </div>

      {/* Validation Status */}
      {hasErrors && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error-600" />
            <h3 className="text-sm font-medium text-error-800">Specification Issues</h3>
          </div>
          <p className="text-sm text-error-700">
            Please review and correct the validation errors in the left panel before proceeding.
          </p>
        </div>
      )}

      {/* Mobile View Adjustments */}
      {isMobile && (
        <div className="bg-info-50 border border-info-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Smartphone" size={16} className="text-info-600" />
            <span className="text-sm font-medium text-info-800">Mobile View</span>
          </div>
          <p className="text-sm text-info-700">
            Use the specifications panel above to configure your gantry crane parameters.
          </p>
        </div>
      )}
    </div>
  );
};

export default GantryDiagram;
