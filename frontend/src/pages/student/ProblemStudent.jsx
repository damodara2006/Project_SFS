import { useState } from "react";

/* Hardcoded problem data */
const sampleProblems = [
    {
        id: "P-001",
        title: "Two Sum",
        posted: "2025-09-01",
        difficulty: "Easy",
        statement: "Return indices of the two numbers such that they add up to a specific target.",
    },
    {
        id: "P-002",
        title: "Reverse Linked List",
        posted: "2025-09-05",
        difficulty: "Medium",
        statement: "Reverse a singly linked list iteratively and recursively.",
    },
    {
        id: "P-003",
        title: "Path Sum",
        posted: "2025-09-10",
        difficulty: "Hard",
        statement: "Determine if the tree has a root-to-leaf path summing to given value.",
    },
    {
        id: "P-004",
        title: "Valid Parentheses",
        posted: "2025-09-12",
        difficulty: "Easy",
        statement: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input is valid.",
    },
    {
        id: "P-005",
        title: "Merge Intervals",
        posted: "2025-09-15",
        difficulty: "Medium",
        statement: "Given a collection of intervals, merge all overlapping intervals and return the result.",
    },
    {
        id: "P-006",
        title: "Word Ladder",
        posted: "2025-09-18",
        difficulty: "Hard",
        statement: "Given two words and a dictionary, find the length of shortest transformation sequence from beginWord to endWord.",
    },
    {
        id: "P-007",
        title: "LRU Cache",
        posted: "2025-09-20",
        difficulty: "Hard",
        statement: "Design and implement a data structure for Least Recently Used (LRU) cache with get and put operations in O(1) time.",
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

const difficultyClass = (difficulty) => {
    switch (difficulty) {
        case "Easy":
            return "bg-green-600 text-white";
        case "Medium":
            return "bg-yellow-600 text-white";
        case "Hard":
            return "bg-red-600 text-white";
        default:
            return "bg-gray-100 text-[#4a4a4a]";
    }
};

const ProblemStudent = () => {
    const [problems] = useState(sampleProblems);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (problem) => {
        setSelected(problem);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelected(null);
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
                            <th className="px-4 py-2 text-left text-sm font-medium">Posted</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Difficulty</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                        {problems.map((p) => (
                            <tr key={p.id}>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.id}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.title}</td>
                                <td className="px-4 py-3 text-sm text-[#4a4a4a]">{p.posted}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${difficultyClass(
                                            p.difficulty
                                        )}`}
                                    >
                                        {p.difficulty}
                                    </span>
                                </td>
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
                            <strong>Posted:</strong> {selected.posted}
                        </div>
                        <div className="mb-3">
                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${difficultyClass(
                                    selected.difficulty
                                )}`}
                            >
                                {selected.difficulty}
                            </span>
                        </div>
                        <div className="mt-4 text-sm text-[#4a4a4a]">{selected.statement}</div>
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
                    <div className="text-sm text-[#4a4a4a]">No problem selected.</div>
                )}
            </Modal>
        </div>
    );
};

export default ProblemStudent;
