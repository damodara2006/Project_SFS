import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils";
import { FiArrowLeft, FiEye, FiFilter, FiChevronDown } from "react-icons/fi";

const mockSubmissions = [
  {
    TEAM_ID: 201,
    SPOC_ID: "SPOC_001",
    collegeName: "Tech Institute",
    SOL_TITLE: "Smart Grid AI Solution",
    SUB_DATE: "2024-03-22T10:30:00Z",
    STATUS: "Pending",
    SOL_LINK: "#"
  },
  {
    TEAM_ID: 202,
    SPOC_ID: "SPOC_002",
    collegeName: "Green Valley College",
    SOL_TITLE: "Green Energy Optimizer",
    SUB_DATE: "2024-03-23T14:15:00Z",
    STATUS: "Evaluated",
    SOL_LINK: "#"
  },
  {
    TEAM_ID: 205,
    SPOC_ID: "SPOC_003",
    collegeName: "Urban Univ",
    SOL_TITLE: "Urban Waste Management Bot",
    SUB_DATE: "2024-03-24T09:00:00Z",
    STATUS: "In Review",
    SOL_LINK: "#"
  }
];

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [assignedProblems, setAssignedProblems] = useState([]);
  const [isProblemDropdownOpen, setIsProblemDropdownOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const problemId = searchParams.get("problemId");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.problem-dropdown-container')) {
        setIsProblemDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 1. Fetch Assigned Problems for Dropdown
  useEffect(() => {
    const fetchAssignedProblems = async () => {
      try {
        const localProblems = JSON.parse(localStorage.getItem('temp_assigned_problems') || '[]');
        let fetchedProblems = [];

        const userRes = await axios.get(`${URL}/cookie`, { withCredentials: true });
        const userData = userRes.data;
        const userId = userData?.ID || userData?.id;

        if (userId) {
          try {
            const res = await axios.get(`${URL}/problems/evaluator/${userId}`);
            if (res.data.problems && Array.isArray(res.data.problems)) {
              fetchedProblems = res.data.problems;
            }
          } catch (apiErr) {
            console.warn("API fetch failed, relying on local/mock", apiErr);
          }
        }

        // Combine Local + API
        const combined = [...localProblems, ...fetchedProblems];
        // Deduplicate by ID
        const unique = combined.filter((v, i, a) => a.findIndex(t => (t.ID === v.ID)) === i);

        if (unique.length > 0) {
          setAssignedProblems(unique);
          // If no problemId in URL, default to first (optional UX improvement)
          if (!problemId) {
            navigate(`?problemId=${unique[0].ID}`, { replace: true });
          }
        } else {
          setAssignedProblems([]);
        }

      } catch (err) {
        // Fallback to mock data if fetch completely fails
        console.warn("Using mock problems for dropdown", err);
        setAssignedProblems([
          { ID: 101, TITLE: "AI-Driven Supply Chain Optimization" },
          { ID: 102, TITLE: "Sustainable Packaging Solutions" },
          { ID: 103, TITLE: "IoT Based Energy Monitoring" }
        ]);
      }
    };
    fetchAssignedProblems();
  }, [problemId, navigate]);

  // 2. Fetch Submissions when problemId changes
  useEffect(() => {
    const fetchSubmissions = async () => {
      // Small artificial delay for UX consistency
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const url = problemId
          ? `${URL}/submissions?problemId=${problemId}`
          : `${URL}/submissions`;

        const res = await axios.get(url, { withCredentials: true });

        if (res.data && Array.isArray(res.data)) {
          console.log("Fetched submissions:", res.data); // Debug log
          setSubmissions(res.data);
        } else {
          setSubmissions(mockSubmissions);
        }
      } catch (err) {
        console.warn("Failed to fetch submissions, using mock data", err);
        setSubmissions(mockSubmissions);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const filteredSubmissions = filterStatus === "All"
    ? submissions
    : submissions.filter(sub => (sub.STATUS || sub.status) === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Evaluated": return "bg-green-100 text-green-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const selectedProblem = assignedProblems.find(p => String(p.ID) === String(problemId));

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-6 py-8 transition-all duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <button
            onClick={() => navigate('/evaluator')}
            className="flex items-center text-gray-500 hover:text-[#FF9900] transition-colors mb-4 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Assigned Problems
          </button>

          <div className="flex flex-col gap-2 relative problem-dropdown-container w-full md:w-[600px]">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Viewing Submissions For</label>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick("In Review");
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              In Review
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                onClick("Evaluated");
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Evaluated
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [previewPdf, setPreviewPdf] = useState(null); // <-- preview state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStatusChange = (teamId, newStatus) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((sub) =>
        sub.teamId === teamId ? { ...sub, status: newStatus } : sub
      )
    );
  };

  // fetch submissions from backend
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`${URL}/submissions`)
      .then((res) => {
        if (!mounted) return;
        const rows = res.data || [];
        const mapped = rows.map((r) => ({
          problemId: r.PROBLEM_ID || r.problemId,
          teamId: r.TEAM_ID || r.teamId,
          title: r.SOL_TITLE || r.title || "Untitled",
          submittedAt: r.SUB_DATE || r.submittedAt || new Date().toISOString(),
          status: r.STATUS || r.status || "PENDING",
          pdfLink: r.SOL_LINK || r.pdfLink || samplePdf,
          liveLink: r.LIVE_LINK || r.liveLink || null,
        }));
        setSubmissions(mapped);
      })
      .catch((err) => {
        console.error("Failed to load submissions:", err);
        if (mounted) setError(err?.message || "Failed to load");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  // Filter logic
  const filteredSubmissions =
    filterStatus === "All"
      ? submissions
      : submissions.filter((sub) => sub.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#ffffff] py-10 px-6 mt-14">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-[#4a4a4a]">
          Submissions for Eco-Friendly Product Recommendation System
        </h1>
        <p className="text-lg text-gray-600 mt-2">Problem ID: SFS_15</p>
      </motion.div>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <label className="text-gray-700 font-medium">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer pr-2"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Evaluated">Evaluated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
          {/* Desktop / tablet table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8FC] text-[#4A5568]">
                <tr>
                  <th className="p-4 font-semibold">Spoc ID</th>
                  <th className="p-4 font-semibold">Clg name</th>
                  <th className="p-4 font-semibold">Team ID</th>
                  <th className="p-4 font-semibold">Solution Title</th>
                  <th className="p-4 text-center font-semibold">Submitted At</th>
                  <th className="p-4 text-center font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E2E8F0]">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub, index) => (
                    <tr key={index} className="hover:bg-[#F9FAFB] border-t border-[#E2E8F0] transition-all">
                      <td className="p-4 text-[#1A202C] font-medium">{sub.SPOC_ID || sub.spocId || "N/A"}</td>
                      <td className="p-4 text-[#1A202C] font-medium">{sub.collegeName || sub.COLLEGE || "N/A"}</td>
                      <td className="p-4 text-[#1A202C] font-medium">TID_{sub.TEAM_ID || sub.teamId || "N/A"}</td>
                      <td className="p-4 text-[#1A202C] font-medium">{sub.SOL_TITLE || sub.title || "Untitled Solution"}</td>
                      <td className="p-4 text-center text-[#718096] text-sm">{sub.SUB_DATE || sub.submittedAt ? new Date(sub.SUB_DATE || sub.submittedAt).toLocaleDateString() : "N/A"}</td>
                      <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.STATUS || sub.status)}`}>{sub.STATUS || sub.status || "Pending"}</span></td>
                      <td className="p-4 text-center font-medium">
                        <button onClick={() => navigate(`/evaluator/submission/${sub.ID || sub.id}`)} className="flex items-center justify-center gap-2 mx-auto bg-white border border-[#E2E8F0] hover:bg-gray-50 text-[#2D3748] px-3 py-1.5 rounded-lg text-sm transition-all shadow-sm">
                          <FiEye className="text-[#FF9900]" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">{problemId ? "No submissions found." : "Select a problem statement above to view submissions."}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden p-4 space-y-4">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub, i) => (
                <div key={i} className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#1A202C]">{sub.SOL_TITLE || sub.title || 'Untitled'}</div>
                      <div className="text-xs text-gray-500">{sub.collegeName || sub.COLLEGE || 'N/A'}</div>
                      <div className="text-xs text-gray-400 mt-1">Team: TID_{sub.TEAM_ID || sub.teamId || 'N/A'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{sub.SUB_DATE || sub.submittedAt ? new Date(sub.SUB_DATE || sub.submittedAt).toLocaleDateString() : 'N/A'}</div>
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.STATUS || sub.status)}`}>{sub.STATUS || sub.status || 'Pending'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => navigate(`/evaluator/submission/${sub.ID || sub.id}`)} className="flex-1 bg-white border border-[#E2E8F0] hover:bg-gray-50 text-[#2D3748] px-3 py-2 rounded-lg text-sm transition-all">
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">{problemId ? "No submissions found." : "Select a problem statement above to view submissions."}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionList;
