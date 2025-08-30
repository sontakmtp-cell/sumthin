import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsSidebar = ({ results, craneSpecs, isCalculating }) => {
  if (isCalculating) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary">Performing calculations...</p>
          <p className="text-xs text-text-secondary mt-2">
            Analyzing load capacity, stability, and safety margins
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-semibold text-text-primary">Calculation Results</h3>
        </div>
        <div className="text-center text-text-secondary">
          <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Click "Calculate" to perform load analysis</p>
          <p className="text-xs mt-2">
            Results will show capacity utilization, safety margins, and compliance status
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (isCompliant) => {
    return isCompliant ? 'text-success-600' : 'text-error-600';
  };

  const getStatusIcon = (isCompliant) => {
    return isCompliant ? 'CheckCircle' : 'AlertTriangle';
  };

  const getUtilizationColor = (percentage) => {
    if (percentage <= 75) return 'text-success-600';
    if (percentage <= 85) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Safety Status</h3>
        </div>

        <div className={`p-4 rounded-lg border-2 ${
          results?.compliance?.overallStatus 
            ? 'bg-success-50 border-success-200' :'bg-error-50 border-error-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <Icon 
              name={getStatusIcon(results?.compliance?.overallStatus)} 
              size={24}
              className={getStatusColor(results?.compliance?.overallStatus)}
            />
            <div>
              <div className={`font-bold text-lg ${getStatusColor(results?.compliance?.overallStatus)}`}>
                {results?.compliance?.overallStatus ? 'SAFE TO LIFT' : 'UNSAFE CONDITIONS'}
              </div>
              <div className="text-sm text-text-secondary">
                Overall compliance status
              </div>
            </div>
          </div>

          {!results?.compliance?.overallStatus && (
            <div className="text-sm text-error-700">
              ⚠️ Review failed checks below before proceeding
            </div>
          )}
        </div>
      </div>
      {/* Key Results */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Key Results</h3>

        <div className="space-y-4">
          {/* Capacity Utilization */}
          <div className="p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Capacity Utilization</span>
              <Icon 
                name={getStatusIcon(results?.compliance?.capacityCheck)}
                size={16}
                className={getStatusColor(results?.compliance?.capacityCheck)}
              />
            </div>
            <div className={`text-2xl font-bold ${getUtilizationColor(results?.utilizationPercentage)}`}>
              {results?.utilizationPercentage?.toFixed(1)}%
            </div>
            <div className="text-xs text-text-secondary">
              {results?.effectiveLoad?.toFixed(1)}t / {results?.netCapacity?.toFixed(1)}t net capacity
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  results?.utilizationPercentage <= 75 ? 'bg-success-500' :
                  results?.utilizationPercentage <= 85 ? 'bg-warning-500' : 'bg-error-500'
                }`}
                style={{ width: `${Math.min(results?.utilizationPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Safety Margin */}
          <div className="p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Safety Margin</span>
              <Icon name="TrendingUp" size={16} className="text-text-secondary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {results?.safetyMargin?.toFixed(1)}t
            </div>
            <div className="text-xs text-text-secondary">
              Available capacity remaining
            </div>
          </div>

          {/* Stability Ratio */}
          <div className="p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Stability Ratio</span>
              <Icon 
                name={getStatusIcon(results?.compliance?.stabilityCheck)}
                size={16}
                className={getStatusColor(results?.compliance?.stabilityCheck)}
              />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(results?.compliance?.stabilityCheck)}`}>
              {results?.stabilityRatio?.toFixed(2)}:1
            </div>
            <div className="text-xs text-text-secondary">
              Minimum required: 1.5:1
            </div>
          </div>
        </div>
      </div>
      {/* Compliance Checklist */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Compliance Check</h3>

        <div className="space-y-3">
          {[
            { 
              key: 'capacityCheck', 
              label: 'Load Capacity', 
              detail: `${results?.effectiveLoad?.toFixed(1)}t ≤ ${results?.netCapacity?.toFixed(1)}t` 
            },
            { 
              key: 'stabilityCheck', 
              label: 'Stability', 
              detail: `${results?.stabilityRatio?.toFixed(2)}:1 ≥ 1.5:1` 
            },
            { 
              key: 'utilizationCheck', 
              label: 'Utilization Limit', 
              detail: `${results?.utilizationPercentage?.toFixed(1)}% ≤ 85%` 
            },
            { 
              key: 'windCheck', 
              label: 'Wind Conditions', 
              detail: `${craneSpecs?.environmental?.windSpeed || 0} km/h ≤ 35 km/h` 
            }
          ]?.map((check) => (
            <div key={check?.key} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-text-primary">{check?.label}</div>
                <div className="text-xs text-text-secondary">{check?.detail}</div>
              </div>
              <Icon 
                name={getStatusIcon(results?.compliance?.[check?.key])}
                size={20}
                className={getStatusColor(results?.compliance?.[check?.key])}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Environmental Impact */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Environmental Factors</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Wind Speed:</span>
            <span className={`font-medium ${
              (craneSpecs?.environmental?.windSpeed || 0) > 35 ? 'text-error-600' :
              (craneSpecs?.environmental?.windSpeed || 0) > 20 ? 'text-warning-600' : 'text-success-600'
            }`}>
              {craneSpecs?.environmental?.windSpeed || 0} km/h
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Wind Load Added:</span>
            <span className="font-medium">{results?.windLoad?.toFixed(2)}t</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Ground Conditions:</span>
            <span className="font-medium capitalize">{craneSpecs?.environmental?.groundConditions || 'firm'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Temperature:</span>
            <span className="font-medium">{craneSpecs?.environmental?.temperature || 20}°C</span>
          </div>
        </div>
      </div>
      {/* Calculation Details */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Calculation Summary</h3>
        </div>

        <div className="text-xs text-text-secondary space-y-2">
          <div>
            <strong>Calculation Type:</strong> {results?.calculationType?.charAt(0)?.toUpperCase() + results?.calculationType?.slice(1)}
          </div>
          <div>
            <strong>Timestamp:</strong> {new Date(results.timestamp)?.toLocaleString()}
          </div>
          <div>
            <strong>Safety Factor:</strong> {craneSpecs?.safety?.safetyFactor || 1.25}x
          </div>
          <div>
            <strong>Operational Limit:</strong> {craneSpecs?.safety?.operationalLimits || 85}%
          </div>
          {results?.calculationType === 'dynamic' && (
            <div>
              <strong>Dynamic Factor:</strong> {results?.loadConfiguration?.dynamicFactor}x
            </div>
          )}
          {results?.multiCraneData && (
            <div>
              <strong>Coordination Factor:</strong> {results?.multiCraneData?.coordinationFactor}x
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSidebar;