/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useTime } from "react-timer-hook";
import { AlarmSchedule } from "../types";
import { styled } from "styled-components";

const getFormattedMinutes = (minute: number) => {
  const stringified = minute.toString();
  return stringified.length === 1 ? `0${stringified}` : stringified;
};

interface Props {
  onChangeSecond: (time: AlarmSchedule) => void;
}

export const Clock: FC<Props> = ({ onChangeSecond }) => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  const formattedHour = hours === 0 ? `12` : `${hours}`;

  const formattedMinutes = getFormattedMinutes(minutes);
  const formattedSecond =
    seconds.toString().length === 1 ? `0${seconds}` : seconds;

  useEffect(() => {
    onChangeSecond([formattedHour.toString(), formattedMinutes, ampm]);
  }, [seconds]);

  return (
    <Container>
      <Numbers>
        <span>{formattedHour}</span>:<span>{formattedMinutes}</span>:
        <span>{formattedSecond}</span>
        <span>{ampm}</span>
      </Numbers>
    </Container>
  );
};

const Container = styled.div`
  text-align: "center";
`;

const Numbers = styled.div`
  font-size: 4rem;
`;
