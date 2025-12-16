/**
 * @file AdminDashboard.jsx
 * @description The main dashboard for administrators, showing platform-wide statistics and activities.
 */

import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClipboard, FiUsers, FiCheckSquare, FiUpload, FiArrowRight, FiFilePlus } from 'react-icons/fi';

import { URL } from '../../Utils';
import StatCard from '../../components/admin/StatCard';
import SubmissionsChart from '../../components/admin/SubmissionsChart';
import EvaluationChart from '../../components/admin/EvaluationChart';
import RecentProblemsTable from '../../components/admin/RecentProblemsTable';

const timeAgo = (dateParam) => {
  if (!dateParam) return '';
  const date = new Date(dateParam);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
};

const AdminDashboard = () => {

  const [data, setData] = useState({ problems: [], submissions: [], spocs: [], evaluators: [] });

  
  const fetchProblems = async()=>{
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${base}/get_problems`, {
        credentials:"include"
      });
       const result = await response.json();
       setData(prevData => ({ ...prevData, problems: result.problems }));
    }
    catch (error) {
      console.error('Error fetching problems:', error);
    }
  }

  const fetchSubmissions = async()=>{
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${base}/submissions`, {credentials:"include"});
      const result = await response.json();
      setData(prevData => ({ ...prevData, submissions: result }));
      
    }
    catch (error) {
      console.log("Error fetching Submissions:", error);
    }
  }

  const fetchUsers = async () => {
    try {
      const base = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${base}/get_all_users`, {credentials:"include"});
      const result = await response.json();
      // normalize backend response to an array
      const usersArray = Array.isArray(result) ? result : (result.users || result.data || []);
      const spocs = Array.isArray(usersArray) ? usersArray.filter(user => (user.ROLE || user.role || '').toString().toUpperCase() === 'SPOC') : [];
      const evaluators = Array.isArray(usersArray) ? usersArray.filter(user => (user.ROLE || user.role || '').toString().toUpperCase() === 'EVALUATOR') : [];
      setData(prevData => ({ ...prevData, spocs, evaluators }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchProblems();
    fetchSubmissions();
    fetchUsers();
  }, []);

  // Generate Recent Activities from Data
  useEffect(() => {
    const activities = [];

    // 1. Submissions
    if (Array.isArray(data.submissions)) {
      data.submissions.forEach(sub => {
        const dateStr = sub.SUB_DATE || sub.sub_date;
        if (dateStr) {
          activities.push({
            text: `New solution submitted for Problem ${sub.PROBLEM_ID || sub.problem_id}`,
            time: timeAgo(dateStr),
            icon: FiUpload,
            rawDate: new Date(dateStr)
          });
        }
      });
    }

    // 2. SPOCs
    if (Array.isArray(data.spocs)) {
      data.spocs.forEach(user => {
        const dateStr = user.DATE || user.date;
        if (dateStr) {
          activities.push({
            text: `SPOC ${user.NAME || user.name} joined the platform`,
            time: timeAgo(dateStr),
            icon: FiUsers,
            rawDate: new Date(dateStr)
          });
        }
      });
    }

    // 3. Evaluators
    if (Array.isArray(data.evaluators)) {
      data.evaluators.forEach(user => {
        const dateStr = user.DATE || user.date;
        if (dateStr) {
          activities.push({
            text: `Evaluator ${user.NAME || user.name} joined the platform`,
            time: timeAgo(dateStr),
            icon: FiCheckSquare,
            rawDate: new Date(dateStr)
          });
        }
      });
    }

    // Sort by date descending
    activities.sort((a, b) => b.rawDate - a.rawDate);

    // Limit to top 5
    setRecentActivities(activities.slice(0, 5));

  }, [data]);


  const totalProblems = Array.isArray(data.problems) ? data.problems.length : 0;
  const totalSubmissions = Array.isArray(data.submissions) ? data.submissions.length : 0;
  const pendingApprovals = Array.isArray(data.spocs) ? data.spocs.filter(r => (r.STATUS || r.status || '').toString().toUpperCase() === 'PENDING').length : 0;
  const totalEvaluators = Array.isArray(data.evaluators) ? data.evaluators.length : 0;
  const evaluatedCount = 168; // Placeholder as we don't have this in fetched data yet

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      {/* --- Main Content Area (Left and Center Columns) --- */}
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold text-brand-dark">Dashboard Overview</h1>

        {/* Top row: Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Total Problems" value={totalProblems} icon={FiClipboard} delay={0.1} />
          <StatCard title="Total Submissions" value={totalSubmissions} icon={FiUpload} delay={0.2} />
          <StatCard title="SPOC Pending" value={pendingApprovals} icon={FiCheckSquare} delay={0.3} to="/admin/spoc-approvals" />
          <StatCard title="Total Evaluators" value={totalEvaluators} icon={FiUsers} delay={0.4} to="/admin/evaluators" />
        </div>

        {/* Second row: Submissions Graph */}
        <SubmissionsChart submissions={data.submissions} />

        {/* Third row: Recent Problems Table */}
        <RecentProblemsTable problems={data.problems} />
      </div>

      {/* --- Sidebar Area (Right Column) --- */}
      <motion.div
        className="lg:col-span-1 space-y-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Quick Links Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link to="/admin/spoc-approvals" className="flex items-center justify-between text-orange-400 hover:text-orange-300"><span className="font-medium">Review SPOC Requests</span><FiArrowRight /></Link>
            <Link to="/admin/problem-statements/create" className="flex items-center justify-between text-orange-400 hover:text-orange-300"><span className="font-medium">Create New Problem Statement</span><FiArrowRight /></Link>
            <Link to="/admin/evaluators" className="flex items-center justify-between text-orange-400 hover:text-orange-300"><span className="font-medium">Manage Evaluators</span><FiArrowRight /></Link>
            <Link to="/admin/evaluators" className="flex items-center justify-between text-orange-400 hover:text-orange-300"><span className="font-medium">Create new Evaluators</span><FiArrowRight /></Link>
            <Link to="/admin/problem-statements" className="flex items-center justify-between text-orange-400 hover:text-orange-300"><span className="font-medium">View Problem statements</span><FiArrowRight /></Link>
          </div>
        </div>

        {/* Evaluation Status Card */}
        <EvaluationChart totalSubmissions={totalSubmissions} evaluatedCount={evaluatedCount} />

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Recent Activity</h2>
          {recentActivities.length > 0 ? (
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-full mr-4"><activity.icon className="w-5 h-5 text-gray-500" /></div>
                  <div>
                    <p className="text-sm text-brand-dark">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No recent activity found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
