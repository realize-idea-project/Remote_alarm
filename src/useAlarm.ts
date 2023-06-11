import { useEffect, useRef, useState } from "react";

export const useAlarmHandler = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!isMuted) {
      ref.current?.play();
    }
  }, [isMuted]);

  const cancelMute = () => {
    setIsMuted(false);
  };

  return {
    ref,
    isMuted,
    cancelMute,
  };
};
