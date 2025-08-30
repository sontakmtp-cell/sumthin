import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HistoryManager = ({ history, selectedId, onLoadCalculation, onClearHistory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Calculation History</h3>
        </div>
        <div className="text-center text-text-secondary">
          <Icon name="Clock" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No calculations performed yet</p>
          <p className="text-xs mt-2">
            Your calculation history will appear here for easy access and comparison
          </p>
        </div>
      </div>
    );
  }

  const getCalculationTypeIcon = (type) => {
    switch (type) {
      case 'static': return 'Square';
      case 'dynamic': return 'TrendingUp';
      case 'multi-crane': return 'GitMerge';
      default: return 'Calculator';
    }
  };

  const getComplianceStatus = (compliance) => {
    return compliance?.overallStatus ? 'SAFE' : 'UNSAFE';
  };

  const getComplianceColor = (compliance) => {
    return compliance?.overallStatus ? 'text-success-600' : 'text-error-600';
  };

  const displayedHistory = isExpanded ? history : history?.slice(0, 3);

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Calculation History</h3>
          <span className="text-sm text-text-secondary">({history?.length})</span>
        </div>
        <div className="flex items-center space-x-2">
          {history?.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 text-sm text-secondary-600 hover:text-secondary-800 transition-colors"
            >
              {isExpanded ? 'Show Less' : `Show All (${history?.length})`}
            </button>
          )}
          <button
            onClick={onClearHistory}
            className="px-3 py-1 bg-error-100 text-error-700 rounded-md hover:bg-error-200 transition-colors text-sm flex items-center space-x-1"
          >
            <Icon name="Trash2" size={12} />
            <span>Clear</span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {displayedHistory?.map((calculation) => (
          <div
            key={calculation?.id}
            onClick={() => onLoadCalculation(calculation)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedId === calculation?.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getCalculationTypeIcon(calculation?.calculationType)} 
                  size={16}
                  className={selectedId === calculation?.id ? 'text-primary' : 'text-text-secondary'}
                />
                <div>
                  <div className={`font-medium ${
                    selectedId === calculation?.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {calculation?.calculationType?.charAt(0)?.toUpperCase() + calculation?.calculationType?.slice(1)} Calculation
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(calculation.timestamp)?.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-bold ${getComplianceColor(calculation?.compliance)}`}>
                  {getComplianceStatus(calculation?.compliance)}
                </div>
                <div className="text-xs text-text-secondary">
                  {calculation?.utilizationPercentage?.toFixed(1)}% utilized
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Load:</span>
                <div className="font-medium">{calculation?.effectiveLoad?.toFixed(1)}t</div>
              </div>
              <div>
                <span className="text-text-secondary">Crane:</span>
                <div className="font-medium capitalize">{calculation?.craneSpecs?.basic?.craneType}</div>
              </div>
              <div>
                <span className="text-text-secondary">Safety Margin:</span>
                <div className="font-medium">{calculation?.safetyMargin?.toFixed(1)}t</div>
              </div>
            </div>

            {/* Compliance indicators */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={calculation?.compliance?.capacityCheck ? 'Check' : 'X'} 
                    size={12}
                    className={calculation?.compliance?.capacityCheck ? 'text-success-600' : 'text-error-600'}
                  />
                  <span className="text-xs text-text-secondary">Capacity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={calculation?.compliance?.stabilityCheck ? 'Check' : 'X'} 
                    size={12}
                    className={calculation?.compliance?.stabilityCheck ? 'text-success-600' : 'text-error-600'}
                  />
                  <span className="text-xs text-text-secondary">Stability</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={calculation?.compliance?.utilizationCheck ? 'Check' : 'X'} 
                    size={12}
                    className={calculation?.compliance?.utilizationCheck ? 'text-success-600' : 'text-error-600'}
                  />
                  <span className="text-xs text-text-secondary">Utilization</span>
                </div>
              </div>
              
              {selectedId === calculation?.id && (
                <div className="text-xs text-primary font-medium">Currently Loaded</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {history?.length > 3 && !isExpanded && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-primary hover:text-primary-700 transition-colors"
          >
            Show {history?.length - 3} more calculations
          </button>
        </div>
      )}
      {/* History Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div>
            Click any calculation to load its parameters
          </div>
          <div className="flex items-center space-x-4">
            <span>Total calculations: {history?.length}</span>
            <span>Storage: ~{(JSON.stringify(history)?.length / 1024)?.toFixed(1)}KB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryManager;