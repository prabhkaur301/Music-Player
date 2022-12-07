import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
const Searchbar = () => {
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm]= useState("");

  const handleSubmit= (e)=>{
    e.preventDefault(); //prevent reloading of page on form submission

    navigate(`/search/${searchTerm}`);

  }
  return (
    <form 
    onSubmit={handleSubmit}
    className="p-2 text-gray-300 focus-within:text-gray-500">
      <label htmlFor="search-field" className="sr-only">
        Search all songs...
      </label>
      <div className="flex flex-row justify-start items-center bg-white/20 opacity-40 backdrop-blur-lg rounded-lg ">
        <FiSearch className="w-6 h-6 ml-4" />
        <input
          name="search-field"
          id="search-field"
          value={searchTerm}
          placeholder="Search Songs Here..."
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white p-4 placeholder-gray-300" />

      </div>
    </form>
  )
};

export default Searchbar;
