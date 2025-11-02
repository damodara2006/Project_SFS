// src/pages/admin/EvaluatorManage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { mockProblemStatements, getEvaluatorUsers } from '../../mockData';
import { FiSave, FiList, FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Added icons

const EvaluatorManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreate = !id;
  const existingEvaluator = id ? getEvaluatorUsers().find(e => e.id === id) : null;

  const [email, setEmail] = useState(existingEvaluator?.email || '');
  const [password, setPassword] = useState(''); 
  const [newEvaluatorId, setNewEvaluatorId] = useState('');
  const [assignedProblems, setAssignedProblems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
    
    // State for text filtering the problem statements list
    const [problemSearchTerm, setProblemSearchTerm] = useState(''); 

    // 🆕 State for filtering by status ('ALL', 'Approved', 'Rejected')
    const [statusFilter, setStatusFilter] = useState('ALL'); 

  useEffect(() => {
    if (isCreate) {
        const generatedId = 'eva_' + Date.now().toString().slice(-6);
        setNewEvaluatorId(generatedId);
    } else if (existingEvaluator) {
        const initialAssignments = mockProblemStatements
            .filter(p => p.assignedEvaluators.includes(id))
            .map(p => p.id);
        setAssignedProblems(initialAssignments);
    }
  }, [id, existingEvaluator, isCreate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (isCreate) {
        console.log(`Creating new evaluator (ID: ${newEvaluatorId}): ${email} with password: ${password}`);
        alert(`Mock: Created new Evaluator (ID: ${newEvaluatorId}) with email ${email}.`);
    } else {
        console.log(`Updating assignments for ${existingEvaluator.email}. New assignments:`, assignedProblems);
        alert(`Mock: Updated assignments for ${existingEvaluator.email}.`);
    }

    setIsSubmitting(false);
    navigate('/admin/evaluators');
  };

  const handleAssignmentChange = (problemId) => {
    setAssignedProblems(prev => 
        prev.includes(problemId)
            ? prev.filter(id => id !== problemId)
            : [...prev, problemId]
    );
  };

    // 🚀 Filtering Logic: Combines Text Search and Status Filter
    const filteredProblemStatements = useMemo(() => {
        let problems = mockProblemStatements;

        // 1. Apply Status Filter
        if (statusFilter !== 'ALL') {
            problems = problems.filter(problem => problem.status === statusFilter);
        }

        // 2. Apply Text Search
        if (problemSearchTerm) {
            const lowerCaseSearch = problemSearchTerm.toLowerCase();
            problems = problems.filter(problem => 
                problem.title.toLowerCase().includes(lowerCaseSearch) ||
                problem.status.toLowerCase().includes(lowerCaseSearch) ||
                problem.id.toLowerCase().includes(lowerCaseSearch)
            );
        }
        return problems;

    }, [problemSearchTerm, statusFilter]); // Depend on both states

  if (id && !existingEvaluator) {
    return <div className="text-center py-10 text-red-600">Evaluator Not Found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isCreate ? 'Create New Evaluator' : `Manage Evaluator: ${existingEvaluator.email}`}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="border p-4 rounded-lg space-y-4">
            <legend className="px-2 text-lg font-semibold text-indigo-600">{isCreate ? 'Account Details' : 'Account Info'}</legend>
            
            {/* ID, Email, Password Inputs (unchanged) */}
            {isCreate && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Evaluator ID (System Generated)</label>
                    <input
                        type="text"
                        value={newEvaluatorId || 'Generating...'}
                        disabled 
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-indigo-50 text-indigo-700 font-mono"
                    />
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isCreate}
                    required
                    placeholder={isCreate ? 'Enter new evaluator email' : ''}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 disabled:bg-gray-100 disabled:text-gray-500"
                />
            </div>
            {isCreate && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password (Initial)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter initial password"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
                    />
                </div>
            )}
        </fieldset>

        {!isCreate && (
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="px-2 text-lg font-semibold text-indigo-600">Problem Assignment</legend>
                <p className="text-sm text-gray-600">Select which Problem Statements this Evaluator is authorized to view submissions for and evaluate.</p>

                {/* 🆕 Filter Controls */}
                <div className="flex space-x-3 items-center">
                    {/* Status Filter Buttons */}
                    <Button 
                        type="button" 
                        variant={statusFilter === 'ALL' ? 'primary' : 'secondary'} 
                        size="sm"
                        onClick={() => setStatusFilter('ALL')}
                    >
                        All Statuses
                    </Button>
                    <Button 
                        type="button" 
                        variant={statusFilter === 'Approved' ? 'success' : 'outline'} 
                        size="sm"
                        onClick={() => setStatusFilter('Approved')}
                        className="flex items-center"
                    >
                        <FiCheckCircle className="w-4 h-4 mr-1" /> Approved
                    </Button>
                    <Button 
                        type="button" 
                        variant={statusFilter === 'Rejected' ? 'danger' : 'outline'} 
                        size="sm"
                        onClick={() => setStatusFilter('Rejected')}
                        className="flex items-center"
                    >
                        <FiXCircle className="w-4 h-4 mr-1" /> Rejected
                    </Button>
                </div>
                {/* End of Status Filter Buttons */}

                {/* Text Search Input */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Further filter results by title or ID..."
                        value={problemSearchTerm}
                        onChange={(e) => setProblemSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>


                <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                    {filteredProblemStatements.length > 0 ? (
                        filteredProblemStatements.map(problem => (
                            <div key={problem.id} className="flex items-center">
                                <input
                                    id={`problem-${problem.id}`}
                                    type="checkbox"
                                    checked={assignedProblems.includes(problem.id)}
                                    onChange={() => handleAssignmentChange(problem.id)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`problem-${problem.id}`} className="ml-3 text-sm font-medium text-gray-700">
                                    {problem.title} <span className="text-xs text-gray-500">({problem.status})</span>
                                </label>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-4 text-gray-500">No problems match your current filters.</p>
                    )}
                </div>
            </fieldset>
        )}

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => navigate('/admin/evaluators')} className="flex items-center">
            <FiList className="w-5 h-5 mr-1" /> Cancel/View List
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting} className="flex items-center">
            <FiSave className="w-5 h-5 mr-1" /> {isSubmitting ? 'Saving...' : (isCreate ? 'Create Account' : 'Save Assignments')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EvaluatorManage;