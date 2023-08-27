import { useContext, useRef, useState, useEffect } from "react";
import React from "react";
import songContext from "../../contexts/songContext";
import { Howl } from "howler";
import filteredInfoContext from "../../contexts/FilteredinfoContext";
import { play } from "../../assets";
import {Icon} from "@iconify/react"
import MusicPlayer from "../MusicPlayer.js";
import ProgressBar from "../ProgressBar";
 


const SingleFilterCard = ({ info}) => {

    const audioRef = React.useRef(null);
 
    const { selectedFilter, setSelectedFilter } = useContext(filteredInfoContext);
    const [progress, setProgress] = useState(0); // Current progress in seconds
    const [isPlaying, setIsPlaying] = useState(false); // Song playing status
    
    
 

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

    // Ensure that info and info.records are defined before accessing them
    if (!info  || !Array.isArray(info)) {
        return null; // Return null or a fallback UI element if necessary
    }

    const playSong = (audioUrl) => {
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
    
 
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
  

    return (
        <div>
            {filteredinfo.map((item, index) => (
                <div 
                    key={index}
                    className="p-2"
                     
            
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
            
                       {/* <div className="flex w-full ml-auto">
                       <audio ref={audioRef} src={item.audio}></audio>
                       <ProgressBar 
            currentTime={currentTime}
            duration={currentDuration}
            isPlaying={isPlaying}
            onSeek={handleSeek}
          />
       </div> */}

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
