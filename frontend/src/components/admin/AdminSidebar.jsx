import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiCheckSquare, FiX } from 'react-icons/fi';
import yourLogo from '../../assets/image.png';

const NavItem = ({ to, icon, children, isExpanded, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center h-12 text-gray-200 transition-colors duration-200 
       hover:text-primary-accent hover:bg-[#3b3b3b] ${
        isActive ? 'text-primary-accent font-semibold border-l-4 border-primary-accent bg-[#3b3b3b]' : ''
      }`
    }
  >
    <div className="w-20 h-full flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <span
      className={`whitespace-nowrap transition-opacity duration-200 ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </span>
  </NavLink>
);

const AdminSidebar = ({ isMobileOpen, setMobileOpen, isExpanded, setIsExpanded }) => {
  const closeMobileSidebar = () => setMobileOpen(false);

  return (
<<<<<<< HEAD
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={`hidden bg-[#4A4A4A] lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* --- LOGO SECTION --- */}
        <div className="flex h-20 items-center justify-center flex-shrink-0 overflow-hidden border-b border-[#5A5A5A] px-4">
          <img
            src={yourLogo}
            alt="Solve for Sakthi Logo"
            className="w-full max-h-12 object-contain transition-all duration-300 brightness-110"
          />
        </div>

        <nav className="flex-grow mt-6">
          <NavItem to="/admin/dashboard" icon={<FiHome size={20} />} isExpanded={isExpanded}>
            Dashboard
          </NavItem>
          <NavItem to="/admin/problems" icon={<FiFileText size={20} />} isExpanded={isExpanded}>
            Problem Statements
          </NavItem>
          <NavItem to="/admin/evaluators" icon={<FiUsers size={20} />} isExpanded={isExpanded}>
            Evaluators
          </NavItem>
          <NavItem to="/admin/spoc-approvals" icon={<FiCheckSquare size={20} />} isExpanded={isExpanded}>
            SPOC Requests
          </NavItem>
        </nav>
      </aside>

      {/* --- MOBILE SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#4A4A4A] transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 border-b border-[#5A5A5A] px-4">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button onClick={closeMobileSidebar} className="p-2 text-gray-400 hover:text-primary-accent">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-grow mt-6" onClick={closeMobileSidebar}>
          <NavItem to="/admin/dashboard" icon={<FiHome size={20} />} isExpanded={true}>
            Dashboard
          </NavItem>
          <NavItem to="/admin/problems" icon={<FiFileText size={20} />} isExpanded={true}>
            Problem Statements
          </NavItem>
          <NavItem to="/admin/evaluators" icon={<FiUsers size={20} />} isExpanded={true}>
            Evaluators
          </NavItem>
          <NavItem to="/admin/spoc-approvals" icon={<FiCheckSquare size={20} />} isExpanded={true}>
            SPOC Requests
          </NavItem>
        </nav>
      </aside>
    </>
=======
    <div className="h-screen w-64 bg-[#4a4a4a] fixed lg:relative top-0 left-0 z-20 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-black text-white tracking-wider">
          Solve for Sakthi
        </h1>
      </div>
      <nav className="p-4 space-y-2 overflow-auto flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? 'bg-[#fc8f00] text-white shadow-lg' : 'text-[#ffffffb3] hover:bg-[#fc8f00] hover:text-white'}`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
>>>>>>> 42e6b4e022e695f1ac5bb9cbe1fb2e97d9e56440
  );
};

export default AdminSidebar;
