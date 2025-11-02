// src/pages/admin/EvaluatorsList.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import RoleBadge from '../../components/admin/RoleBadge';
import { getEvaluatorUsers } from '../../mockData'; // Assuming mockData is updated or adapted
import { FiPlus, FiEdit, FiSearch, FiX } from 'react-icons/fi';

// --- START: NEW Problem Statement Modal Component ---
const ProblemStatementDetailModal = ({ problemStatement, onClose }) => {
    // NOTE: 'problemStatement' now represents the full detail object, not just a string/ID
    if (!problemStatement) return null;

    // Use relevant defaults/fallbacks for display
    // Using default/fallback logic if the detail object is incomplete
    const title = problemStatement.title || "Untitled Evaluation Project";
    const defaultDepartment = "R&D Innovation";
    const defaultCategory = "Machine Learning / AI";

    // Define comprehensive defaults for nested fields
    const { 
        id = 'PS-000', 
        description = 'This problem statement currently has no detailed description available. It likely pertains to a standard internal evaluation based on the associated department.', 
        department = defaultDepartment, 
        category = defaultCategory, 
        youtubeLink = '', // Empty string for no link
        dataSetLink = '', // Empty string for no link
        teamsEnrolled = 1, // Defaulting to at least 1 team
        submissions = 0 
    } = problemStatement;

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg m-4">
                <div className="flex justify-between items-start mb-4 border-b pb-3">
                    <h2 className="text-2xl font-bold text-indigo-700">Problem Statement: {title}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition"
                        aria-label="Close"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-4 text-sm">
                    <p className="font-mono text-gray-500">
                        ID: <span className="font-semibold text-indigo-600">{id}</span>
                    </p>
                    
                    <div>
                        <p className="font-semibold text-gray-700">Description:</p>
                        <p className="text-gray-600 italic mt-1 text-base">{description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 pt-2 border-t">
                        <p className="text-gray-500">Department: <span className="font-medium text-gray-800">{department}</span></p>
                        <p className="text-gray-500">Category: <span className="font-medium text-gray-800">{category}</span></p>
                        <p className="text-gray-500">Teams Enrolled: <span className="font-bold text-green-600">{teamsEnrolled}</span></p>
                        <p className="text-gray-500">Total Submissions: <span className="font-bold text-blue-600">{submissions}</span></p>
                    </div>

                    <div className="pt-3 border-t space-y-2">
                        {youtubeLink ? (
                            <p className="text-gray-500">
                                YouTube Link: 
                                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-2">View Instructions</a>
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">YouTube Link: Not available</p>
                        )}
                        {dataSetLink ? (
                            <p className="text-gray-500">
                                Dataset Link: 
                                <a href={dataSetLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-2">Download Dataset</a>
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">Dataset Link: Not available</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose} variant="secondary">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};
// --- END: NEW Problem Statement Modal Component ---


// --- START: Existing Evaluator Profile Modal Component (Unchanged) ---
const EvaluatorDetailModal = ({ evaluator, onClose }) => {
    if (!evaluator) return null;

    const displayName = evaluator.name || evaluator.email || 'No Name Provided';
    // NOTE: 'problemStatement' is likely the full text if available, or the ID. Displaying the ID fallback.
    const defaultProblemStatementId = "PS-GEN-001"; 
    const defaultDepartment = "Engineering";

    return (
        // ... (Modal structure is the same)
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Profile: {displayName}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" aria-label="Close">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-500">
                        Name: 
                        <span className="font-semibold text-gray-900 block text-lg">
                            {evaluator.name || evaluator.email}
                        </span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">ID: <span className="font-mono text-indigo-600">{evaluator.id}</span></p>
                    <p className="text-sm font-medium text-gray-500">Email: <span className="text-gray-700">{evaluator.email}</span></p>
                    <p className="text-sm font-medium text-gray-500">Role: <RoleBadge role={evaluator.role} /></p>
                    
                    <p className="text-sm font-medium text-gray-500">Department: <span className="text-gray-700 font-medium">{evaluator.department || defaultDepartment}</span></p>
                    
                    {/* Updated to display the ID if present */}
                    <p className="text-sm font-medium text-gray-500">
                        Problem ID: 
                        <span className="text-gray-700 block mt-1 font-mono text-base">
                            {evaluator.problemStatementId || defaultProblemStatementId}
                        </span>
                    </p>
                    
                    <div className="pt-3 border-t mt-3">
                        <p className="text-md font-bold text-gray-700">Records Overview</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                            <li>Total Submissions Graded: **45**</li>
                            <li>Average Grade Score: **88.5%**</li>
                            <li>Active Projects: **3**</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose} variant="secondary">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};
// --- END: Existing Evaluator Profile Modal Component ---

const EvaluatorsList = () => {
    const navigate = useNavigate();
    // ASSUMPTION: 'getEvaluatorUsers()' now returns objects with 'problemStatementId'
    // and potentially 'problemStatementDetail' (a full object).
    const allEvaluators = getEvaluatorUsers(); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedEvaluator, setSelectedEvaluator] = useState(null); 
    // NEW STATE for Problem Statement Detail Modal
    const [selectedProblemStatement, setSelectedProblemStatement] = useState(null);
    
    // Define the default values centrally
    const defaultProblemStatementId = "PS-GEN-001"; // New default ID
    const defaultDepartment = "Engineering";

    // Handlers for Modals
    const handleViewProfileInModal = (evaluator) => {
        setSelectedEvaluator(evaluator); 
    };
    
    const handleCloseProfileModal = () => {
        setSelectedEvaluator(null);
    };

    // NEW HANDLER for Problem Statement Detail - now primarily uses the problemStatementId
    // In a real application, you would use 'evaluator.problemStatementId' to fetch the details.
    const handleViewProblemStatementDetail = (problemStatementDetail, problemStatementId) => {
        // For mock data, we use 'problemStatementDetail' if available, otherwise fall back to just the ID/title
        const detailsToDisplay = problemStatementDetail || { 
            id: problemStatementId,
            title: `Problem ID: ${problemStatementId}`,
        };
        setSelectedProblemStatement(detailsToDisplay);
    };

    const handleClosePSModal = () => {
        setSelectedProblemStatement(null);
    };
    
    // Mock API call handlers (unchanged)
    const handleEdit = (evaluator) => {
        navigate(`/admin/evaluators/manage/${evaluator.id}`);
    };

    // Filtering Logic (UPDATED to search by problemStatementId)
    const filteredEvaluators = useMemo(() => {
        if (!searchTerm) return allEvaluators;

        const lowerCaseSearch = searchTerm.toLowerCase();

        return allEvaluators.filter(
            (evaluator) => {
                const nameToSearch = evaluator.name || evaluator.email; 
                
                // Use the new problemStatementId field for search
                const searchProblemId = evaluator.problemStatementId || defaultProblemStatementId;
                const searchDepartment = evaluator.department || defaultDepartment;

                return (
                    nameToSearch.toLowerCase().includes(lowerCaseSearch) ||
                    evaluator.email.toLowerCase().includes(lowerCaseSearch) ||
                    evaluator.id.toLowerCase().includes(lowerCaseSearch) ||
                    searchProblemId.toLowerCase().includes(lowerCaseSearch) || // Search by Problem ID
                    searchDepartment.toLowerCase().includes(lowerCaseSearch)
                );
            }
        );
    }, [allEvaluators, searchTerm, defaultProblemStatementId, defaultDepartment]);


    const columns = [
        // 1. ID Column
        { header: 'ID', accessor: 'id' },
        
        // 2. Name Column (Clickable to view profile)
        { 
            header: 'Name', 
            cell: (row) => (
                <span 
                    className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer transition duration-150"
                    onClick={() => handleViewProfileInModal(row)}
                    title={`View profile for ${row.name || row.email}`}
                >
                    {row.name || row.email.split('@')[0] || 'N/A'} 
                </span>
            )
        }, 
        
        // 3. Problem ID Column (UPDATED: Header and accessor changed)
        { 
            header: 'Problem ID', // Changed header from 'Problem Statement'
            // Assumes 'problemStatementId' exists on the row object
            cell: (row) => (
                <span 
                    className="text-sm font-mono text-blue-600 hover:text-blue-800 cursor-pointer transition duration-150"
                    onClick={() => 
                        handleViewProblemStatementDetail(
                            row.problemStatementDetail, 
                            row.problemStatementId || defaultProblemStatementId
                        )
                    }
                    title={`View details for Problem ID: ${row.problemStatementId || defaultProblemStatementId}`}
                >
                    {row.problemStatementId || defaultProblemStatementId}
                </span>
            )
        },
        
        // 4. Department Column (Unchanged)
        { 
            header: 'Department', 
            cell: (row) => (
                <span className="text-sm text-gray-700">
                    {row.department || defaultDepartment}
                </span>
            )
        },
        
        // 5. Email Column (Unchanged)
        { header: 'Email', accessor: 'email' },
        
        // 6. Role Column (Still clickable to view profile)
        { 
            header: 'Role', 
            cell: (row) => (
                <div 
                    onClick={() => handleViewProfileInModal(row)}
                    className="cursor-pointer inline-block transition duration-150 hover:opacity-75"
                    title={`View profile for ${row.name || row.email}`}
                >
                    <RoleBadge role={row.role} />
                </div>
            )
        },
        
        // 7. Actions Column (Unchanged)
        {
            header: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(row)} className="flex items-center">
                        <FiEdit className="w-4 h-4 mr-1" /> Manage
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Evaluator Management</h1>
                <Button onClick={() => navigate('/admin/evaluators/create')} className="flex items-center">
                    <FiPlus className="w-5 h-5 mr-1" /> Create Evaluator
                </Button>
            </div>

            <p className="text-gray-600">Full control over Evaluator accounts, including credential generation and editing.</p>

            {/* Search Input (Placeholder updated) */}
            <div className="relative max-w-lg">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name, email, ID, problem ID, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Pass Filtered Data to DataTable */}
            <DataTable columns={columns} data={filteredEvaluators} />

            {/* 1. Render Evaluator Profile Modal */}
            <EvaluatorDetailModal 
                evaluator={selectedEvaluator} 
                onClose={handleCloseProfileModal} 
            />

            {/* 2. Render Problem Statement Detail Modal */}
            <ProblemStatementDetailModal 
                problemStatement={selectedProblemStatement} 
                onClose={handleClosePSModal} 
            />
        </div>
    );
};

export default EvaluatorsList;