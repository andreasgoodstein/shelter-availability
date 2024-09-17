import { useEffect, useState } from "react";
import { DateRange } from "../../index.d";
import { addDays } from "../helpers/dateHelper";
import { config } from "../config";

const { LOOK_AHEAD_DAYS } = config;

export const useDateSelection = () => {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: currentDate,
    toDate: addDays(currentDate, LOOK_AHEAD_DAYS),
  });

  useEffect(
    function clampSelectedDateToRange() {
      if (!selectedDate) {
        setSelectedDate(dateRange.fromDate);
        return;
      }

      if (selectedDate < dateRange.fromDate) {
        setSelectedDate(dateRange.fromDate);
        return;
      }

      if (selectedDate > dateRange.toDate) {
        setSelectedDate(dateRange.toDate);
        return;
      }
    },
    [dateRange, selectedDate, setSelectedDate]
  );

  return { dateRange, selectedDate, setDateRange, setSelectedDate };
};
