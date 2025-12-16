import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EvaluatorSidebar from './EvaluatorSidebar';
import EvaluatorHeader from './EvaluatorHeader';

const EvaluatorLayout = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // Match admin behaviour: hover-expand desktop sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <EvaluatorSidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <EvaluatorHeader setIsOpen={setMobileSidebarOpen} />
        <main className="p-6 lg:p-8">
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
