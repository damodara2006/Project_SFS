import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable'; // Assuming you have a DataTable component
import Button from '../../components/common/Button';     // Assuming you have a Button component
import Breadcrumb from '../../components/common/Breadcrumb'; // Breadcrumb component
import { mockProblemStatements, getEvaluatorUsers, getSubmissionsByProblemId } from '../../mockData'; // Mock data imports
import { FiSearch, FiFilter, FiUsers, FiFileText } from 'react-icons/fi'; // Icon imports

const ProblemStatementsList = () => {
  const navigate = useNavigate(); // For navigation, if used
  const evaluators = getEvaluatorUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for low to high, 'desc' for high to low

  // Mock API call handlers
  const handleProblemClick = (problem) => {
    // Navigates to a detailed page for the problem statement
    console.log(`Navigating to problem details for: ${problem.title}`);
    navigate(`/admin/problems/${problem.id}/details`); // Example navigation
  };



  const getEvaluatorIdForProblem = (problem) => {
    // Logic to find and return the primary evaluator's ID
    if (problem.assignedEvaluators && problem.assignedEvaluators.length > 0) {
      return evaluators.find(e => e.id === problem.assignedEvaluators[0])?.id || 'N/A';
    }
    return 'E0001'; // Defaulting for consistency with the image
  };

  const getEvaluatedCount = (problemId) => {
    const submissions = getSubmissionsByProblemId(problemId);
    return submissions.filter(sub => sub.status === 'Evaluated').length;
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Formats to local date and time
  };

  // Filtered and sorted data based on search term and sort order
  const filteredData = mockProblemStatements
    .filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.created) - new Date(a.created);
      } else if (sortOrder === 'oldest') {
        return new Date(a.created) - new Date(b.created);
      } else {
        const countA = a.submissionsCount || 1;
        const countB = b.submissionsCount || 1;
        if (sortOrder === 'asc') {
          return countA - countB;
        } else {
          return countB - countA;
        }
      }
    });

  // Define columns for the DataTable
  const columns = [
    {
      header: 'PS ID',
      accessor: 'id',
      cell: (row) => <span className="text-gray-700 font-medium">{row.id}</span>
    },
    {
      header: 'Problem Statement',
      accessor: 'title',
      cell: (row) => (
        <span
          className="text-gray-800 hover:text-blue-600 cursor-pointer"
          onClick={() => handleProblemClick(row)}
        >
          {row.title}
        </span>
      )
    },
    {
      header: 'Evaluator ID',
      cell: (row) => <span className="text-gray-700">{getEvaluatorIdForProblem(row)}</span>
    },
    {
      header: 'No.Of.Submission',
      cell: (row) => <span className="text-gray-700">{row.submissionsCount || 1}</span> // Defaulting to 1
    },
    {
      header: 'Created Date and Time',
      cell: (row) => <span className="text-gray-700">{formatDateTime(row.created)}</span>
    },
    {
      header: 'Evaluated',
      cell: (row) => <span className="text-gray-700">{getEvaluatedCount(row.id)}</span>
    },
  ];

  return (
    <div className="min-h-screen bg-background-light py-12">
      <div className="max-w-7xl mx-auto bg-background-white shadow-card rounded-2xl p-12">
        <Breadcrumb />
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-text-primary">Problem Statements</h1>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate('/admin/problems/create')}
              className="bg-primary-accent hover:bg-primary-accent/90 text-background-white px-6 py-3 rounded-xl text-lg font-medium shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              Create New
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center space-x-12 mb-12">
          <div className="flex items-center space-x-3">
            <FiUsers className="w-6 h-6 text-primary-accent" />
            <span className="font-medium text-lg text-text-primary">No. of Teams Enrolled :</span>
            <input
              type="text"
              value="30"
              readOnly
              className="w-20 border border-border-color rounded-xl p-2 text-center text-lg bg-background-white text-text-primary"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FiFileText className="w-6 h-6 text-primary-accent" />
            <span className="font-medium text-lg text-text-primary">No. of Submissions :</span>
            <input
              type="text"
              value="15"
              readOnly
              className="w-20 border border-border-color rounded-xl p-2 text-center text-lg bg-background-white text-text-primary"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-center space-x-6 mb-12">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search With Id or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-border-color rounded-full py-3 pl-6 pr-12 focus:ring-2 focus:ring-primary-accent/20 text-lg bg-background-white text-text-primary placeholder-text-tertiary"
            />
            <button className="absolute right-4 top-3 text-text-tertiary hover:text-text-secondary">
              <FiSearch className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-lg font-medium text-text-primary">Filter:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-border-color rounded-xl py-2 px-4 focus:ring-2 focus:ring-primary-accent/20 text-lg bg-background-white text-text-primary"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-border-color rounded-xl overflow-hidden">
            <thead className="bg-primary-accent/10">
              <tr>
                <th className="p-6 font-semibold text-text-primary border border-border-color">PS ID</th>
                <th className="p-6 font-semibold text-text-primary border border-border-color">Problem Statement</th>
                <th className="p-6 font-semibold text-text-primary text-center border border-border-color">Category</th>
                <th className="p-6 font-semibold text-text-primary text-center border border-border-color">Evaluator ID</th>
                <th className="p-6 font-semibold text-text-primary text-center border border-border-color">No.Of.Submission</th>
                <th className="p-6 font-semibold text-text-primary text-center border border-border-color">Created</th>
                <th className="p-6 font-semibold text-text-primary text-center border border-border-color">Evaluated</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((problem, index) => (
                <tr key={problem.id} className="hover:bg-background-light/50 border border-border-color transition-colors duration-150">
                  <td className="p-6 border border-border-color text-text-primary">{problem.id}</td>
                  <td className="p-6 border border-border-color">
                    <span
                      className="text-action-blue hover:text-action-blue/80 cursor-pointer text-lg font-medium transition-colors duration-150"
                      onClick={() => handleProblemClick(problem)}
                    >
                      {problem.title}
                    </span>
                  </td>
                  <td className="p-6 text-center border border-border-color text-text-primary text-lg">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${problem.category === 'Software' ? 'bg-blue-100 text-blue-800' : problem.category === 'Data' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {problem.category}
                    </span>
                  </td>
                  <td className="p-6 text-center border border-border-color text-text-primary text-lg">{getEvaluatorIdForProblem(problem)}</td>
                  <td className="p-6 text-center border border-border-color text-text-primary text-lg">{problem.submissionsCount || 1}</td>
                  <td className="p-6 text-center border border-border-color text-text-secondary text-lg">{formatDateTime(problem.created)}</td>
                  <td className="p-6 text-center border border-border-color text-text-primary text-lg">
                    {getEvaluatedCount(problem.id) > 0 ? '✅' : '⏳'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatementsList;
