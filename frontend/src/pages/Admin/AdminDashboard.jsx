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
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#ffffff]">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Problems" 
          value={totalProblems} 
          icon={(props) => <FiClipboard {...props} className={`${props.className} text-[#fc8f00]`} />} 
          color="border-[#fc8f00]" 
        />
        <StatCard 
          title="Open Problems" 
          value={openProblems} 
          icon={(props) => <FiCheckCircle {...props} className={`${props.className} text-[#fc8f00]`} />} 
          color="border-[#fc8f00]" 
        />
        <StatCard 
          title="Total Submissions" 
          value={totalSubmissions} 
          icon={(props) => <FiUpload {...props} className={`${props.className} text-[#fc8f00]`} />} 
          color="border-[#fc8f00]" 
        />
        <StatCard 
          title="Pending SPOC Approvals" 
          value={pendingApprovals} 
          icon={(props) => <FiUsers {...props} className={`${props.className} text-[#fc8f00]`} />} 
          color="border-[#fc8f00]" 
        />
        <StatCard 
          title="Active Evaluators" 
          value={totalEvaluators} 
          icon={(props) => <FiUser {...props} className={`${props.className} text-[#fc8f00]`} />} 
          color="border-[#fc8f00]" 
        />
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#4a4a4a]">Quick Links</h2>
        <ul className="space-y-2">
          <li><a href="/admin/spoc-approvals" className="font-medium text-[#fc8f00]">Review SPOC Requests</a></li>
          <li><a href="/admin/problems/create" className="font-medium text-[#fc8f00]">Create New Problem Statement</a></li>
          <li><a href="/admin/evaluators" className="font-medium text-[#fc8f00]">Manage Evaluator Accounts</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;