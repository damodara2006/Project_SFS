// src/pages/admin/ProblemStatementForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
};

export default ProblemStatementForm;