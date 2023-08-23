import React, { useRef, useEffect } from "react";
import AudioPlayer from "react-audio-player";
import p5 from "p5";

const MusicPlayer = ({ songSrc }) => {
  const audioRef = useRef(null);
  let sketch;

  useEffect(() => {
    // Initialize p5.js sketch
    sketch = new p5((p) => {
      let song;
      let fft;

      p.preload = () => {
        song = p.loadSound(songSrc);
      };

      p.setup = () => {
        p.createCanvas(800, 200);
        fft = new p5.FFT();
        song.play();
      };

      p.draw = () => {
        p.background(0);
        const spectrum = fft.analyze();

        // Draw amplitude graph based on spectrum data
        // You can adjust this to create a visual representation of the audio
        for (let i = 0; i < spectrum.length; i++) {
          const amplitude = spectrum[i];
          p.stroke(255);
          p.line(i, p.height, i, p.height - amplitude);
        }
      };
    });

    // Cleanup p5.js sketch on component unmount
    return () => {
      sketch.remove();
    };
  }, [songSrc]);

  return (
    <div>
      <AudioPlayer
        ref={audioRef}
        src={songSrc}
        controls
        controlsList="nodownload"
      />
      <div id="audio-visualization"></div>
    </div>
  );
};

export default MusicPlayer;
