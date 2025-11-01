// src/pages/admin/ProblemStatementsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/admin/StatusBadge';
import { mockProblemStatements, getEvaluatorUsers } from '../../mockData';
import { FiPlus, FiEdit, FiTrash2, FiUsers } from 'react-icons/fi';

const ProblemStatementsList = () => {
  const navigate = useNavigate();
  const evaluators = getEvaluatorUsers();

  // Mock API call handlers
  const handleEdit = (problem) => {
    navigate(`/admin/problems/edit/${problem.id}`);
  };

  const handleDelete = (problem) => {
    console.log(`Deleting problem statement: ${problem.title}`);
    // In a real app: API call to delete the problem
    alert(`Mock: Deleted Problem Statement: ${problem.title}`);
  };
  
  const getEvaluatorNames = (problem) => {
    return problem.assignedEvaluators
        .map(id => evaluators.find(e => e.id === id)?.email.split('@')[0])
        .join(', ');
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Deadline', cell: (row) => new Date(row.deadline).toLocaleDateString() },
    { header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
    { header: 'Assigned Evaluators', cell: (row) => (
        <span title={getEvaluatorNames(row)} className="text-sm flex items-center">
            <FiUsers className="mr-1" />
            {row.assignedEvaluators.length} Evaluator(s)
        </span>
    )},
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row)} className="flex items-center">
            <FiEdit className="w-4 h-4 mr-1" /> Edit
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
        <h1 className="text-3xl font-bold text-gray-900">Problem Statement Management</h1>
        <Button onClick={() => navigate('/admin/problems/create')} className="flex items-center">
          <FiPlus className="w-5 h-5 mr-1" /> Create New Problem
        </Button>
      </div>

      <p className="text-gray-600">Full CRUD control over all problem statements, including assignment to evaluators.</p>

      <DataTable columns={columns} data={mockProblemStatements} />
    </div>
  );
};

export default ProblemStatementsList;
