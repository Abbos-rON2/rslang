import { useState, useEffect, useRef } from "react";

const CustomAudio = ({url}) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setAudio(new Audio(url))
    }
  }, [url]);


  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);
  return <div onClick={toggle}>{playing ? "Pause" : "Play"}</div>
};
export default CustomAudio;