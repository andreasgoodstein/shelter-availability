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
  const maxFromDate = addDays(new Date(), 89);
  const maxToDate = addDays(new Date(), 90);
  const minFromDate = new Date();
  const minToDate = addDays(new Date(), 1);

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
              fromDate > minFromDate
                ? fromDate < maxFromDate
                  ? fromDate
                  : maxFromDate
                : minFromDate,
            toDate: dateRange.toDate,
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
            fromDate: dateRange.fromDate,
            toDate:
              toDate > minToDate
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
