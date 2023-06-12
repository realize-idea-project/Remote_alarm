// import { useEffect } from "react";
import { db } from "./firebase";

export const useRealTimeDB = () => {
  const id = 1;
  const realTime = db.ref(`company/company_${id}`);

  // useEffect(() => {
  //   realTime.on("value", (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("data!!", data);
  //   });
  // }, []);

  const getData = async (date: number) => {
    const snapshot = await realTime.get();

    if (snapshot.exists()) {
      return snapshot.val();
    }
  };

  const setData = async (date: number, time: string) => {
    await realTime.set({ [date]: time });
  };

  return {
    getData,
    setData,
  };
};
