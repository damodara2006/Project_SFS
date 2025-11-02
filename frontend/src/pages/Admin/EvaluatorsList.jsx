// src/pages/admin/EvaluatorsList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import { getEvaluatorUsers } from '../../mockData'; // Assuming mockData is updated or adapted
// Added new icons for the redesigned modal
import {
    FiPlus, FiEdit, FiSearch, FiX, FiMail, FiUser, FiHash, FiFileText,
    FiBriefcase, FiCheckCircle, FiClock, FiActivity, FiAward
} from 'react-icons/fi';

// --- START: Mock Data for Problem Statement Search (Unchanged) ---
const mockProblemStatements = [
    { id: 'PS-AI-101', title: 'AI-Powered Customer Support Bot' },
    { id: 'PS-ML-205', title: 'Predictive Maintenance for Machinery' },
    { id: 'PS-DV-302', title: 'Interactive Data Visualization Dashboard' },
    { id: 'PS-SEC-451', title: 'Cybersecurity Threat Detection System' },
    { id: 'PS-IOT-515', title: 'Smart Home Energy Management' },
    { id: 'PS-FIN-620', title: 'Algorithmic Trading Strategy Analysis' },
    { id: 'PS-HLT-730', title: 'Patient Data Anonymization Tool' },
];
// --- END: Mock Data ---


// --- START: Manage Evaluator Modal Component (Unchanged) ---
const ManageEvaluatorModal = ({ evaluator, onClose, onSave, defaultProblemStatementId }) => {
    if (!evaluator) return null;

    const [formData, setFormData] = useState({
        name: evaluator.name || '',
        email: evaluator.email || '',
        problemStatementId: evaluator.problemStatementId || defaultProblemStatementId || '',
    });

    const [psSearchTerm, setPsSearchTerm] = useState('');
    const [isPsSearchFocused, setIsPsSearchFocused] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(evaluator.id, formData);
    };

    const filteredProblemStatements = useMemo(() => {
        if (!psSearchTerm) return [];
        return mockProblemStatements.filter(ps =>
            ps.title.toLowerCase().includes(psSearchTerm.toLowerCase()) ||
            ps.id.toLowerCase().includes(psSearchTerm.toLowerCase())
        );
    }, [psSearchTerm]);

    const handleProblemSelect = (problemId) => {
        setFormData(prev => ({ ...prev, problemStatementId: problemId }));
        setPsSearchTerm('');
        setIsPsSearchFocused(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg m-4">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Evaluator Profile</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" aria-label="Close">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="psSearch" className="block text-sm font-medium text-gray-700 mb-1">Search for Problem Statement</label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text" id="psSearch" placeholder="Search by title or ID..."
                                value={psSearchTerm} onChange={(e) => setPsSearchTerm(e.target.value)}
                                onFocus={() => setIsPsSearchFocused(true)} onBlur={() => setTimeout(() => setIsPsSearchFocused(false), 200)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                autoComplete="off"
                            />
                        </div>
                        {isPsSearchFocused && psSearchTerm && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                               {filteredProblemStatements.length > 0 ? (
                                   filteredProblemStatements.map(ps => (
                                       <div key={ps.id} className="p-2 hover:bg-indigo-100 cursor-pointer border-b last:border-b-0"
                                           onMouseDown={() => handleProblemSelect(ps.id)}>
                                           <p className="font-semibold text-gray-800">{ps.title}</p>
                                           <p className="text-sm text-blue-600 font-mono">{ps.id}</p>
                                       </div>
                                   ))
                               ) : (<div className="p-2 text-gray-500">No results found.</div>)}
                            </div>
                        )}
                        <label htmlFor="problemStatementId" className="block text-sm font-medium text-gray-700 mt-3 mb-1">Assigned Problem ID</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text" id="problemStatementId" name="problemStatementId" value={formData.problemStatementId} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" required
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit" variant="primary">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// --- END: Manage Evaluator Modal Component ---


// --- START: Problem Statement Modal Component (Unchanged) ---
const ProblemStatementDetailModal = ({ problemStatement, onClose }) => {
    if (!problemStatement) return null;
    const title = problemStatement.title || "Untitled Evaluation Project";
    const defaultDepartment = "R&D Innovation";
    const defaultCategory = "Machine Learning / AI";

    const { 
        id = 'PS-000', description = 'This problem statement currently has no detailed description available.', 
        department = defaultDepartment, category = defaultCategory, youtubeLink = '', dataSetLink = '',
        teamsEnrolled = 1, submissions = 0 
    } = problemStatement;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg m-4">
                <div className="flex justify-between items-start mb-4 border-b pb-3">
                    <h2 className="text-2xl font-bold text-indigo-700">Problem Statement: {title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" aria-label="Close">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-4 text-sm">
                    <p className="font-mono text-gray-500">ID: <span className="font-semibold text-indigo-600">{id}</span></p>
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
                        {youtubeLink ? (<p>YouTube Link: <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-2">View</a></p>) : (<p className="italic">YouTube Link: Not available</p>)}
                        {dataSetLink ? (<p>Dataset Link: <a href={dataSetLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-2">Download</a></p>) : (<p className="italic">Dataset Link: Not available</p>)}
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose} variant="secondary">Close</Button>
                </div>
            </div>
        </div>
    );
};
// --- END: Problem Statement Modal Component ---


// --- START: Evaluator Profile Modal Component (REWORKED with Records View) ---
const EvaluatorDetailModal = ({ evaluator, onClose }) => {
    const [viewMode, setViewMode] = useState('profile');

    useEffect(() => {
        if (evaluator) {
            setViewMode('profile');
        }
    }, [evaluator]);

    if (!evaluator) return null;

    const displayName = evaluator.name || evaluator.email || 'No Name Provided';
    const defaultDepartment = "Engineering";

    const records = {
        completed: 45,
        pending: 5,
        current: 'PS-SEC-451: Cybersecurity Threat Detection',
        experience: '4 Years',
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {viewMode === 'profile' ? `Profile: ${displayName}` : `Records: ${displayName}`}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" aria-label="Close">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {viewMode === 'profile' ? (
                    <div className="space-y-4">
                        <div className="flex items-center"><FiUser className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-500">Name</p><p className="font-semibold text-gray-900 text-lg">{evaluator.name || 'N/A'}</p></div></div>
                        <div className="flex items-center"><FiHash className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-500">ID</p><p className="font-mono text-indigo-600">{evaluator.id}</p></div></div>
                        <div className="flex items-center"><FiMail className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-500">Email</p><p className="text-gray-700">{evaluator.email}</p></div></div>
                        <div className="flex items-center"><FiBriefcase className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-500">Department</p><p className="font-medium text-gray-700">{evaluator.department || defaultDepartment}</p></div></div>
                    </div>
                ) : (
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center p-3 bg-green-50 rounded-lg"><FiCheckCircle className="w-6 h-6 text-green-600 mr-4" /><div><p className="text-sm text-gray-500">Completed Problems</p><p className="font-bold text-gray-900 text-xl">{records.completed}</p></div></div>
                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg"><FiClock className="w-6 h-6 text-yellow-600 mr-4" /><div><p className="text-sm text-gray-500">Pending Problems</p><p className="font-bold text-gray-900 text-xl">{records.pending}</p></div></div>
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg"><FiActivity className="w-6 h-6 text-blue-600 mr-4" /><div><p className="text-sm text-gray-500">Currently Evaluating</p><p className="font-semibold text-gray-900">{records.current}</p></div></div>
                        <div className="flex items-center p-3 bg-indigo-50 rounded-lg"><FiAward className="w-6 h-6 text-indigo-600 mr-4" /><div><p className="text-sm text-gray-500">Experience</p><p className="font-bold text-gray-900 text-lg">{records.experience}</p></div></div>
                    </div>
                )}

                <div className="mt-8 flex justify-end space-x-3 border-t pt-4">
                    {viewMode === 'records' && (<Button onClick={() => setViewMode('profile')} variant="outline">Back to Profile</Button>)}
                    {viewMode === 'profile' && (<Button onClick={() => setViewMode('records')} variant="primary">View Records</Button>)}
                    <Button onClick={onClose} variant="secondary">Close</Button>
                </div>
            </div>
        </div>
    );
};
// --- END: Evaluator Profile Modal Component ---


const EvaluatorsList = () => {
    const navigate = useNavigate();
    const allEvaluators = getEvaluatorUsers(); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedEvaluator, setSelectedEvaluator] = useState(null); 
    const [selectedProblemStatement, setSelectedProblemStatement] = useState(null);
    const [evaluatorToManage, setEvaluatorToManage] = useState(null);
    
    const defaultProblemStatementId = "PS-GEN-001";
    const defaultDepartment = "Engineering";

    const handleViewProfileInModal = (evaluator) => setSelectedEvaluator(evaluator); 
    const handleCloseProfileModal = () => setSelectedEvaluator(null);
    const handleViewProblemStatementDetail = (problemStatementDetail, problemStatementId) => {
        setSelectedProblemStatement(problemStatementDetail || { id: problemStatementId, title: `Problem ID: ${problemStatementId}` });
    };
    const handleClosePSModal = () => setSelectedProblemStatement(null);
    const handleOpenManageModal = (evaluator) => setEvaluatorToManage(evaluator);
    const handleCloseManageModal = () => setEvaluatorToManage(null);
    const handleSaveChanges = (evaluatorId, updatedData) => {
        console.log("Saving data for evaluator:", evaluatorId, updatedData);
        handleCloseManageModal();
    };

    const filteredEvaluators = useMemo(() => {
        if (!searchTerm) return allEvaluators;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return allEvaluators.filter((evaluator) => {
            const nameToSearch = evaluator.name || evaluator.email; 
            const searchProblemId = evaluator.problemStatementId || defaultProblemStatementId;
            const searchDepartment = evaluator.department || defaultDepartment;
            return (
                nameToSearch.toLowerCase().includes(lowerCaseSearch) ||
                evaluator.email.toLowerCase().includes(lowerCaseSearch) ||
                evaluator.id.toLowerCase().includes(lowerCaseSearch) ||
                searchProblemId.toLowerCase().includes(lowerCaseSearch) ||
                searchDepartment.toLowerCase().includes(lowerCaseSearch)
            );
        });
    }, [allEvaluators, searchTerm, defaultProblemStatementId, defaultDepartment]);

    const columns = [
        { 
            header: 'ID', 
            cell: (row) => (
                <span className="font-mono text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    onClick={() => handleViewProfileInModal(row)} title={`View profile for ${row.name || row.email}`}>
                    {row.id} 
                </span>
            )
        },
        { 
            header: 'Name', 
            cell: (row) => (
                <span className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    onClick={() => handleViewProfileInModal(row)} title={`View profile for ${row.name || row.email}`}>
                    {row.name || row.email.split('@')[0] || 'N/A'} 
                </span>
            )
        }, 
        { 
            header: 'Problem ID',
            cell: (row) => (
                <span className="text-sm font-mono text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleViewProblemStatementDetail(row.problemStatementDetail, row.problemStatementId || defaultProblemStatementId)}
                    title={`View details for Problem ID: ${row.problemStatementId || defaultProblemStatementId}`}>
                    {row.problemStatementId || defaultProblemStatementId}
                </span>
            )
        },
        { header: 'Department', cell: (row) => (<span className="text-sm text-gray-700">{row.department || defaultDepartment}</span>) },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenManageModal(row)} className="flex items-center">
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
            <div className="relative max-w-lg">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text" placeholder="Search by name, email, ID, problem ID, or department..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <DataTable columns={columns} data={filteredEvaluators} />
            <EvaluatorDetailModal evaluator={selectedEvaluator} onClose={handleCloseProfileModal} />
            <ProblemStatementDetailModal problemStatement={selectedProblemStatement} onClose={handleClosePSModal} />
            <ManageEvaluatorModal
                evaluator={evaluatorToManage} onClose={handleCloseManageModal}
                onSave={handleSaveChanges} defaultProblemStatementId={defaultProblemStatementId}
            />
        </div>
    );
};

export default EvaluatorsList;