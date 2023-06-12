import React, { useEffect } from "react";
import { useTime } from "react-timer-hook";

export const Clock = () => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  useEffect(() => {
    console.log("change");
  }, [seconds]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
};
