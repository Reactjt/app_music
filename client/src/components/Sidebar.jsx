import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import filteredInfoContext from '../contexts/FilteredinfoContext';

const Sidebar = ({info}) => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 

  const songs = info.records;
  console.log(songs)
   // List of keywords for filtering
   const filterKeywords = [
     "80-89", "Bass", "Confident", "Drums", "Guitar", "Hip-Hop", "Latin","Medium Energy",
      "Quirky", "Strings", "Synth", "groovy" , "spanish", "weird", "topline",
       "rhythmic", "exotic", "cuban rhythm", "cultural", "unique","Fun","85 bpm"
     // Add more keywords here
   ];
 



  return (
    <div className="relative">
      <button
            onClick={toggleSidebar}
            className=" md:hidden  text-white focus:outline-none pl-8"
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

      <aside
        className={`fixed left-0 w-64 h-96 transition-transform ${
          isSidebarOpen ? '' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-zinc-900">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base  text-zinc-800 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                onClick={toggleSidebar}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  {/* ...path data... */}
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Instruments
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  {/* ...path data... */}
                </svg>
              </button>
              <filteredInfoContext.Consumer>
        {({ selectedFilter, setSelectedFilter }) => (
          <ul
            id="dropdown-example"
            className={`${
              isSidebarOpen ? '' : 'hidden'
            } py-2 space-y-2 pl-10`}
          >
            {filterKeywords.map(keyword => (
              <li
                key={keyword}
                onClick={() => setSelectedFilter(keyword)}
                className={`px-3 py-2 m-2   bg-zinc-900 hover:cursor-pointer overflow-y-auto ${
                  selectedFilter === keyword ? 'bg-zinc-800 text-gray-400' : 'bg-zinc-900 text-gray-200'
                }`}
              >
                <Link to="/">
                  {keyword}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </filteredInfoContext.Consumer>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
