// src/pages/admin/SpocApprovals.jsx
import React from 'react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import Button from '../../components/common/button';
import { getSpocRequests } from '../../mockData';
import { FiCheck, FiX } from 'react-icons/fi';

const SpocApprovals = () => {
  const pendingRequests = getSpocRequests();

  // Mock API call handlers
  const handleApprove = (request) => {
    console.log(`Approving SPOC for ${request.collegeName}`);
    // In a real app: API call to create College and SPOC User, then update request status
    alert(`Mock: Approved SPOC for ${request.collegeName}. Credentials sent.`);
  };

  const handleReject = (request) => {
    console.log(`Rejecting SPOC for ${request.collegeName}`);
    // In a real app: API call to update request status to 'Rejected'
    alert(`Mock: Rejected SPOC for ${request.collegeName}.`);
  };

  const columns = [
    { header: 'College Name', accessor: 'collegeName' },
    { header: 'SPOC Email', accessor: 'email' },
    { header: 'Date Requested', cell: (row) => new Date(row.dateRequested).toLocaleDateString() },
    { header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="primary" size="sm" onClick={() => handleApprove(row)} className="flex items-center">
            <FiCheck className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleReject(row)} className="flex items-center">
            <FiX className="w-4 h-4 mr-1" /> Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">SPOC Approval Requests</h1>
      <p className="text-gray-600">Review and verify college SPOC (Single Point of Contact) requests. Approval creates the necessary College and SPOC User accounts.</p>

      <DataTable columns={columns} data={pendingRequests} />
    </div>
  );
};

export default SpocApprovals;