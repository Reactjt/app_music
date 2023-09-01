import React, { useState, useRef } from "react";

const TestMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const songUrl = "YOUR_SONG_URL_HERE"; // Replace with your song URL

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <audio
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="mb-4">
        {isPlaying ? (
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
