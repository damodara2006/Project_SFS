import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EvaluatorSidebar from './EvaluatorSidebar';
import EvaluatorHeader from './EvaluatorHeader';

const EvaluatorLayout = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EvaluatorSidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300 ease-in-out">
        <EvaluatorHeader setIsOpen={setMobileSidebarOpen} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EvaluatorLayout;
