import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import LiveMetricsBanner from './components/LiveMetricsBanner';
import RealTimeActivityStream from './components/RealTimeActivityStream';
import AlertDashboard from './components/AlertDashboard';
import SalesActivityHeatMap from './components/SalesActivityHeatMap';
import DataFreshnessIndicator from './components/DataFreshnessIndicator';
import TerritorySelector from './components/TerritorySelector';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RealTimeSalesOperationsDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [alertThreshold, setAlertThreshold] = useState('medium');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTerritoryChange = (territory) => {
    setSelectedTerritory(territory);
  };

  const formatCurrentTime = () => {
    return currentTime?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  const quickActions = [
    { id: 'refresh', label: 'Refresh Data', icon: 'RefreshCw' },
    { id: 'export', label: 'Export Report', icon: 'Download' },
    { id: 'alerts', label: 'Configure Alerts', icon: 'Settings' },
    { id: 'escalate', label: 'Escalate Issue', icon: 'AlertTriangle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Fixed Header with Controls */}
        <div className="sticky top-16 bg-card border-b border-border z-30 px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Section - Title and Time */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Real-Time Sales Operations</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Live monitoring and operational control center
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span className="font-mono">{formatCurrentTime()}</span>
              </div>
            </div>

            {/* Right Section - Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <DataFreshnessIndicator />
              
              <div className="flex items-center space-x-2">
                <TerritorySelector onTerritoryChange={handleTerritoryChange} />
                
                <select
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e?.target?.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
                >
                  <option value="low">Low Alerts</option>
                  <option value="medium">Medium+ Alerts</option>
                  <option value="high">High Alerts Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground mr-2">Quick Actions:</span>
            {quickActions?.map((action) => (
              <Button
                key={action?.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action?.id)}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={14}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Live Metrics Banner */}
          <LiveMetricsBanner />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Central Monitoring Area - 3 columns on xl screens */}
            <div className="xl:col-span-3 space-y-6">
              {/* Real-Time Activity Stream */}
              <RealTimeActivityStream />
              
              {/* Sales Activity Heat Map */}
              <SalesActivityHeatMap />
            </div>

            {/* Right Panel - Alert Dashboard - 1 column on xl screens */}
            <div className="xl:col-span-1">
              <AlertDashboard />
            </div>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">System Health</h3>
                <Icon name="Activity" size={16} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">99.8%</div>
              <p className="text-xs text-muted-foreground">Uptime last 24h</p>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Data Latency</h3>
                <Icon name="Zap" size={16} className="text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">1.2s</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
                <Icon name="Users" size={16} className="text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Data Points</h3>
                <Icon name="Database" size={16} className="text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">2.4M</div>
              <p className="text-xs text-muted-foreground">Processed today</p>
            </div>
          </div>

          {/* Connection Status Footer */}
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">WebSocket Connected</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last sync: {currentTime?.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Server: us-east-1</span>
                <span>Version: 2.1.4</span>
                <span>Build: {new Date()?.getFullYear()}.{String(new Date()?.getMonth() + 1)?.padStart(2, '0')}.13</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeSalesOperationsDashboard;