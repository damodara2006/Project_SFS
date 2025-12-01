import React from 'react';
import { FiMenu } from 'react-icons/fi';

const AdminMobileHeader = ({ setIsOpen }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:hidden">
      <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
        aria-label="Open sidebar"
      >
        <FiMenu size={24} />
      </button>
    </header>
  );
};


export default AdminMobileHeader;