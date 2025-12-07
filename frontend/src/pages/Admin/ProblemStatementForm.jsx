import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../Utils";
import { toast, Toaster } from "react-hot-toast";
import { FiSave, FiX } from "react-icons/fi";

import { useNavigate } from "react-router-dom"; // Added import

const ProblemStatementForm = () => {
  const navigate = useNavigate(); // Added hook
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState(""); // User asked for Category, mapping Dept to it or separate? specific request: "category". Detail view usually shows Dept as category. I'll stick to 'Department' as the field name but label it Category/Department to be safe, or just add Category.
  const [category, setCategory] = useState("");
  const [subDate, setSubDate] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [datasetLink, setDatasetLink] = useState("");

  // New: modal state and created item state
  const [showModal, setShowModal] = useState(false);
  const [createdProblem, setCreatedProblem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine links into description for storage if schema is strict
      let finalDescription = description;
      if (youtubeLink) finalDescription += `\n\nYouTube Link: ${youtubeLink}`;
      if (datasetLink) finalDescription += `\n\nDataset Link: ${datasetLink}`;

      const payload = {
        title,
        description: finalDescription,
        sub_date: subDate,
        dept: category,
        reference: youtubeLink,
      };

      const response = await axios.post(`${URL}/addproblems`, payload, { withCredentials: true });

      // Save created item (fallback to posted payload if response data missing)
      // Merge local fields to ensure modal displays them correctly
      const created = {
        ...payload,
        ...response?.data,
        youtube: youtubeLink,
        dataset: datasetLink
      };

      setCreatedProblem(created);
      setShowModal(true); // show modal on same page
      toast.success("Problem Statement Added Successfully", {
        position: "top-center",
      });

      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setSubDate("");
      setYoutubeLink("");
      setDatasetLink("");
    } catch (error) {
      console.error("Error adding problem statement:", error);
      toast.error("Failed to Add Problem Statement", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col items-center justify-start pt-10 px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 border border-[#E2E8F0] relative"> {/* Added relative for positioning */}
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <FiX size={24} />
        </button>

        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-[#1A202C]">Create Problem Statement</h2>
          <p className="text-[#718096] text-sm mt-1">Fill in the details to post a new problem for teams.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">Problem Statement Title</label>
              <input
                type="text"
                placeholder="Enter the title of the problem statement"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748]"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">Category (Department)</label>
              <select
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748] bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="">Select Category</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="EEE">Electrical (EEE)</option>
                <option value="MECH">Mechanical (MECH)</option>
                <option value="CIVIL">Civil</option>
                <option value="AI_DS">AI & DS</option>

              </select>
            </div>

            {/* Submission Deadline */}
            <div>
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">Submission Deadline</label>
              <input
                type="date"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748]"
                onChange={(e) => setSubDate(e.target.value)}
                value={subDate}
                required
              />
            </div>

            {/* Description (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">Description</label>
              <textarea
                placeholder="Detailed description of the problem statement..."
                rows="5"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748]"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            {/* YouTube Link */}
            <div>
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">YouTube Video Link</label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748]"
                onChange={(e) => setYoutubeLink(e.target.value)}
                value={youtubeLink}
              />
            </div>

            {/* Dataset Link */}
            <div>
              <label className="block text-sm font-semibold text-[#4A5568] mb-2">Dataset Link</label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-colors outline-none text-[#2D3748]"
                onChange={(e) => setDatasetLink(e.target.value)}
                value={datasetLink}
              />
            </div>

          </div>

          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FF9900] text-white hover:bg-[#E68500] font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FiSave />
              Create Problem Statement
            </button>
          </div>
        </form>
      </div>

      {/* Modal: appears on same page with high z-index */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 z-60 transform transition-all scale-100"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Problem Statement Created</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex bg-gray-50 p-3 rounded-lg">
                <strong className="w-32 text-gray-500">Title:</strong>
                <span className="font-medium text-gray-900">{createdProblem?.title || "—"}</span>
              </div>
              <div className="flex bg-gray-50 p-3 rounded-lg">
                <strong className="w-32 text-gray-500">Category:</strong>
                <span className="font-medium text-gray-900">{createdProblem?.dept || createdProblem?.category || "—"}</span>
              </div>
              <div className="flex bg-gray-50 p-3 rounded-lg">
                <strong className="w-32 text-gray-500">Deadline:</strong>
                <span className="font-medium text-gray-900">{createdProblem?.sub_date || "—"}</span>
              </div>
              <div className="flex bg-gray-50 p-3 rounded-lg">
                <strong className="w-32 text-gray-500">YouTube:</strong>
                <span className="truncate flex-1">
                  {createdProblem?.youtube ? (
                    <a href={createdProblem.youtube} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {createdProblem.youtube}
                    </a>
                  ) : "—"}
                </span>
              </div>
              <div className="flex bg-gray-50 p-3 rounded-lg">
                <strong className="w-32 text-gray-500">Dataset:</strong>
                <span className="truncate flex-1">
                  {createdProblem?.dataset ? (
                    <a href={createdProblem.dataset} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {createdProblem.dataset}
                    </a>
                  ) : "—"}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-[#FF9900] text-white rounded-xl hover:bg-[#E68500] font-medium transition-colors"
              >
                Done
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
