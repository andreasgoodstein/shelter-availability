import { useEffect, useState } from "react";

import { getPlaces } from "../services/placeService";
import { Place } from "./../../index.d";

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const updatePlaces = async () => {
      const newPlaces = await getPlaces(new Date());

      setPlaces(newPlaces);
    };

    updatePlaces().catch((error) => {
      throw error;
    });
  }, []);

  return { places };
};
