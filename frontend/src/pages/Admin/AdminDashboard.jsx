import React from 'react';
// --- THIS IS THE FIX ---
// All icons used on this page are now imported
import { FiClipboard, FiUsers, FiCheckCircle, FiUpload, FiUser } from 'react-icons/fi';
// -----------------------

// Import mock data (adjust path if necessary)
import { mockProblemStatements, mockSubmissions, mockSpocRequests, mockUsers } from '../../mockData';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
  </div>
);

const AdminDashboard = () => {
  const totalProblems = mockProblemStatements.length;
  const openProblems = mockProblemStatements.filter(p => p.status === 'Open').length;
  const totalSubmissions = mockSubmissions.length;
  const pendingApprovals = mockSpocRequests.filter(r => r.status === 'Pending').length;
  const totalEvaluators = mockUsers.filter(u => u.role === 'Evaluator').length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Problems" 
            value={totalProblems} 
            icon={FiClipboard} 
            color="border-indigo-600" 
        />
        <StatCard 
            title="Open Problems" 
            value={openProblems} 
            icon={FiCheckCircle} 
            color="border-green-600" 
        />
        <StatCard 
            title="Total Submissions" 
            value={totalSubmissions} 
            icon={FiUpload} 
            color="border-yellow-600" 
        />
        <StatCard 
            title="Pending SPOC Approvals" 
            value={pendingApprovals} 
            icon={FiUsers} 
            color="border-red-600" 
        />
        <StatCard 
            title="Active Evaluators" 
            value={totalEvaluators} 
            icon={FiUser}  /* This was causing the error */
            color="border-blue-600" 
        />
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <ul className="space-y-2">
            <li><a href="/admin/spoc-approvals" className="text-indigo-600 hover:text-indigo-800 font-medium">Review SPOC Requests</a></li>
            <li><a href="/admin/problems/create" className="text-indigo-600 hover:text-indigo-800 font-medium">Create New Problem Statement</a></li>
            <li><a href="/admin/evaluators" className="text-indigo-600 hover:text-indigo-800 font-medium">Manage Evaluator Accounts</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;