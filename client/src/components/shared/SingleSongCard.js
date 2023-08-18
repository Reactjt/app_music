import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { Howl } from "howler";

const SingleSongCard = ({ info }) => {
    
     
    const { currentSong, setCurrentSong } = useContext(songContext);

    // Ensure that info and info.records are defined before accessing them
    if (!info || !info.records || !Array.isArray(info.records)) {
        return null; // Return null or a fallback UI element if necessary
    }

    const playSong = (audioUrl) => {
        // Find the clicked song from the records array
        const clickedSong = info.records.find((song) => song.audio === audioUrl);
    
        if (!clickedSong) {
            return; // Return early if the clicked song is not found
        }
    
        if (currentSong && currentSong.sound && currentSong.audio === audioUrl) {
            // Pause the audio if it's the same song that is already playing
            currentSong.sound.pause();
            setCurrentSong((prevCurrentSong) => ({ ...prevCurrentSong, sound: null })); // Clear the sound
        } else {
            // Stop the currently playing song, if any
            if (currentSong && currentSong.sound) {
                try {
                    currentSong.sound.stop();
                } catch {
                    console.log("error");
                }
            }
    
            // Create a new Howl instance for the selected song
            const sound = new Howl({
                src: [audioUrl],
                html5: true,
                onend: () => {
                    setCurrentSong((prevCurrentSong) => ({ ...prevCurrentSong, sound: null })); // Clear the sound when playback ends
                },
            });
    
            // Set the current song with the clicked song's information
            setCurrentSong({
                ...clickedSong,
                audio: audioUrl,
                sound,
            });
            
            
        }
    };
 
 
  

    return (
        <div>
            {info.records.map((item, index) => (
                <div
                    key={index}
                    className="p-2"
                    onClick={() => {
                        playSong(item.audio);
 
                    }}
                >
                    <div className="hover:bg-gray-400 hover:bg-opacity-20 p-4 flex items-center">
                        <div>
                            <img
                                src={item.thumb}
                                alt=""
                                className="w-12 h-12 object-cover"
                            />
                        </div>
                         
                        <div className="w-full">
                            <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                                <div className="cursor-pointer hover:underline">
                                    
                                    {item.name}
                                </div>
                                <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                                {item.artis_name}
                                </div>
                            </div>
                            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                <div>{/* Additional content */}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SingleSongCard;
