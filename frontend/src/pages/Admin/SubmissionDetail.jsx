import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getSubmissionById, mockSubmissions } from '../../mockData';
import { FiFile, FiDownload, FiEdit, FiSave } from 'react-icons/fi';

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
    <div className="min-h-screen bg-background-light py-10">
      <div className="max-w-4xl mx-auto bg-background-white shadow-card rounded-2xl p-8">
        <Breadcrumb />
        {/* Submission Information Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Submission Information</h2>
          <table className="w-full text-left border-collapse border border-border-color rounded-xl overflow-hidden">
            <tbody>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 w-1/3 text-text-primary">Submission ID</td>
                <td className="p-4 text-text-primary">{submission.id}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Submission Title</td>
                <td className="p-4 text-text-primary">{submission.title}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Description</td>
                <td className="p-4 text-text-primary">{submission.description}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Team Name</td>
                <td className="p-4 text-text-primary">{submission.teamName}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">SPOC ID</td>
                <td className="p-4 text-text-primary">{submission.spocId}</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Submitted Date</td>
                <td className="p-4 text-text-primary">{new Date(submission.submittedDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Approval Status</td>
                <td className="p-4 flex justify-between items-center text-text-primary">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${displayStatus === 'Evaluated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {displayStatus}
                  </span>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary-accent hover:bg-primary-accent/90 text-background-white px-3 py-1 rounded-xl text-sm flex items-center space-x-1 shadow-card hover:shadow-card-hover transition-all duration-200"
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
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl text-sm flex items-center space-x-1 shadow-card hover:shadow-card-hover transition-all duration-200"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>Save</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Marks</td>
                <td className="p-4 text-text-primary">
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      className="w-20 border border-border-color rounded-xl px-2 py-1 text-center bg-background-white text-text-primary"
                      placeholder="Marks"
                    />
                  ) : (
                    submission.marks ? `${submission.marks}/100` : 'Not evaluated'
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium bg-primary-accent/5 text-text-primary">Comments</td>
                <td className="p-4 text-text-primary">
                  {isEditing ? (
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows="2"
                      className="w-full border border-border-color rounded-xl px-2 py-1 bg-background-white text-text-primary"
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
          <h2 className="text-xl font-semibold mb-4 flex items-center text-text-primary">
            <FiFile className="w-5 h-5 mr-2 text-primary-accent" />
            Attached Files ({totalFiles})
          </h2>
          <div className="space-y-2">
            {submission.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-background-light p-4 rounded-xl border border-border-color">
                <div className="flex items-center">
                  <FiFile className="w-5 h-5 mr-3 text-primary-accent" />
                  <span className="text-text-primary font-medium">{file}</span>
                </div>
                <Button
                  onClick={() => alert(`Downloading ${file}`)}
                  className="bg-primary-accent hover:bg-primary-accent/90 text-background-white px-4 py-2 rounded-xl text-sm flex items-center space-x-1 shadow-card hover:shadow-card-hover transition-all duration-200"
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
