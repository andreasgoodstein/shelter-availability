import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { Availabilities, DateRange } from "../../index.d";
import { DateList } from "../components/DateList";
import { DateRangeSelector } from "../components/DateRangeSelector";
import { config } from "../config";
import { addDays, formatDate } from "../helpers/dateHelper";
import { getPlaces } from "../services/placeService";

const DynamicMap = dynamic(
  () =>
    import("../components/PlaceMap").then((component) => component.PlaceMap),
  {
    ssr: false,
  }
);

export default function Frontpage() {
  const { LOOK_AHEAD_DAYS } = config;

  const [availabilities, setAvailabilities] = useState<Availabilities>({});
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: new Date(),
    toDate: addDays(new Date(), LOOK_AHEAD_DAYS),
  });

  useEffect(
    function getAvailabilitiesOnSelectedDate() {
      if (!selectedDate || availabilities[formatDate(selectedDate)]) {
        return;
      }

      getPlaces(selectedDate)
        .then((places) => {
          setAvailabilities((availabilities) => ({
            ...availabilities,
            [formatDate(selectedDate)]: places,
          }));
        })
        .catch((error) => console.error(error));
    },
    [availabilities, selectedDate]
  );

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
    <main
      style={{
        alignItems: "center",
        display: "flex",
        flexFlow: "column",
        gap: "5px",
      }}
    >
      <h1>Shelter Booking</h1>

      <DateRangeSelector
        dateRange={dateRange}
        dateRangeChangeHandler={(dateRange) => {
          setDateRange(dateRange);
        }}
      />

      <DateList
        dateRange={dateRange}
        selectedDateChangeHandler={selectedDateChangeHandler}
        selectedDate={selectedDate}
      />

      <Suspense fallback={null}>
        <DynamicMap
          date={selectedDate}
          places={selectedDate ? availabilities[formatDate(selectedDate)] : []}
        />
      </Suspense>
    </main>
  );
}
