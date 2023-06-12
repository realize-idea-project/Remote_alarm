import { FC } from "react";
import styled from "styled-components";

import { useCount } from "./useCount";
import { useHint } from "./useHint";
import { Clock } from "./clock/Clock";
import { AlarmSchedule } from "./types";

interface Props {
  onStartPreAlarm: () => void;
  onStartEndAlarm: () => void;
}

export const Countdown: FC<Props> = ({ onStartPreAlarm, onStartEndAlarm }) => {
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
    setShowPreAlarmHint(true);
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
    <Container>
      <Clock onChangeSecond={handleChangeTime} />

      <AlarmText>
        {showPreAlarmHint && <div>1차 알림 1분 후에 마지막 알림 시작</div>}
        {showEndAlarmHint && <div>2차 알림</div>}
      </AlarmText>
      <RefreshButton onClick={refresh}>다시 시작</RefreshButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const AlarmText = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
  height: 2rem;
`;

const RefreshButton = styled.button`
  height: 2.5rem;
  width: 10rem;
`;
