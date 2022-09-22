import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { Availabilities } from "../../index.d";
import { DateList } from "../components/DateList";
import { config } from "../config";
import { addDays, formatDate } from "../helpers/dateHelper";
import { getPlaces } from "../services/placeService";

type IndexProps = {
  availabilities?: Availabilities;
};

const DynamicMap = dynamic(
  () =>
    import("../components/PlaceMap").then((component) => component.PlaceMap),
  {
    ssr: false,
  }
);

export default function Frontpage({ availabilities }: IndexProps) {
  const [places, setPlaces] = useState<Availabilities[keyof Availabilities]>(
    []
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(new Date())
  );

  const [dateList, _setDateList] = useState(
    Object.keys(availabilities || { [selectedDate]: {} })
  );

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setPlaces(availabilities?.[date] || []);
  };

  useEffect(function getAvailabilityOnFrontpageMount() {
    getAvailabilities()
      .then((data) => {
        setPlaces(data?.[selectedDate] || []);
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
        selectDate={selectDate}
        selectedDate={selectedDate}
      />

      <Suspense fallback={null}>
        <DynamicMap date={selectedDate} places={places} />
      </Suspense>
    </main>
  );
}

// export const getStaticProps = async () => {
//   const availabilities = await getAvailabilities();

//   return { props: { availabilities } };
// };

const getAvailabilities = async (): Promise<Availabilities> => {
  const { LOOK_AHEAD_DAYS } = config;

  const placePromises: Promise<void>[] = [];
  const availabilities: Availabilities = {};

  for (let i = 0; i < LOOK_AHEAD_DAYS; i += 1) {
    const date = addDays(new Date(), i);

    placePromises.push(
      getPlaces(date).then((data) => {
        availabilities[formatDate(date)] = data;
      })
    );
  }

  await Promise.all(placePromises);

  return availabilities;
};
