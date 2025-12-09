import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import { URL } from "../Utils";

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
        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
};

const ProblemStatements = ({ showHeader = true }) => {
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    const params = new URLSearchParams({
      problemId: selected.id || selected.ID,
    });
    navigate(`/student/submit-solution?${params.toString()}`);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProblems();
        if (Array.isArray(data)) {
          setProblems(data);
        } else {
          setProblems([]);
          setError("Failed to load problems. Please try again later.");
        }
      } catch {
        setProblems([]);
        setError("Loading failed. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalProblems = problems.length;
  const uniqueDepartments = [...new Set(problems.map((p) => p.DEPT))].length;

  return (
    <motion.div
      className="min-h-screen bg-white/50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showHeader && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Page Header */}
        <header
          className={`mb-8 sm:mb-10 flex flex-col items-center text-center ${
            showHeader ? "pt-24" : "pt-8"
          }`}
        >
          <p className="text-xl font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
            Solve for Sakthi
          </p>
          <h1 className="text-4xl  font-extrabold text-gray-900">
            Problem Statements
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-600">
            Browse through the latest problem statements and pick the one that
            aligns with your skills and interests.
          </p>
        </header>

        {/* Stats + Table Container */}
        <div className="space-y-8">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Total Problems", value: totalProblems },
              { label: "Categories", value: 2 },
              { label: "Departments", value: uniqueDepartments },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between border border-gray-200 rounded-lg p-4 sm:p-5 bg-white shadow-[4px_4px_8px_#fc9300]/20 hover:shadow-[6px_6px_10px_#fc9300]/60 transition-transform transform hover:-translate-y-1 duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    {item.value}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-[#fc9300]" />
                </div>
              </div>
            ))}
          </section>

          {/* Error Banner */}
          {error && (
            <div className="rounded-md border border-[#fc9300] bg-white px-4 py-3 text-sm text-gray-700 flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          {/* Table Section */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-3">
              <div>
                <h2 className="text-3xl  font-bold text-gray-900 ">
                  Available Problems
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Click &quot;View&quot; to see full details and submit your
                  solution.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="p-8 flex flex-col items-center justify-center">
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
                <div className="mt-3 text-sm text-gray-700">
                  Loading problems...
                </div>
              </div>
            ) : problems.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-600">
                No problems available right now. Please check back later.
              </div>
            ) : (
              <motion.div
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <table className="min-w-full bg-white">
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
                        key={p.id || p.ID || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          <span className="font-semibold">SFS_{p.ID}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 line-clamp-2">
                              {p.TITLE}
                            </span>
                            {p.CATEGORY && (
                              <span className="mt-1 inline-flex items-center rounded-full border border-[#fc9300] px-2 py-0.5 text-[11px] font-medium text-gray-700">
                                {p.CATEGORY}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {p.DEPT}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {p.SUB_DEADLINE
                            ? p.SUB_DEADLINE.split("T")[0]
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => openModal(p)}
                            className="rounded px-3 py-1.5 text-xs sm:text-sm font-medium bg-[#fc8f00] text-white hover:bg-[#e57f00] transition-colors"
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
          </section>
        </div>
      </div>

      {/* <footer>
        <Footer />
      </footer> */}
    </motion.div>
  );
};

export default ProblemStatements;
