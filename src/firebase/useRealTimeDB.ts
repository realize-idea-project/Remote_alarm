import { useEffect, useState } from "react";
import { db } from "./firebase";

export const useRealTimeDB = <T>() => {
  const [realTimeData, setRealTimeData] = useState<T>();

  const id = 1;
  const realTime = db.ref(`company/company_${id}`);

  useEffect(() => {
    realTime.on("value", (snapshot) => {
      if (snapshot.exists()) {
        setRealTimeData(snapshot.val());
      }
      // const scheduleList = snapshot.val();
      // const today = new Date().getDate();
      // const todaysSchedule = JSON.parse(scheduleList[today]);
      // console.log("todaysSchedule", todaysSchedule);
      // setSchedule(data);
    });
  }, []);

  const setData = async (date: number, time: string) => {
    await realTime.set({ [date]: time });
  };

  return {
    realTimeData,
    setData,
  };
};
