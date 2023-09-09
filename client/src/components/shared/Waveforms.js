
import WaveSurfer from "wavesurfer.js"; 
import { useContext, useRef, useState, useEffect } from "react";

import React from 'react'
import { useWaveformContext } from "../../contexts/WaveformContext";

export default function Waveforms({filteredinfo, audioUrl, id, setWaveforms}) {
 
 
const waveformContainerRef = useRef(null);
const  {isWaveformPlaying,setIsWaveformPlaying} = useWaveformContext();
 
 
 console.log(isWaveformPlaying)
 console.log(setIsWaveformPlaying)
  
 

useEffect(() => {
   
      if(!waveformContainerRef.current){
        return;
      }
      const element = waveformContainerRef.current;
 
        
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
