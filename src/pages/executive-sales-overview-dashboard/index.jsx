import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import RegionalPerformance from './components/RegionalPerformance';
import MarketShareChart from './components/MarketShareChart';
import FilterControls from './components/FilterControls';

const ExecutiveSalesOverviewDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('q3');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [comparisonMode, setComparisonMode] = useState('yoy');
  const [lastUpdated, setLastUpdated] = useState('');

  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      changeType: "positive",
      sparklineData: [65, 72, 68, 75, 82, 78, 85, 90, 88, 92, 95, 98],
      icon: "DollarSign",
      color: "blue"
    },
    {
      title: "Growth Rate",
      value: "18.3%",
      change: "+3.2%",
      changeType: "positive",
      sparklineData: [45, 52, 48, 55, 62, 58, 65, 70, 68, 72, 75, 78],
      icon: "TrendingUp",
      color: "green"
    },
    {
      title: "Pipeline Value",
      value: "$8.7M",
      change: "+5.8%",
      changeType: "positive",
      sparklineData: [80, 85, 82, 88, 92, 89, 95, 98, 96, 100, 103, 105],
      icon: "Target",
      color: "purple"
    },
    {
      title: "Conversion Rate",
      value: "24.6%",
      change: "-2.1%",
      changeType: "negative",
      sparklineData: [30, 32, 28, 25, 27, 24, 26, 23, 25, 22, 24, 25],
      icon: "Percent",
      color: "orange"
    }
  ];

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 180000, growthRate: 12 },
    { month: 'Feb', revenue: 195000, growthRate: 15 },
    { month: 'Mar', revenue: 210000, growthRate: 18 },
    { month: 'Apr', revenue: 225000, growthRate: 22 },
    { month: 'May', revenue: 240000, growthRate: 25 },
    { month: 'Jun', revenue: 255000, growthRate: 28 },
    { month: 'Jul', revenue: 270000, growthRate: 24 },
    { month: 'Aug', revenue: 285000, growthRate: 20 },
    { month: 'Sep', revenue: 300000, growthRate: 18 },
    { month: 'Oct', revenue: 315000, growthRate: 16 },
    { month: 'Nov', revenue: 330000, growthRate: 14 },
    { month: 'Dec', revenue: 345000, growthRate: 12 }
  ];

  // Mock data for regional performance
  const regionalData = [
    { id: 1, name: 'North America', revenue: 1250000, performance: 95 },
    { id: 2, name: 'Europe', revenue: 980000, performance: 88 },
    { id: 3, name: 'Asia Pacific', revenue: 750000, performance: 82 },
    { id: 4, name: 'Latin America', revenue: 420000, performance: 76 },
    { id: 5, name: 'Middle East', revenue: 380000, performance: 58 }
  ];

  // Mock data for market share
  const marketShareData = [
    { category: 'Enterprise Software', value: 850000, percentage: 35 },
    { category: 'Cloud Services', value: 610000, percentage: 25 },
    { category: 'Consulting', value: 490000, percentage: 20 },
    { category: 'Support & Maintenance', value: 290000, percentage: 12 },
    { category: 'Training', value: 120000, percentage: 5 },
    { category: 'Other', value: 70000, percentage: 3 }
  ];

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setLastUpdated(now?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDataPointClick = (data) => {
    console.log('Chart data point clicked:', data);
    // Implement drill-down functionality here
  };

  const handleExportPDF = () => {
    console.log('Exporting dashboard to PDF...');
    // Implement PDF export functionality here
  };

  return (
    <>
      <Helmet>
        <title>Executive Sales Overview Dashboard - Sales Analytics</title>
        <meta name="description" content="Strategic sales performance insights for senior leadership with KPI monitoring and revenue analytics" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Executive Sales Overview
              </h1>
              <p className="text-muted-foreground">
                Strategic performance insights for senior leadership and board presentations
              </p>
            </div>

            {/* Filter Controls */}
            <FilterControls
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              comparisonMode={comparisonMode}
              onComparisonModeChange={setComparisonMode}
              onExportPDF={handleExportPDF}
              lastUpdated={lastUpdated}
            />

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {kpiData?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  sparklineData={kpi?.sparklineData}
                  icon={kpi?.icon}
                  color={kpi?.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
              {/* Revenue Chart - 8 columns */}
              <div className="xl:col-span-8">
                <RevenueChart 
                  data={revenueData} 
                  onDataPointClick={handleDataPointClick}
                />
              </div>

              {/* Regional Performance - 4 columns */}
              <div className="xl:col-span-4">
                <RegionalPerformance regions={regionalData} />
              </div>
            </div>

            {/* Market Share Chart - Full Width */}
            <div className="mb-8">
              <MarketShareChart data={marketShareData} />
            </div>

            {/* Footer Info */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Data refreshes every 30 minutes</span>
                  <span>•</span>
                  <span>Next update: {new Date(Date.now() + 30 * 60 * 1000)?.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} Sales Analytics Dashboard
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExecutiveSalesOverviewDashboard;