import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataProcessingIndicator = ({ isProcessing, progress, estimatedTime, onCancel }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime);

  useEffect(() => {
    if (isProcessing && progress !== undefined) {
      setCurrentProgress(progress);
    }
  }, [isProcessing, progress]);

  useEffect(() => {
    let interval;
    if (isProcessing && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isProcessing, timeRemaining]);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusColor = () => {
    if (currentProgress < 30) return 'bg-destructive';
    if (currentProgress < 70) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusIcon = () => {
    if (currentProgress === 100) return 'CheckCircle';
    if (currentProgress > 0) return 'Activity';
    return 'Clock';
  };

  const processingStages = [
    { id: 'data-fetch', label: 'Fetching Data', threshold: 20 },
    { id: 'data-clean', label: 'Cleaning & Validation', threshold: 40 },
    { id: 'analysis', label: 'Running Analysis', threshold: 70 },
    { id: 'visualization', label: 'Generating Charts', threshold: 90 },
    { id: 'complete', label: 'Complete', threshold: 100 }
  ];

  const getCurrentStage = () => {
    return processingStages?.find(stage => currentProgress <= stage?.threshold) || processingStages?.[0];
  };

  if (!isProcessing && currentProgress === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon 
              name={getStatusIcon()} 
              size={20} 
              className={`${currentProgress === 100 ? 'text-success' : 'text-primary'} ${
                isProcessing && currentProgress < 100 ? 'animate-spin' : ''
              }`} 
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {currentProgress === 100 ? 'Analysis Complete' : 'Processing Data'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {getCurrentStage()?.label}
            </p>
          </div>
        </div>
        
        {isProcessing && currentProgress < 100 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        )}
      </div>
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{currentProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
      {/* Time Estimation */}
      {isProcessing && currentProgress < 100 && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>Estimated time remaining:</span>
          </div>
          <span className="font-medium text-foreground">
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}
      {/* Processing Stages */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-5 gap-2">
          {processingStages?.map((stage, index) => (
            <div key={stage?.id} className="flex flex-col items-center space-y-1">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  currentProgress >= stage?.threshold
                    ? 'bg-success text-success-foreground'
                    : currentProgress >= (processingStages?.[index - 1]?.threshold || 0)
                    ? 'bg-primary text-primary-foreground animate-pulse'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentProgress >= stage?.threshold ? (
                  <Icon name="Check" size={12} />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs text-center leading-tight ${
                currentProgress >= stage?.threshold
                  ? 'text-success font-medium'
                  : currentProgress >= (processingStages?.[index - 1]?.threshold || 0)
                  ? 'text-primary font-medium' :'text-muted-foreground'
              }`}>
                {stage?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Success Message */}
      {currentProgress === 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Data analysis completed successfully
            </span>
          </div>
          <p className="text-xs text-success/80 mt-1 ml-6">
            All charts and insights have been updated with the latest data.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataProcessingIndicator;