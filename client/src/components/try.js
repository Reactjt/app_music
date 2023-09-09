import { useContext, useRef, useState, useEffect } from "react";
import React from "react";
import songContext from "../../contexts/songContext";
import { Howl } from "howler";
import filteredInfoContext from "../../contexts/FilteredinfoContext";
import { play } from "../../assets";
import {Icon} from "@iconify/react"
 import "./filter.css"
 import WaveSurfer from "wavesurfer.js"; 


const SingleFilterCard = ({ info}) => {

    const audioRef = React.useRef(null);
 
    const { selectedFilter, setSelectedFilter } = useContext(filteredInfoContext);
    const {isPaused, setIsPaused} = useContext(songContext);
    const [progress, setProgress] = useState(0); // Current progress in seconds
    const [isPlaying, setIsPlaying] = useState(false); // Song playing status
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      
    const songs = info;
    
//   console.log(songs)
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
//   console.log(filteredinfo)
     
    const { currentSong, setCurrentSong } = useContext(songContext);
  

    const [waveforms, setWaveforms] = useState([]);
    const [isWaveformPlaying, setIsWaveformPlaying] = useState([]);
    const waveformContainerRef = useRef(null);  
    useEffect(() => {
        console.error("useEffect runn");
        const usedIds = []; 
      
        const initializeWaveform = (audioUrl, id) => {
          console.log("ID: " + id);
      console.log("initilayy"+usedIds)
          if (!usedIds.includes(id)) {
            // Check if the ID is not already used
            const ws = WaveSurfer.create({
              container: `#waveform-${id}`,
              responsive: true,
              barWidth: 2,
              barHeight: 4,
              barGap: null,
              height: 50,
              progressColor: "rgba(255, 255, 255, 0.7)",
              waveColor: "rgba(255, 255, 255, 0.4)",
              cursorWidth: 0,
            });
      
            ws.load(audioUrl);
      
            ws.on("play", () => {
              setIsWaveformPlaying((prev) =>
                prev.map((value, index) => (index === id ? true : value))
              );
            });
      
            ws.on("pause", () => {
              setIsWaveformPlaying((prev) =>
                prev.map((value, index) => (index === id ? false : value))
              );
            });
      
            setWaveforms((prevWaveforms) => [...prevWaveforms, ws]);
         
            console.log("finally"+usedIds)
          }
        };
   
        filteredinfo.forEach((song, index) => {
        //    usedIds.push(index);
          initializeWaveform(song.audio, index);
        
        });
      
        return () => {
          waveforms.forEach((ws) => {
            ws.destroy();
          });
        };
      }, [filteredinfo]);
      
      
 
 
    const playSong = (audioUrl,id) => {
 
        // if (isWaveformPlaying[id]) {
        //     waveforms[id].pause();
        //   } else {
        //     waveforms.forEach((ws, index) => {
        //       if (index !== id) {
        //         ws.pause();
        //       }
        //     });
        //     waveforms[id].play();
        //   }
        // Find the clicked song from the records array
        const clickedSong = info.find((song) => song.audio === audioUrl);
    
        if (!clickedSong) {
            return; // Return early if the clicked song is not found
        }
    
        if (currentSong && currentSong.sound && currentSong.audio === audioUrl) {
            // Pause the audio if it's the same song that is already playing
            currentSong.sound.pause();
            setCurrentSong((prevCurrentSong) => ({ ...prevCurrentSong, sound: null })); // Clear the sound
        } else {
            // Stop the currently playing song, if any
            if (currentSong && currentSong.sound) {
                try {
                    currentSong.sound.stop();
                } catch {
                    console.log("error");
                }
            }
    

            function updateProgress() {
                if (sound && isPlaying) {
                    const newProgress = sound.seek();
                    setProgress(newProgress);
                    requestAnimationFrame(updateProgress);
                }
            }

            // Create a new Howl instance for the selected song
          
    const sound = new Howl({
        src: [audioUrl],
        html5: true,
        onplay: () => {
            setIsPlaying(true);
            console.log("filter onplay")
            requestAnimationFrame(updateProgress);
        },
        onpause: () => {
            setIsPlaying(false);
        },
        onend: () => {
            setCurrentSong((prevCurrentSong) => ({
                ...prevCurrentSong,
                sound: null,
                
            }));
            setIsPlaying(false);
            setProgress(0);
        },});

            
    
            // Set the current song with the clicked song's information
            setCurrentSong({
                ...clickedSong,
                audio: audioUrl,
                sound,
            });
            
            
        }
    };

    const handleDownload = (audioUrl) => {
        // Use the "download" attribute to initiate download
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'song.mp3';
        link.click();
      };

      console.log(info.audio)

      const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    
                    title: currentSong.name,
                    text: `Check out this song: ${currentSong.name} by ${currentSong.artist_name}`,
                    url: currentSong.audio,
                });
                console.log('Song shared successfully');
            } catch (error) {
                console.error('Error sharing song:', error);
            }
        } else {
            console.log('Web Share API not supported in this browser');
            // Provide an alternative sharing method here
        }
    };
    
 
    
  
const threshold = 200;

    return (
        <div>
            {filteredinfo.map((item, index) => (
               
                <div 
                    key={index}
                    className={`p-2 ${scrollY > threshold ? "song-fade" : ""}`}
                     
            
                >
                    <div className=" hover:bg-gray-400 hover:bg-opacity-20 p-4  flex items-center  border-b-gray-200 border-b border-opacity-10"
                   >
                    <div className="flex items-center"
                             onClick={() => {
                        playSong(item.audio);
 
                    }}>
                       
                            <img
                                src={item.thumb}
                                alt=""
                                className="w-14 h-14 object-cover "
                            />
                        
                        <div className="mx-6 md:ml-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z"/></svg>
                        </div>
                        <div>
                        
                        </div>
                         
                        <div className="w-full ">
                            <div className="text-white flex justify-center flex-col md:pl-4 ">
                                <div className="cursor-pointer hover:underline">
                                    
                                    {item.name}
                                </div>
                              
                                <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                                {item.artis_name}
                                </div>
                            </div>
          
                         </div>
                       </div>
                       <div
                    
              id={`waveform-${index}`}
              className="w-1/3 ml-auto "
            ></div>

          <div className="flex md:p-4 ml-auto">            
                       <Icon
                        icon="ri:download-line" 
                        color="white" 
                        className="mx-2 sm:mx-4 sm:h-5 sm:w-5   hover:cursor-pointer"
                        onClick={() => handleDownload(item.audio)}
                        />
                       <Icon icon="ph:star-fill" color="white" className="mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"/>
                       <Icon icon="pepicons-pop:dots-y" color="white" className="mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"
                           onClick={handleShare}
                       />
                       </div>
                    
                    
                       
                        </div>
                       
                </div>
            ))}
        </div>
    );
};

export default SingleFilterCard;








 
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Icon } from "@iconify/react";
// import songContext from "../contexts/songContext";
// import Navbar from "../components/Navbar";
// import SearchBar from "../components/SearchBar";
// import Sidebar from "../components/Sidebar";
// import WaveSurfer from "wavesurfer.js"; 

// const LoggedInContainer = ({ info, children, }) => {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [progressBarWidth, setProgressBarWidth] = useState(0);
//   const [waveformid, setWaveformid] = useState("waveform-container");

//   const mySongs = [...info];

//   const [showSearch, setShowSearch] = useState(false);
//   const [volume, setVolume] = useState(100);

//   const [isExpanded, setIsExpanded] = useState(false);
//   const handleLogoClick = () => {
//     setShowSearch(!showSearch);
//     setIsExpanded(!isExpanded);
//   };

//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (query) => {
//     const filteredResults = info.filter(
//       (record) =>
//         record.name.toLowerCase().includes(query.toLowerCase()) ||
//         record.artis_name.toLowerCase().includes(query.toLowerCase()) ||
//         record.flt_name.includes(query.toLowerCase())
//     );

//     setSearchResults(filteredResults);
//   };

//   const {
//     currentSong,
//     setCurrentSong,
//     soundPlayed,
//     setSoundPlayed,
//     isPaused,
//     setIsPaused,
//   } = useContext(songContext);

//   const records = mySongs;
//   const firstsong = info[0];
 

//   const waveSurferRef = useRef(null);
//   const waveformContainerRef = useRef(null);  

//   useEffect(() => {
   

//     const initializeWaveSurfer = () => {
//       if(!waveformContainerRef.current){
//         return;
//       }
 
//       const id = waveformContainerRef.current.id;
//       console.log(id)
//       console.log(waveSurferRef.current)
//       if (!waveSurferRef.current) {
//         waveSurferRef.current = WaveSurfer.create({
//           container: `#${id}`,
//           responsive: true,
//           waveColor: "gray",
//           progressColor: "rgb(60, 60, 60)",
//           height: 60,
//           width: 50
//         });


//         if(!waveSurferRef.current){
//           return;
//         }
//            waveSurferRef.current.on("seek", (progress) => {
//       // Calculate the new audio current time based on the waveform progress
//       const newTime = progress * audioRef.current.duration;
//       audioRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     });

//       if (currentSong) {
//       audioRef.current.src = currentSong.audio;
//       waveSurferRef.current.load(currentSong.audio);
//       audioRef.current.volume = volume / 100;
//       setCurrentTime(0);
//     }
//       }
//     };
 

//     if (document.readyState === "interactive" || document.readyState === "complete") {
//       console.log("jbnkjnk");
//       initializeWaveSurfer();
//       console.log("ijjoij");
//     } else {
//       window.addEventListener("DOMContentLoaded", initializeWaveSurfer);
//     }
 
//     return () => {
//       window.removeEventListener("DOMContentLoaded", initializeWaveSurfer);
//     };
    
//   }, [currentSong]);

  
  
  
//   useEffect(() => {
//     console.log(waveSurferRef.current)
//     if(!waveSurferRef.current){
//       return;
//     }
//     console.log(waveSurferRef.current)
//      // Update the waveform when the current song changes
//      if (currentSong) {
//       // Load the audio for the current song
//       waveSurferRef.current.load(currentSong.audio);
//       console.log(waveSurferRef.current.play)
//       // Play the audio if it's not paused
      
//     }  
//   }, [currentSong]);
  
  




//   const [filterName, setFilterName] = useState("");

//   const filteredRecords = records.filter((record) => {
//     return record.name.toLowerCase().includes(filterName.toLowerCase());
//   });

//   const songUrl = currentSong ? currentSong.audio : "";
//   const audioRef = useRef(new Audio()); // ////Create an audio element using useRef

  
 
 

//   useEffect(() => {
    
//     if (!waveSurferRef.current) {
//       return;
//     }
   
//     waveSurferRef.current.on("audioprocess", () => {
//       const newTime = waveSurferRef.current.getCurrentTime();
//       setCurrentTime(newTime);
//       // Optionally, you can also update the audio element's currentTime
//       audioRef.current.currentTime = newTime;
//     });
   
//     // waveSurferRef.current.on("finish", () => {
//     //   playNextSong();
//     // });

//     audioRef.current.addEventListener("timeupdate", () => {
//       setCurrentTime(audioRef.current.currentTime); 
//     });

//     audioRef.current.addEventListener("durationchange", () => {
//       setDuration(audioRef.current.duration);
//     });

   

//     return () => {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       waveSurferRef.current.un("audioprocess");
//       //// ////waveSurferRef.current.un("finish")
//     };
//   }, [currentSong]);

//   useEffect(() => {
//     if(!waveSurferRef.current){
//       return;
//     }
//     console.log(waveSurferRef);
//     if (currentSong ) {
//       waveSurferRef.current.play();
    
//     }  
//   }, [currentSong]);
  

 
//    useEffect(() => {
//     if (!currentSong && info.length > 0) {
//       setCurrentSong(firstsong);
//       setIsPaused(true)
//     }
//   }, [currentSong, info]);


//   const playSound = () => {
//     if(!waveSurferRef.current){
//       return;
//     }
//          waveSurferRef.current.play();
  
//     setIsPaused(false);
//   };

//   const pauseSound = () => {
//     if (!waveSurferRef.current) {
//       return;
//     }
//          waveSurferRef.current.pause();
 
//     setIsPaused(true);
//   };
  
//   const togglePlayPause = () => {
//     if (isPaused) {
//       playSound();
//     } else {
//       pauseSound();
//     }
//   };

  

 
//   const playNextSong = () => {
//     if (!currentSong || !currentSong.audio) {
//       console.log("Error: Missing current song");
//       return;
//     }

//     if (!info) {
//       console.log("Error: Missing info");
//       return;
//     }

//     if (!info) {
//       console.log("Error: Missing records in info");
//       return;
//     }

//     const currentIndex = info.findIndex(
//       (song) => song.audio === currentSong.audio
//     );
//     if (currentIndex === -1) {
//       console.log("Error: Current song not found in records");
//       return;
//     }

//     const nextIndex = (currentIndex + 1) % info.length; // Circular next
//     const nextSong = info[nextIndex];

//     if (currentSong.sound) {
//       currentSong.sound.pause(); // Pause the current sound
//     }

//     setCurrentSong({
//       ...nextSong,
//       sound: null, // Clear the sound
//     });
//   };

//   const playPreviousSong = () => {
//     if (!currentSong || !currentSong.audio || !info || !info) {
//       return; // No current song to play previous from
//     }

//     const currentIndex = info.findIndex(
//       (song) => song.audio === currentSong.audio
//     );
//     const previousIndex = (currentIndex - 1 + info.length) % info.length; // Circular previous
//     const previousSong = info[previousIndex];

//     if (currentSong.sound) {
//       currentSong.sound.pause(); // Pause the current sound
//     }

//     setCurrentSong({
//       ...previousSong,
//       sound: null, // Clear the sound
//     });
//   };



//   function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   }

//   const handleDownload = (audioUrl) => {
//     // Use the "download" attribute to initiate download
//     const link = document.createElement("a");
//     link.href = audioUrl;
//     link.download = "song.mp3";
//     link.click();
//   };

 

//   return (
//     <div className="h-full w-full bg-zinc-900  ">
       
//       <Navbar onLogoClick={handleLogoClick} /> {/* Pass onLogoClick prop */}
//       {/* Add the SearchBar component */}
//       <div className="py-6 flex justify-center ">
//         {showSearch && <SearchBar records={info} onSearch={handleSearch} />}
//       </div>
//       {/* Render search results */}
//       {searchResults.map((result) => (
//         <div key={result.id}>
//           {/* Display search results here */}
//           {/* You can format and display the results as needed */}
//         </div>
//       ))}
//       {/* Filter input */}
//       <div className="flex-grow overflow-hidden">
//         <div className="h-9/10 w-full flex">
//           {/* This first div will be the left panel */}
//           <Sidebar info={info} />
//           {/* This second div will be the right part(main content) */}
//           <div className=" md:h-full md:w-4/5  bg-zinc-900 text-white  overflow-auto  md:ml-auto">
//             <div
//               className={` md:p-4 pt-0  overflow-auto ${
//                 isExpanded
//                   ? "max-h-50 min-h-50   lg:max-h-50 lg:min-h-50 md:max-h-35 md:min-h-35"
//                   : "max-h-50 min-h-50 lg.max-h-50 lg.min-h-50 md.max-h-35 md.min-h-35"
//               } `}
//             >
//               {children}
//             </div>
//           </div>
//         </div>
//         {/* This div is the current playing song */}
       
//         {currentSong && (
//           <div className="w-full h-1/10 py-8 sm:py-5 justify-center align-middle   bg-zinc-900  text-white flex items-center px-4 fixed bottom-0">
//             <div className="w-full flex items-center mb-8">
//               <img
//                 src={currentSong.thumb}
//                 alt="currentSongThumbail"
//                 className="h-16 w-16 sm:h-20 sm:w-20 mr-6 object-cover sm:mx-10 rounded"
//               />
//               <div className="w-1/2 flex justify-center h-full flex-col items-left sm:mx-10">
//                 <div className="flex items-center">
//                   {/* controls for the playing song go here */}
//                   <Icon
//                     icon="mdi:skip-previous-outline"
//                     fontSize={30}
//                     className="cursor-pointer   text-white mx-2 sm:mx-4"
//                     onClick={playPreviousSong}
//                   />
//                   <Icon
//                     icon={
//                       isPaused
//                         ? "solar:play-bold"
//                         : "solar:pause-bold"
//                     }
//                     className="cursor-pointer w-6 h-6 text-white"
//                     onClick={togglePlayPause}
//                   />
//                   <Icon
//                     icon="mdi:skip-next-outline"
//                     fontSize={30}
//                     className="cursor-pointer   text-white mx-2 sm:mx-4"
//                     onClick={playNextSong}
//                   />
//                   <div className="hidden md:block md:ml-16">
//                     {formatTime(currentTime)}/{formatTime(duration)}
//                   </div>
//                 </div>
//               </div>

//               <div className="w-1/2 mb-1">
//                 <div className="hidden md:block text-sm  cursor-pointer text-white">
//                   {currentSong.name}
//                 </div>

//                 <div className="hidden md:block text-xs text-gray-500   cursor-pointer">
//                   {currentSong.artis_name}
//                 </div>
//               </div>
//             </div>
//             {/* progress bar */}
//              <div ref={waveformContainerRef} id="waveform-container" className="w-1/3  mb-8" ></div>
        

//             <div className="flex mb-8">
//               <Icon
//                 icon="ri:download-line"
//                 color="white"
//                 className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5   hover:cursor-pointer"
//                 onClick={() => handleDownload(currentSong.audio)}
//               />
//               <Icon
//                 icon="ph:star-fill"
//                 color="white"
//                 className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"
//               />
//             </div>

//             {/* Volume Slider */}
//             <div className="hidden md:flex items-center mb-8">
//               <Icon icon="subway:sound" color="white" />
//               <input
//   type="range"
//   min="0"
//   max="100"
//   step="1"
//   value={volume}
//   onChange={(e) => {
//     const newVolume = parseInt(e.target.value);
//     setVolume(newVolume);
//     audioRef.current.volume = newVolume / 100; 
//   }}
//   className="w-24"
// />

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoggedInContainer;

