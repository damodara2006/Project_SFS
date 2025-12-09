import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { URL } from "../Utils"


const fetchProblems = async () => {
  const response = await axios.get(`${URL}/get_problems`, { timeout: 8000 });
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

const ProblemStatements = ({ showHeader = true }) => {
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
        setProblems(Array.isArray(data) && data.length > 0 ? data : "Failed to load problems.");
      } catch {
        setError(true);
        setProblems("Loading failed. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  console.log(problems);
  



  return (
    <motion.div
      className="min-h-screen bg-white/50 "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showHeader && <Header />}
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className={`text-center text-3xl font-extrabold text-gray-900 ${showHeader ? 'mt-20' : 'mt-0'}`}>
            Problem Statements
          </h1>
        </header>

        {/* Cards Section (like TeamDetails) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-10 ">
          {[
            { label: "Total Problems", value: problems.length },
            // { label: "Latest Date", value: problems[problems.length - 1]?.date || "N/A" },
            { label: "Categories", value: 2 },
            { label: "Departments", value: [...new Set(problems.map((p) => p.DEPT))].length },
            // { label: "Status", value: error ? "Offline Mode" : "Online" },
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
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Deadline
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
                    <td className="px-6 py-4 text-sm text-gray-700">SFS_{p.ID}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.TITLE}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.DEPT}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.SUB_DEADLINE ? p.SUB_DEADLINE.split("T")[0] : 'N/A'}</td>
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
                <strong>Date:</strong> {selected.SUB_DEADLINE ? selected.SUB_DEADLINE.split("T")[0] : 'N/A'}
              </div>
              <div>
                <strong>Category:</strong> {selected.CATEGORY}
              </div>
              <div>
                <strong>Theme:</strong> {selected.DEPT}
              </div>
              <div>
                <strong>Description:</strong> {selected.DESCRIPTION}
              </div>
              <div>
                <strong>Resources:</strong>{" "}
                <a
                  href={selected.Reference}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {selected.Reference}
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
      {/* <footer>
         <Footer />
       </footer> */}

    </motion.div>
  );
};

export default ProblemStatements;
