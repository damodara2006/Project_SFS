
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaUser } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SpocDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const teamsPerPage = 10;

    // Dummy data for teams
    const teams = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
        leader: `Leader ${i + 1}`,
        submitted: i % 2 === 0 ? 'Submitted' : 'Not Submitted',
    }));

    const totalTeams = teams.length;
    const totalTeamsSubmitted = teams.filter(team => team.submitted === 'Submitted').length;

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(teams.length / teamsPerPage); i++) {
        pageNumbers.push(i);
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const tableVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-1 pt-20">
                {/* Sidebar */}
                <aside className="w-48 bg-[#494949] text-white p-6">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                                    <FaUsers className="mr-3" />
                                    Dashboard
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                                    <FaClipboardList className="mr-3" />
                                    Problems
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                                    <FaUser className="mr-3" />
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">SPOC Dashboard</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Teams</h2>
                            <p className="text-4xl font-bold text-[#fc8f00]">{totalTeams}</p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Teams Submitted</h2>
                            <p className="text-4xl font-bold text-[#fc8f00]">{totalTeamsSubmitted}</p>
                        </motion.div>
                    </div>

                    {/* Teams Table */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg"
                        variants={tableVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Teams List</h2>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Leader</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTeams.map((team) => (
                                    <tr key={team.id}>
                                        <td className="py-2 px-4 border-b border-gray-200">{team.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{team.leader}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${team.submitted === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {team.submitted}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="py-3 flex justify-center">
                            <nav className="block">
                                <ul className="flex pl-0 rounded list-none flex-wrap">
                                    {pageNumbers.map(number => (
                                        <li key={number}>
                                            <a
                                                onClick={() => paginate(number)}
                                                href="#"
                                                className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative border border-solid border-gray-300 rounded-full ${currentPage === number ? 'bg-[#fc8f00] text-white' : 'text-gray-800'}`}
                                            >
                                                {number}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default SpocDashboard;
