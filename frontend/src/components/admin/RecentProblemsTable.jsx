/**
 * @file RecentProblemsTable.jsx
 * @description A table displaying recent problem statements with a live search filter.
 */

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { mockProblemStatements } from "../../mockData";

const fetchProblems = async () => {
  const response = await axios.get("http://localhost:8000/get_problems", {
    timeout: 8000,
  });
  return response.data.problems;
};

const RecentProblemsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchProblems();
        const list =
          Array.isArray(data) && data.length > 0 ? data : mockProblemStatements;

        // ✔ Sorting using numeric part of ID (descending)
        const sorted = [...list].sort((a, b) => {
          const numA = parseInt((a.ID || a.id)?.toString().replace(/\D/g, ""), 10);
          const numB = parseInt((b.ID || b.id)?.toString().replace(/\D/g, ""), 10);
          return numB - numA;
        });

        setProblems(sorted);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError(true);

        // Fallback with same sorting logic
        const sortedMock = [...mockProblemStatements].sort((a, b) => {
          const numA = parseInt((a.ID || a.id)?.toString().replace(/\D/g, ""), 10);
          const numB = parseInt((b.ID || b.id)?.toString().replace(/\D/g, ""), 10);
          return numB - numA;
        });

        setProblems(sortedMock);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ✔ Filter + Limit Only 5
  const filteredProblems = problems
    .filter((p) =>
      (p.TITLE || p.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleClick = (id) => {
    console.log("Problem clicked:", id);
    // navigate(`/problem/${id}`);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-brand-dark">Recent Problems</h2>

        <div className="relative w-full sm:w-64 mt-3 sm:mt-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-6 text-center text-sm text-gray-500">
          Loading recent problems...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  ID
                </th>
                <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Title
                </th>
                <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Evaluator ID
                </th>
                <th className="py-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Submissions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProblems.map((p) => {
                const id = p.ID || p.id;
                const title = p.TITLE || p.title;
                const evaluator =
                  p.assignedEvaluators?.[0] || p.EVALUATOR_ID || "N/A";
                const submissions = p.SUBMISSIONS ?? p.submissions ?? "-";

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="py-3 pr-3 text-sm font-mono text-brand-orange font-semibold">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(id);
                        }}
                        className="hover:underline"
                      >
                        SFS_{id}
                      </a>
                    </td>
                    <td className="py-3 pr-3 text-sm text-brand-dark">
                      {title}
                    </td>
                    <td className="py-3 pr-3 text-sm text-gray-600">
                      {evaluator}
                    </td>
                    <td className="py-3 pr-3 text-sm text-brand-orange font-semibold">
                      {submissions}
                    </td>
                  </tr>
                );
              })}

              {filteredProblems.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-sm text-gray-500"
                  >
                    {error
                      ? "Unable to load data from server."
                      : "No matching problems found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default RecentProblemsTable;
