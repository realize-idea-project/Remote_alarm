import { useState } from "react";
import { AlarmScheduleTable } from "./types";

export const useAlarm = () => {
  const [mappingTable, setMappingTable] = useState<AlarmScheduleTable>();

  const changeMappingTable = (table?: AlarmScheduleTable) => {
    setMappingTable(table);
  };

  return { mappingTable, changeMappingTable };
};
