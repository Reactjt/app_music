import React, { useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import songContext from "../contexts/songContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

const LoggedInContainer = ({info, children}) => {

    const [showSearch, setShowSearch] = useState(false); // State to control search bar visibility
    const [volume, setVolume] = useState(100);

    const [isExpanded, setIsExpanded] = useState(false);
    const handleLogoClick = () => {
      setShowSearch(!showSearch); // Toggle search bar visibility on logo click
      setIsExpanded(!isExpanded);
    };

    const [searchResults, setSearchResults] = useState([]); // Store search results

    const handleSearch = (query) => {
      // Filter records based on query
      const filteredResults = info.records.filter(
        (record) =>
          record.name.toLowerCase().includes(query.toLowerCase()) ||
          record.artis_name.toLowerCase().includes(query.toLowerCase()) ||
          // Add more filtering criteria based on your needs
          // e.g., sound effects filtering
          record.flt_name.includes(query.toLowerCase())
      );
  
      setSearchResults(filteredResults);
    };
    
    // console.log({info})
    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    



    const records = info && info.records ? info.records : [];

    const [filterName, setFilterName] = useState("");

    const filteredRecords = records.filter(
        (record) =>
            record.name.toLowerCase().includes(filterName.toLowerCase())
    );



    useEffect(() => {
        if (currentSong) {
            changeSong(currentSong.audio);
        }
    }, [currentSong]);

    const playSound = () => {
        if (soundPlayed) {
            soundPlayed.play();
            setIsPaused(false);
        }
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }

        const newSound = new Howl({
            src: [songSrc],
            html5: true,
            onend: () => {
                playNextSong();
            },
        });

        setSoundPlayed(newSound);
        newSound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        if (soundPlayed && soundPlayed.playing()) {
            soundPlayed.pause();
            setTimeout(() => {
                setIsPaused(true);
            }, 100);  
        }
    };
    
    //   console.log({currentSong});

       

      const playNextSong = () => {
        if (!currentSong || !currentSong.audio) {
            console.log("Error: Missing current song");
            return;
        }
    
        if (!info) {
            console.log("Error: Missing info");
            return;
        }
    
        if (!info.records) {
            console.log("Error: Missing records in info");
            return;
        }
    
        const currentIndex = info.records.findIndex(song => song.audio === currentSong.audio);
        if (currentIndex === -1) {
            console.log("Error: Current song not found in records");
            return;
        }
    
        const nextIndex = (currentIndex + 1) % info.records.length; // Circular next
        const nextSong = info.records[nextIndex];

        if (currentSong.sound) {
            currentSong.sound.pause(); // Pause the current sound
        }
    
        setCurrentSong({
            ...nextSong,
            sound: null, // Clear the sound
        });

        
    };
    


    

    const playPreviousSong = () => {
        if (!currentSong || !currentSong.audio || !info || !info.records) {
            return; // No current song to play previous from
        }

        const currentIndex = info.records.findIndex(song => song.audio === currentSong.audio);
        const previousIndex = (currentIndex - 1 + info.records.length) % info.records.length; // Circular previous
        const previousSong = info.records[previousIndex];

        if (currentSong.sound) {
            currentSong.sound.pause(); // Pause the current sound
        }

        setCurrentSong({
            ...previousSong,
            sound: null, // Clear the sound
        });
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            console.log("Before pause, isPaused:", isPaused);
            pauseSound();
            setIsPaused(true);
            console.log("After pause, isPaused:", isPaused);
        }
        
    };

    // document.addEventListener("keypress", (event) => {
    //     if(event.keycode === 32 || event.key === " "){
    //         event.preventDefault();
    //         togglePlayPause();
    //     }
    // })

// bg-gray-900 bg-opacity-75
    // console.log({currentSong});
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
  
    const handleTimeUpdate = () => {
        if (audioRef.current && isFinite(audioRef.current.duration)) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
   
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        if (audioRef.current && isFinite(audioRef.current.duration)) {
          const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * audioRef.current.duration;
          audioRef.current.currentTime = seekTime;
        }
      };
   
 
    return (
        <div className="h-full w-full bg-zinc-900  ">
        

              <Navbar onLogoClick={handleLogoClick} /> {/* Pass onLogoClick prop */}  
                       {/* Add the SearchBar component */}
                      
                       
                       <div className="py-6 flex justify-center ">
                       {showSearch && <SearchBar records={info.records} onSearch={handleSearch}  />} 

{/* Render search results */}
{searchResults.map((result) => (
  <div key={result.id}>
    {/* Display search results here */}
    {/* You can format and display the results as needed */}
  </div>
))}     
</div>           {/* Filter input */}  
    
    <div className="flex-grow overflow-hidden">
            <div className="h-9/10 w-full flex ">


                {/* This first div will be the left panel */}
              
              <Sidebar info={info} />
 

                {/* This second div will be the right part(main content) */}
                <div className=" sm:h-full md:w-4/5  bg-zinc-900 text-white  overflow-auto md:ml-auto">
                  
                    <div className={`content md:p-4 pt-0  overflow-auto ${isExpanded ? 'max-h-50 min-h-50   lg:max-h-50 lg:min-h-50' : 'max-h-50 min-h-50 lg:max-h-50 lg:min-h-50'} `}>
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSong && (
                <div className="w-full h-1/10 py-8 sm:py-5  bg-zinc-900  text-white flex items-center px-4 fixed bottom-0">
                
                    <div className="w-full flex items-center">
                        <img
                              src= {currentSong.thumb}
                            alt="currentSongThumbail"
                            className="h-16 w-16 sm:h-20 sm:w-20 mr-6 sm:mx-10 rounded"  
                        />
                           <div className="w-1/2 flex justify-center h-full flex-col items-left sm:mx-10">
                        <div className="flex items-center">
                            {/* controls for the playing song go here */}
                           
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer   text-white mx-2 sm:mx-4"
                                onClick={playPreviousSong}
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "solar:play-bold"
                                        : "solar:pause-bold"
                                }
                                className="cursor-pointer w-6 h-6 text-white"
                                onClick={togglePlayPause}
                            />
                           
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer   text-white mx-2 sm:mx-4"
                                onClick={playNextSong}
                            />
                           
                        </div>
     
       
                    </div>

                     {/* Progress bar */}
  
                        <div className="w-1/2">
                            <div className="hidden md:block text-sm  cursor-pointer text-white">
                                 {currentSong.name}
                            </div>
                          
                            <div className="hidden md:block text-xs text-gray-500   cursor-pointer">
                                 {currentSong.artis_name}
                            </div>
                        </div>
                                      
   
    


                      
                    </div>
                    <div className="flex">
                    <Icon icon="ri:download-line" color="white" className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5   hover:cursor-pointer"/>
                        <Icon icon="ph:star-fill" color="white" className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"/>
                        </div>

                            {/* Volume Slider */}
<div className="hidden md:flex items-center">
<Icon icon="subway:sound" color="white" />
    <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        onChange={(e) => {
            const newVolume = parseInt(e.target.value);
            setVolume(newVolume);
            if (soundPlayed) {
                soundPlayed.volume(newVolume / 100); // Update the volume of the currently playing sound
            }
        }}
        className="w-24 t"
    />
</div>
                </div>
                
            )}
            
         </div>
          
    
       
        </div>
    );
};

export default LoggedInContainer;





 