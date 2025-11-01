// src/pages/admin/EvaluatorsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import RoleBadge from '../../components/admin/RoleBadge';
import { getEvaluatorUsers } from '../../mockData';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const EvaluatorsList = () => {
  const navigate = useNavigate();
  const evaluators = getEvaluatorUsers();

  // Mock API call handlers
  const handleEdit = (evaluator) => {
    // Navigate to a management page or open a modal
    navigate(`/admin/evaluators/manage/${evaluator.id}`);
  };

  const handleDelete = (evaluator) => {
    console.log(`Deleting evaluator: ${evaluator.email}`);
    // In a real app: API call to delete the user
    alert(`Mock: Deleted evaluator ${evaluator.email}`);
  };

  const columns = [
    { header: 'Email', accessor: 'email' },
    { header: 'Role', cell: (row) => <RoleBadge role={row.role} /> },
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

      <DataTable columns={columns} data={evaluators} />
    </div>
  );
};

export default EvaluatorsList;