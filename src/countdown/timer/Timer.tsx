import React, { FC } from "react";
import "./Timer.css";
import { useTimer } from "react-timer-hook";

interface Props {
  time: any;
  onEnd: () => void;
}

const Timer: FC<Props> = ({ time, onEnd }) => {
  const { seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onEnd(),
  });

  return (
    <div className="timer_container">
      <div className="title">남은 시간</div>
      <div className="count_text">
        <span>{seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
