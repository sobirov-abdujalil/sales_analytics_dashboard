import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import TrendAnalysisCards from './components/TrendAnalysisCards';
import ChartTabs from './components/ChartTabs';
import DataProcessingIndicator from './components/DataProcessingIndicator';
import ExportOptions from './components/ExportOptions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SalesAnalyticsDeepDiveDashboard = () => {
  const [filters, setFilters] = useState({
    territory: 'all',
    productLine: 'all',
    channel: 'all',
    segment: 'all',
    dateRange: 'last30days'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(45);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock saved queries
  const [savedQueries] = useState([
    { id: 'q1', name: 'Q4 Performance Review' },
    { id: 'q2', name: 'Enterprise Segment Analysis' },
    { id: 'q3', name: 'Channel Effectiveness Study' }
  ]);

  // Mock trend analysis data
  const trendData = {
    revenueGrowth: {
      current: '$2.4M',
      previous: '$2.1M',
      change: 14.3,
      trend: 'up',
      confidence: 92
    },
    conversionRate: {
      current: '16.8%',
      previous: '15.2%',
      change: 10.5,
      trend: 'up',
      confidence: 87
    },
    customerAcquisition: {
      current: '1,247',
      previous: '1,156',
      change: 7.9,
      trend: 'up',
      confidence: 94
    },
    forecastAccuracy: {
      current: '89.2%',
      previous: '91.5%',
      change: -2.5,
      trend: 'down',
      confidence: 78
    }
  };

  // Simulate data processing
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setLastUpdated(new Date());
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Simulate data refresh
    setIsProcessing(true);
    setProcessingProgress(0);
    setEstimatedTime(30 + Math.floor(Math.random() * 30));
  };

  const handleSaveQuery = (name, queryFilters) => {
    console.log('Saving query:', name, queryFilters);
    // In a real app, this would save to backend
  };

  const handleLoadQuery = (queryId) => {
    console.log('Loading query:', queryId);
    // In a real app, this would load filters from saved query
    setIsProcessing(true);
    setProcessingProgress(0);
  };

  const handleExport = async (exportConfig) => {
    console.log('Exporting data:', exportConfig);
    // Simulate export process
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleChartExport = (chartType) => {
    setShowExportDialog(true);
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  const handleRefreshData = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setEstimatedTime(25);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Sales Analytics Deep Dive
              </h1>
              <p className="text-muted-foreground">
                Comprehensive performance analysis and trend identification for data-driven insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </div>
              <Button
                variant="outline"
                onClick={handleRefreshData}
                iconName="RefreshCw"
                iconPosition="left"
                disabled={isProcessing}
              >
                Refresh
              </Button>
              <Button
                variant="default"
                onClick={() => setShowExportDialog(true)}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Data Processing Indicator */}
          <DataProcessingIndicator
            isProcessing={isProcessing}
            progress={processingProgress}
            estimatedTime={estimatedTime}
            onCancel={handleCancelProcessing}
          />

          {/* Filter Panel */}
          <div className="mb-8">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSaveQuery={handleSaveQuery}
              savedQueries={savedQueries}
              onLoadQuery={handleLoadQuery}
            />
          </div>

          {/* Trend Analysis Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Performance Trends
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="TrendingUp" size={16} />
                <span>Period-over-period analysis</span>
              </div>
            </div>
            <TrendAnalysisCards data={trendData} />
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Chart Visualization Area */}
            <div className="xl:col-span-3">
              <ChartTabs
                data={trendData}
                onExport={handleChartExport}
              />
            </div>

            {/* Sidebar with Quick Insights */}
            <div className="xl:col-span-1">
              <div className="space-y-6">
                {/* Quick Insights Card */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Lightbulb" size={20} className="text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Quick Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="TrendingUp" size={14} className="text-success" />
                        <span className="text-sm font-medium text-success">Strong Growth</span>
                      </div>
                      <p className="text-xs text-success/80">
                        Revenue increased 14.3% compared to last period, driven by enterprise segment growth.
                      </p>
                    </div>
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="AlertTriangle" size={14} className="text-warning" />
                        <span className="text-sm font-medium text-warning">Forecast Variance</span>
                      </div>
                      <p className="text-xs text-warning/80">
                        Forecast accuracy dropped 2.5%. Review prediction models for Q4.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Target" size={14} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Conversion Boost</span>
                      </div>
                      <p className="text-xs text-primary/80">
                        Conversion rate improved 10.5% with new lead scoring implementation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Data Quality Card */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Shield" size={20} className="text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Data Quality</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completeness</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-success rounded-full" style={{ width: '96%' }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">96%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-success rounded-full" style={{ width: '94%' }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">94%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Freshness</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-warning rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">78%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Activity" size={20} className="text-secondary" />
                    <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Query saved: "Q4 Performance Review"</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Data refresh completed</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Export generated: Excel report</p>
                        <p className="text-xs text-muted-foreground">12 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Export Dialog */}
      <ExportOptions
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        availableData={['charts', 'summary', 'trends', 'forecasts']}
      />
    </div>
  );
};

export default SalesAnalyticsDeepDiveDashboard;