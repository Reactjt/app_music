
import WaveSurfer from "wavesurfer.js"; 
import { useContext, useRef, useState, useEffect } from "react";

import React from 'react'
import { useWaveformContext } from "../../contexts/WaveformContext";

export default function Waveforms({filteredinfo, audioUrl,  id, setWaveforms}) {
 
 
const waveformContainerRef = useRef(null);
const  {isWaveformPlaying,setIsWaveformPlaying} = useWaveformContext();
 
 
 console.log(isWaveformPlaying)
//  console.log(setIsWaveformPlaying)
  
 

useEffect(() => {
   console.error("useeffectrun")
      if(!waveformContainerRef.current){
        return;
      }
      const element = waveformContainerRef.current;
      console.error("first")
     
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
         console.log("playyy")    
          setIsWaveformPlaying(id)
        });
      
        ws.on("pause", () => {
          setIsWaveformPlaying(null) 
        });
 
        // console.error("nkml")
//   console.log(setIsWaveformPlaying)
        setWaveforms((prevWaveforms) => ({...prevWaveforms, [id]: ws }));
  
    return () => {
     
        ws.destroy();
      
    };
  }, [waveformContainerRef]);


  return (
    <div
    className="w-1/3 ml-auto"
    ref={waveformContainerRef}/>
  )
}
