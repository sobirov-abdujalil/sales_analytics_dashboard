import React from 'react';
import Button from '../../../components/ui/Button';


const RefreshToggle = ({ isAutoRefresh, onToggle, lastUpdated }) => {
  const formatLastUpdated = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="text-sm text-gray-600">
        Updated {formatLastUpdated(lastUpdated)}
      </div>
      <Button
        variant={isAutoRefresh ? 'default' : 'outline'}
        size="sm"
        onClick={onToggle}
        iconName={isAutoRefresh ? 'Pause' : 'Play'}
        iconPosition="left"
        iconSize={16}
      >
        {isAutoRefresh ? 'Auto' : 'Manual'}
      </Button>
      <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-green-500' : 'bg-gray-400'}`} />
    </div>
  );
};

export default RefreshToggle;