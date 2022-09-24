import "leaflet/dist/leaflet.css";

import {
  Icon,
  Layer,
  LayerGroup,
  Map as LeafletMap,
  Marker,
  TileLayer,
} from "leaflet";
import { useEffect, useRef, useState } from "react";

import { Place } from "../../index.d";
import { formatDate } from "../helpers/dateHelper";

type PlaceMapProps = {
  date?: Date;
  places?: Place[];
};

type IconLayer = Layer & {
  _latlng: {
    lat: string;
    lng: string;
  };
  _icon: {
    currentSrc: string;
  };
  status: number;
};

const INITIAL_POSITION: [number, number] = [55.7, 12.5];
const INITIAL_ZOOM = 10;

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

  useEffect(
    function initializeMarkerLayer() {
      if (markerLayer || !leafRef?.current) {
        return;
      }

      const leafletMap = new LeafletMap(leafRef.current, {
        center: INITIAL_POSITION,
        zoom: INITIAL_ZOOM,
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
    },
    [leafRef, markerLayer]
  );

  useEffect(
    function redrawMarkerList() {
      if (!markerLayer) {
        return;
      }

      const layerMap: Record<string, IconLayer> = markerLayer
        .getLayers()
        .reduce((map, layer) => {
          const iconLayer = layer as unknown as IconLayer;
          const latLng = `${iconLayer._latlng?.lat}|${iconLayer._latlng?.lng}`;

          return {
            ...map,
            [latLng]: {
              ...iconLayer,
              status: iconLayer._icon?.currentSrc?.includes("green") ? 0 : 1,
            },
          };
        }, {});

      places?.forEach((place) => {
        const oldLayer = layerMap[`${place.Lat || ""}|${place.Lng || ""}`];
        if (oldLayer && oldLayer.status === place.Status) {
          return;
        }

        if (oldLayer) {
          markerLayer.removeLayer(oldLayer);
        }

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
                date ? formatDate(date) : ""
              }" target="_blank" rel="noopener noreferrer">Book</a>`;

        new Marker(latLng, options).bindPopup(popup).addTo(markerLayer);
      });
    },
    [date, markerLayer, places]
  );

  return (
    <div
      ref={leafRef}
      style={{ height: "calc(100vh - 110px)", width: "100%" }}
    ></div>
  );
};
