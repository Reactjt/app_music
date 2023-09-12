import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    song: null,
    setSong: (Song) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: true,
    setIsPaused: () => {},
    waveformid: "waveform-container",
    setWaveformid: () => {},
    currentTimestamp: 0,
    setCurrentTimestamp: () => {}
});

export default songContext;
