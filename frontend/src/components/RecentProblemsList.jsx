import React from 'react';
import RecentProblemStatementItem from './RecentProblemStatementItem.jsx';
import { mockProblemStatements } from '../mockData.js';

const RecentProblemsList = () => {
  return (
    <div className="bg-background-white p-6 rounded-2xl shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Problem Statements</h3>
        <a href="/admin/problem-statements" className="text-sm font-medium text-action-blue hover:underline">
          View All
        </a>
      </div>
      <div className="divide-y divide-border-color">
        {mockProblemStatements.slice(0, 4).map(problem => (
          <RecentProblemStatementItem
            key={problem.id}
            id={problem.id}
            title={problem.title}
            submissions={problem.submissions}
            status={problem.status}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentProblemsList;