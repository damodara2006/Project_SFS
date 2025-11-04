import React, { useState } from "react";
import {
  FiEye,

  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiChevronLeft,
  FiClipboard,
} from "react-icons/fi";

const EvaluatorList = () => {
  const [evaluators, setEvaluators] = useState([
    {
      id: "EV1001",
      name: "John Doe",
      email: "john@example.com",
      dept: "CSE",
      status: "active",
      rank: 5,
      problemStatement: "AI-Powered assistants",
      experience: "5 years",
      completed: 25,
      pending: 5,
    },
    {
      id: "EV1002",
      name: "Jane Smith",
      email: "jane@example.com",
      dept: "ECE",
      status: "inactive",
      rank: 12,
      problemStatement: "IoT sensor networks",
      experience: "8 years",
      completed: 42,
      pending: 3,
    },
    {
      id: "EV1003",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      dept: "MECH",
      status: "active",
      rank: 8,
      problemStatement: "Robotics and Automation",
      experience: "6 years",
      completed: 33,
      pending: 7,
    },
    {
      id: "EV1004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      dept: "EEE",
      status: "active",
      rank: 15,
      problemStatement: "Power Grid Optimization",
      experience: "7 years",
      completed: 29,
      pending: 4,
    },
    {
      id: "EV1005",
      name: "Chris Lee",
      email: "chris.lee@example.com",
      dept: "CSE",
      status: "inactive",
      rank: 2,
      problemStatement: "Cybersecurity Protocols",
      experience: "10 years",
      completed: 50,
      pending: 1,
    },
    {
        id: "EV1006",
        name: "Patricia Wilson",
        email: "patricia.w@example.com",
        dept: "ECE",
        status: "active",
        rank: 20,
        problemStatement: "Wireless Communication",
        experience: "4 years",
        completed: 18,
        pending: 6,
    },
    {
        id: "EV1007",
        name: "Michael Brown",
        email: "michael.b@example.com",
        dept: "MECH",
        status: "active",
        rank: 9,
        problemStatement: "Fluid Dynamics Simulation",
        experience: "9 years",
        completed: 45,
        pending: 2,
    },
  ]);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(null);
  const [viewingRecords, setViewingRecords] = useState(false); // State for popup view
  const [toast, setToast] = useState(null);
  const [newEvaluator, setNewEvaluator] = useState({
    id: "",
    name: "",
    email: "",
    dept: "",
  });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateId = () => `EV${1000 + evaluators.length + 1}`;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newEvaluator.name || !newEvaluator.email || !newEvaluator.dept) {
      showToast("Please fill all fields", "error");
      return;
    }
    const id = generateId();
    // Add default records for new evaluators
    const newEval = {
      ...newEvaluator,
      id,
      status: "active",
      rank: "N/A",
      problemStatement: "Not Assigned",
      experience: "0 years",
      completed: 0,
      pending: 0,
    };
    setEvaluators([...evaluators, newEval]);
    setNewEvaluator({ id: "", name: "", email: "", dept: "" });
    setShowCreatePopup(false);
    showToast("Evaluator created successfully!", "success");
  };

  const handleDelete = (id) => {
    setEvaluators(evaluators.filter((ev) => ev.id !== id));
    showToast("Evaluator deleted successfully!", "success");
  };

  const handleToggleStatus = (id) => {
    setEvaluators(
      evaluators.map((ev) =>
        ev.id === id
          ? { ...ev, status: ev.status === "active" ? "inactive" : "active" }
          : ev
      )
    );
    showToast("Evaluator status updated!", "success");
  };

  const handleEditSave = (updatedEval) => {
    setEvaluators(
      evaluators.map((ev) => (ev.id === updatedEval.id ? updatedEval : ev))
    );
    setShowEditPopup(null);
    showToast("Evaluator updated successfully!", "success");
  };

  // Open the new details popup
  const handleViewDetails = (evaluator) => {
    setShowDetailsPopup(evaluator);
    setViewingRecords(false); // Always start with the main details view
  };

  const totalEvaluators = evaluators.length;
  const activeEvaluators = evaluators.filter(
    (e) => e.status === "active"
  ).length;
  const inactiveEvaluators = evaluators.filter(
    (e) => e.status === "inactive"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-6 py-8 transition-all duration-300">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A202C] mb-1">
            Evaluator Management
          </h1>
          <p className="text-[#718096] text-sm">
            View, manage, and create evaluator profiles.
          </p>
        </div>
        <button
          onClick={() => setShowCreatePopup(true)}
          className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#E68500] text-white px-4 py-2 rounded-xl text-sm transition-all"
        >
          <FiPlus /> Create New Evaluator
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="bg-[#FFF4E5] p-3 rounded-xl">
            <FiUsers className="text-[#FF9900] text-xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Total Evaluators</p>
            <p className="text-xl font-bold text-[#1A202C]">
              {totalEvaluators}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="bg-[#E6FFFA] p-3 rounded-xl">
            <FiUserCheck className="text-[#48BB78] text-xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Active Evaluators</p>
            <p className="text-xl font-bold text-[#1A202C]">
              {activeEvaluators}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="bg-[#FFE6E6] p-3 rounded-xl">
            <FiUserX className="text-red-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Inactive Evaluators</p>
            <p className="text-xl font-bold text-[#1A202C]">
              {inactiveEvaluators}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-2xl border border-[#E2E8F0] overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F7F8FC] text-[#718096]">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Evaluator ID</th>
              <th className="text-left py-3 px-4 font-medium">Name</th>
              <th className="text-left py-3 px-4 font-medium">Email</th>
              <th className="text-left py-3 px-4 font-medium">Department</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-center py-3 px-4 font-medium">Actions</th>
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
                  className="py-3 px-4 font-medium text-[#1A202C] cursor-pointer hover:text-[#FF9900] transition-colors"
                >
                  {ev.id}
                </td>
                <td
                  onClick={() => handleViewDetails(ev)}
                  className="py-3 px-4 cursor-pointer hover:text-[#FF9900] transition-colors"
                >
                  {ev.name}
                </td>
                <td className="py-3 px-4 text-[#718096]">{ev.email}</td>
                <td className="py-3 px-4 text-[#718096]">{ev.dept}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ev.status === "active"
                        ? "bg-[#E6FFFA] text-[#2F855A]"
                        : "bg-[#FFE6E6] text-red-600"
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-3">
                  <button
                    onClick={() => setShowEditPopup(ev)}
                    className="text-[#FF9900] hover:text-[#E68500] transition-all"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(ev.id)}
                    className={`transition-all ${
                      ev.status === "active"
                        ? "text-yellow-500 hover:text-yellow-700"
                        : "text-green-500 hover:text-green-700"
                    }`}
                  >
                    {ev.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="text-red-500 hover:text-red-700 transition-all"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- POPUPS --- */}

      {/* Create Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-[#1A202C] mb-4">
              Create New Evaluator
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              {/* Fields for name, email, dept */}
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Evaluator Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEvaluator.name}
                  onChange={(e) =>
                    setNewEvaluator({ ...newEvaluator, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newEvaluator.email}
                  onChange={(e) =>
                    setNewEvaluator({ ...newEvaluator, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-sm text-[#4A5568] font-medium mb-1 block">
                  Department
                </label>
                <select
                  value={newEvaluator.dept}
                  onChange={(e) =>
                    setNewEvaluator({ ...newEvaluator, dept: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="EEE">Electrical</option>
                  <option value="MECH">Mechanical</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreatePopup(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF9900] hover:bg-[#E68500] text-white text-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details & Records Popup */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg transition-all">
            {/* Conditional Header */}
            <div className="flex items-center mb-4">
              {viewingRecords && (
                <button
                  onClick={() => setViewingRecords(false)}
                  className="mr-3 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiChevronLeft />
                </button>
              )}
              <h2 className="text-lg font-semibold text-[#1A202C]">
                {viewingRecords ? "Evaluator Records" : "Evaluator Details"}
              </h2>
            </div>

            {/* Conditional Content */}
            {!viewingRecords ? (
              // Details View
              <div className="space-y-2 text-sm">
                <p>
                  <b className="font-medium text-[#4A5568] w-24 inline-block">
                    ID:
                  </b>{" "}
                  {showDetailsPopup.id}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-24 inline-block">
                    Name:
                  </b>{" "}
                  {showDetailsPopup.name}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-24 inline-block">
                    Email:
                  </b>{" "}
                  {showDetailsPopup.email}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-24 inline-block">
                    Department:
                  </b>{" "}
                  {showDetailsPopup.dept}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-24 inline-block">
                    Status:
                  </b>{" "}
                  {showDetailsPopup.status}
                </p>
              </div>
            ) : (
              // Records View
              <div className="space-y-2 text-sm">
                <p>
                  <b className="font-medium text-[#4A5568] w-32 inline-block">
                    Overall Rank:
                  </b>{" "}
                  {showDetailsPopup.rank}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-32 inline-block">
                    Experience:
                  </b>{" "}
                  {showDetailsPopup.experience}
                </p>
                <p>
                  <b className="font-medium text-[#4A5568] w-32 inline-block">
                    Problem Domain:
                  </b>{" "}
                  {showDetailsPopup.problemStatement}
                </p>
                <p>
                  <b className="font-medium text-green-600 w-32 inline-block">
                    Completed:
                  </b>{" "}
                  {showDetailsPopup.completed} problems
                </p>
                <p>
                  <b className="font-medium text-red-600 w-32 inline-block">
                    Pending:
                  </b>{" "}
                  {showDetailsPopup.pending} problems
                </p>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsPopup(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm"
              >
                Close
              </button>
              {!viewingRecords && (
                <button
                  onClick={() => setViewingRecords(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] hover:bg-[#E68500] text-white rounded-xl text-sm"
                >
                  <FiClipboard /> Show Records
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-[#1A202C] mb-4">
              Edit Evaluator
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSave(showEditPopup);
              }}
              className="space-y-4"
            >
              {/* Edit form fields */}
              <input
                type="text"
                value={showEditPopup.name}
                onChange={(e) =>
                  setShowEditPopup({ ...showEditPopup, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
              />
              <input
                type="email"
                value={showEditPopup.email}
                onChange={(e) =>
                  setShowEditPopup({ ...showEditPopup, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-xl text-sm"
              />
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

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditPopup(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF9900] hover:bg-[#E68500] text-white rounded-xl text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all animate-slideUp ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
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