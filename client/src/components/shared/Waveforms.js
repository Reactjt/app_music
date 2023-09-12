
import WaveSurfer from "wavesurfer.js"; 
import { useContext, useRef, useState, useEffect } from "react";

import React from 'react'
import { useWaveformContext } from "../../contexts/WaveformContext";
import songContext from "../../contexts/songContext";

export default function Waveforms({filteredinfo, audioUrl,  id, setWaveforms, song}) {
 
 
const waveformContainerRef = useRef(null);
const  {isWaveformPlaying,setIsWaveformPlaying} = useWaveformContext();
const {isPaused, setIsPaused} = useContext(songContext)
 const {currentTimestamp, setCurrentTimestamp, currentSong} = useContext(songContext);
 
const [duration, setDuration] = useState(0);
//  console.log(isWaveformPlaying)
//  console.log(setIsWaveformPlaying)
  
 
let ws;

useEffect(() => {
   console.error("useeffectrun")
      if(!waveformContainerRef.current){
        return;
      }
      const element = waveformContainerRef.current;
      element.style.overflow = "hidden";
      console.error("first")
     
        ws = WaveSurfer.create({
          container: element,
          responsive: true,
          barWidth: 1,
          barHeight: 4,
          barGap: null,
          height: 40,
          progressColor: "rgba(255, 255, 255, 0.7)",
          waveColor: "rgba(255, 255, 255, 0.4)",
        });
  
        ws.load(audioUrl);
       
        ws.on("play", () => {
         console.log("playyy")    
          setIsWaveformPlaying(id)
          setIsPaused(false)
        });
      
        ws.on("pause", () => {
          setIsWaveformPlaying(null) 
          setIsPaused(true)
        });
 

           
    if (!ws) {
      return;
    }
   

   
    ws.on("ready", () => {
      setDuration(ws.getDuration());
    });



        // console.error("nkml")
//   console.log(setIsWaveformPlaying)
        setWaveforms((prevWaveforms) => ({...prevWaveforms, [id]: ws }));
  
    return () => {
     
        ws.destroy();
        ws.un("audioprocess");
    };
  }, [waveformContainerRef]); 

  useEffect(() =>{
   if(!ws){
    return;
   }

   ws.on("audioprocess", () => {
    const newTime = ws.getCurrentTime();
    
      console.log("timestamp")
    setCurrentTimestamp(newTime);
  

  });
  
  },[song, currentTimestamp])
 
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <>
    <div className="hidden md:block md:ml-auto w-1/10 text-gray-400">
    {song === id ? `${formatTime(currentTimestamp)}/${formatTime(duration)}` : `0:00/${formatTime(duration)}` }

  </div>
    <div
    className="hidden md:block w-3/10  overflow-x-hidden"
    ref={waveformContainerRef}/>
    </>
  )
}
