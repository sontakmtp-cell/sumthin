import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PresetTemplates = ({ onLoadPreset }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const presetTemplates = [
    {
      id: 'mobile-50t',
      name: '50T Mobile Crane',
      description: 'Standard mobile crane for general construction',
      specs: {
        basic: {
          craneType: 'mobile',
          capacity: 50,
          boomLength: 35,
          counterweight: 15000,
          loadRadius: 12
        },
        environmental: {
          windSpeed: 15,
          temperature: 20,
          groundConditions: 'firm',
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
      id: 'tower-16t',
      name: '16T Tower Crane',
      description: 'High-rise construction tower crane',
      specs: {
        basic: {
          craneType: 'tower',
          capacity: 16,
          boomLength: 60,
          counterweight: 18000,
          loadRadius: 25
        },
        environmental: {
          windSpeed: 25,
          temperature: 15,
          groundConditions: 'paved',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.5,
          operationalLimits: 80,
          loadChart: 'manufacturer'
        }
      }
    },
    {
      id: 'crawler-200t',
      name: '200T Crawler Crane',
      description: 'Heavy lift crawler crane for industrial work',
      specs: {
        basic: {
          craneType: 'crawler',
          capacity: 200,
          boomLength: 50,
          counterweight: 45000,
          loadRadius: 15
        },
        environmental: {
          windSpeed: 20,
          temperature: 25,
          groundConditions: 'firm',
          visibility: 'good'
        },
        safety: {
          safetyFactor: 1.4,
          operationalLimits: 75,
          loadChart: 'manufacturer'
        }
      }
    },
    {
      id: 'overhead-10t',
      name: '10T Overhead Crane',
      description: 'Indoor warehouse and manufacturing crane',
      specs: {
        basic: {
          craneType: 'overhead',
          capacity: 10,
          boomLength: 20,
          counterweight: 5000,
          loadRadius: 8
        },
        environmental: {
          windSpeed: 5,
          temperature: 22,
          groundConditions: 'paved',
          visibility: 'clear'
        },
        safety: {
          safetyFactor: 1.6,
          operationalLimits: 90,
          loadChart: 'manufacturer'
        }
      }
    }
  ];

  const handleLoadPreset = () => {
    const template = presetTemplates?.find(t => t?.id === selectedTemplate);
    if (template) {
      onLoadPreset(template?.specs);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Preset Templates</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {presetTemplates?.map((template) => (
          <div
            key={template?.id}
            onClick={() => setSelectedTemplate(template?.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedTemplate === template?.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={
                  template?.specs?.basic?.craneType === 'mobile' ? 'Truck' :
                  template?.specs?.basic?.craneType === 'tower' ? 'Building' :
                  template?.specs?.basic?.craneType === 'crawler' ? 'Construction' : 'Factory'
                } 
                size={16} 
                className={selectedTemplate === template?.id ? 'text-primary' : 'text-text-secondary'} 
              />
              <h4 className={`font-medium ${
                selectedTemplate === template?.id ? 'text-primary' : 'text-text-primary'
              }`}>
                {template?.name}
              </h4>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              {template?.description}
            </p>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-text-secondary">Capacity:</span>
                <span className="font-medium">{template?.specs?.basic?.capacity}t</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Boom:</span>
                <span className="font-medium">{template?.specs?.basic?.boomLength}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Safety:</span>
                <span className="font-medium">{template?.specs?.safety?.safetyFactor}x</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="mt-4 flex items-center justify-between bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-primary" />
            <div>
              <div className="font-medium text-primary-800">
                {presetTemplates?.find(t => t?.id === selectedTemplate)?.name} Selected
              </div>
              <div className="text-sm text-primary-700">
                Load this template to start with pre-configured settings
              </div>
            </div>
          </div>
          <button
            onClick={handleLoadPreset}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Icon name="Upload" size={16} />
            <span>Load Template</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PresetTemplates;