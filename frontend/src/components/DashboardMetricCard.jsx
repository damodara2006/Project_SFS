import React from 'react';

const DashboardMetricCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="bg-background-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold text-text-primary mt-2">{value}</p>
        </div>
        <div className="p-3 bg-primary-accent/10 rounded-xl">
          <Icon className="w-6 h-6 text-primary-accent" />
        </div>
      </div>
      {trend && (
        <p className="text-xs text-text-tertiary mt-4">{trend}</p>
      )}
    </div>
  );
};

export default DashboardMetricCard;