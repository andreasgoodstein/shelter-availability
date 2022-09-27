import { DateRange } from "../../index.d";
import {
  formatDate,
  formatDisplayDate,
  getDateListFromRange,
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
      {getDateListFromRange(dateRange).map((date) => (
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
