import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

// --- Mock Data (In a real app, you would fetch this data) ---

const mockProblemDetails = {
  id: 'prob-01',
  title: 'Implement a Real-Time Chat Application',
  description: 'The objective is to build a full-stack chat application where users can send and receive messages in real-time. The backend should handle user authentication and message broadcasting, while the frontend should provide a clean user interface for a seamless user experience.',
  evaluatorId: 'EVAL-789',
  points: 100,
  difficulty: 'Medium'
};

const mockSubmissions = [
  { id: 'sub-001', studentName: 'Alice Johnson', status: 'Accepted' },
  { id: 'sub-002', studentName: 'Bob Williams', status: 'Pending' },
  { id: 'sub-003', studentName: 'Charlie Brown', status: 'Rejected' },
  { id: 'sub-004', studentName: 'Diana Miller', status: 'Accepted' },
];

// --- The Main Page Component ---

function ProblemStatementPage() {
  // Get the problem ID from the URL, e.g., "/problem/prob-01"
  const { id } = useParams(); 
  // Hook to programmatically navigate the user
  const navigate = useNavigate(); 

  // This function returns a color for the status chip based on the status text
  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // This function is called when the "View Details" button is clicked for a submission
  const handleViewSubmission = (submissionId) => {
    // Navigates the user to the specific submission's page
    navigate(`/submission/${submissionId}`);
  };

  return (
    <Box sx={{ padding: 3, fontFamily: 'Roboto, sans-serif' }}>
      {/* Page Header */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: '600', marginBottom: 3 }}>
        Problem Statement Details
      </Typography>

      {/* Section for Problem Details */}
      <Paper elevation={2} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: '500', marginBottom: 2 }}>
          {mockProblemDetails.title}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
          {mockProblemDetails.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, marginTop: 2 }}>
          <Typography variant="subtitle1">
            <strong>Evaluator ID:</strong> {mockProblemDetails.evaluatorId}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Difficulty:</strong> {mockProblemDetails.difficulty}
          </Typography>
        </Box>
      </Paper>

      {/* Section for Submissions Table */}
      <Typography variant="h5" component="h2" sx={{ fontWeight: '500', marginBottom: 2 }}>
        Submissions
      </Typography>
      <Paper elevation={2}>
        <TableContainer>
          <Table aria-label="submissions table">
            <TableHead sx={{ backgroundColor: '#f7f9fc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: '600' }}>Submission ID</TableCell>
                <TableCell sx={{ fontWeight: '600' }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: '600' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSubmissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell component="th" scope="row">
                    {submission.id}
                  </TableCell>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={submission.status} 
                      color={getStatusChipColor(submission.status)} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewSubmission(submission.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ProblemStatementPage;
