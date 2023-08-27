import React, { useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import songContext from "../contexts/songContext";

const TestMusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const animationFrameRef = useRef(null);

  // Access the context values and functions
  const {
    currentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused
  } = useContext(songContext);

  // Use the appropriate context variables
  const songUrl = currentSong ? currentSong.audio : "";

  useEffect(() => {
    const sound = new Howl({
      src: [songUrl],
      html5: true,
      onplay: () => {
        setSoundPlayed(true); // Use setSoundPlayed from context
        startAnimationFrameLoop();
      },
      onpause: () => {
        setSoundPlayed(false); // Use setSoundPlayed from context
        cancelAnimationFrame(animationFrameRef.current);
      },
      onseek: () => {
        setCurrentTime(sound.seek());
      },
      onload: () => {
        setDuration(sound.duration());
      }
    });

    return () => {
      sound.unload();
    };
  }, [songUrl, setSoundPlayed]);

  const startAnimationFrameLoop = () => {
    const updateProgress = () => {
      setCurrentTime(soundPlayed.seek());
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const handlePlay = () => {
    if (soundPlayed) {
      soundPlayed.play(); // Use soundPlayed from context
    }
  };

  const handleStop = () => {
    if (soundPlayed) {
      soundPlayed.pause(); // Use soundPlayed from context
    }
  };

  const handleSeek = (time) => {
    if (soundPlayed) {
      soundPlayed.seek(time);
      setCurrentTime(time);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        {soundPlayed && soundPlayed.playing() ? (
          <button onClick={handleStop} className="bg-red-500 text-white p-2">
            Stop
          </button>
        ) : (
          <button onClick={handlePlay} className="bg-green-500 text-white p-2">
            Play
          </button>
        )}
      </div>
      <div className="relative w-full h-4 bg-gray-300">
        <div
          className="absolute h-full bg-green-500"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
          className="w-full h-full appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TestMusicPlayer;
