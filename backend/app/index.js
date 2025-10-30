import express from 'express';


const backend = express();

backend.listen(Process .env.BACKEND_PORT, () => {
  console.log(`Backend server is running on port ${Process.env.BACKEND_PORT}`);
});