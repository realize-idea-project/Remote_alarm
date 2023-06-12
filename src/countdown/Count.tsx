import React, { FC, useEffect, useState } from "react";
import _ from "lodash";

import { useRealTimeDB } from "../firebase/useRealTimeDB";
import { Clock } from "./clock/Clock";
import { parseSchedule } from "./scheduleParser";
import { AlarmSchedule, Schedule, ScheduleProtocolTable } from "./types";

import "./Count.css";

const getDisplayTime = () => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 8);
  return expiryTimestamp;
};

const getFirstAlarmTime = () => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 3);
  return expiryTimestamp;
};

interface Props {
  onStart1: () => void;
  onStart2: () => void;
}

const Countdown: FC<Props> = ({ onStart1, onStart2 }) => {
  const { realTimeData } = useRealTimeDB<ScheduleProtocolTable>();
  const [preAlarmList, setPreAlarmList] = useState<AlarmSchedule[]>([]);
  const [endAlarmList, setEndAlarmList] = useState<AlarmSchedule[]>([]);

  useEffect(() => {
    if (!_.isNil(realTimeData)) {
      const [pre, end] = parseSchedule(realTimeData);
      setPreAlarmList(pre);
      setEndAlarmList(end);
    }
  }, [realTimeData]);

  const [displayTime] = useState(getDisplayTime());
  const [firstTime] = useState(getFirstAlarmTime());

  const [show1st, setShow1st] = useState(false);
  const [show2nd, setShow2nd] = useState(false);

  const firstAlarm = () => {
    setShow1st(true);
    onStart1();
  };

  const endAlarm = () => {
    setShow2nd(true);
    onStart2();
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="board">
      <Clock />
      {/* <div className="hide">
        <Timer time={firstTime} onEnd={firstAlarm} />
      </div> */}
      {/* <Timer time={displayTime} onEnd={endAlarm} /> */}
      {/* <div className="alarm__text">
        {show1st && <div>1차 알림</div>}
        {show2nd && <div>2차 알림</div>}
      </div> */}
      <button className="refresh" onClick={refresh}>
        다시 시작
      </button>
    </div>
  );
};

export default Countdown;
