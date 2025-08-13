import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

const ChartTabs = ({ data, onExport }) => {
  const [activeTab, setActiveTab] = useState('trends');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tabs = [
    {
      id: 'trends',
      label: 'Trend Analysis', 
      icon: 'TrendingUp',
      description: 'Time-series analysis with period comparisons'
    },
    {
      id: 'correlation',
      label: 'Correlation Analysis',
      icon: 'GitBranch',
      description: 'Relationship identification between metrics'
    },
    {
      id: 'cohort',
      label: 'Cohort Analysis',
      icon: 'Users',
      description: 'Customer behavior patterns over time'
    },
    {
      id: 'forecast',
      label: 'Forecast Model',
      icon: 'Activity',
      description: 'Predictive analytics and projections'
    }
  ];

  const trendData = [
    { month: 'Jan', revenue: 45000, deals: 23, conversion: 12.5, forecast: 47000 },
    { month: 'Feb', revenue: 52000, deals: 28, conversion: 14.2, forecast: 54000 },
    { month: 'Mar', revenue: 48000, deals: 25, conversion: 13.1, forecast: 51000 },
    { month: 'Apr', revenue: 61000, deals: 32, conversion: 15.8, forecast: 63000 },
    { month: 'May', revenue: 58000, deals: 30, conversion: 14.9, forecast: 60000 },
    { month: 'Jun', revenue: 67000, deals: 35, conversion: 16.4, forecast: 69000 },
    { month: 'Jul', revenue: 72000, deals: 38, conversion: 17.2, forecast: 74000 },
    { month: 'Aug', revenue: 69000, deals: 36, conversion: 16.8, forecast: 71000 }
  ];

  const correlationData = [
    { revenue: 45000, deals: 23, conversion: 12.5, leadScore: 78 },
    { revenue: 52000, deals: 28, conversion: 14.2, leadScore: 82 },
    { revenue: 48000, deals: 25, conversion: 13.1, leadScore: 79 },
    { revenue: 61000, deals: 32, conversion: 15.8, leadScore: 85 },
    { revenue: 58000, deals: 30, conversion: 14.9, leadScore: 83 },
    { revenue: 67000, deals: 35, conversion: 16.4, leadScore: 87 },
    { revenue: 72000, deals: 38, conversion: 17.2, leadScore: 89 },
    { revenue: 69000, deals: 36, conversion: 16.8, leadScore: 88 }
  ];

  const cohortData = [
    { cohort: 'Jan 2024', month1: 100, month2: 85, month3: 72, month4: 65, month5: 58, month6: 52 },
    { cohort: 'Feb 2024', month1: 100, month2: 88, month3: 75, month4: 68, month5: 61, month6: 55 },
    { cohort: 'Mar 2024', month1: 100, month2: 82, month3: 70, month4: 63, month5: 56, month6: 50 },
    { cohort: 'Apr 2024', month1: 100, month2: 90, month3: 78, month4: 71, month5: 64, month6: 58 },
    { cohort: 'May 2024', month1: 100, month2: 87, month3: 74, month4: 67, month5: 60, month6: 54 },
    { cohort: 'Jun 2024', month1: 100, month2: 92, month3: 80, month4: 73, month5: 66, month6: 60 }
  ];

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" stroke="#64748B" />
        <YAxis stroke="#64748B" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#2563EB" 
          strokeWidth={3}
          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          name="Actual Revenue"
        />
        <Line 
          type="monotone" 
          dataKey="forecast" 
          stroke="#10B981" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
          name="Forecast"
        />
        <Line 
          type="monotone" 
          dataKey="deals" 
          stroke="#F59E0B" 
          strokeWidth={2}
          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
          name="Deals Closed"
          yAxisId="right"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderCorrelationChart = () => {
    // Add safety check for correlationData before rendering
    if (!correlationData || !Array.isArray(correlationData) || correlationData?.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No correlation data available</p>
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart data={correlationData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="leadScore" 
            name="Lead Score" 
            stroke="#64748B"
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <YAxis 
            dataKey="revenue" 
            name="Revenue" 
            stroke="#64748B"
            domain={['dataMin - 5000', 'dataMax + 5000']}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
            formatter={(value, name) => [
              name === 'revenue' ? `$${value?.toLocaleString()}` : value,
              name === 'revenue' ? 'Revenue' : 'Lead Score'
            ]}
          />
          <Scatter name="Revenue vs Lead Score" fill="#2563EB">
            {correlationData?.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry?.conversion > 15 ? '#10B981' : '#2563EB'} 
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  const renderCohortHeatmap = () => {
    // Add safety check for cohortData before rendering
    if (!cohortData || !Array.isArray(cohortData) || cohortData?.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
          <div className="text-center">
            <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No cohort data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2 text-sm font-medium text-muted-foreground">
          <div>Cohort</div>
          <div className="text-center">Month 1</div>
          <div className="text-center">Month 2</div>
          <div className="text-center">Month 3</div>
          <div className="text-center">Month 4</div>
          <div className="text-center">Month 5</div>
          <div className="text-center">Month 6</div>
        </div>
        {cohortData?.map((row, index) => {
          // Add safety check for each row
          if (!row || typeof row !== 'object') return null;
          
          const monthValues = [
            row?.month1, 
            row?.month2, 
            row?.month3, 
            row?.month4, 
            row?.month5, 
            row?.month6
          ];
          
          return (
            <div key={index} className="grid grid-cols-7 gap-2">
              <div className="text-sm font-medium text-foreground py-2">
                {row?.cohort || 'Unknown Cohort'}
              </div>
              {monthValues?.map((value, cellIndex) => {
                const safeValue = typeof value === 'number' ? value : 0;
                return (
                  <div
                    key={cellIndex}
                    className="text-center py-2 px-3 rounded text-sm font-medium"
                    style={{
                      backgroundColor: `rgba(37, 99, 235, ${safeValue / 100 * 0.8})`,
                      color: safeValue > 70 ? '#FFFFFF' : '#1E293B'
                    }}
                  >
                    {safeValue}%
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderForecastChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" stroke="#64748B" />
        <YAxis stroke="#64748B" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#2563EB" 
          strokeWidth={3}
          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          name="Historical Revenue"
        />
        <Line 
          type="monotone" 
          dataKey="forecast" 
          stroke="#10B981" 
          strokeWidth={3}
          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          name="ML Forecast"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    // Add safety check for data availability
    if (!trendData?.length && !correlationData?.length && !cohortData?.length) {
      return (
        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No data available for analysis</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'trends':
        return renderTrendChart();
      case 'correlation':
        return renderCorrelationChart();
      case 'cohort':
        return renderCohortHeatmap();
      case 'forecast':
        return renderForecastChart();
      default:
        return renderTrendChart();
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Advanced Analytics</h3>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
                title={tab?.description}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport?.(activeTab)}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-base font-medium text-foreground mb-1">
            {tabs?.find(tab => tab?.id === activeTab)?.label}
          </h4>
          <p className="text-sm text-muted-foreground">
            {tabs?.find(tab => tab?.id === activeTab)?.description}
          </p>
        </div>
        
        <div className="min-h-[400px]">
          {renderActiveChart()}
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} />
              <span>Real-time data</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={14} />
              <span>Auto-refresh: 5min</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="RotateCcw">
              Reset Zoom
            </Button>
            <Button variant="ghost" size="sm" iconName="Settings">
              Chart Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTabs;