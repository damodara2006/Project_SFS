import React from "react";

const AssignedProblem = () => {
  const problemData = {
    problemId: "SFS_15",
    title: "Eco-Friendly Product Recommendation System",
    domain: "Sustainability | Machine Learning | Web Development",
    assignedDate: "November 2, 2025",
    deadline: "December 31, 2025",
    description: `
      The objective of this problem is to design and develop a web-based system 
      that evaluates the environmental friendliness of various consumer products. 
      The system should analyze parameters such as material composition, packaging, 
      recyclability, energy consumption during manufacturing, and brand sustainability score.
      
      The platform must assign an “Eco Rating” (out of 100) for each product 
      based on weighted environmental factors. Additionally, the system should recommend 
      greener alternatives with better sustainability metrics.
      
      The solution should leverage data analysis or machine learning to process 
      datasets containing product details and environmental impact indicators. 
      The user interface should be clean, informative, and should allow consumers 
      to easily understand the ecological impact of their choices.
      
      The project is expected to encourage sustainable consumption practices 
      and assist consumers in making more responsible purchasing decisions.
    `,
    referralLinks: [
      "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
      
    ],
    evaluationCriteria: [
      "Innovation and creativity in the proposed solution (20%)",
      "Accuracy and reliability of the eco-rating algorithm (25%)",
      "UI/UX design clarity and ease of navigation (20%)",
      "Code quality, optimization, and maintainability (20%)",
      "Report, documentation, and presentation quality (15%)",
    ],
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center py-10 px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-[#4a4a4a] mb-10 text-center">
        Problem Details
      </h1>

      {/* Container */}
      <div className="w-full md:w-4/5 lg:w-2/3 bg-[#f9f9f9] shadow-xl border border-gray-200 rounded-2xl p-8 space-y-8">

        {/* Problem Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#4a4a4a]">
              {problemData.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{problemData.domain}</p>
          </div>
          <div className="bg-[#fc8f00] text-white text-sm font-semibold px-4 py-2 rounded-lg mt-3 md:mt-0">
            <b>Problem ID: {problemData.problemId}</b>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Assigned Date</span>
            <span className="text-[#4a4a4a] font-medium">{problemData.assignedDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Deadline</span>
            <span className="text-[#fc8f00] font-semibold">{problemData.deadline}</span>
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <h3 className="text-xl font-semibold text-[#4a4a4a] mb-3">
            Problem Description
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-gray-700 leading-relaxed shadow-sm hover:shadow-md transition text-justify">
            {problemData.description.split("\n").map((line, index) => (
              <p key={index} className="mb-3 text-justify">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Referral Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#4a4a4a] mb-3">
            Referral Links
          </h3>
          <ul className="list-disc pl-5 space-y-2">
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
          <h3 className="text-xl font-semibold text-[#4a4a4a] mb-3">
            Evaluation Criteria
          </h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-700">
            {problemData.evaluationCriteria.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end mt-8">
          <button className="bg-[#fc8f00] hover:bg-[#e68100] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
            Mark as Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignedProblem;
