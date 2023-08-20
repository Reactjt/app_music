import "./output.css";
import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MyMusic from "./routes/MyMusic";
import songContext from "./contexts/songContext";
import filteredInfoContext from "./contexts/FilteredinfoContext";
import FilteredSongs from "./routes/FilteredSongs";
 

function App() {
    const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(""); 
 
 

    return (
        <div className="w-screen h-screen font-poppins">
            <BrowserRouter>       
                    <songContext.Provider
                        value={{
                            currentSong,
                            setCurrentSong,
                            soundPlayed,
                            setSoundPlayed,
                            isPaused,
                            setIsPaused,
                        }}
                    >
                              <filteredInfoContext.Provider
                              value={{
                                    selectedFilter,
                                    setSelectedFilter
                                     }}
                                     >
                        <Routes>  
                            <Route path="/" element={<MyMusic />} />

                            <Route path="/filter" element={<FilteredSongs />} />
                        </Routes>
                        </filteredInfoContext.Provider>
 
                    </songContext.Provider>
              
            </BrowserRouter>
        </div>
    );
}

 

export default App;
