import { getDayName, isWeekend, parseDate } from "../helpers/dateHelper";

type DateListProps = {
  dateList?: string[];
  selectDate: (date: string) => void;
  selectedDate?: string;
};

export const DateList = ({
  dateList,
  selectDate,
  selectedDate,
}: DateListProps) => {
  return !dateList ? null : (
    <ul
      style={{
        display: "flex",
        flexFlow: "row",
        gap: "2px",
        overflowX: "auto",
      }}
    >
      {dateList.map((date) => (
        <li style={{ display: "inline-flex" }} key={date}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <span>{getDayName(parseDate(date))}</span>

            <button
              onFocus={() => selectDate(date)}
              onMouseOver={() => selectDate(date)}
              style={{
                backgroundColor:
                  date === selectedDate
                    ? "grey"
                    : isWeekend(parseDate(date))
                    ? "lightgrey"
                    : "transparent",
              }}
              type="button"
            >
              {date.substring(4)}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
