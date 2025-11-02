// src/pages/admin/EvaluatorsList.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import RoleBadge from '../../components/admin/RoleBadge';
import { getEvaluatorUsers } from '../../mockData';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX } from 'react-icons/fi';

// --- START: Simple Modal Component (for demonstration, ideally in its own file) ---
const EvaluatorDetailModal = ({ evaluator, onClose }) => {
    if (!evaluator) return null;

    //  REFINED FALLBACK: Use name, then email, then a default string.
    const displayName = evaluator.name || evaluator.email || 'No Name Provided';

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-start mb-4">
                    {/* Use the dynamic displayName in the header for context */}
                    <h2 className="text-2xl font-bold text-gray-800">Profile: {displayName}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition"
                        aria-label="Close"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-500">
                        Name: 
                        <span className="font-semibold text-gray-900 block text-lg">
                            {/* Display the provided name, or if missing, fall back to email. */}
                            {evaluator.name || evaluator.email}
                        </span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">ID: <span className="font-mono text-indigo-600">{evaluator.id}</span></p>
                    <p className="text-sm font-medium text-gray-500">Email: <span className="text-gray-700">{evaluator.email}</span></p>
                    <p className="text-sm font-medium text-gray-500">Role: <RoleBadge role={evaluator.role} /></p>
                    
                    {/* Mock Data for Records */}
                    <div className="pt-3 border-t mt-3">
                        <p className="text-md font-bold text-gray-700">Records Overview</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                            <li>Total Submissions Graded: **45**</li>
                            <li>Average Grade Score: **88.5%**</li>
                            <li>Active Projects: **3**</li>
                        </ul>
                    </div>
                </div>

                {/* 'Back' / Close Button in the Footer */}
                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose} variant="secondary">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};
// --- END: Simple Modal Component ---

const EvaluatorsList = () => {
  const navigate = useNavigate();
  const allEvaluators = getEvaluatorUsers();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedEvaluator, setSelectedEvaluator] = useState(null); 

  const handleViewProfileInModal = (evaluator) => {
    setSelectedEvaluator(evaluator); 
  };
  
  const handleCloseModal = () => {
    setSelectedEvaluator(null);
  };


  // Mock API call handlers (unchanged)
  const handleEdit = (evaluator) => {
    navigate(`/admin/evaluators/manage/${evaluator.id}`);
  };

  const handleDelete = (evaluator) => {
    console.log(`Deleting evaluator: ${evaluator.email}`);
    alert(`Mock: Deleted evaluator ${evaluator.email}`);
  };

  // Filtering Logic (extended to include 'name' fallback)
  const filteredEvaluators = useMemo(() => {
    if (!searchTerm) return allEvaluators;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return allEvaluators.filter(
      (evaluator) => {
            const nameToSearch = evaluator.name || evaluator.email; // Fallback for searching
            return (
                nameToSearch.toLowerCase().includes(lowerCaseSearch) ||
                evaluator.email.toLowerCase().includes(lowerCaseSearch) ||
                evaluator.id.toLowerCase().includes(lowerCaseSearch)
            );
        }
    );
  }, [allEvaluators, searchTerm]);


  const columns = [
    // Name column: Displays name, falls back to email prefix, then 'N/A'
    { 
        header: 'Name', 
        cell: (row) => (
            <span className="font-medium text-gray-900">
                {row.name || row.email.split('@')[0] || 'N/A'} 
            </span>
        )
    }, 
    { header: 'Email', accessor: 'email' },
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
    { header: 'ID', accessor: 'id' },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row)} className="flex items-center">
            <FiEdit className="w-4 h-4 mr-1" /> Manage
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row)} className="flex items-center">
            <FiTrash2 className="w-4 h-4 mr-1" /> Delete
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

      <p className="text-gray-600">Full control over Evaluator accounts, including credential generation, editing, and deletion.</p>

      {/* Search Input */}
      <div className="relative max-w-lg">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Pass Filtered Data to DataTable */}
      <DataTable columns={columns} data={filteredEvaluators} />

      {/* Render the Modal based on state */}
      <EvaluatorDetailModal 
          evaluator={selectedEvaluator} 
          onClose={handleCloseModal} 
      />
    </div>
  );
};

export default EvaluatorsList;