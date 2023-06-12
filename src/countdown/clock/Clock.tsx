/* eslint-disable react-hooks/exhaustive-deps */
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

  const formattedSecond =
    seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const formattedHour = hours === 0 ? `12` : hours;

  useEffect(() => {
    onChangeSecond([
      formattedHour.toString(),
      getFormattedMinutes(minutes),
      ampm,
    ]);
  }, [seconds]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{formattedHour}</span>:<span>{minutes}</span>:
        <span>{formattedSecond}</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
};
