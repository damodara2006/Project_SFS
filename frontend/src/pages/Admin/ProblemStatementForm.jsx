import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import Button from '../../components/common/Button';
import { addProblemStatement, getEvaluatorUsers } from '../../mockData';
import { FiSearch, FiSave, FiX } from 'react-icons/fi';

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
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="min-h-screen bg-background-light py-10">
      <div className="max-w-4xl mx-auto bg-background-white shadow-card rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          {isCreate ? 'Create New Problem Statement' : 'Edit Problem Statement'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Problem Statement ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="e.g., IC10001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="Enter problem statement title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="Describe the problem statement"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="e.g., Ministry of Health and Family Welfare"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
            >
              <option value="">Select Category</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Data">Data</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              YouTube Link
            </label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Dataset Link
            </label>
            <input
              type="url"
              name="dataset"
              value={formData.dataset}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary"
              placeholder="https://example.com/dataset"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Assign Evaluators
            </label>
            <div className="mb-4">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search Evaluators"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-border-color rounded-full py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary-accent/20 bg-background-white text-text-primary placeholder-text-tertiary"
                />
                <button className="absolute right-3 top-2.5 text-text-tertiary hover:text-text-secondary">
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto border border-border-color rounded-xl p-4 bg-background-white">
              <table className="w-full text-left border-collapse border border-border-color rounded-xl overflow-hidden">
                <thead className="bg-primary-accent/10">
                  <tr>
                    <th className="p-3 font-semibold text-text-primary border border-border-color">Select</th>
                    <th className="p-3 font-semibold text-text-primary border border-border-color">Evaluator Email</th>
                    <th className="p-3 font-semibold text-text-primary border border-border-color">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluators
                    .filter(evaluator =>
                      evaluator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      evaluator.id.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((evaluator) => (
                      <tr key={evaluator.id} className="hover:bg-background-light/50 border border-border-color transition-colors duration-150">
                        <td className="p-3 border border-border-color">
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
                            className="w-4 h-4 text-primary-accent border-border-color rounded focus:ring-primary-accent/20"
                          />
                        </td>
                        <td className="p-3 text-text-primary border border-border-color">{evaluator.email}</td>
                        <td className="p-3 text-text-primary border border-border-color">{evaluator.id}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="bg-primary-accent hover:bg-primary-accent/90 text-background-white px-6 py-2 rounded-xl flex items-center space-x-2 shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <FiSave className="w-4 h-4" />
              <span>{isCreate ? 'Create' : 'Update'}</span>
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-text-tertiary hover:bg-text-secondary text-background-white px-6 py-2 rounded-xl flex items-center space-x-2 shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <FiX className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
=======
import Button from '../../components/common/button';
import { getEvaluatorUsers } from '../../mockData';
import { FiSave, FiList, FiUpload } from 'react-icons/fi';

const ProblemStatementForm = ({ isCreate, initialData = {} }) => {
    const navigate = useNavigate();
    const evaluators = getEvaluatorUsers();

    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [deadline, setDeadline] = useState(initialData.deadline ? initialData.deadline.substring(0, 10) : '');
    const [status, setStatus] = useState(initialData.status || 'Open');
    const [assignedEvaluators, setAssignedEvaluators] = useState(initialData.assignedEvaluators || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = { title, description, deadline, status, assignedEvaluators };

        // API logic for creating/updating
        if (isCreate) {
            console.log("Creating new problem:", formData);
            // In a real app: POST to /api/problems
            alert(`Mock: Created new problem: ${title}`);
        } else {
            console.log(`Updating problem ${initialData.id}:`, formData);
            // In a real app: PUT to /api/problems/:id
            alert(`Mock: Updated problem: ${title}`);
        }

        setIsSubmitting(false);
        navigate('/admin/problems');
    };

    const handleEvaluatorChange = (evaluatorId) => {
        setAssignedEvaluators(prev =>
            prev.includes(evaluatorId)
                ? prev.filter(id => id !== evaluatorId)
                : [...prev, evaluatorId]
        );
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {isCreate ? 'Create New Problem Statement' : `Edit Problem: ${initialData.title}`}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Core Details */}
                <fieldset className="border p-4 rounded-lg space-y-4">
                    <legend className="px-2 text-lg font-semibold text-indigo-600">Problem Details</legend>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Submission Deadline</label>
                            <input
                                id="deadline"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white"
                            >
                                <option value="Open">Open</option>
                                <option value="In Review">In Review</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                {/* Evaluator Assignment */}
                <fieldset className="border p-4 rounded-lg space-y-4">
                    <legend className="px-2 text-lg font-semibold text-indigo-600">Assign Evaluators</legend>
                    <p className="text-sm text-gray-600">Select all Evaluators who will be responsible for marking submissions for this problem statement.</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
                        {evaluators.map(evaluator => (
                            <div key={evaluator.id} className="flex items-center">
                                <input
                                    id={`evaluator-${evaluator.id}`}
                                    type="checkbox"
                                    checked={assignedEvaluators.includes(evaluator.id)}
                                    onChange={() => handleEvaluatorChange(evaluator.id)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`evaluator-${evaluator.id}`} className="ml-3 text-sm font-medium text-gray-700">
                                    {evaluator.email}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Attachments (Simplified File Upload Mock) */}
                <fieldset className="border p-4 rounded-lg space-y-4">
                    <legend className="px-2 text-lg font-semibold text-indigo-600">Attachments</legend>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            multiple
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <Button variant="secondary" size="md" className="flex items-center">
                            <FiUpload className="w-5 h-5 mr-1" /> Upload Files
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500">Note: Actual file storage logic (e.g., S3 or MongoDB GridFS) would be implemented in the backend.</p>
                </fieldset>


                <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="secondary" onClick={() => navigate('/admin/problems')} className="flex items-center">
                        <FiList className="w-5 h-5 mr-1" /> Cancel/View List
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting} className="flex items-center">
                        <FiSave className="w-5 h-5 mr-1" /> {isSubmitting ? 'Saving...' : 'Save Problem'}
                    </Button>
                </div>
            </form>
        </div>
    );
>>>>>>> 42e6b4e022e695f1ac5bb9cbe1fb2e97d9e56440
};

export default ProblemStatementForm;
