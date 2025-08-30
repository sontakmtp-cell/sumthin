import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyIndicatorCards = ({ stabilityMargin, loadFactor, complianceStatus }) => {
  // Traffic light color coding logic
  const getStabilityStatus = (margin) => {
    if (margin >= 2.0) return { color: 'success', status: 'Excellent', icon: 'CheckCircle' };
    if (margin >= 1.5) return { color: 'warning', status: 'Acceptable', icon: 'AlertTriangle' };
    return { color: 'error', status: 'Critical', icon: 'XCircle' };
  };

  const getLoadFactorStatus = (factor) => {
    if (factor <= 0.8) return { color: 'success', status: 'Safe', icon: 'CheckCircle' };
    if (factor <= 0.9) return { color: 'warning', status: 'Monitor', icon: 'AlertTriangle' };
    return { color: 'error', status: 'Overload', icon: 'XCircle' };
  };

  const getComplianceStatus = (status) => {
    if (status === 'compliant') return { color: 'success', status: 'Compliant', icon: 'Shield' };
    if (status === 'warning') return { color: 'warning', status: 'Review Required', icon: 'AlertTriangle' };
    return { color: 'error', status: 'Non-Compliant', icon: 'XCircle' };
  };

  const stabilityStatus = getStabilityStatus(stabilityMargin || 0);
  const loadStatus = getLoadFactorStatus(loadFactor || 0);
  const compliance = getComplianceStatus(complianceStatus || 'unknown');

  const indicators = [
    {
      id: 'stability',
      title: 'Stability Margin',
      value: stabilityMargin?.toFixed(2) || '0.00',
      unit: 'factor',
      status: stabilityStatus,
      description: 'Current crane stability coefficient',
      trend: stabilityMargin > 2.0 ? 'up' : stabilityMargin < 1.5 ? 'down' : 'stable'
    },
    {
      id: 'load',
      title: 'Load Factor',
      value: loadFactor?.toFixed(2) || '0.00',
      unit: 'ratio',
      status: loadStatus,
      description: 'Current load vs. maximum capacity',
      trend: loadFactor < 0.8 ? 'down' : loadFactor > 0.9 ? 'up' : 'stable'
    },
    {
      id: 'compliance',
      title: 'Compliance Status',
      value: compliance?.status || 'Unknown',
      unit: '',
      status: compliance,
      description: 'Regulatory compliance assessment',
      trend: 'stable'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend, status) => {
    if (status?.color === 'error') return 'text-error';
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-warning';
    return 'text-secondary-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {indicators?.map((indicator) => (
        <div
          key={indicator?.id}
          className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${indicator?.status?.color}-100`}>
                <Icon 
                  name={indicator?.status?.icon} 
                  size={20} 
                  color={`var(--color-${indicator?.status?.color})`} 
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary">{indicator?.title}</h3>
                <p className="text-xs text-secondary-400">{indicator?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTrendIcon(indicator?.trend)} 
                size={16} 
                className={getTrendColor(indicator?.trend, indicator?.status)}
              />
            </div>
          </div>

          {/* Value Display */}
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-text-primary">
                {indicator?.value}
              </span>
              {indicator?.unit && (
                <span className="text-sm text-text-secondary">{indicator?.unit}</span>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-${indicator?.status?.color}-100 text-${indicator?.status?.color}-700`}>
              <div className={`w-2 h-2 rounded-full bg-${indicator?.status?.color}`} />
              <span className="text-sm font-medium">{indicator?.status?.status}</span>
            </div>
            
            {/* Additional metrics button */}
            <button className="p-2 text-secondary-400 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyIndicatorCards;