import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Solve for Sakthi?",
      answer: "Solve for Sakthi is an innovative platform that connects students with real-world manufacturing challenges. It empowers teams to collaborate, innovate, and solve industry problems using technology and creativity."
    },
    {
      question: "Who can participate?",
      answer: "Any student interested in problem-solving, innovation, and manufacturing can participate. Teams are formed from various disciplines to bring diverse perspectives to the challenges."
    },
    {
      question: "How do I register?",
      answer: "You can register by visiting our registration page and filling out the required details. Once registered, you'll be able to join teams and access problem statements."
    },
    {
      question: "What types of problems are available?",
      answer: "Problems range from supply chain optimization, manufacturing process improvements, to sustainable practices in industry. All problems are real-world challenges provided by industry partners."
    },
    {
      question: "How are submissions evaluated?",
      answer: "Submissions are evaluated by expert evaluators who provide feedback based on innovation, feasibility, impact, and technical excellence. Teams receive detailed reviews to refine their solutions."
    },
    {
      question: "Is there any cost to participate?",
      answer: "Participation is free. The platform is designed to provide educational and experiential opportunities for students without any financial barriers."
    },
    {
      question: "Can I work on multiple problems?",
      answer: "Teams typically focus on one problem statement, but individuals can be part of multiple teams if they have the capacity. However, we encourage deep engagement with a single challenge."
    },
    {
      question: "What support is available for teams?",
      answer: "Teams have access to mentors, industry experts, and resources. Regular check-ins, workshops, and feedback sessions are provided throughout the process."
    },
    {
      question: "How long does the program last?",
      answer: "The duration varies by problem statement, but typically ranges from a few weeks to several months, allowing teams sufficient time to develop and refine their solutions."
    },
    {
      question: "What happens after submission?",
      answer: "After evaluation, top solutions may be presented to industry partners. Winners could receive recognition, internships, or opportunities to implement their ideas."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-orange-100 to-orange text-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto mt-15" >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-600 mb-12">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-center text-gray-600 mb-16 leading-relaxed">
          Find answers to common questions about Solve for Sakthi. If you don't see your question here, feel free to contact us.
        </p>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-8 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-orange-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:support@solveforsakthi.com"
            className="inline-block bg-linear-to-br from-orange-500 to-orange-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
