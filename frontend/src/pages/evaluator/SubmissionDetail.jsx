import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// PDF.js worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const submissionDetailData = {
  TEAM001: {
    title: 'Eco-Friendly Product Recommendation System',
    abstract: 'Our project is a web-based platform that helps consumers make environmentally conscious decisions by providing a comprehensive eco-rating for products. It analyzes various factors like material composition, recyclability, and manufacturing processes to generate a score, and suggests greener alternatives.',
    detailedDescription: 'The system architecture is based on a microservices approach, with a React frontend, a Node.js backend, and a PostgreSQL database. We have developed a proprietary algorithm that calculates the eco-rating based on a weighted scoring model. The data is sourced from various public datasets and APIs. The UI is designed to be intuitive and user-friendly, with a focus on data visualization to make complex information easily understandable.',
    feasibilityStudy: 'The project is highly feasible, as the required technologies are open-source and readily available. The main challenge lies in data aggregation and cleaning, which we have addressed by developing a robust data pipeline. The system is scalable and can be expanded to include more product categories and sustainability metrics in the future.',
    budget: 'The project was developed with a minimal budget, primarily covering hosting and domain registration costs. The team consisted of four members who contributed their time and expertise voluntarily. The total estimated cost for the first year of operation is $500.',
    pdfLink: '/sample.pdf',
  },
  // Add more team data as needed
};

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full h-full overflow-auto bg-gray-200 rounded-lg">
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

const SubmissionDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const submission = submissionDetailData[teamId] || submissionDetailData.TEAM001; // Fallback to TEAM001 if teamId not found

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
        <h1 className="text-4xl font-bold text-[#4a4a4a]">{submission.title}</h1>
        <p className="text-lg text-gray-600 mt-2">Team ID: {teamId}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Solution Abstract</h2>
            <p className="text-gray-700 leading-relaxed">{submission.abstract}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Detailed Description</h2>
            <p className="text-gray-700 leading-relaxed">{submission.detailedDescription}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Feasibility Study</h2>
            <p className="text-gray-700 leading-relaxed">{submission.feasibilityStudy}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4a4a4a] mb-3">Budget</h2>
            <p className="text-gray-700 leading-relaxed">{submission.budget}</p>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-4"
        >
          <PDFViewer url={submission.pdfLink} />
        </motion.div>
      </div>
    </div>
  );
};

export default SubmissionDetail;