import React from 'react'; // It's good practice to import React
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// General Component Imports
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Student Imports
import SdDashboard from './pages/student/SdDashboard';
import Upload from "./pages/student/Upload";

// SPOC Imports
import SpocDashboard from "./pages/spoc/SpocDashboard";
import SPOCProfile from "./pages/spoc/SPOCProfile";

// Admin Imports 
import AdminLayout from './components/admin/AdminLayout.jsx'; 
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import SpocApprovals from './pages/Admin/SpocApprovals.jsx'; 
import EvaluatorsList from './pages/Admin/EvaluatorsList.jsx'; 
import EvaluatorManage from './pages/Admin/EvaluatorManage.jsx'; 
import ProblemStatementsList from './pages/Admin/ProblemStatementsList.jsx'; 
import ProblemStatementCreate from './pages/Admin/ProblemStatementCreate.jsx'; 
import ProblemStatementEdit from './pages/Admin/ProblemStatementEdit.jsx';

function App() {
  const isAuthenticated = true;
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<SdDashboard />} />
        <Route path="/spoc" element={<SpocDashboard />} />
        <Route path="/spoc/profile" element={<SPOCProfile />} />
        <Route path="/student/submit-solution" element={<Upload />} />
      
      {/* --- COMPLETE ADMIN ROUTING BLOCK --- */}
        <Route 
            path="/admin" 
            element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          {/* Default Admin Route */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="spoc-approvals" element={<SpocApprovals />} />
          
          {/* Problem Statement Management (CRUD) */}
          <Route path="problems" element={<ProblemStatementsList />} />
          <Route path="problems/create" element={<ProblemStatementCreate />} />
          <Route path="problems/edit/:id" element={<ProblemStatementEdit />} />

          {/* Evaluator Management (CRUD & Assignment) */}
          <Route path="evaluators" element={<EvaluatorsList />} />
          <Route path="evaluators/create" element={<EvaluatorManage />} /> {/* For creation */}
          <Route path="evaluators/manage/:id" element={<EvaluatorManage />} /> {/* For assignment/editing */}
        </Route>
        {/* --- END ADMIN ROUTING BLOCK --- */}
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;