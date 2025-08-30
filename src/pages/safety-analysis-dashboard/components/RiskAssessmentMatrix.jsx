import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const RiskAssessmentMatrix = ({ filters, className = '' }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [showMitigationModal, setShowMitigationModal] = useState(false);

  // Risk matrix configuration
  const probabilityLevels = [
    { id: 5, label: 'Very High', description: 'Almost certain to occur', color: 'error' },
    { id: 4, label: 'High', description: 'Likely to occur', color: 'error' },
    { id: 3, label: 'Medium', description: 'Possible to occur', color: 'warning' },
    { id: 2, label: 'Low', description: 'Unlikely to occur', color: 'warning' },
    { id: 1, label: 'Very Low', description: 'Rare occurrence', color: 'success' }
  ];

  const consequenceLevels = [
    { id: 1, label: 'Negligible', description: 'Minimal impact', color: 'success' },
    { id: 2, label: 'Minor', description: 'Small impact', color: 'warning' },
    { id: 3, label: 'Moderate', description: 'Medium impact', color: 'warning' },
    { id: 4, label: 'Major', description: 'Significant impact', color: 'error' },
    { id: 5, label: 'Catastrophic', description: 'Severe impact', color: 'error' }
  ];

  // Generate risk scenarios based on filters
  const riskScenarios = useMemo(() => {
    const baseScenarios = [
      {
        id: 'structural-failure',
        name: 'Structural Failure',
        description: 'Boom or jib structural failure under load',
        probability: filters?.operationalScenario === 'heavy-lift' ? 3 : 2,
        consequence: 5,
        currentControls: ['Regular inspections', 'Load monitoring', 'Structural analysis'],
        residualRisk: 'Medium'
      },
      {
        id: 'tip-over',
        name: 'Crane Tip-Over',
        description: 'Crane instability leading to tip-over',
        probability: filters?.weatherCondition === 'high-wind' ? 4 : 2,
        consequence: 5,
        currentControls: ['Stability monitoring', 'Outrigger deployment', 'Load charts'],
        residualRisk: 'Medium'
      },
      {
        id: 'load-drop',
        name: 'Load Drop',
        description: 'Accidental dropping of suspended load',
        probability: filters?.operationalScenario === 'precision' ? 3 : 2,
        consequence: 4,
        currentControls: ['Rigging inspection', 'Load securing', 'Operator training'],
        residualRisk: 'Low'
      },
      {
        id: 'collision',
        name: 'Collision Risk',
        description: 'Collision with structures or other equipment',
        probability: filters?.operationalScenario === 'confined-space' ? 4 : 2,
        consequence: 3,
        currentControls: ['Site survey', 'Proximity sensors', 'Communication protocols'],
        residualRisk: 'Low'
      },
      {
        id: 'operator-error',
        name: 'Operator Error',
        description: 'Human error in crane operation',
        probability: 3,
        consequence: 3,
        currentControls: ['Training programs', 'Certification', 'Supervision'],
        residualRisk: 'Medium'
      },
      {
        id: 'mechanical-failure',
        name: 'Mechanical Failure',
        description: 'Component failure affecting safety',
        probability: 2,
        consequence: 4,
        currentControls: ['Preventive maintenance', 'Component monitoring', 'Backup systems'],
        residualRisk: 'Low'
      }
    ];

    return baseScenarios;
  }, [filters]);

  // Calculate risk level color
  const getRiskColor = (probability, consequence) => {
    const riskScore = probability * consequence;
    if (riskScore >= 15) return 'error';
    if (riskScore >= 10) return 'warning';
    if (riskScore >= 5) return 'warning';
    return 'success';
  };

  // Get mitigation strategies for selected risk
  const getMitigationStrategies = (riskId) => {
    const strategies = {
      'structural-failure': [
        'Implement more frequent NDT inspections',
        'Upgrade to higher capacity components',
        'Install real-time structural monitoring system',
        'Reduce working loads by 10%'
      ],
      'tip-over': [
        'Install automatic stability monitoring system',
        'Implement wind speed limitations',
        'Use extended outrigger mats',
        'Provide additional counterweight'
      ],
      'load-drop': [
        'Upgrade to redundant rigging systems',
        'Implement load monitoring with automatic alerts',
        'Enhanced rigging training program',
        'Use certified lifting accessories only'
      ],
      'collision': [
        'Install 360° proximity monitoring system',
        'Implement exclusion zones',
        'Use additional spotters',
        'Install crane-mounted cameras'
      ],
      'operator-error': [
        'Implement simulator-based training',
        'Add load moment indicator system',
        'Provide continuous supervision',
        'Use operator fatigue monitoring'
      ],
      'mechanical-failure': [
        'Implement condition-based maintenance',
        'Install redundant safety systems',
        'Use predictive maintenance analytics',
        'Maintain emergency spare parts inventory'
      ]
    };

    return strategies?.[riskId] || [];
  };

  const handleCellClick = (probability, consequence) => {
    const cellRisks = riskScenarios?.filter(
      risk => risk?.probability === probability && risk?.consequence === consequence
    );
    
    setSelectedCell({
      probability,
      consequence,
      risks: cellRisks,
      riskLevel: getRiskColor(probability, consequence)
    });
  };

  const handleMitigationClick = (riskId) => {
    setShowMitigationModal(riskId);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Risk Assessment Matrix</h2>
          <p className="text-sm text-text-secondary mt-1">
            Click cells to view detailed risk scenarios and mitigation strategies
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
            <Icon name="Download" size={16} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
      <div className="p-6">
        {/* Risk Matrix */}
        <div className="mb-8">
          <div className="grid grid-cols-6 gap-1">
            {/* Header row */}
            <div className="p-3 text-center">
              <span className="text-sm font-medium text-text-secondary">Probability</span>
            </div>
            {consequenceLevels?.map((consequence) => (
              <div key={consequence?.id} className="p-3 text-center">
                <div className="text-xs font-medium text-text-primary">{consequence?.label}</div>
                <div className="text-xs text-text-secondary mt-1">{consequence?.description}</div>
              </div>
            ))}

            {/* Matrix cells */}
            {probabilityLevels?.map((probability) => (
              <React.Fragment key={probability?.id}>
                {/* Probability label */}
                <div className="p-3 text-right">
                  <div className="text-xs font-medium text-text-primary">{probability?.label}</div>
                  <div className="text-xs text-text-secondary mt-1">{probability?.description}</div>
                </div>
                
                {/* Risk cells */}
                {consequenceLevels?.map((consequence) => {
                  const riskColor = getRiskColor(probability?.id, consequence?.id);
                  const cellRisks = riskScenarios?.filter(
                    risk => risk?.probability === probability?.id && risk?.consequence === consequence?.id
                  );
                  
                  return (
                    <button
                      key={`${probability?.id}-${consequence?.id}`}
                      onClick={() => handleCellClick(probability?.id, consequence?.id)}
                      className={`p-3 border-2 border-transparent hover:border-text-primary transition-all duration-200 bg-${riskColor}-100 hover:bg-${riskColor}-200 relative group`}
                    >
                      <div className="text-xs font-bold text-text-primary">
                        {probability?.id * consequence?.id}
                      </div>
                      {cellRisks?.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{cellRisks?.length}</span>
                        </div>
                      )}
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        Risk Score: {probability?.id * consequence?.id}
                      </div>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Risk Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-success-100 rounded-lg">
            <div className="w-4 h-4 bg-success rounded" />
            <div>
              <div className="text-sm font-medium text-success-700">Low Risk</div>
              <div className="text-xs text-success-600">Score: 1-4</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-warning-100 rounded-lg">
            <div className="w-4 h-4 bg-warning rounded" />
            <div>
              <div className="text-sm font-medium text-warning-700">Medium Risk</div>
              <div className="text-xs text-warning-600">Score: 5-14</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-error-100 rounded-lg">
            <div className="w-4 h-4 bg-error rounded" />
            <div>
              <div className="text-sm font-medium text-error-700">High Risk</div>
              <div className="text-xs text-error-600">Score: 15-25</div>
            </div>
          </div>
        </div>

        {/* Selected Cell Details */}
        {selectedCell && (
          <div className="border border-border rounded-lg p-4 bg-secondary-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-medium text-text-primary">
                Risk Details - Score: {selectedCell?.probability * selectedCell?.consequence}
              </h4>
              <div className={`px-3 py-1 rounded-full bg-${selectedCell?.riskLevel}-100`}>
                <span className={`text-sm font-medium text-${selectedCell?.riskLevel}-700`}>
                  {selectedCell?.riskLevel === 'error' ? 'High' : selectedCell?.riskLevel === 'warning' ? 'Medium' : 'Low'} Risk
                </span>
              </div>
            </div>

            {selectedCell?.risks?.length > 0 ? (
              <div className="space-y-3">
                {selectedCell?.risks?.map((risk) => (
                  <div key={risk?.id} className="bg-surface border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-text-primary">{risk?.name}</h5>
                        <p className="text-sm text-text-secondary mt-1">{risk?.description}</p>
                      </div>
                      <button
                        onClick={() => handleMitigationClick(risk?.id)}
                        className="px-3 py-1 text-xs bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        View Mitigation
                      </button>
                    </div>
                    
                    <div className="text-xs text-text-secondary">
                      <strong>Current Controls:</strong> {risk?.currentControls?.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">No identified risks in this category.</p>
            )}
          </div>
        )}
      </div>
      {/* Mitigation Modal */}
      {showMitigationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface border border-border rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                Mitigation Strategies
              </h3>
              <button
                onClick={() => setShowMitigationModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {getMitigationStrategies(showMitigationModal)?.map((strategy, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-text-primary">{strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentMatrix;