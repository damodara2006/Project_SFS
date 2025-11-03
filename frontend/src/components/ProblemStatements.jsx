import {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 👈 Added motion for animation
import axios from "axios";


/* Hardcoded problem data */
const sampleProblems = [
    {
        id: "P-001",
        title: "Smart Waste Management System Using IoT and AI",
        date: "2025-09-01",
        description:
            "Develop an IoT-based system integrated with AI algorithms to monitor, classify, and optimize waste collection in urban and rural areas. The system should help local authorities plan efficient routes and reduce environmental pollution.",
        category: "Smart City / IoT / AI",
        theme: "Smart Automation for Sustainable Cities",
        resources: "https://www.sih.gov.in/problem-statements",
    },
    {
        id: "P-002",
        title: "Predictive Healthcare System for Early Disease Detection",
        date: "2025-09-05",
        description:
            "Design a healthcare analytics platform that leverages machine learning to predict potential health issues based on patient records, wearable data, and environmental factors. The system should provide early warnings and connect users to nearby medical facilities.",
        category: "Healthcare / Machine Learning",
        theme: "AI-Powered Health Solutions",
        resources: "https://www.sih.gov.in/problem-statements",
    },
    {
        id: "P-003",
        title: "Blockchain-Based Student Credential Verification System",
        date: "2025-09-10",
        description:
            "Create a blockchain-driven platform for educational institutions to issue, verify, and share student certificates securely. The system should prevent fraud and ensure transparency during recruitment or higher education admission processes.",
        category: "Blockchain / Education",
        theme: "Digital Transformation in Education",
        resources: "https://www.sih.gov.in/problem-statements",
    },
];

/* Simple modal */
const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div
                className="w-full max-w-xl rounded shadow-lg bg-[#ffffff]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
                    <h3 className="text-lg text-[#4a4a4a] font-bold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100 text-[#4a4a4a]"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </motion.div>
        </div>
    );
};
const fetchProblems = async () => {
    try {
        const response = await axios.get('http://localhost:8000/get_problems');
        console.log("Fetched problems:", response.data);
        return response.data.problems;
    }
    catch (error) {
        console.error("Error fetching problems:", error);
        return [];
    }
}

const ProblemStatements = () => {
    const [problems,setProblems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = (problem) => {
        setSelected(problem);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelected(null);
    };
    
    const handleSubmit = () => {
        if (!selected) return;
        const params = new URLSearchParams({ problemId: selected.id });
        navigate(`/student/submit-solution?${params.toString()}`);
    };

    // ✨ Animation Variants (matching dashboard style)
    const pageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const tableVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    };
     
    useEffect(()=>{
        const loadProblems = async () => {
            const data = await fetchProblems();
            console.log("Setting problems:", data);
            setProblems(data);
        };
        loadProblems();
    },[])

    return (
        <motion.div
            className="p-4"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-2xl font-semibold mb-4 text-[#4a4a4a]">Problems</h2>

            <motion.div
                className="overflow-x-auto rounded border bg-white shadow-sm"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <table className="min-w-full divide-y">
                    <thead className="bg-[#4a4a4a] text-[#ffffff]">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                        {problems.map((p, index) => (
                            <motion.tr
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.ID}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.TITLE}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.SUB_DATE}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="rounded px-3 py-1 text-sm font-medium bg-[#fc8f00] text-[#ffffff] hover:bg-[#e57f00]"
                                    >
                                        View
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <Modal open={isOpen} onClose={closeModal} title={selected ? selected.TITLE : "Problem"}>
                {selected ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>ID:</strong> {selected.ID}
                        </div>
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>Date:</strong> {selected.SUB_DATE}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Description:</strong> {selected.DESCRIPTION}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Category:</strong> {selected.CATEGORY}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Department:</strong> {selected.DEPT}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Resources:</strong>{" "}
                            <a
                                className="hover:underline text-blue-600"
                                href={selected.Links}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {selected.Links}
                            </a>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleSubmit}
                                className="rounded px-3 py-1 text-sm font-medium bg-[#0f62fe] text-white hover:bg-[#0053d8]"
                            >
                                Submit
                            </button>
                            <button
                                onClick={closeModal}
                                className="rounded px-3 py-1 text-sm font-medium bg-[#4a4a4a] text-[#ffffff] hover:bg-[#333333]"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-sm text-[#4a4a4a]">No problem selected.</div>
                )}
            </Modal>
        </motion.div>
    );
};

export default ProblemStatements;
