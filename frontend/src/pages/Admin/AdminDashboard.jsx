import React from 'react';
import { Link } from 'react-router-dom';

// ICONS: Using your preferred Feather Icons from 'react-icons/fi'
import { FiClipboard, FiUsers, FiCheckSquare, FiUpload, FiUser, FiArrowRight } from 'react-icons/fi';

// MOCK DATA: Using your imported mock data
import { mockProblemStatements, mockSubmissions, mockSpocRequests, mockUsers } from '../../mockData';

// Reusable component for the statistic cards, matching the new design
const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-md flex justify-between items-center border-l-4 ${color}`}>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
  );
};

// Reusable component for the Quick Links
const QuickLink = ({ to, children }) => (
  <Link to={to} className="flex items-center justify-between text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-3 rounded-md transition-all">
    <span className="font-medium">{children}</span>
    <FiArrowRight />
  </Link>
);


const AdminDashboard = () => {
  // Your existing logic for calculating stats
  const totalProblems = mockProblemStatements.length;
  const openProblems = mockProblemStatements.filter(p => p.status === 'Open').length;
  const totalSubmissions = mockSubmissions.length;
  const pendingApprovals = mockSpocRequests.filter(r => r.status === 'Pending').length;
  const totalEvaluators = mockUsers.filter(u => u.role === 'Evaluator').length;

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Statistics Grid - now with 5 columns as per the design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        <StatCard
          title="Total Problems"
          value={totalProblems}
          icon={FiClipboard}
          color="border-blue-500"
        />
        <StatCard
          title="Open Problems"
          value={openProblems}
          icon={FiCheckSquare}
          color="border-green-500"
        />
        <StatCard
          title="Total Submissions"
          value={totalSubmissions}
          icon={FiUpload}
          color="border-yellow-500"
        />
        <StatCard
          title="Pending SPOC Approvals"
          value={pendingApprovals}
          icon={FiUsers}
          color="border-red-500"
        />
        <StatCard
          title="Active Evaluators"
          value={totalEvaluators}
          icon={FiUser}
          color="border-indigo-500"
        />
      </div>

      {/* Quick Links Section - redesigned */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Links</h2>
        <div className="space-y-2">
            {/* Using <Link> component is better for single-page apps than <a> tags */}
            <QuickLink to="/admin/spoc-approvals">Review SPOC Requests</QuickLink>
            <QuickLink to="/admin/problem-statements/create">Create New Problem Statement</QuickLink>
            <QuickLink to="/admin/evaluators">Manage Evaluator Accounts</QuickLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;