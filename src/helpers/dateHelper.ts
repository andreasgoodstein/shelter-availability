import { add, format } from "date-fns";

export const formatDate = (date: Date) => format(date, "yyyyMMdd");

export const addDays = (date: Date, days: number) => add(date, { days });
