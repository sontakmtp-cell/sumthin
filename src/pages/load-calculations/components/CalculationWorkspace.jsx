import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const CalculationWorkspace = ({ 
  craneSpecs, 
  loadConfiguration, 
  calculationResults, 
  calculationType,
  isCalculating 
}) => {
  const canvasRef = useRef(null);
  const diagramRef = useRef(null);

  // Draw 3D visualization
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas || !craneSpecs || !loadConfiguration) return;

    const ctx = canvas?.getContext('2d');
    const width = canvas?.width;
    const height = canvas?.height;

    // Clear canvas
    ctx?.clearRect(0, 0, width, height);

    // Set up coordinate system
    ctx?.save();
    ctx?.translate(width / 2, height - 50);

    // Calculate scale
    const maxDimension = Math.max(
      craneSpecs?.basic?.boomLength,
      craneSpecs?.basic?.loadRadius,
      loadConfiguration?.dimensions?.length
    );
    const scale = Math.min(width * 0.3, height * 0.3) / maxDimension;

    // Draw ground plane
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 2;
    ctx?.setLineDash([10, 5]);
    for (let i = -width/2; i <= width/2; i += 40) {
      ctx?.beginPath();
      ctx?.moveTo(i, 0);
      ctx?.lineTo(i, -200);
      ctx?.stroke();
    }
    for (let i = 0; i >= -200; i -= 40) {
      ctx?.beginPath();
      ctx?.moveTo(-width/2, i);
      ctx?.lineTo(width/2, i);
      ctx?.stroke();
    }
    ctx?.setLineDash([]);

    // Draw crane
    const boomLength = craneSpecs?.basic?.boomLength * scale;
    const loadRadius = craneSpecs?.basic?.loadRadius * scale;
    const boomAngle = Math.acos(loadRadius / boomLength);

    // Crane base
    ctx.fillStyle = '#374151';
    ctx?.fillRect(-25, 0, 50, 40);

    // Boom
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 6;
    ctx?.beginPath();
    ctx?.moveTo(0, 40);
    ctx?.lineTo(boomLength * Math.cos(boomAngle), -boomLength * Math.sin(boomAngle) + 40);
    ctx?.stroke();

    // Load position and visualization
    const loadX = loadRadius;
    const loadY = 40;
    const loadWidth = loadConfiguration?.dimensions?.width * scale;
    const loadLength = loadConfiguration?.dimensions?.length * scale;
    const loadHeight = loadConfiguration?.dimensions?.height * scale;

    // Draw load (3D-ish representation)
    ctx.fillStyle = '#F59E0B';
    ctx?.fillRect(loadX - loadLength/2, loadY - loadWidth/2, loadLength, loadWidth);
    
    // 3D effect for load
    ctx.fillStyle = '#D97706';
    ctx?.beginPath();
    ctx?.moveTo(loadX - loadLength/2, loadY - loadWidth/2);
    ctx?.lineTo(loadX - loadLength/2 + loadHeight/2, loadY - loadWidth/2 - loadHeight/2);
    ctx?.lineTo(loadX + loadLength/2 + loadHeight/2, loadY - loadWidth/2 - loadHeight/2);
    ctx?.lineTo(loadX + loadLength/2, loadY - loadWidth/2);
    ctx?.closePath();
    ctx?.fill();

    ctx.fillStyle = '#B45309';
    ctx?.beginPath();
    ctx?.moveTo(loadX + loadLength/2, loadY - loadWidth/2);
    ctx?.lineTo(loadX + loadLength/2 + loadHeight/2, loadY - loadWidth/2 - loadHeight/2);
    ctx?.lineTo(loadX + loadLength/2 + loadHeight/2, loadY + loadWidth/2 - loadHeight/2);
    ctx?.lineTo(loadX + loadLength/2, loadY + loadWidth/2);
    ctx?.closePath();
    ctx?.fill();

    // Draw center of gravity
    const cogX = loadX + (loadConfiguration?.centerOfGravity?.x - loadConfiguration?.dimensions?.length/2) * scale;
    const cogY = loadY + (loadConfiguration?.centerOfGravity?.y - loadConfiguration?.dimensions?.width/2) * scale;
    
    ctx.fillStyle = '#DC2626';
    ctx?.beginPath();
    ctx?.arc(cogX, cogY, 6, 0, Math.PI * 2);
    ctx?.fill();
    
    // COG marker
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx?.beginPath();
    ctx?.moveTo(cogX - 10, cogY);
    ctx?.lineTo(cogX + 10, cogY);
    ctx?.moveTo(cogX, cogY - 10);
    ctx?.lineTo(cogX, cogY + 10);
    ctx?.stroke();

    // Draw lifting points
    const pointsPerSide = Math.ceil(loadConfiguration?.liftingPoints / 4);
    ctx.fillStyle = '#059669';
    for (let i = 0; i < loadConfiguration?.liftingPoints; i++) {
      const angle = (i / loadConfiguration?.liftingPoints) * Math.PI * 2;
      const pointX = loadX + (loadLength * 0.4) * Math.cos(angle);
      const pointY = loadY + (loadWidth * 0.4) * Math.sin(angle);
      
      ctx?.beginPath();
      ctx?.arc(pointX, pointY, 4, 0, Math.PI * 2);
      ctx?.fill();
      
      // Sling lines to boom
      ctx.strokeStyle = '#065F46';
      ctx.lineWidth = 1;
      ctx?.beginPath();
      ctx?.moveTo(pointX, pointY);
      ctx?.lineTo(boomLength * Math.cos(boomAngle), -boomLength * Math.sin(boomAngle) + 40);
      ctx?.stroke();
    }

    // Force vectors (if calculation results available)
    if (calculationResults) {
      // Load force vector
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 3;
      ctx?.beginPath();
      ctx?.moveTo(cogX, cogY);
      ctx?.lineTo(cogX, cogY + 60);
      ctx?.stroke();
      
      // Arrowhead
      ctx?.beginPath();
      ctx?.moveTo(cogX, cogY + 60);
      ctx?.lineTo(cogX - 8, cogY + 50);
      ctx?.moveTo(cogX, cogY + 60);
      ctx?.lineTo(cogX + 8, cogY + 50);
      ctx?.stroke();
    }

    ctx?.restore();

    // Add labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    // Load information
    ctx?.fillText(`Load: ${loadConfiguration?.weight}t`, 10, 30);
    ctx?.fillText(`Dimensions: ${loadConfiguration?.dimensions?.length}×${loadConfiguration?.dimensions?.width}×${loadConfiguration?.dimensions?.height}m`, 10, 50);
    ctx?.fillText(`Lifting Points: ${loadConfiguration?.liftingPoints}`, 10, 70);
    
    // Calculation type indicator
    ctx?.fillText(`Mode: ${calculationType?.charAt(0)?.toUpperCase() + calculationType?.slice(1)}`, 10, height - 30);

  }, [craneSpecs, loadConfiguration, calculationResults, calculationType]);

  return (
    <div className="space-y-6">
      {/* 3D Load Visualization */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Load Visualization</h3>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">3D Interactive View</span>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={500}
            height={350}
            className="border border-border rounded-lg bg-slate-50 w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
          />

          {isCalculating && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Calculating forces...</p>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 border border-border rounded-lg p-3 space-y-2">
            <div className="text-xs font-medium text-text-primary mb-2">Legend</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-text-secondary">Crane boom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs text-text-secondary">Load</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span className="text-xs text-text-secondary">Center of gravity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className="text-xs text-text-secondary">Lifting points</span>
            </div>
          </div>
        </div>
      </div>
      {/* Force Vector Diagram */}
      {calculationResults && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Zap" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Force Analysis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vertical Forces */}
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Vertical Forces</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowDown" size={16} className="text-error-600" />
                    <span className="text-sm">Load Weight</span>
                  </div>
                  <span className="font-medium">{calculationResults?.totalLoad}t</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Wind" size={16} className="text-warning-600" />
                    <span className="text-sm">Wind Load</span>
                  </div>
                  <span className="font-medium">{calculationResults?.windLoad?.toFixed(2)}t</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowUp" size={16} className="text-primary" />
                    <span className="text-sm font-medium">Total Effective Load</span>
                  </div>
                  <span className="font-bold text-primary">{calculationResults?.effectiveLoad?.toFixed(1)}t</span>
                </div>
              </div>
            </div>

            {/* Moments */}
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Moment Analysis</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="RotateCw" size={16} className="text-error-600" />
                    <span className="text-sm">Load Moment</span>
                  </div>
                  <span className="font-medium">{calculationResults?.loadMoment?.toFixed(1)}t⋅m</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="RotateCcw" size={16} className="text-success-600" />
                    <span className="text-sm">Restoring Moment</span>
                  </div>
                  <span className="font-medium">
                    {(calculationResults?.stabilityRatio * calculationResults?.loadMoment)?.toFixed(1)}t⋅m
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-success-600" />
                    <span className="text-sm font-medium">Stability Ratio</span>
                  </div>
                  <span className="font-bold text-success-700">
                    {calculationResults?.stabilityRatio?.toFixed(2)}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Multi-Crane Coordination (if applicable) */}
      {calculationType === 'multi-crane' && calculationResults?.multiCraneData && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="GitMerge" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Multi-Crane Coordination</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
              <div className="text-sm font-medium text-text-primary mb-2">Load Distribution</div>
              {calculationResults?.multiCraneData?.loadDistribution?.map((percent, index) => (
                <div key={index} className="flex justify-between text-sm mb-1">
                  <span>Crane {index + 1}:</span>
                  <span className="font-medium">{percent}%</span>
                </div>
              ))}
            </div>
            
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="text-sm font-medium text-warning-800 mb-2">Coordination Factor</div>
              <div className="text-2xl font-bold text-warning-700">
                {calculationResults?.multiCraneData?.coordinationFactor}x
              </div>
              <div className="text-xs text-warning-600 mt-1">
                Applied to total load
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${
              calculationResults?.multiCraneData?.synchronizationRisk === 'High' ?'bg-error-50 border-error-200' :'bg-success-50 border-success-200'
            }`}>
              <div className="text-sm font-medium text-text-primary mb-2">Sync Risk</div>
              <div className={`text-lg font-bold ${
                calculationResults?.multiCraneData?.synchronizationRisk === 'High' ?'text-error-600' :'text-success-600'
              }`}>
                {calculationResults?.multiCraneData?.synchronizationRisk}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Based on utilization
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculationWorkspace;