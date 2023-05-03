import { BrowserTracing, init } from "@sentry/react";
import { useEffect } from "react";

export const useSentry = () => {
  useEffect(() => {
    // Promise.all([import("@sentry/react"), import("@sentry/tracing")])
    //   .then(([Sentry, { BrowserTracing }]) => {
    init({
      dsn: "https://a39397b9ea38439aad0fe85d4e97e973@o4503959931781120.ingest.sentry.io/4503959977656320",
      integrations: [new BrowserTracing()],

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    });
    //   })
    //   .catch((error) => console.error(error));
  }, []);
};
