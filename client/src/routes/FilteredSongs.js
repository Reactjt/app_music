import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


import LoggedInContainer from "../containers/LoggedInContainer";
import SingleFilterCard from "../components/shared/Filter";

const FilteredSongs = () => {
  const [totalSongs,setTotalSongs]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
    const [songsData, setSongsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiCompleted, setApiCompleted] = useState(false);

    const observer = useRef(null); // Ref to the IntersectionObserver instance

    const fetchFilteredSongs = async () => {
      try {
        setLoading(true);
        const response = await axios.post("https://staging2.syncorstream.com/api/fetch_music_json", {
          post: 0,
          page: currentPage,
          single_page: "staging2.syncorstream.com",
          per_page: 15,
          categories: "43,16,189,179,180,209,44,45,17,32,33,181,36,182,37,210,38,39,40,41,190,98,97,96,95,94,93,92,91,90,89,88,87,86,122,123,124,2,70,3,4,138,71,72,73,74,133,75,77,119,78,79,80,81,82,83,84,135,112,114,109,108,111,110,118,113,139,53,6,101,54,55,56,105,104,136,57,117,58,134,7,106,137,59,60,61,66,67,103,115,68,120,62,64,116,63,65,102,69",
          user: 155,
        });
        console.log(response)
  setTotalSongs(
   [...totalSongs,...response.data.records]
  )
       console.log(totalSongs)
        if (typeof response.data === "object" && response.data !== null) {
          setSongsData(prevData => {
            // Merge the previous data with the new fetched data
            const mergedData = { ...prevData };

            for (const key in response.data) {
              if (response.data.hasOwnProperty(key)) {
                mergedData[key] = response.data[key];
              }
            }

            return mergedData;
          });
        } else {
          // Handle the case when response.data is not an object
          console.error("API response is not an object:", response.data);
        }
  console.log(totalSongs)
        setLoading(false);
        setApiCompleted(true);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.message);
        setLoading(false);
        setApiCompleted(true);
      }
    };




    const handleLoadMore = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };


    const handleObserver = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Load more data when the bottom of the page is reached
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    useEffect(() => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });

      if (observer.current) {
        observer.current.observe(document.documentElement);
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }, []);

    useEffect(() => {
      fetchFilteredSongs(currentPage);
    }, [currentPage]);


// console.log(totalSongs)

    return (
        <LoggedInContainer info={totalSongs}  curActiveScreen="myMusic">

            {apiCompleted ?  /* Only render if API call is completed */
    (
         <SingleFilterCard info={totalSongs}/>

      ) : (
        <p>No songs data available.</p>
      )
    }
          <button onClick={handleLoadMore} href="#">
            loadmore
          </button>

        </LoggedInContainer>
    );
};

export default FilteredSongs;




