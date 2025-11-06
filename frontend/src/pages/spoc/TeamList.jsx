import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { URL } from "../../Utils";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaClipboardList, FaUser } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
function TeamList() {
    const [FullTeam, setFullTeam] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [activeView, setActiveView] = useState("teamlist");
    const [spoc_id, setspoc_id] = useState()
    const [fetched, setfetched] = useState(false)
    const [fetch_team_members, setfetch_team_members] = useState([])
    const [fetched_s, setfetched_s] = useState(true)
    const [team_id, setteam_id] = useState()

    const navigate = useNavigate();

    const [teamFormData, setTeamFormData] = useState({
        teamName: "",
        members: [
            { role: "Team Lead", name: "", email: "", phone: "", gender: "" },
            { role: "Member 1", name: "", email: "", phone: "", gender: "" },
            { role: "Member 2", name: "", email: "", phone: "", gender: "" },
            { role: "Member 3", name: "", email: "", phone: "", gender: "" },
        ],
    });
    axios.defaults.withCredentials = true
    axios.get(`${URL}/cookie`).then(res => setspoc_id(res.data.ID));

    // Fetch all teams

    console.log(spoc_id);

    function allteams() {
        console.log(spoc_id);

        axios
            .post(`${URL}/fetch_teams/${spoc_id}`)
            .then((res) => {
                setFullTeam(res.data), console.log(res), setfetched(true);
            })
            .catch((err) => console.error("Error fetching teams:", err));
    }

    // Navigate to selected team
    function SelectedTeam(team) {
        navigate(`/spoc/team_details`, { state: { id: team.ID } });
    }

    useEffect(() => {
        if (spoc_id) {

            allteams();
        }
    }, [spoc_id]);

    // Handle form
    const handleMemberChange = (index, field, value) => {
        setTeamFormData((prev) => ({
            ...prev,
            members: prev.members.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            ),
        }));
        console.log(teamFormData);

    };

    const handleEditMembers = (e) => {
        console.log(e);
        // console.log(FullTeam[e]);
        axios.post(`${URL}/fetch_team_members`, { id: e.ID }).then(res => {
            setteam_id(e.ID)
            setfetch_team_members(res.data)
            setTeamFormData({
                teamName: e.NAME,
                members: [
                    { role: "Team Lead", name: res.data[0].NAME, email: res.data[0].EMAIL, phone: res.data[0].PHONE, gender: res.data[0].GENDER },
                    { role: "Member 1", name: res.data[1].NAME, email: res.data[1].EMAIL, phone: res.data[1].PHONE, gender: res.data[1].GENDER },
                    { role: "Member 2", name: res.data[2].NAME, email: res.data[2].EMAIL, phone: res.data[2].PHONE, gender: res.data[2].GENDER },
                    { role: "Member 3", name: res.data[3].NAME, email: res.data[3].EMAIL, phone: res.data[3].PHONE, gender: res.data[3].GENDER }
                ]
            })
        })
        setShowCreateTeamModal(true)
        setfetched_s(false)
    }

    console.log(team_id);


    const handleCreateTeam = (e) => {
        e.preventDefault();

        if (e.target[18].innerText == "Update team") {
            let load = toast.loading("Updating team...")
            console.log(teamFormData);
            axios.post(`${URL}/update_team`, { team: teamFormData, id: team_id })
                .then(res => {
                    if (res.data == "Updated") {
                        toast.dismiss(load)
                        toast.success("Updated !")
                        setShowCreateTeamModal(false)
                    }
                })
        }
        else {

            // Show loading toast
            const loadingToast = toast.loading('Creating team...');
            let mailToast;
            setTimeout(() => {
                toast.dismiss(loadingToast);
                mailToast = toast.loading('Sending mails...');

            }, 2000);
            axios
                .post(`${URL}/add_members/${spoc_id}`, teamFormData)
                .then((res) => {
                    if (res.status === 200) {
                        // Dismiss loading toast and show success toast
                        toast.dismiss(mailToast)
                        toast.success('Mail sent successfully!', {
                            duration: 3000,
                            position: 'top-right',
                            style: {
                                backgroundColor: "green",
                                color: "white"
                            }
                        });
                        toast.success('Team created successfully!', {
                            duration: 3000,
                            position: 'top-right',
                        });

                        setShowCreateTeamModal(false);
                        setTeamFormData({
                            teamName: "",
                            members: [
                                { role: "Team Lead", name: "", email: "", phone: "", gender: "" },
                                { role: "Member 1", name: "", email: "", phone: "", gender: "" },
                                { role: "Member 2", name: "", email: "", phone: "", gender: "" },
                                { role: "Member 3", name: "", email: "", phone: "", gender: "" },
                            ],
                        });
                        allteams();
                    }
                })
                .catch((error) => {
                    // Dismiss loading toast and show error toast
                    toast.dismiss(loadingToast);
                    toast.error('Failed to create team. Please try again.', {
                        duration: 4000,
                        position: 'top-right',
                    });
                    console.error("Error creating team:", error);
                });
        }
    };

    const tableVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };


    const deleteteam = (team) => {
        if (window.confirm("Confirm delete ?")) {
            // console.log("hee");
            const del = toast.loading("Deleting team")

            axios.post(`${URL}/delete_team`, { id: team.ID })
                .then(res => {
                    console.log(res);
                    allteams();
                    toast.dismiss(del)
                    toast.success("Team deleted")
                })
                .catch(error => {
                    console.error("Error deleting team:", error);
                    toast.error('Failed to delete team');
                });
        }
    }




    return (
        <div className="flex bg-gray-50 min-h-screen relative">
            {/* Toast Container */}
            <Toaster />



            {/* ===== Main Content ===== */}
            <div className="flex-1 m-30 mt-30">
                <AnimatePresence mode="wait">
                    {!selectedTeam ?
                        <motion.div
                            key="team-list"
                            variants={tableVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4 ">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Team List
                                </h2>
                                <button
                                    onClick={() => setShowCreateTeamModal(true)}
                                    className="bg-[#fc8f00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                >
                                    + Create Team
                                </button>
                            </div>
                            {!fetched ? <div className="rounded  bg-white shadow-sm p-8 text-center">
                                <svg
                                    className="mx-auto h-8 w-8 animate-spin text-[#0f62fe]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                <div className="mt-3 text-sm text-[#4a4a4a]">Loading Teams...</div>
                            </div> :

                                <div>{
                                    FullTeam.length == 0 ? <p>No Teams created</p> : <table className="min-w-full border border-gray-200">
                                        <thead className="bg-gray-100 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Team ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Team Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Lead Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Lead Phone
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" >Edit</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" >Delete</th>

                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {FullTeam.map((team) => (
                                                <tr
                                                    key={team.ID}

                                                    className="hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-700" onClick={() => SelectedTeam(team)}>{team.ID}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900" onClick={() => SelectedTeam(team)}>
                                                        {team.NAME}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600" onClick={() => SelectedTeam(team)}>
                                                        {team.LEAD_EMAIL}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600" onClick={() => SelectedTeam(team)}>
                                                        {team.LEAD_PHONE}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-green-600  text-center ">
                                                        <button onClick={() => handleEditMembers(team)}><FaRegEdit className="cursor-pointer" /></button>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-red-600 text-center ">
                                                        <button onClick={() => deleteteam(team)}> <IoTrashBinOutline className="cursor-pointer" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                } </div>
                            }
                        </motion.div>
                        : ""}

                </AnimatePresence>
            </div>

            {/* ===== Modal ===== */}
            {showCreateTeamModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">
                                Create New Team
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateTeamModal(false), setfetched_s(true),
                                        setTeamFormData({
                                            teamName: "",
                                            members: [
                                                { role: "Team Lead", name: "", email: "", phone: "", gender: "" },
                                                { role: "Member 1", name: "", email: "", phone: "", gender: "" },
                                                { role: "Member 2", name: "", email: "", phone: "", gender: "" },
                                                { role: "Member 3", name: "", email: "", phone: "", gender: "" },
                                            ],
                                        })
                                }}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateTeam}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    value={teamFormData.teamName}
                                    onChange={(e) =>
                                        setTeamFormData({ ...teamFormData, teamName: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                    placeholder="Enter team name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                    Team Members
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {teamFormData.members.map((member, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                        >
                                            <h5 className="font-medium text-gray-700 mb-3">
                                                {member.role}
                                            </h5>

                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) =>
                                                        handleMemberChange(index, "name", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                                    placeholder="Name"
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    value={member.email}
                                                    onChange={(e) =>
                                                        handleMemberChange(index, "email", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                                    placeholder="Email"
                                                    required
                                                />
                                                <input
                                                    type="tel"
                                                    value={member.phone}
                                                    onChange={(e) =>
                                                        handleMemberChange(index, "phone", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                                    placeholder="Phone"
                                                    required
                                                />
                                                <select
                                                    value={member.gender}
                                                    onChange={(e) =>
                                                        handleMemberChange(index, "gender", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateTeamModal(false), setfetched_s(true),
                                            setTeamFormData({
                                                teamName: "",
                                                members: [
                                                    { role: "Team Lead", name: "", email: "", phone: "", gender: "" },
                                                    { role: "Member 1", name: "", email: "", phone: "", gender: "" },
                                                    { role: "Member 2", name: "", email: "", phone: "", gender: "" },
                                                    { role: "Member 3", name: "", email: "", phone: "", gender: "" },
                                                ],
                                            }), setteam_id(0)
                                    }}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#fc8f00] text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    {fetched_s ? "Create team" : "Update team"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default TeamList;
