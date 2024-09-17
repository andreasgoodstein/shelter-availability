import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";

import { DateRange } from "../../index.d";
import { DateRangeSelector } from "../components/DateRangeSelector";
import { addDays, formatDate } from "../helpers/dateHelper";
import { useAvailabilities } from "../hooks/useAvailabilities";
import { useSentry } from "../hooks/useSentry";
import { useDateSelection } from "../hooks/useDateSelection";

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

export default function FrontPage() {
  useSentry();

  const { dateRange, selectedDate, setDateRange, setSelectedDate } =
    useDateSelection();

  const { availabilities } = useAvailabilities(dateRange, selectedDate);

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
            dateRangeChangeHandler={setDateRange}
          />

          <Suspense fallback={null}>
            <DynamicDateList
              dateRange={dateRange}
              selectedDateChangeHandler={setSelectedDate}
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
