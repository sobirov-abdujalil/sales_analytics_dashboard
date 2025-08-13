import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DataFreshnessIndicator = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [updateInterval, setUpdateInterval] = useState(5); // seconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional connection issues
      const shouldDisconnect = Math.random() < 0.05; // 5% chance
      
      if (shouldDisconnect && connectionStatus === 'connected') {
        setConnectionStatus('disconnected');
        setTimeout(() => {
          setConnectionStatus('reconnecting');
          setTimeout(() => {
            setConnectionStatus('connected');
            setLastUpdate(new Date());
          }, 2000);
        }, 1000);
      } else if (connectionStatus === 'connected') {
        setLastUpdate(new Date());
      }
    }, updateInterval * 1000);

    return () => clearInterval(interval);
  }, [connectionStatus, updateInterval]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      case 'reconnecting': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'disconnected': return 'WifiOff';
      case 'reconnecting': return 'RotateCw';
      default: return 'Wifi';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'reconnecting': return 'Reconnecting...';
      default: return 'Unknown';
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={getStatusIcon()} 
          size={16} 
          className={`${getStatusColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`} 
        />
        <span className={`font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Data Freshness */}
      {connectionStatus === 'connected' && (
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Updated {formatLastUpdate()}</span>
        </div>
      )}

      {/* Update Frequency */}
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Icon name="RefreshCw" size={16} />
        <span>Every {updateInterval}s</span>
      </div>

      {/* Live Indicator */}
      {connectionStatus === 'connected' && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
};

export default DataFreshnessIndicator;