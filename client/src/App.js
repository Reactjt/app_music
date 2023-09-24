import "./output.css";
import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import songContext from "./contexts/songContext";
import filteredInfoContext from "./contexts/FilteredinfoContext";
import FilteredSongs from "./routes/FilteredSongs";

import { SidebarProvider } from "./contexts/Sidebarcontext";
import { WaveformProvider } from "./contexts/WaveformContext";


function App() {
    const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [currentTimestamp, setCurrentTimestamp] = useState(0);
    const [song, setSong] = useState(null);
    const [waveforms, setWaveforms] = useState({});
    const [currentVolume, setCurrentVolume] = useState( 1 );

    return (
        <div className="w-screen h-screen font-poppins">
            <BrowserRouter>
            <WaveformProvider>
                    <songContext.Provider
                        value={{
                            currentSong,
                            setCurrentSong,
                            soundPlayed,
                            setSoundPlayed,
                            isPaused,
                            setIsPaused,
                            currentTimestamp,
                            setCurrentTimestamp,
                            song,
                            setSong,
                            waveforms,
                            setWaveforms,
                            currentVolume,
                            setCurrentVolume
                        }}
                    >
                              <filteredInfoContext.Provider
                              value={{
                                    selectedFilter,
                                    setSelectedFilter
                                     }}
                                     >
                                      <SidebarProvider>
                        <Routes>

                            <Route path="/" element={<FilteredSongs />} />
                        </Routes>
                        </SidebarProvider>
                        </filteredInfoContext.Provider>

                    </songContext.Provider>
                    </WaveformProvider>
            </BrowserRouter>
        </div>
    );
}



export default App;
