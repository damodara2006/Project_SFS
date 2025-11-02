import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { getSubmissionById, mockSubmissions } from '../../mockData';
import { FiSearch } from 'react-icons/fi';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = getSubmissionById(id);
  const [searchTerm, setSearchTerm] = useState('');
  const [marks, setMarks] = useState(submission.marks || '');
  const [comments, setComments] = useState(submission.comments || '');

  if (!submission) {
    return <div className="min-h-screen bg-gray-50 py-10"><div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8"><h1>Submission not found</h1></div></div>;
  }

  const filteredFiles = submission.files.filter(file =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFiles = submission.files.length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        {/* Submission Information Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Submission Information</h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50 w-1/3">Submission ID</td>
                <td className="p-3">{submission.id}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Submission Title</td>
                <td className="p-3">{submission.title}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Description</td>
                <td className="p-3">{submission.description}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Team Name</td>
                <td className="p-3">{submission.teamName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">SPOC ID</td>
                <td className="p-3">{submission.spocId}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Submitted Date</td>
                <td className="p-3">{new Date(submission.submittedDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Approval Status</td>
                <td className="p-3">{submission.status}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Marks</td>
                <td className="p-3">{submission.marks ? `${submission.marks}/100` : 'Not evaluated'}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Comments</td>
                <td className="p-3">{submission.comments || 'No comments'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Statistics Section */}
        <div className="flex items-center space-x-10 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium">No. of Files Submitted :</span>
            <input
              type="text"
              value={totalFiles}
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
              placeholder="Search With File Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:ring-1 focus:ring-gray-400"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Files List Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-3 font-semibold text-gray-700">File Name</th>
                <th className="p-3 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3">{file}</td>
                  <td className="p-3">
                    <Button
                      onClick={() => alert(`Downloading ${file}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Evaluation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Evaluation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marks (out of 100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-400"
                placeholder="Enter marks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-400"
                placeholder="Enter evaluation comments"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                // Update the submission in mockData
                const submissionIndex = mockSubmissions.findIndex(s => s.id === id);
                if (submissionIndex !== -1) {
                  mockSubmissions[submissionIndex].marks = marks ? parseInt(marks) : null;
                  mockSubmissions[submissionIndex].comments = comments;
                  mockSubmissions[submissionIndex].status = 'Evaluated';
                  alert('Evaluation saved successfully!');
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Save Evaluation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
