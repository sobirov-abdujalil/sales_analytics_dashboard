import React from 'react';
import Button from '../../../components/ui/Button';

const DateRangePicker = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Period:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {ranges?.map((range) => (
          <Button
            key={range?.value}
            variant={selectedRange === range?.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onRangeChange(range?.value)}
            className={selectedRange === range?.value ? '' : 'text-gray-600'}
          >
            {range?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateRangePicker;