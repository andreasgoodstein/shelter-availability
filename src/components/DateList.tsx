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
          <button
            onFocus={() => selectDate(date)}
            onMouseOver={() => selectDate(date)}
            style={{
              backgroundColor: date === selectedDate ? "grey" : "transparent",
            }}
            type="button"
          >
            {date.substring(4)}
          </button>
        </li>
      ))}
    </ul>
  );
};
