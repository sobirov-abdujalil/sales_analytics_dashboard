import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'win': return 'Trophy';
      case 'loss': return 'X';
      case 'stage_change': return 'ArrowRight';
      case 'new_deal': return 'Plus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'win': return 'text-green-600 bg-green-50';
      case 'loss': return 'text-red-600 bg-red-50';
      case 'stage_change': return 'text-blue-600 bg-blue-50';
      case 'new_deal': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={18} color="#10B981" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
          <p className="text-sm text-gray-600">Recent team updates</p>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity?.rep}
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activity?.description}
              </p>
              {activity?.dealValue && (
                <p className="text-sm font-medium text-green-600 mt-1">
                  ${activity?.dealValue?.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;