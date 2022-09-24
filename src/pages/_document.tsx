import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="da">
      <Head>
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'"
        /> */}

        <link rel="icon" href="/assets/shelter.svg" />

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
          `.replaceAll(/(\n|\t)/g, "")}
        </style>
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
