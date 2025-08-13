import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveMetricsBanner = () => {
  const [metrics, setMetrics] = useState({
    todayRevenue: 847500,
    dealsClosed: 23,
    activeOpportunities: 156,
    pipelineChanges: 12
  });

  const [animatedValues, setAnimatedValues] = useState({
    todayRevenue: 0,
    dealsClosed: 0,
    activeOpportunities: 0,
    pipelineChanges: 0
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        todayRevenue: prev?.todayRevenue + Math.floor(Math.random() * 5000),
        dealsClosed: prev?.dealsClosed + (Math.random() > 0.8 ? 1 : 0),
        activeOpportunities: prev?.activeOpportunities + Math.floor(Math.random() * 3) - 1,
        pipelineChanges: prev?.pipelineChanges + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate values
  useEffect(() => {
    const animateValue = (key, target) => {
      const start = animatedValues?.[key];
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (target - start) * progress;

        setAnimatedValues(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    Object.keys(metrics)?.forEach(key => {
      animateValue(key, metrics?.[key]);
    });
  }, [metrics]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const metricsData = [
    {
      key: 'todayRevenue',
      label: "Today\'s Revenue",
      value: animatedValues?.todayRevenue,
      target: 1000000,
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      format: formatCurrency
    },
    {
      key: 'dealsClosed',
      label: 'Deals Closed',
      value: animatedValues?.dealsClosed,
      target: 30,
      icon: 'CheckCircle',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      format: (val) => val?.toString()
    },
    {
      key: 'activeOpportunities',
      label: 'Active Opportunities',
      value: animatedValues?.activeOpportunities,
      target: 200,
      icon: 'Target',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      format: (val) => val?.toString()
    },
    {
      key: 'pipelineChanges',
      label: 'Pipeline Changes',
      value: animatedValues?.pipelineChanges,
      target: 20,
      icon: 'TrendingUp',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      format: (val) => `+${val}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricsData?.map((metric) => {
        const progress = Math.min((metric?.value / metric?.target) * 100, 100);
        
        return (
          <div key={metric?.key} className="bg-card rounded-lg border border-border p-4 hover-scale">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{metric?.label}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  {metric?.format(metric?.value)}
                </span>
                <span className="text-xs text-muted-foreground">
                  / {metric?.format(metric?.target)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    progress >= 100 ? 'bg-green-500' : 
                    progress >= 75 ? 'bg-blue-500' : 
                    progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress?.toFixed(1)}% of target</span>
                <span className={progress >= 100 ? 'text-green-600 font-medium' : ''}>
                  {progress >= 100 ? 'Target Achieved!' : `${(100 - progress)?.toFixed(1)}% remaining`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveMetricsBanner;