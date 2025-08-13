import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Executive Overview',
      path: '/executive-sales-overview-dashboard',
      description: 'Strategic performance insights for senior leadership'
    },
    {
      label: 'Team Performance',
      path: '/sales-manager-performance-dashboard',
      description: 'Operational sales management dashboard'
    },
    {
      label: 'Analytics',
      path: '/sales-analytics-deep-dive-dashboard',
      description: 'Comprehensive data analysis environment'
    },
    {
      label: 'Live Operations',
      path: '/real-time-sales-operations-dashboard',
      description: 'Real-time monitoring dashboard'
    }
  ];

  const handleNavigation = (path) => {
    // Always navigate, even if on the same page (for refresh/reload behavior)
    navigate(path, { replace: false });
    setIsMobileMenuOpen(false);
    
    // Add visual feedback for successful navigation
    if (window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveTab = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground leading-tight">
                  Sales Analytics
                </h1>
                <span className="text-xs text-muted-foreground leading-tight">
                  Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105
                  ${isActiveTab(item?.path)
                    ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-sm'
                  }
                `}
                aria-current={isActiveTab(item?.path) ? 'page' : undefined}
                title={item?.description}
                type="button"
              >
                {item?.label}
                {isActiveTab(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1500 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border animate-slide-in-from-left">
            <div className="flex items-center justify-between h-16 px-6 border-b border-border">
              <span className="text-lg font-semibold text-foreground">Navigation</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200
                    ${isActiveTab(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-muted hover:shadow-sm'
                    }
                  `}
                  aria-current={isActiveTab(item?.path) ? 'page' : undefined}
                  type="button"
                >
                  <div className="font-medium">{item?.label}</div>
                  <div className={`text-sm mt-1 ${
                    isActiveTab(item?.path) 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {item?.description}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;