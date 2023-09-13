 
import React, { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import songContext from "../contexts/songContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import WaveSurfer from "wavesurfer.js";
import { useWaveformContext } from "../contexts/WaveformContext";

const LoggedInContainer = ({ info, children, }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [waveformid, setWaveformid] = useState("waveform-container");
  const {currentTimestamp, setCurrentTimestamp, song} = useContext(songContext);

  const  {isWaveformPlaying,setIsWaveformPlaying} = useWaveformContext();

  const mySongs = [...info];

  const [showSearch, setShowSearch] = useState(false);
  const [volume, setVolume] = useState(100);


  const [isExpanded, setIsExpanded] = useState(false);
  const handleLogoClick = () => {
    setShowSearch(!showSearch);
    setIsExpanded(!isExpanded);
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const filteredResults = info.filter(
      (record) =>
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.artis_name.toLowerCase().includes(query.toLowerCase()) ||
        record.flt_name.includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const records = mySongs;
  const firstsong = info[0];


  const waveSurferRef = useRef(null);
  const waveformContainerRef = useRef(null);


  useEffect(() => {

    const initializeWaveSurfer = async() => {
      if(!waveformContainerRef.current){
        return;
      }

      const id = waveformContainerRef.current.id;
      console.log(id)
      console.log(waveSurferRef.current)
      if (!waveSurferRef.current) {
        waveSurferRef.current = WaveSurfer.create({
          container: `#${id}`,
          responsive: true,
          waveColor: "gray",
          progressColor: "rgb(60, 60, 60)",
          height: 60,
          width: 50
        });

        console.error(waveSurferRef.current)
        waveSurferRef.current.setVolume( 0 )
        await waveSurferRef.current.play()

// (() => {
//   await waveSurferRef.current.play()
// })();


        if(!waveSurferRef.current){
          return;
        }
    //        wavesurferref.current.on("seek", (progress) => {
    //   // calculate the new audio current time based on the waveform progress
    //   const newtime = progress * audioref.current.duration;
    //   audioref.current.currenttime = newtime;
    //   setcurrenttimestamp(newtime);
    // });

      if (currentSong) {
      audioRef.current.src = currentSong.audio;
      waveSurferRef.current.load(currentSong.audio);
      audioRef.current.volume = volume / 100;
      setCurrentTime(0);
    }
      }
    };

    initializeWaveSurfer();
    // if (document.readyState === "interactive" || document.readyState === "complete") {
    //   console.log("jbnkjnk");
    //   initializeWaveSurfer();
    //   console.log("ijjoij");
    // } else {
    //   window.addEventListener("DOMContentLoaded", initializeWaveSurfer);
    // }

    return () => {
      window.removeEventListener("DOMContentLoaded", initializeWaveSurfer);

    };

  }, [currentSong]);

  useEffect(() => {
     if(!waveSurferRef.current || currentSong.audio )
      return;

      waveSurferRef.current.load(currentSong.audio)
      return () => {
         waveSurferRef.current.destroy()
      }

  },[currentSong])


  // useEffect(() => {
  //   console.log(waveSurferRef.current)
  //   if(!waveSurferRef.current){
  //     return;
  //   }
  //   console.log(waveSurferRef.current)
  //    // Update the waveform when the current song changes
  //    if (currentSong) {
  //     // Load the audio for the current song
  //     waveSurferRef.current.load(currentSong.audio);
  //     console.log(waveSurferRef.current.play)
  //     // Play the audio if it's not paused

  //   }
  //   // return () => {
  //   //   if(!waveSurferRef.current){
  //   //     return
  //   //   }
  //   //   waveSurferRef.current.destroy();
  //   // }
  // }, [currentSong]);






  const [filterName, setFilterName] = useState("");

  const filteredRecords = records.filter((record) => {
    return record.name.toLowerCase().includes(filterName.toLowerCase());
  });

  const songUrl = currentSong ? currentSong.audio : "";
  const audioRef = useRef(new Audio()); // ////Create an audio element using useRef





  useEffect(() => {

    if (!waveSurferRef.current) {
      return;
    }

    waveSurferRef.current.on("ready", () => {
      setDuration(waveSurferRef.current.getDuration());
    });

    // waveSurferRef.current.on("finish", () => {
    //   playNextSong();
    // });


    return () => {
      waveSurferRef.current.un("audioprocess");
      //// ////waveSurferRef.current.un("finish")
    };
  }, [currentSong]);

  useEffect(() => {
    if(!waveSurferRef.current)
    return;

    waveSurferRef.current.on("audioprocess", () => {
      const newTime = waveSurferRef.current.getCurrentTime();

      setCurrentTimestamp(newTime);

    });
  })

  useEffect(() => {
    if(!waveSurferRef.current){
      return;
    }
    console.log(waveSurferRef);
    // if (currentSong ) {
    //   pauseSound();

    // }
  }, [currentSong]);

   useEffect(() => {
      if(!waveSurferRef.current) return
      waveSurferRef.current.on("audioprocess", () => {
      const newTime = waveSurferRef.current.getCurrentTime();
      setCurrentTimestamp(newTime);
   });
  }, [currentTimestamp, song])



   useEffect(() => {
    if (!currentSong ) {
      setCurrentSong(firstsong);
      setIsPaused(true)
    }
  }, [currentSong, info]);


  const playSound = () => {
    if(!waveSurferRef.current){
      return;
    }
      // (100 * 10) / 180
      const currentSongPercentage = ( currentTimestamp ) / waveSurferRef.current.getDuration();
      // console.log( waveSurferRef.current.getMediaElement() )
      if( currentSongPercentage > 0 ) waveSurferRef.current.seekTo( currentSongPercentage );
      waveSurferRef.current.play();

      setIsPaused(false);
  };

  const pauseSound = () => {
    if (!waveSurferRef.current) {
      return;
    }
      waveSurferRef.current.pause();

      setIsPaused(true);
  };

  const togglePlayPause = () => {
    if( isPaused )  {
      playSound();
    } else {
      pauseSound();
    }
  };

   useEffect(() => {
    // console.log("pause",isPaused)
      if(!waveSurferRef.current) return
      // togglePlayPause()
      console.log( "play + pause", isPaused)
      if( isPaused ) {
         waveSurferRef.current.pause()
      } else {
         waveSurferRef.current.play()
      }
  }, [isPaused, song])

  const playNextSong = () => {
    if (!currentSong || !currentSong.audio) {
      console.log("Error: Missing current song");
      return;
    }

    if (!info) {
      console.log("Error: Missing info");
      return;
    }

    if (!info) {
      console.log("Error: Missing records in info");
      return;
    }

      console.log( info )
    const currentIndex = info.findIndex(
      (song) => song.audio === currentSong.audio
    );
    if (currentIndex === -1) {
      console.log("Error: Current song not found in records");
      return;
    }

    const nextIndex = (currentIndex + 1) % info.length; // Circular next
    const nextSong = info[nextIndex];

    if (currentSong.sound) {
      currentSong.sound.pause(); // Pause the current sound
    }

    setCurrentSong({
      ...nextSong,
      sound: null, // Clear the sound
    });
  };

  const playPreviousSong = () => {
    if (!currentSong || !currentSong.audio || !info || !info) {
      return; // No current song to play previous from
    }

    const currentIndex = info.findIndex(
      (song) => song.audio === currentSong.audio
    );
    const previousIndex = (currentIndex - 1 + info.length) % info.length; // Circular previous
    const previousSong = info[previousIndex];

    if (currentSong.sound) {
      currentSong.sound.pause(); // Pause the current sound
    }

    setCurrentSong({
      ...previousSong,
      sound: null, // Clear the sound
    });
  };



  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleDownload = (audioUrl) => {
    // Use the "download" attribute to initiate download
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "song.mp3";
    link.click();
  };



  return (
    <div className="h-full w-full bg-zinc-900  ">

      <Navbar onLogoClick={handleLogoClick} /> {/* Pass onLogoClick prop */}
      {/* Add the SearchBar component */}
      <div className="py-6 flex justify-center ">
        {showSearch && <SearchBar records={info} onSearch={handleSearch} />}
      </div>
      {/* Render search results */}
      {searchResults.map((result) => (
        <div key={result.id}>

        </div>
      ))}
      {/* Filter input */}
      <div className="flex-grow overflow-hidden">
        <div className="h-9/10 w-full flex">
          {/* This first div will be the left panel */}
          <Sidebar info={info} />
          {/* This second div will be the right part(main content) */}
          <div className=" md:h-full md:w-11/10  bg-zinc-900 text-white  overflow-auto  md:ml-auto">
            <div
              className={` md:p-4 pt-0  overflow-auto ${
                isExpanded
                  ? "max-h-50 min-h-50   lg:max-h-50 lg:min-h-50 md:max-h-35 md:min-h-35"
                  : "max-h-50 min-h-50 lg.max-h-50 lg.min-h-50 md.max-h-35 md.min-h-35"
              } `}
            >
              {children}
            </div>
          </div>
        </div>
        {/* This div is the current playing song */}

        {currentSong && (
          <div className="w-full h-1/10 py-8 sm:py-5 justify-center align-middle   bg-zinc-900  text-white flex items-center px-4 fixed bottom-0">
            <div className="w-full flex items-center mb-8">
              <img
                src={currentSong.thumb}
                alt="currentSongThumbail"
                className="h-16 w-16 sm:h-20 sm:w-20 mr-6 object-cover sm:mx-10 rounded"
              />
              <div className="w-1/2 flex justify-center h-full flex-col items-left sm:ml-10">
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
                  <div className="hidden md:block md:ml-8 md:text-xl text-gray-400">
                    {formatTime(currentTimestamp)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              <div className="w-1/2 mb-1">
                <div className="hidden md:block text-md  cursor-pointer text-white">
                  {currentSong.name}
                </div>

                <div className="hidden md:block  text-gray-500   cursor-pointer">
                  {currentSong.artis_name}
                </div>
              </div>
            </div>
            {/* progress bar */}
             <div ref={waveformContainerRef} id="waveform-container" className="w-9/10 mb-8" ></div>


            <div className="flex mb-8 ml-12">
              <Icon
                icon="ri:download-line"
                color="white"
                className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5   hover:cursor-pointer"
                onClick={() => handleDownload(currentSong.audio)}
              />
              <Icon
                icon="ph:star-fill"
                color="white"
                className="hidden md:block mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"
              />
            </div>

            {/* Volume Slider */}
            <div className="hidden md:flex items-center mb-8 mx-10">
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

    // //Update the volume for WaveSurfer
    if (waveSurferRef.current) {
      waveSurferRef.current.setVolume(newVolume / 100);
    }

  }}
  className="w-24"
/>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInContainer;
