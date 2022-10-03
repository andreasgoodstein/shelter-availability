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
        maxWidth: "100%",
        overflowX: "auto",
        paddingBottom: "7px",
      }}
    >
      {getDateListFromRange(dateRange).map((date) => (
        <li style={{ display: "inline-flex" }} key={formatDate(date)}>
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
              border: "1px solid grey",
              borderRadius: "8px",
              display: "flex",
              flexFlow: "column",
              padding: "3px",
            }}
            type="button"
          >
            <span>{getDayName(date)}</span>
            <span>{formatDisplayDate(date)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
