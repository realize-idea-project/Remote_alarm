import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface CustomAudioRef {
  play: () => void;
}
interface Props {
  path: string;
}

export const AudioTag = forwardRef<CustomAudioRef, Props>(({ path }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current?.play();
    },
  }));

  const muteAgain = () => {
    setIsMuted(false);
  };

  return (
    <audio
      controls
      ref={audioRef}
      onEnded={muteAgain}
      muted={isMuted}
      style={{ display: "none" }}
    >
      <source src={path} type="audio/mp3" />
    </audio>
  );
});
