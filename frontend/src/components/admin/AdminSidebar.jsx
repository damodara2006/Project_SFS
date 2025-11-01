// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiClipboard, FiUser, FiUsers, FiCheckCircle } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
  { name: 'Problem Statements', icon: FiClipboard, path: '/admin/problems' },
  { name: 'Evaluators', icon: FiUser, path: '/admin/evaluators' },
  { name: 'SPOC Requests', icon: FiCheckCircle, path: '/admin/spoc-approvals' },
  // { name: 'Teams (Mgmt)', icon: FiUsers, path: '/admin/teams' }, // Future Admin Feature
];

const AdminSidebar = () => {
  const baseClasses = "flex items-center px-4 py-3 rounded-xl transition duration-200 ease-in-out text-base font-medium";
  const activeClasses = "bg-indigo-700 text-white shadow-lg";
  const inactiveClasses = "text-indigo-200 hover:bg-indigo-700 hover:text-white";

  return (
    <div className="h-full w-64 bg-indigo-800 fixed lg:relative z-20">
      <div className="p-6">
        <h1 className="text-2xl font-black text-white tracking-wider">
          Solve for Sakthi
        </h1>
        <p className="text-sm text-indigo-300">Admin Panel</p>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;