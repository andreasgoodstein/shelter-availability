import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="da">
      <Head>
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

        <title>Shelter Booking</title>

        <link rel="icon" href="/assets/shelter.svg" />

        <link rel="canonical" href="https://shelterbooking.netlify.app" />

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
