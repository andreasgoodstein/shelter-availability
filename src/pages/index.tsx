import dynamic from "next/dynamic";
import { useState } from "react";

import { Availabilities } from "../../index.d";
import { DateList } from "../components/DateList";
import { config } from "../config";
import { addDays, formatDate } from "../helpers/dateHelper";
import { getPlaces } from "../services/placeService";

type IndexProps = {
  availabilities: Availabilities;
};

const DynamicMap = dynamic(() => import("../components/PlaceMap"), {
  ssr: false,
});

export default function Index({ availabilities }: IndexProps) {
  const [places, setPlaces] = useState<Availabilities[keyof Availabilities]>(
    []
  );

  const [selectedDate, setSelectedDate] = useState<string>();

  const dateList = Object.keys(availabilities);

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setPlaces(availabilities[date]);
  };

  return (
    <main style={{ display: "flex", flexFlow: "column", gap: "5px" }}>
      <h1>Shelter Availability</h1>

      <DateList
        dateList={dateList}
        selectDate={selectDate}
        selectedDate={selectedDate}
      />

      <DynamicMap date={selectedDate} places={places} />
    </main>
  );
}

export const getStaticProps = async () => {
  const availabilities = await getAvailabilities();

  return { props: { availabilities } };
};

const getAvailabilities = async (): Promise<Availabilities> => {
  const { LOOK_AHEAD_DAYS } = config;

  const placePromises: Promise<void>[] = [];
  const availabilities: Availabilities = {};

  for (let i = 0; i < LOOK_AHEAD_DAYS; i += 1) {
    const date = addDays(new Date(), i);

    placePromises.push(
      (async () => {
        availabilities[formatDate(date)] = await getPlaces(date);
      })()
    );
  }

  await Promise.all(placePromises);

  return availabilities;
};
