import "./output.css";
import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
 
import songContext from "./contexts/songContext";
import filteredInfoContext from "./contexts/FilteredinfoContext";
import FilteredSongs from "./routes/FilteredSongs";
  
import { SidebarProvider } from "./contexts/Sidebarcontext";
 

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
                                      <SidebarProvider>
                        <Routes>  
                             

                            <Route path="/" element={<FilteredSongs />} />
                        </Routes>
                        </SidebarProvider>
                        </filteredInfoContext.Provider>
 
                    </songContext.Provider>
              
            </BrowserRouter>
        </div>
    );
}

 

export default App;
