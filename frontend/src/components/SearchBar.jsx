import {useState} from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle input change
  const onChange = () => (e) => {
    setSearchTerm(e.target.value);
  }
  // Function to handle search input at backend
  const handleSearch =(e)=>{
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
  }

  // JSX for Search Bar
  return (
    <>
      <div className="search-bar flex items-center justify-center gap-5 w-[30 rem]">
        <input
          type="text" placeholder="Search..."
          className="w-88 h-10 focus:outline-gray-200 bg-white backdrop-blur-xl p-2 rounded-3xl shadow-lg "
          onChange={onChange()} />
        <button type="submit" className="bg-[#fc8f00] text-white font-semibold py-2 rounded-md mx-4 p-4 hover:bg-amber-600" onClick={handleSearch}>Search</button>
      </div>
    </>
  )
}

export default SearchBar