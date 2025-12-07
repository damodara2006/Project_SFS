import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { URL } from "../../Utils";
import samplePdf from "../../assets/sample.pdf";

const PDFViewer = ({ url }) => {
  const file = url || samplePdf;

  return (
    <div className="w-full h-[70vh] overflow-auto bg-gray-100 rounded-lg">
      <object data={file} type="application/pdf" width="100%" height="100%">
        <div className="p-6 text-center text-gray-500">
          This browser does not support embedded PDFs.{' '}
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fc8f00] underline"
          >
            Open or download the PDF
          </a>
          .
        </div>
      </object>
    </div>
  );
};

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`${URL}/submissions/${id}`);
        setSubmission(res.data);
      } catch (err) {
        console.error("Failed to fetch submission details", err);
        setError("Failed to load submission details.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id]);

  const handleSave = () => {
    // Determine the ID to send: "submission.ID" from DB or fallback "id" from params
    const submissionId = submission?.ID || id;

    console.log({
      submissionId,
      marks,
      feedback,
    });
    // TODO: Implement actual save API call here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading submission details...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!submission) return <div className="p-10 text-center text-gray-500">Submission not found.</div>;

  return (
    <div className="min-h-screen bg-[#ffffff] py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 relative"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 left-0 text-[#fc8f00] hover:text-[#e68100] transition-colors duration-300"
        >
          &larr; Back
        </button>
        <h1 className="text-4xl font-bold text-[#4a4a4a]">{submission.SOL_TITLE || "Untitled Solution"}</h1>
        <p className="text-lg text-gray-600 mt-2">
          Team ID: {submission.TEAM_ID}
          {submission.teamName && ` (${submission.teamName})`}
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Solution Description</h2>
            <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
              {submission.SOL_DESCRIPTION || "No description provided."}
            </p>
          </div>

          {/* 
             If you have separate columns for Abstract, Feasibility, Budget in DB,
             render them here. Currently using SOL_DESCRIPTION as a catch-all based on schema.
          */}

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#4a4a4a] mb-4 text-center">Submitted Report</h2>
          <PDFViewer url={submission.SOL_LINK} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 mt-10"
        >
          <h2 className="text-2xl font-semibold text-[#fc8f00] mb-6 text-center">Evaluator’s Section</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
            <label className="text-gray-700 font-medium mb-2 sm:mb-0">Marks (out of 100):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#fc8f00] focus:border-[#fc8f00]"
              placeholder="Enter marks"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:ring-[#fc8f00] focus:border-[#fc8f00]"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-[#fc8f00] text-white px-6 py-2 rounded-lg hover:bg-[#e68100] transition-colors duration-300"
          >
            Save Evaluation
          </button>

          {saved && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-medium mt-3 text-center"
            >
              ✅ Evaluation saved successfully!
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
