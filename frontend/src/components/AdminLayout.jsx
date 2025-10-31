import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar.jsx';

const AdminLayout = () => {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#E5E5E5]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Window Header */}
        <div className="h-10 bg-gray-100 flex items-center px-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        <AdminNavbar />

        {/* This Outlet component is where the actual page content will be rendered */}
        <main className="p-6 md:p-8 bg-light-gray-bg min-h-[calc(100vh-124px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;