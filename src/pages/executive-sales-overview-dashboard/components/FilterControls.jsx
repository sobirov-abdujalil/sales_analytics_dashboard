import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  selectedPeriod, 
  onPeriodChange, 
  selectedRegion, 
  onRegionChange, 
  comparisonMode, 
  onComparisonModeChange,
  onExportPDF,
  lastUpdated 
}) => {
  const periodOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'q1', label: 'Q1 2024' },
    { value: 'q2', label: 'Q2 2024' },
    { value: 'q3', label: 'Q3 2024' },
    { value: 'q4', label: 'Q4 2024' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East' }
  ];

  const comparisonOptions = [
    { value: 'none', label: 'No Comparison' },
    { value: 'yoy', label: 'Year over Year' },
    { value: 'qoq', label: 'Quarter over Quarter' },
    { value: 'mom', label: 'Month over Month' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Select
            label="Time Period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={onPeriodChange}
            className="w-full sm:w-48"
          />

          <Select
            label="Region"
            options={regionOptions}
            value={selectedRegion}
            onChange={onRegionChange}
            className="w-full sm:w-48"
          />

          <Select
            label="Comparison"
            options={comparisonOptions}
            value={comparisonMode}
            onChange={onComparisonModeChange}
            className="w-full sm:w-48"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Updated: {lastUpdated}</span>
          </div>

          <Button
            variant="outline"
            onClick={onExportPDF}
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;