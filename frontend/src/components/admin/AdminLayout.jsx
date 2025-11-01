// src/components/admin/AdminLayout.jsx
import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
          <Outlet /> {/* Renders the current Admin page component */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;