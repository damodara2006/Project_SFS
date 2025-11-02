import React from "react";

const AssignedProblem = () => {
  // Example data (this can later come from API or props)
  const problemData = {
    problemId: "PRB2025-07",
    title: "Eco-Friendly Product Recommendation System",
    description:
      "Develop a system that analyzes product data and rates them based on environmental impact factors such as material usage, recyclability, and carbon footprint. The system should also suggest sustainable alternatives with a better environmental score.",
    referralLinks: [
      "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
      "https://www.epa.gov/smm/sustainable-management-materials",
    ],
    evaluationCriteria: [
      "Innovation and creativity in solution approach (25%)",
      "Accuracy and reliability of product rating algorithm (25%)",
      "UI/UX design and user-friendliness (20%)",
      "Code quality and documentation (15%)",
      "Presentation and clarity of explanation (15%)",
    ],
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-[#fc8f00] mb-8 text-center">
        Assigned Problem Statement
      </h1>

      <div className="w-full md:w-3/4 lg:w-2/3 bg-[#f9f9f9] shadow-lg border border-gray-200 rounded-2xl p-8">
        {/* Problem Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-[#4a4a4a] mb-2 md:mb-0">
            {problemData.title}
          </h2>
          <span className="bg-[#fc8f00] text-white text-sm font-semibold px-4 py-2 rounded-lg">
            Problem ID: {problemData.problemId}
          </span>
        </div>

        {/* Problem Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#4a4a4a] mb-2">
            Problem Description:
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {problemData.description}
          </p>
        </div>

        {/* Referral Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#4a4a4a] mb-2">
            Referral Links:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-[#4a4a4a]">
            {problemData.referralLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fc8f00] hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Evaluation Criteria */}
        <div>
          <h3 className="text-lg font-semibold text-[#4a4a4a] mb-2">
            Evaluation Criteria:
          </h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-700">
            {problemData.evaluationCriteria.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignedProblem;
