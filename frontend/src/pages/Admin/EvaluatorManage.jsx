// src/pages/admin/EvaluatorManage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { mockProblemStatements, getEvaluatorUsers } from '../../mockData';
import { FiSave, FiList, FiSearch, FiCheckCircle, FiXCircle, FiInfo, FiEdit, FiTrash } from 'react-icons/fi';

// --- Mock Toast Component for Demonstration ---
const Toast = ({ message, type, onClose }) => {
    if (!message) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white z-50 flex items-center transition-opacity duration-300";
    let styleClasses = "";
    let Icon = FiInfo;

    switch (type) {
        case 'success':
            styleClasses = "bg-green-500";
            Icon = FiCheckCircle;
            break;
        case 'error':
            styleClasses = "bg-red-500";
            Icon = FiXCircle;
            break;
        default:
            styleClasses = "bg-indigo-600";
            Icon = FiInfo;
    }

    // Auto-hide the toast after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`${baseClasses} ${styleClasses}`} onClick={onClose}>
            <Icon className="w-5 h-5 mr-2" />
            <span>{message}</span>
        </div>
    );
};
// ----------------------------------------------


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
    
    // NEW: State for Toast Notification
    const [toast, setToast] = useState({ message: '', type: '' });
    const showToast = useCallback((message, type = 'default') => {
        setToast({ message, type });
        // The Toast component handles auto-closing via its internal useEffect
    }, []);

    // State for text filtering the problem statements list
    const [problemSearchTerm, setProblemSearchTerm] = useState(''); 

    // State for filtering by status ('ALL', 'Approved', 'Rejected')
    const [statusFilter, setStatusFilter] = useState('ALL'); // Default to ALL

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
            // REPLACED: alert() with showToast()
            showToast(`Created new Evaluator (ID: ${newEvaluatorId}) with email ${email}.`, 'success');
            
            // We delay the navigation slightly to allow the user to see the toast
            setTimeout(() => {
                setIsSubmitting(false);
                navigate('/admin/evaluators');
            }, 2000); // Wait 2 seconds before navigating
            
            return; // Exit early to prevent immediate navigation below
            
        } else {
            console.log(`Updating assignments for ${existingEvaluator.email}. New assignments:`, assignedProblems);
            // REPLACED: alert() with showToast()
            showToast(`Updated assignments for ${existingEvaluator.email}.`, 'success');
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
    
    // New handler for the Select dropdown
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
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
        <div className="min-h-screen bg-background-light py-10">
            <div className="max-w-4xl mx-auto bg-background-white shadow-card rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-text-primary mb-6">
                    SPOC Approval Requests
                </h1>
                <p className="text-sm text-text-secondary mb-8 max-w-3xl">
                    Review and verify college SPOC (Single Point of Contact) requests. Approval creates the necessary College and SPOC User accounts.
                </p>
            
                <div className="bg-background-white rounded-xl shadow-card p-6">
                    <table className="w-full border-collapse border border-border-color rounded-xl overflow-hidden">
                        <thead className="bg-primary-accent/10">
                            <tr>
                                <th className="p-3 font-semibold text-text-primary border border-border-color text-left uppercase text-sm tracking-wide">College Name</th>
                                <th className="p-3 font-semibold text-text-primary border border-border-color text-left uppercase text-sm tracking-wide">SPOC Email</th>
                                <th className="p-3 font-semibold text-text-primary border border-border-color text-center uppercase text-sm tracking-wide">Date Requested</th>
                                <th className="p-3 font-semibold text-text-primary border border-border-color text-center uppercase text-sm tracking-wide">Status</th>
                                <th className="p-3 font-semibold text-text-primary border border-border-color text-center uppercase text-sm tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mock data for SPOC requests */}
                            <tr className="hover:bg-background-light/50 transition-colors duration-150">
                                <td className="p-3 border border-border-color text-text-primary font-medium">Indian Institute of Technology Delhi</td>
                                <td className="p-3 border border-border-color text-text-secondary text-sm">spoc@iitd.ac.in</td>
                                <td className="p-3 border border-border-color text-center text-text-primary font-mono">2024-01-15</td>
                                <td className="p-3 border border-border-color text-center">
                                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Pending</span>
                                </td>
                                <td className="p-3 border border-border-color text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiCheckCircle className="w-4 h-4" />
                                            <span>Approve</span>
                                        </button>
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiXCircle className="w-4 h-4" />
                                            <span>Reject</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-background-light/50 transition-colors duration-150">
                                <td className="p-3 border border-border-color text-text-primary font-medium">Jawaharlal Nehru University</td>
                                <td className="p-3 border border-border-color text-text-secondary text-sm">contact@jnu.ac.in</td>
                                <td className="p-3 border border-border-color text-center text-text-primary font-mono">2024-01-12</td>
                                <td className="p-3 border border-border-color text-center">
                                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Approved</span>
                                </td>
                                <td className="p-3 border border-border-color text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiEdit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiTrash className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-background-light/50 transition-colors duration-150">
                                <td className="p-3 border border-border-color text-text-primary font-medium">University of Delhi</td>
                                <td className="p-3 border border-border-color text-text-secondary text-sm">spoc@du.ac.in</td>
                                <td className="p-3 border border-border-color text-center text-text-primary font-mono">2024-01-10</td>
                                <td className="p-3 border border-border-color text-center">
                                    <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">Rejected</span>
                                </td>
                                <td className="p-3 border border-border-color text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiEdit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm">
                                            <FiTrash className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* RENDER THE TOAST COMPONENT HERE */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: '', type: '' })}
                />
            </div>
        </div>
    );
};

export default EvaluatorManage;
