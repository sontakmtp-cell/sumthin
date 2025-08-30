import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisFilters = ({ filters, onFilterChange, className = '' }) => {
  const [expandedSection, setExpandedSection] = useState('operational');

  const filterSections = [
    {
      id: 'operational',
      title: 'Operational Scenarios',
      icon: 'Settings',
      filters: [
        {
          key: 'operationalScenario',
          label: 'Scenario Type',
          type: 'select',
          value: filters?.operationalScenario || 'standard',
          options: [
            { value: 'standard', label: 'Standard Operation' },
            { value: 'heavy-lift', label: 'Heavy Lift Operation' },
            { value: 'precision', label: 'Precision Placement' },
            { value: 'multiple-crane', label: 'Multiple Crane Operation' },
            { value: 'confined-space', label: 'Confined Space Operation' }
          ]
        },
        {
          key: 'loadType',
          label: 'Load Type',
          type: 'select',
          value: filters?.loadType || 'general',
          options: [
            { value: 'general', label: 'General Cargo' },
            { value: 'steel', label: 'Steel Structures' },
            { value: 'concrete', label: 'Concrete Elements' },
            { value: 'machinery', label: 'Heavy Machinery' },
            { value: 'personnel', label: 'Personnel Platform' }
          ]
        }
      ]
    },
    {
      id: 'environmental',
      title: 'Weather Conditions',
      icon: 'Cloud',
      filters: [
        {
          key: 'weatherCondition',
          label: 'Weather Status',
          type: 'select',
          value: filters?.weatherCondition || 'normal',
          options: [
            { value: 'normal', label: 'Normal Conditions' },
            { value: 'windy', label: 'Windy (5-10 m/s)' },
            { value: 'high-wind', label: 'High Wind (10-15 m/s)' },
            { value: 'rain', label: 'Light Rain' },
            { value: 'heavy-rain', label: 'Heavy Rain' },
            { value: 'snow', label: 'Snow Conditions' }
          ]
        },
        {
          key: 'temperature',
          label: 'Temperature Range',
          type: 'select',
          value: filters?.temperature || 'normal',
          options: [
            { value: 'cold', label: 'Cold (<0°C)' },
            { value: 'normal', label: 'Normal (0-30°C)' },
            { value: 'hot', label: 'Hot (>30°C)' }
          ]
        }
      ]
    },
    {
      id: 'configuration',
      title: 'Crane Configuration',
      icon: 'Truck',
      filters: [
        {
          key: 'craneConfiguration',
          label: 'Crane Type',
          type: 'select',
          value: filters?.craneConfiguration || 'default',
          options: [
            { value: 'default', label: 'Standard Mobile Crane' },
            { value: 'tower', label: 'Tower Crane' },
            { value: 'crawler', label: 'Crawler Crane' },
            { value: 'rough-terrain', label: 'Rough Terrain Crane' },
            { value: 'all-terrain', label: 'All Terrain Crane' }
          ]
        },
        {
          key: 'boomLength',
          label: 'Boom Configuration',
          type: 'select',
          value: filters?.boomLength || 'standard',
          options: [
            { value: 'minimum', label: 'Minimum Extension' },
            { value: 'standard', label: 'Standard Extension' },
            { value: 'extended', label: 'Extended Length' },
            { value: 'maximum', label: 'Maximum Extension' }
          ]
        }
      ]
    },
    {
      id: 'analysis',
      title: 'Analysis Parameters',
      icon: 'BarChart',
      filters: [
        {
          key: 'timeRange',
          label: 'Time Range',
          type: 'select',
          value: filters?.timeRange || '24h',
          options: [
            { value: '1h', label: 'Last Hour' },
            { value: '6h', label: 'Last 6 Hours' },
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' }
          ]
        },
        {
          key: 'safetyFactor',
          label: 'Safety Factor',
          type: 'select',
          value: filters?.safetyFactor || 'standard',
          options: [
            { value: 'conservative', label: 'Conservative (2.5x)' },
            { value: 'standard', label: 'Standard (2.0x)' },
            { value: 'minimal', label: 'Minimal (1.5x)' }
          ]
        }
      ]
    }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange?.(key, value);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const resetFilters = () => {
    const defaultFilters = {
      operationalScenario: 'standard',
      weatherCondition: 'normal',
      craneConfiguration: 'default',
      timeRange: '24h',
      loadType: 'general',
      temperature: 'normal',
      boomLength: 'standard',
      safetyFactor: 'standard'
    };
    
    Object.entries(defaultFilters)?.forEach(([key, value]) => {
      handleFilterChange(key, value);
    });
  };

  const getActiveFiltersCount = () => {
    const defaultValues = ['standard', 'normal', 'default', '24h', 'general'];
    return Object.values(filters || {})?.filter(value => 
      !defaultValues?.includes(value)
    )?.length;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary">Analysis Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <p className="text-xs text-text-secondary">
                {getActiveFiltersCount()} active filters
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={resetFilters}
          className="text-xs text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Reset All
        </button>
      </div>
      {/* Filter Sections */}
      <div className="divide-y divide-border">
        {filterSections?.map((section) => (
          <div key={section?.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={section?.icon} 
                  size={16} 
                  color="var(--color-text-secondary)" 
                />
                <span className="text-sm font-medium text-text-primary">
                  {section?.title}
                </span>
              </div>
              <Icon 
                name={expandedSection === section?.id ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                color="var(--color-text-secondary)" 
              />
            </button>

            {/* Section Content */}
            {expandedSection === section?.id && (
              <div className="px-4 pb-4 space-y-4">
                {section?.filters?.map((filter) => (
                  <div key={filter?.key}>
                    <label className="block text-xs font-medium text-text-secondary mb-2">
                      {filter?.label}
                    </label>
                    
                    {filter?.type === 'select' && (
                      <select
                        value={filter?.value}
                        onChange={(e) => handleFilterChange(filter?.key, e?.target?.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      >
                        {filter?.options?.map((option) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Filter Presets */}
      <div className="p-4 border-t border-border">
        <h4 className="text-xs font-medium text-text-secondary mb-3">
          Quick Presets
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              handleFilterChange('operationalScenario', 'heavy-lift');
              handleFilterChange('safetyFactor', 'conservative');
              handleFilterChange('weatherCondition', 'normal');
            }}
            className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            Heavy Lift Operation
          </button>
          <button
            onClick={() => {
              handleFilterChange('weatherCondition', 'windy');
              handleFilterChange('safetyFactor', 'conservative');
              handleFilterChange('operationalScenario', 'standard');
            }}
            className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            Adverse Weather
          </button>
          <button
            onClick={() => {
              handleFilterChange('operationalScenario', 'precision');
              handleFilterChange('safetyFactor', 'standard');
              handleFilterChange('boomLength', 'extended');
            }}
            className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            Precision Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFilters;