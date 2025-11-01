// src/components/admin/RoleBadge.jsx
import React from 'react';

const RoleBadge = ({ role }) => {
  let colorClass = 'bg-gray-200 text-gray-900'; // Default

  switch (role) {
    case 'Admin':
      colorClass = 'bg-red-600 text-white';
      break;
    case 'Evaluator':
      colorClass = 'bg-blue-200 text-blue-800';
      break;
    case 'SPOC':
      colorClass = 'bg-purple-200 text-purple-800';
      break;
    case 'Team':
      colorClass = 'bg-green-200 text-green-800';
      break;
    default:
      colorClass = 'bg-gray-200 text-gray-900';
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase ${colorClass}`}>
      {role}
    </span>
  );
};

export default RoleBadge;
