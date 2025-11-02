import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { addProblemStatement, getEvaluatorUsers } from '../../mockData';

const ProblemStatementForm = ({ isCreate }) => {
  const navigate = useNavigate();
  const evaluators = getEvaluatorUsers();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    department: '',
    category: '',
    youtube: '',
    dataset: '',
  });
  const [assignedEvaluators, setAssignedEvaluators] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit logic
    if (isCreate) {
      addProblemStatement({ ...formData, assignedEvaluators });
    }
    // For edit, we would update existing, but for now just log
    console.log('Submitting form:', formData, 'Assigned Evaluators:', assignedEvaluators);
    alert(`${isCreate ? 'Created' : 'Updated'} problem statement successfully!`);
    navigate('/admin/problems');
  };

  const handleCancel = () => {
    navigate('/admin/problems');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isCreate ? 'Create New Problem Statement' : 'Edit Problem Statement'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Statement ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., IC10001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter problem statement title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the problem statement"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Ministry of Health and Family Welfare"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Data">Data</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Link
            </label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dataset Link
            </label>
            <input
              type="url"
              name="dataset"
              value={formData.dataset}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/dataset"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Evaluators
            </label>
            <div className="space-y-2">
              {evaluators.map((evaluator) => (
                <label key={evaluator.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={assignedEvaluators.includes(evaluator.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAssignedEvaluators([...assignedEvaluators, evaluator.id]);
                      } else {
                        setAssignedEvaluators(assignedEvaluators.filter(id => id !== evaluator.id));
                      }
                    }}
                    className="mr-2"
                  />
                  {evaluator.email} (ID: {evaluator.id})
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              {isCreate ? 'Create' : 'Update'}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemStatementForm;
