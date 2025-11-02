
import React from 'react';
import { Outlet } from 'react-router-dom';
import EvaluatorNavbar from './EvaluatorNavbar';

const EvaluatorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 pt-20">
        <EvaluatorNavbar />
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EvaluatorLayout;
