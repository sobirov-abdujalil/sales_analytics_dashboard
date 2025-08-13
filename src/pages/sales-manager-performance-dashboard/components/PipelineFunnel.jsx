import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const PipelineFunnel = ({ data, onStageClick, selectedRep }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600">
            <span className="font-medium">Deals:</span> {data?.deals}
          </p>
          <p className="text-green-600">
            <span className="font-medium">Value:</span> ${data?.value?.toLocaleString()}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Conversion:</span> {data?.conversion}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={18} color="#3B82F6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pipeline Funnel</h3>
            <p className="text-sm text-gray-600">
              {selectedRep ? `Filtered by: ${selectedRep}` : 'All team members'}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Export
        </Button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="deals" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(data) => onStageClick(data?.stage)}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {data?.map((stage, index) => (
          <div 
            key={stage?.stage}
            className="text-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => onStageClick(stage?.stage)}
          >
            <div className="text-lg font-bold" style={{ color: colors?.[index % colors?.length] }}>
              {stage?.deals}
            </div>
            <div className="text-xs text-gray-600 mt-1">{stage?.stage}</div>
            <div className="text-xs text-gray-500">${stage?.value?.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineFunnel;