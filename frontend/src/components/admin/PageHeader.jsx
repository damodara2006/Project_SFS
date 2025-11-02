import React from 'react';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-0 flex-shrink-0">
          <div className="flex items-center justify-start sm:justify-end space-x-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;