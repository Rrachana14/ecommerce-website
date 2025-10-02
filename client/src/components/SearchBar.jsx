import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger the search function passed as a prop
  };

  return (
    <div className="w-full flex items-center justify-center p-2 ">
      <div className="w-full flex items-center justify-center  px-4 max-w-lg p-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder || "Search..."}
          className="outline-none w-full h-full  border-none mr-6 font-mono"
        />
        <div className="w-fit text-gray-500">
          <i class="ri-search-line"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
