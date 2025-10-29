import Login from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
