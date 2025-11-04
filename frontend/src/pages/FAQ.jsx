import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Solve for Sakthi?",
      answer:
        "Solve for Sakthi is an innovative initiative connecting students with real-world manufacturing challenges. It empowers them to collaborate, innovate, and solve problems using technology and creativity.",
    },
    {
      question: "Who can participate?",
      answer:
        "Any student passionate about innovation and problem-solving can participate. Teams are encouraged to include members from diverse disciplines.",
    },
    {
      question: "How do I register?",
      answer:
        "Visit our official registration page and complete the form with required details. Once registered, you can access problem statements and join a team.",
    },
    {
      question: "What types of problems are available?",
      answer:
        "Challenges include supply chain optimization, manufacturing process improvements, and sustainable industry practices, provided directly by industry partners.",
    },
    {
      question: "How are submissions evaluated?",
      answer:
        "Expert evaluators assess submissions based on innovation, feasibility, impact, and technical excellence. Constructive feedback is shared with all teams.",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-orange-600 mb-8">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
          Here you’ll find answers to the most common questions about Solve for Sakthi. 
          If your question isn’t listed, please reach out to our support team.
        </p>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none  "
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-orange-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-700 leading-relaxed text-base border-t border-gray-100 bg-orange-50">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Still have questions? Our team will be happy to assist you.
          </p>
          <a
            href="mailto:support@solveforsakthi.com"
            className="inline-block bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
