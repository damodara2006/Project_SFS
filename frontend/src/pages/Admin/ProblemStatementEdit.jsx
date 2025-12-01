/**
 * @file ProblemStatementEdit.jsx
 * @description A form for administrators to edit an existing problem statement.
 */
// src/pages/admin/ProblemStatementEdit.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemStatementForm from './ProblemStatementForm';
import { getProblemStatementById } from '../../mockData';

const ProblemStatementEdit = () => {
  const { id } = useParams();
  const problem = getProblemStatementById(id);

  if (!problem) {
    return <div className="text-center py-10 text-red-600">Problem Statement Not Found</div>;
  }

  // Use a shared form component for Create and Edit, passing initial data
  return <ProblemStatementForm isCreate={false} initialData={problem} />;
};

export default ProblemStatementEdit;
