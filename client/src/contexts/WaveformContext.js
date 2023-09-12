import React, { createContext, useContext, useState } from 'react';

 
const WaveformContext = createContext();
 
export function useWaveformContext() {
  return useContext(WaveformContext);
}

 
export function WaveformProvider({ children }) {
  const [isWaveformPlaying, setIsWaveformPlaying] = useState();
 
  return (
    <WaveformContext.Provider value={{isWaveformPlaying,setIsWaveformPlaying}}>
      {children}
    </WaveformContext.Provider>
  );
}
