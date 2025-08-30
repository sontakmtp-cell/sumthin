import React from 'react';
import Icon from '../../../components/AppIcon';

const CalculationTypeSelector = ({ selectedType, onChange }) => {
  const calculationTypes = [
    {
      id: 'static',
      label: 'Static Load',
      description: 'Standard lifting with stationary loads',
      icon: 'Square',
      complexity: 'Basic'
    },
    {
      id: 'dynamic',
      label: 'Dynamic Load',
      description: 'Moving loads with acceleration factors',
      icon: 'TrendingUp',
      complexity: 'Advanced'
    },
    {
      id: 'multi-crane',
      label: 'Multi-Crane',
      description: 'Coordinated lifting with multiple cranes',
      icon: 'GitMerge',
      complexity: 'Expert'
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-3">
        Calculation Type
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {calculationTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onChange(type?.id)}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
              selectedType === type?.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon 
                name={type?.icon} 
                size={20} 
                className={selectedType === type?.id ? 'text-primary' : 'text-text-secondary'} 
              />
              <div className="flex-1">
                <div className={`font-medium ${
                  selectedType === type?.id ? 'text-primary' : 'text-text-primary'
                }`}>
                  {type?.label}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                  type?.complexity === 'Basic' ? 'bg-success-100 text-success-700' :
                  type?.complexity === 'Advanced'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                }`}>
                  {type?.complexity}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary">
              {type?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Calculation Type Details */}
      {selectedType && (
        <div className="mt-4 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-800">
              {calculationTypes?.find(t => t?.id === selectedType)?.label} Analysis
            </span>
          </div>
          <div className="text-sm text-primary-700">
            {selectedType === 'static' && (
              <div>
                <p className="mb-2">Includes:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Dead load analysis</li>
                  <li>Rigging weight calculations</li>
                  <li>Basic wind load factors</li>
                  <li>Static stability verification</li>
                </ul>
              </div>
            )}
            {selectedType === 'dynamic' && (
              <div>
                <p className="mb-2">Includes:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Dynamic amplification factors</li>
                  <li>Acceleration and deceleration forces</li>
                  <li>Variable wind loading</li>
                  <li>Motion-induced stability effects</li>
                </ul>
              </div>
            )}
            {selectedType === 'multi-crane' && (
              <div>
                <p className="mb-2">Includes:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Load distribution between cranes</li>
                  <li>Coordination and synchronization factors</li>
                  <li>Combined stability analysis</li>
                  <li>Failure mode considerations</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculationTypeSelector;