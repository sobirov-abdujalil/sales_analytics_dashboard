import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendAnalysisCards = ({ data }) => {
  const trendCards = [
    {
      id: 'revenue-growth',
      title: 'Revenue Growth',
      value: data?.revenueGrowth?.current,
      previousValue: data?.revenueGrowth?.previous,
      change: data?.revenueGrowth?.change,
      trend: data?.revenueGrowth?.trend,
      confidence: data?.revenueGrowth?.confidence,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: data?.conversionRate?.current,
      previousValue: data?.conversionRate?.previous,
      change: data?.conversionRate?.change,
      trend: data?.conversionRate?.trend,
      confidence: data?.conversionRate?.confidence,
      icon: 'Target',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'customer-acquisition',
      title: 'Customer Acquisition',
      value: data?.customerAcquisition?.current,
      previousValue: data?.customerAcquisition?.previous,
      change: data?.customerAcquisition?.change,
      trend: data?.customerAcquisition?.trend,
      confidence: data?.customerAcquisition?.confidence,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'forecast-accuracy',
      title: 'Forecast Accuracy',
      value: data?.forecastAccuracy?.current,
      previousValue: data?.forecastAccuracy?.previous,
      change: data?.forecastAccuracy?.change,
      trend: data?.forecastAccuracy?.trend,
      confidence: data?.forecastAccuracy?.confidence,
      icon: 'Activity',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {trendCards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={20} className={card?.color} />
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(card?.trend)} 
                size={16} 
                className={getTrendColor(card?.trend)} 
              />
              <span className={`text-sm font-medium ${getTrendColor(card?.trend)}`}>
                {card?.change > 0 ? '+' : ''}{card?.change}%
              </span>
            </div>
          </div>

          {/* Main Value */}
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {card?.title}
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {card?.value}
            </div>
          </div>

          {/* Period Comparison */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Previous Period:</span>
            <span className="font-medium text-foreground">{card?.previousValue}</span>
          </div>

          {/* Confidence Interval */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    card?.confidence >= 90 ? 'bg-success' :
                    card?.confidence >= 70 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${card?.confidence}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${getConfidenceColor(card?.confidence)}`}>
                {card?.confidence}%
              </span>
            </div>
          </div>

          {/* Seasonal Indicator */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Seasonal Impact:</span>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} className="text-muted-foreground" />
                <span className="text-foreground font-medium">
                  {card?.trend === 'up' ? 'Peak Season' : 
                   card?.trend === 'down' ? 'Off Season' : 'Stable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendAnalysisCards;