import React from 'react';
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';

const AdminHeader = ({ setIsOpen }) => {
  const handleLogout = () => {
    alert("Logout functionality goes here!");
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="ml-2 text-lg font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-sm text-gray-600">
            <FiUser className="mr-2 h-5 w-5 text-gray-500" />
            <span className="font-medium">admin@sakthi.com</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <FiLogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;