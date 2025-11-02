/**
 * @file RecentProblemsTable.jsx
 * @description A table displaying problem statements with a live search filter.
 *              This version correctly displays all required data columns.
 */
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { mockProblemStatements } from '../../mockData'; // Ensure this path is correct

const RecentProblemsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProblems = mockProblemStatements.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-brand-dark">Problem Statements</h2>
        <div className="relative w-full sm:w-64 mt-3 sm:mt-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Evaluator ID</th>
              <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="py-3 pr-3 text-sm text-gray-500 font-mono">{problem.id}</td>
                <td className="py-3 pr-3 text-sm font-medium text-brand-dark">{problem.title}</td>
                <td className="py-3 pr-3 text-sm text-gray-600 font-mono">{problem.assignedEvaluators[0] || 'N/A'}</td>
                {/* 
                  --- THIS IS THE FIX ---
                  The missing table cell for submissions is now added.
                */}
                <td className="py-3 pr-3 text-sm font-semibold text-brand-orange text-left">{problem.submissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentProblemsTable;