import React, { useState, useEffect, useRef } from 'react';
import { useSidebarContext } from '../contexts/Sidebarcontext';
import { logo } from '../assets';

const SearchBar = ({ records, onSearch }) => {

  const { toggleSidebar } = useSidebarContext();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]); // Clear suggestions when query is empty
      return;
    }
    // Filter suggestions based on query
    const filteredSuggestions = records.filter((record) =>
      record.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]); // Hide suggestions when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'k') {
      setSuggestions([]); // Hide suggestions on Ctrl+K
    }
  };

  return (
     
    <div ref={searchRef} className="relative w-1/2 sm:w-1/3 flex items-center drop-shadow-xl">
  <input
    type="text"
    className="px-6 py-3 w-full  bg-zinc-800 border border-zinc-900 text-white rounded-xl focus:outline-none focus:border-blue-500"
    placeholder="Enter Keywords"
    value={query}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
  />
  {suggestions.length > 0 && (
    <div className={`w-full max-h-80 p-4 overflow-auto absolute top-10 left-0 right-0 z-10  bg-zinc-900 text-white border border-gray-300 rounded-md shadow-md transition-transform ${suggestions.length > 0 && query.trim() !== '' ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}`}>
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="cursor-pointer p-2 hover:bg-gray-400 hover:bg-opacity-20"
            onClick={() => setQuery(suggestion.name)}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  )}
  <div
    className="absolute right-0 flex"
    
  >
      <img
src={logo}
alt="Logo"
className="w-8 h-8 rounded-full cursor-pointer hover:bg-gray-400 hover:bg-opacity-20"
onClick={handleSearch}
/> 
<button
            onClick={toggleSidebar}
            className=" md:hidden  text-white focus:outline-none  sm:pl-8"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
               (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5.6H20V7.6H4V5.6ZM4 11.6H20V13.6H4V11.6ZM4 17.6H20V19.6H4V17.6Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17Z"
                />
              )
            </svg>
      </button>
       
  </div>

</div>
 

  );
};

export default SearchBar;
