import { FC } from "react";
import { useAlarmHandler } from "../useAlarm";

interface Props {
  src: any;
}

export const AudioTag: FC<Props> = ({ src }) => {
  const { ref, isMuted, cancelMute } = useAlarmHandler();

  return (
    <audio controls ref={ref} muted={isMuted} style={{ display: "none" }}>
      <source src={src} type="audio/mp3" />
    </audio>
  );
};
