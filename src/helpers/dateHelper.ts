import { add, format, parse } from "date-fns";
import { da } from "date-fns/locale";

import { DateRange } from "../../index.d";

export const addDays = (date: Date, days: number) => add(date, { days });

export const formatDate = (date: Date) =>
  format(date, "dd/MM/yyyy", { locale: da });

export const formatInputDate = (date: Date) =>
  format(date, "yyyy-MM-dd", { locale: da });

export const formatDisplayDate = (date: Date) =>
  format(date, "dd/MM", { locale: da });

export const getDateListFromRange = (dateRange: DateRange) => {
  const dateList = [];

  let currentDate = dateRange.fromDate;
  while (currentDate <= dateRange.toDate) {
    dateList.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dateList;
};

export const getDayName = (date: Date) => format(date, "iii", { locale: da });

export const isWeekend = (date: Date) => [6, 0].includes(date.getDay());

export const parseDate = (dateString: string) =>
  parse(dateString, "yyyyMMdd", new Date(), { locale: da });

export const parseInputDate = (dateString: string) =>
  parse(dateString, "yyyy-MM-dd", new Date(), { locale: da });
