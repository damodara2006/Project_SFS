import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
};

export default ProblemStatementForm;
