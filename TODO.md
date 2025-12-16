# Fixes Applied

- [x] Fixed TimeRangeButton not defined in SubmissionsChart.jsx by defining it as a component.
- [x] Changed backend port from 8001 to 8000 to match frontend API calls.
- [x] Added minWidth={0} and minHeight={250} to ResponsiveContainer in EvaluationChart.jsx to fix recharts warnings.
- [x] Added minWidth={0} to ResponsiveContainer in SubmissionsChart.jsx (minHeight was already there).
- [x] Started the backend server using `cd backend && npm run dev`.

# Remaining Issues

- Authentication errors (401 Unauthorized) for /cookie and auth - likely because user is not logged in or cookie not set.
- 500 Internal Server Error for /get_all_users - backend logic issue.
- Connection errors should be resolved now that backend is running on correct port.
