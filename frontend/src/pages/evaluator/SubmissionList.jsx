import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const submissionsData = [
  {
    problemId: "PRB2025-07",
    teamId: "TEAM001",
    title: "Eco-Friendly Product Recommendation System",
    submittedAt: "2025-11-10T14:48:00.000Z",
    status: "In Review",
    pdfLink: "/sample.pdf",
    liveLink: "https://example.com/live-demo-1",
  },
  {
    problemId: "PRB2025-07",
    teamId: "TEAM002",
    title: "Sustainable Shopping Assistant",
    submittedAt: "2025-11-10T18:30:00.000Z",
    status: "In Review",
    pdfLink: "/sample.pdf",
    liveLink: "https://example.com/live-demo-2",
  },
  {
    problemId: "PRB2025-07",
    teamId: "TEAM003",
    title: "GreenChoice Product Analyzer",
    submittedAt: "2025-11-11T09:15:00.000Z",
    status: "Evaluated",
    pdfLink: "/sample.pdf",
    liveLink: "https://example.com/live-demo-3",
  },
  {
    problemId: "PRB2025-07",
    teamId: "TEAM004",
    title: "EcoCart: A Path to Greener Purchases",
    submittedAt: "2025-11-11T11:45:00.000Z",
    status: "In Review",
    pdfLink: "/sample.pdf",
    liveLink: "https://example.com/live-demo-4",
  },
];

const StatusPill = ({ status, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusClasses = () => {
    switch (status) {
      case "Evaluated":
        return "bg-green-100 text-green-800";
      case "In Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${getStatusClasses()} hover:shadow-md`}
      >
        {status}
      </button>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200"
        >
          <ul className="py-1">
            <li
              onClick={(e) => {
                e.stopPropagation();
                onClick("In Review");
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              In Review
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                onClick("Evaluated");
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Evaluated
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState(submissionsData);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (teamId, newStatus) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((sub) =>
        sub.teamId === teamId ? { ...sub, status: newStatus } : sub
      )
    );
  };

  // Filter logic
  const filteredSubmissions =
    filterStatus === "All"
      ? submissions
      : submissions.filter((sub) => sub.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#ffffff] py-10 px-6 mt-14">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-[#4a4a4a]">
          Submissions for Eco-Friendly Product Recommendation System
        </h1>
        <p className="text-lg text-gray-600 mt-2">Problem ID: PRB2025-07</p>
      </motion.div>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <label className="text-gray-700 font-medium">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#fc8f00] focus:border-[#fc8f00] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="In Review">In Review</option>
            <option value="Evaluated">Evaluated</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-6xl mx-auto bg-white shadow-2xl border border-gray-200 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission, index) => (
                <Link
                  to={`/evaluator/submission/${submission.teamId}`}
                  key={submission.teamId}
                  className="contents"
                >
                  <motion.tr
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.teamId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {submission.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill
                        status={submission.status}
                        onClick={(newStatus) =>
                          handleStatusChange(submission.teamId, newStatus)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-[#fc8f00] hover:text-[#e68100] transition-colors duration-300">
                        View
                      </button>
                    </td>
                  </motion.tr>
                </Link>
              ))}

              {filteredSubmissions.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No submissions found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmissionList;
