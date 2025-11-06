import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// General Component Imports
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProblemStatements from "./components/ProblemStatements.jsx";

// Student Imports
import SdDashboard from "./pages/student/SdDashboard";
import Upload from "./pages/student/Upload";

// SPOC Imports
import SpocDashboard from "./pages/spoc/SpocDashboard";
import SPOCProfile from "./pages/spoc/SPOCProfile";

// Evaluator Imports
import EvaluatorLayout from "./pages/evaluator/EvaluatorLayout.jsx";
import AddProblemStatement from "./pages/evaluator/AddProblemStatement.jsx";

// Admin Imports
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import SpocApprovals from "./pages/Admin/SpocApprovals.jsx";

import EvaluatorsList from "./pages/Admin/EvaluatorsList.jsx";
import EvaluatorManage from "./pages/Admin/EvaluatorManage.jsx";
import ProblemStatementsList from "./pages/Admin/ProblemStatementsList.jsx";
import ProblemStatementCreate from "./pages/Admin/ProblemStatementCreate.jsx";
import ProblemStatementEdit from "./pages/Admin/ProblemStatementEdit.jsx";
import TeamDetails from "./pages/student/TeamDetails.jsx";
import Team_Members from "./pages/spoc/Team_Members.jsx";
import TeamList from "./pages/spoc/TeamList.jsx";
import AssignedProblem from "./pages/evaluator/AssignedProblem.jsx";
import SubmissionList from "./pages/evaluator/SubmissionList.jsx";
import SubmissionDetail from "./pages/evaluator/SubmissionDetail.jsx";
import { auth } from "./Utils.js";

function App() {
  
  
  

  const showToast = (message) => {
    const id = "app-toast";
    if (document.getElementById(id)) return;
    const el = document.createElement("div");
    el.id = id;
    el.textContent = message;
    Object.assign(el.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.8)",
      color: "#fff",
      padding: "10px 14px",
      borderRadius: "6px",
      zIndex: 9999,
      fontSize: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    });
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity 300ms";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300);
    }, 2500);
  };

  function ProtectedRoute({ children }) {
    // console.log(isAuthenticated);

    
      if (!auth()) showToast("Please login to your account") ;
   

    if (!auth()) return <div><Navigate to="/login" replace /></div>;
    return children;
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<About />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/student" element={
          <ProtectedRoute>
            <SdDashboard />
          </ProtectedRoute>
        } />

        <Route path="/spoc" element={
          <ProtectedRoute>
            <SpocDashboard />
          </ProtectedRoute>
        } />

        <Route path="/spoc/profile" element={
          <ProtectedRoute>
            <SPOCProfile />
          </ProtectedRoute>
        } />

        <Route path="/problemstatements" element={<ProblemStatements />} />

        <Route path="/student/submit-solution" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />

        <Route path="/spoc/team_details" element={
          <ProtectedRoute>
            <Team_Members />
          </ProtectedRoute>
        } />

        <Route path="/spoc/team" element={
          <ProtectedRoute>
            <TeamList />
          </ProtectedRoute>
        } />

        <Route path="/evaluator" element={
          <ProtectedRoute>
            <EvaluatorLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AssignedProblem />} />
          <Route path="submissions" element={<SubmissionList />} />
          <Route path="submission/:teamId" element={<SubmissionDetail />} />
                    <Route path="AddProblemStatement" element={<AddProblemStatement />}></Route>

        </Route>

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="spoc-approvals" element={<SpocApprovals />} />
          <Route path="problems" element={<ProblemStatementsList />} />
          <Route path="problems/create" element={<ProblemStatementCreate />} />
          <Route path="problems/edit/:id" element={<ProblemStatementEdit />} />
          <Route path="evaluators" element={<EvaluatorsList />} />
          <Route path="evaluators/create" element={<EvaluatorManage />} />
          <Route path="evaluators/manage/:id" element={<EvaluatorManage />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
