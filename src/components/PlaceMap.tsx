import "leaflet/dist/leaflet.css";

import { Icon, LayerGroup, Map, Marker, TileLayer } from "leaflet";
import { useEffect, useRef, useState } from "react";

import { Place } from "../../index.d";

type PlaceMapProps = {
  date?: string;
  places?: Place[];
};

const INITIAL_POSITION: [number, number] = [55.7, 12.3];

const ShelterIconGreen = new Icon({
  iconUrl: "/assets/shelter_green.svg",
  iconSize: [30, 30],
});
const ShelterIconRed = new Icon({
  iconUrl: "/assets/shelter_red.svg",
  iconSize: [30, 30],
});
const FireIconGreen = new Icon({
  iconUrl: "/assets/campfire_green.svg",
  iconSize: [30, 30],
});
const FireIconRed = new Icon({
  iconUrl: "/assets/campfire_red.svg",
  iconSize: [30, 30],
});

export const PlaceMap = ({ date, places }: PlaceMapProps) => {
  const leafRef = useRef(null);
  const [markerLayer, setMarkerLayer] = useState<LayerGroup | undefined>();

  useEffect(() => {
    if (markerLayer || !leafRef?.current) {
      return;
    }

    const leafletMap = new Map(leafRef.current, {
      center: INITIAL_POSITION,
      zoom: 11,
    });

    const tileLayer = new TileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }
    );

    tileLayer.addTo(leafletMap);

    const newMarkerLayer = new LayerGroup();

    newMarkerLayer.addTo(leafletMap);

    setMarkerLayer(newMarkerLayer);
  }, [leafRef, markerLayer]);

  useEffect(() => {
    if (!markerLayer) {
      return;
    }

    markerLayer.eachLayer((layer) => {
      markerLayer.removeLayer(layer);
    });

    places?.forEach((place) => {
      const latLng: [number, number] = [
        parseFloat(place.Lat || ""),
        parseFloat(place.Lng || ""),
      ];

      const icon =
        place.FTypeID === 3012
          ? place.Status === 1
            ? ShelterIconRed
            : ShelterIconGreen
          : place.Status === 1
          ? FireIconRed
          : FireIconGreen;

      const options = { icon };

      const popup =
        place.Status === 1
          ? `<p>${place.FTypeID === 3012 ? "Shelter" : "Lejrplads"}</p><p>${
              place.Title || ""
            }</p><p>${place.Desc || ""}</p>`
          : `<p>${place.FTypeID === 3012 ? "Shelter" : "Lejrplads"}</p><p>${
              place.Title || ""
            }</p><p>${
              place.Desc || ""
            }</p><a href="https://book.naturstyrelsen.dk/sted/${
              place.Uri || ""
            }/?s2=${
              date || ""
            }" target="_blank" rel="noopener noreferrer">Book</a>`;

      new Marker(latLng, options).bindPopup(popup).addTo(markerLayer);
    });
  }, [date, markerLayer, places]);

  return !places ? null : (
    <div
      ref={leafRef}
      style={{ height: "calc(100vh - 110px)", width: "100%" }}
    ></div>
  );
};

export default PlaceMap;
