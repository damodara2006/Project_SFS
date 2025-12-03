/**
 * @file ProblemStatementsList.jsx
 * @description A page for admins to view and manage all problem statements on the platform.
 */
// src/pages/admin/ProblemStatementsList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiUsers, FiFileText, FiPlus, FiUpload } from 'react-icons/fi';
import { mockProblemStatements, getEvaluatorUsers, mockSubmissions } from '../../mockData';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/button';

const ProblemStatementsList = () => {
  const navigate = useNavigate();
  const evaluators = getEvaluatorUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleProblemClick = (problem) => {
    navigate(`/admin/problems/${problem.id}/details`);
  };

  const getEvaluatorForProblem = (problem) => {
    const evaluatorId = (problem.assignedEvaluators && problem.assignedEvaluators.length > 0)
      ? problem.assignedEvaluators[0]
      : 'E0001'; // Default fallback
    return evaluators.find(e => e.id === evaluatorId) || null;
  };

  const getEvaluatedCount = (problemId) => {
    const subs = (submissions && submissions.length > 0)
      ? submissions.filter(s => String(s.problemId) === String(problemId))
      : mockSubmissions.filter(s => String(s.problemId) === String(problemId));

    return subs.filter(sub => String(sub.status).toLowerCase().includes('evaluat')).length;
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${base}/get_problems`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.log("Fetched Problems:", json);
        // backend returns { problems: [...] } where fields are uppercase (ID, TITLE,...)
        const mapped = (json.problems || []).map(p => ({
          id: p.ID ? String(p.ID) : (p.id || ''),
          title: p.TITLE || p.title || 'Untitled',
          description: p.DESCRIPTION || p.description || '',
          // backend doesn't have created timestamp; use SUB_DATE if present, else now
          created: p.SUB_DATE ? new Date(p.SUB_DATE).toISOString() : (p.created || new Date().toISOString()),
          // keep fields expected by the UI
          deadline: p.SUB_DATE || p.deadline,
          assignedEvaluators: p.assignedEvaluators || [],
          submissionsCount: p.submissionsCount || 0,
        }));
        setProblems(mapped);
      } catch (err) {
        setError(err.message || 'Failed to fetch');
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${base}/submissions`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // normalize submission fields to a consistent shape
        const mapped = (json || []).map(s => ({
          id: s.ID ? String(s.ID) : (s.id || ''),
          problemId: s.PROBLEM_ID ?? s.PROBLEMID ?? s.problemId ?? s.problem_id ?? null,
          teamId: s.TEAM_ID ?? s.TEAMID ?? s.teamId ?? s.team_id ?? null,
          status: String(s.STATUS ?? s.SUB_STATUS ?? s.Sub_status ?? s.sub_status ?? s.status ?? '').trim(),
          submittedDate: s.SUB_DATE ?? s.submittedDate ?? s.submitted_date ?? null,
        }));
        setSubmissions(mapped);
      } catch (err) {
        // keep fallback mock submissions if fetch fails
        setSubmissions([]);
      }
    };

    fetchSubmissions();
  }, []);

  const dataSource = problems && problems.length > 0 ? problems : mockProblemStatements;

  const totalSubmissions = (submissions && submissions.length > 0) ? submissions.length : mockSubmissions.length;
  const totalTeams = (submissions && submissions.length > 0)
    ? new Set(submissions.map(s => String(s.teamId))).size
    : new Set(mockSubmissions.map(s => s.teamId)).size;

  const filteredData = dataSource
    .filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.id.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (statusFilter === 'evaluated') {
        return getEvaluatedCount(problem.id) > 0;
      }
      if (statusFilter === 'pending') {
        return getEvaluatedCount(problem.id) === 0;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.created) - new Date(a.created);
      if (sortOrder === 'oldest') return new Date(a.created) - new Date(b.created);
      const countA = a.submissionsCount || 1;
      const countB = b.submissionsCount || 1;
      return sortOrder === 'asc' ? countA - countB : countB - countA;
    });

  return (
    <div className="min-h-screen bg-[#F7F8FC] py-10 px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-10 border border-[#E2E8F0]">
        <Breadcrumb />

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-[#1A202C] mb-1">
              Problem Statements
            </h1>
            <p className="text-[#718096] text-sm">
              Manage, filter, and review submitted problem statements.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/problems/create')}
            className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-white px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            <FiPlus className="text-lg" />
            Create Problem Statement
          </button>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-white shadow-sm border border-[#E2E8F0] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <FiFileText className="text-[#FF9900] text-2xl" />
              <div>
                <h2 className="text-[#4A5568] font-medium text-base">
                  Total Problem Statements
                </h2>
                <p className="text-2xl font-semibold text-[#1A202C]">{problems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-[#E2E8F0] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <FiUsers className="text-[#48BB78] text-2xl" />
              <div>
                <h2 className="text-[#4A5568] font-medium text-base">
                  Total Teams
                </h2>
                <p className="text-2xl font-semibold text-[#1A202C]">{totalTeams}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-[#E2E8F0] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <FiUpload className="text-[#3182CE] text-2xl" />
              <div>
                <h2 className="text-[#4A5568] font-medium text-base">
                  Total Submissions
                </h2>
                <p className="text-2xl font-semibold text-[#1A202C]">{totalSubmissions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by ID or Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2.5 text-base border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:outline-none transition-all placeholder-[#A0AEC0]"
            />
            <FiSearch className="absolute right-4 top-3 text-[#A0AEC0]" />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-[#4A5568] font-medium text-base">Filter:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-[#E2E8F0] rounded-xl text-base focus:ring-2 focus:ring-[#FF9900] focus:outline-none transition-all"
            >
              <option value="all">All</option>
              <option value="evaluated">Evaluated</option>
              <option value="pending">Not Evaluated</option>
            </select>

            <label className="text-[#4A5568] font-medium text-base">Sort:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-[#E2E8F0] rounded-xl text-base focus:ring-2 focus:ring-[#FF9900] focus:outline-none transition-all"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-2xl border border-[#E2E8F0]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F7F8FC] text-[#4A5568]">
              <tr>
                <th className="p-4 font-semibold">PS ID</th>
                <th className="p-4 font-semibold">Problem Statement</th>
                <th className="p-4 text-center font-semibold">Evaluator ID</th>
                <th className="p-4 text-center font-semibold">Evaluator Phone</th>
                <th className="p-4 text-center font-semibold">Submissions</th>
                <th className="p-4 text-center font-semibold">Created</th>
                <th className="p-4 text-center font-semibold">Evaluated</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((problem) => {
                const evaluator = getEvaluatorForProblem(problem);
                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-[#F9FAFB] border-t border-[#E2E8F0] transition-all"
                  >
                    <td className="p-4 text-[#1A202C] font-medium">{problem.id}</td>
                    <td className="p-4">
                      <span
                        className="text-[#2B6CB0] hover:underline cursor-pointer"
                        onClick={() => handleProblemClick(problem)}
                      >
                        {problem.title}
                      </span>
                    </td>
                    <td className="p-4 text-center text-[#1A202C]">
                      {evaluator ? evaluator.id : 'N/A'}
                    </td>
                    <td className="p-4 text-center text-[#1A202C]">
                      {evaluator ? evaluator.phone : 'N/A'}
                    </td>
                    <td className="p-4 text-center text-[#1A202C]">
                      {problem.submissionsCount || 1}
                    </td>
                    <td className="p-4 text-center text-[#718096]">
                      {formatDateTime(problem.created)}
                    </td>
                    <td className="p-4 text-center text-[#1A202C]">
                      {getEvaluatedCount(problem.id) > 0 ? '✅' : '⏳'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatementsList;
