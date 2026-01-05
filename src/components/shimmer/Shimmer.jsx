import React from 'react';
import './Shimmer.css';

const Shimmer = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
  return (
    <div 
      className={`shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

// Card Shimmer for dashboard cards
export const CardShimmer = ({ className = '' }) => {
  return (
    <div className={`card-shimmer ${className}`}>
      <div className="shimmer-content">
        <Shimmer width="60px" height="60px" borderRadius="8px" />
        <div className="shimmer-text">
          <Shimmer width="80%" height="16px" />
          <Shimmer width="60%" height="12px" />
        </div>
      </div>
    </div>
  );
};

// Chart Shimmer for graphs and charts
export const ChartShimmer = ({ className = '' }) => {
  return (
    <div className={`chart-shimmer ${className}`}>
      <div className="shimmer-header">
        <Shimmer width="150px" height="20px" />
        <Shimmer width="80px" height="16px" />
      </div>
      <div className="shimmer-chart-area">
        <Shimmer width="100%" height="200px" borderRadius="8px" />
      </div>
    </div>
  );
};

// Doughnut Chart Shimmer
export const DoughnutShimmer = ({ className = '' }) => {
  return (
    <div className={`doughnut-shimmer ${className}`}>
      <div className="shimmer-header">
        <Shimmer width="100px" height="18px" />
        <Shimmer width="120px" height="14px" />
      </div>
      <div className="shimmer-stats">
        <Shimmer width="60px" height="12px" />
        <Shimmer width="60px" height="12px" />
        <Shimmer width="60px" height="12px" />
      </div>
      <div className="shimmer-doughnut">
        <Shimmer width="150px" height="150px" borderRadius="50%" />
      </div>
    </div>
  );
};

// Line Chart Shimmer
export const LineChartShimmer = ({ className = '' }) => {
  return (
    <div className={`line-chart-shimmer ${className}`}>
      <div className="shimmer-header">
        <Shimmer width="180px" height="20px" />
        <Shimmer width="80px" height="32px" borderRadius="4px" />
      </div>
      <div className="shimmer-chart">
        <Shimmer width="100%" height="250px" borderRadius="8px" />
      </div>
      <div className="shimmer-footer">
        <Shimmer width="100px" height="16px" />
      </div>
    </div>
  );
};

export default Shimmer;
