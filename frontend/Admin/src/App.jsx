import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProblemStatementPage from './pages/ProblemStatementPage';

// Placeholder components for routes
const AdminDashboard = () => <div>Admin Dashboard</div>;
const SubmissionDetails = () => <div>Submission Details</div>;

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* You can wrap this in a layout component if you have one */}
        <Routes>
          <Route path="/" element={<ProblemStatementPage />} />
          {/* This is the new route for your page */}
          <Route path="/problem/:id" element={<ProblemStatementPage />} />
          <Route path="/submission/:id" element={<SubmissionDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
