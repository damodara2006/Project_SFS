import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList, FaTasks } from "react-icons/fa";

const EvaluatorNavbar = () => {
  return (
    <aside className="w-52 bg-[#494949] text-white p-6 fixed h-full">
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/evaluator"
              end
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaClipboardList className="mr-3" />
              Assigned Problem
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/evaluator/submissions"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaTasks className="mr-3" />
              Submissions
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default EvaluatorNavbar;