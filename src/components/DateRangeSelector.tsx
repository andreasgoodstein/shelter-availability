import { DateRange } from "../../index.d";
import {
  addDays,
  formatInputDate,
  parseInputDate,
} from "../helpers/dateHelper";

type DateRangeSelectorProps = {
  dateRangeChangeHandler: (arg: DateRange) => void;
  dateRange: DateRange;
};

const MAX_FROM_DATE = addDays(new Date(), 89);
const MAX_TO_DATE = addDays(new Date(), 90);
const MIN_FROM_DATE = new Date();
const MIN_TO_DATE = addDays(new Date(), 1);

export const DateRangeSelector = ({
  dateRangeChangeHandler,
  dateRange,
}: DateRangeSelectorProps) => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <input
        max={formatInputDate(MAX_FROM_DATE)}
        min={formatInputDate(MIN_FROM_DATE)}
        onChange={(event) => {
          if (event?.target?.value?.length !== 10) {
            return;
          }

          const fromDate = parseInputDate(event.target.value);

          dateRangeChangeHandler({
            fromDate:
              fromDate > MIN_FROM_DATE
                ? fromDate < MAX_FROM_DATE
                  ? fromDate
                  : MAX_FROM_DATE
                : MIN_FROM_DATE,
            toDate: dateRange.toDate,
          });
        }}
        type="date"
        value={formatInputDate(dateRange.fromDate)}
      />

      <span>{"\u2192"}</span>

      <input
        max={formatInputDate(MAX_TO_DATE)}
        min={formatInputDate(MIN_TO_DATE)}
        onChange={(event) => {
          if (event?.target?.value?.length !== 10) {
            return;
          }

          const toDate = parseInputDate(event.target.value);

          dateRangeChangeHandler({
            fromDate: dateRange.fromDate,
            toDate:
              toDate > MIN_TO_DATE
                ? toDate < MAX_TO_DATE
                  ? toDate
                  : MAX_TO_DATE
                : MIN_TO_DATE,
          });
        }}
        type="date"
        value={formatInputDate(dateRange.toDate)}
      />
    </div>
  );
};
