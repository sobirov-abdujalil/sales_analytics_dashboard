import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, onSaveQuery, savedQueries, onLoadQuery }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [queryName, setQueryName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const territoryOptions = [
    { value: 'all', label: 'All Territories' },
    { value: 'north', label: 'North Region' },
    { value: 'south', label: 'South Region' },
    { value: 'east', label: 'East Region' },
    { value: 'west', label: 'West Region' },
    { value: 'central', label: 'Central Region' }
  ];

  const productLineOptions = [
    { value: 'all', label: 'All Product Lines' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'smb', label: 'Small & Medium Business' },
    { value: 'consumer', label: 'Consumer Products' },
    { value: 'cloud', label: 'Cloud Services' },
    { value: 'mobile', label: 'Mobile Applications' }
  ];

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: 'direct', label: 'Direct Sales' },
    { value: 'partner', label: 'Partner Channel' },
    { value: 'online', label: 'Online Sales' },
    { value: 'retail', label: 'Retail Partners' },
    { value: 'reseller', label: 'Authorized Resellers' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Segments' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
    { value: 'mid-market', label: 'Mid-Market (100-999 employees)' },
    { value: 'smb', label: 'Small Business (10-99 employees)' },
    { value: 'startup', label: 'Startups (<10 employees)' },
    { value: 'government', label: 'Government & Public Sector' }
  ];

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisquarter', label: 'This Quarter' },
    { value: 'lastquarter', label: 'Last Quarter' },
    { value: 'thisyear', label: 'This Fiscal Year' },
    { value: 'lastyear', label: 'Last Fiscal Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const presetQueries = [
    { id: 'quarterly-review', name: 'Quarterly Performance Review', icon: 'TrendingUp' },
    { id: 'product-analysis', name: 'Product Line Analysis', icon: 'Package' },
    { id: 'territory-comparison', name: 'Territory Comparison', icon: 'Map' },
    { id: 'channel-performance', name: 'Channel Performance', icon: 'Users' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSaveQuery = () => {
    if (queryName?.trim()) {
      onSaveQuery(queryName, filters);
      setQueryName('');
      setShowSaveDialog(false);
    }
  };

  const handleResetFilters = () => {
    onFiltersChange({
      territory: 'all',
      productLine: 'all',
      channel: 'all',
      segment: 'all',
      dateRange: 'last30days'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            iconName="Save"
            iconPosition="left"
          >
            Save Query
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <Select
              label="Territory"
              options={territoryOptions}
              value={filters?.territory}
              onChange={(value) => handleFilterChange('territory', value)}
              className="w-full"
            />
            <Select
              label="Product Line"
              options={productLineOptions}
              value={filters?.productLine}
              onChange={(value) => handleFilterChange('productLine', value)}
              className="w-full"
            />
            <Select
              label="Sales Channel"
              options={channelOptions}
              value={filters?.channel}
              onChange={(value) => handleFilterChange('channel', value)}
              className="w-full"
            />
            <Select
              label="Customer Segment"
              options={segmentOptions}
              value={filters?.segment}
              onChange={(value) => handleFilterChange('segment', value)}
              className="w-full"
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-full"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Quick Analysis Presets</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {presetQueries?.map((preset) => (
                <Button
                  key={preset?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onLoadQuery(preset?.id)}
                  iconName={preset?.icon}
                  iconPosition="left"
                  className="justify-start"
                >
                  {preset?.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Saved Queries */}
          {savedQueries && savedQueries?.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Saved Queries</h4>
              <div className="flex flex-wrap gap-2">
                {savedQueries?.map((query, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => onLoadQuery(query?.id)}
                    iconName="BookOpen"
                    iconPosition="left"
                  >
                    {query?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Save Query Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Query</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSaveDialog(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Query Name
                </label>
                <input
                  type="text"
                  value={queryName}
                  onChange={(e) => setQueryName(e?.target?.value)}
                  placeholder="Enter query name..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveQuery}
                  disabled={!queryName?.trim()}
                >
                  Save Query
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;