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
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-3 w-full max-w-xl bg-white/20 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg transition-shadow hover:shadow-xl focus-within:ring-2 focus-within:ring-amber-300">
          <div className="flex items-center gap-3 flex-1">
            <svg className="w-5 h-5 text-[#fc8f00] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-transparent placeholder-gray-300 text-gray-900 focus:outline-none text-sm"
              onChange={onChange()}
            />
          </div>

          <button
            type="submit"
            onClick={handleSearch}
            className="ml-2 bg-gradient-to-r from-[#fc8f00] to-amber-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:scale-105 transform transition-all duration-150"
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default SearchBar