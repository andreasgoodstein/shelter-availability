import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense } from "react";

import { formatDate } from "../helpers/dateHelper";
import { useAvailabilities } from "../hooks/useAvailabilities";
import { useDateSelection } from "../hooks/useDateSelection";

const DynamicDateList = dynamic(
  () =>
    import("../components/DateList").then((component) => component.DateList),
  { ssr: false }
);

const DynamicDateRangeSelector = dynamic(
  () =>
    import("../components/DateRangeSelector").then(
      (component) => component.DateRangeSelector
    ),
  { ssr: false }
);

const DynamicMap = dynamic(
  () =>
    import("../components/PlaceMap").then((component) => component.PlaceMap),
  { ssr: false }
);

const Fallback = () => <p>Indlæser...</p>;

export default function FrontPage() {
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

          <Suspense fallback={<Fallback />}>
            <DynamicDateRangeSelector
              currentDate={new Date()}
              dateRange={dateRange}
              dateRangeChangeHandler={setDateRange}
            />
          </Suspense>

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
