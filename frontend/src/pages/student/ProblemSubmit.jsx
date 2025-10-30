import { useState } from "react";

/* Hardcoded submission data */
const sampleSubmissions = [
    {
        id: "P-001",
        title: "Two Sum",
        date: "2025-09-01",
        status: "Accepted",
        details: "Return indices of the two numbers such that they add up to a specific target.",
    },
    {
        id: "P-002",
        title: "Reverse Linked List",
        date: "2025-09-05",
        status: "Pending",
        details: "Reverse a singly linked list iteratively and recursively.",
    },
    {
        id: "P-003",
        title: "Path Sum",
        date: "2025-09-10",
        status: "Rejected",
        details: "Determine if the tree has a root-to-leaf path summing to given value.",
    },
];

/* Simple modal */
const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded shadow-lg bg-[#ffffff]">
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
                    <h3 className="text-lg font-medium text-[#4a4a4a]">{title}</h3>
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

const statusClass = (status) => {
    switch (status) {
        case "Accepted":
            return "bg-[#4a4a4a] text-[#ffffff]";
        case "Pending":
            return "bg-[#fc8f00] text-[#ffffff]";
        case "Rejected":
            return "bg-[#ffffff] text-[#4a4a4a] border border-[#4a4a4a]";
        default:
            return "bg-[#ffffff] text-[#4a4a4a]";
    }
};

const ProblemSubmit = () => {
    const [submissions] = useState(sampleSubmissions);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (submission) => {
        setSelected(submission);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelected(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#4a4a4a]">My Submissions</h2>

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full divide-y">
                    <thead className="bg-[#4a4a4a] text-[#ffffff]">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                        {submissions.map((s) => (
                            <tr key={s.id}>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{s.id}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{s.title}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{s.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                                            s.status
                                        )}`}
                                    >
                                        {s.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => openModal(s)}
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

            <Modal open={isOpen} onClose={closeModal} title={selected ? selected.title : "Submission"}>
                {selected ? (
                    <div>
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>ID:</strong> {selected.id}
                        </div>
                        <div className="mb-3 text-sm text-[#4a4a4a]">
                            <strong>Date:</strong> {selected.date}
                        </div>
                        <div className="mb-3">
                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                                    selected.status
                                )}`}
                            >
                                {selected.status}
                            </span>
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">{selected.details}</div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded px-3 py-1 text-sm font-medium bg-[#4a4a4a] text-[#ffffff]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-[#4a4a4a]">No submission selected.</div>
                )}
            </Modal>
        </div>
    );
};

export default ProblemSubmit;
