// src/pages/admin/ProblemStatementCreate.jsx
import React from 'react';
import ProblemStatementForm from './ProblemStatementForm'; // We'll define a shared form component

const ProblemStatementCreate = () => {
  // Use a shared form component for Create and Edit
  return <ProblemStatementForm isCreate={true} />;
};

export default ProblemStatementCreate;