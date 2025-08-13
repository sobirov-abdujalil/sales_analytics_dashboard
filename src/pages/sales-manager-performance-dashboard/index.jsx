import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import TeamSelector from './components/TeamSelector';
import DateRangePicker from './components/DateRangePicker';
import CategoryFilter from './components/CategoryFilter';
import RefreshToggle from './components/RefreshToggle';
import PipelineFunnel from './components/PipelineFunnel';
import ActivityFeed from './components/ActivityFeed';
import PerformanceTable from './components/PerformanceTable';

const SalesManagerPerformanceDashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState('team-1');
  const [selectedRange, setSelectedRange] = useState('30');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedRep, setSelectedRep] = useState(null);

  // Mock data
  const teams = [
    { id: 'team-1', name: 'Enterprise Sales', memberCount: 8 },
    { id: 'team-2', name: 'SMB Sales', memberCount: 12 },
    { id: 'team-3', name: 'Channel Partners', memberCount: 6 }
  ];

  const categories = [
    { id: 'software', name: 'Software Solutions', revenue: 2450000 },
    { id: 'hardware', name: 'Hardware Products', revenue: 1850000 },
    { id: 'services', name: 'Professional Services', revenue: 980000 },
    { id: 'support', name: 'Support & Maintenance', revenue: 750000 }
  ];

  const kpiData = [
    {
      title: 'Team Quota Attainment',
      value: '94.2%',
      change: '+5.8%',
      changeType: 'positive',
      icon: 'Target',
      color: 'blue'
    },
    {
      title: 'Average Deal Size',
      value: '$45.2K',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'green'
    },
    {
      title: 'Sales Velocity',
      value: '28 days',
      change: '-3 days',
      changeType: 'positive',
      icon: 'Zap',
      color: 'purple'
    },
    {
      title: 'Pipeline Health',
      value: '3.2x',
      change: '+0.4x',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'orange'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-1.2%',
      changeType: 'negative',
      icon: 'Percent',
      color: 'red'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$2.1K',
      change: '-$180',
      changeType: 'positive',
      icon: 'Users',
      color: 'indigo'
    }
  ];

  const pipelineData = [
    { stage: 'Lead', deals: 145, value: 2890000, conversion: 100 },
    { stage: 'Qualified', deals: 89, value: 2340000, conversion: 61 },
    { stage: 'Proposal', deals: 52, value: 1850000, conversion: 36 },
    { stage: 'Negotiation', deals: 28, value: 1240000, conversion: 19 },
    { stage: 'Closed Won', deals: 18, value: 890000, conversion: 12 }
  ];

  const activities = [
    {
      id: 1,
      type: 'win',
      rep: 'Sarah Johnson',
      description: 'Closed Enterprise Software deal with TechCorp',
      dealValue: 125000,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'stage_change',
      rep: 'Mike Chen',
      description: 'Moved GlobalTech deal to Negotiation stage',
      dealValue: 85000,
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 3,
      type: 'new_deal',
      rep: 'Emily Rodriguez',
      description: 'Created new opportunity with StartupXYZ',
      dealValue: 45000,
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 4,
      type: 'loss',
      rep: 'David Kim',
      description: 'Lost MegaCorp deal to competitor',
      dealValue: 200000,
      timestamp: new Date(Date.now() - 1200000)
    },
    {
      id: 5,
      type: 'win',
      rep: 'Lisa Thompson',
      description: 'Closed Hardware bundle with RetailChain',
      dealValue: 75000,
      timestamp: new Date(Date.now() - 1500000)
    },
    {
      id: 6,
      type: 'stage_change',
      rep: 'Alex Martinez',
      description: 'Advanced FinanceInc to Proposal stage',
      dealValue: 95000,
      timestamp: new Date(Date.now() - 1800000)
    }
  ];

  const performanceData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Sales Rep',
      revenue: 485000,
      target: 450000,
      deals: 12,
      pipeline: 320000,
      pipelineDeals: 8,
      activities: 24
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Sales Rep',
      revenue: 425000,
      target: 400000,
      deals: 15,
      pipeline: 280000,
      pipelineDeals: 12,
      activities: 31
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Sales Rep',
      revenue: 395000,
      target: 400000,
      deals: 18,
      pipeline: 245000,
      pipelineDeals: 9,
      activities: 28
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Sales Rep',
      revenue: 365000,
      target: 400000,
      deals: 11,
      pipeline: 195000,
      pipelineDeals: 7,
      activities: 22
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Sales Rep',
      revenue: 445000,
      target: 400000,
      deals: 14,
      pipeline: 310000,
      pipelineDeals: 11,
      activities: 26
    },
    {
      id: 6,
      name: 'Alex Martinez',
      role: 'Junior Sales Rep',
      revenue: 285000,
      target: 300000,
      deals: 9,
      pipeline: 165000,
      pipelineDeals: 6,
      activities: 19
    }
  ];

  // Auto refresh effect
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 300000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  const handleStageClick = (stage) => {
    console.log('Stage clicked:', stage);
  };

  const handleRepSelect = (repName) => {
    setSelectedRep(repName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sales Manager Performance Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive team oversight and operational insights for daily sales management
            </p>
          </div>

          {/* Control Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <TeamSelector
                  selectedTeam={selectedTeam}
                  onTeamChange={setSelectedTeam}
                  teams={teams}
                />
                <DateRangePicker
                  selectedRange={selectedRange}
                  onRangeChange={setSelectedRange}
                />
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                  categories={categories}
                />
              </div>
              <RefreshToggle
                isAutoRefresh={isAutoRefresh}
                onToggle={() => setIsAutoRefresh(!isAutoRefresh)}
                lastUpdated={lastUpdated}
              />
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 mb-8">
            {/* Pipeline Funnel - 10 columns */}
            <div className="lg:col-span-10">
              <PipelineFunnel
                data={pipelineData}
                onStageClick={handleStageClick}
                selectedRep={selectedRep}
              />
            </div>

            {/* Activity Feed - 6 columns */}
            <div className="lg:col-span-6">
              <ActivityFeed activities={activities} />
            </div>
          </div>

          {/* Performance Table */}
          <PerformanceTable
            data={performanceData}
            onRepSelect={handleRepSelect}
          />
        </div>
      </main>
    </div>
  );
};

export default SalesManagerPerformanceDashboard;