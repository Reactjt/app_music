import React from 'react';

const ProgressBar = ({ currentTime, duration, isPlaying, onSeek }) => {
  const progress = (currentTime / duration) * 100;

  const handleSeek = (e) => {
    if (duration && !isNaN(duration)) {
      const progressBarWidth = e.currentTarget.offsetWidth;
      const clickPosition = e.nativeEvent.offsetX;
      const seekTime = (clickPosition / progressBarWidth) * duration;
      onSeek(seekTime);
    }
  };

  return (
    <div className="w-1/5 h-4 bg-gray-300 cursor-pointer" onClick={handleSeek}>
      <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
      {/* This line adds a dot to represent the current time */}
      {isPlaying && <div className="w-2 h-2 bg-white rounded-full absolute top-0 mt-1" style={{ left: `${progress}%` }}></div>}
    </div>
  );
};

export default ProgressBar;
