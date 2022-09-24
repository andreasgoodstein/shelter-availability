import { add, format, parse } from "date-fns";

export const addDays = (date: Date, days: number) => add(date, { days });

export const formatDate = (date: Date) => format(date, "yyyyMMdd");

export const formatInputDate = (date: Date) => format(date, "yyyy-MM-dd");

export const formatDisplayDate = (date: Date) => format(date, "dd.MM");

export const getDayName = (date: Date) => format(date, "iii");

export const isWeekend = (date: Date) => [6, 0].includes(date.getDay());

export const parseDate = (dateString: string) =>
  parse(dateString, "yyyyMMdd", new Date());

export const parseInputDate = (dateString: string) =>
  parse(dateString, "yyyy-MM-dd", new Date());
