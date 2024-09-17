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

export const DateRangeSelector = ({
  dateRangeChangeHandler,
  dateRange,
}: DateRangeSelectorProps) => {
  const currentDate = new Date();
  const minFromDate = currentDate;
  const maxFromDate = addDays(currentDate, 89);
  const minToDate = addDays(dateRange.fromDate, 1);
  const maxToDate = addDays(currentDate, 90);

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
        max={formatInputDate(maxFromDate)}
        min={formatInputDate(minFromDate)}
        onChange={(event) => {
          if (event?.target?.value?.length !== 10) {
            return;
          }

          const fromDate = parseInputDate(event.target.value);

          dateRangeChangeHandler({
            fromDate:
              minFromDate < fromDate
                ? fromDate < maxFromDate
                  ? fromDate
                  : maxFromDate
                : minFromDate,
            toDate:
              fromDate < dateRange.toDate
                ? dateRange.toDate
                : fromDate < maxFromDate
                ? addDays(fromDate, 1)
                : maxToDate,
          });
        }}
        type="date"
        value={formatInputDate(dateRange.fromDate)}
      />

      <span>{"\u2192"}</span>

      <input
        max={formatInputDate(maxToDate)}
        min={formatInputDate(minToDate)}
        onChange={(event) => {
          if (event?.target?.value?.length !== 10) {
            return;
          }

          const toDate = parseInputDate(event.target.value);

          dateRangeChangeHandler({
            fromDate:
              dateRange.fromDate < toDate
                ? dateRange.fromDate
                : minFromDate < dateRange.fromDate
                ? dateRange.fromDate
                : minFromDate,
            toDate:
              minToDate < toDate
                ? toDate < maxToDate
                  ? toDate
                  : maxToDate
                : minToDate,
          });
        }}
        type="date"
        value={formatInputDate(dateRange.toDate)}
      />
    </div>
  );
};
