import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { FiUser, FiLogOut, FiMenu, FiCheckCircle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const AdminHeader = ({ setIsOpen }) => {
    const handleLogout = () => {
    performLogout();
  };

    const [email, setEmail] = useState('');

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const base = import.meta.env.VITE_API_URL || '';
          const res = await fetch(`${base}/cookie`, { method: 'GET', credentials: 'include' });
          if (!res.ok) return; // silently fail and keep fallback
          const json = await res.json();
          console.log(json);
          
          const userEmail = json?.EMAIL || json?.email || json?.Email || null;
          if (userEmail) setEmail(userEmail);
        } catch (err) {
          // ignore and keep fallback
          // eslint-disable-next-line no-console
          console.debug('Could not fetch user cookie', err);
        }
      };

      fetchUser();
    }, []);

  const navigate = useNavigate();

  // Calls backend logout endpoint, clears storage and redirects to login
  const performLogout = async () => {
    try {
      const base = import.meta.env.VITE_API_URL || '';
      await fetch(`${base}/logout`, { method: 'GET', credentials: 'include' });
    } catch (err) {
      console.error('Logout request failed', err);
    }

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // ignore
    }

    // show a professional, friendly custom toast then redirect after 2s
    toast.custom((t) => (
      <div className={`max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-3 flex items-start gap-3 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="text-green-600 mt-1"><FiCheckCircle className="w-6 h-6" /></div>
        <div>
          <div className="font-semibold text-gray-900">Logged out successfully</div>
          <div className="text-sm text-gray-500">You will be redirected to the login page shortly.</div>
        </div>
      </div>
    ), { duration: 2000 });

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <header className="sticky top-0 z-10 bg-[#4A4A4A] shadow-md border-b border-[#5A5A5A]">
      <Toaster position="top-right" />
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
            <span className="font-medium">{email}</span>
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
