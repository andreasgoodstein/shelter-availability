import { useEffect, useState } from "react";

import { Availabilities, DateRange } from "../../index.d";
import { config } from "../config";
import { formatDate, getDateListFromRange } from "../helpers/dateHelper";
import { getPlaces } from "../services/placeService";

export const useAvailabilities = (
  dateRange: DateRange,
  selectedDate: Date | undefined
) => {
  const { FETCH_DELAY_MS } = config;

  const [availabilities, setAvailabilities] = useState<Availabilities>({});
  const [pendingRequests, setPendingRequests] = useState<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  useEffect(
    function getAvailabilitiesOnNewDateRange() {
      const dateList = getDateListFromRange(dateRange);

      dateList.forEach((date, index) => {
        const delay = index * FETCH_DELAY_MS;

        const dateString = formatDate(date);

        const timeoutId = setTimeout(() => {
          setAvailabilities((availabilities) => ({
            ...availabilities,
            [dateString]: [],
          }));

          getPlaces(date)
            .then((places) => {
              setAvailabilities((availabilities) => ({
                ...availabilities,
                [dateString]: places,
              }));
            })
            .catch((error) => console.error(error));
        }, delay);

        setPendingRequests((pendingRequests) => ({
          ...pendingRequests,
          [dateString]: timeoutId,
        }));
      });
    },
    [FETCH_DELAY_MS, dateRange]
  );

  useEffect(
    function getAvailabilitiesOnSelectedDate() {
      const noDateOrDateAlreadyFetched =
        !selectedDate || availabilities[formatDate(selectedDate)];
      if (noDateOrDateAlreadyFetched) {
        return;
      }

      const selectedDateString = formatDate(selectedDate);

      if (pendingRequests[selectedDateString]) {
        clearTimeout(pendingRequests[selectedDateString]);
      }

      setAvailabilities((availabilities) => ({
        ...availabilities,
        [selectedDateString]: [],
      }));

      getPlaces(selectedDate)
        .then((places) => {
          setAvailabilities((availabilities) => ({
            ...availabilities,
            [selectedDateString]: places,
          }));
        })
        .catch((error) => console.error(error));
    },
    [availabilities, pendingRequests, selectedDate]
  );

  return { availabilities };
};
