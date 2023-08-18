import "./output.css";
import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MyMusic from "./routes/MyMusic";
import songContext from "./contexts/songContext";

function App() {
    const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
 

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
                        <Routes>  
                            <Route path="/" element={<MyMusic />} />
                        </Routes>
                    </songContext.Provider>
              
            </BrowserRouter>
        </div>
    );
}

 

export default App;
