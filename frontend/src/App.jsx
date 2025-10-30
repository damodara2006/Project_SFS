import Login from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Home from "./pages/Home"
import SdDashboard from './pages/student/SdDashboard';
import Upload from './pages/student/Upload';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/student" element={<SdDashboard />} />
        <Route path="/student/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
