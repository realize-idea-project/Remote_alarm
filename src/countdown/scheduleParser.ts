import _ from "lodash";
import { AlarmSchedule, ScheduleProtocolTable } from "./types";

const THIRTY_MINUTES = 30;

export const parseSchedule = (protocol: ScheduleProtocolTable) => {
  const currentDay = new Date().getDate();
  const scheduleList = JSON.parse(protocol[currentDay]);

  const pre30AlarmList = _.chain<AlarmSchedule>(scheduleList)
    .map(([start, end]) => end)
    .map(getPreAlarmTime(THIRTY_MINUTES))
    .map(toLocaleString)
    .map(splitLocaleString)
    .value();

  const endAlarmList = _.chain<AlarmSchedule>(scheduleList)
    .map(([start, end]) => end)
    .map((localeString) => new Date(localeString))
    .map(toLocaleString)
    .map(splitLocaleString)
    .value();

  return [pre30AlarmList, endAlarmList] as AlarmSchedule[][];
};

const getPreAlarmTime = (gapMinutes: number) => (time: string) => {
  const preAlarmDate = new Date(time);
  preAlarmDate.setMinutes(preAlarmDate.getMinutes() - gapMinutes);

  return preAlarmDate;
};

const toLocaleString = (date: Date) => {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const splitLocaleString = (localeDate: string) => {
  const [time, ampm] = localeDate.split(" ");
  const [minute, second] = time.split(":");

  return [minute, second, ampm.toLowerCase()];
};
