import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CriticalAlertsPanel = ({ alerts = [], complianceStatus, className = '' }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock critical alerts data when none provided
  const mockAlerts = alerts?.length > 0 ? alerts : [
    {
      id: 1,
      level: 'high',
      title: 'Load Limit Approaching',
      message: 'Current load factor at 87% of maximum capacity',
      timestamp: new Date(Date.now() - 5 * 60000),
      category: 'safety',
      recommendation: 'Reduce load or adjust crane position to maintain safety margins',
      source: 'Load Monitoring System',
      acknowledged: false
    },
    {
      id: 2,
      level: 'medium',
      title: 'Weather Condition Alert',
      message: 'Wind speed increasing beyond normal operational parameters',
      timestamp: new Date(Date.now() - 15 * 60000),
      category: 'environmental',
      recommendation: 'Monitor weather conditions and prepare to suspend operations if wind exceeds 12 m/s',
      source: 'Environmental Sensors',
      acknowledged: true
    },
    {
      id: 3,
      level: 'low',
      title: 'Maintenance Schedule Reminder',
      message: 'Scheduled maintenance due for boom cylinder in 48 hours',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      category: 'maintenance',
      recommendation: 'Schedule maintenance to prevent potential safety issues',
      source: 'Maintenance Management',
      acknowledged: false
    }
  ];

  const getAlertIcon = (level) => {
    switch (level) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (level) => {
    switch (level) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'secondary';
    }
  };

  const getComplianceInfo = () => {
    const statusConfig = {
      compliant: {
        color: 'success',
        icon: 'CheckCircle',
        title: 'Fully Compliant',
        description: 'All regulatory requirements met'
      },
      warning: {
        color: 'warning',
        icon: 'AlertTriangle',
        title: 'Review Required',
        description: 'Some compliance items need attention'
      },
      critical: {
        color: 'error',
        icon: 'XCircle',
        title: 'Non-Compliant',
        description: 'Immediate action required'
      }
    };

    return statusConfig?.[complianceStatus] || statusConfig?.compliant;
  };

  const filteredAlerts = mockAlerts?.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alert?.acknowledged;
    return alert?.level === filter;
  });

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const handleAcknowledge = (alertId) => {
    console.log(`Acknowledging alert ${alertId}`);
    // Update alert acknowledgment status
  };

  const complianceInfo = getComplianceInfo();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Compliance Status Header */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg bg-${complianceInfo?.color}-100 flex items-center justify-center`}>
              <Icon 
                name={complianceInfo?.icon} 
                size={24} 
                color={`var(--color-${complianceInfo?.color})`} 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Regulatory Compliance Status
              </h2>
              <p className="text-text-secondary mt-1">{complianceInfo?.description}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full bg-${complianceInfo?.color}-100`}>
            <span className={`text-sm font-medium text-${complianceInfo?.color}-700`}>
              {complianceInfo?.title}
            </span>
          </div>
        </div>
      </div>
      {/* Critical Alerts Section */}
      <div className="bg-surface border border-border rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Critical Safety Alerts</h3>
            <p className="text-sm text-text-secondary mt-1">
              Real-time safety violations and recommended actions
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Alerts</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
              <option value="unacknowledged">Unacknowledged</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="divide-y divide-border">
          {filteredAlerts?.length > 0 ? (
            filteredAlerts?.map((alert) => (
              <div key={alert?.id} className="p-6 hover:bg-secondary-50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  {/* Alert Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-${getAlertColor(alert?.level)}-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon 
                      name={getAlertIcon(alert?.level)} 
                      size={20} 
                      color={`var(--color-${getAlertColor(alert?.level)})`} 
                    />
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-base font-medium text-text-primary">
                          {alert?.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getAlertColor(alert?.level)}-100 text-${getAlertColor(alert?.level)}-700`}>
                          {alert?.level?.toUpperCase()}
                        </span>
                        {alert?.acknowledged && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                            ACKNOWLEDGED
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-secondary">
                          {alert?.timestamp?.toLocaleTimeString()}
                        </span>
                        <button
                          onClick={() => toggleExpanded(alert?.id)}
                          className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                        >
                          <Icon 
                            name={expandedAlert === alert?.id ? 'ChevronUp' : 'ChevronDown'} 
                            size={16} 
                          />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mt-2">
                      {alert?.message}
                    </p>

                    {/* Expanded Content */}
                    {expandedAlert === alert?.id && (
                      <div className="mt-4 space-y-3">
                        <div className="p-4 bg-secondary-50 rounded-lg">
                          <h5 className="text-sm font-medium text-text-primary mb-2">
                            Recommended Actions:
                          </h5>
                          <p className="text-sm text-text-secondary">
                            {alert?.recommendation}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-secondary">
                            Source: {alert?.source}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            {!alert?.acknowledged && (
                              <button
                                onClick={() => handleAcknowledge(alert?.id)}
                                className="px-3 py-1 text-xs bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                              >
                                Acknowledge
                              </button>
                            )}
                            <button className="px-3 py-1 text-xs bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <h4 className="text-base font-medium text-text-primary mb-2">
                No Active Alerts
              </h4>
              <p className="text-sm text-text-secondary">
                All systems operating within safe parameters
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        {filteredAlerts?.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-border bg-secondary-50">
            <span className="text-sm text-text-secondary">
              {filteredAlerts?.filter(a => !a?.acknowledged)?.length} unacknowledged alerts
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Acknowledge All
              </button>
              <button className="px-3 py-1 text-sm bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                Export Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriticalAlertsPanel;