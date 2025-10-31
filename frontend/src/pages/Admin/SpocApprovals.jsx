import React, { useState } from 'react';
import StatusBadge from '../../components/StatusBadge.jsx';
import Modal from '../../components/Modal.jsx';
import { mockSpocRequests } from '../../mockData.js';

const SpocApprovals = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This will filter the data based on which tab is selected
  const filteredData = mockSpocRequests.filter(item => item.status === activeTab);

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 hover:bg-light-gray-bg">
      <td className="p-4 text-secondary-text">{item.id}</td>
      <td className="p-4 font-medium text-secondary-text">{item.name}</td>
      <td className="p-4"><StatusBadge status={item.status} /></td>
      <td className="p-4 space-x-2">
        {item.status === 'Pending' && (
          <>
            <button onClick={() => setIsModalOpen(true)} className="font-medium text-sm text-primary-green hover:underline">Approve</button>
            <button className="font-medium text-sm text-red-600 hover:underline">Reject</button>
          </>
        )}
      </td>
    </tr>
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-dark-text mb-6">SPOC Approvals</h1>
      
      <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
              <button onClick={() => setActiveTab('Pending')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Pending' ? 'border-primary-yellow text-dark-text' : 'border-transparent text-gray-500'}`}>
                  Pending
              </button>
              <button onClick={() => setActiveTab('Verified')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Verified' ? 'border-primary-yellow text-dark-text' : 'border-transparent text-gray-500'}`}>
                  Verified
              </button>
          </nav>
      </div>

      <div className="bg-white rounded-large shadow-card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-table-header-bg">
              <th className="p-4 font-semibold text-sm text-red-800 uppercase">SPOC ID</th>
              <th className="p-4 font-semibold text-sm text-red-800 uppercase">Institution Name</th>
              <th className="p-4 font-semibold text-sm text-red-800 uppercase">Status</th>
              <th className="p-4 font-semibold text-sm text-red-800 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>{filteredData.map(item => renderRow(item))}</tbody>
        </table>
      </div>
      
      <Modal title="Approve SPOC & Create Credentials" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
            <p>You are about to approve <span className="font-bold">Knowledge Institute of Technology</span>.</p>
            <div>
                <label className="block text-sm font-medium text-gray-700">Generated SPOC ID</label>
                <input type="text" readOnly value="S526" className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Generated Password</label>
                <input type="text" readOnly value="aBcD123XyZ" className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="px-4 py-2 bg-primary-green text-white rounded-lg" onClick={() => setIsModalOpen(false)}>Confirm & Approve</button>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default SpocApprovals;