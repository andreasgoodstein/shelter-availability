import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { Availabilities } from "../../index.d";
import { DateList } from "../components/DateList";
import { config } from "../config";
import { addDays, formatDate, parseDate } from "../helpers/dateHelper";
import { getPlaces } from "../services/placeService";

const DynamicMap = dynamic(
  () =>
    import("../components/PlaceMap").then((component) => component.PlaceMap),
  {
    ssr: false,
  }
);

export default function Frontpage() {
  const [availabilities, setAvailabilities] = useState<Availabilities>({});

  const [selectedDate, setSelectedDate] = useState<Date>();

  const [dateList, setDateList] = useState<Date[]>([]);

  const loadMoreAvailabilities = () =>
    void (async () => {
      const nextDate = addDays(dateList[dateList.length - 1], 1);

      const newAvailabilities = await getAvailabilities(nextDate);

      setAvailabilities({ ...availabilities, ...newAvailabilities });

      setDateList([
        ...dateList,
        ...Object.keys(newAvailabilities).map((date) => parseDate(date)),
      ]);
    })().catch((error) => console.error(error));

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(function getAvailabilityOnFrontpageMount() {
    getAvailabilities()
      .then((data) => {
        setAvailabilities({ ...availabilities, ...data });
        setDateList([
          ...dateList,
          ...Object.keys(data).map((date) => parseDate(date)),
        ]);
        setSelectedDate(parseDate(Object.keys(data)[0]));
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ display: "flex", flexFlow: "column", gap: "5px" }}>
      <h1>Shelter Availability</h1>

      <DateList
        dateList={dateList}
        loadMore={loadMoreAvailabilities}
        selectDate={selectDate}
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

const getAvailabilities = async (fromDate?: Date): Promise<Availabilities> => {
  const { LOOK_AHEAD_DAYS } = config;

  const placePromises: Promise<void>[] = [];
  const availabilities: Availabilities = {};

  const date = fromDate || new Date();

  for (let i = 0; i < LOOK_AHEAD_DAYS; i += 1) {
    const fetchDate = addDays(date, i);

    placePromises.push(
      getPlaces(fetchDate).then((data) => {
        availabilities[formatDate(fetchDate)] = data;
      })
    );
  }

  await Promise.all(placePromises);

  return availabilities;
};
