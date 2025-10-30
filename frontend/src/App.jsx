import Login from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Home from "./pages/Home"
import SdDashboard from './pages/student/SdDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/student" element={<SdDashboard />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
