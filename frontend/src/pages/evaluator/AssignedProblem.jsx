import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils";
import { FiPlus } from "react-icons/fi";

const mockProblems = [
  
];

const AssignedProblem = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedProblems = async () => {
      // simulated "little bit" loading delay for UX
      await new Promise(resolve => setTimeout(resolve, 600));

      try {
        // 1. Get Local Storage (newly created items)
        const localProblems = JSON.parse(localStorage.getItem('temp_assigned_problems') || '[]');

        // 2. Mock Data
        let displayProblems = [...mockProblems];

        // 3. Try Background Fetch (Real Data)
        const userRes = await axios.get(`${URL}/cookie`, { withCredentials: true });
        const userData = userRes.data;
        const userId = userData?.ID || userData?.id;

        if (userId) {
          console.log(userId);
          
          try {
            const res = await axios.get(`${URL}/problems/evaluator/${userId}`);
            // console.log(res.data);
            
            if (res.data.problems && res.data.problems.length > 0) {
              displayProblems = res.data.problems;
              // console.log(res.data.problems);
              
            }
          } catch (fetchErr) {
            console.warn("Backend fetch failed, using mock/local", fetchErr);
          }
        }

        // Combine: Local created items first, then fetched/mock items
        const combined = [ ...displayProblems];

        console.log(combined);
        
        // simple dedup by ID just in case
        const unique = combined.filter((v, i, a) => a.findIndex(t => (t.ID === v.ID)) === i);

        setProblems(unique);
      } catch (err) {
        console.error("Error loading problems", err);
        setProblems([...mockProblems]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedProblems();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-6 py-8 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A202C] mb-1">
            Assigned Problem Statements
          </h1>
          <p className="text-[#718096] text-sm">
            View manage your assigned problem statements.
          </p>
        </div>
        <Link to="/evaluator/AddProblemStatement">
          <button className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-white px-5 py-2.5 rounded-xl shadow-md transition-all">
            <FiPlus className="text-lg" />
            Create New
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F7F8FC] text-[#4A5568]">
              <tr>
                <th className="p-4 font-semibold">PS ID</th>
                <th className="p-4 font-semibold">PS Title</th>
                <th className="p-4 text-center font-semibold">No. of Submissions</th>
                <th className="p-4 text-center font-semibold">DeadLine</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-[#E2E8F0]">
                
              {problems.length > 0 ? (
                problems.map((problem) => (
                  <tr key={problem.ID} className="hover:bg-[#F9FAFB] border-t border-[#E2E8F0] transition-all">
                    <td className="p-4 text-[#1A202C] font-medium">
                      SFS_{problem.ID}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-[#1A202C]">{problem.TITLE}</div>
                      <div className="text-xs text-[#718096]">{problem.DEPT}</div>
                    </td>
                    <td className="p-4 text-center text-[#1A202C]">
                      {problem.submission_count || 0}
                    </td>
                    <td className="p-4 text-center text-[#718096]">
                      {problem?.SUB_DEADLINE?.split('T')[0] || "N/A"}
                    </td>
                    <td className="p-4 text-center font-medium">
                      <button
                        onClick={() => navigate(`/evaluator/submissions?problemId=${problem.ID}`)}
                        className="bg-[#2B6CB0] hover:bg-[#2c5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Submissions
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No problems assigned to you yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div >
  );
};

export default AssignedProblem;
