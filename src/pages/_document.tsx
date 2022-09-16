import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="da">
      <Head>
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'"
        /> */}

        <style>
          {`
            * { box-sizing: border-box; margin: 0; padding: 0; scrollbar-width: thin; }
            body { font-size: 1.6rem; min-height: 100vh; width: 100%; }
            html { font-family: Courier, mono-space; font-size: 62.5%; }
          `.replaceAll(/\s/g, "")}
        </style>
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
