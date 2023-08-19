import React, { useState } from 'react';

const SongFilter = ({ info }) => {
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
    <div className="flex flex-wrap">
      {/* Filter buttons */}
      {filterKeywords.map(keyword => (
        <li
          key={keyword}
          onClick={() => setSelectedFilter(keyword)}
          className={`px-3 py-2 m-2 rounded-md border bg-gray-900 ${
            selectedFilter === keyword ? 'bg-gray-900 text-white' : 'bg-gray-900'
          }`}
        >
          {keyword}
        </li>
      ))}


      {/* Display filtered info */}
      <div className="w-full max-h-60 overflow-auto">
        {filteredinfo.map(song => (
          <div key={song.id} className="bg-gray-900 p-4 mt-4 rounded-lg">
            <h2 className="text-lg font-bold">{song.name}</h2>
            <p>{song.artis_name}</p>
            
            {/* Add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongFilter;
