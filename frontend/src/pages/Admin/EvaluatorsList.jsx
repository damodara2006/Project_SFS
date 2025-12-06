/**
 * @file EvaluatorsList.jsx
 * @description Displays a list of all evaluators on the platform for administrative review.
 */
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import axios from "axios"
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiClipboard,
  FiX,
} from "react-icons/fi";
import { URL } from "../../Utils";

const EvaluatorList = () => {
  const [evaluators, setEvaluators] = useState([
    {
      id: "EV1001",
      name: "John Doe",
      email: "john@example.com",
      dept: "CSE",
      college: "Sakthi Engineering College",
      collegeId: "SEC-001",
      dateJoined: "2023-08-15",
      status: "active",
      problemStatements: [
        { id: "PSAI01", title: "AI-Powered Assistants", submissionCount: 12 },
        { id: "PSML02", title: "Predictive Maintenance", submissionCount: 8 }
      ],
      completed: 25,
      pending: 5,
      password: "password123", // Added for existing evaluators
    }
  ]);

  // Mock Data for Available Problem Statements (In real app, fetch from API)
  const MOCK_AVAILABLE_PROBLEMS = [
    { id: "PSAI01", title: "AI-Powered Assistants", submissionCount: 12 },
    { id: "PSML02", title: "Predictive Maintenance", submissionCount: 8 },
    { id: "PSBC03", title: "Blockchain Voting", submissionCount: 5 },
    { id: "PSIOT04", title: "Smart Home IoT", submissionCount: 15 },
    { id: "PSVR05", title: "VR Education", submissionCount: 3 },
  ];

  const GetAllEvaluators = () => {
    axios.get(`${URL}/evaluators`)
      .then((res) => {
        setEvaluators(res.data)

      })
  }



  /* useEffect(() => {
    GetAllEvaluators()
  }, []) */

  console.log(evaluators);


  // State for popups
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(null);
  const [showProblemStatementPopup, setShowProblemStatementPopup] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProblemToAdd, setSelectedProblemToAdd] = useState(""); // State for assignment dropdown
  const [newEvaluator, setNewEvaluator] = useState({
    name: "",
    email: "",
    dept: "",
    password: "", // Added password to initial state
  });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateId = () => `EV${1000 + evaluators.length + 1}`;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newEvaluator.name || !newEvaluator.email || !newEvaluator.dept || !newEvaluator.password) {
      showToast("Please fill all fields", "error");
      return;
    }
    const id = generateId();
    const newEval = {
      ...newEvaluator,
      id,
      status: "active",
      problemStatements: [],
      collegeId: "N/A",
      dateJoined: new Date().toLocaleDateString(),
      completed: 0,
      pending: 0,
    };
    setEvaluators([...evaluators, newEval]);
    setNewEvaluator({ name: "", email: "", dept: "", password: "" }); // Reset password field
    setShowCreatePopup(false);
    showToast("Evaluator created successfully!", "success");
  };

  const handleDelete = (id) => {
    setEvaluators(evaluators.filter((ev) => ev.id !== id));
    showToast("Evaluator deleted successfully!", "success");
  };

  const handleEditSave = (updatedEval) => {
    setEvaluators(
      evaluators.map((ev) => (ev.id === updatedEval.id ? updatedEval : ev))
    );
    setShowEditPopup(null);
    showToast("Evaluator updated successfully!", "success");
  };

  const handleViewDetails = (evaluator) => {
    setShowDetailsPopup(evaluator);
  };

  // Assignment Handlers
  const handleAddProblem = () => {
    if (!selectedProblemToAdd) return;
    const problemToAdd = MOCK_AVAILABLE_PROBLEMS.find(p => p.id === selectedProblemToAdd);

    // Check if already assigned
    if (showEditPopup.problemStatements.some(ps => ps.id === problemToAdd.id)) {
      showToast("Problem already assigned", "error");
      return;
    }

    setShowEditPopup({
      ...showEditPopup,
      problemStatements: [...(showEditPopup.problemStatements || []), problemToAdd]
    });
    setSelectedProblemToAdd(""); // Reset dropdown
  };

  const handleRemoveProblem = (problemId) => {
    setShowEditPopup({
      ...showEditPopup,
      problemStatements: showEditPopup.problemStatements.filter(ps => ps.id !== problemId)
    });
  };

  // Stats Calculations using useMemo for efficiency
  const totalEvaluators = evaluators.length;
  const uniqueProblemStatements = useMemo(() => {
    const problemMap = new Map();
    evaluators.forEach((ev) => {
      if (ev.problemStatements && Array.isArray(ev.problemStatements)) {
        ev.problemStatements.forEach(ps => {
          problemMap.set(ps.id, {
            id: ps.id,
            title: ps.title,
          });
        });
      }
    });
    return Array.from(problemMap.values());
  }, [evaluators]);
  const totalProblemStatements = uniqueProblemStatements.length;

  // Reusable Popup Component
  const Popup = ({ children, visible, onClose }) => (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-6 py-8 transition-all duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C] mb-1">
            Evaluators
          </h1>
          <p className="text-[#718096] text-sm">
            Manage evaluator profiles and track problem statements.
          </p>
        </div>
        {/* <button
          onClick={() => setShowCreatePopup(true)}
          className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#E68500] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all mt-4 sm:mt-0"
        >
          <FiPlus /> Create New Evaluator
        </button> */}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-[#FFF4E5] p-4 rounded-xl">
            <FiUsers className="text-[#FF9900] text-2xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Total Evaluators</p>
            <p className="text-2xl font-bold text-[#1A202C]">
              {totalEvaluators}
            </p>
          </div>
        </div>
        <div
          onClick={() => setShowProblemStatementPopup(true)}
          className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
          <div className="bg-[#E6FFFA] p-4 rounded-xl">
            <FiClipboard className="text-[#38B2AC] text-2xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Total Problem Statements</p>
            <p className="text-2xl font-bold text-[#1A202C]">
              {totalProblemStatements}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-2xl border border-[#E2E8F0] overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F7F8FC] text-[#718096]">
            <tr>
              <th className="text-left py-3 px-5 font-semibold">Evaluator ID</th>
              <th className="text-left py-3 px-5 font-semibold">Name</th>
              <th className="text-left py-3 px-5 font-semibold">Email</th>
              <th className="text-left py-3 px-5 font-semibold">College</th>
              <th className="text-center py-3 px-5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluators.map((ev) => (
              <tr
                key={ev.id}
                className="hover:bg-gray-50 border-t border-[#E2E8F0] transition-all"
              >
                <td
                  onClick={() => handleViewDetails(ev)}
                  className="py-4 px-5 font-medium text-[#1A202C] cursor-pointer hover:text-[#FF9900] transition-colors"
                >
                  {ev.id}
                </td>
                <td
                  onClick={() => handleViewDetails(ev)}
                  className="py-4 px-5 cursor-pointer hover:text-[#FF9900] transition-colors"
                >
                  {ev.name}
                </td>
                <td className="py-4 px-5 text-[#718096]">{ev.email}</td>
                <td className="py-4 px-5 text-[#718096]">{ev.college || ev.dept}</td>
                <td className="py-4 px-5 text-center space-x-4">
                  <button
                    onClick={() => setShowEditPopup(ev)}
                    className="text-gray-500 hover:text-[#FF9900] transition-all"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="text-gray-500 hover:text-red-600 transition-all"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- POPUPS --- */}

      {/* Create Popup */}


      {/* Details Popup */}
      {showDetailsPopup && (
        <Popup visible={!!showDetailsPopup} onClose={() => setShowDetailsPopup(null)}>
          <h2 className="text-xl font-bold text-[#1A202C] mb-6 border-b pb-3">
            Evaluator Profile
          </h2>
          <div className="space-y-4 text-sm text-[#2D3748]">
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">Evaluator ID:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.id}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">Name:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">Email:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.email}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">College:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.college || 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">College ID:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.collegeId || 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">Joined Date:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.dateJoined || 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-[#718096] w-40">Problem Statements:</span>
              <span className="font-medium text-[#1A202C]">{showDetailsPopup.problemStatements?.length || 0}</span>
            </div>

            <div className="mt-4">
              <span className="font-semibold text-[#718096] block mb-2">Assigned Problem Statements:</span>
              <div className="flex flex-wrap gap-2">
                {showDetailsPopup.problemStatements && showDetailsPopup.problemStatements.length > 0 ? (
                  showDetailsPopup.problemStatements.map((ps) => (
                    <div key={ps.id} className="group relative">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold hover:bg-blue-100 transition-colors"
                      >
                        {ps.id}
                      </a>

                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl">
                        <p className="font-bold mb-1 border-b border-gray-700 pb-1">{ps.title}</p>
                        <p className="text-gray-300">Submissions: <span className="text-white font-bold">{ps.submissionCount}</span></p>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic">No problem statements assigned.</span>
                )}
              </div>
            </div>


          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowDetailsPopup(null)}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </Popup>
      )}

      {/* Edit Popup */}
      {showEditPopup && (
        <Popup visible={!!showEditPopup} onClose={() => setShowEditPopup(null)}>
          <h2 className="text-xl font-semibold text-[#1A202C] mb-5">
            Edit Evaluator
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSave(showEditPopup);
            }}
          >
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-3">
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Evaluator ID
                </label>
                <input
                  type="text"
                  value={showEditPopup.id}
                  disabled
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={showEditPopup.name}
                  onChange={(e) =>
                    setShowEditPopup({ ...showEditPopup, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={showEditPopup.email}
                  onChange={(e) =>
                    setShowEditPopup({ ...showEditPopup, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                />
              </div>

              {/* Assignment Management */}
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Assigned Problem Statements
                </label>
                <div className="flex flex-wrap gap-2 mb-2 p-2 border border-[#E2E8F0] rounded-xl min-h-[42px]">
                  {showEditPopup.problemStatements && showEditPopup.problemStatements.map((ps) => (
                    <span key={ps.id} className="flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-semibold">
                      {ps.id}
                      <button
                        type="button"
                        onClick={() => handleRemoveProblem(ps.id)}
                        className="ml-1 text-orange-500 hover:text-orange-900 focus:outline-none"
                      >
                        <FiXCircle size={14} />
                      </button>
                    </span>
                  ))}
                  {(!showEditPopup.problemStatements || showEditPopup.problemStatements.length === 0) && (
                    <span className="text-gray-400 text-xs italic p-1">No assignments</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedProblemToAdd}
                    onChange={(e) => setSelectedProblemToAdd(e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                  >
                    <option value="">Select Problem to Assign...</option>
                    {MOCK_AVAILABLE_PROBLEMS
                      .filter(p => !showEditPopup.problemStatements?.some(existing => existing.id === p.id))
                      .map(p => (
                        <option key={p.id} value={p.id}>
                          {p.id} - {p.title}
                        </option>
                      ))
                    }
                  </select>
                  <button
                    type="button"
                    onClick={handleAddProblem}
                    disabled={!selectedProblemToAdd}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${selectedProblemToAdd ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Assign
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  College
                </label>
                <input
                  type="text"
                  value={showEditPopup.college}
                  onChange={(e) =>
                    setShowEditPopup({ ...showEditPopup, college: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  College ID
                </label>
                <input
                  type="text"
                  value={showEditPopup.collegeId}
                  onChange={(e) =>
                    setShowEditPopup({
                      ...showEditPopup,
                      collegeId: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Date Joined
                </label>
                <input
                  type="text"
                  value={showEditPopup.dateJoined}
                  onChange={(e) =>
                    setShowEditPopup({
                      ...showEditPopup,
                      dateJoined: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Department
                </label>
                <select
                  value={showEditPopup.dept}
                  onChange={(e) =>
                    setShowEditPopup({ ...showEditPopup, dept: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  value={showEditPopup.password}
                  onChange={(e) =>
                    setShowEditPopup({ ...showEditPopup, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
                  placeholder="Leave blank to keep current password" // Hint for users
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => setShowEditPopup(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#FF9900] hover:bg-[#E68500] text-white rounded-xl text-sm font-semibold"
              >
                Update
              </button>
            </div>
          </form>
        </Popup>
      )}

      {/* Problem Statements Popup */}
      <Popup
        visible={showProblemStatementPopup}
        onClose={() => setShowProblemStatementPopup(false)}
      >
        <h2 className="text-xl font-semibold text-[#1A202C] mb-5">
          All Problem Statements
        </h2>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {uniqueProblemStatements.map((ps) => (
            <div
              key={ps.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700">{ps.title}</span>
              <a
                href={`/problem-statements/${ps.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                {ps.id}
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowProblemStatementPopup(false)}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </Popup>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 transform ${toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.type === "success" ? (
            <FiCheckCircle className="inline mr-2" />
          ) : (
            <FiXCircle className="inline mr-2" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EvaluatorList;
