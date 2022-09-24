export type Availabilities = {
  [key: string]: Place[];
};

export type DateRange = {
  fromDate: Date;
  toDate: Date;
};

export type Place = {
  Lat?: string;
  Lng?: string;
  FType?: string;
  FTypeID?: number;
  Title?: string;
  Desc?: string;
  Images?: string[];
  Uri?: string;
  Distance?: number;
  Status?: number;
};

export type PlaceResponse = {
  BookingPlacesList?: Place[];
  BookingPlacesMap?: Place[];
};
