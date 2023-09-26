
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
    const waveformContainerRef = useRef(null);

    const [isWaveformPlaying, setIsWaveformPlaying] = useState(
        new Array(filteredinfo.length).fill(false)
      ); // Track play state for each waveform

    useEffect(() => {
        console.error("useEffect runn");
        // const usedIds = [];

        const initializeWaveform = (audioUrl, id) => {
          console.log("ID: " + id);
          if(!waveformContainerRef.current){
            return;
          }
          const element = waveformContainerRef.current;
          console.log("eleeeeee: "+element)

            const ws = WaveSurfer.create({
              container: element,
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



        };

        filteredinfo.forEach((song) => {
        //    usedIds.push(index);

          initializeWaveform(song.audio, song.id);

        });

        return () => {
          waveforms.forEach((ws) => {
            ws.destroy();
          });
        };
      }, [filteredinfo]);


      const playySong = (index) => {
        if(!waveforms){
            return;
        }
        console.log("nefkjnerkfknkfe"+waveforms)
        const waveform = waveforms[index];
   if(!waveform){
    return;
   }
        if (waveform) {
            console.error(waveform)
          if (isWaveformPlaying[index]) {
            waveform.pause();
          } else {
            waveform.play();
          }
        }
      };

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
        const clickedSong = filteredinfo.find((song) => song.audio === audioUrl);

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

      console.log(filteredinfo.audio)

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
                    key={item.id}
                    className={`p-2 ${scrollY > threshold ? "song-fade" : ""}`}

                >
                    <div className=" hover:bg-gray-400 hover:bg-opacity-20 p-4  flex items-center  border-b-gray-200 border-b border-opacity-10"
                   >
                    <div className="flex items-center"
                             onClick={() => {
                        playSong(item.audio);

                    }}>
                                <button
                  onClick={() => playySong(index)}
                  className="mx-2 sm:mx-4 sm:h-5 sm:w-5 hover:cursor-pointer"
                >
                  {isWaveformPlaying[index] ? "Pause" : "Play"}
                </button>


                            <img
                                src={item.thumb}
                                alt=""
                                className="w-14 h-14 object-cover "
                            />

                        <div className="mx-6 md:ml-6">
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
                    ref={waveformContainerRef}
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
