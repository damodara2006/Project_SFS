import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { getSubmissionById, mockSubmissions } from '../../mockData';
import { FiFile } from 'react-icons/fi';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = getSubmissionById(id);
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
                <td className="p-3 flex justify-between items-center">
                  <span>{displayStatus}</span>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
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
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Marks</td>
                <td className="p-3">
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                      placeholder="Marks"
                    />
                  ) : (
                    submission.marks ? `${submission.marks}/100` : 'Not evaluated'
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Comments</td>
                <td className="p-3">
                  {isEditing ? (
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows="2"
                      className="w-full border border-gray-300 rounded px-2 py-1"
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
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiFile className="w-5 h-5 mr-2" />
            Attached Files ({totalFiles})
          </h2>
          <div className="space-y-2">
            {submission.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="flex items-center">
                  <FiFile className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{file}</span>
                </div>
                <Button
                  onClick={() => alert(`Downloading ${file}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Download
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
