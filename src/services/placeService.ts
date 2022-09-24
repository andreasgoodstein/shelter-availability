import { formatDate } from "../helpers/dateHelper";
import { Place, PlaceResponse } from "./../../index.d";

const OPTIONS = {
  headers: {
    connection: "keep-alive",
  },
};

const URL = `${globalThis?.location?.origin}/api?s2=&s3=&ps=24&t=1`;

export const getPlaces = async (date: Date): Promise<Place[]> => {
  const response = await fetch(getUrl(date), OPTIONS);
  const data = (await response.json()) as PlaceResponse;

  return [
    ...(data?.BookingPlacesList?.map(trimPlace) || []),
    ...(data?.BookingPlacesMap?.map(trimPlace) || []),
  ];
};

const getUrl = (date: Date) =>
  URL.replace("s2=", `s2=${formatDate(date)}`).replace("s3=", "s3=1");

const trimPlace = (place: Place) => {
  delete place.Distance;
  delete place.Images;
  delete place.FType;

  return place;
};

// s1 = type - 3012 (shelter), 3031 (lejrplads), 3091 (bålhytte)
// s2 = arrival_date - YYYYMMDD
// s3 = n_nights - 1-2, 1-4, 1
// s4 = city
// r = radius, 50000
// t = 1, ?
// ps = 24, ?
