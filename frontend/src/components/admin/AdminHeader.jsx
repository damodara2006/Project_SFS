import React from 'react';
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';

const AdminHeader = ({ setIsOpen }) => {
  const handleLogout = () => {
    alert("Logout functionality goes here!");
  };

  return (
    <header className="sticky top-0 z-10 bg-[#4A4A4A] shadow-md border-b border-[#5A5A5A]">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-md p-2 text-gray-200 hover:text-primary-accent hover:bg-[#3b3b3b] lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="ml-2 text-lg font-bold text-white tracking-wide">
            Admin Panel
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="hidden sm:flex items-center text-sm text-gray-200">
            <FiUser className="mr-2 h-5 w-5 text-primary-accent" />
            <span className="font-medium">admin@sakthi.com</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center rounded-md border border-[#5A5A5A] bg-[#3b3b3b] px-3 py-2 text-sm font-medium text-gray-200 hover:bg-primary-accent hover:text-white transition-colors duration-200"
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
