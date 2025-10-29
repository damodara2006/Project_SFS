import Login from "./components/Login"
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <>
    <div className="main-container flex flex-col content-center items-center gap-10 mt-20">

      <SearchBar />
      <Login />
    </div>
    </>
  )
}

export default App
