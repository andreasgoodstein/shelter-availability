import { formatDate, getDayName, isWeekend } from "../helpers/dateHelper";

type DateListProps = {
  dateList?: Date[];
  loadMore?: () => void;
  selectDate: (date: Date) => void;
  selectedDate?: Date;
};

export const DateList = ({
  dateList,
  loadMore,
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
        <li style={{ display: "inline-flex" }} key={formatDate(date)}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <span>{getDayName(date)}</span>

            <button
              onFocus={() => selectDate(date)}
              onMouseOver={() => selectDate(date)}
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
              {formatDate(date).substring(4)}
            </button>
          </div>
        </li>
      ))}

      {!loadMore ? null : (
        <li style={{ display: "inline-flex", textAlign: "center" }}>
          <button
            type="button"
            onClick={loadMore}
            style={{
              margin: "18px 0 0 5px",
              width: "25px",
            }}
          >
            {"\u2192"}
          </button>
        </li>
      )}
    </ul>
  );
};
