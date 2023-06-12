import { FC, useEffect, useState } from "react";
import _ from "lodash";

import { useRealTimeDB } from "../firebase/useRealTimeDB";
import { Clock } from "./clock/Clock";
import { parseSchedule } from "./scheduleParser";
import {
  AlarmSchedule,
  AlarmScheduleTable,
  ScheduleProtocolTable,
} from "./types";

import "./Count.css";

interface Props {
  onStart1: () => void;
  onStart2: () => void;
}

const Countdown: FC<Props> = ({ onStart1, onStart2 }) => {
  const { realTimeData } = useRealTimeDB<ScheduleProtocolTable>();
  const [preAlarmList, setPreAlarmList] = useState<AlarmScheduleTable>();
  const [endAlarmList, setEndAlarmList] = useState<AlarmScheduleTable>();

  const [showPreAlarmHint, setShowPreAlarmHint] = useState(false);
  const [showEndAlarmHint, setShowEndAlarmHint] = useState(false);

  useEffect(() => {
    if (!_.isNil(realTimeData)) {
      const [pre, end] = parseSchedule(realTimeData);
      setPreAlarmList(pre);
      setEndAlarmList(end);
    }
  }, [realTimeData]);

  const canTurnOnAlarm = (time: AlarmSchedule, table?: AlarmScheduleTable) => {
    return !_.isNil(table) ? table[time.toString()] : false;
  };

  const triggerPreAlarm = () => {
    setShowPreAlarmHint(true);
    onStart1();
  };

  const triggerEndAlarm = () => {
    setShowEndAlarmHint(true);
    onStart2();
  };

  const refresh = () => {
    window.location.reload();
  };

  const handleChangeTime = (time: AlarmSchedule) => {
    if (canTurnOnAlarm(time, preAlarmList)) {
      setPreAlarmList(_.omit(preAlarmList, time.toString()));
      triggerPreAlarm();
      return;
    }

    if (canTurnOnAlarm(time, endAlarmList)) {
      setEndAlarmList(_.omit(endAlarmList, time.toString()));
      triggerEndAlarm();
      return;
    }
  };

  return (
    <div className="board">
      <Clock onChangeSecond={handleChangeTime} />

      <div className="alarm__text">
        {showPreAlarmHint && <div>1차 알림 1분 후에 마지막 알림 시작</div>}
        {showEndAlarmHint && <div>2차 알림</div>}
      </div>
      <button className="refresh" onClick={refresh}>
        다시 시작
      </button>
    </div>
  );
};

export default Countdown;
