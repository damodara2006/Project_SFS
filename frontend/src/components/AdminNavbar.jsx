import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
// If you have a logo in `src/assets`, you can uncomment the next line
// import Logo from '../assets/logo.png'; 

const NavItem = ({ to, children }) => {
  // These class names use Tailwind CSS.
  // 'primary-yellow' and other custom colors should be defined in your tailwind.config.js
  const activeClassName = "bg-primary-yellow rounded-md text-dark-text";
  const inactiveClassName = "text-secondary-text";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? activeClassName : inactiveClassName}`
      }
    >
      {children}
    </NavLink>
  );
};

const AdminNavbar = () => {
  return (
    <nav className="bg-white flex items-center justify-between px-6 py-3 border-b border-gray-200">
      <div className="flex items-center space-x-8">
        {/* You can use an img tag like the one below if you have a logo file */}
        {/* <img src={Logo} alt="Logo" className="h-8" /> */}
        <span className="font-bold text-xl text-gray-800">SAKTHI AUTO</span>
        
        <div className="hidden md:flex items-center space-x-4">
          <NavItem to="/admin/dashboard">Dashboard</NavItem>
          <NavItem to="/admin/problem-statements">Problem Statements</NavItem>
          <NavItem to="/admin/evaluators">Evaluator</NavItem>
          <NavItem to="/admin/spoc-approvals">SPOC-Approval</NavItem>
        </div>
      </div>
      <div className="flex items-center">
        {/* This is a placeholder for the user profile icon */}
        <FaUserCircle className="text-3xl text-blue-500" />
      </div>
    </nav>
  );
};

export default AdminNavbar;