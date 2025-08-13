import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SalesActivityHeatMap = () => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState('EST');
  const [heatmapData, setHeatmapData] = useState([]);

  const timezones = [
    { value: 'EST', label: 'Eastern (EST)', offset: -5 },
    { value: 'CST', label: 'Central (CST)', offset: -6 },
    { value: 'MST', label: 'Mountain (MST)', offset: -7 },
    { value: 'PST', label: 'Pacific (PST)', offset: -8 }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Generate mock heatmap data
  useEffect(() => {
    const generateHeatmapData = () => {
      const data = [];
      
      daysOfWeek?.forEach((day, dayIndex) => {
        hours?.forEach((hour) => {
          // Simulate higher activity during business hours (9-17) on weekdays
          let intensity = Math.random() * 0.3; // Base intensity
          
          if (dayIndex < 5) { // Weekdays
            if (hour >= 9 && hour <= 17) {
              intensity = Math.random() * 0.7 + 0.3; // Higher intensity during business hours
            }
            if (hour >= 12 && hour <= 14) {
              intensity = Math.random() * 0.9 + 0.1; // Peak during lunch hours
            }
          } else { // Weekends
            intensity = Math.random() * 0.2; // Lower weekend activity
          }

          data?.push({
            day: dayIndex,
            hour,
            intensity,
            transactions: Math.floor(intensity * 50) + Math.floor(Math.random() * 10),
            revenue: Math.floor(intensity * 25000) + Math.floor(Math.random() * 5000)
          });
        });
      });
      
      return data;
    };

    setHeatmapData(generateHeatmapData());

    // Update data every 30 seconds to simulate real-time changes
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData());
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const getIntensityColor = (intensity) => {
    if (intensity < 0.2) return 'bg-green-100 hover:bg-green-200';
    if (intensity < 0.4) return 'bg-green-200 hover:bg-green-300';
    if (intensity < 0.6) return 'bg-green-300 hover:bg-green-400';
    if (intensity < 0.8) return 'bg-green-400 hover:bg-green-500';
    return 'bg-green-500 hover:bg-green-600';
  };

  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}${period}`;
  };

  const getHourData = (day, hour) => {
    return heatmapData?.find(d => d?.day === day && d?.hour === hour) || { intensity: 0, transactions: 0, revenue: 0 };
  };

  const handleCellClick = (day, hour) => {
    const cellKey = `${day}-${hour}`;
    setSelectedHour(selectedHour === cellKey ? null : cellKey);
  };

  const getSelectedHourData = () => {
    if (!selectedHour) return null;
    const [day, hour] = selectedHour?.split('-')?.map(Number);
    const data = getHourData(day, hour);
    return {
      day: daysOfWeek?.[day],
      hour: formatHour(hour),
      ...data
    };
  };

  const selectedData = getSelectedHourData();

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Sales Activity Heat Map</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e?.target?.value)}
            className="px-3 py-1 border border-border rounded-md text-sm bg-background"
          >
            {timezones?.map((tz) => (
              <option key={tz?.value} value={tz?.value}>{tz?.label}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Heatmap */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Hour labels */}
              <div className="flex mb-2">
                <div className="w-12"></div>
                {hours?.map((hour) => (
                  <div key={hour} className="w-6 text-xs text-center text-muted-foreground">
                    {hour % 4 === 0 ? formatHour(hour) : ''}
                  </div>
                ))}
              </div>
              
              {/* Heatmap grid */}
              {daysOfWeek?.map((day, dayIndex) => (
                <div key={day} className="flex items-center mb-1">
                  <div className="w-12 text-sm font-medium text-foreground pr-2">{day}</div>
                  {hours?.map((hour) => {
                    const data = getHourData(dayIndex, hour);
                    const cellKey = `${dayIndex}-${hour}`;
                    const isSelected = selectedHour === cellKey;
                    
                    return (
                      <div
                        key={hour}
                        className={`w-6 h-6 mx-px rounded cursor-pointer transition-all duration-200 ${
                          getIntensityColor(data?.intensity)
                        } ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                        onClick={() => handleCellClick(dayIndex, hour)}
                        title={`${day} ${formatHour(hour)}: ${data?.transactions} transactions, $${data?.revenue?.toLocaleString()}`}
                      />
                    );
                  })}
                </div>
              ))}
              
              {/* Legend */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <span className="text-sm text-muted-foreground">Less</span>
                <div className="flex space-x-1">
                  {[0.1, 0.3, 0.5, 0.7, 0.9]?.map((intensity, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded ${getIntensityColor(intensity)}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-muted rounded-lg p-4 h-full">
            {selectedData ? (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {selectedData?.day} at {selectedData?.hour}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Transactions</span>
                      <Icon name="Activity" size={16} className="text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {selectedData?.transactions}
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <Icon name="DollarSign" size={16} className="text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      ${selectedData?.revenue?.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Activity Level</span>
                      <Icon name="TrendingUp" size={16} className="text-purple-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedData?.intensity * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {Math.round(selectedData?.intensity * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Avg. Deal Size</span>
                      <Icon name="Target" size={16} className="text-orange-500" />
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      ${selectedData?.transactions > 0 ? Math.round(selectedData?.revenue / selectedData?.transactions)?.toLocaleString() : '0'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Select a Time Slot</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any cell in the heatmap to view detailed activity data for that time period.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesActivityHeatMap;