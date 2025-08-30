import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PresetTemplates = ({ onLoadPreset }) => {
  const [selectedPreset, setSelectedPreset] = useState('');

  const presetTemplates = [
    {
      id: 'light-duty',
      name: 'Light Duty Bridge Crane',
      description: 'Small capacity crane for light industrial use',
      specs: {
        basic: {
          craneType: 'overhead',
          capacity: 5,
          span: 15,
          liftingHeight: 8,
          trolleySpeed: 15,
          bridgeSpeed: 20,
          hoistingSpeed: 8
        },
        environmental: {
          windSpeed: 10,
          temperature: 20,
          groundConditions: 'concrete',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.25,
          operationalLimits: 80,
          loadChart: 'manufacturer'
        }
      }
    },
    {
      id: 'medium-duty',
      name: 'Medium Duty Bridge Crane',
      description: 'Standard capacity crane for general industrial use',
      specs: {
        basic: {
          craneType: 'overhead',
          capacity: 25,
          span: 25,
          liftingHeight: 12,
          trolleySpeed: 20,
          bridgeSpeed: 25,
          hoistingSpeed: 12
        },
        environmental: {
          windSpeed: 15,
          temperature: 20,
          groundConditions: 'concrete',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.25,
          operationalLimits: 85,
          loadChart: 'manufacturer'
        }
      }
    },
    {
      id: 'heavy-duty',
      name: 'Heavy Duty Bridge Crane',
      description: 'High capacity crane for heavy industrial applications',
      specs: {
        basic: {
          craneType: 'overhead',
          capacity: 100,
          span: 40,
          liftingHeight: 20,
          trolleySpeed: 25,
          bridgeSpeed: 30,
          hoistingSpeed: 15
        },
        environmental: {
          windSpeed: 20,
          temperature: 20,
          groundConditions: 'steel',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.5,
          operationalLimits: 90,
          loadChart: 'manufacturer'
        }
      }
    },
    {
      id: 'gantry-crane',
      name: 'Gantry Crane Template',
      description: 'Outdoor gantry crane configuration',
      specs: {
        basic: {
          craneType: 'gantry',
          capacity: 50,
          span: 30,
          liftingHeight: 15,
          trolleySpeed: 18,
          bridgeSpeed: 22,
          hoistingSpeed: 10
        },
        environmental: {
          windSpeed: 25,
          temperature: 25,
          groundConditions: 'firm',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.35,
          operationalLimits: 85,
          loadChart: 'manufacturer'
        }
      }
    }
  ];

  const handlePresetChange = (presetId) => {
    setSelectedPreset(presetId);
  };

  const handleLoadPreset = () => {
    if (selectedPreset) {
      const preset = presetTemplates.find(p => p.id === selectedPreset);
      if (preset) {
        onLoadPreset(preset.specs);
        setSelectedPreset('');
      }
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Preset Templates</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {presetTemplates.map((preset) => (
          <div
            key={preset.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedPreset === preset.id
                ? 'border-primary bg-primary-50'
                : 'border-border hover:border-primary hover:bg-primary-25'
            }`}
            onClick={() => handlePresetChange(preset.id)}
          >
            <div className="font-medium text-text-primary mb-1">{preset.name}</div>
            <div className="text-xs text-text-secondary mb-2">{preset.description}</div>
            <div className="text-sm">
              <span className="font-medium">{preset.specs.basic.capacity}t</span> capacity,{' '}
              <span className="font-medium">{preset.specs.basic.span}m</span> span
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {selectedPreset ? (
            <span>
              Selected: <span className="font-medium text-text-primary">
                {presetTemplates.find(p => p.id === selectedPreset)?.name}
              </span>
            </span>
          ) : (
            'Choose a template to quickly configure your bridge crane'
          )}
        </div>
        
        <button
          onClick={handleLoadPreset}
          disabled={!selectedPreset}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Icon name="Download" size={16} />
          <span>Load Template</span>
        </button>
      </div>
    </div>
  );
};

export default PresetTemplates;
