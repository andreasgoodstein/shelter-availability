import { Place } from "../../index.d";

type PlaceListProps = {
  places?: Place[];
};

export const PlaceList = ({ places }: PlaceListProps) => {
  return !places ? null : (
    <ul>
      {places.map((place) =>
        place.Status === 0 ? null : (
          <li key={place.Title}>
            <p>{decodeURIComponent(place.Title || "")}</p>
          </li>
        )
      )}
    </ul>
  );
};
