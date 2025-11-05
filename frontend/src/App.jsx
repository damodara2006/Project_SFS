import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const token = getCookie("token");
    setIsAuthenticated(!!token);
  }, []);

  // react-hot-toast will display messages, no custom DOM toast needed

  function ProtectedRoute({ children }) {
    useEffect(() => {
      if (!isAuthenticated) toast.error("Please login to your account");
    }, [isAuthenticated]);

    if (!isAuthenticated) return <Navigate to="/" replace />;
    return children;
  }

  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<About />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/login" element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        } />

        <Route path="/register" element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        } />

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

        <Route path="/spoc/team_details/:id" element={
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
