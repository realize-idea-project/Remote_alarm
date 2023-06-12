import React, { useState } from "react";
import Agree from "./agree/Agree";
import Countdown from "./countdown/Count";
import { useAlarmHandler } from "./useAlarm";

function App() {
  const [showTimer, setShowTimer] = useState(false);

  const {
    ref: preAlarm,
    isMuted: isPreAlarmMuted,
    cancelMute: cancelMutePreAlarm,
    mute: mutePreAlarm,
  } = useAlarmHandler();

  const {
    ref: endAlarm,
    isMuted: isEndAlarmMuted,
    cancelMute: cancelMuteEndAlarm,
    mute: muteEndAlarm,
  } = useAlarmHandler();

  const changeShowTimer = () => {
    preAlarm.current?.play();
    endAlarm.current?.play();
    setShowTimer(true);
  };

  const playPreAlarm = () => {
    cancelMutePreAlarm();
  };

  const playEndAlarm = () => {
    cancelMuteEndAlarm();
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {!showTimer ? (
        <Agree onAgree={changeShowTimer} />
      ) : (
        <Countdown onStart1={playPreAlarm} onStart2={playEndAlarm} />
      )}
      <audio
        controls
        ref={preAlarm}
        muted={isPreAlarmMuted}
        onEnded={mutePreAlarm}
        style={{ display: "none" }}
      >
        <source src="first.mp3" type="audio/mp3" />
      </audio>
      <audio
        controls
        ref={endAlarm}
        muted={isEndAlarmMuted}
        onEnded={muteEndAlarm}
        style={{ display: "none" }}
      >
        <source src="end.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;
