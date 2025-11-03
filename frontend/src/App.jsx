import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- LAYOUT IMPORTS ---
// Your existing AdminLayout (which does NOT have a Header/Footer)
import AdminLayout from './components/admin/AdminLayout.jsx';
// The new MainLayout we just created (which DOES have a Header/Footer)
import MainLayout from './components/layout/MainLayout.jsx';

// General Page Imports
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";

// Student Imports
import SdDashboard from './pages/student/SdDashboard';
import Upload from "./pages/student/Upload";

// SPOC Imports
import SpocDashboard from "./pages/spoc/SpocDashboard";
import SPOCProfile from "./pages/spoc/SPOCProfile";

// Admin Page Imports
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import SpocApprovals from './pages/Admin/SpocApprovals.jsx';
import EvaluatorsList from './pages/Admin/EvaluatorsList.jsx';

import ProblemStatementsList from './pages/Admin/ProblemStatementsList.jsx';
import ProblemStatementCreate from './pages/Admin/ProblemStatementCreate.jsx';
import ProblemStatementEdit from './pages/Admin/ProblemStatementEdit.jsx';
import ProblemStatementDetail from './pages/Admin/ProblemStatementDetail.jsx';
import SubmissionDetail from './pages/Admin/SubmissionDetail.jsx';

function App() {
  const isAuthenticated = true; 
  return (
    <BrowserRouter>
      {/* The Header and Footer are now REMOVED from here */}
      <Routes>
        {/* --- MAIN SITE ROUTES (with Header and Footer) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<SdDashboard />} />
          <Route path="/spoc" element={<SpocDashboard />} />
          <Route path="/spoc/profile" element={<SPOCProfile />} />
          <Route path="/student/submit-solution" element={<Upload />} />
          {/* Add any other public-facing routes here */}
        </Route>

        {/* --- ADMIN ROUTES (NO Header or Footer, uses AdminLayout) --- */}
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="spoc-approvals" element={<SpocApprovals />} />
          <Route path="problems" element={<ProblemStatementsList />} />
          <Route path="problems/create" element={<ProblemStatementCreate />} />
          <Route path="problems/edit/:id" element={<ProblemStatementEdit />} />
          <Route path="problems/:id/details" element={<ProblemStatementDetail />} />
          <Route path="submissions/:id/details" element={<SubmissionDetail />} />
          <Route path="evaluators" element={<EvaluatorsList />} />
        
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;