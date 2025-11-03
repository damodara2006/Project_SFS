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
} from "react-icons/fi";

const EvaluatorList = () => {
  const [evaluators, setEvaluators] = useState([
    {
      id: "EV1001",
      name: "John Doe",
      email: "john@example.com",
      dept: "CSE",
      status: "active",
    },
    {
      id: "EV1002",
      name: "Jane Smith",
      email: "jane@example.com",
      dept: "ECE",
      status: "inactive",
    },
  ]);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(null);
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

  // Generate new Evaluator ID automatically
  const generateId = () => `EV${1000 + evaluators.length + 1}`;

  // Handle new evaluator creation
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newEvaluator.name || !newEvaluator.email || !newEvaluator.dept) {
      showToast("Please fill all fields", "error");
      return;
    }
    const id = generateId();
    const newEval = { ...newEvaluator, id, status: "active" };
    setEvaluators([...evaluators, newEval]);
    setNewEvaluator({ id: "", name: "", email: "", dept: "" });
    setShowCreatePopup(false);
    showToast("Evaluator created successfully!", "success");
  };

  // Handle delete
  const handleDelete = (id) => {
    setEvaluators(evaluators.filter((ev) => ev.id !== id));
    showToast("Evaluator deleted successfully!", "success");
  };

  // Toggle active/inactive
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

  // Handle edit save
  const handleEditSave = (updatedEval) => {
    setEvaluators(
      evaluators.map((ev) => (ev.id === updatedEval.id ? updatedEval : ev))
    );
    setShowEditPopup(null);
    showToast("Evaluator updated successfully!", "success");
  };

  // --- Stats ---
  const totalEvaluators = evaluators.length;
  const activeEvaluators = evaluators.filter((e) => e.status === "active").length;
  const inactiveEvaluators = evaluators.filter((e) => e.status === "inactive").length;

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
            <p className="text-xl font-bold text-[#1A202C]">{totalEvaluators}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="bg-[#E6FFFA] p-3 rounded-xl">
            <FiUserCheck className="text-[#48BB78] text-xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Active Evaluators</p>
            <p className="text-xl font-bold text-[#1A202C]">{activeEvaluators}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="bg-[#FFE6E6] p-3 rounded-xl">
            <FiUserX className="text-red-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-[#718096]">Inactive Evaluators</p>
            <p className="text-xl font-bold text-[#1A202C]">{inactiveEvaluators}</p>
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
                <td className="py-3 px-4 font-medium text-[#1A202C]">{ev.id}</td>
                <td className="py-3 px-4">{ev.name}</td>
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
                    onClick={() => setShowViewPopup(ev)}
                    className="text-[#3182CE] hover:text-blue-700 transition-all"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => setShowEditPopup(ev)}
                    className="text-[#FF9900] hover:text-[#E68500] transition-all"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(ev.id)}
                    className="text-[#48BB78] hover:text-green-600 transition-all"
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

      {/* Create Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-[#1A202C] mb-4">
              Create New Evaluator
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
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

      {/* View Popup */}
      {showViewPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-[#1A202C] mb-4">
              Evaluator Details
            </h2>
            <p>
              <b>ID:</b> {showViewPopup.id}
            </p>
            <p>
              <b>Name:</b> {showViewPopup.name}
            </p>
            <p>
              <b>Email:</b> {showViewPopup.email}
            </p>
            <p>
              <b>Department:</b> {showViewPopup.dept}
            </p>
            <p>
              <b>Status:</b> {showViewPopup.status}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewPopup(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm"
              >
                Close
              </button>
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
