import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getSubmissionById, mockSubmissions } from '../../mockData';
import { FiFile, FiDownload, FiEdit, FiSave, FiArrowLeft } from 'react-icons/fi';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = getSubmissionById(id);
  const problemId = submission.problemId;
  // const [searchTerm, setSearchTerm] = useState('');
  const [marks, setMarks] = useState(submission.marks || '');
  const [comments, setComments] = useState(submission.comments || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!submission) {
    return <div className="min-h-screen bg-gray-50 py-10"><div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8"><h1>Submission not found</h1></div></div>;
  }



  const totalFiles = submission.files.length;
  const displayStatus = submission.marks ? 'Evaluated' : 'Submitted';

  return (
    <div className="min-h-screen bg-[#F7F8FC] py-10 px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-10 border border-[#E2E8F0]">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb />
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#FF9900] hover:bg-[#e68900] text-white px-4 py-2 rounded-xl flex items-center space-x-2 font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Button>
        </div>
        {/* Submission Information Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#1A202C]">Submission Information</h2>
          <table className="w-full text-left border-collapse border border-[#E2E8F0] rounded-xl overflow-hidden">
            <tbody>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 w-1/3 text-[#1A202C]">Submission ID</td>
                <td className="p-4 text-[#1A202C]">{submission.id}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Submission Title</td>
                <td className="p-4 text-[#1A202C]">{submission.title}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Description</td>
                <td className="p-4 text-[#1A202C]">{submission.description}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Team Name</td>
                <td className="p-4 text-[#1A202C]">{submission.teamName}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">SPOC ID</td>
                <td className="p-4 text-[#1A202C]">{submission.spocId}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Submitted Date</td>
                <td className="p-4 text-[#1A202C]">{new Date(submission.submittedDate).toLocaleDateString()}</td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Approval Status</td>
                <td className="p-4 flex justify-between items-center text-[#1A202C]">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${displayStatus === 'Evaluated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {displayStatus}
                  </span>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#FF9900] hover:bg-[#e68900] text-white px-3 py-1 rounded-xl text-sm flex items-center space-x-1 shadow-md transition-all"
                      >
                        <FiEdit className="w-4 h-4" />
                        <span>Edit</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          const submissionIndex = mockSubmissions.findIndex(s => s.id === id);
                          if (submissionIndex !== -1) {
                            mockSubmissions[submissionIndex].marks = marks ? parseInt(marks) : null;
                            mockSubmissions[submissionIndex].comments = comments;
                            mockSubmissions[submissionIndex].status = 'Evaluated';
                            setIsEditing(false);
                            alert('Changes saved successfully!');
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl text-sm flex items-center space-x-1 shadow-md transition-all"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>Save</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#E2E8F0]">
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Marks</td>
                <td className="p-4 text-[#1A202C]">
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      className="w-20 border border-[#E2E8F0] rounded-xl px-2 py-1 text-center bg-white text-[#1A202C]"
                      placeholder="Marks"
                    />
                  ) : (
                    submission.marks ? `${submission.marks}/100` : 'Not evaluated'
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium bg-[#FF9900]/5 text-[#1A202C]">Comments</td>
                <td className="p-4 text-[#1A202C]">
                  {isEditing ? (
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows="2"
                      className="w-full border border-[#E2E8F0] rounded-xl px-2 py-1 bg-white text-[#1A202C]"
                      placeholder="Comments"
                    />
                  ) : (
                    submission.comments || 'No comments'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Attached Files Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-[#1A202C]">
            <FiFile className="w-5 h-5 mr-2 text-[#FF9900]" />
            Attached Files ({totalFiles})
          </h2>
          <div className="space-y-2">
            {submission.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-[#F7F8FC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex items-center">
                  <FiFile className="w-5 h-5 mr-3 text-[#FF9900]" />
                  <span className="text-[#1A202C] font-medium">{file}</span>
                </div>
                <Button
                  onClick={() => alert(`Downloading ${file}`)}
                  className="bg-[#FF9900] hover:bg-[#e68900] text-white px-4 py-2 rounded-xl text-sm flex items-center space-x-1 shadow-md transition-all"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
