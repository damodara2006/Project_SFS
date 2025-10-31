import Login from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Home from "./pages/Home"
import SdDashboard from './pages/student/SdDashboard';
import Upload from "./pages/student/Upload"
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/student" element={<SdDashboard />} />
        <Route path="/student/submit-solution" element={<Upload />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
