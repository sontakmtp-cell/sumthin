import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';

const InteractiveCharts = ({ filters, safetyData }) => {
  const [activeChart, setActiveChart] = useState('stability');
  const [showTooltips, setShowTooltips] = useState(true);

  // Generate sample data based on filters
  const stabilityData = useMemo(() => {
    const baseData = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      baseData?.push({
        time: time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: time?.getTime(),
        stability: Math.max(1.5, Math.min(3.0, 2.2 + Math.sin(i * 0.3) * 0.4 + Math.random() * 0.2)),
        loadMoment: Math.max(50, Math.min(100, 70 + Math.cos(i * 0.4) * 15 + Math.random() * 5)),
        operationalEnvelope: Math.max(60, Math.min(95, 80 + Math.sin(i * 0.2) * 10))
      });
    }
    
    return baseData;
  }, [filters]);

  const loadMomentData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      radius: i * 2 + 10,
      moment: Math.max(0, 1000 - i * 15 + Math.random() * 100),
      safe: i * 15 < 800,
      category: i < 20 ? 'safe' : i < 35 ? 'caution' : 'critical'
    }));
  }, [filters]);

  const operationalEnvelopeData = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const angle = (i / 100) * 360;
      const radius = 30 + Math.sin((angle * Math.PI) / 180) * 10;
      return {
        angle,
        radius,
        safe: radius > 25,
        x: radius * Math.cos((angle * Math.PI) / 180),
        y: radius * Math.sin((angle * Math.PI) / 180)
      };
    });
  }, [filters]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length && showTooltips) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3 max-w-xs">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-text-secondary">{entry?.name}:</span>
              <span className="font-medium text-text-primary">
                {typeof entry?.value === 'number' ? entry?.value?.toFixed(2) : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartConfigs = [
    {
      id: 'stability',
      title: 'Stability Curves',
      description: '24-hour stability margin tracking',
      icon: 'Activity',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis 
              dataKey="time" 
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
              domain={[1.0, 3.5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="stability" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: 'var(--color-primary)' }}
              name="Stability Factor"
            />
            <Line 
              type="monotone" 
              dataKey="operationalEnvelope" 
              stroke="var(--color-accent)" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Operational Limit"
            />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'loadMoment',
      title: 'Load Moment Diagram',
      description: 'Load capacity vs. operating radius',
      icon: 'BarChart',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={loadMomentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis 
              type="number" 
              dataKey="radius" 
              name="Radius (m)"
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
            />
            <YAxis 
              type="number" 
              dataKey="moment" 
              name="Load Moment (kN·m)"
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={<CustomTooltip />}
            />
            <Scatter 
              name="Safe Operations" 
              dataKey="moment" 
              fill="var(--color-success)"
              data={loadMomentData?.filter(d => d?.category === 'safe')}
            />
            <Scatter 
              name="Caution Zone" 
              dataKey="moment" 
              fill="var(--color-warning)"
              data={loadMomentData?.filter(d => d?.category === 'caution')}
            />
            <Scatter 
              name="Critical Zone" 
              dataKey="moment" 
              fill="var(--color-error)"
              data={loadMomentData?.filter(d => d?.category === 'critical')}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'envelope',
      title: 'Operational Envelope',
      description: 'Safe working boundaries visualization',
      icon: 'Target',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis 
              dataKey="time" 
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12}
              tick={{ fill: '#64748B' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="operationalEnvelope" 
              stroke="var(--color-accent)" 
              fill="var(--color-accent-100)"
              fillOpacity={0.6}
              name="Safe Operating Zone"
            />
            <Area 
              type="monotone" 
              dataKey="loadMoment" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary-100)"
              fillOpacity={0.4}
              name="Current Load Distribution"
            />
          </AreaChart>
        </ResponsiveContainer>
      )
    }
  ];

  const activeChartConfig = chartConfigs?.find(chart => chart?.id === activeChart);

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Interactive Safety Charts</h2>
          <p className="text-sm text-text-secondary mt-1">
            Real-time safety visualization with hover analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-2">
            {chartConfigs?.map((chart) => (
              <button
                key={chart?.id}
                onClick={() => setActiveChart(chart?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeChart === chart?.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon name={chart?.icon} size={16} />
                <span className="hidden sm:inline">{chart?.title}</span>
              </button>
            ))}
          </div>

          {/* Chart Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTooltips(!showTooltips)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showTooltips
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
              }`}
              title={showTooltips ? 'Hide tooltips' : 'Show tooltips'}
            >
              <Icon name="Info" size={16} />
            </button>
            
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
              <Icon name="Download" size={16} />
            </button>
            
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        {activeChartConfig && (
          <div>
            <div className="mb-4">
              <h3 className="text-base font-medium text-text-primary">
                {activeChartConfig?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {activeChartConfig?.description}
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-4">
              {activeChartConfig?.component}
            </div>
          </div>
        )}
      </div>
      {/* Chart Legend */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-text-secondary">Primary Safety Metric</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-text-secondary">Safety Boundaries</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-text-secondary">Caution Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-text-secondary">Critical Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCharts;