import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { getProblemStatementById, getSubmissionsByProblemId } from '../../mockData';
import { FiSearch } from 'react-icons/fi';

const ProblemStatementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = getProblemStatementById(id);
  const submissions = getSubmissionsByProblemId(id);
  const [searchTerm, setSearchTerm] = useState('');

  if (!problem) {
    return <div className="min-h-screen bg-gray-50 py-10"><div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8"><h1>Problem Statement not found</h1></div></div>;
  }

  const filteredSubmissions = submissions.filter(sub =>
    sub.spocId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const teamsEnrolled = new Set(submissions.map(s => s.teamId)).size;
  const totalSubmissions = submissions.length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        {/* Problem Statement Information Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Problem Statement Information</h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50 w-1/3">Problem Statement ID</td>
                <td className="p-3">{problem.id}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Problem Statement Title</td>
                <td className="p-3">{problem.title}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Description</td>
                <td className="p-3">{problem.description}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Department</td>
                <td className="p-3">{problem.department}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Category</td>
                <td className="p-3">{problem.category}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">YouTube Link</td>
                <td className="p-3">{problem.youtube || 'N/A'}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Dataset Link</td>
                <td className="p-3">{problem.dataset || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Statistics Section */}
        <div className="flex items-center space-x-10 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium">No. of Teams Enrolled :</span>
            <input
              type="text"
              value={teamsEnrolled}
              readOnly
              className="w-16 border border-gray-300 rounded p-1 text-center"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">No. of Submissions :</span>
            <input
              type="text"
              value={totalSubmissions}
              readOnly
              className="w-16 border border-gray-300 rounded p-1 text-center"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search With SPOC ID or Team Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:ring-1 focus:ring-gray-400"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Submission List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-3 font-semibold text-gray-700">SPOC ID</th>
                <th className="p-3 font-semibold text-gray-700">Submission</th>
                <th className="p-3 font-semibold text-gray-700">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="p-3">{sub.spocId}</td>
                  <td className="p-3">
                    <span
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => navigate(`/admin/submissions/${sub.id}/details`)}
                    >
                      {sub.title}
                    </span>
                  </td>
                  <td className="p-3">{sub.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatementDetail;
