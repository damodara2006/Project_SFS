// src/mockData.js

export const mockUsers = [
  { id: 'u1', email: 'admin@sakthi.com', role: 'Admin', collegeId: null, teamName: null },
  { id: 'u2', email: 'eval1@sakthi.com', role: 'Evaluator', collegeId: null, teamName: null },
  { id: 'u3', email: 'eval2@sakthi.com', role: 'Evaluator', collegeId: null, teamName: null },
  { id: 'u4', email: 'spoc1@collegea.edu', role: 'SPOC', collegeId: 'c1', teamName: null },
  { id: 'u5', email: 'team1@collegea.edu', role: 'Team', collegeId: 'c1', teamName: 'Innovators' },
];

export const mockColleges = [
  { id: 'c1', name: 'College A', spocId: 'u4', status: 'Verified' },
  { id: 'c2', name: 'College B', spocId: 'u6', status: 'Pending' },
];

export const mockProblemStatements = [
  {
    id: 'p1',
    title: 'Optimizing CNC Machining Efficiency',
    description: 'Develop a machine learning model to predict and minimize tool wear...',
    deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
    status: 'Open',
    assignedEvaluators: ['u2', 'u3'],
  },
  {
    id: 'p2',
    title: 'Supply Chain Risk Assessment Dashboard',
    description: 'Create a web-based dashboard for visualizing and assessing material supplier risks.',
    deadline: new Date(Date.now() + 86400000 * 60).toISOString(),
    status: 'In Review',
    assignedEvaluators: ['u3'],
  },
];

export const mockSpocRequests = [
  {
    id: 'req1',
    collegeName: 'College C',
    email: 'reqspoc@collegec.edu',
    dateRequested: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'Pending',
  },
  {
    id: 'req2',
    collegeName: 'College D',
    email: 'reqspoc2@colleged.edu',
    dateRequested: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'Pending',
  },
];

export const mockSubmissions = [
  { id: 's1', problemId: 'p1', teamId: 'u5', status: 'Submitted' },
  { id: 's2', problemId: 'p1', teamId: 'u8', status: 'Under Evaluation' },
  { id: 's3', problemId: 'p2', teamId: 'u9', status: 'Evaluated' },
];

export const getProblemStatementById = (id) =>
  mockProblemStatements.find((p) => p.id === id);

export const getEvaluatorUsers = () =>
  mockUsers.filter((u) => u.role === 'Evaluator');

export const getSpocRequests = () =>
    mockSpocRequests.filter((r) => r.status === 'Pending');