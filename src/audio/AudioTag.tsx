import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface CustomAudioRef {
  play: () => void;
}
interface Props {
  path: string;
}

// 자동재생 안되는 이슈
// 최초에 유저가 실행하지 않으면 구글의 정책으로 인해 audio 태그에서 오류가 남
// 그래서 음소거 상태로 최초에 1번 실행
// 크롬 설정을 변경하면 그냥 자동재생이 가능해짐
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
