import { RefObject, useRef, useState } from "react";
import { Agree } from "./agree/Agree";
import Countdown from "./countdown/Count";
import { AudioTag, CustomAudioRef } from "./audio/AudioTag";

function App() {
  const [showTimer, setShowTimer] = useState(false);
  const preAlarm = useRef<CustomAudioRef>(null);
  const endAlarm = useRef<CustomAudioRef>(null);

  const changeShowTimer = () => {
    preAlarm.current?.play();
    endAlarm.current?.play();
    setShowTimer(true);
  };

  const playAlarm = (ref: RefObject<CustomAudioRef>) => () => {
    ref.current?.play();
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {!showTimer ? (
        <Agree onAgree={changeShowTimer} />
      ) : (
        <Countdown
          onStartPreAlarm={playAlarm(preAlarm)}
          onStartEndAlarm={playAlarm(endAlarm)}
        />
      )}
      <AudioTag ref={preAlarm} path="first.mp3" />
      <AudioTag ref={endAlarm} path="end.mp3" />
    </div>
  );
}

export default App;
