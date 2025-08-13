import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'quota_risk',
      severity: 'high',
      title: 'Quota Risk Alert',
      message: 'John Smith is at 45% of monthly quota with 3 days remaining',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      rep: 'John Smith',
      details: {
        current: '45%',
        target: '$80,000',
        achieved: '$36,000',
        daysLeft: 3
      },
      actions: ['Escalate', 'Schedule 1:1', 'View Pipeline']
    },
    {
      id: 2,
      type: 'deal_stalled',
      severity: 'medium',
      title: 'Deal Stalled',
      message: 'TechFlow Inc. deal has been in Negotiation stage for 15 days',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      rep: 'Lisa Anderson',
      details: {
        dealValue: '$125,000',
        stageTime: '15 days',
        lastActivity: '5 days ago',
        probability: '75%'
      },
      actions: ['Contact Rep', 'Review Deal', 'Schedule Follow-up']
    },
    {
      id: 3,
      type: 'system_alert',
      severity: 'low',
      title: 'Data Sync Complete',
      message: 'CRM data synchronization completed successfully',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      rep: 'System',
      details: {
        recordsUpdated: '1,247',
        syncTime: '2.3 seconds',
        lastSync: '45 minutes ago',
        status: 'Success'
      },
      actions: ['View Log', 'Schedule Next Sync']
    },
    {
      id: 4,
      type: 'performance_exception',
      severity: 'high',
      title: 'Performance Exception',
      message: 'West Region showing 25% decline in weekly performance',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      rep: 'Regional Team',
      details: {
        decline: '25%',
        period: 'This week',
        previousWeek: '$450,000',
        currentWeek: '$337,500'
      },
      actions: ['Analyze Trends', 'Contact Manager', 'Generate Report']
    },
    {
      id: 5,
      type: 'opportunity_expiring',
      severity: 'medium',
      title: 'Opportunity Expiring',
      message: 'CloudBase Solutions opportunity expires in 2 days',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      rep: 'Mark Wilson',
      details: {
        dealValue: '$67,000',
        expiryDate: '2 days',
        probability: '60%',
        lastContact: 'Yesterday'
      },
      actions: ['Extend Deadline', 'Contact Client', 'Update Probability']
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: 'system_alert',
        severity: 'low',
        title: 'New Alert Generated',
        message: 'Real-time alert simulation',
        timestamp: new Date(),
        rep: 'System',
        details: {
          type: 'Simulation',
          status: 'Active'
        },
        actions: ['Acknowledge']
      };

      setAlerts(prev => [newAlert, ...prev?.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quota_risk': return 'Target';
      case 'deal_stalled': return 'Clock';
      case 'system_alert': return 'Settings';
      case 'performance_exception': return 'TrendingDown';
      case 'opportunity_expiring': return 'Calendar';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const acknowledgeAlert = (alertId) => {
    setAcknowledgedAlerts(prev => new Set([...prev, alertId]));
  };

  const handleAction = (action, alert) => {
    console.log(`Action: ${action} for alert:`, alert);
    // Implement action handlers here
  };

  const unacknowledgedAlerts = alerts?.filter(alert => !acknowledgedAlerts?.has(alert?.id));
  const acknowledgedAlertsList = alerts?.filter(alert => acknowledgedAlerts?.has(alert?.id));

  return (
    <div className="bg-card rounded-lg border border-border h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Alert Dashboard</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {unacknowledgedAlerts?.length} Active
            </span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {/* Unacknowledged Alerts */}
        {unacknowledgedAlerts?.map((alert) => (
          <div key={alert?.id} className={`border-l-4 ${getSeverityColor(alert?.severity)} p-4 border-b border-border`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg bg-white border ${getSeverityTextColor(alert?.severity)}`}>
                  <Icon name={getTypeIcon(alert?.type)} size={16} className={getSeverityTextColor(alert?.severity)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground">{alert?.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Icon name={getSeverityIcon(alert?.severity)} size={14} className={getSeverityTextColor(alert?.severity)} />
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert?.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                  
                  {alert?.details && (
                    <div className="mb-3 p-2 bg-muted rounded text-xs">
                      <div className="grid grid-cols-2 gap-1">
                        {Object.entries(alert?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                            </span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {alert?.actions?.slice(0, 2)?.map((action) => (
                        <Button
                          key={action}
                          variant="outline"
                          size="xs"
                          onClick={() => handleAction(action, alert)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => acknowledgeAlert(alert?.id)}
                      iconName="Check"
                      iconSize={14}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Acknowledged Alerts */}
        {acknowledgedAlertsList?.length > 0 && (
          <>
            <div className="p-3 bg-muted border-b border-border">
              <h3 className="text-sm font-medium text-muted-foreground">Acknowledged Alerts</h3>
            </div>
            {acknowledgedAlertsList?.map((alert) => (
              <div key={alert?.id} className="p-4 border-b border-border opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{alert?.title}</h4>
                      <p className="text-xs text-muted-foreground">{alert?.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(alert?.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {alerts?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-foreground mb-1">All Clear!</h3>
            <p className="text-sm text-muted-foreground">No active alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertDashboard;