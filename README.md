# shelter-availability

A quick little React / NextJS project, to provide a better overview of the availability of bookable campsites and shelters in Denmark.

It piggybacks on the API used at [Naturstyrelsen](https://book.naturstyrelsen.dk)

## Running

Run either via **npm** or **docker compose**

### npm

1. `npm ci`
2. `npm start`
3. Navigate to [http://localhost:3000](http://localhost:3000)

### docker compose

1. `docker compose up`
2. Navigate to [http://localhost:3000](http://localhost:3000)

## Caveats

The project only works with NextJS in dev mode. Still ironing out some issues with the static rendering and the Map component. The data pre-fetching should probably be replaced with a locally running proxy-server, to get around the missing CORS headers on the third party API.
