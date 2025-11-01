// src/components/admin/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  let colorClass = 'bg-gray-100 text-gray-800'; // Default

  switch (status) {
    case 'Open':
    case 'Verified':
    case 'Submitted':
    case 'Evaluated':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Pending':
    case 'In Review':
    case 'Under Evaluation':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Closed':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;