import { Head, Html, Main, NextScript } from "next/document";

const cspContent =
  process.env.NODE_ENV === "production"
    ? "default-src 'self' 'unsafe-inline'; img-src 'self' data: https://tile.openstreetmap.org;"
    : "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' 'unsafe-eval' data: https://tile.openstreetmap.org";

export default function Document() {
  return (
    <Html lang="da">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />

        <meta
          name="description"
          content="Få et bedre overblik over hvornår Naturstyrelsens sheltere og lejrpladser er ledige. Gør det nemmere at opleve naturen i Danmark."
        />

        <meta
          name="keywords"
          content="Shelter,Sheltere,Camping,Campingplads,Campingpladser,Lejr,Lejrplads,Lejrpladser,Telt,Teltplads,Teltpladser,Booking,Reserver,Reservation,Danmark,Naturstyrelsen"
        />

        <meta name="author" content="Andreas Goodstein" />

        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/assets/shelter.svg" />

        <link rel="canonical" href="https://shelterbooking.netlify.app" />

        <link rel="preconnect" href="https://tile.openstreetmap.org" />

        <style>
          {`
            * { box-sizing: border-box; margin: 0; padding: 0; scrollbar-width: thin; scroll-margin-top: 10px }
            *::-webkit-scrollbar { width: 3px; }
            *::-webkit-scrollbar-track { background: transparent; }
            *::-webkit-scrollbar-thumb { background-clip: padding-box; background-color: rgba(155, 155, 155, 0.5); border: 5px solid rgba(0, 0, 0, 0); border-radius: 10px; }
            body { font-size: 1.6rem; min-height: 100vh; width: 100%; }
            html { font-family: Courier, mono-space; font-size: 62.5%; }         
            .leaflet-popup-content { margin: 1rem !important; max-width: 90vw; }   
            .leaflet-popup-content * { margin: 0 0 0.25rem 0 !important; font-family: Courier, mono-space; font-size: 1.2rem; }
          `.replaceAll(/\s\s+/g, " ")}
        </style>
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
