import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const CraneDiagram = ({ specs, validationErrors, isMobile = false }) => {
  const canvasRef = useRef(null);
  const loadChartRef = useRef(null);

  // Draw crane diagram
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const width = canvas?.width;
    const height = canvas?.height;

    // Clear canvas
    ctx?.clearRect(0, 0, width, height);

    // Set up coordinate system (origin at bottom center)
    ctx?.save();
    ctx?.translate(width / 2, height - 50);
    ctx?.scale(1, -1);

    // Calculate scale based on boom length and canvas size
    const scale = Math.min(width * 0.4, height * 0.4) / (specs?.basic?.boomLength || 30);

    // Draw ground line
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    ctx?.beginPath();
    ctx?.moveTo(-width / 2, 0);
    ctx?.lineTo(width / 2, 0);
    ctx?.stroke();

    // Draw crane base
    ctx.fillStyle = '#374151';
    ctx?.fillRect(-20, 0, 40, 30);

    // Draw counterweight
    const counterweightSize = Math.max(10, (specs?.basic?.counterweight || 12000) / 1000);
    ctx.fillStyle = '#6B7280';
    ctx?.fillRect(-30 - counterweightSize, 15, counterweightSize, 25);

    // Draw boom
    const boomLength = (specs?.basic?.boomLength || 30) * scale;
    const boomAngle = Math.PI / 4; // 45 degrees
    const boomEndX = boomLength * Math.cos(boomAngle);
    const boomEndY = boomLength * Math.sin(boomAngle);

    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 4;
    ctx?.beginPath();
    ctx?.moveTo(0, 30);
    ctx?.lineTo(boomEndX, boomEndY + 30);
    ctx?.stroke();

    // Draw load radius
    const loadRadius = (specs?.basic?.loadRadius || 10) * scale;
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx?.setLineDash([5, 5]);
    ctx?.beginPath();
    ctx?.moveTo(0, 30);
    ctx?.lineTo(loadRadius, 30);
    ctx?.stroke();
    ctx?.setLineDash([]);

    // Draw load
    ctx.fillStyle = '#F59E0B';
    ctx?.fillRect(loadRadius - 8, 30, 16, 20);

    // Draw load block
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx?.beginPath();
    ctx?.moveTo(boomEndX, boomEndY + 30);
    ctx?.lineTo(loadRadius, 50);
    ctx?.stroke();

    ctx?.restore();

    // Add labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Boom length label
    ctx?.fillText(`${specs?.basic?.boomLength || 30}m boom`, width / 2 + 100, 80);
    
    // Load radius label
    ctx?.fillText(`${specs?.basic?.loadRadius || 10}m radius`, width / 2 - 50, height - 20);
    
    // Capacity label
    ctx?.fillText(`${specs?.basic?.capacity || 50}t capacity`, width / 2, 30);

  }, [specs]);

  // Generate load chart data
  const generateLoadChart = () => {
    const baseCapacity = specs?.basic?.capacity || 50;
    const boomLength = specs?.basic?.boomLength || 30;
    const safetyFactor = specs?.safety?.safetyFactor || 1.25;
    
    const chartData = [];
    for (let radius = 3; radius <= Math.min(boomLength * 0.8, 40); radius += 2) {
      // Simplified load chart calculation
      const capacity = Math.max(
        baseCapacity * Math.pow(3 / radius, 1.5) / safetyFactor,
        baseCapacity * 0.1
      );
      chartData?.push({
        radius: radius,
        capacity: Math.round(capacity * 10) / 10
      });
    }
    return chartData;
  };

  const loadChartData = generateLoadChart();

  return (
    <div className="space-y-6">
      {/* Crane Diagram */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Crane Configuration</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Maximize" size={16} />
            <span>Interactive View</span>
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={isMobile ? 300 : 400}
            height={isMobile ? 200 : 300}
            className="border border-border rounded-lg bg-slate-50 w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
          {/* Configuration Summary */}
          <div className="absolute top-4 right-4 bg-white/90 border border-border rounded-lg p-3 space-y-1">
            <div className="text-xs font-medium text-text-primary">Current Config</div>
            <div className="text-xs text-text-secondary">
              {specs?.basic?.craneType || 'mobile'} crane
            </div>
            <div className="text-xs text-text-secondary">
              {specs?.basic?.capacity || 50}t @ {specs?.basic?.loadRadius || 10}m
            </div>
            {validationErrors && Object.keys(validationErrors)?.length > 0 && (
              <div className="flex items-center space-x-1 text-error-600">
                <Icon name="AlertTriangle" size={12} />
                <span className="text-xs">Validation errors</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Load Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Load Chart</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {specs?.safety?.loadChart || 'manufacturer'} data
            </span>
            <Icon name="Database" size={16} className="text-text-secondary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium text-text-primary">
                  Radius (m)
                </th>
                <th className="text-left py-2 px-3 font-medium text-text-primary">
                  Capacity (t)
                </th>
                <th className="text-left py-2 px-3 font-medium text-text-primary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loadChartData?.map((point, index) => (
                <tr key={index} className="border-b border-border hover:bg-secondary-50">
                  <td className="py-2 px-3">{point?.radius}</td>
                  <td className="py-2 px-3 font-medium">{point?.capacity}</td>
                  <td className="py-2 px-3">
                    {point?.radius === (specs?.basic?.loadRadius || 10) ? (
                      <span className="inline-flex items-center space-x-1 text-primary">
                        <Icon name="Target" size={12} />
                        <span className="text-xs">Current</span>
                      </span>
                    ) : point?.capacity >= (specs?.basic?.capacity || 50) * 0.8 ? (
                      <span className="text-success-600 text-xs">Safe</span>
                    ) : (
                      <span className="text-warning-600 text-xs">Reduced</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded"></div>
            <span>Safe operating range</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-500 rounded"></div>
            <span>Reduced capacity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Current configuration</span>
          </div>
        </div>
      </div>
      {/* Stability Analysis */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Stability Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipping Moment */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
            <div className="text-sm font-medium text-text-primary mb-2">Tipping Analysis</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Load Moment:</span>
                <span className="font-medium">
                  {Math.round((specs?.basic?.capacity || 50) * (specs?.basic?.loadRadius || 10))} t⋅m
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Restoring Moment:</span>
                <span className="font-medium">
                  {Math.round((specs?.basic?.counterweight || 12000) / 1000 * 2.5)} t⋅m
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Stability Ratio:</span>
                <span className={
                  ((specs?.basic?.counterweight || 12000) / 1000 * 2.5) / 
                  ((specs?.basic?.capacity || 50) * (specs?.basic?.loadRadius || 10)) >= 1.5
                    ? 'text-success-600' : 'text-warning-600'
                }>
                  {(((specs?.basic?.counterweight || 12000) / 1000 * 2.5) / ((specs?.basic?.capacity || 50) * (specs?.basic?.loadRadius || 10)))?.toFixed(2)}:1
                </span>
              </div>
            </div>
          </div>

          {/* Ground Pressure */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
            <div className="text-sm font-medium text-text-primary mb-2">Ground Bearing</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Weight:</span>
                <span className="font-medium">
                  {Math.round((specs?.basic?.counterweight || 12000) / 1000 + 15)} t
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Ground Type:</span>
                <span className="font-medium capitalize">
                  {specs?.environmental?.groundConditions || 'firm'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Pressure:</span>
                <span className="text-primary">
                  {Math.round(((specs?.basic?.counterweight || 12000) / 1000 + 15) / 4 * 10) / 10} t/m²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraneDiagram;