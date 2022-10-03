import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";

import { DateRange } from "../../index.d";
import { DateRangeSelector } from "../components/DateRangeSelector";
import { config } from "../config";
import { addDays, formatDate } from "../helpers/dateHelper";
import { useAvailabilities } from "../hooks/useAvailabilities";

const DynamicMap = dynamic(
  () =>
    import("../components/PlaceMap").then((component) => component.PlaceMap),
  {
    ssr: false,
  }
);

const DynamicDateList = dynamic(
  () =>
    import("../components/DateList").then((component) => component.DateList),
  { ssr: false }
);

export default function Frontpage() {
  const { LOOK_AHEAD_DAYS } = config;

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: new Date(),
    toDate: addDays(new Date(), LOOK_AHEAD_DAYS),
  });

  const { availabilities } = useAvailabilities(dateRange, selectedDate);

  useEffect(
    function clampSelectedDateToRange() {
      if (!selectedDate) {
        setSelectedDate(dateRange.fromDate);
        return;
      }

      if (selectedDate < dateRange.fromDate) {
        setSelectedDate(dateRange.fromDate);
        return;
      }

      if (selectedDate > dateRange.toDate) {
        setSelectedDate(dateRange.toDate);
        return;
      }
    },
    [dateRange, selectedDate, setSelectedDate]
  );

  const selectedDateChangeHandler = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Head>
        <title>Shelter Booking</title>
      </Head>

      <main
        style={{
          alignItems: "center",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexFlow: "column",
            gap: "5px",
            width: "100%",
          }}
        >
          <h1>Shelter Booking</h1>

          <DateRangeSelector
            dateRange={dateRange}
            dateRangeChangeHandler={(dateRange) => {
              setDateRange(dateRange);
            }}
          />

          <Suspense fallback={null}>
            <DynamicDateList
              dateRange={dateRange}
              selectedDateChangeHandler={selectedDateChangeHandler}
              selectedDate={selectedDate}
            />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <DynamicMap
            date={selectedDate}
            places={
              selectedDate ? availabilities[formatDate(selectedDate)] : []
            }
          />
        </Suspense>
      </main>
    </>
  );
}
