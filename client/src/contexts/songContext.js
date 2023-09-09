import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
    waveformid: "waveform-container",
    setWaveformid: () => {},
    isWaveformPlaying:  new Array(300).fill(false),
    setIsWaveformPlaying: null
    
});

export default songContext;
