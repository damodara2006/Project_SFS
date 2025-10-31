import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaClipboardList, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const SpocDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const teamsPerPage = 10;

    // Dummy data for teams
    const teams = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
        leader: `Leader ${i + 1}`,
        submitted: i % 2 === 0,
    }));

    const totalTeams = teams.length;
    const totalTeamsSubmitted = teams.filter(team => team.submitted).length;

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const totalPages = Math.ceil(teams.length / teamsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMenuItemClick = (action) => {
        setIsMenuOpen(false);
        console.log(`Navigating to: ${action}`);
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.4, ease: 'easeOut' } 
        }
    };

    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.4, delay: 0.2, ease: 'easeOut' } 
        }
    };

    const sidebarVariants = {
        hidden: { x: '-100%' },
        visible: { 
            x: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        exit: { 
            x: '-100%',
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    // Menu items configuration
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaUsers },
        { id: 'problems', label: 'Problems', icon: FaClipboardList },
        { id: 'profile', label: 'Profile', icon: FaUser }
    ];

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-15">
            {/* Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Matching the image design */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.aside
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 left-0 z-50 h-full w-48  shadow-2xl rounded-r-2xl"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        <div className="flex flex-col h-full py-8 w-full bg-gradient-to-b from-[#fc8f00] to-[#fca311] shadow-inner px-4"> 
                          
                                                        <nav className="flex-1 px-2">
                                                            <div className="space-y-1">
                                                                <div className='relative relative  h-12'>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleMenuItemClick('dashboard')}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 duration-200 focus:outline-none focus:ring-2  hover:-left-6 absolute -left-28 transition-all transition-all duration-300 focus:ring-white/50 bg-amber-800"
                                                                    >
                                                                        <span className="font-medium text-left text-sm">
                                                                            Dashboard
                                                                        </span>
                                                                        <FaUsers className="text-2xl flex-shrink-0" />
                                                                    </button>
                                                                </div>

                                                                <div className='relative relative  h-12'>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleMenuItemClick('problems')}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 duration-200 focus:outline-none focus:ring-2  hover:-left-5 absolute -left-28 transition-all transition-all duration-300 focus:ring-white/50 bg-amber-800"
                                                                    >
                                                                        <span className="font-medium text-left text-sm">
                                                                            Problems {""}
                                                                        </span>
                                                                        <FaClipboardList className="text-2xl pl-2 flex-shrink-0" />
                                                                    </button>
                                                                </div>

                                                                <div className='relative relative  h-12'>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleMenuItemClick('profile')}
                                                                        className=" w-28 flex items-center gap-2 py-3 px-5 text-white rounded-lg hover:bg-white/10 duration-200 focus:outline-none focus:ring-2  hover:-left-5 absolute -left-22 transition-all transition-all duration-300 focus:ring-white/50 bg-amber-800"
                                                                    >
                                                                        <span className="font-medium text-left text-sm pr-2">
                                                                            Profile
                                                                        </span>
                                                                        <FaUser className="text-2xl flex-shrink" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </nav>

                                                        {/* Resume Section at Bottom */}
                            <div className="px-2 mt-auto">
                                <button
                                    type="button"
                                    onClick={() => handleMenuItemClick('resume')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <svg 
                                        className="w-6 h-6 flex-shrink-0" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium text-left text-sm">
                                        Resume
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-8 px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header with Hamburger Menu */}
                    <div className="mb-8 flex items-center gap-4">
                        {/* Hamburger Toggle Button - Now inline with heading */}
                        <button
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            className="flex items-center justify-center w-12 h-12 bg-[#6B7280] hover:bg-[#4B5563] text-white rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fc8f00]"
                        >
                            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>

                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                SPOC Dashboard
                            </h1>
                            <p className="mt-1 text-gray-600">
                                Monitor and manage team submissions
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                                        Total Teams
                                    </h2>
                                    <p className="text-4xl font-bold text-[#fc8f00]">
                                        {totalTeams}
                                    </p>
                                </div>
                                <div className="bg-[#fc8f00]/10 p-4 rounded-full">
                                    <FaUsers className="text-3xl text-[#fc8f00]" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                                        Submissions
                                    </h2>
                                    <p className="text-4xl font-bold text-green-600">
                                        {totalTeamsSubmitted}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {((totalTeamsSubmitted / totalTeams) * 100).toFixed(1)}% completion
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-full">
                                    <FaClipboardList className="text-3xl text-green-600" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Teams Table */}
                    <motion.div
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                        variants={tableVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Teams List
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Showing {indexOfFirstTeam + 1}-{Math.min(indexOfLastTeam, totalTeams)} of {totalTeams} teams
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Team Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Leader
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentTeams.map((team, index) => (
                                        <motion.tr
                                            key={team.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {team.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">
                                                    {team.leader}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                        team.submitted
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {team.submitted ? 'Submitted' : 'Not Submitted'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <nav className="flex items-center justify-between" aria-label="Pagination">
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        Page <span className="font-medium">{currentPage}</span> of{' '}
                                        <span className="font-medium">{totalPages}</span>
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                        aria-label="Previous page"
                                    >
                                        Previous
                                    </button>
                                    
                                    {getPageNumbers().map((number, index) => (
                                        <React.Fragment key={index}>
                                            {number === '...' ? (
                                                <span className="px-3 py-2 text-sm text-gray-700">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handlePageChange(number)}
                                                    className={`px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00] ${
                                                        currentPage === number
                                                            ? 'bg-[#fc8f00] text-white'
                                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    aria-current={currentPage === number ? 'page' : undefined}
                                                    aria-label={`Go to page ${number}`}
                                                >
                                                    {number}
                                                </button>
                                            )}
                                        </React.Fragment>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                        aria-label="Next page"
                                    >
                                        Next
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default SpocDashboard;
