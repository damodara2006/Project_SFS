import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaPen } from 'react-icons/fa';
import Modal from '../../components/Modal.jsx';
import { mockEvaluators } from '../../mockData.js';

const EvaluatorsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // This function defines how each row in our table will look
  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 hover:bg-light-gray-bg">
      <td className="p-4 text-secondary-text">{item.id}</td>
      <td className="p-4 font-medium text-secondary-text">{item.name}</td>
      <td className="p-4 text-secondary-text">{item.email}</td>
      <td className="p-4 text-secondary-text">{item.assignedProblems}</td>
      <td className="p-4">
        <button 
            onClick={() => navigate(`/admin/evaluators/manage/${item.id}`)} 
            className="font-medium text-sm text-primary-green hover:underline flex items-center gap-1"
        >
            <FaPen size={12} /> Manage
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-dark-text">Evaluators</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700">
          <FaPlus /> Add New Evaluator
        </button>
      </div>
      
      <div className="bg-white rounded-large shadow-card overflow-x-auto">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-table-header-bg">
                    <th className="p-4 font-semibold text-sm text-red-800 uppercase">Evaluator ID</th>
                    <th className="p-4 font-semibold text-sm text-red-800 uppercase">Name</th>
                    <th className="p-4 font-semibold text-sm text-red-800 uppercase">Email</th>
                    <th className="p-4 font-semibold text-sm text-red-800 uppercase"># Assigned</th>
                    <th className="p-4 font-semibold text-sm text-red-800 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>{mockEvaluators.map(item => renderRow(item))}</tbody>
        </table>
      </div>
      
      <Modal title="Create New Evaluator" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-green text-white rounded-lg" onClick={() => setIsModalOpen(false)}>Create</button>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default EvaluatorsList;