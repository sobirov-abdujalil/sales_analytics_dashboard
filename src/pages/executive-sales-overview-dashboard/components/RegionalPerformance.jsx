import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionalPerformance = ({ regions }) => {
  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'bg-green-500';
    if (performance >= 75) return 'bg-blue-500';
    if (performance >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAlertIcon = (performance) => {
    if (performance < 60) return 'AlertTriangle';
    if (performance < 75) return 'AlertCircle';
    return 'CheckCircle';
  };

  const getAlertColor = (performance) => {
    if (performance < 60) return 'text-red-500';
    if (performance < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Regional Performance</h3>
        <Icon name="MapPin" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {regions?.map((region, index) => (
          <div key={region?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-foreground">{region?.name}</p>
                <p className="text-sm text-muted-foreground">${region?.revenue?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPerformanceColor(region?.performance)} transition-all duration-500`}
                    style={{ width: `${region?.performance}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-10 text-right">
                  {region?.performance}%
                </span>
              </div>
              
              <Icon 
                name={getAlertIcon(region?.performance)} 
                size={16} 
                className={getAlertColor(region?.performance)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Regional Revenue</span>
          <span className="font-semibold text-foreground">
            ${regions?.reduce((sum, region) => sum + region?.revenue, 0)?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionalPerformance;