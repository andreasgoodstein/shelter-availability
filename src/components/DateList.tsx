import { DateRange } from "../../index.d";
import {
  addDays,
  formatDate,
  formatDisplayDate,
  getDayName,
  isWeekend,
} from "../helpers/dateHelper";

type DateListProps = {
  dateRange: DateRange;
  selectedDate?: Date;
  selectedDateChangeHandler: (date: Date) => void;
};

export const DateList = ({
  dateRange,
  selectedDate,
  selectedDateChangeHandler,
}: DateListProps) => {
  return (
    <ul
      style={{
        display: "flex",
        flexFlow: "row",
        gap: "2px",
        overflowX: "auto",
      }}
    >
      {getDateList(dateRange).map((date) => (
        <li style={{ display: "inline-flex" }} key={formatDate(date)}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexFlow: "column",
            }}
          >
            <span>{getDayName(date)}</span>

            <button
              onFocus={() => selectedDateChangeHandler(date)}
              onMouseOver={() => selectedDateChangeHandler(date)}
              style={{
                backgroundColor:
                  date.getTime() === selectedDate?.getTime()
                    ? "grey"
                    : isWeekend(date)
                    ? "lightgrey"
                    : "transparent",
              }}
              type="button"
            >
              {formatDisplayDate(date)}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const getDateList = (dateRange: DateRange) => {
  const dateList = [];

  let currentDate = dateRange.fromDate;
  while (currentDate <= dateRange.toDate) {
    dateList.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dateList;
};
