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
    {
      header: 'College Name',
      accessor: 'collegeName',
      cell: (row) => <span className="text-[#4a4a4a]">{row.collegeName}</span>,
    },
    {
      header: 'SPOC Email',
      accessor: 'email',
      cell: (row) => <span className="text-[#4a4a4a]">{row.email}</span>,
    },
    {
      header: 'Date Requested',
      cell: (row) => (
        <span className="text-[#4a4a4a]">{new Date(row.dateRequested).toLocaleDateString()}</span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <div className="text-[#4a4a4a]">
          <StatusBadge status={row.status} />
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleApprove(row)}
            className="flex items-center bg-[#fc8f00] text-[#ffffff] hover:opacity-95"
          >
            <FiCheck className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleReject(row)}
            className="flex items-center bg-[#ffffff] text-[#4a4a4a] border border-gray-200 hover:bg-gray-50"
          >
            <FiX className="w-4 h-4 mr-1" /> Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white text-[#4a4a4a] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-[#4a4a4a]">SPOC Approval Requests</h1>
        <div className="mt-2 h-1 w-24 rounded bg-[#fc8f00]" />
        <p className="mt-3 text-sm text-[#4a4a4a] opacity-80 max-w-3xl">
          Review and verify college SPOC (Single Point of Contact) requests. Approval creates the necessary College and SPOC User accounts.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
        <DataTable columns={columns} data={pendingRequests} />
      </div>
    </div>
  );
};

export default SpocApprovals;