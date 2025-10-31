import React from 'react';
import { FaTasks, FaUserCheck, FaRegLightbulb, FaUniversity } from 'react-icons/fa';
import DashboardMetricCard from '../../components/DashboardMetricCard.jsx';
import SubmissionsChart from '../../components/SubmissionsChart.jsx';
import RecentProblemsList from '../../components/RecentProblemsList.jsx';
import PendingApprovalsList from '../../components/PendingApprovalsList.jsx';
import { mockSpocRequests } from '../../mockData';

const AdminDashboard = () => {
  const pendingSpocs = mockSpocRequests.filter(s => s.status === 'Pending').length;

  return (
    // The main container now uses the light background color from our Tailwind config
    <div className="bg-background-light -m-6 p-6 min-h-screen">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's an overview of the platform's activity.</p>
        </div>
        
        {/* Top row of metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardMetricCard title="Total Problems" value="168" icon={FaRegLightbulb} trend="+5 this month" />
          <DashboardMetricCard title="Total Submissions" value="482" icon={FaTasks} trend="+22 this month" />
          <DashboardMetricCard title="Pending Approvals" value={pendingSpocs} icon={FaUserCheck} />
          <DashboardMetricCard title="Verified SPOCs" value="42" icon={FaUniversity} />
        </div>

        {/* Middle Content Area: Chart and Pending Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SubmissionsChart />
          </div>
          <div className="lg:col-span-1">
            <PendingApprovalsList />
          </div>
        </div>

        {/* Bottom Content Area: Recent Problem Statements List */}
        <div>
          <RecentProblemsList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;