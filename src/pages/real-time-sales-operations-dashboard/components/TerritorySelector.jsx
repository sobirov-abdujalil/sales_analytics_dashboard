import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TerritorySelector = ({ onTerritoryChange }) => {
  const [selectedTerritory, setSelectedTerritory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const territories = [
    {
      id: 'all',
      name: 'All Territories',
      description: 'Global view of all sales territories',
      reps: 24,
      revenue: 2450000,
      icon: 'Globe'
    },
    {
      id: 'north',
      name: 'North Region',
      description: 'US North, Canada',
      reps: 8,
      revenue: 890000,
      icon: 'MapPin'
    },
    {
      id: 'south',
      name: 'South Region',
      description: 'US South, Mexico',
      reps: 6,
      revenue: 650000,
      icon: 'MapPin'
    },
    {
      id: 'east',
      name: 'East Region',
      description: 'US East Coast',
      reps: 5,
      revenue: 520000,
      icon: 'MapPin'
    },
    {
      id: 'west',
      name: 'West Region',
      description: 'US West Coast',
      reps: 5,
      revenue: 390000,
      icon: 'MapPin'
    }
  ];

  const handleTerritorySelect = (territory) => {
    setSelectedTerritory(territory?.id);
    setIsOpen(false);
    if (onTerritoryChange) {
      onTerritoryChange(territory);
    }
  };

  const selectedTerritoryData = territories?.find(t => t?.id === selectedTerritory);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-smooth"
      >
        <Icon name={selectedTerritoryData?.icon || 'Globe'} size={16} className="text-primary" />
        <span className="font-medium text-foreground">{selectedTerritoryData?.name}</span>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {territories?.map((territory) => (
              <button
                key={territory?.id}
                onClick={() => handleTerritorySelect(territory)}
                className={`w-full text-left p-3 rounded-lg transition-smooth hover:bg-muted ${
                  selectedTerritory === territory?.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedTerritory === territory?.id ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={territory?.icon} 
                        size={16} 
                        className={selectedTerritory === territory?.id ? 'text-primary' : 'text-muted-foreground'} 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{territory?.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{territory?.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} />
                          <span>{territory?.reps} reps</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="DollarSign" size={12} />
                          <span>${(territory?.revenue / 1000)?.toFixed(0)}K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedTerritory === territory?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TerritorySelector;