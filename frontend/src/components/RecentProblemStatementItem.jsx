import React from 'react';
import { FaRegLightbulb, FaChevronRight } from 'react-icons/fa';
import StatusBadge from './StatusBadge.jsx'; // We'll reuse our status badge

const RecentProblemStatementItem = ({ id, title, submissions, status }) => {
  return (
    <div className="flex justify-between items-center py-4 hover:bg-background-light/50 px-2 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="bg-background-light p-3 rounded-lg">
          <FaRegLightbulb className="w-5 h-5 text-primary-accent" />
        </div>
        <div>
          <p className="font-semibold text-text-primary">{title}</p>
          <p className="text-xs text-text-secondary">ID: {id}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center hidden sm:block">
          <p className="font-bold text-text-primary">{submissions}</p>
          <p className="text-xs text-text-secondary">Submissions</p>
        </div>
        <StatusBadge status={status} />
        <FaChevronRight className="w-4 h-4 text-text-tertiary" />
      </div>
    </div>
  );
};

export default RecentProblemStatementItem;