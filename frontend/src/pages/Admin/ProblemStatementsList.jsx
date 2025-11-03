import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable'; // Assuming you have a DataTable component
import Button from '../../components/common/Button';     // Assuming you have a Button component
import { mockProblemStatements, getEvaluatorUsers } from '../../mockData'; // Mock data imports
import { FiSearch, FiFilter } from 'react-icons/fi'; // Icon imports

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

  // Filtered and sorted data based on search term and sort order
  const filteredData = mockProblemStatements
    .filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      const countA = a.submissionsCount || 1;
      const countB = b.submissionsCount || 1;
      if (sortOrder === 'asc') {
        return countA - countB;
      } else {
        return countB - countA;
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Problem Statements</h1>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate('/admin/problems/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Create New
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center space-x-10 mb-8">
          <div className="flex items-center space-x-2">
            <span className="font-medium">No Of Teams Enrolled :</span>
            <input
              type="text"
              value="30"
              readOnly
              className="w-16 border border-gray-300 rounded p-1 text-center"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">No Of Submission :</span>
            <input
              type="text"
              value="15"
              readOnly
              className="w-16 border border-gray-300 rounded p-1 text-center"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search With Id or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:ring-1 focus:ring-gray-400"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Filter:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded py-1 px-2 focus:ring-1 focus:ring-gray-400"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-4 font-semibold text-gray-700">PS ID</th>
                <th className="p-4 font-semibold text-gray-700">Problem Statement</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Evaluator ID</th>
                <th className="p-4 font-semibold text-gray-700 text-center">No.Of.Submission</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((problem, index) => (
                <tr key={problem.id} className="hover:bg-gray-50">
                  <td className="p-4">{problem.id}</td>
                  <td className="p-4">
                    <span
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => handleProblemClick(problem)}
                    >
                      {problem.title}
                    </span>
                  </td>
                  <td className="p-4 text-center">{getEvaluatorIdForProblem(problem)}</td>
                  <td className="p-4 text-center">{problem.submissionsCount || 1}</td>
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