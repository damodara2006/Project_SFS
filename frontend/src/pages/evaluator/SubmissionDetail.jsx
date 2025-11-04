import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import samplePdf from "../../assets/sample.pdf";


const submissionDetailData = {
  TEAM001: {
    title: 'Eco-Friendly Product Recommendation System',
    abstract:
      'Our project is a web-based platform that helps consumers make environmentally conscious decisions by providing a comprehensive eco-rating for products. It analyzes various factors like material composition, recyclability, and manufacturing processes to generate a score, and suggests greener alternatives.',
    detailedDescription:
      'The system architecture is based on a microservices approach, with a React frontend, a Node.js backend, and a PostgreSQL database. We have developed a proprietary algorithm that calculates the eco-rating based on a weighted scoring model. The data is sourced from various public datasets and APIs. The UI is designed to be intuitive and user-friendly, with a focus on data visualization to make complex information easily understandable.',
    feasibilityStudy:
      'The project is highly feasible, as the required technologies are open-source and readily available. The main challenge lies in data aggregation and cleaning, which we have addressed by developing a robust data pipeline. The system is scalable and can be expanded to include more product categories and sustainability metrics in the future.',
    budget:
      'The project was developed with a minimal budget, primarily covering hosting and domain registration costs. The team consisted of four members who contributed their time and expertise voluntarily. The total estimated cost for the first year of operation is $500.',
    pdfLink: samplePdf,
  },
};

const PDFViewer = ({ url }) => {
  const file = url || samplePdf;

  return (
    <div className="w-full h-[70vh] overflow-auto bg-gray-100 rounded-lg ">
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
  const { teamId } = useParams();
  const navigate = useNavigate();
  const submission = submissionDetailData[teamId] || submissionDetailData.TEAM001;

  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log({
      teamId,
      marks,
      feedback,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] py-10 px-6 ml-52">
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
        <h1 className="text-4xl font-bold text-[#4a4a4a]">{submission.title}</h1>
        <p className="text-lg text-gray-600 mt-2">Team ID: {teamId}</p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Solution Abstract</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{submission.abstract}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Detailed Description</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{submission.detailedDescription}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Feasibility Study</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{submission.feasibilityStudy}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Budget</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{submission.budget}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#4a4a4a] mb-4 text-center">Submitted Report</h2>
          <PDFViewer url={submission.pdfLink} />
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
