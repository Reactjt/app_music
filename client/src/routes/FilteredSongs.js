import React, { useState, useEffect } from "react";
import axios from "axios";
  
 
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleFilterCard from "../components/shared/Filter";

const FilteredSongs = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [songsData, setSongsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiCompleted, setApiCompleted] = useState(false);
  
    useEffect(() => {
      axios
        .post("http://localhost:5000/api/fetch-songs", {
          post: 0,
          page: currentPage,
          single_page: "staging2.syncorstream.com",
          per_page: 10,
          categories: "43,16,189,179,180,209,44,45,17,32,33,181,36,182,37,210,38,39,40,41,190,98,97,96,95,94,93,92,91,90,89,88,87,86,122,123,124,2,70,3,4,138,71,72,73,74,133,75,77,119,78,79,80,81,82,83,84,135,112,114,109,108,111,110,118,113,139,53,6,101,54,55,56,105,104,136,57,117,58,134,7,106,137,59,60,61,66,67,103,115,68,120,62,64,116,63,65,102,69",
          user: 155,
        })
        .then(response => {
        //   console.log("API Response:", response.data);
          setSongsData(response.data);
          setLoading(false);
          setApiCompleted(true); 
        })
        .catch(error => {
          console.error("Error fetching songs:", error);
          setError(error.message);
          setLoading(false);
          setApiCompleted(true); 
        });
    }, [currentPage]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }

    const handleLoadMore = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };


    return (
        <LoggedInContainer info={songsData}  curActiveScreen="myMusic">
           
            {apiCompleted ?  /* Only render if API call is completed */
    (
         <SingleFilterCard info={songsData}/>
        
      ) : (
        <p>No songs data available.</p>
      )
    }
            <button onClick={handleLoadMore} className="text-blue-500 ">
              Load More
            </button>
         
        </LoggedInContainer>
    );
};

export default FilteredSongs;

 

 