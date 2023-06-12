import { FC } from "react";

import { useCount } from "./useCount";
import { useHint } from "./useHint";
import { Clock } from "./clock/Clock";
import { AlarmSchedule } from "./types";

import "./Count.css";

interface Props {
  onStartPreAlarm: () => void;
  onStartEndAlarm: () => void;
}

const Countdown: FC<Props> = ({ onStartPreAlarm, onStartEndAlarm }) => {
  const {
    preAlarmList,
    endAlarmList,
    consumePreAlarm,
    consumeEndAlarm,
    canConsumeAlarm,
  } = useCount();

  const [showPreAlarmHint, setShowPreAlarmHint] = useHint(false);
  const [showEndAlarmHint, setShowEndAlarmHint] = useHint(false);

  const triggerPreAlarm = () => {
    setShowPreAlarmHint(false);
    onStartPreAlarm();
  };

  const triggerEndAlarm = () => {
    setShowEndAlarmHint(true);
    onStartEndAlarm();
  };

  const refresh = () => {
    window.location.reload();
  };

  const handleChangeTime = (time: AlarmSchedule) => {
    if (canConsumeAlarm(time, preAlarmList)) {
      consumePreAlarm(time, preAlarmList);
      triggerPreAlarm();
      return;
    }

    if (canConsumeAlarm(time, endAlarmList)) {
      consumeEndAlarm(time, endAlarmList);
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
