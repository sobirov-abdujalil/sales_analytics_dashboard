import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ isOpen, onClose, onExport, availableData }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState(['charts', 'summary']);
  const [dateRange, setDateRange] = useState('current');
  const [includeFilters, setIncludeFilters] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'excel', label: 'Excel Workbook (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' },
    { value: 'api', label: 'API Endpoint' }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current View' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisyear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const dataOptions = [
    { id: 'charts', label: 'Chart Data', description: 'Raw data used in visualizations' },
    { id: 'summary', label: 'Summary Statistics', description: 'Key metrics and KPIs' },
    { id: 'trends', label: 'Trend Analysis', description: 'Period-over-period comparisons' },
    { id: 'forecasts', label: 'Forecast Data', description: 'Predictive analytics results' },
    { id: 'filters', label: 'Applied Filters', description: 'Current filter configuration' }
  ];

  const handleDataSelection = (dataId, checked) => {
    if (checked) {
      setSelectedData([...selectedData, dataId]);
    } else {
      setSelectedData(selectedData?.filter(id => id !== dataId));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportConfig = {
      format: exportFormat,
      data: selectedData,
      dateRange,
      includeFilters,
      timestamp: new Date()?.toISOString()
    };

    try {
      await onExport(exportConfig);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'csv': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      case 'pdf': return 'FileImage';
      case 'json': return 'Code';
      case 'api': return 'Link';
      default: return 'Download';
    }
  };

  const getEstimatedSize = () => {
    const baseSize = selectedData?.length * 50; // KB per data type
    const multiplier = exportFormat === 'pdf' ? 3 : exportFormat === 'excel' ? 2 : 1;
    return Math.round(baseSize * multiplier);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Data</h2>
              <p className="text-sm text-muted-foreground">
                Configure your data export settings
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close export dialog"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description="Choose the format for your exported data"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
            <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={getFormatIcon(exportFormat)} size={14} />
              <span>Estimated size: ~{getEstimatedSize()} KB</span>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Select
              label="Date Range"
              description="Select the time period for exported data"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>

          {/* Data Selection */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Data to Include
            </h3>
            <div className="space-y-3">
              {dataOptions?.map((option) => (
                <div key={option?.id} className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedData?.includes(option?.id)}
                    onChange={(e) => handleDataSelection(option?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground cursor-pointer">
                      {option?.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {option?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Additional Options
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Include Filter Configuration"
                description="Export current filter settings with the data"
                checked={includeFilters}
                onChange={(e) => setIncludeFilters(e?.target?.checked)}
              />
            </div>
          </div>

          {/* API Endpoint Info */}
          {exportFormat === 'api' && (
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">API Endpoint</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Generate a secure API endpoint to access this data programmatically
              </p>
              <div className="bg-background border border-border rounded p-2 font-mono text-xs">
                https://api.salesanalytics.com/v1/export/{'{'}token{'}'}
              </div>
              <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Token expires in 24 hours</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            {selectedData?.length} data type{selectedData?.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              disabled={selectedData?.length === 0 || isExporting}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;