// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // 👈 Added motion for animation
// import axios from "axios";

// /* Hardcoded problem data (used as fallback) */
// const sampleProblems = [
//     {
//         id: "P-001",
//         title: "Smart Waste Management System Using IoT and AI",
//         date: "2025-09-01",
//         description:
//             "Develop an IoT-based system integrated with AI algorithms to monitor, classify, and optimize waste collection in urban and rural areas. The system should help local authorities plan efficient routes and reduce environmental pollution.",
//         category: "Smart City / IoT / AI",
//         theme: "Smart Automation for Sustainable Cities",
//         resources: "https://www.sih.gov.in/problem-statements",
//     },
//     {
//         id: "P-002",
//         title: "Predictive Healthcare System for Early Disease Detection",
//         date: "2025-09-05",
//         description:
//             "Design a healthcare analytics platform that leverages machine learning to predict potential health issues based on patient records, wearable data, and environmental factors. The system should provide early warnings and connect users to nearby medical facilities.",
//         category: "Healthcare / Machine Learning",
//         theme: "AI-Powered Health Solutions",
//         resources: "https://www.sih.gov.in/problem-statements",
//     },
//     {
//         id: "P-003",
//         title: "Blockchain-Based Student Credential Verification System",
//         date: "2025-09-10",
//         description:
//             "Create a blockchain-driven platform for educational institutions to issue, verify, and share student certificates securely. The system should prevent fraud and ensure transparency during recruitment or higher education admission processes.",
//         category: "Blockchain / Education",
//         theme: "Digital Transformation in Education",
//         resources: "https://www.sih.gov.in/problem-statements",
//     },
// ];

// const fetchProblems = async () => {
//     // Let errors propagate so caller can show loading/error UI
//     const response = await axios.get("http://localhost:8000/get_problems", {
//         timeout: 8000,
//     });
//     // assume response.data.problems (backend)
//     return response.data.problems;
// };

// const Modal = ({ open, onClose, title, children }) => {
//     if (!open) return null;
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//             <motion.div
//                 className="w-full max-w-xl rounded shadow-lg bg-[#ffffff]"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
//                     <h3 className="text-lg text-[#4a4a4a] font-bold">{title}</h3>
//                     <button
//                         onClick={onClose}
//                         className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100 text-[#4a4a4a]"
//                         aria-label="Close"
//                     >
//                         ✕
//                     </button>
//                 </div>
//                 <div className="p-4">{children}</div>
//             </motion.div>
//         </div>
//     );
// };

// const ProblemStatements = () => {
//     const [problems, setProblems] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     const navigate = useNavigate();

//     const openModal = (problem) => {
//         setSelected(problem);
//         setIsOpen(true);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//         setSelected(null);
//     };

//     const handleSubmit = () => {
//         if (!selected) return;
//         const params = new URLSearchParams({ problemId: selected.id || selected.ID });
//         navigate(`/student/submit-solution?${params.toString()}`);
//     };

//     // ✨ Animation Variants (matching dashboard style)
//     const pageVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     };

//     const tableVariants = {
//         hidden: { opacity: 0, x: -50 },
//         visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
//     };

//     const loadProblems = async () => {
//         setLoading(true);
//         setError(false);
//         try {
//             const data = await fetchProblems();
//             if (Array.isArray(data) && data.length > 0) {
//                 setProblems(data);
//             } else {
//                 // fallback to sampleProblems if backend returns empty
//                 setProblems(sampleProblems);
//             }
//         } catch (err) {
//             console.error("Error fetching problems:", err);
//             setError(true);
//             // use fallback sample data so UI is still functional
//             setProblems(sampleProblems);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadProblems();
//     }, []);

//     return (
//         <motion.div
//             className="p-4 min-h-screen"
//             variants={pageVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             <h2 className="text-3xl  mb-4 text-[#4a4a4a] mt-30 font-bold text-center">Problem Statements</h2>

//             <div className="w-full flex justify-center">
//                 <div className="bg-[#4a4a4a] my-12 p-4 rounded text-center text-white font-bold text-2xl w-60 h-50 justify-center flex flex-col items-center ">
//                     <h1>Total Problem Statements</h1>
//                     <br />
//                     <h1 className="text-3xl"> {problems.length}</h1>
//                 </div>
//             </div>

//             {/* Error banner */}
//             {error && (
//                 <div className="mb-4 flex items-center justify-between rounded border mt-10 border-red-200 bg-red-50 p-3 text-sm text-red-700">
//                     <div>Unable to reach backend. Showing cached/sample problems.</div>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={loadProblems}
//                             className="rounded px-3 py-1 text-sm font-medium bg-[#0f62fe] text-white hover:bg-[#0053d8]"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Loading state */}
//             {loading ? (
//                 <div className="rounded border bg-white shadow-sm p-8 text-center">
//                     <svg
//                         className="mx-auto h-8 w-8 animate-spin text-[#0f62fe]"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                         />
//                         <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                         />
//                     </svg>
//                     <div className="mt-3 text-sm text-[#4a4a4a]">Loading problems...</div>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="overflow-x-auto rounded border bg-white shadow-sm"
//                     variants={tableVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <table className="min-w-full divide-y ">
//                         <thead className="bg-[#4a4a4a] text-[#ffffff]">
//                             <tr>
//                                 <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
//                                 <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
//                                 <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
//                                 <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y bg-white">
//                             {problems.map((p, index) => {
//                                 // support both backend shape (uppercase) and fallback (lowercase)
//                                 const id = p.ID || p.id;
//                                 const title = p.TITLE || p.title;
//                                 const date = p.SUB_DATE || p.date;
//                                 return (
//                                     <motion.tr
//                                         key={id || index}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: index * 0.05 }}
//                                     >
//                                         <td className="px-4 py-3 text-sm text-[#4a4a4a]">{id}</td>
//                                         <td className="px-4 py-3 text-sm text-[#4a4a4a]">{title}</td>
//                                         <td className="px-4 py-3 text-sm text-[#4a4a4a]">{date}</td>
//                                         <td className="px-4 py-3 text-right">
//                                             <button
//                                                 onClick={() => openModal(p)}
//                                                 className="rounded px-3 py-1 text-sm font-medium bg-[#fc8f00] text-[#ffffff] hover:bg-[#e57f00]"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </motion.tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </motion.div>
//             )}

//             <Modal open={isOpen} onClose={closeModal} title={selected ? (selected.TITLE || selected.title) : "Problem"}>
//                 {selected ? (
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <div className="mb-3 text-sm text-[#4a4a4a]">
//                             <strong>ID:</strong> {selected.ID || selected.id}
//                         </div>
//                         <div className="mb-3 text-sm text-[#4a4a4a]">
//                             <strong>Date:</strong> {selected.SUB_DATE || selected.date}
//                         </div>
//                         <div className="mt-4 text-sm text-[#4a4a4a]">
//                             <strong>Description:</strong> {selected.DESCRIPTION || selected.description}
//                         </div>
//                         <div className="mt-4 text-sm text-[#4a4a4a]">
//                             <strong>Category:</strong> {selected.CATEGORY || selected.category}
//                         </div>
//                         <div className="mt-4 text-sm text-[#4a4a4a]">
//                             <strong>Department:</strong> {selected.DEPT || selected.dept || "-"}
//                         </div>
//                         <div className="mt-4 text-sm text-[#4a4a4a]">
//                             <strong>Resources:</strong>{" "}
//                             <a
//                                 className="hover:underline text-blue-600"
//                                 href={selected.Links || selected.resources}
//                                 target="_blank"
//                                 rel="noreferrer"
//                             >
//                                 {selected.Links || selected.resources}
//                             </a>
//                         </div>
//                         <div className="mt-6 flex justify-end gap-3">
//                             <button
//                                 onClick={handleSubmit}
//                                 className="rounded px-3 py-1 text-sm font-medium bg-[#0f62fe] text-white hover:bg-[#0053d8]"
//                             >
//                                 Submit
//                             </button>
//                             <button
//                                 onClick={closeModal}
//                                 className="rounded px-3 py-1 text-sm font-medium bg-[#4a4a4a] text-[#ffffff] hover:bg-[#333333]"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </motion.div>
//                 ) : (
//                     <div className="text-sm text-[#4a4a4a]">No problem selected.</div>
//                 )}
//             </Modal>
//         </motion.div>
//     );
// };

// export default ProblemStatements;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const sampleProblems = [
  {
    id: "P-001",
    title: "Smart Waste Management System Using IoT and AI",
    date: "2025-09-01",
    description:
      "Develop an IoT-based system integrated with AI algorithms to monitor, classify, and optimize waste collection in urban and rural areas.",
    category: "Smart City / IoT / AI",
    theme: "Smart Automation for Sustainable Cities",
    resources: "https://www.sih.gov.in/problem-statements",
  },
  {
    id: "P-002",
    title: "Predictive Healthcare System for Early Disease Detection",
    date: "2025-09-05",
    description:
      "Design a healthcare analytics platform that leverages ML to predict potential health issues from wearable and patient data.",
    category: "Healthcare / Machine Learning",
    theme: "AI-Powered Health Solutions",
    resources: "https://www.sih.gov.in/problem-statements",
  },
  {
    id: "P-003",
    title: "Blockchain-Based Student Credential Verification System",
    date: "2025-09-10",
    description:
      "Create a blockchain-driven platform for educational institutions to issue and verify student certificates securely.",
    category: "Blockchain / Education",
    theme: "Digital Transformation in Education",
    resources: "https://www.sih.gov.in/problem-statements",
  },
];

const fetchProblems = async () => {
  const response = await axios.get("http://localhost:8000/get_problems", { timeout: 8000 });
  return response.data.problems;
};

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div
        className="w-full max-w-xl rounded-lg shadow-lg bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100 text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  );
};

const ProblemStatements = () => {
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const openModal = (problem) => {
    setSelected(problem);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  const handleSubmit = () => {
    if (!selected) return;
    const params = new URLSearchParams({ problemId: selected.id || selected.ID });
    navigate(`/student/submit-solution?${params.toString()}`);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProblems();
        setProblems(Array.isArray(data) && data.length > 0 ? data : sampleProblems);
      } catch {
        setError(true);
        setProblems(sampleProblems);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white/50 p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mt-8">
            Problem Statements
          </h1>
        </header>

        {/* Cards Section (like TeamDetails) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {[
            { label: "Total Problems", value: problems.length },
            { label: "Latest Date", value: problems[problems.length - 1]?.date || "N/A" },
            { label: "Themes", value: [...new Set(problems.map((p) => p.theme))].length },
            { label: "Categories", value: [...new Set(problems.map((p) => p.category))].length },
            { label: "Status", value: error ? "Offline Mode" : "Online" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-center border border-gray-200 rounded-lg p-4 bg-white shadow-[4px_4px_8px_#fc9300]/20 hover:shadow-[6px_6px_10px_#fc9300]/60 transition-transform transform hover:-translate-y-1 duration-300"
            >
              <span className="text-sm font-medium text-gray-500 uppercase">{item.label}</span>
              <span className="mt-2 text-lg font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </section>

        {/* Table Section (TeamDetails style) */}
        {loading ? (
          <div className="rounded border bg-white shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-8 w-8 animate-spin text-[#fc9300]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <div className="mt-3 text-sm text-gray-700">Loading problems...</div>
          </div>
        ) : (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {problems.map((p, index) => (
                  <motion.tr
                    key={p.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{p.ID}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.TITLE}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.CATEGORY}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.DATE}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openModal(p)}
                        className="rounded px-3 py-1 text-sm font-medium bg-[#fc8f00] text-white hover:bg-[#e57f00]"
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Modal */}
        <Modal
          open={isOpen}
          onClose={closeModal}
          title={selected ? selected.TITLE : "Problem Details"}
        >
          {selected ? (
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>ID:</strong> {selected.ID}
              </div>
              <div>
                <strong>Date:</strong> {selected.DATE}
              </div>
              <div>
                <strong>Category:</strong> {selected.CATEGORY}
              </div>
              <div>
                <strong>Theme:</strong> {selected.THEME}
              </div>
              <div>
                <strong>Description:</strong> {selected.DESCRIPTION}
              </div>
              <div>
                <strong>Resources:</strong>{" "}
                <a
                  href={selected.RESOURCES}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {selected.RESOURCES}
                </a>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  className="rounded px-3 py-1 text-sm font-medium bg-[#0f62fe] text-white hover:bg-[#0053d8]"
                >
                  Submit
                </button>
                <button
                  onClick={closeModal}
                  className="rounded px-3 py-1 text-sm font-medium bg-gray-700 text-white hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
      </div>
    </motion.div>
  );
};

export default ProblemStatements;
