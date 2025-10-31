import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="w-full max-w-xl rounded shadow-lg bg-[#ffffff]">
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
            </div>
        </div>
    );
};

const ProblemStudent = () => {
    const [problems] = useState(sampleProblems);
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
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#4a4a4a]">Problems</h2>

            <div className="overflow-x-auto rounded border">
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
                        {problems.map((p) => (
                            <tr key={p.id}>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.id}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.title}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.date}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="rounded px-3 py-1 text-sm font-medium bg-[#fc8f00] text-[#ffffff]"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal open={isOpen} onClose={closeModal} title={selected ? selected.title : "Problem"}>
                {selected ? (
                    <div>
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>ID:</strong> {selected.id}
                        </div>
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>Date:</strong> {selected.date}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Description:</strong> {selected.description}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Category:</strong> {selected.category}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Theme:</strong> {selected.theme}
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">
                            <strong>Resources:</strong>{" "}
                            <a
                                className="hover:underline text-blue-600"
                                href={selected.resources}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {selected.resources}
                            </a>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleSubmit}
                                className="rounded px-3 py-1 text-sm font-medium bg-[#0f62fe] text-white"
                            >
                                Submit
                            </button>
                            <button
                                onClick={closeModal}
                                className="rounded px-3 py-1 text-sm font-medium bg-[#4a4a4a] text-[#ffffff]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-[#4a4a4a]">No problem selected.</div>
                )}
            </Modal>
        </div>
    );
};

export default ProblemStudent;
