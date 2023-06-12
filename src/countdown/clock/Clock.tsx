import { FC, useEffect } from "react";
import { useTime } from "react-timer-hook";
import { AlarmSchedule } from "../types";

const getFormattedMinutes = (minute: number) => {
  const stringified = minute.toString();
  return stringified.length === 1 ? `0${stringified}` : stringified;
};

interface Props {
  onChangeSecond: (time: AlarmSchedule) => void;
}

export const Clock: FC<Props> = ({ onChangeSecond }) => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  useEffect(() => {
    onChangeSecond([
      hours.toString(),
      getFormattedMinutes(minutes),
      ampm.toString(),
    ]);
  }, [minutes]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
};
