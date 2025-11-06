import React from "react";

const AddProblemStatement = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-xl w-full max-w-3xl p-8">
          

          <form className="space-y-5">
            {/* Problem ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Problem Statement ID
              </label>
              <input
                type="text"
                placeholder="e.g., IC10001"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Problem Statement Title"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Describe the Problem Statement"
                rows="4"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            {/* Department */}
             <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                placeholder="Enter Department"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </div>


            
            {/* YouTube Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                YouTube Link
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </div>

            
            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
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
    </div>
  );
};

export default AddProblemStatement;
