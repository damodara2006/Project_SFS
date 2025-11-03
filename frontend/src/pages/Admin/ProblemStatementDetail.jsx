import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getProblemStatementById, getSubmissionsByProblemId } from '../../mockData';
import { FiSearch, FiFilter, FiUsers, FiFileText } from 'react-icons/fi';

const ProblemStatementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = getProblemStatementById(id);
  const submissions = getSubmissionsByProblemId(id);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    evaluated: false,
    submitted: false,
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  if (!problem) {
    return <div className="min-h-screen bg-gray-50 py-10"><div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8"><h1>Problem Statement not found</h1></div></div>;
  }

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.spocId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = (!filterOptions.evaluated && !filterOptions.submitted) ||
      (filterOptions.evaluated && sub.status === 'Evaluated') ||
      (filterOptions.submitted && sub.status === 'Submitted');
    return matchesSearch && matchesFilter;
  });

  const teamsEnrolled = new Set(submissions.map(s => s.teamId)).size;
  const totalSubmissions = submissions.length;

  return (
    <div className="min-h-screen bg-background-light py-10">
      <div className="max-w-4xl mx-auto bg-background-white shadow-card rounded-2xl p-8">
        <Breadcrumb />
        {/* Problem Statement Information Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Problem Statement Information</h2>
          <table className="w-full text-left border-collapse border border-border-color rounded-xl overflow-hidden">
            <tbody>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 w-1/3 text-text-primary">Problem Statement ID</td>
                <td className="p-4 text-text-primary">{problem.id}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Problem Statement Title</td>
                <td className="p-4 text-text-primary">{problem.title}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Description</td>
                <td className="p-4 text-text-primary">{problem.description}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Department</td>
                <td className="p-4 text-text-primary">{problem.department}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Category</td>
                <td className="p-4 text-text-primary">{problem.category}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">YouTube Link</td>
                <td className="p-4 text-text-primary">{problem.youtube || 'N/A'}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Dataset Link</td>
                <td className="p-4 text-text-primary">{problem.dataset || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Statistics Section */}
        <div className="flex items-center space-x-10 mb-6">
          <div className="flex items-center space-x-2">
            <FiUsers className="w-6 h-6 text-primary-accent" />
            <span className="font-medium text-text-primary">No. of Teams Enrolled :</span>
            <input
              type="text"
              value={teamsEnrolled}
              readOnly
              className="w-16 border border-border-color rounded-xl p-2 text-center bg-background-white text-text-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFileText className="w-6 h-6 text-primary-accent" />
            <span className="font-medium text-text-primary">No. of Submissions :</span>
            <input
              type="text"
              value={totalSubmissions}
              readOnly
              className="w-16 border border-border-color rounded-xl p-2 text-center bg-background-white text-text-primary"
            />
          </div>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search With SPOC ID or Team Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-border-color rounded-full py-3 pl-6 pr-12 focus:ring-2 focus:ring-primary-accent/20 text-lg bg-background-white text-text-primary placeholder-text-tertiary"
            />
            <button className="absolute right-4 top-3 text-text-tertiary hover:text-text-secondary">
              <FiSearch className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="bg-primary-accent hover:bg-primary-accent/90 text-background-white px-4 py-2 rounded-xl flex items-center space-x-2 font-medium shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <FiFilter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-background-white border border-border-color rounded-xl shadow-card z-10">
                <div className="p-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filterOptions.evaluated}
                      onChange={(e) => setFilterOptions({ ...filterOptions, evaluated: e.target.checked })}
                      className="w-4 h-4 text-primary-accent border-border-color rounded focus:ring-primary-accent/20"
                    />
                    <span className="text-text-primary">Evaluated</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-3">
                    <input
                      type="checkbox"
                      checked={filterOptions.submitted}
                      onChange={(e) => setFilterOptions({ ...filterOptions, submitted: e.target.checked })}
                      className="w-4 h-4 text-primary-accent border-border-color rounded focus:ring-primary-accent/20"
                    />
                    <span className="text-text-primary">Submitted</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submission List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-border-color rounded-xl overflow-hidden">
            <thead className="bg-primary-accent/10">
              <tr>
                <th className="p-4 font-semibold text-text-primary border border-border-color">SPOC ID</th>
                <th className="p-4 font-semibold text-text-primary border border-border-color">Submission</th>
                <th className="p-4 font-semibold text-text-primary border border-border-color">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-background-light/50 border border-border-color transition-colors duration-150">
                  <td className="p-4 text-text-primary border border-border-color">{sub.spocId}</td>
                  <td className="p-4 border border-border-color">
                    <span
                      className="text-action-blue hover:text-action-blue/80 cursor-pointer font-medium transition-colors duration-150"
                      onClick={() => navigate(`/admin/submissions/${sub.id}/details`)}
                    >
                      {sub.title}
                    </span>
                  </td>
                  <td className="p-4 text-text-primary border border-border-color">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'Evaluated' ? 'bg-green-100 text-green-800' : sub.status === 'Submitted' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                      {sub.status}
                    </span>
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

export default ProblemStatementDetail;
