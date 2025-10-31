import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TeamList() {
    const [active, setActive] = useState("Team Details");
    const [selectedTeam, setSelectedTeam] = useState(null);

    const tabs = ["Problem Statements", "My Submission", "Team Details", "Team List"];

    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const teams = [
        {
            id: "T001",
            name: "Alpha Coders",
            leadEmail: "aarav.mehta@example.com",
            leadPhone: "+91 98765 43210",
            members: [
                { role: "Team Lead", name: "Aarav Mehta", email: "aarav.mehta@example.com", phone: "+91 98765 43210", gender: "Male" },
                { role: "Frontend Developer", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 99887 65432", gender: "Female" },
                { role: "Backend Developer", name: "Rohan Das", email: "rohan.das@example.com", phone: "+91 91234 56789", gender: "Male" },
            ],
        },
        {
            id: "T002",
            name: "Tech Titans",
            leadEmail: "neha.verma@example.com",
            leadPhone: "+91 97654 32109",
            members: [
                { role: "Team Lead", name: "Neha Verma", email: "neha.verma@example.com", phone: "+91 97654 32109", gender: "Female" },
                { role: "FullStack Developer", name: "Aditya", email: "aditya@example.com", phone: "+91 98567 89012", gender: "Male" },
                { role: "QA Engineer", name: "Kavya Reddy", email: "kavya.reddy@example.com", phone: "+91 93456 78901", gender: "Female" },
            ],
        },
    ];

    return (
        <div className="min-h-screen mx-10">
            <main className="flex-1 p-6">
                <div className="max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="bg-gray-100 rounded-md p-3 mb-4 flex justify-center">
                        <div className="flex gap-2 relative">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActive(tab)}
                                    className={`px-6 py-2 rounded-md font-medium transition relative ${active === tab ? "bg-white shadow text-[#4a4a4a]" : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {active === "Team Details" && (
                            <motion.div
                                key="team-details"
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mt-4 bg-white p-4 rounded-lg shadow">
                                    {!selectedTeam ? (
                                        <>
                                            <h2 className="text-lg font-semibold mb-4">Team List</h2>
                                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                <thead className="bg-gray-100 border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team ID</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team Name</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead Email</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead Phone</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {teams.map((team) => (
                                                        <tr
                                                            key={team.id}
                                                            className="hover:bg-gray-50 transition cursor-pointer"
                                                            onClick={() => setSelectedTeam(team)}
                                                        >
                                                            <td className="px-6 py-4 text-sm text-gray-700">{team.id}</td>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{team.name}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">{team.leadEmail}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">{team.leadPhone}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg font-semibold">{selectedTeam.name} - Members</h2>
                                                <button
                                                    onClick={() => setSelectedTeam(null)}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    ← Back to Teams
                                                </button>
                                            </div>

                                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                <thead className="bg-gray-100 border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {selectedTeam.members.map((m, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4 text-sm text-gray-700">{m.role}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">{m.name}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">{m.email}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">{m.phone}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">{m.gender}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default TeamList;
