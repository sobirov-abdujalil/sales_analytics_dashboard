import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, sparklineData, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-gray-600';

  const changeIcon = changeType === 'positive' ? 'TrendingUp' : 
                    changeType === 'negative' ? 'TrendingDown' : 'Minus';

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={changeIcon} size={16} className={changeColor} />
          <span className={`text-sm font-medium ${changeColor}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
      {/* Sparkline visualization */}
      <div className="mt-4 h-8 flex items-end space-x-1">
        {sparklineData?.map((point, index) => (
          <div
            key={index}
            className={`flex-1 bg-primary/20 rounded-sm transition-all duration-300 hover:bg-primary/40`}
            style={{ height: `${(point / Math.max(...sparklineData)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default KPICard;