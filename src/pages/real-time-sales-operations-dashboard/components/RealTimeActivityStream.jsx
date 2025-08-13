import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeActivityStream = () => {
  const [activities, setActivities] = useState([]);
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'deal_closed',
      title: 'Deal Closed - Enterprise Software License',
      description: 'Sarah Johnson closed a $45,000 deal with TechCorp Solutions',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      priority: 'high',
      rep: 'Sarah Johnson',
      amount: 45000,
      company: 'TechCorp Solutions',
      stage: 'Closed Won',
      details: {
        dealSize: '$45,000',
        closeProbability: '95%',
        salesCycle: '45 days',
        nextAction: 'Contract signing scheduled'
      }
    },
    {
      id: 2,
      type: 'stage_progression',
      title: 'Deal Advanced to Proposal Stage',
      description: 'Michael Chen moved CloudTech Inc. deal to Proposal stage',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'medium',
      rep: 'Michael Chen',
      amount: 78000,
      company: 'CloudTech Inc.',
      stage: 'Proposal',
      details: {
        dealSize: '$78,000',
        closeProbability: '70%',
        salesCycle: '32 days',
        nextAction: 'Proposal review meeting'
      }
    },
    {
      id: 3,
      type: 'new_opportunity',
      title: 'New Opportunity Created',
      description: 'Emma Rodriguez created new opportunity for DataFlow Systems',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      priority: 'medium',
      rep: 'Emma Rodriguez',
      amount: 32000,
      company: 'DataFlow Systems',
      stage: 'Qualification',
      details: {
        dealSize: '$32,000',
        closeProbability: '25%',
        salesCycle: '0 days',
        nextAction: 'Discovery call scheduled'
      }
    },
    {
      id: 4,
      type: 'meeting_completed',
      title: 'Demo Meeting Completed',
      description: 'Alex Thompson completed product demo with InnovateLabs',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      priority: 'low',
      rep: 'Alex Thompson',
      amount: 56000,
      company: 'InnovateLabs',
      stage: 'Demo',
      details: {
        dealSize: '$56,000',
        closeProbability: '60%',
        salesCycle: '28 days',
        nextAction: 'Follow-up call scheduled'
      }
    },
    {
      id: 5,
      type: 'quota_alert',
      title: 'Quota Achievement Alert',
      description: 'David Kim reached 85% of monthly quota with 5 days remaining',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'high',
      rep: 'David Kim',
      amount: 0,
      company: '',
      stage: '',
      details: {
        currentQuota: '85%',
        target: '$120,000',
        achieved: '$102,000',
        remaining: '$18,000'
      }
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);

    // Simulate new activities
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['deal_closed', 'stage_progression', 'new_opportunity', 'meeting_completed']?.[Math.floor(Math.random() * 4)],
        title: 'New Activity Generated',
        description: 'Real-time activity simulation',
        timestamp: new Date(),
        priority: ['high', 'medium', 'low']?.[Math.floor(Math.random() * 3)],
        rep: ['Sarah Johnson', 'Michael Chen', 'Emma Rodriguez', 'Alex Thompson']?.[Math.floor(Math.random() * 4)],
        amount: Math.floor(Math.random() * 100000) + 10000,
        company: 'Demo Company',
        stage: 'Active'
      };

      setActivities(prev => [newActivity, ...prev?.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'deal_closed': return 'CheckCircle';
      case 'stage_progression': return 'ArrowRight';
      case 'new_opportunity': return 'Plus';
      case 'meeting_completed': return 'Calendar';
      case 'quota_alert': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'deal_closed': return 'text-green-600';
      case 'stage_progression': return 'text-blue-600';
      case 'new_opportunity': return 'text-purple-600';
      case 'meeting_completed': return 'text-orange-600';
      case 'quota_alert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const toggleExpanded = (activityId) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Live Activity Stream</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Real-time</span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className={`border-l-4 ${getPriorityColor(activity?.priority)} p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg bg-white border ${getTypeColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} className={getTypeColor(activity?.type)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">{activity?.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {activity?.rep && <span>Rep: {activity?.rep}</span>}
                      {activity?.amount > 0 && <span>Value: ${activity?.amount?.toLocaleString()}</span>}
                      {activity?.stage && <span>Stage: {activity?.stage}</span>}
                    </div>
                    
                    {activity?.details && (
                      <button
                        onClick={() => toggleExpanded(activity?.id)}
                        className="text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        {expandedActivity === activity?.id ? 'Less' : 'More'}
                      </button>
                    )}
                  </div>
                  
                  {expandedActivity === activity?.id && activity?.details && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(activity?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                            </span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeActivityStream;