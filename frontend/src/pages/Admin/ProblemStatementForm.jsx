import React from "react";
import axios from "axios";
import { useState } from "react";
import { URL } from "../../Utils";
import { toast, Toaster } from "react-hot-toast";

const ProblemStatementForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dept, setDept] = useState("");
  const [subDate, setSubDate] = useState("");
  const [reference, setReference] = useState("");

  // New: modal state and created item state
  const [showModal, setShowModal] = useState(false);
  const [createdProblem, setCreatedProblem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${URL}/addproblems`, {
        title: title,
        description: description,
        sub_date: subDate,
        dept: dept,
        reference: reference,
      });

      // Save created item (fallback to posted payload if response data missing)
      const created = response?.data || {
        title,
        description,
        sub_date: subDate,
        dept,
        reference,
      };

      setCreatedProblem(created);
      setShowModal(true); // show modal on same page
      toast.success("Problem Statement Added Successfully", {
        position: "top-center",
      });

      // Optionally reset form fields (comment/uncomment as desired)
      // setTitle(""); setDescription(""); setDept(""); setSubDate(""); setReference("");
    } catch (error) {
      console.error("Error adding problem statement:", error);
      toast.error("Failed to Add Problem Statement", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-xl w-full max-w-3xl p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="Enter Problem Statement Title"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Describe the Problem Statement"
                rows="4"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                placeholder="Enter Department"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e) => setDept(e.target.value)}
                value={dept}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reference Link</label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e) => setReference(e.target.value)}
                value={reference}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Enter Submission DeadLine</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e) => setSubDate(e.target.value)}
                value={subDate}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  // clear form or other cancel behavior (keeps on same page)
                  setTitle("");
                  setDescription("");
                  setDept("");
                  setSubDate("");
                  setReference("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: appears on same page with high z-index */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 z-60"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Problem Statement Created</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Title:</strong> {createdProblem?.title || "—"}
              </div>
              <div>
                <strong>Department:</strong> {createdProblem?.dept || createdProblem?.department || "—"}
              </div>
              <div>
                <strong>Submission Deadline:</strong> {createdProblem?.sub_date || createdProblem?.submission_deadline || "—"}
              </div>
              <div>
                <strong>Reference:</strong>{" "}
                {createdProblem?.reference ? (
                  <a href={createdProblem.reference} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {createdProblem.reference}
                  </a>
                ) : (
                  "—"
                )}
              </div>
              <div>
                <strong>Description:</strong>
                <p className="mt-2 bg-gray-50 p-3 rounded-md">{createdProblem?.description || "—"}</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default ProblemStatementForm;
