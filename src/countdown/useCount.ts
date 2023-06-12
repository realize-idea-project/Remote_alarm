import { useEffect, useState } from "react";
import _ from "lodash";

import { useRealTimeDB } from "../firebase/useRealTimeDB";
import { parseSchedule } from "./scheduleParser";
import {
  AlarmSchedule,
  AlarmScheduleTable,
  ScheduleProtocolTable,
} from "./types";

export const useCount = () => {
  const { realTimeData } = useRealTimeDB<ScheduleProtocolTable>();
  const [preAlarmList, setPreAlarmList] = useState<AlarmScheduleTable>();
  const [endAlarmList, setEndAlarmList] = useState<AlarmScheduleTable>();

  useEffect(() => {
    if (!_.isNil(realTimeData)) {
      const currentDate = new Date().getDate();
      const scheduleList = realTimeData[currentDate];

      if (!_.isNil(scheduleList)) {
        const [pre, end] = parseSchedule(scheduleList);
        setPreAlarmList(pre);
        setEndAlarmList(end);
      }
    }
  }, [realTimeData]);

  const consumePreAlarm = (time: AlarmSchedule, table?: AlarmScheduleTable) => {
    if (_.isNil(table)) return;
    setPreAlarmList(_.omit(table, time.toString()));
  };

  const consumeEndAlarm = (time: AlarmSchedule, table?: AlarmScheduleTable) => {
    if (_.isNil(table)) return;
    setEndAlarmList(_.omit(table, time.toString()));
  };

  const canConsumeAlarm = (time: AlarmSchedule, table?: AlarmScheduleTable) => {
    return !_.isNil(table) ? table[time.toString()] : false;
  };

  return {
    preAlarmList,
    endAlarmList,
    consumePreAlarm,
    consumeEndAlarm,
    canConsumeAlarm,
  };
};
