import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
    // THE FIX: Added 'pt-20' to push the entire container down by 5rem (80px),
    // creating space for the fixed <Header /> component.
    <div className="min-h-screen bg-gray-100 font-sans pt-20">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      {/* This margin still correctly corresponds to the sidebar's width */}
      <div className="ml-64">
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;