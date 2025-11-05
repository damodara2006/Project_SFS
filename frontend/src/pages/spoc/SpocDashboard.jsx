import React, { useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaUser } from 'react-icons/fa';
import ProblemStatements from "../../components/ProblemStatements"
import SPOCProfile from './SPOCProfile';
import TeamList from './TeamList';
import axios from 'axios';
import {URL} from '../../Utils';
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaUsers },
    { id: 'problems', label: 'Problems', icon: FaClipboardList },
    { id: 'teamdetails', label: 'Team Details', icon: FaUser },
    { id: 'profile', label: 'Profile', icon: FaUser },
];


const NavItem = ({ item, activeView, onClick }) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;
    return (
        <li className="mb-2">
            <button
                onClick={() => onClick(item.id)}
                className={`w-full flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition ${
                    isActive ? 'bg-gray-700' : ''
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-pressed={isActive}
            >
                <Icon className="mr-3" />
                <span>{item.label}</span>
            </button>
        </li>
    );
};

const SpocDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeView, setActiveView] = useState('dashboard');
    const teamsPerPage = 10;
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    
    const handlelogout = async () => {

        try {
            console.log("hey");
            axios.defaults.withCredentials = true;
            await axios.get(`${URL}/logout`)
                .then(res => console.log(res),
                    navigate("/")
                )
        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${URL}/cookie`).then(res => {
      console.log(res);
      
      if (res.data.message == 'jwt must be provided') {
        toast.error("Please login")
      }
      setdata(res.data)
    })
  },[])

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
            <Toaster position="top-right" />
            <div className="flex flex-1 pt-20">
                {/* Sidebar */}
                <aside className="w-56 bg-[#494949] text-white p-6 sticky top-20 h-[calc(100vh-5rem)]">
                    <nav aria-label="Main navigation">
                        <ul className="mt-2">
                            {navItems.map(item => (
                                <NavItem key={item.id} item={item} activeView={activeView} onClick={setActiveView} />
                            ))}
                        </ul>
                    </nav>
                    <p className='absolute bottom-16'>
                    {data.NAME }
                    </p>
                      {data.NAME?          
                <div> <button onClick={handlelogout} className=' cursor-pointer py-2 px-2 rounded-sm mb-2 bg-white text-black  absolute bottom-0'>LOGOUT</button></div>:""}

                </aside>    

                {/* Main Content */}
                <main className="flex-1 p-10">
                    {activeView === 'dashboard' && (
                        <>
                            {/* <div> <button onClick={handlelogout} className=' cursor-pointer py-2 px-2 rounded-sm mb-2 bg-gray-300'>LOGOUT</button></div> */}
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
                                    <nav className="block" aria-label="Pagination">
                                        <ul className="flex pl-0 rounded list-none flex-wrap">
                                            {pageNumbers.map(number => (
                                                <li key={number}>
                                                    <a
                                                        onClick={(e) => { e.preventDefault(); paginate(number); }}
                                                        href="#"
                                                        className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative border border-solid border-gray-300 rounded-full ${currentPage === number ? 'bg-[#fc8f00] text-white' : 'text-gray-800'}`}
                                                        aria-current={currentPage === number ? 'page' : undefined}
                                                    >
                                                        {number}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>

                                
                            </motion.div>
                        </>
                    )}

                   

                    {activeView === 'problems' && <ProblemStatements />}
                    {activeView === 'profile' && <SPOCProfile />}
                    {activeView === 'teamdetails' && <TeamList />}
                </main>
            </div>
        </div>
    );
};

export default SpocDashboard;
