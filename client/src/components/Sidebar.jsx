import React, { useState } from 'react';

const Sidebar = ({info}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [selectedFilter, setSelectedFilter] = useState('');

  const songs = info.records;
  console.log(songs)
   // List of keywords for filtering
   const filterKeywords = [
     "80-89", "Bass", "Confident", "Drums", "Guitar", "Hip-Hop", "Latin","Medium Energy",
      "Quirky", "Strings", "Synth", "groovy" , "spanish", "weird", "topline",
       "rhythmic", "exotic", "cuban rhythm", "cultural", "unique","Fun","85 bpm"
     // Add more keywords here
   ];
 
   // Filter songs based on the selected keyword
   const filteredinfo = selectedFilter
     ? songs.filter(song => song.flt_name.includes(selectedFilter))
     : songs;
  console.log(filteredinfo)



  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ...path data... */}
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
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
          {keyword}
        </li>
      ))}
                
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
