import React, { useState } from "react";
import "./Count.css";

import Timer from "./Timer";

const getDisplayTime = () => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 7);
  return expiryTimestamp;
};

const getFirstAlarmTime = () => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 2);
  return expiryTimestamp;
};

const Countdown = () => {
  const [displayTime] = useState(getDisplayTime());
  const [firstTime] = useState(getFirstAlarmTime());

  const [show1st, setShow1st] = useState(false);
  const [show2nd, setShow2nd] = useState(false);

  const refresh = () => {
    window.location.reload();
  };

  const firstAlarm = () => {
    setShow1st(true);
    console.log("1end");
  };

  const endAlarm = () => {
    setShow2nd(true);
    console.log("2nd");
  };

  return (
    <div className="board">
      <div className="hide">
        <Timer time={firstTime} onEnd={firstAlarm} />
      </div>
      <Timer time={displayTime} onEnd={endAlarm} />
      <div className="alarm__text">
        {show1st && <div>1차 알림</div>}
        {show2nd && <div>2차 알림</div>}
      </div>
      <button className="refresh" onClick={refresh}>
        다시 시작
      </button>
    </div>
  );
};

export default Countdown;
